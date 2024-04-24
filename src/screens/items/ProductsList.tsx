"use client";
import { useItemContext } from "@/contexts/itemsContext";
import { Box } from "@mui/material";
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
      <Filter />
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

      {isNotFound && <p>Item is not found</p>}
      <ErrorModal
        message={`${error?.message}`}
        open={!!error && !isNotFound}
        onClose={handleResetError}
      />
    </>
  );
}

export default ProductsList;
