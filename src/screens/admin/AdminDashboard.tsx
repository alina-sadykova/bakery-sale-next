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

const getImage = (item: Item) => {
  return <img src={item.image} alt={item.title} width={"50px"} />;
};

const AdminDashboard = () => {
  const { error, loading, items, getProducts, handleResetError, deleteCars } =
    useItemContext();
  const router = useRouter();
  const rows = items.map((item) => ({ ...item, image: getImage(item) }));

  useEffect(() => {
    getProducts();
  }, []);

  const handleCreateCar = () => {
    router.push("/admin/create-car");
  };

  const handleDeleteCar = (selectedCars: typeof rows) => {
    console.log("delete", selectedCars);
    deleteCars(selectedCars.map((item) => item.id));
  };

  const handleEditCar = (selectedCar: (typeof rows)[0]) => {
    router.push(`/admin/edit-car/${selectedCar.id}`);
  };

  return (
    <div>
      <Table
        rows={rows}
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
