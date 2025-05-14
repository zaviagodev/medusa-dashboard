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
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import {
  useProduct,
  useUpdateProduct
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-sales-channels/product-sales-channels.tsx
import { useParams } from "react-router-dom";

// src/routes/products/product-sales-channels/components/edit-sales-channels-form/edit-sales-channels-form.tsx
import { Button, createDataTableColumnHelper } from "@medusajs/ui";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { keepPreviousData } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { jsx, jsxs } from "react/jsx-runtime";
var EditSalesChannelsSchema = zod.object({
  sales_channels: zod.array(zod.string()).optional()
});
var PAGE_SIZE = 50;
var PREFIX = "sc";
var EditSalesChannelsForm = ({
  product
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      sales_channels: product.sales_channels?.map((sc) => sc.id) ?? []
    },
    resolver: zodResolver(EditSalesChannelsSchema)
  });
  const { setValue } = form;
  const initialState = product.sales_channels?.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {}) ?? {};
  const [rowSelection, setRowSelection] = useState(initialState);
  useEffect(() => {
    const ids = Object.keys(rowSelection);
    setValue("sales_channels", ids, {
      shouldDirty: true,
      shouldTouch: true
    });
  }, [rowSelection, setValue]);
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { sales_channels, count, isLoading, isError, error } = useSalesChannels(
    {
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = useSalesChannelTableFilters();
  const emptyState = useSalesChannelTableEmptyState();
  const columns = useColumns();
  const { mutateAsync, isPending: isMutating } = useUpdateProduct(product.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    const arr = data.sales_channels ?? [];
    const sales_channels2 = arr.map((id) => {
      return {
        id
      };
    });
    await mutateAsync(
      {
        sales_channels: sales_channels2
      },
      {
        onSuccess: () => {
          handleSuccess();
        }
      }
    );
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsx(
      DataTable,
      {
        data: sales_channels,
        columns,
        getRowId: (row) => row.id,
        rowCount: count,
        isLoading,
        filters,
        rowSelection: {
          state: rowSelection,
          onRowSelectionChange: setRowSelection
        },
        autoFocusSearch: true,
        layout: "fill",
        emptyState,
        prefix: PREFIX
      }
    ) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", isLoading: isMutating, onClick: handleSubmit, children: t("actions.save") })
    ] }) })
  ] }) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const columns = useSalesChannelTableColumns();
  return useMemo(() => [columnHelper.select(), ...columns], [columns]);
};

// src/routes/products/product-sales-channels/product-sales-channels.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ProductSalesChannels = () => {
  const { id } = useParams();
  const { product, isLoading, isError, error } = useProduct(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: !isLoading && product && /* @__PURE__ */ jsx2(EditSalesChannelsForm, { product }) });
};
export {
  ProductSalesChannels as Component
};
