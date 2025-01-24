import ActionDialog from "@dashboard/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@dashboard/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderBulkMarkAsPickedUpDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  numberOfOrders: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderBulkMarkAsPickedUpDialog: React.FC<OrderBulkMarkAsPickedUpDialogProps> = ({
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
        id: "AHNeH6",
        defaultMessage: "Mark Orders As Picked Up",
        description: "dialog header",
      })}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <FormattedMessage
        id="C8STNt"
        defaultMessage="{counter,plural,one{Are you sure you want to mark this order as picked up?} other{Are you sure you want to mark {displayQuantity} orders as picked up?}}"
        values={{
          counter: numberOfOrders,
          displayQuantity: <strong>{numberOfOrders}</strong>,
        }}
      />
    </ActionDialog>
  );
};

OrderBulkMarkAsPickedUpDialog.displayName = "OrderBulkMarkAsPickedUpDialog";
export default OrderBulkMarkAsPickedUpDialog;
