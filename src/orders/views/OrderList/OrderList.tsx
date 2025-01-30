// @ts-strict-ignore
import { useUser } from "@dashboard/auth";
import ChannelPickerDialog from "@dashboard/channels/components/ChannelPickerDialog";
import useAppChannel from "@dashboard/components/AppLayout/AppChannelContext";
import { useConditionalFilterContext } from "@dashboard/components/ConditionalFilter";
import DeleteFilterTabDialog from "@dashboard/components/DeleteFilterTabDialog";
import SaveFilterTabDialog from "@dashboard/components/SaveFilterTabDialog";
import { useShopLimitsQuery } from "@dashboard/components/Shop/queries";
import {
  useOrderBulkFulfillMutation,
  useOrderBulkMarkAsPickedUpMutation,
  useOrderBulkMarkAsPrintedMutation,
  useOrderDraftCreateMutation,
  useOrderListQuery,
} from "@dashboard/graphql";
import { useFilterHandlers } from "@dashboard/hooks/useFilterHandlers";
import { useFilterPresets } from "@dashboard/hooks/useFilterPresets";
import useListSettings from "@dashboard/hooks/useListSettings";
import useNavigator from "@dashboard/hooks/useNavigator";
import useNotifier from "@dashboard/hooks/useNotifier";
import { usePaginationReset } from "@dashboard/hooks/usePaginationReset";
import usePaginator, {
  createPaginationState,
  PaginatorContext,
} from "@dashboard/hooks/usePaginator";
import { useRowSelection } from "@dashboard/hooks/useRowSelection";
import { commonMessages } from "@dashboard/intl";
import OrderBulkFulfillDialog from "@dashboard/orders/components/OrderBulkFulfillDialog";
import OrderBulkMarkAsPickedUpDialog from "@dashboard/orders/components/OrderBulkMarkedAsPickedUpDialog";
import OrderBulkPrintPackingListDialog from "@dashboard/orders/components/OrderBulkPrintPackingListDialog";
import { ListViews } from "@dashboard/types";
import createDialogActionHandlers from "@dashboard/utils/handlers/dialogActionHandlers";
import createSortHandler from "@dashboard/utils/handlers/sortHandler";
import { mapEdgesToItems, mapNodeToChoice } from "@dashboard/utils/maps";
import { getSortParams } from "@dashboard/utils/sort";
import { useOnboarding } from "@dashboard/welcomePage/WelcomePageOnboarding/onboardingContext";
import isEqual from "lodash/isEqual";
import React, { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";

import OrderListPage from "../../components/OrderListPage/OrderListPage";
import {
  orderListUrl,
  OrderListUrlDialog,
  OrderListUrlQueryParams,
  orderSettingsPath,
  orderUrl,
} from "../../urls";
import { getFilterQueryParam, getFilterVariables, storageUtils } from "./filters";
import { DEFAULT_SORT_KEY, getSortQueryVariables } from "./sort";

interface OrderListProps {
  params: OrderListUrlQueryParams;
}

export const OrderList: React.FC<OrderListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const { updateListSettings, settings } = useListSettings(ListViews.ORDER_LIST);
  const { valueProvider } = useConditionalFilterContext();

  const { markOnboardingStepAsCompleted } = useOnboarding();

  useEffect(() => {
    markOnboardingStepAsCompleted("explore-orders");
  }, []);

  const {
    clearRowSelection,
    selectedRowIds,
    setClearDatagridRowSelectionCallback,
    setSelectedRowIds,
  } = useRowSelection(params);
  const {
    hasPresetsChanged,
    onPresetChange,
    onPresetDelete,
    onPresetSave,
    onPresetUpdate,
    getPresetNameToDelete,
    presets,
    selectedPreset,
    setPresetIdToDelete,
  } = useFilterPresets({
    params,
    reset: clearRowSelection,
    getUrl: orderListUrl,
    storageUtils,
  });

  usePaginationReset(orderListUrl, params, settings.rowNumber);

  const intl = useIntl();
  const { channel, availableChannels } = useAppChannel(false);
  const user = useUser();
  const channels = user?.user?.accessibleChannels ?? [];
  const [createOrder] = useOrderDraftCreateMutation({
    onCompleted: data => {
      notify({
        status: "success",
        text: intl.formatMessage({
          id: "6udlH+",
          defaultMessage: "Order draft successfully created",
        }),
      });
      navigate(orderUrl(data.draftOrderCreate.order.id));
    },
  });
  const limitOpts = useShopLimitsQuery({
    variables: {
      orders: true,
    },
  });
  const noChannel = !channel && typeof channel !== "undefined";
  const channelOpts = availableChannels ? mapNodeToChoice(channels) : null;
  const [_, resetFilters, handleSearchChange] = useFilterHandlers({
    createUrl: orderListUrl,
    getFilterQueryParam,
    params,
    defaultSortField: DEFAULT_SORT_KEY,
    hasSortWithRank: true,
    keepActiveTab: true,
    cleanupFn: clearRowSelection,
  });
  const [openModal, closeModal] = createDialogActionHandlers<
    OrderListUrlDialog,
    OrderListUrlQueryParams
  >(navigate, orderListUrl, params);
  const paginationState = createPaginationState(settings.rowNumber, params);
  const filterVariables = getFilterVariables(params, valueProvider.value);

  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: filterVariables,
      sort: getSortQueryVariables(params),
    }),
    [params, settings.rowNumber, valueProvider.value, paginationState],
  );
  const { data, refetch } = useOrderListQuery({
    displayLoader: true,
    variables: queryVariables,
  });

  const orders = mapEdgesToItems(data?.orders);
  const paginationValues = usePaginator({
    pageInfo: data?.orders?.pageInfo,
    paginationState,
    queryString: params,
  });

  const [orderBulkFulfill] = useOrderBulkFulfillMutation({
    variables: {
      ids: selectedRowIds,
    },
    onCompleted: data => {
      if (data.orderBulkFulfill?.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        refetch();
        clearRowSelection();
        closeModal();
      }
    },
  });

  const [orderBulkMarkAsPickedUp] = useOrderBulkMarkAsPickedUpMutation({
    variables: {
      ids: selectedRowIds,
    },
    onCompleted: data => {
      if (data.orderBulkMarkedAsPickedUp?.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        refetch();
        clearRowSelection();
        closeModal();
      }
    },
  });

  const [orderBulkMarkAsPrinted] = useOrderBulkMarkAsPrintedMutation({
    variables: {
      ids: selectedRowIds,
    },
    onCompleted: data => {
      if (data.orderBulkMarkedAsPrinted?.errors.length === 0) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges),
        });
        refetch();
        clearRowSelection();
        closeModal();
      }
    },
  });

  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  const handleOrderExport = async () => {
    const token = localStorage.getItem("_saleorRefreshToken");

    try {
      const response = await fetch(`${process.env.API_URL}/export-orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to export orders");
      }

      // Create a blob for the CSV file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link element to download the file
      const link = document.createElement("a");

      link.href = url;
      link.download = `exported_orders_${getFormattedDate()}.csv`; // Set the desired file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      notify({
        status: "success",
        text: "Orders exports successfully to you download folder.",
      });
    } catch (error) {
      console.error("Error exporting orders:", error.message);
      notify({
        status: "error",
        text: "Failed to export orders. Please try again.",
      });
    }
  };
  const handleSort = createSortHandler(navigate, orderListUrl, params);

  const handleSetSelectedOrderIds = useCallback(
    (rows: number[], clearSelection: () => void) => {
      if (!orders) {
        return;
      }

      const rowsIds = rows.map(row => orders[row].id);
      const haveSaveValues = isEqual(rowsIds, selectedRowIds);

      if (!haveSaveValues) {
        setSelectedRowIds(rowsIds);
      }

      setClearDatagridRowSelectionCallback(clearSelection);
    },
    [orders, selectedRowIds, setClearDatagridRowSelectionCallback, setSelectedRowIds],
  );

  return (
    <PaginatorContext.Provider value={paginationValues}>
      <OrderListPage
        settings={settings}
        currentTab={selectedPreset}
        disabled={!data}
        limits={limitOpts.data?.shop.limits}
        orders={mapEdgesToItems(data?.orders)}
        sort={getSortParams(params)}
        onAdd={() => openModal("create-order")}
        onUpdateListSettings={updateListSettings}
        onSort={handleSort}
        onSearchChange={handleSearchChange}
        onTabSave={() => openModal("save-search")}
        onTabDelete={(tabIndex: number) => {
          setPresetIdToDelete(tabIndex);
          openModal("delete-search");
        }}
        onTabChange={onPresetChange}
        onTabUpdate={onPresetUpdate}
        initialSearch={params.query || ""}
        tabs={presets.map(tab => tab.name)}
        onAll={resetFilters}
        onSettingsOpen={() => navigate(orderSettingsPath)}
        params={params}
        hasPresetsChanged={hasPresetsChanged()}
        selectedOrderIds={selectedRowIds}
        onSelectOrderIds={handleSetSelectedOrderIds}
        onOrdersFulfill={() => openModal("bulk-fulfill", { ids: selectedRowIds })}
        onOrdersMarkAsPickedUp={() => openModal("mark-as-picked-up", { ids: selectedRowIds })}
        onOrdersPrintPackingList={() => openModal("print-packing-list", { ids: selectedRowIds })}
        onExportOrders={handleOrderExport}
      />
      <SaveFilterTabDialog
        open={params.action === "save-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={onPresetSave}
      />
      <DeleteFilterTabDialog
        open={params.action === "delete-search"}
        confirmButtonState="default"
        onClose={closeModal}
        onSubmit={onPresetDelete}
        tabName={getPresetNameToDelete()}
      />
      {!noChannel && (
        <ChannelPickerDialog
          channelsChoices={channelOpts}
          confirmButtonState="success"
          defaultChoice={channel.id}
          open={params.action === "create-order"}
          onClose={closeModal}
          onConfirm={channelId =>
            createOrder({
              variables: {
                input: { channelId },
              },
            })
          }
        />
      )}
      <OrderBulkFulfillDialog
        confirmButtonState="default"
        open={params.action === "bulk-fulfill" && selectedRowIds.length > 0}
        onClose={closeModal}
        onConfirm={orderBulkFulfill}
        numberOfOrders={selectedRowIds.length.toString()}
      />
      <OrderBulkMarkAsPickedUpDialog
        confirmButtonState="default"
        open={params.action === "mark-as-picked-up" && selectedRowIds.length > 0}
        onClose={closeModal}
        onConfirm={orderBulkMarkAsPickedUp}
        numberOfOrders={selectedRowIds.length.toString()}
      />
      <OrderBulkPrintPackingListDialog
        confirmButtonState="default"
        open={params.action === "print-packing-list" && selectedRowIds.length > 0}
        onClose={closeModal}
        onConfirm={orderBulkMarkAsPrinted}
        numberOfOrders={selectedRowIds.length.toString()}
        orderIds={selectedRowIds}
      />
    </PaginatorContext.Provider>
  );
};

export default OrderList;
