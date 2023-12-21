import { Item } from "@/models/item";
import { ItemsActionTypes, ItemsActions } from "./actions";

export interface InitialState {
  items: Item[];
  loading: boolean;
  error: null | string;
}
export const initialState: InitialState = {
  items: [],
  loading: false,
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
    case ItemsActionTypes.GET_ITEMS_ERROR:
      return { ...state, error: action.error, loading: false };
    case ItemsActionTypes.RESET_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
