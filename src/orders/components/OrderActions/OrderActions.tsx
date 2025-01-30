import { gql, useMutation } from "@apollo/client";
import { DashboardCard } from "@dashboard/components/Card";
import {
  OrderDetailsFragment,
  useOrderMarkAsPickedUpMutation,
  useOrderMarkAsPrintedMutation,
} from "@dashboard/graphql";
import useNotifier from "@dashboard/hooks/useNotifier";
import { commonMessages } from "@dashboard/intl";
import { Button, Skeleton } from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

import OrderActionPrintPackingList from "./OrderActionPrintPackingList";

const orderSendConfirmationEmail = gql`
  mutation OrderSendConfirmationEmail($id: ID!) {
    orderSendConfirmationEmail(id: $id) {
      message
      success
    }
  }
`;

interface OrderDetailsPageProps {
  order: OrderDetailsFragment;
  loading: boolean;
}

interface ResendData {
  orderSendConfirmationEmail: {
    success: boolean | null;
    message: string | null;
  };
}

interface ResendVariables {
  id: string;
}

const OrderActions: React.FC<OrderDetailsPageProps> = ({ order, loading }) => {
  const intl = useIntl();
  const notify = useNotifier();

  const [resendConfirmationEmail] = useMutation<ResendData, ResendVariables>(
    orderSendConfirmationEmail,
  );

  const handleResendOrderConfirmation = async () => {
    const result = await resendConfirmationEmail({ variables: { id: order.id } });

    if (result.data?.orderSendConfirmationEmail.success) {
      notify({
        status: "success",
        text: intl.formatMessage({
          id: "zzqGhz",
          defaultMessage: "Order Confirmation email sent.",
        }),
      });

      return;
    }

    notify({
      status: "error",
      // eslint-disable-next-line formatjs/enforce-id
      text: intl.formatMessage({
        id: "z3qGhz",
        defaultMessage: result.data?.orderSendConfirmationEmail.message,
      }),
    });
  };

  const [orderMarkAsPrinted] = useOrderMarkAsPrintedMutation({
    onCompleted: data => {
      if (data.orderMarkAsPrinted?.success) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        window.location.reload();
      }
    },
  });

  const handleMarkAsPrinted = () => {
    orderMarkAsPrinted({
      variables: {
        id: order.id,
      },
    });
  };

  const [orderMarkAsPickedUp] = useOrderMarkAsPickedUpMutation({
    onCompleted: data => {
      if (data.orderMarkAsPickedUp?.success) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        window.location.reload();
      }
    },
  });

  const handleMarkAsPickedUp = () => {
    orderMarkAsPickedUp({
      variables: {
        id: order.id,
      },
    });
  };

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage({
            id: "l+4+cg",
            defaultMessage: "Actions",
            description: "action options for the order",
          })}
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content display="flex" flexDirection="column" gap={3}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <Button onClick={handleResendOrderConfirmation} variant="secondary">
              {intl.formatMessage({
                id: "7vBjSP",
                defaultMessage: "Send order confirmation",
                description: "action option to send the order confirmation email to the customer",
              })}
            </Button>

            <OrderActionPrintPackingList order={order} />
            <Button
              onClick={handleMarkAsPrinted}
              variant="secondary"
              disabled={loading || order?.printedAt?.length > 0}
            >
              {intl.formatMessage({
                id: "s4phnq",
                defaultMessage: "Mark Order As Printed",
                description: "action option to mark the order as printed",
              })}
            </Button>
            <Button
              onClick={handleMarkAsPickedUp}
              variant="secondary"
              disabled={loading || order?.pickedUpAt?.length > 0}
            >
              {intl.formatMessage({
                id: "Bw4qC+",
                defaultMessage: "Mark Order As Picked Up",
                description: "action option to mark the order as picked up",
              })}
            </Button>
          </>
        )}
      </DashboardCard.Content>
    </DashboardCard>
  );
};

OrderActions.displayName = "OrderActions";
export default OrderActions;
