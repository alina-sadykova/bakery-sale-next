import ProductsList from "@/components/screens/items/ProductsList";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cars list",
};

function ProductsPage() {
  return <ProductsList />;
}

export default ProductsPage;
