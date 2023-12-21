import React, { FC, createContext, useContext, useReducer } from "react";
import { InitialState, initialState, itemsReducer } from "./reducer";
import {
  getItemsError,
  getItemsRequest,
  getItemsSuccess,
  resetError,
} from "./actions";
import axios from "axios";
import { ContextProps } from "../AuthContext/types";
import { BASE_URL } from "./consts";

interface ItemContext extends InitialState {
  getProducts: () => void;
  handleResetError: () => void;
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
      console.log(response.data);
      dispatch(getItemsSuccess(response.data));
    } catch (error: any) {
      dispatch(getItemsError(error.message as string));
    }
  }

  const handleResetError = () => {
    dispatch(resetError());
  };
  const value = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    getProducts,
    handleResetError,
  };
  return <itemContext.Provider value={value}>{children}</itemContext.Provider>; // 3.wrap with the provider
};

export default ItemsContextProvider;
