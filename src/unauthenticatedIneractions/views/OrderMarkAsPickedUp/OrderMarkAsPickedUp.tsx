import Hr from "@dashboard/components/Hr";
import { useOrderMarkAsPickedUpMutation } from "@dashboard/graphql";
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

import { OrderMarkAsPickedUpUrlQueryParams } from "../../urls";

interface OrderMarkAsPickedUpProps {
  params: OrderMarkAsPickedUpUrlQueryParams;
}

const OrderMarkAsPickedUp: React.FC<OrderMarkAsPickedUpProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const [orderMarkAsPickedUp, { called, loading }] = useOrderMarkAsPickedUpMutation({
    disableErrorHandling: true,
    onError: error => {
      notify({
        status: "error",
        text: error.message,
      });
      navigate("?result=error", { replace: true });
    },

    onCompleted: data => {
      if (data.orderMarkAsPickedUp?.success) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
      }

      navigate(`?result=success&orderNumber=${data.orderMarkAsPickedUp.orderName}`, {
        replace: true,
      });
    },
  });

  useEffect(() => {
    if (!loading && !called && params.orderId) {
      orderMarkAsPickedUp({
        variables: {
          id: params.orderId,
        },
      });
    }
  }, [loading, called, orderMarkAsPickedUp, params.orderId]);

  return (
    <>
      <Container>
        <div style={{ margin: "50px auto 0 auto", maxWidth: "500px" }}>
          <Card>
            <CardContent style={{ textAlign: "center" }}>
              {loading && (
                <>
                  <CircularProgress size={46} />
                  <Typography variant="h1">Marking order as picked up...</Typography>
                </>
              )}

              {!loading && (
                <>
                  {params.result === "success" && (
                    <>
                      <span style={{ fontSize: "40px" }}>✅</span>
                      <Typography variant="h2">
                        Order #{params.orderNumber} marked as picked up
                      </Typography>
                      {/* <button onClick={() => orderBulkMarkedAsPickedUp()}>Mark As Picked Up</button> */}
                    </>
                  )}
                  {params.result === "error" && (
                    <>
                      <span style={{ fontSize: "40px" }}>❌</span>
                      <Typography variant="h2">
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
      </Container>
    </>
  );
};

OrderMarkAsPickedUp.displayName = "OrderFulfill";
export default OrderMarkAsPickedUp;
