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
    <Card
      sx={{
        maxWidth: 420,
        minWidth: 320,
        minHeight: 280,
        height: 340,
        margin: "24px auto",
        borderRadius: 3,
        boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
        background: "#23272f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div key={group.id}>
        <Typography
          variant="h5"
          sx={{
            color: "#90caf9",
            textAlign: "center",
            marginTop: 2,
            marginBottom: 1,
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          {group.name}
        </Typography>
        <CardContent>
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {group.items.map((item) => (
              <li
                key={item.id}
                style={{
                  marginBottom: 18,
                  padding: "12px 10px",
                  borderRadius: 8,
                  background: "#1e1e2f",
                  boxShadow: "0 2px 8px rgba(144,202,249,0.06)",
                }}
              >
                <Typography
                  gutterBottom
                  sx={{ color: "#ffd54f", fontSize: 16, fontWeight: 500 }}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#bbb",
                    fontSize: 14,
                    marginBottom: 0.5,
                  }}
                >
                  {item.description}
                </Typography>
                <Typography
                  sx={{
                    color: "#90caf9",
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  Price: ${item.price.toFixed(2)}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            size="medium"
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #90caf9 60%, #64b5f6 100%)",
              color: "#23272f",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              "&:hover": {
                background: "linear-gradient(90deg, #64b5f6 60%, #90caf9 100%)",
              },
            }}
            component="a"
            href={`wishlist/${group.id}`}
            rel="noopener noreferrer"
          >
            View Items
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};