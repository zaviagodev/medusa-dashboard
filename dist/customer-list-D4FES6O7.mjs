import {
  useCustomerTableColumns
} from "./chunk-DT7QVGFJ.mjs";
import {
  useCustomerTableQuery
} from "./chunk-WRSGHGAT.mjs";
import "./chunk-3OHUAQUF.mjs";
import "./chunk-ADOCJB6L.mjs";
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
  useCustomerTableFilters
} from "./chunk-A2UMBW3V.mjs";
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
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useCustomers
} from "./chunk-F6PXCY3N.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/customers/customer-list/components/customer-list-table/customer-list-table.tsx
import { PencilSquare } from "@medusajs/icons";
import { Button, Container, Heading } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var CustomerListTable = () => {
  const { t } = useTranslation();
  const { searchParams, raw } = useCustomerTableQuery({ pageSize: PAGE_SIZE });
  const { customers, count, isLoading, isError, error } = useCustomers(
    {
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = useCustomerTableFilters();
  const columns = useColumns();
  const { table } = useDataTable({
    data: customers ?? [],
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
      /* @__PURE__ */ jsx(Heading, { children: t("customers.domain") }),
      /* @__PURE__ */ jsx(Link, { to: "/customers/create", children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        count,
        filters,
        orderBy: [
          { key: "email", label: t("fields.email") },
          { key: "first_name", label: t("fields.firstName") },
          { key: "last_name", label: t("fields.lastName") },
          { key: "has_account", label: t("customers.hasAccount") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        isLoading,
        navigateTo: (row) => row.original.id,
        search: true,
        queryObject: raw,
        noRecords: {
          message: t("customers.list.noRecordsMessage")
        }
      }
    )
  ] });
};
var CustomerActions = ({
  customer
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/customers/${customer.id}/edit`
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const columns = useCustomerTableColumns();
  return useMemo(
    () => [
      ...columns,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx(CustomerActions, { customer: row.original })
      })
    ],
    [columns]
  );
};

// src/routes/customers/customer-list/customer-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CustomersList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("customer.list.after"),
        before: getWidgets("customer.list.before")
      },
      children: /* @__PURE__ */ jsx2(CustomerListTable, {})
    }
  );
};
export {
  CustomersList as Component
};
