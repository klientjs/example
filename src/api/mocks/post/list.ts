import { Mock } from '@klient/mock';

import data from '../data';
import { Post } from '../../models/Post';

export default {
  delay: 400,
  req: { url: '/posts', method: 'GET' },
  res: (config) => {
    const { title, content, active } = config.params || {};

    let collection: Post[] = Object.keys(data.Post).map((id) => data.Post[id]);

    if (title) {
      collection = collection.filter((post) => post.title.indexOf(title) !== -1);
    }

    if (content) {
      collection = collection.filter((post) => post.content.indexOf(content) !== -1);
    }

    if (active) {
      collection = collection.filter((post) => (active === '0' ? !post.active : post.active));
    }

    collection = collection.sort((a, b) => (a.id > b.id ? -1 : 1));

    return { status: 200, data: collection };
  }
} as Mock;
