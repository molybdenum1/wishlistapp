import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { IWishlistGroup } from "../../data/types";

export const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<IWishlistGroup>(
    {} as IWishlistGroup
  );

  const [wishlistName, setWishlistName] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createWishlist(wishlistName);
    // console.log(wishlist);
    // navigate(`/wishlist/${wishlist.id}`);
  };

  const createWishlist = (name: string) => {
    setWishlist((prev) => ({
      ...prev,
      id:
        name.toLowerCase() + "-" + Math.random().toString(36).substring(2, 15),
      name: name,
    }));
    setWishlistName("");
  };

  useEffect(() => {
    if (pathname === "/wishlist/create" && wishlist.id) {
      navigate(`/wishlist/${wishlist.id}`, { replace: true });
    }
    // eslint-disable-next-line
  }, [wishlist.id]);

  return (
    <div>
      <h1>Wishlist</h1>
      {pathname === "/wishlist/create" ? (
        <div>
          <h2>Create a new wishlist</h2>
          <p>This is the wishlist page.</p>
          <p>Here you can view and manage your wishlist items.</p>
          <form onSubmit={handleFormSubmit}>
            <Input
              type="text"
              placeholder="Enter wishlist name"
              required
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Create Wishlist
            </Button>
          </form>
        </div>
      ) : (
        <div>
          <h2>View your wishlists</h2>
          {wishlist.id && (
            <div>
              <h3>{wishlist.name}</h3>
              <p>Wishlist ID: {wishlist.id}</p>
              {/* Here you can add more functionality to view or manage items in the wishlist */}
            </div>
          )}
          {!wishlist.id && <p>No wishlist created yet.</p>}
        </div>
      )}
    </div>
  );
};
