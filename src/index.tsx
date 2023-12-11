import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import PostPage from "./pages/Post";
import CalendarPage from "./pages/Calendar";
import "./index.css";
import SigninPage from "./pages/Signin";
import PostEdit from "./pages/PostEdit";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <PostPage /> },
      { path: "/postedit", element: <PostEdit /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/calendar", element: <CalendarPage /> },
      { path: "*", element: <PostPage /> },
    ],
  },
]);
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
