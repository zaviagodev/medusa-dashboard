import {
  useOrderTableColumns
} from "./chunk-3IRPEKIV.mjs";
import {
  useOrderTableQuery
} from "./chunk-XMAWMECC.mjs";
import "./chunk-3OHUAQUF.mjs";
import "./chunk-NNBHHXXN.mjs";
import "./chunk-7DXVXBSA.mjs";
import "./chunk-PDWBYQOW.mjs";
import "./chunk-ADOCJB6L.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  useOrderTableFilters
} from "./chunk-FVK4ZYYM.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useOrders
} from "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-list/components/order-list-table/order-list-table.tsx
import { Container, Heading } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// src/routes/orders/order-list/const.ts
var DEFAULT_PROPERTIES = [
  "id",
  "status",
  "created_at",
  "email",
  "display_id",
  "payment_status",
  "fulfillment_status",
  "total",
  "currency_code"
];
var DEFAULT_RELATIONS = ["*customer", "*sales_channel"];
var DEFAULT_FIELDS = `${DEFAULT_PROPERTIES.join(
  ","
)},${DEFAULT_RELATIONS.join(",")}`;

// src/routes/orders/order-list/components/order-list-table/order-list-table.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var OrderListTable = () => {
  const { t } = useTranslation();
  const { searchParams, raw } = useOrderTableQuery({
    pageSize: PAGE_SIZE
  });
  const { orders, count, isError, error, isLoading } = useOrders(
    {
      fields: DEFAULT_FIELDS,
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = useOrderTableFilters();
  const columns = useOrderTableColumns({});
  const { table } = useDataTable({
    data: orders ?? [],
    columns,
    enablePagination: true,
    count,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsx(Heading, { children: t("orders.domain") }) }),
    /* @__PURE__ */ jsx(
      _DataTable,
      {
        columns,
        table,
        pagination: true,
        navigateTo: (row) => `/orders/${row.original.id}`,
        filters,
        count,
        search: true,
        isLoading,
        pageSize: PAGE_SIZE,
        orderBy: [
          { key: "display_id", label: t("orders.fields.displayId") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        queryObject: raw,
        noRecords: {
          message: t("orders.list.noRecordsMessage")
        }
      }
    )
  ] });
};

// src/routes/orders/order-list/order-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var OrderList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("order.list.after"),
        before: getWidgets("order.list.before")
      },
      hasOutlet: false,
      children: /* @__PURE__ */ jsx2(OrderListTable, {})
    }
  );
};
export {
  OrderList as Component
};
