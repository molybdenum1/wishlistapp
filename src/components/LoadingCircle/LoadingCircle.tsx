import { CircularProgress, Box, Typography } from "@mui/material";

export const LoadingCircle = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "3rem",
    }}
  >
    <CircularProgress color="primary" />
    <Typography sx={{ marginTop: 2, color: "#90caf9" }}>Loading...</Typography>
  </Box>
);
