import { Container } from "@mui/material"
import { useState } from "react";
// import { data } from "../data";
import type { IWishlistGroup } from "../../data/types";
import { GroupWishlist } from "../../components/GroupWishlist/GroupWishlist";

const data =  {
  wishlistGroup: [
    {
      id: 1,
      name: "My Wishlist",
      items: [
        {
          id: 1,
          name: "Item 1",
          description: "Description for Item 1",
          price: 10.99,
        },
        {
          id: 2,
          name: "Item 2",
          description: "Description for Item 2",
          price: 15.49,
        },
      ],
    },
  ],
};


export const Main: React.FC = () => {
    const [wishlistGroup] = useState<IWishlistGroup[]>(data.wishlistGroup);
  
    return (
    <Container>
      <h1>Main</h1>
        {wishlistGroup &&  wishlistGroup.map((group) => (
           <GroupWishlist group={group} />   
        ))}
    </Container>
  )
}
