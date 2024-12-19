/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrderUpdateProcessStatusUnauthenticated
// ====================================================

export interface OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated_order {
  __typename: "Order";
  number: string | null;
}

export interface OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated_errors {
  __typename: "Error";
  field: string | null;
  message: string | null;
}

export interface OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated {
  __typename: "OrderUpdateProcessStatusUnauthenticated";
  order: OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated_order | null;
  errors: OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated_errors[] | null;
}

export interface OrderUpdateProcessStatusUnauthenticated {
  orderUpdateProcessStatusUnauthenticated: OrderUpdateProcessStatusUnauthenticated_orderUpdateProcessStatusUnauthenticated | null;
}

export interface OrderUpdateProcessStatusUnauthenticatedVariables {
  id: string;
  isPrinted?: boolean | null;
  isPickedUp?: boolean | null;
  secretToken: string;
}
