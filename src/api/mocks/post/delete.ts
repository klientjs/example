import { Mock } from '@klient/mock';

import data from '../data';

export default {
  delay: 800,
  req: { url: '/posts/{id}', method: 'DELETE' },
  res: (_config, parameters) => {
    const { id } = parameters as { id: string };

    if (!id || !data.Post[id]) {
      return {
        status: 404,
        data: {
          error: 'Not found'
        }
      };
    }

    delete data.Post[id];

    return { status: 204, data: null };
  }
} as Mock;
