// import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import CardTitle from "@saleor/components/CardTitle";
// import Container from "@saleor/components/Container";
// import Hr from "@saleor/components/Hr";
// import { orderUpdateProcessStatusMutation } from "@saleor/orders/mutations";
// import {
//   OrderUpdateProcessStatus,
//   OrderUpdateProcessStatusVariables,
// } from "@saleor/orders/types/OrderUpdateProcessStatus";
import React from "react";
import { OrderMarkAsPickedUpUrlQueryParams } from "../../urls";
// import React, { useEffect } from "react";
// import { useMutation } from "react-apollo";

interface OrderMarkAsPickedUpProps {
  params: OrderMarkAsPickedUpUrlQueryParams;
}

const OrderMarkAsPickedUp: React.FC<OrderMarkAsPickedUpProps> = ({ params }) => {
  // const [updateOrderProcessStatus, { data, loading, called, error }] =
  //   useMutation<
  //     OrderUpdateProcessStatusUnauthenticated,
  //     OrderUpdateProcessStatusUnauthenticatedVariables
  //   >(orderUpdateProcessStatusUnauthenticated);

  // const [updateOrderProcessStatus, { data, loading, called, error }] = useMutation<
  //   OrderUpdateProcessStatus,
  //   OrderUpdateProcessStatusVariables
  // >(orderUpdateProcessStatusMutation);

  // useEffect(() => {
  //   updateOrderProcessStatus({
  //     variables: {
  //       id: params.orderId,
  //       // secretToken: params.secretToken,
  //       isPrinted: true,
  //       isPickedUp: true,
  //     },
  //   });
  // }, [updateOrderProcessStatus]);

  // const hasErrors = error || data?.orderUpdateProcessStatus.errors.length > 0;

  return (
    <>
      <h1>Mark As Picket Up</h1>
      {/* <Container>
        <div style={{ margin: "50px auto 0 auto", maxWidth: "500px" }}>
          <Card>
            <CardTitle title="Mark order as picked up" />
            <CardContent style={{ textAlign: "center" }}>
              {loading && (
                <>
                  <CircularProgress size={46} />
                  <Typography variant="title">Marking order as picked up...</Typography>
                </>
              )}

              {!loading && called && (
                <>
                  {!hasErrors && (
                    <>
                      <span style={{ fontSize: "40px" }}>✅</span>
                      <Typography variant="title">
                        Order #{data.orderUpdateProcessStatus.order.number} marked as picked up
                      </Typography>
                    </>
                  )}
                  {hasErrors && (
                    <>
                      <span style={{ fontSize: "40px" }}>❌</span>
                      <Typography variant="title">
                        There was an error marking the order as picked up.
                      </Typography>
                    </>
                  )}
                </>
              )}
            </CardContent>
            <Hr />
            <CardActions></CardActions>
          </Card>
        </div>
      </Container> */}
    </>
  );
};

OrderMarkAsPickedUp.displayName = "OrderMarkAsPickedUp";
export default OrderMarkAsPickedUp;
