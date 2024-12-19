import { DashboardCard } from "@dashboard/components/Card";
import FormSpacer from "@dashboard/components/FormSpacer";
import { ChannelErrorFragment } from "@dashboard/graphql";
import { FormChange } from "@dashboard/hooks/useForm";
import { getFormErrors } from "@dashboard/utils/errors";
import { Combobox, Input } from "@saleor/macaw-ui-next";
import React from "react";

import { FormData } from "../ChannelForm";

export interface ChannelShopStatusFormProps {
  data: FormData;
  disabled: boolean;
  errors: ChannelErrorFragment[];
  onChange: FormChange;
}

export const ChannelShopStatusForm: React.FC<ChannelShopStatusFormProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  const formErrors = getFormErrors<keyof FormData, ChannelErrorFragment>(
    ["shopStatus", "shopStatusPageTitle", "shopStatusPageDescription"],
    errors,
  );

  return (
    <>
      <DashboardCard>
        <DashboardCard.Header>
          <DashboardCard.Title>Shop Status</DashboardCard.Title>
        </DashboardCard.Header>
        <DashboardCard.Content>
          <Combobox
            disabled={disabled}
            error={!!formErrors.shopStatus}
            label="Shop Status"
            name="shopStatus"
            options={[
              { label: "Open", value: "open" },
              { label: "Closed", value: "closed" },
            ]}
            value={data.shopStatus}
            onChange={() => {
              onChange({
                target: {
                  name: "shopStatus",
                  value: data.shopStatus === "open" ? "closed" : "open",
                },
              });
            }}
          />
          <FormSpacer />
          <Input
            error={!!formErrors.shopStatusPageTitle}
            disabled={disabled}
            label="Shop Status Page Title"
            name="shopStatusPageTitle"
            value={data.shopStatusPageTitle}
            onChange={onChange}
          />
          <FormSpacer />
          <Input
            error={!!formErrors.shopStatusPageDescription}
            disabled={disabled}
            label="Shop Status Page Description"
            name="shopStatusPageDescription"
            value={data.shopStatusPageDescription}
            onChange={onChange}
          />
        </DashboardCard.Content>
      </DashboardCard>
    </>
  );
};
