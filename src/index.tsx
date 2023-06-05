import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './pages/router';

import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);
