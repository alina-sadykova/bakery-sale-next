"use client";
import { useItemContext } from "@/contexts/itemsContext";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ProductItem from "./productItem";
import Loading from "@/components/common/loading";
import ErrorModal from "@/components/common/errorModal";

function ProductsList() {
  const { error, loading, items, getProducts, handleResetError } =
    useItemContext();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
      >
        {items.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </Box>

      {loading && <Loading />}

      <ErrorModal
        message={`${error}`}
        open={!!error}
        onClose={handleResetError}
      />
    </>
  );
}

export default ProductsList;
