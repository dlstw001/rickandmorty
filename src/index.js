import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Root from './routes/root';
import ErrorPage from "./error-page";
import ContactBar from './routes/ContactBar';
import ContactDetails from './routes/ContactDetails';
import http from './helper/http';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    /* loader: rootLoader, */
    children: [
      {
        path: "contact",
        element: <ContactBar />,
        loader: async() =>{
          return await http.get(`/character`)
        },
        children:[
          {
            path: ":id",
            element: <ContactDetails />,
            loader: async({params}) =>{
              return await http.get(`/character/${params.id}`)
            }
          }
        ]
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

