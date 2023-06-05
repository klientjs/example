import { Resource } from '@klient/rest';
import { Post } from '../models/Post';

export default class PostResource extends Resource {
  constructor() {
    super('Post', '/posts');
  }

  activate(id: string, activate: boolean): Promise<Post> {
    return this.request({
      url: this.uri(id, 'activate'),
      data: { activate },
      method: 'PUT',
      context: {
        action: 'activate'
      }
    });
  }
}
