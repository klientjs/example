import StorageFactory from '@klient/storage';
import Klient, { RequestSuccessEvent } from '@klient/core';
import { Post } from '../models/Post';

type AnyObject = Record<string, unknown>;
type Data = {
  Post: {
    [id: string]: Post;
  };
};

const data: Data = {
  Post: {
    '1': {
      id: '1',
      title: 'A new way to purify your code',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      active: false
    },
    '2': {
      id: '2',
      title: 'Learn how to build amazing app with Klient',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      active: true
    }
  }
};

export const enableBrowserPersistance = (klient: Klient): void => {
  const dataStorage = StorageFactory.create<Data>('cookie', {
    name: 'data',
    path: '/'
  });

  klient.on('request:success', (e: RequestSuccessEvent) => {
    if (e.context.resource !== undefined && ['POST', 'PUT', 'DELETE'].includes(String(e.config.method))) {
      dataStorage.write(data);
    }
  });

  const state: Data = dataStorage.read() || {};
  Object.keys(state).forEach((resource) => {
    (data as AnyObject)[resource] = (state as AnyObject)[resource] || {};
  });
};

export const resetBrowserData = () => {
  const dataStorage = StorageFactory.create<Data>('cookie', {
    name: 'data',
    path: '/'
  });

  dataStorage.clear();
  window.location.reload();
};

export default data;
