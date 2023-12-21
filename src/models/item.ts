export interface Item {
  id: string;
  title: string;
  image: string;
  price: number;
  category: ItemCategory;
}

enum ItemCategory { // enum when we have a few options
  sedan = "sedan",
  suv = "suv",
  truck = "truck",
}
