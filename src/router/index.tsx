import { createBrowserRouter } from "react-router-dom";

import App from "../App";

import MainPage from "../pages/MainPage/";
import WishlistPage from "../pages/WishlistPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";

import { ProtectedRouter } from "../components/ProtectedRouter/ProtectedRouter";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      {
        element: <ProtectedRouter />,
        children: [
          { index: true, element: <MainPage /> },
          { path: "wishlist/create", element: <WishlistPage /> },
          { path: "wishlist/:id", element: <WishlistPage /> },
          { path: "profile", element: <ProfilePage /> },

        ],
      },
    ],
  },
]);

export default router;
