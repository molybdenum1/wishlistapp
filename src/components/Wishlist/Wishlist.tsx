import type { IWishlistGroup } from '../../data/types'
import './Wishlist.css';
import { useState } from 'react';

export const Wishlist = ({ wishlist: propWishlist }: { wishlist?: IWishlistGroup }) => {
  const [wishlist] = useState<IWishlistGroup | undefined>(propWishlist);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // useEffect(() => {
  //   if (!propWishlist && id) {
  //     getWishlistById(id).then((data) => {
  //       setWishlist(data);
  //     });
  //   }
  // }, [propWishlist, id]);

  const handleAddItem = () => {
    // Implement logic to add item to wishlist here
    // For now, just clear the fields
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
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
              <tr>
                <td>
                  <input
                    type='text'
                    placeholder='Item name'
                    value={newItemName}
                    onChange={e => setNewItemName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type='text'
                    placeholder='Description'
                    value={newItemDescription}
                    onChange={e => setNewItemDescription(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    placeholder='Price'
                    value={newItemPrice}
                    onChange={e => setNewItemPrice(e.target.value)}
                  />
                </td>
                <td>
                  <button className="wishlist-add-btn" onClick={handleAddItem}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No items in this wishlist created yet.</p>
      )}
    </div>
  )
}