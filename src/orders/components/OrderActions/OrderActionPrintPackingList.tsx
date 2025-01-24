import { Button } from "@saleor/macaw-ui-next";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { useReactToPrint } from "react-to-print";

import OrderPackingList from "./OrderPackingList";

interface OrderActionPrintPackingListProps {
  order: any;
}

const OrderActionPrintPackingList: React.FC<OrderActionPrintPackingListProps> = ({ order }) => {
  const intl = useIntl();

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrintPackingList = useReactToPrint({ contentRef });

  return (
    <>
      <div style={{ display: "none" }}>
        <div ref={contentRef}>
          <OrderPackingList order={order} />
        </div>
      </div>
      <Button onClick={handlePrintPackingList} variant="secondary">
        {intl.formatMessage({
          id: "KoSYcG",
          defaultMessage: "Print Packing List",
          description: "action option to print the packing list",
        })}
      </Button>
    </>
  );
};

OrderActionPrintPackingList.displayName = "OrderActionPrintPackingList";
export default OrderActionPrintPackingList;
