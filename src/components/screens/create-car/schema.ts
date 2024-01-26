import { itemCategories } from "@/models/item";
import * as Yup from "yup";

export const createCarSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  image: Yup.string().required("Image is required"),
  price: Yup.number().required("Price is required"),
  category: Yup.string()
    .required("Category is required")
    .oneOf(itemCategories, "Non-supported category"),
});
