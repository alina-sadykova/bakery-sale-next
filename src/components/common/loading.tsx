import { Box, CircularProgress } from "@mui/material";
import React from "react";

const fixedStyles = {
  display: "flex",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
};
const commonStyles = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  padding: "20px",
};

interface LoadingProps {
  fixed?: boolean;
}
function Loading({ fixed = false }: LoadingProps) {
  return (
    <Box sx={fixed ? fixedStyles : commonStyles}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
