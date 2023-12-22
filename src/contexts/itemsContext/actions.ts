import { Item } from "@/models/item";

export enum ItemsActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
  GET_ONE_ITEM_SUCCESS = "GET_ONE_ITEM_SUCCESS",
  GET_ITEMS_ERROR = "GET_ITEMS_ERROR",
  RESET_ERROR = "RESET_ERROR",
}

interface GetItemsRequest {
  type: ItemsActionTypes.GET_ITEMS_REQUEST;
}

interface GetItemsSuccess {
  type: ItemsActionTypes.GET_ITEMS_SUCCESS;
  items: Item[];
}

interface GetOneItemSuccess {
  type: ItemsActionTypes.GET_ONE_ITEM_SUCCESS;
  item: Item;
}

interface GetItemsError {
  type: ItemsActionTypes.GET_ITEMS_ERROR;
  error: string;
}

interface ResetError {
  type: ItemsActionTypes.RESET_ERROR;
}

export type ItemsActions =
  | GetItemsRequest
  | GetItemsSuccess
  | GetItemsError
  | ResetError
  | GetOneItemSuccess;

export function getItemsRequest(): GetItemsRequest {
  return {
    type: ItemsActionTypes.GET_ITEMS_REQUEST,
  };
}

export function getItemsSuccess(items: Item[]): GetItemsSuccess {
  return {
    type: ItemsActionTypes.GET_ITEMS_SUCCESS,
    items,
  };
}

export function getOneItemSuccess(item: Item): GetOneItemSuccess {
  return {
    type: ItemsActionTypes.GET_ONE_ITEM_SUCCESS,
    item,
  };
}

export function getItemsError(error: string): GetItemsError {
  return {
    type: ItemsActionTypes.GET_ITEMS_ERROR,
    error,
  };
}

export function resetError(): ResetError {
  return {
    type: ItemsActionTypes.RESET_ERROR,
  };
}
