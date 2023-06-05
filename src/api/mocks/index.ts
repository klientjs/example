import { KlientExtended as Klient } from '@klient/mock';

import Auth from './auth';
import CreatePost from './post/create';
import UpdatePost from './post/update';
import ReadPost from './post/read';
import ListPost from './post/list';
import DeletePost from './post/delete';
import ActivatePost from './post/activate';

const mocks = [Auth, CreatePost, ActivatePost, UpdatePost, ReadPost, ListPost, DeletePost];

export default function setupMocks(klient: Klient) {
  klient.parameters.set('mock.delay', 500);
  mocks.forEach((mock) => klient.mock(mock));
}
