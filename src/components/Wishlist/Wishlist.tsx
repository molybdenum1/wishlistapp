import React from 'react'
import type { IWishlistGroup } from '../../data/types'

export const Wishlist = ({ wishlist }: { wishlist: IWishlistGroup }) => {
  return (
    <div>
      <h2>View your wishlists</h2>
      {wishlist.id && (
        <div>
          <h3>{wishlist.name}</h3>
          <p>Wishlist ID: {wishlist.id}</p>
          {/* Here you can add more functionality to view or manage items in the wishlist */}
          <table>
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
                <td>{wishlist.items.length + 1}</td>
                <td>
                  <input 
                    type='text'
                    placeholder='Add new item row'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {!wishlist.id && <p>No wishlist created yet.</p>}
    </div>
  )
}
