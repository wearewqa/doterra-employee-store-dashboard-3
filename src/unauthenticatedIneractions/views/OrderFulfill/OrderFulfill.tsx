import Hr from "@dashboard/components/Hr";
import { useOrderFulfillAllLinesMutation } from "@dashboard/graphql";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { OrderFulfillUrlQueryParams } from "../../urls";

interface OrderFulfillProps {
  params: OrderFulfillUrlQueryParams;
}

const OrderFulfill: React.FC<OrderFulfillProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [orderFulfillAllLines, { called, loading }] = useOrderFulfillAllLinesMutation({
    disableErrorHandling: true,
    onError: error => {
      notify({
        status: "error",
        text: error.message,
      });
      navigate("?result=error", { replace: true });
    },

    onCompleted: data => {
      if (data.orderFulfillAllLines?.success) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }

      navigate(`?result=success&orderNumber=${data.orderFulfillAllLines.orderName}`, {
        replace: true,
      });
    },
  });

  useEffect(() => {
    if (!loading && !called && params.orderId) {
      orderFulfillAllLines({
        variables: {
          id: params.orderId,
        },
      });
    }
  }, [loading, called, orderFulfillAllLines, params.orderId]);

  return (
    <>
      <Container>
        <div style={{ margin: "50px auto 0 auto", maxWidth: "500px" }}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              {loading && (
                <>
                  <CircularProgress size={46} />
                  <Typography variant="h1">Fulfilling Order...</Typography>
                </>
              )}

              {!loading && (
                <>
                  {params.result === "success" && (
                    <>
                      <span style={{ fontSize: "40px" }}>✅</span>
                      <Typography variant="h2">Order #{params.orderNumber} fulfilled</Typography>
                    </>
                  )}
                  {params.result === "error" && (
                    <>
                      <span style={{ fontSize: "40px" }}>❌</span>
                      <Typography variant="h2">There was an error fulfilling the order.</Typography>
                    </>
                  )}
                </>
              )}
            </CardContent>
            <Hr />
            <CardActions></CardActions>
          </Card>
        </div>
      </Container>
    </>
  );
};

OrderFulfill.displayName = "OrderFulfill";
export default OrderFulfill;
