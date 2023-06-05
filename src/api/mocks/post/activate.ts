import type { Mock } from '@klient/mock';

import data from '../data';

export default {
  delay: 800,
  req: { url: '/posts/{id}/activate', method: 'PUT' },
  res: (config, parameters) => {
    const { id } = parameters as { id: string };
    const { activate } = config?.data || {};

    if (!id || !data.Post[id]) {
      return {
        status: 404,
        data: {
          error: 'Not found'
        }
      };
    }

    if (typeof activate !== 'boolean') {
      return {
        status: 400,
        data: {
          activate: 'Must be a boolean'
        }
      };
    }

    data.Post[id].active = activate;

    return { status: 200, data: data.Post[id] };
  }
} as Mock;
