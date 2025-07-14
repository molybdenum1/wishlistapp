import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
// import { data } from "../data";
import type { IWishlistGroup, IWishlistItem } from "../../data/types";
import { GroupWishlist } from "../../components/GroupWishlist/GroupWishlist";
import { useAuth } from "../../hooks/useAuth";
import { getWishlists } from "../../api/wishlist";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {
  const { user } = useAuth();
  const [wishlistGroup, setWishlistGroups] = useState<IWishlistGroup[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const createWishlist = () => {
    navigate("/wishlist/create");
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      getWishlists(user.id).then(
        (groups: { id: string; name?: string; items?: IWishlistItem[] }[]) => {
          // Transform groups to match IWishlistGroup if necessary
          const mappedGroups = groups.map((group) => ({
            id: group.id,
            name: group.name ?? "",
            items: group.items ?? [],
          }));
          setLoading(false);
          setWishlistGroups(mappedGroups);
        }
      );
    }
  }, [user]);

  return (
    <Container>
      <h1>Main</h1>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        wishlistGroup &&
        wishlistGroup.map((group) => <GroupWishlist group={group} />)
      )}
      {!wishlistGroup?.length && (
        <div>
          <p>No wishlists found.</p>
          <p>Please create a wishlist to get started.</p>
          <p>Click on the "Create Wishlist" button to add a new wishlist.</p>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={createWishlist}
            >
              Create wishlist
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};
