import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { IWishlistGroup } from "../../data/types";
import { Wishlist } from "../../components/Wishlist/Wishlist";
import { useAuth } from "../../hooks/useAuth";
import { addWishlist } from "../../api/wishlist";

export const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<IWishlistGroup>(
    {} as IWishlistGroup
  );

  const [wishlistName, setWishlistName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { user } = useAuth();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    await createWishlist(wishlistName);
  };

  const createWishlist = async (name: string) => {
    if (!user) return;
    
    setIsCreating(true);
    try {
      const localId = name.toLowerCase() + "-" + Math.random().toString(36).substring(2, 15);
      const newWishlist: IWishlistGroup = {
        id: localId,
        name: name,
        items: [],
      };

      // Save to Firebase and get the document ID
      const firebaseId = await addWishlist(newWishlist, user.id);
      
      // Update the wishlist with the Firebase document ID
      const savedWishlist: IWishlistGroup = {
        ...newWishlist,
        id: firebaseId,
      };
      
      setWishlist(savedWishlist);
      setWishlistName("");
    } catch (error) {
      console.error("Failed to create wishlist:", error);
    } finally {
      setIsCreating(false);
    }
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
            <Button type="submit" variant="contained" color="primary" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Wishlist"}
            </Button>
          </form>
        </div>
      ) : (
        <Wishlist wishlist={wishlist} />
      )}
    </div>
  );
};
