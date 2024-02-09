import React, { FC, createContext, useContext, useReducer } from "react";
import { InitialState, initialState, itemsReducer } from "./reducer";
import {
  getItemsError,
  getItemsRequest,
  getItemsSuccess,
  getOneItemSuccess,
  resetError,
} from "./actions";
import axios from "axios";
import { ContextProps } from "../AuthContext/types";
import { BASE_URL } from "./consts";
import { ItemWithoutId } from "@/models/item";

interface ItemContext extends InitialState {
  getProducts: () => void;
  handleResetError: () => void;
  getOneProduct: (id: string) => void;
  createCar: (carData: ItemWithoutId) => void;
  deleteCars: (carIds: string[]) => void;
}
// HOW TO CREATE CONTEXT:
const itemContext = createContext<ItemContext>({} as ItemContext); // 1.create context

export const useItemContext = () => useContext(itemContext); // 2.create hook

const ItemsContextProvider: FC<ContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState); // stare: initial state, dispatch: setState. two arguments in useReducer: reducer function, initial state

  async function getProducts() {
    try {
      dispatch(getItemsRequest()); // loading

      const response = await axios.get(`${BASE_URL}/items`); // API call

      dispatch(getItemsSuccess(response.data));
    } catch (error: any) {
      dispatch(getItemsError(error.message as string));
    }
  }

  async function getOneProduct(id: string) {
    try {
      dispatch(getItemsRequest()); // loading

      const { data } = await axios.get(`${BASE_URL}/items/${id}`); // API call

      dispatch(getOneItemSuccess(data));
    } catch (error: any) {
      dispatch(getItemsError(error.message as string));
    }
  }

  const handleResetError = () => {
    dispatch(resetError());
  };

  const createCar = async (carData: ItemWithoutId) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/items`, carData);
      getProducts();
      return data;
    } catch (error: any) {
      dispatch(getItemsError(error.message as string));
    }
  };

  const deleteCars = async (carIDs: string[]) => {
    try {
      const response = await Promise.all(
        carIDs.map((id) => axios.delete(`${BASE_URL}/items/${id}`))
      );
      console.log(response);
      getProducts();
    } catch (error: any) {
      dispatch(getItemsError(error.message as string));
    }
  };

  const value = {
    items: state.items,
    oneItem: state.oneItem,
    loading: state.loading,
    error: state.error,
    getProducts,
    handleResetError,
    getOneProduct,
    createCar,
    deleteCars,
  };
  return <itemContext.Provider value={value}>{children}</itemContext.Provider>; // 3.wrap with the provider
};

export default ItemsContextProvider;
