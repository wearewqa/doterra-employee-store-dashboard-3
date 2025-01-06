import { useOrderBulkFulfillMutation } from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import React, { memo, useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { OrderFulfillUrlQueryParams } from "../../urls";
import useNavigator from "@dashboard/hooks/useNavigator";

interface OrderFulfillProps {
  params: OrderFulfillUrlQueryParams;
}

const OrderFulfill: React.FC<OrderFulfillProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [orderBulkFulfill, { called, loading }] = useOrderBulkFulfillMutation({
    disableErrorHandling: true,
    onError: error => {
      notify({
        status: "error",
        text: error.message,
      });
      navigate("?", { replace: true });
    },

    onCompleted: data => {
      if (data.orderBulkFulfill?.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }

      navigate("?", { replace: true });
    },
  });

  useEffect(() => {
    if (!loading && !called && params.orderId) {
      orderBulkFulfill({
        variables: {
          ids: params.orderId,
        },
      });
    }
  }, [loading, called, orderBulkFulfill, params.orderId]);

  return (
    <>
      <h1>Order Fulfill</h1>
      <button onClick={() => orderBulkFulfill()}>Fulfill</button>
      {/* <Container>
        <div style={{ margin: "50px auto 0 auto", maxWidth: "500px" }}>
          <Card>
            <CardTitle title="Fulfill order" />
            <CardContent style={{ textAlign: "center" }}>
              {loading && (
                <>
                  <CircularProgress size={46} />
                  <Typography variant="title">Fulfilling order...</Typography>
                </>
              )}

              {!loading && called && (
                <>
                  {!hasErrors && (
                    <>
                      <span style={{ fontSize: "40px" }}>✅</span>
                      <Typography variant="title">
                        Order #{data.orderFulfill.order.number} fulfilled
                      </Typography>
                    </>
                  )}
                  {hasErrors && (
                    <>
                      <span style={{ fontSize: "40px" }}>❌</span>
                      <Typography variant="title">
                        There was an error fulfilling the order.
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

OrderFulfill.displayName = "OrderFulfill";
export default OrderFulfill;
