"use client";
import Table from "@/components/Table/Table";
import { useItemContext } from "@/contexts/itemsContext";
import { Item } from "@/models/item";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Item;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
];

const AdminDashboard = () => {
  const { error, loading, items, getProducts, handleResetError } =
    useItemContext();
  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const getImage = (item: Item) => {
    return <img src={item.image} alt={item.title} width={"50px"} />;
  };

  const handleCreateCar = () => {
    router.push("/admin/create-car");
  };

  const handleDeleteCar = (selectedCars: Item[]) => {
    console.log("delete", selectedCars);
  };

  const handleEditCar = (selectedCar: Item) => {
    router.push(`/admin/edit-car/${selectedCar.id}`);
  };

  return (
    <div>
      <Table
        rows={items.map((item) => ({ ...item, image: getImage(item) }))}
        headCells={headCells}
        loading={loading}
        emptyMessage={"No cars in storage"}
        tableName={"Cars"}
        onCreate={handleCreateCar}
        onDelete={handleDeleteCar}
        onEdit={handleEditCar}
      />
    </div>
  );
};

export default AdminDashboard;
