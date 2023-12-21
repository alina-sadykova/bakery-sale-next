import { Item } from "@/models/item";

export enum ItemsActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
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
  | ResetError;

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
