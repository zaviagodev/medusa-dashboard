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
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
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
  useDeleteSalesChannelLazy,
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/sales-channels/sales-channel-list/components/sales-channel-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import {
  Container,
  createDataTableColumnHelper,
  toast,
  usePrompt
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var SalesChannelListTable = () => {
  const { t } = useTranslation();
  const { store } = useStore();
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE
  });
  const { sales_channels, count, isPending, isError, error } = useSalesChannels(
    searchParams,
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useSalesChannelTableFilters();
  const emptyState = useSalesChannelTableEmptyState();
  const sales_channels_data = sales_channels?.map((sales_channel) => {
    return {
      ...sales_channel,
      is_default: store?.default_sales_channel_id === sales_channel.id
    };
  }) ?? [];
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(Container, { className: "p-0", children: /* @__PURE__ */ jsx(
    DataTable,
    {
      data: sales_channels_data,
      columns,
      rowCount: count,
      getRowId: (row) => row.id,
      pageSize: PAGE_SIZE,
      filters,
      isLoading: isPending,
      emptyState,
      heading: t("salesChannels.domain"),
      subHeading: t("salesChannels.subtitle"),
      action: {
        label: t("actions.create"),
        to: "/settings/sales-channels/create"
      },
      rowHref: (row) => `/settings/sales-channels/${row.id}`
    }
  ) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const navigate = useNavigate();
  const base = useSalesChannelTableColumns();
  const { mutateAsync } = useDeleteSalesChannelLazy();
  const handleDelete = useCallback(
    async (salesChannel) => {
      const confirm = await prompt({
        title: t("general.areYouSure"),
        description: t("salesChannels.deleteSalesChannelWarning", {
          name: salesChannel.name
        }),
        verificationInstruction: t("general.typeToConfirm"),
        verificationText: salesChannel.name,
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!confirm) {
        return;
      }
      await mutateAsync(salesChannel.id, {
        onSuccess: () => {
          toast.success(t("salesChannels.toast.delete"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      });
    },
    [t, prompt, mutateAsync]
  );
  return useMemo(
    () => [
      ...base,
      columnHelper.action({
        actions: (ctx) => {
          const disabledTooltip = ctx.row.original.is_default ? t("salesChannels.tooltip.cannotDeleteDefault") : void 0;
          return [
            [
              {
                icon: /* @__PURE__ */ jsx(PencilSquare, {}),
                label: t("actions.edit"),
                onClick: () => navigate(
                  `/settings/sales-channels/${ctx.row.original.id}/edit`
                )
              }
            ],
            [
              {
                icon: /* @__PURE__ */ jsx(Trash, {}),
                label: t("actions.delete"),
                onClick: () => handleDelete(ctx.row.original),
                disabled: ctx.row.original.is_default,
                disabledTooltip
              }
            ]
          ];
        }
      })
    ],
    [base, handleDelete, navigate, t]
  );
};

// src/routes/sales-channels/sales-channel-list/sales-channel-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var SalesChannelList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("sales_channel.list.before"),
        after: getWidgets("sales_channel.list.after")
      },
      hasOutlet: true,
      children: /* @__PURE__ */ jsx2(SalesChannelListTable, {})
    }
  );
};
export {
  SalesChannelList as Component
};
