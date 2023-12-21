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
  console.log(items);
  return (
    <Box>
      <Box>
        {items.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
        {loading && <Loading />}
        <ErrorModal
          message={`${error}`}
          open={!!error}
          onClose={handleResetError}
        />
      </Box>
    </Box>
  );
}

export default ProductsList;
