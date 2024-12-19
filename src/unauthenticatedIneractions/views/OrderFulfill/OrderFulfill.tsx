// import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import CardTitle from "@saleor/components/CardTitle";
// import Container from "@saleor/components/Container";
// import Hr from "@saleor/components/Hr";
// import { orderFulfillMutation } from "@saleor/orders/mutations";
// import { OrderFulfillUrlQueryParams } from "@saleor/unauthenticatedIneractions/urls";
// import React, { useEffect } from "react";
// import { useMutation } from "react-apollo";
// import {
//   OrderFulfill as OrderFulfillMutation,
//   OrderFulfillVariables,
// } from "../../../orders/types/OrderFulfill";

// interface OrderFulfillProps {
//   params: OrderFulfillUrlQueryParams;
// }

// const OrderFulfill: React.FC<OrderFulfillProps> = ({ params }) => {
//   // const [fulfillOrder, { data, loading, called, error }] = useMutation<
//   //   OrderFulfillUnauthenticated,
//   //   OrderFulfillUnauthenticatedVariables
//   // >(orderFulfillUnauthenticated);

//   const [fulfillOrder, { data, loading, called, error }] = useMutation<
//     OrderFulfillMutation,
//     OrderFulfillVariables
//   >(orderFulfillMutation);

//   useEffect(() => {
//     fulfillOrder({
//       variables: {
//         id: params.orderId,
//         // secretToken: params.secretToken,
//       },
//     });
//   }, [fulfillOrder]);

//   const hasErrors = error || data?.orderFulfill.errors.length > 0;

//   return (
//     <>
//       <Container>
//         <div style={{ margin: "50px auto 0 auto", maxWidth: "500px" }}>
//           <Card>
//             <CardTitle title="Fulfill order" />
//             <CardContent style={{ textAlign: "center" }}>
//               {loading && (
//                 <>
//                   <CircularProgress size={46} />
//                   <Typography variant="title">Fulfilling order...</Typography>
//                 </>
//               )}

//               {!loading && called && (
//                 <>
//                   {!hasErrors && (
//                     <>
//                       <span style={{ fontSize: "40px" }}>✅</span>
//                       <Typography variant="title">
//                         Order #{data.orderFulfill.order.number} fulfilled
//                       </Typography>
//                     </>
//                   )}
//                   {hasErrors && (
//                     <>
//                       <span style={{ fontSize: "40px" }}>❌</span>
//                       <Typography variant="title">
//                         There was an error fulfilling the order.
//                       </Typography>
//                     </>
//                   )}
//                 </>
//               )}
//             </CardContent>
//             <Hr />
//             <CardActions></CardActions>
//           </Card>
//         </div>
//       </Container>
//     </>
//   );
// };

// OrderFulfill.displayName = "OrderFulfill";
// export default OrderFulfill;
