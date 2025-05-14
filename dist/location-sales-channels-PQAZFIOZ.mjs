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
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useStockLocation,
  useUpdateStockLocationSalesChannels
} from "./chunk-32IQRUVY.mjs";
import {
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-sales-channels/location-sales-channels.tsx
import { useParams } from "react-router-dom";

// src/routes/locations/location-sales-channels/components/edit-sales-channels-form/edit-sales-channels-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  createDataTableColumnHelper,
  toast
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditSalesChannelsSchema = zod.object({
  sales_channels: zod.array(zod.string()).optional()
});
var PAGE_SIZE = 50;
var PREFIX = "sc";
var LocationEditSalesChannelsForm = ({
  location
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      sales_channels: location.sales_channels?.map((sc) => sc.id) ?? []
    },
    resolver: zodResolver(EditSalesChannelsSchema)
  });
  const { setValue } = form;
  const [rowSelection, setRowSelection] = useState(
    getInitialState(location)
  );
  const onRowSelectionChange = (selection) => {
    const ids = Object.keys(selection);
    setValue("sales_channels", ids, {
      shouldDirty: true,
      shouldTouch: true
    });
    setRowSelection(selection);
  };
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { sales_channels, count, isPending, isError, error } = useSalesChannels(
    {
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = useSalesChannelTableFilters();
  const columns = useColumns();
  const emptyState = useSalesChannelTableEmptyState();
  const { mutateAsync, isPending: isMutating } = useUpdateStockLocationSalesChannels(location.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    const originalIds = location.sales_channels?.map((sc) => sc.id);
    const arr = data.sales_channels ?? [];
    await mutateAsync(
      {
        add: arr.filter((i) => !originalIds?.includes(i)),
        remove: originalIds?.filter((i) => !arr.includes(i))
      },
      {
        onSuccess: () => {
          toast.success(t("stockLocations.salesChannels.successToast"));
          handleSuccess(`/settings/locations/${location.id}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxs(RouteFocusModal.Header, { children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("stockLocations.salesChannels.header") }) }),
      /* @__PURE__ */ jsx(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx(VisuallyHidden, { children: t("stockLocations.salesChannels.hint") }) })
    ] }),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-auto", children: /* @__PURE__ */ jsx(
      DataTable,
      {
        data: sales_channels,
        columns,
        filters,
        emptyState,
        prefix: PREFIX,
        rowSelection: {
          state: rowSelection,
          onRowSelectionChange
        },
        pageSize: PAGE_SIZE,
        isLoading: isPending,
        rowCount: count,
        layout: "fill",
        getRowId: (row) => row.id
      }
    ) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", type: "button", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", isLoading: isMutating, type: "submit", children: t("actions.save") })
    ] }) })
  ] }) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const base = useSalesChannelTableColumns();
  return useMemo(() => [columnHelper.select(), ...base], [base]);
};
function getInitialState(location) {
  return location.sales_channels?.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {}) ?? {};
}

// src/routes/locations/location-sales-channels/location-sales-channels.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var LocationSalesChannels = () => {
  const { location_id } = useParams();
  const { stock_location, isPending, isError, error } = useStockLocation(
    location_id,
    {
      fields: "id,*sales_channels"
    }
  );
  const ready = !isPending && !!stock_location;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx2(LocationEditSalesChannelsForm, { location: stock_location }) });
};
export {
  LocationSalesChannels as Component
};
