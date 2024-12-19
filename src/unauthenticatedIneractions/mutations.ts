// import gql from "graphql-tag";

// import {
//   OrderFulfillUnauthenticated,
//   OrderFulfillUnauthenticatedVariables,
// } from "./types/OrderFulfillUnauthenticated";
// import {
//   OrderUpdateProcessStatusUnauthenticated,
//   OrderUpdateProcessStatusUnauthenticatedVariables,
// } from "./types/OrderUpdateProcessStatusUnauthenticated";

// export const orderFulfillUnauthenticated = gql`
//   mutation OrderFulfillUnauthenticated($id: String!, $secretToken: String!) {
//     orderFulfillUnauthenticated(id: $id, secretToken: $secretToken) {
//       order {
//         number
//       }
//       errors {
//         field
//         message
//       }
//     }
//   }
// `;
// export const TypedOrderFulfillUnauthenticatedMutation = TypedMutation<
//   OrderFulfillUnauthenticated,
//   OrderFulfillUnauthenticatedVariables
// >(orderFulfillUnauthenticated);

// export const orderUpdateProcessStatusUnauthenticated = gql`
//   mutation OrderUpdateProcessStatusUnauthenticated(
//     $id: String!
//     $isPrinted: Boolean
//     $isPickedUp: Boolean
//     $secretToken: String!
//   ) {
//     orderUpdateProcessStatusUnauthenticated(
//       id: $id
//       isPrinted: $isPrinted
//       isPickedUp: $isPickedUp
//       secretToken: $secretToken
//     ) {
//       order {
//         number
//       }
//       errors {
//         field
//         message
//       }
//     }
//   }
// `;
// export const TypedOrderUpdateProcessStatusUnauthenticatedMutation = TypedMutation<
//   OrderUpdateProcessStatusUnauthenticated,
//   OrderUpdateProcessStatusUnauthenticatedVariables
// >(orderUpdateProcessStatusUnauthenticated);
