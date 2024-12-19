import { gql, useMutation } from "@apollo/client";
import { DashboardCard } from "@dashboard/components/Card";
import useNotifier from "@dashboard/hooks/useNotifier";
import { Button } from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

import OrderActionPrintPackingList from "./OrderActionPrintPackingList";

const orderSendConfirmationEmail = gql`
  mutation OrderSendConfirmationEmail($id: String!) {
    sendOrderConfirmationEmail(id: $id) {
      message
      success
    }
  }
`;

interface OrderDetailsPageProps {
  order: any;
}

interface ResendData {
  sendOrderConfirmationEmail: {
    success: boolean | null;
    message: string | null;
  };
}

interface ResendVariables {
  id: string;
}

const OrderActions: React.FC<OrderDetailsPageProps> = ({ order }) => {
  const intl = useIntl();
  const notify = useNotifier();

  const [resendConfirmationEmail] = useMutation<ResendData, ResendVariables>(
    orderSendConfirmationEmail,
  );

  const handleResendOrderConfirmation = async () => {
    const result = await resendConfirmationEmail({ variables: { id: order.id } });

    if (result.data?.sendOrderConfirmationEmail.success) {
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
        defaultMessage: result.data?.sendOrderConfirmationEmail.message,
      }),
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
      <DashboardCard.Content>
        <Button onClick={handleResendOrderConfirmation}>
          {intl.formatMessage({
            id: "7vBjSP",
            defaultMessage: "Send order confirmation",
            description: "action option to send the order confirmation email to the customer",
          })}
        </Button>

        <OrderActionPrintPackingList order={order} />
      </DashboardCard.Content>
    </DashboardCard>
  );
};

OrderActions.displayName = "OrderActions";
export default OrderActions;
