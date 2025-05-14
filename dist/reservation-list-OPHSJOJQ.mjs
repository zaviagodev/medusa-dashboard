import {
  DateCell
} from "./chunk-3OHUAQUF.mjs";
import "./chunk-LQTHYS2Z.mjs";
import {
  PlaceholderCell
} from "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
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
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useDeleteReservationItem,
  useReservationItems
} from "./chunk-FVC7M755.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/reservations/reservation-list/components/reservation-list-table/reservation-list-table.tsx
import { Button, Container, Heading, Text } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/reservations/reservation-list/components/reservation-list-table/use-reservation-table-columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/reservations/reservation-list/components/reservation-list-table/reservation-actions.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var ReservationActions = ({
  reservation
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteReservationItem(reservation.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("reservations.deleteWarning"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync();
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.edit"),
              to: `${reservation.id}/edit`,
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

// src/routes/reservations/reservation-list/components/reservation-list-table/use-reservation-table-columns.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useReservationTableColumns = () => {
  const { t } = useTranslation2();
  return useMemo(
    () => [
      columnHelper.accessor("inventory_item", {
        header: t("fields.sku"),
        cell: ({ getValue }) => {
          const inventoryItem = getValue();
          if (!inventoryItem || !inventoryItem.sku) {
            return /* @__PURE__ */ jsx2(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx2("span", { className: "truncate", children: inventoryItem.sku }) });
        }
      }),
      /**
       * TEMP: hide this column until a link is added
       */
      // columnHelper.accessor("line_item", {
      //   header: t("fields.order"),
      //   cell: ({ getValue }) => {
      //     const inventoryItem = getValue()
      //
      //     if (!inventoryItem || !inventoryItem.order?.display_id) {
      //       return <PlaceholderCell />
      //     }
      //
      //     return (
      //       <div className="flex size-full items-center overflow-hidden">
      //         <LinkButton to={`/orders/${inventoryItem.order.id}`}>
      //           <span className="truncate">
      //             #{inventoryItem.order.display_id}
      //           </span>
      //         </LinkButton>
      //       </div>
      //     )
      //   },
      // }),
      columnHelper.accessor("description", {
        header: t("fields.description"),
        cell: ({ getValue }) => {
          const description = getValue();
          if (!description) {
            return /* @__PURE__ */ jsx2(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx2("span", { className: "truncate", children: description }) });
        }
      }),
      columnHelper.accessor("created_at", {
        header: t("fields.created"),
        cell: ({ getValue }) => {
          const created = getValue();
          return /* @__PURE__ */ jsx2(DateCell, { date: created });
        }
      }),
      columnHelper.accessor("quantity", {
        header: () => /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center justify-end overflow-hidden text-right", children: /* @__PURE__ */ jsx2("span", { className: "truncate", children: t("fields.quantity") }) }),
        cell: ({ getValue }) => {
          const quantity = getValue();
          return /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center justify-end overflow-hidden text-right", children: /* @__PURE__ */ jsx2("span", { className: "truncate", children: quantity }) });
        }
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          const reservation = row.original;
          return /* @__PURE__ */ jsx2(ReservationActions, { reservation });
        }
      })
    ],
    [t]
  );
};

// src/routes/reservations/reservation-list/components/reservation-list-table/use-reservation-table-filters.tsx
import { useTranslation as useTranslation3 } from "react-i18next";
var useReservationTableFilters = () => {
  const { t } = useTranslation3();
  const { stock_locations } = useStockLocations({
    limit: 1e3
  });
  const filters = [];
  if (stock_locations) {
    const stockLocationFilter = {
      type: "select",
      options: stock_locations.map((s) => ({
        label: s.name,
        value: s.id
      })),
      key: "location_id",
      searchable: true,
      label: t("fields.location")
    };
    filters.push(stockLocationFilter);
  }
  filters.push({
    type: "date",
    key: "created_at",
    label: t("fields.createdAt")
  });
  return filters;
};

// src/routes/reservations/reservation-list/components/reservation-list-table/use-reservation-table-query.tsx
var useReservationTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(
    ["location_id", "offset", "created_at", "quantity", "updated_at", "order"],
    prefix
  );
  const { location_id, created_at, updated_at, quantity, offset, ...rest } = raw;
  const searchParams = {
    limit: pageSize,
    offset: offset ? parseInt(offset) : void 0,
    location_id,
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0,
    ...rest
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/reservations/reservation-list/components/reservation-list-table/reservation-list-table.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var ReservationListTable = () => {
  const { t } = useTranslation4();
  const { searchParams } = useReservationTableQuery({
    pageSize: PAGE_SIZE
  });
  const { reservations, count, isPending, isError, error } = useReservationItems({
    ...searchParams
  });
  const filters = useReservationTableFilters();
  const columns = useReservationTableColumns();
  const { table } = useDataTable({
    data: reservations || [],
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
        /* @__PURE__ */ jsx3(Heading, { children: t("reservations.domain") }),
        /* @__PURE__ */ jsx3(Text, { className: "text-ui-fg-subtle", size: "small", children: t("reservations.subtitle") })
      ] }),
      /* @__PURE__ */ jsx3(Button, { variant: "secondary", size: "small", asChild: true, children: /* @__PURE__ */ jsx3(Link, { to: "create", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        count,
        isLoading: isPending,
        filters,
        pagination: true,
        navigateTo: (row) => row.id,
        search: false
      }
    )
  ] });
};

// src/routes/reservations/reservation-list/reservation-list.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ReservationList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx4(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("reservation.list.before"),
        after: getWidgets("reservation.list.after")
      },
      children: /* @__PURE__ */ jsx4(ReservationListTable, {})
    }
  );
};
export {
  ReservationList as Component
};
