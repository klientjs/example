import { Mock } from '@klient/mock';
import data from '../data';

export default {
  delay: 250,
  req: { url: '/posts/{id}', method: 'GET' },
  res: (config, parameters) => {
    const { id } = parameters as { id: string };

    if (!id || !data.Post[id] || (!config.headers?.Authorization && !data.Post[id].active)) {
      return {
        status: 404,
        data: {
          error: 'Not found'
        }
      };
    }

    return { status: 200, data: data.Post[id] };
  }
} as Mock;
