import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  DataTable,
  useDataTableDateFilters
} from "./chunk-3IIOXMXN.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import {
  useDate
} from "./chunk-Q5PHSNDY.mjs";
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
import {
  useCustomerGroups,
  useDeleteCustomerGroupLazy
} from "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/customer-groups/customer-group-list/components/customer-group-list-table/customer-group-list-table.tsx
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
var PAGE_SIZE = 10;
var CustomerGroupListTable = () => {
  const { t } = useTranslation();
  const { getWidgets } = useExtension();
  const { q, order, offset, created_at, updated_at } = useQueryParams([
    "q",
    "order",
    "offset",
    "created_at",
    "updated_at"
  ]);
  const columns = useColumns();
  const filters = useFilters();
  const { customer_groups, count, isPending, isError, error } = useCustomerGroups(
    {
      q,
      order,
      offset: offset ? parseInt(offset) : void 0,
      limit: PAGE_SIZE,
      created_at: created_at ? JSON.parse(created_at) : void 0,
      updated_at: updated_at ? JSON.parse(updated_at) : void 0,
      fields: "id,name,created_at,updated_at,customers.id"
    },
    {
      placeholderData: keepPreviousData
    }
  );
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("customer_group.list.before"),
        after: getWidgets("customer_group.list.after")
      },
      children: /* @__PURE__ */ jsx(Container, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsx(
        DataTable,
        {
          data: customer_groups,
          columns,
          filters,
          heading: t("customerGroups.domain"),
          rowCount: count,
          getRowId: (row) => row.id,
          rowHref: (row) => `/customer-groups/${row.id}`,
          action: {
            label: t("actions.create"),
            to: "/customer-groups/create"
          },
          emptyState: {
            empty: {
              heading: t("customerGroups.list.empty.heading"),
              description: t("customerGroups.list.empty.description")
            },
            filtered: {
              heading: t("customerGroups.list.filtered.heading"),
              description: t("customerGroups.list.filtered.description")
            }
          },
          pageSize: PAGE_SIZE,
          isLoading: isPending
        }
      ) })
    }
  );
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const { getFullDate } = useDate();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { mutateAsync: deleteCustomerGroup } = useDeleteCustomerGroupLazy();
  const handleDeleteCustomerGroup = useCallback(
    async ({ id, name }) => {
      const res = await prompt({
        title: t("customerGroups.delete.title"),
        description: t("customerGroups.delete.description", {
          name
        }),
        verificationText: name,
        verificationInstruction: t("general.typeToConfirm"),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!res) {
        return;
      }
      await deleteCustomerGroup(
        { id },
        {
          onSuccess: () => {
            toast.success(t("customerGroups.delete.successToast", { name }));
          },
          onError: (e) => {
            toast.error(e.message);
          }
        }
      );
    },
    [t, prompt, deleteCustomerGroup]
  );
  return useMemo(() => {
    return [
      columnHelper.accessor("name", {
        header: t("fields.name"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      columnHelper.accessor("customers", {
        header: t("customers.domain"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: row.original.customers?.length ?? 0 });
        }
      }),
      columnHelper.accessor("created_at", {
        header: t("fields.createdAt"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: getFullDate({
            date: row.original.created_at,
            includeTime: true
          }) });
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.dateAsc"),
        sortDescLabel: t("filters.sorting.dateDesc")
      }),
      columnHelper.accessor("updated_at", {
        header: t("fields.updatedAt"),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx("span", { children: getFullDate({
            date: row.original.updated_at,
            includeTime: true
          }) });
        },
        enableSorting: true,
        sortAscLabel: t("filters.sorting.dateAsc"),
        sortDescLabel: t("filters.sorting.dateDesc")
      }),
      columnHelper.action({
        actions: [
          [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              onClick: (row) => {
                navigate(`/customer-groups/${row.row.original.id}/edit`);
              }
            }
          ],
          [
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: (row) => {
                handleDeleteCustomerGroup({
                  id: row.row.original.id,
                  name: row.row.original.name ?? ""
                });
              }
            }
          ]
        ]
      })
    ];
  }, [t, navigate, getFullDate, handleDeleteCustomerGroup]);
};
var useFilters = () => {
  const dateFilters = useDataTableDateFilters();
  return useMemo(() => {
    return dateFilters;
  }, [dateFilters]);
};

// src/routes/customer-groups/customer-group-list/customer-group-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CustomerGroupsList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("customer_group.list.after"),
        before: getWidgets("customer_group.list.before")
      },
      children: /* @__PURE__ */ jsx2(CustomerGroupListTable, {})
    }
  );
};
export {
  CustomerGroupsList as Component
};
