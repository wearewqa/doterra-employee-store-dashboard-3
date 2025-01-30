import { DateTime } from "@dashboard/components/Date";
import { Pill } from "@dashboard/components/Pill";
import { OrderDetailsFragment } from "@dashboard/graphql";
import { transformOrderProcessStatus, transformOrderStatus } from "@dashboard/misc";
import { makeStyles } from "@saleor/macaw-ui";
import { Box, Skeleton, Text } from "@saleor/macaw-ui-next";
import React from "react";
import { useIntl } from "react-intl";

export interface TitleProps {
  order?: OrderDetailsFragment;
}

const useStyles = makeStyles(
  theme => ({
    container: {
      alignItems: "center",
      display: "flex",
      gap: theme.spacing(2),
    },
    statusContainer: {
      display: "flex",
      marginLeft: theme.spacing(2),
      gap: theme.spacing(1),
    },
  }),
  { name: "OrderDetailsTitle" },
);
const Title: React.FC<TitleProps> = props => {
  const intl = useIntl();
  const classes = useStyles(props);
  const { order } = props;

  if (!order) {
    return null;
  }

  const { localized, status } = transformOrderStatus(order.status, intl);
  const { localized: localizedOrderProcessStatus, status: statusOrderProcessStatus } =
    transformOrderProcessStatus(order.pickedUpAt, order.printedAt, order.status);

  return (
    <div className={classes.container}>
      <Box display="flex" justifyContent="center" alignItems="center">
        {intl.formatMessage(
          { id: "AqXzM2", defaultMessage: "Order #{orderNumber}" },
          { orderNumber: order?.number },
        )}
        <div className={classes.statusContainer}>
          <Pill data-test-id="status-info" label={localized} color={status} />
          <Pill
            data-test-id="status-info"
            label={localizedOrderProcessStatus}
            color={statusOrderProcessStatus}
          />
        </div>
      </Box>

      <div>
        {order && order.created ? (
          <Text size={3} fontWeight="regular">
            <DateTime date={order.created} plain />
          </Text>
        ) : (
          <Skeleton style={{ width: "10em" }} />
        )}
      </div>
    </div>
  );
};

export default Title;
