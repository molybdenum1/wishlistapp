import type { IWishlistGroup } from "../../data/types";
import "./Wishlist.css";
import { useState } from "react";
import AddItemModal from "../AddItemModal";
import { addItemToWishlist, deleteWishlist } from "../../api/wishlist";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Wishlist = ({
  wishlist: propWishlist,
}: {
  wishlist?: IWishlistGroup;
}) => {
  const [wishlist, setWishlist] = useState<IWishlistGroup | undefined>(
    propWishlist
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Add item to wishlist in Firestore
  const handleAddItem = async (
    name: string,
    description: string,
    price: string,
    link?: string
  ) => {
    if (!user || !wishlist?.id) return;
    const newItem = {
      id: Math.random().toString(36).slice(2),
      name,
      description,
      price: Number(price),
      link: link || "",
    };
    try {
      await addItemToWishlist(user.id, wishlist.id, newItem);
      setWishlist({
        ...wishlist,
        items: [...(wishlist.items || []), newItem],
      });
    } catch (error) {
      // Optionally show error to user
      console.error("Failed to add item:", error);
    }
    setModalOpen(false);
  };

  const handleCopyLink = async () => {
    if (!wishlist?.id) return;
    const url = `${window.location.origin}/wishlist/${wishlist.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      setCopySuccess(false);
    }
  };

  const handleDeleteWishlist = async () => {
    if (!user || !wishlist?.id) return;
    setDeleteLoading(true);
    try {
      await deleteWishlist(user.id, wishlist.id);
      setWishlist(undefined);
      navigate("/");
    } catch (error) {
      console.error("Failed to delete wishlist:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="wishlist-container">
      <span>
        <h2>View your wishlist</h2>
        {/* //user.id === wishlist?.ownerI  */}
        {user && (
          <Button
            onClick={handleDeleteWishlist}
            color="error"
            variant="outlined"
            disabled={deleteLoading}
          >
            {deleteLoading ? "deleting..." : "Delete Wishlist"}
          </Button>
        )}
      </span>
      {wishlist && wishlist.id ? (
        <div>
          <h3>{wishlist.name}</h3>
          <p>
            Wishlist ID: {wishlist.id}
            <button
              className="wishlist-copy-btn"
              style={{ marginBottom: 16 }}
              onClick={handleCopyLink}
            >
              {copySuccess ? "Link copied!" : "Copy"}
            </button>
          </p>

          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Link</th>
                <th>Priority</th>
                {/* <th>Quantity</th> */}
              </tr>
            </thead>
            <tbody>
              {wishlist.items && wishlist.items.length > 0 ? (
                wishlist.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    {/* <td>{item.quantity}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No items in this wishlist.</td>
                </tr>
              )}
            </tbody>
          </table>
          <button
            className="wishlist-add-btn"
            style={{ marginTop: 24 }}
            onClick={handleOpenModal}
          >
            Add Item
          </button>
          <AddItemModal
            open={modalOpen}
            onClose={handleCloseModal}
            onAdd={handleAddItem}
          />
        </div>
      ) : (
        <p>No items in this wishlist created yet.</p>
      )}
    </div>
  );
};
