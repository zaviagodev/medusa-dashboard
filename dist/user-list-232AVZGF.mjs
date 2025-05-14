import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useDataTableDateColumns
} from "./chunk-4BTG27L5.mjs";
import {
  DataTable,
  useDataTableDateFilters
} from "./chunk-3IIOXMXN.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useUsers
} from "./chunk-2ZKVRTBW.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/users/user-list/components/user-list-table/user-list-table.tsx
import { Container, createDataTableColumnHelper } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PencilSquare } from "@medusajs/icons";
import { jsx } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var UserListTable = () => {
  const { q, order, offset } = useQueryParams(["q", "order", "offset"]);
  const { users, count, isPending, isError, error } = useUsers(
    {
      q,
      order,
      offset: offset ? parseInt(offset) : 0,
      limit: PAGE_SIZE
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useFilters();
  const { t } = useTranslation();
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(Container, { className: "divide-y p-0", children: /* @__PURE__ */ jsx(
    DataTable,
    {
      data: users,
      columns,
      filters,
      getRowId: (row) => row.id,
      rowCount: count,
      pageSize: PAGE_SIZE,
      heading: t("users.domain"),
      rowHref: (row) => `${row.id}`,
      isLoading: isPending,
      action: {
        label: t("users.invite"),
        to: "invite"
      },
      emptyState: {
        empty: {
          heading: t("users.list.empty.heading"),
          description: t("users.list.empty.description")
        },
        filtered: {
          heading: t("users.list.filtered.heading"),
          description: t("users.list.filtered.description")
        }
      }
    }
  ) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dateColumns = useDataTableDateColumns();
  return useMemo(
    () => [
      columnHelper.accessor("email", {
        header: t("fields.email"),
        cell: ({ row }) => {
          return row.original.email;
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      columnHelper.accessor("first_name", {
        header: t("fields.firstName"),
        cell: ({ row }) => {
          return row.original.first_name || "-";
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      columnHelper.accessor("last_name", {
        header: t("fields.lastName"),
        cell: ({ row }) => {
          return row.original.last_name || "-";
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      ...dateColumns,
      columnHelper.action({
        actions: [
          {
            label: t("actions.edit"),
            icon: /* @__PURE__ */ jsx(PencilSquare, {}),
            onClick: (ctx) => {
              navigate(`${ctx.row.original.id}/edit`);
            }
          }
        ]
      })
    ],
    [t, navigate, dateColumns]
  );
};
var useFilters = () => {
  const dateFilters = useDataTableDateFilters();
  return useMemo(() => {
    return dateFilters;
  }, [dateFilters]);
};

// src/routes/users/user-list/user-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var UserList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("user.list.after"),
        before: getWidgets("user.list.before")
      },
      children: /* @__PURE__ */ jsx2(UserListTable, {})
    }
  );
};
export {
  UserList as Component
};
