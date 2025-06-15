import { createBrowserRouter } from "react-router-dom";
import App  from '../App'
import { Main } from "../pages/Main";
import { WishlistPage } from "../pages/WishlistPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <Main />},
            {path: "wishlist/:id", element: <WishlistPage />}
        ]
    }
])

export default router;
