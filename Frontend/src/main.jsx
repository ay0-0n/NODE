import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Home from './Components/Home/Home';
import Root from './Components/Root';
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from './Components/AuthProvider/AuthProvider';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PrivateRoute from './Components/Route/PrivateRoute';
import AddBlogs from './Components/AddBlogs/AddBlogs';
import Wishlist from './Components/Wishlist/Wishlist';
import BlogDetails from './Components/BlogDetails/BlogDetails';
import AllBlogs from './Components/AllBlogs/AllBlogs';
import FeaturedBlogs from './Components/FeaturedBlogs/FeaturedBlogs';
import UpdateBlog from './Components/UpdateBlog/UpdateBlog';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/add-blog",
        element: <PrivateRoute><AddBlogs/></PrivateRoute>,
      },
      {
        path: "/blog/:id",
        element: <PrivateRoute><BlogDetails/></PrivateRoute>,
      },
      {
        path: "/updateblog/:id",
        element: <PrivateRoute><UpdateBlog/></PrivateRoute>,
      },
      
      {
        path: "/all-blogs",
        element: <AllBlogs/>,
      },
      {
        path: "/featured-blogs",
        element: <FeaturedBlogs/>,
      },
      {
        path: "/wishlist",
        element: <PrivateRoute><Wishlist/></PrivateRoute>,    
      }

    ],
  },
]);

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
