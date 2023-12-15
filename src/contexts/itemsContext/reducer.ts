import { ItemsActionTypes, ItemsActions } from "./actions";

interface InitialState {
  items: [];
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
    default:
      return state;
  }
}
