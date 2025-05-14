import {
  VisuallyHidden
} from "./chunk-F6ZOHZVB.mjs";
import {
  useSalesChannelTableColumns,
  useSalesChannelTableEmptyState,
  useSalesChannelTableFilters,
  useSalesChannelTableQuery
} from "./chunk-44QN6VEG.mjs";
import "./chunk-4BTG27L5.mjs";
import {
  DataTable
} from "./chunk-3IIOXMXN.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-3NJTXRIY.mjs";
import {
  ConditionalTooltip
} from "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useApiKey,
  useBatchAddSalesChannelsToApiKey
} from "./chunk-F6IJV2I2.mjs";
import {
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/api-key-management/api-key-management-sales-channels/api-key-management-sales-channels.tsx
import { useParams } from "react-router-dom";

// src/routes/api-key-management/api-key-management-sales-channels/components/api-key-sales-channels-form/api-key-sales-channels-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Hint,
  createDataTableColumnHelper,
  toast
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var AddSalesChannelsToApiKeySchema = zod.object({
  sales_channel_ids: zod.array(zod.string()).min(1)
});
var PAGE_SIZE = 50;
var PREFIX = "sc_add";
var ApiKeySalesChannelsForm = ({
  apiKey,
  preSelected = []
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      sales_channel_ids: []
    },
    resolver: zodResolver(AddSalesChannelsToApiKeySchema)
  });
  const { setValue } = form;
  const [rowSelection, setRowSelection] = useState({});
  const { mutateAsync, isPending: isMutating } = useBatchAddSalesChannelsToApiKey(apiKey);
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const columns = useColumns();
  const filters = useSalesChannelTableFilters();
  const emptyState = useSalesChannelTableEmptyState();
  const { sales_channels, count, isPending } = useSalesChannels(
    { ...searchParams },
    {
      placeholderData: keepPreviousData
    }
  );
  const updater = (selection) => {
    const ids = Object.keys(selection);
    setValue("sales_channel_ids", ids, {
      shouldDirty: true,
      shouldTouch: true
    });
    setRowSelection(selection);
  };
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values.sales_channel_ids, {
      onSuccess: () => {
        toast.success(
          t("apiKeyManagement.salesChannels.successToast", {
            count: values.sales_channel_ids.length
          })
        );
        handleSuccess();
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxs(RouteFocusModal.Header, { children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("apiKeyManagement.salesChannels.title") }) }),
      /* @__PURE__ */ jsx(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("apiKeyManagement.salesChannels.description") }) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-x-2", children: form.formState.errors.sales_channel_ids && /* @__PURE__ */ jsx(Hint, { variant: "error", children: form.formState.errors.sales_channel_ids.message }) })
    ] }),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-auto", children: /* @__PURE__ */ jsx(
      DataTable,
      {
        data: sales_channels,
        columns,
        filters,
        getRowId: (row) => row.id,
        rowCount: count,
        layout: "fill",
        emptyState,
        isLoading: isPending,
        rowSelection: {
          state: rowSelection,
          onRowSelectionChange: updater,
          enableRowSelection: (row) => !preSelected.includes(row.id)
        },
        prefix: PREFIX,
        pageSize: PAGE_SIZE,
        autoFocusSearch: true
      }
    ) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isMutating, children: t("actions.save") })
    ] }) })
  ] }) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const base = useSalesChannelTableColumns();
  return useMemo(
    () => [
      columnHelper.select({
        cell: ({ row }) => {
          const isPreSelected = !row.getCanSelect();
          const isSelected = row.getIsSelected() || isPreSelected;
          return /* @__PURE__ */ jsx(
            ConditionalTooltip,
            {
              content: t("apiKeyManagement.salesChannels.alreadyAddedTooltip"),
              showTooltip: isPreSelected,
              children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                Checkbox,
                {
                  checked: isSelected,
                  disabled: isPreSelected,
                  onCheckedChange: (value) => row.toggleSelected(!!value),
                  onClick: (e) => {
                    e.stopPropagation();
                  }
                }
              ) })
            }
          );
        }
      }),
      ...base
    ],
    [t, base]
  );
};

// src/routes/api-key-management/api-key-management-sales-channels/api-key-management-sales-channels.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ApiKeyManagementAddSalesChannels = () => {
  const { id } = useParams();
  const { api_key, isLoading, isError, error } = useApiKey(id);
  const preSelected = api_key?.sales_channels?.map((sc) => sc.id);
  const ready = !isLoading && api_key;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx2(ApiKeySalesChannelsForm, { apiKey: id, preSelected }) });
};
export {
  ApiKeyManagementAddSalesChannels as Component
};
