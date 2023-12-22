import ItemDetails from "@/components/screens/item-details/ItemDetails";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Car Details",
};

const ItemDetailsPage = () => {
  return <ItemDetails />;
};

export default ItemDetailsPage;
