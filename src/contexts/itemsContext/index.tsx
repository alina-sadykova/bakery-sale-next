import React, { useReducer } from "react";
import { initialState, itemsReducer } from "./reducer";

const ItemsContextProvider = () => {
  const [state, dispatch] = useReducer(itemsReducer, initialState); //two arguments: reducer function, initial state

  return <div></div>;
};

export default ItemsContextProvider;
