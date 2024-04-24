import { Item } from "@/models/item";
import { ItemsActionTypes, ItemsActions } from "./actions";
import { AxiosError } from "axios";

export interface InitialState {
  items: Item[];
  oneItem: null | Item;
  loading: boolean;
  error: null | AxiosError;
}

export const initialState: InitialState = {
  items: [],
  oneItem: null,
  loading: true,
  error: null,
};

export function itemsReducer(
  state = initialState,
  action: ItemsActions
): InitialState {
  switch (action.type) {
    case ItemsActionTypes.GET_ITEMS_REQUEST:
      return { ...state, loading: true };

    case ItemsActionTypes.GET_ITEMS_SUCCESS:
      return { ...state, items: action.items, loading: false };

    case ItemsActionTypes.GET_ONE_ITEM_SUCCESS:
      return { ...state, oneItem: action.item, loading: false };

    case ItemsActionTypes.GET_ITEMS_ERROR:
      return { ...state, error: action.error, loading: false };

    case ItemsActionTypes.RESET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
