import type { IWishlistGroup } from '../../data/types'
import './Wishlist.css';
import { useState } from 'react';
import AddItemModal from '../AddItemModal';
import { addItemToWishlist } from '../../api/wishlist'; // <-- import the function
import { useAuth } from '../../hooks/useAuth'; // <-- import useAuth to get user

export const Wishlist = ({ wishlist: propWishlist }: { wishlist?: IWishlistGroup }) => {
  const [wishlist, setWishlist] = useState<IWishlistGroup | undefined>(propWishlist);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Add item to wishlist in Firestore
  const handleAddItem = async (name: string, description: string, price: string, link?: string) => {
    if (!user || !wishlist?.id) return;
    const newItem = {
      id: Math.random().toString(36).slice(2),
      name,
      description,
      price: Number(price),
      link: link || '',
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

  return (
    <div className="wishlist-container">
      <h2>View your wishlist</h2>
      {wishlist && wishlist.id ? (
        <div>
          <h3>{wishlist.name}</h3>
          <p>Wishlist ID: {wishlist.id}</p>
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Link</th>
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
          <button className="wishlist-add-btn" style={{ marginTop: 24 }} onClick={handleOpenModal}>
            Add Item
          </button>
          <AddItemModal open={modalOpen} onClose={handleCloseModal} onAdd={handleAddItem} />
        </div>
      ) : (
        <p>No items in this wishlist created yet.</p>
      )}
    </div>
  )
}