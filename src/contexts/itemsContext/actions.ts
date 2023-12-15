export enum ItemsActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS",
  GET_ITEMS_ERROR = "GET_ITEMS_ERROR",
}

interface GetItemsRequest {
  type: ItemsActionTypes.GET_ITEMS_REQUEST;
}

interface GetItemsSuccess {
  type: ItemsActionTypes.GET_ITEMS_SUCCESS;
  items: [];
}

interface GetItemsError {
  type: ItemsActionTypes.GET_ITEMS_ERROR;
  error: string;
}

export type ItemsActions = GetItemsRequest | GetItemsSuccess | GetItemsError;

export function getItemsRequest(): GetItemsRequest {
  return {
    type: ItemsActionTypes.GET_ITEMS_REQUEST,
  };
}

export function GetItemsSuccess(items: []): GetItemsSuccess {
  return {
    type: ItemsActionTypes.GET_ITEMS_SUCCESS,
    items,
  };
}

export function GetItemsError(error: string): GetItemsError {
  return {
    type: ItemsActionTypes.GET_ITEMS_ERROR,
    error,
  };
}
