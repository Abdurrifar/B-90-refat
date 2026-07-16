import { createRoot } from 'react-dom/client';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootElement from './pages/home/RootElement';
import { Component } from 'react';
import Home from './pages/home/Home';

// import ProductDetails from './components/productDetails';
// import CreateProduct from './components/CreateProduct';
// import AllProducts from './components/AllProducts';





const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement></RootElement>,
    children: [
      {
        index: true,
        Component: Home
      }


    ]
  },
]);



createRoot(document.getElementById('root')).render(

  <RouterProvider router={router} />

)
