import React, { useState } from "react";
import './AddItemModal.css';

type AddItemModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, description: string, price: string, link: string) => void;
};

export const AddItemModal: React.FC<AddItemModalProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(name, description, price, link);
    setName("");
    setDescription("");
    setPrice("");
  };

  if (!open) return null;

  return (
    <div className="wishlist-modal-backdrop">
      <div className="wishlist-modal">
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="wishlist-modal-field">
            <label>Item Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Item name"
            />
          </div>
          <div className="wishlist-modal-field">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div className="wishlist-modal-field">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Price"
              min="0"
              step="0.01"
            />
          </div>
          <div className="wishlist-modal-field">
            <label>Link</label>
            <input
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="Link"
            />
          </div>
          <div className="wishlist-modal-actions">
            <button type="submit" className="wishlist-add-btn">Add</button>
            <button type="button" className="wishlist-cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};