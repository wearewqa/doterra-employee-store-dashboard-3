import { gql } from "@apollo/client";

export const channelCreateMutation = gql`
  mutation ChannelCreate($input: ChannelCreateInput!) {
    channelCreate(input: $input) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`;

export const channelUpdateMutation = gql`
  mutation ChannelUpdate(
    $id: ID!
    $input: ChannelUpdateInput!
    $shopStatus: String!
    $shopStatusPageTitle: String!
    $shopStatusPageDescription: String!
  ) {
    channelUpdate(id: $id, input: $input) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }

    updateMetadata(
      id: $id
      input: [
        { key: "shopStatus", value: $shopStatus }
        { key: "shopStatusPageTitle", value: $shopStatusPageTitle }
        { key: "shopStatusPageDescription", value: $shopStatusPageDescription }
      ]
    ) {
      item {
        ... on Channel {
          shopStatus: metafield(key: "shopStatus")
          shopStatusPageTitle: metafield(key: "shopStatusPageTitle")
          shopStatusPageDescription: metafield(key: "shopStatusPageDescription")
        }
      }
    }
  }
`;

export const channelDeleteMutation = gql`
  mutation ChannelDelete($id: ID!, $input: ChannelDeleteInput) {
    channelDelete(id: $id, input: $input) {
      errors {
        ...ChannelError
      }
    }
  }
`;

export const channelActivateMutation = gql`
  mutation ChannelActivate($id: ID!) {
    channelActivate(id: $id) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`;

export const channelDeactivateMutation = gql`
  mutation ChannelDeactivate($id: ID!) {
    channelDeactivate(id: $id) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`;

export const ChannelReorderWarehousesMutation = gql`
  mutation ChannelReorderWarehouses($channelId: ID!, $moves: [ReorderInput!]!) {
    channelReorderWarehouses(channelId: $channelId, moves: $moves) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`;
