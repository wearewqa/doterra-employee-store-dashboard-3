import ActionDialog from "@dashboard/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import { useOrderListWithLinesQuery } from "@dashboard/graphql";
import { mapEdgesToItems } from "@dashboard/utils/maps";
import AutoPrint from "@dashboard/utils/print/AutoPrint";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import OrderPackingList from "../OrderActions/OrderPackingList";

export interface OrderBulkPrintPackingListDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  orderIds: string[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderBulkPrintPackingListDialog: React.FC<OrderBulkPrintPackingListDialogProps> = ({
  confirmButtonState,
  numberOfOrders,
  orderIds,
  open,
  onClose,
  onConfirm,
}) => {
  const intl = useIntl();

  const { data, loading } = useOrderListWithLinesQuery({
    displayLoader: true,
    variables: {
      first: orderIds.length,
      filter: {
        ids: orderIds,
      },
    },
    skip: !open || orderIds.length === 0,
  });

  const orders = mapEdgesToItems(data?.orders);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="default"
      title={intl.formatMessage({
        id: "d1RYL2",
        defaultMessage: "Print Packing Lists",
        description: "dialog header",
      })}
      onClose={onClose}
      onConfirm={onConfirm}
      disabled={loading}
    >
      {loading ? (
        <div>Loading {numberOfOrders} order(s)</div>
      ) : (
        <>
          <FormattedMessage
            id="N7qrzc"
            defaultMessage="{counter,plural,one{You have selected 1 order to print. Once you have printed it, click 'Confirm' to mark it as printed.} other{You have selected {displayQuantity} orders to print. Once you have printed them, click 'Confirm' to mark them as printed.}}"
            values={{
              counter: numberOfOrders,
              displayQuantity: <strong>{numberOfOrders}</strong>,
            }}
          />
          {orders && orders.length > 0 && (
            <AutoPrint>
              {orders.map(order => (
                <OrderPackingList key={order.id} order={order} />
              ))}
            </AutoPrint>
          )}
        </>
      )}
    </ActionDialog>
  );
};

OrderBulkPrintPackingListDialog.displayName = "OrderBulkMarkAsPickedUpDialog";
export default OrderBulkPrintPackingListDialog;
