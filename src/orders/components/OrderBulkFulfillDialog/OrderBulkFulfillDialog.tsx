import ActionDialog from "@dashboard/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderBulkFulfillDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
// REMOVE

const OrderBulkFulfillDialog: React.FC<OrderBulkFulfillDialogProps> = ({
  confirmButtonState,
  numberOfOrders,
  open,
  onClose,
  onConfirm,
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      variant="default"
      title={intl.formatMessage({
        id: "Wd1Qbc",
        defaultMessage: "Fulfill Orders",
        description: "dialog header",
      })}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <FormattedMessage
        id="ylxvde"
        defaultMessage="{counter,plural,one{Are you sure you want to fulfill this order?} other{Are you sure you want to filfill {displayQuantity} orders?}}"
        values={{
          counter: numberOfOrders,
          displayQuantity: <strong>{numberOfOrders}</strong>,
        }}
      />
    </ActionDialog>
  );
};

OrderBulkFulfillDialog.displayName = "OrderBulkFulfillDialog";
export default OrderBulkFulfillDialog;
