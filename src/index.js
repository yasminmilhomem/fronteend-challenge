import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Home';
import Profile from './Profile';


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
        path: "/",
        element: <Home />
        },
        {
        path: "profile",
        element: <Profile />
        },
      ],
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <RouterProvider router={router}/>
    <App />
    </>
);