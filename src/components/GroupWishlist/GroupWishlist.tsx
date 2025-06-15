import React from "react";
import type { IWishlistGroup } from "../../data/types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

export const GroupWishlist = ({ group }: { group: IWishlistGroup }) => {
  return (
    <Card>
      <div key={group.id}>
        <h2>{group.name}</h2>
        <CardContent>
          <ul>
            {group.items.map((item) => (
              <li key={item.id}>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {item.name}
                </Typography>
                <h3>{}</h3>
                <p>{item.description}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardActions>
          <Button size="small">
            <a href={`wishlist/${group.id}`} rel="noopener noreferrer">
              View Items
            </a>
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
