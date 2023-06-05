import React from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import App from '../components/app';
import PrivateRoute from '../components/private-route';

import HomePage from '.';
import Login from './admin';
import PostList from './admin/posts';
import PostCreate from './admin/posts/create';
import PostEdit from './admin/posts/id';
import PostShow from './posts/id';

const front = [
  {
    path: '',
    element: <HomePage />
  },
  {
    path: '/posts/:id',
    element: <PostShow />
  },
  {
    path: '*',
    element: <div>NOT FOUND</div>
  }
];

const admin = [
  {
    path: '',
    element: <Login />
  },
  {
    path: '*',
    element: <PrivateRoute />,
    children: [
      {
        path: 'posts',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <PostList />
          },
          {
            path: 'create',
            element: <PostCreate />
          },
          {
            path: ':id',
            element: <PostEdit />
          }
        ]
      },
      {
        path: '*',
        element: <div>NOT FOUND</div>
      }
    ]
  }
];

export default createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/admin',
        element: <Outlet />,
        children: admin
      },
      {
        path: '',
        element: <Outlet />,
        children: front
      }
    ]
  }
]);
