import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import router from '../pages/router';

test('app', () => {
  render(<RouterProvider router={router} />);
  const title = screen.getByText(/Last published posts/i);
  expect(title).toBeInTheDocument();
});
