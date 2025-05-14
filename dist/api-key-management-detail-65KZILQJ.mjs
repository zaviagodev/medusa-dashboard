import {
  getApiKeyStatusProps,
  getApiKeyTypeProps,
  prettifyRedactedToken
} from "./chunk-G22WWLPG.mjs";
import {
  UserLink
} from "./chunk-GXXQ33F7.mjs";
import {
  useSalesChannelTableColumns,
  useSalesChannelTableEmptyState,
  useSalesChannelTableFilters,
  useSalesChannelTableQuery
} from "./chunk-44QN6VEG.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-4BTG27L5.mjs";
import {
  DataTable
} from "./chunk-3IIOXMXN.mjs";
import "./chunk-C76H5USB.mjs";
import {
  useDate
} from "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  SingleColumnPageSkeleton,
  Skeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import {
  apiKeysQueryKeys,
  useApiKey,
  useBatchRemoveSalesChannelsFromApiKey,
  useDeleteApiKey,
  useRevokeApiKey
} from "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import {
  useUser
} from "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import {
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/api-key-management/api-key-management-detail/api-key-management-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/api-key-management/api-key-management-detail/components/api-key-general-section/api-key-general-section.tsx
import { PencilSquare, Trash, XCircle } from "@medusajs/icons";
import {
  Badge,
  Container,
  Copy,
  Heading,
  StatusBadge,
  Text,
  toast,
  usePrompt
} from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ApiKeyGeneralSection = ({ apiKey }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { getFullDate } = useDate();
  const { mutateAsync: revokeAsync } = useRevokeApiKey(apiKey.id);
  const { mutateAsync: deleteAsync } = useDeleteApiKey(apiKey.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("apiKeyManagement.delete.warning", {
        title: apiKey.title
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await deleteAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("apiKeyManagement.delete.successToast", {
            title: apiKey.title
          })
        );
        navigate("..", { replace: true });
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  };
  const handleRevoke = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("apiKeyManagement.revoke.warning", {
        title: apiKey.title
      }),
      confirmText: t("apiKeyManagement.actions.revoke"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await revokeAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("apiKeyManagement.revoke.successToast", {
            title: apiKey.title
          })
        );
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  };
  const dangerousActions = [
    {
      icon: /* @__PURE__ */ jsx(Trash, {}),
      label: t("actions.delete"),
      onClick: handleDelete,
      disabled: !apiKey.revoked_at
    }
  ];
  if (!apiKey.revoked_at) {
    dangerousActions.unshift({
      icon: /* @__PURE__ */ jsx(XCircle, {}),
      label: t("apiKeyManagement.actions.revoke"),
      onClick: handleRevoke,
      disabled: !!apiKey.revoked_at
    });
  }
  const apiKeyStatus = getApiKeyStatusProps(apiKey.revoked_at, t);
  const apiKeyType = getApiKeyTypeProps(apiKey.type, t);
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx(Heading, { children: apiKey.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ jsx(StatusBadge, { color: apiKeyStatus.color, children: apiKeyStatus.label }) }),
        /* @__PURE__ */ jsx(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: /* @__PURE__ */ jsx(PencilSquare, {}),
                    to: "edit"
                  }
                ]
              },
              {
                actions: dangerousActions
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.key") }),
      apiKey.type === "secret" ? /* @__PURE__ */ jsx(Badge, { size: "2xsmall", className: "inline-block w-fit", children: prettifyRedactedToken(apiKey.redacted) }) : /* @__PURE__ */ jsx(Copy, { asChild: true, content: apiKey.token, className: "cursor-pointer", children: /* @__PURE__ */ jsx(Badge, { size: "2xsmall", className: "text-ui-tag-neutral-text", children: prettifyRedactedToken(apiKey.redacted) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.type") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: apiKeyType.label })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("apiKeyManagement.fields.lastUsedAtLabel") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: apiKey.last_used_at ? getFullDate({ date: apiKey.last_used_at, includeTime: true }) : "-" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("apiKeyManagement.fields.createdByLabel") }),
      /* @__PURE__ */ jsx(ActionBy, { userId: apiKey.created_by })
    ] }),
    apiKey.revoked_at && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("apiKeyManagement.fields.revokedAtLabel") }),
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: getFullDate({ date: apiKey.revoked_at, includeTime: true }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("apiKeyManagement.fields.revokedByLabel") }),
        /* @__PURE__ */ jsx(ActionBy, { userId: apiKey.revoked_by })
      ] })
    ] })
  ] });
};
var ActionBy = ({ userId }) => {
  const { user, isLoading, isError, error } = useUser(userId, void 0, {
    enabled: !!userId
  });
  if (!userId) {
    return /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: "-" });
  }
  if (isError) {
    throw error;
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[20px_1fr]", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "w-full max-w-[220px]" })
    ] });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: "-" });
  }
  return /* @__PURE__ */ jsx(UserLink, { ...user });
};

// src/routes/api-key-management/api-key-management-detail/components/api-key-sales-channel-section/api-key-sales-channel-section.tsx
import { PencilSquare as PencilSquare2, Trash as Trash2 } from "@medusajs/icons";
import {
  Container as Container2,
  createDataTableColumnHelper,
  createDataTableCommandHelper,
  toast as toast2,
  usePrompt as usePrompt2
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate as useNavigate2 } from "react-router-dom";
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "sc";
var ApiKeySalesChannelSection = ({
  apiKey
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const { t } = useTranslation2();
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { sales_channels, count, isPending } = useSalesChannels(
    { ...searchParams, publishable_key_id: apiKey.id },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns(apiKey.id);
  const filters = useSalesChannelTableFilters();
  const commands = useCommands(apiKey.id, setRowSelection);
  const emptyState = useSalesChannelTableEmptyState();
  return /* @__PURE__ */ jsx2(Container2, { className: "divide-y p-0", children: /* @__PURE__ */ jsx2(
    DataTable,
    {
      data: sales_channels,
      columns,
      filters,
      commands,
      heading: t("salesChannels.domain"),
      getRowId: (row) => row.id,
      rowCount: count,
      isLoading: isPending,
      emptyState,
      rowSelection: {
        state: rowSelection,
        onRowSelectionChange: setRowSelection
      },
      rowHref: (row) => `/settings/sales-channels/${row.id}`,
      action: {
        label: t("actions.add"),
        to: "sales-channels"
      },
      prefix: PREFIX,
      pageSize: PAGE_SIZE
    }
  ) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = (id) => {
  const { t } = useTranslation2();
  const navigate = useNavigate2();
  const prompt = usePrompt2();
  const base = useSalesChannelTableColumns();
  const { mutateAsync } = useBatchRemoveSalesChannelsFromApiKey(id);
  const handleDelete = useCallback(
    async (salesChannel) => {
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("apiKeyManagement.removeSalesChannel.warning", {
          name: salesChannel.name
        }),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!res) {
        return;
      }
      await mutateAsync([salesChannel.id], {
        onSuccess: () => {
          toast2.success(
            t("apiKeyManagement.removeSalesChannel.successToast", {
              count: 1
            })
          );
        },
        onError: (err) => {
          toast2.error(err.message);
        }
      });
    },
    [mutateAsync, prompt, t]
  );
  return useMemo(
    () => [
      columnHelper.select(),
      ...base,
      columnHelper.action({
        actions: (ctx) => [
          [
            {
              label: t("actions.edit"),
              icon: /* @__PURE__ */ jsx2(PencilSquare2, {}),
              onClick: () => {
                navigate(`/settings/sales-channels/${ctx.row.original.id}/edit`);
              }
            }
          ],
          [
            {
              icon: /* @__PURE__ */ jsx2(Trash2, {}),
              label: t("actions.delete"),
              onClick: () => handleDelete(ctx.row.original)
            }
          ]
        ]
      })
    ],
    [base, handleDelete, navigate, t]
  );
};
var commandHelper = createDataTableCommandHelper();
var useCommands = (id, setRowSelection) => {
  const { t } = useTranslation2();
  const prompt = usePrompt2();
  const { mutateAsync } = useBatchRemoveSalesChannelsFromApiKey(id);
  const handleRemove = useCallback(
    async (rowSelection) => {
      const keys = Object.keys(rowSelection);
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("apiKeyManagement.removeSalesChannel.warningBatch", {
          count: keys.length
        }),
        confirmText: t("actions.continue"),
        cancelText: t("actions.cancel")
      });
      if (!res) {
        return;
      }
      await mutateAsync(keys, {
        onSuccess: () => {
          toast2.success(
            t("apiKeyManagement.removeSalesChannel.successToastBatch", {
              count: keys.length
            })
          );
          setRowSelection({});
        },
        onError: (err) => {
          toast2.error(err.message);
        }
      });
    },
    [mutateAsync, prompt, t, setRowSelection]
  );
  return useMemo(
    () => [
      commandHelper.command({
        action: handleRemove,
        label: t("actions.remove"),
        shortcut: "r"
      })
    ],
    [handleRemove, t]
  );
};

// src/routes/api-key-management/api-key-management-detail/api-key-management-detail.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ApiKeyManagementDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const { getWidgets } = useExtension();
  const { api_key, isLoading, isError, error } = useApiKey(id, {
    initialData
  });
  if (isLoading || !api_key) {
    return /* @__PURE__ */ jsx3(SingleColumnPageSkeleton, { showJSON: true, sections: 1 });
  }
  const isPublishable = api_key?.type === "publishable" /* PUBLISHABLE */;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(
    SingleColumnPage,
    {
      hasOutlet: true,
      showJSON: true,
      widgets: {
        before: getWidgets("api_key.details.before"),
        after: getWidgets("api_key.details.after")
      },
      data: api_key,
      children: [
        /* @__PURE__ */ jsx3(ApiKeyGeneralSection, { apiKey: api_key }),
        isPublishable && /* @__PURE__ */ jsx3(ApiKeySalesChannelSection, { apiKey: api_key })
      ]
    }
  );
};

// src/routes/api-key-management/api-key-management-detail/breadcrumb.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ApiKeyManagementDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { api_key } = useApiKey(id, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!api_key) {
    return null;
  }
  return /* @__PURE__ */ jsx4("span", { children: api_key.title });
};

// src/routes/api-key-management/api-key-management-detail/loader.ts
var apiKeyDetailQuery = (id) => ({
  queryKey: apiKeysQueryKeys.detail(id),
  queryFn: async () => sdk.admin.apiKey.retrieve(id)
});
var apiKeyLoader = async ({ params }) => {
  const id = params.id;
  const query = apiKeyDetailQuery(id);
  return queryClient.ensureQueryData(query);
};
export {
  ApiKeyManagementDetailBreadcrumb as Breadcrumb,
  ApiKeyManagementDetail as Component,
  apiKeyLoader as loader
};
