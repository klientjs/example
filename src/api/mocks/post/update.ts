import type { Mock } from '@klient/mock';

import data from '../data';

export default {
  delay: 800,
  req: { url: '/posts/{id}', method: 'PUT' },
  res: (config, parameters) => {
    const { id } = parameters as { id: string };
    const { title, content, active } = config?.data || {};

    if (!id || !data.Post[id]) {
      return {
        status: 404,
        data: {
          error: 'Not found'
        }
      };
    }

    const errors: { title?: string; content?: string } = {};
    const post = { ...data.Post[id] };

    post.title = title !== undefined ? title : post.title;
    post.content = content !== undefined ? content : post.content;
    post.active = active !== undefined ? active : post.active;

    if (!post.title) {
      errors.title = 'This field is required';
    }

    if (!post.content) {
      errors.content = 'This field is required';
    }

    if (Object.keys(errors).length > 0) {
      return { status: 400, data: errors };
    }

    data.Post[id] = post;

    return { status: 200, data: post };
  }
} as Mock;
