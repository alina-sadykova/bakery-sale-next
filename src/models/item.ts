export interface Item {
  id: string;
  title: string;
  image: string;
  price: number;
  category: ItemCategory;
}

export type ItemWithoutId = Omit<Item, "id">;

enum ItemCategory { // enum when we have a few options
  sedan = "sedan",
  suv = "suv",
  truck = "truck",
}

export const itemCategories = [
  ItemCategory.sedan,
  ItemCategory.suv,
  ItemCategory.truck,
];

export const itemCategorisFilter = ["all", ...itemCategories];
