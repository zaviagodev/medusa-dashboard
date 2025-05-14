import {
  useDeletePriceListAction
} from "./chunk-LTC6LGS4.mjs";
import {
  getPriceListStatus
} from "./chunk-G2J2T2QU.mjs";
import "./chunk-XUQVQCAO.mjs";
import {
  TextCell,
  TextHeader
} from "./chunk-MSDRGCRR.mjs";
import {
  StatusCell
} from "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import {
  useDateTableFilters
} from "./chunk-W7625H47.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-6GU6IDUA.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  usePriceLists
} from "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/price-lists/price-list-list/components/price-list-list-table/price-list-list-table.tsx
import { Button, Container, Heading, Text } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/price-lists/price-list-list/components/price-list-list-table/use-pricing-table-columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/price-lists/price-list-list/components/price-list-list-table/price-list-list-table-actions.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var PriceListListTableActions = ({
  priceList
}) => {
  const { t } = useTranslation();
  const handleDelete = useDeletePriceListAction({ priceList });
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.edit"),
              to: `${priceList.id}/edit`,
              icon: /* @__PURE__ */ jsx(PencilSquare, {})
            }
          ]
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              onClick: handleDelete,
              icon: /* @__PURE__ */ jsx(Trash, {})
            }
          ]
        }
      ]
    }
  );
};

// src/routes/price-lists/price-list-list/components/price-list-list-table/use-pricing-table-columns.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var usePricingTableColumns = () => {
  const { t } = useTranslation2();
  return useMemo(
    () => [
      columnHelper.accessor("title", {
        header: () => /* @__PURE__ */ jsx2(TextHeader, { text: t("fields.title") }),
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor("status", {
        header: t("priceLists.fields.status.label"),
        cell: ({ row }) => {
          const { color, text } = getPriceListStatus(t, row.original);
          return /* @__PURE__ */ jsx2(StatusCell, { color, children: text });
        }
      }),
      columnHelper.accessor("prices", {
        header: t("priceLists.fields.priceOverrides.header"),
        cell: (info) => /* @__PURE__ */ jsx2(TextCell, { text: `${info.getValue()?.length || "-"}` })
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx2(PriceListListTableActions, { priceList: row.original })
      })
    ],
    [t]
  );
};

// src/routes/price-lists/price-list-list/components/price-list-list-table/use-pricing-table-filters.tsx
var usePricingTableFilters = () => {
  const dateFilters = useDateTableFilters();
  return dateFilters;
};

// src/routes/price-lists/price-list-list/components/price-list-list-table/use-pricing-table-query.tsx
var usePricingTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(["offset", "q", "order", "status"], prefix);
  const searchParams = {
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order,
    status: raw.status?.split(","),
    q: raw.q
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/price-lists/price-list-list/components/price-list-list-table/price-list-list-table.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var PriceListListTable = () => {
  const { t } = useTranslation3();
  const { searchParams, raw } = usePricingTableQuery({
    pageSize: PAGE_SIZE
  });
  const { price_lists, count, isLoading, isError, error } = usePriceLists(
    searchParams,
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = usePricingTableFilters();
  const columns = usePricingTableColumns();
  const { table } = useDataTable({
    data: price_lists || [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx3(Heading, { children: t("priceLists.domain") }),
        /* @__PURE__ */ jsx3(Text, { className: "text-ui-fg-subtle", size: "small", children: t("priceLists.subtitle") })
      ] }),
      /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx3(Link, { to: "create", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        columns,
        count,
        filters,
        orderBy: [
          { key: "title", label: t("fields.title") },
          { key: "status", label: t("fields.status") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        queryObject: raw,
        pageSize: PAGE_SIZE,
        navigateTo: (row) => row.original.id,
        isLoading,
        pagination: true,
        search: true
      }
    )
  ] });
};

// src/routes/price-lists/price-list-list/price-list-list.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var PriceListList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx4(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("price_list.list.after"),
        before: getWidgets("price_list.list.before")
      },
      children: /* @__PURE__ */ jsx4(PriceListListTable, {})
    }
  );
};
export {
  PriceListList as Component
};
