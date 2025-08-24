import { Container, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { IWishlistGroup, IWishlistItem } from "../../data/types";
import { GroupWishlist } from "../../components/GroupWishlist/GroupWishlist";
import { useAuth } from "../../hooks/useAuth";
import { getWishlists } from "../../api/wishlist";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../../components/LoadingCircle";

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
        <LoadingCircle />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: wishlistGroup?.length ? "flex-start" : "center",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          {wishlistGroup &&
            wishlistGroup.map((group) => (
              <GroupWishlist group={group} key={group.id} />
            ))}
          {/* "Add New" as a wishlist-like card */}
          <Box
            sx={{
              maxWidth: 420,
              minWidth: 320,
              minHeight: 180,
              margin: "24px auto",
              borderRadius: 3,
              boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
              background: "#23272f",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "box-shadow 0.2s, background 0.2s",
              "&:hover": {
                background: "#1e1e2f",
                boxShadow: "0 6px 32px rgba(144,202,249,0.15)",
              },
            }}
            onClick={createWishlist}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#90caf9",
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: 1,
                mb: 1,
              }}
            >
              + Add New
            </Typography>
            <Typography sx={{ color: "#bbb", fontSize: 15, textAlign: "center" }}>
              Create a new wishlist
            </Typography>
          </Box>
        </Box>
      )}
      {!wishlistGroup?.length && (
        <div>
          <p>No wishlists found.</p>
          <p>Please create a wishlist to get started.</p>
          <p>Click on the "Add New" button to add a new wishlist.</p>
        </div>
      )}
    </Container>
  );
}
