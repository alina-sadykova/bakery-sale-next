"use client";
import { useItemContext } from "@/contexts/itemsContext";
import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProductItem from "./productItem";
import Loading from "@/components/common/loading";
import ErrorModal from "@/components/common/errorModal";
import Filter from "@/components/filter/filter";
import { useSearchParams } from "next/navigation";

function ProductsList() {
  const { error, loading, items, getProducts, handleResetError } =
    useItemContext();
  const searchParams = useSearchParams();
  useEffect(() => {
    getProducts();
  }, [searchParams]);

  const isNotFound = error?.response?.status === 404;
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 5 }}>
        <Filter />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        mt={2}
        justifyContent="space-between"
        alignItems="center"
        gap="20px"
      >
        {items.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </Box>

      {loading && <Loading />}

      {isNotFound && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">Item is not found</Typography>
        </Box>
      )}
      <ErrorModal
        message={`${error?.message}`}
        open={!!error && !isNotFound}
        onClose={handleResetError}
      />
    </>
  );
}

export default ProductsList;
