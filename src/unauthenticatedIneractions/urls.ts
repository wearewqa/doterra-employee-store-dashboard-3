import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

export const unauthenticatedInteractionsUrl = "/unauthenticated-interactions";

export const orderFulfillPath = urlJoin(unauthenticatedInteractionsUrl, "/order-fulfill/");
export interface OrderFulfillUrlQueryParams {
  orderId: string;
  secretToken: string;
}
export const orderFulfillUrl = (params?: OrderFulfillUrlQueryParams) =>
  orderFulfillPath + "?" + stringifyQs(params);

export const orderMarkAsPickedUpPath = urlJoin(
  unauthenticatedInteractionsUrl,
  "/order-mark-as-picked-up/",
);
export interface OrderMarkAsPickedUpUrlQueryParams {
  orderId: string;
  secretToken: string;
}
export const orderMarkAsPickedUpUrl = (params?: OrderMarkAsPickedUpUrlQueryParams) =>
  orderMarkAsPickedUpPath + "?" + stringifyQs(params);
