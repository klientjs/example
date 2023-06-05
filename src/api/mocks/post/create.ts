import { Mock } from '@klient/mock';

import data from '../data';

export default {
  delay: 800,
  req: { url: '/posts', method: 'POST' },
  res: (config) => {
    const errors: Record<string, string> = {};
    const { title, content, active } = config?.data || {};

    if (!title) {
      errors.title = 'This field is required';
    }

    if (!content) {
      errors.content = 'This field is required';
    }

    if (Object.keys(errors).length > 0) {
      return { status: 400, data: errors };
    }

    const ids = Object.keys(data.Post).map((id) => Number(data.Post[id].id));
    const nextId = (ids.length ? Math.max(...ids) : 0) + 1;

    data.Post[nextId] = { id: String(nextId), title, content, active };

    return { status: 201, data: data.Post[nextId] };
  }
} as Mock;
