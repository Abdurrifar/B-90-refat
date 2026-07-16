// import { createRoot } from 'react-dom/client';
// import './index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router';
// import RootElement from './pages/home/RootElement';
// import { Component } from 'react';
// import Home from './pages/home/Home';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootElement></RootElement>,
//     children: [
//       {
//         index: true,
//         Component: Home
//       }
//     ]
//   },
// ]);

// createRoot(document.getElementById('root')).render(

//   // <RouterProvider router={router} />
//   <BrowserRouter basename="/B-90-refat"></BrowserRouter>
// )

import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootElement from "./pages/home/RootElement";
import Home from "./pages/home/Home";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootElement />,
      children: [
        {
          index: true,
          Component: Home,
        },
      ],
    },
  ],
  {
    basename: "/B-90-refat",
  }
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);