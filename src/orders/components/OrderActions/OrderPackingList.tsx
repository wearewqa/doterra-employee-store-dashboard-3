import {
  orderFulfillUrl,
  orderMarkAsPickedUpUrl,
} from "@dashboard/unauthenticatedIneractions/urls";
import moment from "moment";
import React, { FunctionComponent } from "react";
import QRCode from "react-qr-code";
import urlJoin from "url-join";

const pagePrintStyles = "@page { margin: 15mm 16mm 27mm 16mm !important; size: 215.9mm 279.4mm; }";

const containerStyle = {
  fontFamily: "Arial, Helvetica, sans-serif",
  pageBreakBefore: "always",
  margin: "0",
} as React.CSSProperties;

const columnsStyle = {
  display: "flex",
} as React.CSSProperties;

const columnOneStyle = {
  width: "50%",
} as React.CSSProperties;

const columnTwoStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  width: "50%",
} as React.CSSProperties;

const orderDateStyle = {
  margin: "0 0 5px",
  fontSize: "20px",
} as React.CSSProperties;

const tableListStyle = {
  margin: "20px 0 30px",
  fontFamily: "Arial, Helvetica, sans-serif",
  width: "100%",
  borderCollapse: "collapse",
} as React.CSSProperties;

const thListStyle = {
  padding: "10px",
  textAlign: "left",
  borderBottom: "1px solid #000",
  borderCollapse: "collapse",
  fontSize: "14px",
  color: "#000",
  fontWeight: "bold",
} as React.CSSProperties;

const tdListStyle = {
  padding: "5px 10px",
  borderCollapse: "collapse",
  lineHeight: 1,
} as React.CSSProperties;

const tdCheckBox = {
  width: 20,
  height: 20,
  border: "1px solid #000",
};
const metaSectionHeadingStyle = {
  fontWeight: "normal",
  margin: 0,
  marginBottom: 4,
  fontSize: 16,
} as React.CSSProperties;

const qrCodesGridStyles = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
} as React.CSSProperties;

const qrCodeWrapperStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  margin: "0 0 0 40px",
} as React.CSSProperties;

const qrCodeHeadingStyles = {
  margin: "0 0 5px",
  fontSize: "11px",
  fontWeight: 400,
} as React.CSSProperties;

const qrCodeStyles = {
  background: "white",
} as React.CSSProperties;

interface OrderPackingListProps {
  order: {
    id: string;
    secretToken: string;
    lines: Array<{
      productName: string;
      productSku: string;
      quantity: number;
      unitPrice: {
        gross: {
          amount: number;
        };
      };
    }>;
    user: {
      firstName: string;
      lastName: string;
    };
    userEmail: string;
    number: string;
    shippingMethodName: string;
    pickupPerson: string;
  };
}

const OrderPackingList: FunctionComponent<OrderPackingListProps> = ({ order }) => {
  if (!order) {
    return null;
  }

  const orderLines = [...order.lines].sort(function (a, b) {
    return a["productName"].toLowerCase() > b["productName"].toLowerCase() ? 1 : -1;
  });

  // const orderLines = order.lines;
  const fulfillOrderUrl = urlJoin(
    document.location.origin,
    "/dashboard" +
      orderFulfillUrl({
        orderId: order.id,
        secretToken: "disabled",
        // secretToken: order.secretToken,
      }),
  );

  const markOrderAsPickedUpUrl = urlJoin(
    "/dashboard" +
      orderMarkAsPickedUpUrl({
        orderId: order.id,
        secretToken: "disabled",
        // secretToken: order.secretToken,
      }),
  );

  const formattedName = () => {
    if (!order.user) {
      return "No name";
    }

    const firstNameParts = order.user.firstName?.split(" ");
    const lastNameParts = order.user.lastName?.split(" ");

    // The user import add firstname and surname into the firstname field, so
    // if the lastname field is empty use the last word of the firstname field.
    if (lastNameParts && lastNameParts.length && lastNameParts[lastNameParts.length - 1] !== "") {
      return `${lastNameParts[lastNameParts.length - 1]}, ${firstNameParts[0]}`;
    }

    if (!firstNameParts || firstNameParts.length === 0) {
      return "No name";
    }

    return `${firstNameParts[firstNameParts.length - 1]}, ${firstNameParts[0]}`;
  };

  return (
    <>
      <style>{pagePrintStyles}</style>
      <div style={containerStyle}>
        <div style={columnsStyle}>
          <div style={columnOneStyle}>
            <div style={{ marginBottom: 5, marginTop: 10 }}>
              <strong style={{ fontSize: 34 }}>{formattedName()}</strong>
            </div>
            <div style={{ fontSize: 28, marginBottom: 5 }}>
              <strong>#{order.number}</strong>
            </div>
            <div style={orderDateStyle}>{moment(new Date()).format("MM/DD/YY")}</div>

            <div style={{ marginBottom: 5 }}>{order.shippingMethodName}</div>

            <div>
              <div style={metaSectionHeadingStyle}>
                <strong>Dedicated Pickup person: </strong>
                {order.pickupPerson === "" ? "N/A" : order.pickupPerson}
              </div>
            </div>
          </div>
          <div style={columnTwoStyle}>
            <div style={qrCodesGridStyles}>
              <div style={qrCodeWrapperStyles}>
                <h4 style={qrCodeHeadingStyles}>Fulfill order</h4>
                <div style={qrCodeStyles}>
                  <QRCode size={120} value={fulfillOrderUrl} />
                </div>
              </div>
              <div style={qrCodeWrapperStyles}>
                <h4 style={qrCodeHeadingStyles}>Mark order as picked up</h4>
                <div style={qrCodeStyles}>
                  <QRCode size={120} value={markOrderAsPickedUpUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <table style={tableListStyle}>
          <thead>
            <tr>
              <th style={{ ...thListStyle }}></th>
              <th style={{ ...thListStyle }}>Product</th>
              <th style={thListStyle}>SKU</th>
              <th style={{ ...thListStyle, textAlign: "right" }}>Quantity</th>
              <th style={{ ...thListStyle, textAlign: "right" }}>Points</th>
              <th style={{ ...thListStyle, textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderLines.map((value, index) => {
              return (
                <tr key={index}>
                  <td style={tdListStyle}>
                    <div style={tdCheckBox}></div>
                  </td>
                  <td style={tdListStyle}>{value.productName}</td>
                  <td style={tdListStyle}>{value.productSku}</td>
                  <td style={{ ...tdListStyle, textAlign: "right" }}>{value.quantity}</td>
                  <td style={{ ...tdListStyle, textAlign: "right" }}>
                    {value.unitPrice.gross.amount}
                  </td>
                  <td style={{ ...tdListStyle, textAlign: "right" }}>
                    {value.quantity * value.unitPrice.gross.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderPackingList;
