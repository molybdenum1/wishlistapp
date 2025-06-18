import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Main } from "../pages/Main";
import { WishlistPage } from "../pages/WishlistPage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SingupPage";
import { ProtectedRouter } from "../components/ProtectedRouter/ProtectedRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        element: <ProtectedRouter />,
        children: [
          { index: true, element: <Main /> },
          { path: "wishlist/:id", element: <WishlistPage /> },
        ],
      },
    ],
  },
]);

export default router;
