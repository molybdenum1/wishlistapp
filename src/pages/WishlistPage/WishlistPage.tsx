import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { IWishlistGroup } from "../../data/types";
import { Wishlist } from "../../components/Wishlist/Wishlist";
import { useAuth } from "../../hooks/useAuth";
import { addWishlist, getWishlistById } from "../../api/wishlist";
import LoadingCircle from "../../components/LoadingCircle";

export const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<IWishlistGroup>({} as IWishlistGroup);
  const [wishlistName, setWishlistName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { id } = useParams();
  const { user } = useAuth();
  console.log(id);
  

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
    setLoading(true);
    try {
      const localId =
        name.toLowerCase() + "-" + Math.random().toString(36).substring(2, 15);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname === "/wishlist/create" && wishlist.id) {
      navigate(`/wishlist/${wishlist.id}`, { replace: true });
    } else if (id && pathname !== "/wishlist/create" && user) {
      setLoading(true);
      setNotFound(false);
      getWishlistById(user.id, id)
        .then((foundWishlist) => {
          if (foundWishlist) {
            setWishlist(foundWishlist);
          } else {
            setWishlist({} as IWishlistGroup);
            setNotFound(true);
          }
        })
        .catch(() => {
          setNotFound(true);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line
  }, [wishlist.id, id, pathname]);

  if (loading) {
    return (
      <LoadingCircle />
    );
  }

   if (notFound) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#f44336" }}>
        <h2>Wishlist not found</h2>
        <p>The wishlist you are looking for does not exist or was deleted.</p>
      </div>
    );
  }

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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isCreating}
            >
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
