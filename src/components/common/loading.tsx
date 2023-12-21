import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
