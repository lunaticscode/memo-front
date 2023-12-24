import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import "./index.css";
import SigninPage from "./pages/Signin";

const PostPage = lazy(() => import("./pages/Post"));
const PostEdit = lazy(() => import("./pages/PostEdit"));
const PostDetail = lazy(() => import("./pages/PostDetail"));
const CalendarPage = lazy(() => import("./pages/Calendar"));

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
      { path: "/post", element: <PostDetail /> },
      { path: "/signin", element: <SigninPage /> },
      { path: "/calendar", element: <CalendarPage /> },
      { path: "*", element: <PostPage /> },
    ],
  },
]);
root.render(
  <>
    <Suspense fallback={<div>page loading.....</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
