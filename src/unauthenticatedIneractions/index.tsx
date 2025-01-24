import { Route } from "@dashboard/components/Router";
import { parse as parseQs } from "qs";
import React from "react";
import { RouteComponentProps, Switch } from "react-router-dom";

import { NotFound } from "../NotFound";
import Layout from "./components/Layout";
import { orderFulfillPath, orderMarkAsPickedUpPath } from "./urls";
import OrderFulfillView from "./views/OrderFulfill";
import OrderMarkAsPickedUpView from "./views/OrderMarkAsPickedUp";

const UnauthenticatedInteractionsRouter: React.FC = () => {
  const OrderFulfill: React.StatelessComponent<RouteComponentProps<any>> = ({ location }) => {
    const qs = parseQs(location.search.substr(1)) as any;

    return <OrderFulfillView params={qs} />;
  };

  const OrderMarkAsPickedUp: React.StatelessComponent<RouteComponentProps<any>> = ({
    location,
  }) => {
    const qs = parseQs(location.search.substr(1)) as any;

    return <OrderMarkAsPickedUpView params={qs} />;
  };

  return (
    <Layout>
      <Switch>
        <Route path={orderFulfillPath} component={OrderFulfill} />
        <Route path={orderMarkAsPickedUpPath} component={OrderMarkAsPickedUp} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

UnauthenticatedInteractionsRouter.displayName = "UnauthenticatedInteractionsRouter";
export default UnauthenticatedInteractionsRouter;
