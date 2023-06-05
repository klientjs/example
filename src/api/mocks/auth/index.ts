import { Mock } from '@klient/mock';

export default {
  delay: 800,
  req: { url: '/auth', method: 'POST' },
  res: (config) => {
    const errors: { username?: string; password?: string } = {};

    if (!config.data?.username) {
      errors.username = 'This field is required';
    }

    if (!config.data?.password) {
      errors.password = 'This field is required';
    }

    if (Object.keys(errors).length > 0) {
      return { status: 400, data: errors };
    }

    return {
      status: 200,
      data: {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODE0NzU5MzcsImV4cCI6MTc0NDU0NzkzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.9yHkxK3Br3fKpBG9Q6F2gS6WJqne6dqzNiU1LFa13jo'
        // refresh_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODE0NzU5MzcsImV4cCI6MTc0NDU0NzkzNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.9yHkxK3Br3fKpBG9Q6F2gS6WJqne6dqzNiU1LFa13jo',
      }
    };
  }
} as Mock;
