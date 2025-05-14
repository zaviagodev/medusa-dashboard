import {
  InventoryItemGeneralSection
} from "./chunk-Q5DI5VYN.mjs";
import {
  TextCell,
  TextHeader
} from "./chunk-MSDRGCRR.mjs";
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
  getFormattedCountry
} from "./chunk-B6ZOPCPA.mjs";
import "./chunk-YOYOJU5D.mjs";
import {
  SectionRow
} from "./chunk-LFLGEXIG.mjs";
import {
  TwoColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import {
  useDate
} from "./chunk-Q5PHSNDY.mjs";
import "./chunk-DG7J63J2.mjs";
import {
  Thumbnail
} from "./chunk-MNXC6Q4F.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  TwoColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
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
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import {
  useDeleteReservationItem,
  useReservationItems
} from "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  inventoryItemsQueryKeys,
  useDeleteInventoryItemLevel,
  useInventoryItem,
  useInventoryItemLevels
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/inventory/inventory-detail/constants.ts
var INVENTORY_DETAIL_FIELDS = "*variants,*variants.product,*variants.options";

// src/routes/inventory/inventory-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var InventoryDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { inventory_item } = useInventoryItem(
    id,
    {
      fields: INVENTORY_DETAIL_FIELDS
    },
    {
      initialData: props.data,
      enabled: Boolean(id)
    }
  );
  if (!inventory_item) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: inventory_item.title ?? inventory_item.sku ?? id });
};

// src/routes/inventory/inventory-detail/inventory-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/inventory/inventory-detail/components/inventory-item-attributes/attributes-section.tsx
import { Container, Heading } from "@medusajs/ui";
import { PencilSquare } from "@medusajs/icons";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var InventoryItemAttributeSection = ({
  inventoryItem
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("products.attributes") }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "attributes",
                  icon: /* @__PURE__ */ jsx2(PencilSquare, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.height"), value: inventoryItem.height }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.width"), value: inventoryItem.width }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.length"), value: inventoryItem.length }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.weight"), value: inventoryItem.weight }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.midCode"), value: inventoryItem.mid_code }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.material"), value: inventoryItem.material }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.hsCode"), value: inventoryItem.hs_code }),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("fields.countryOfOrigin"),
        value: getFormattedCountry(inventoryItem.origin_country)
      }
    )
  ] });
};

// src/routes/inventory/inventory-detail/components/inventory-item-location-levels.tsx
import { Button, Container as Container2, Heading as Heading2 } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/inventory/inventory-detail/components/location-levels-table/use-location-list-table-columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/routes/inventory/inventory-detail/components/location-levels-table/location-actions.tsx
import { PencilSquare as PencilSquare2, Trash } from "@medusajs/icons";
import { usePrompt } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
var LocationActions = ({
  level
}) => {
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteInventoryItemLevel(
    level.inventory_item_id,
    level.location_id
  );
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("inventory.deleteWarning"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync();
  };
  return /* @__PURE__ */ jsx3(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx3(PencilSquare2, {}),
              label: t("actions.edit"),
              to: `locations/${level.location_id}`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx3(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete,
              disabled: level.reserved_quantity > 0 || level.stocked_quantity > 0
            }
          ]
        }
      ]
    }
  );
};

// src/routes/inventory/inventory-detail/components/location-levels-table/use-location-list-table-columns.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useLocationListTableColumns = () => {
  const { t } = useTranslation3();
  return useMemo(
    () => [
      columnHelper.accessor("stock_locations.0.name", {
        header: t("fields.location"),
        cell: ({ getValue }) => {
          const locationName = getValue();
          if (!locationName) {
            return /* @__PURE__ */ jsx4(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx4("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx4("span", { className: "truncate", children: locationName.toString() }) });
        }
      }),
      columnHelper.accessor("reserved_quantity", {
        header: t("inventory.reserved"),
        cell: ({ getValue }) => {
          const quantity = getValue();
          if (Number.isNaN(quantity)) {
            return /* @__PURE__ */ jsx4(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx4("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx4("span", { className: "truncate", children: quantity }) });
        }
      }),
      columnHelper.accessor("stocked_quantity", {
        header: t("fields.inStock"),
        cell: ({ getValue }) => {
          const stockedQuantity = getValue();
          if (Number.isNaN(stockedQuantity)) {
            return /* @__PURE__ */ jsx4(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx4("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx4("span", { className: "truncate", children: stockedQuantity }) });
        }
      }),
      columnHelper.accessor("available_quantity", {
        header: t("inventory.available"),
        cell: ({ getValue }) => {
          const availableQuantity = getValue();
          if (Number.isNaN(availableQuantity)) {
            return /* @__PURE__ */ jsx4(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx4("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx4("span", { className: "truncate", children: availableQuantity }) });
        }
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx4(LocationActions, { level: row.original })
      })
    ],
    [t]
  );
};

// src/routes/inventory/inventory-detail/components/location-levels-table/use-location-list-table-query.tsx
var useLocationLevelTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(
    [
      "id",
      "location_id",
      "stocked_quantity",
      "reserved_quantity",
      "incoming_quantity",
      "available_quantity",
      "*stock_locations"
    ],
    prefix
  );
  const { reserved_quantity, stocked_quantity, available_quantity, ...params } = raw;
  const searchParams = {
    limit: pageSize,
    reserved_quantity: reserved_quantity ? JSON.parse(reserved_quantity) : void 0,
    stocked_quantity: stocked_quantity ? JSON.parse(stocked_quantity) : void 0,
    available_quantity: available_quantity ? JSON.parse(available_quantity) : void 0,
    ...params
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/inventory/inventory-detail/components/location-levels-table/location-list-table.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var ItemLocationListTable = ({
  inventory_item_id
}) => {
  const { searchParams, raw } = useLocationLevelTableQuery({
    pageSize: PAGE_SIZE
  });
  const {
    inventory_levels,
    count,
    isPending: isLoading,
    isError,
    error
  } = useInventoryItemLevels(inventory_item_id, {
    ...searchParams,
    fields: "*stock_locations"
  });
  const columns = useLocationListTableColumns();
  const { table } = useDataTable({
    data: inventory_levels ?? [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx5(
    _DataTable,
    {
      table,
      columns,
      pageSize: PAGE_SIZE,
      count,
      isLoading,
      pagination: true,
      queryObject: raw
    }
  );
};

// src/routes/inventory/inventory-detail/components/inventory-item-location-levels.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var InventoryItemLocationLevelsSection = ({
  inventoryItem
}) => {
  const { t } = useTranslation4();
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx6(Heading2, { children: t("inventory.locationLevels") }),
      /* @__PURE__ */ jsx6(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx6(Link, { to: "locations", children: t("inventory.manageLocations") }) })
    ] }),
    /* @__PURE__ */ jsx6(ItemLocationListTable, { inventory_item_id: inventoryItem.id })
  ] });
};

// src/routes/inventory/inventory-detail/components/inventory-item-reservations.tsx
import { Button as Button2, Container as Container3, Heading as Heading3 } from "@medusajs/ui";
import { useTranslation as useTranslation8 } from "react-i18next";
import { Link as Link2 } from "react-router-dom";

// src/routes/inventory/inventory-detail/components/reservations-table/reservation-list-table.tsx
import { useMemo as useMemo3 } from "react";

// src/routes/inventory/inventory-detail/components/reservations-table/use-reservation-list-table-columns.tsx
import { createColumnHelper as createColumnHelper2 } from "@tanstack/react-table";
import { useMemo as useMemo2 } from "react";
import { useTranslation as useTranslation7 } from "react-i18next";

// src/components/table/table-cells/common/created-at-cell/created-at-cell.tsx
import { Tooltip } from "@medusajs/ui";
import { useTranslation as useTranslation5 } from "react-i18next";
import { jsx as jsx7 } from "react/jsx-runtime";
var CreatedAtCell = ({ date }) => {
  const { getFullDate } = useDate();
  if (!date) {
    return /* @__PURE__ */ jsx7(PlaceholderCell, {});
  }
  return /* @__PURE__ */ jsx7("div", { className: "flex h-full w-full items-center overflow-hidden", children: /* @__PURE__ */ jsx7(
    Tooltip,
    {
      className: "z-10",
      content: /* @__PURE__ */ jsx7("span", { className: "text-pretty", children: `${getFullDate({
        date,
        includeTime: true
      })}` }),
      children: /* @__PURE__ */ jsx7("span", { className: "truncate", children: getFullDate({ date, includeTime: true }) })
    }
  ) });
};

// src/routes/inventory/inventory-detail/components/reservations-table/reservation-actions.tsx
import { PencilSquare as PencilSquare3, Trash as Trash2 } from "@medusajs/icons";
import { toast, usePrompt as usePrompt2 } from "@medusajs/ui";
import { useTranslation as useTranslation6 } from "react-i18next";
import { jsx as jsx8 } from "react/jsx-runtime";
var ReservationActions = ({
  reservation
}) => {
  const { t } = useTranslation6();
  const prompt = usePrompt2();
  const { mutateAsync } = useDeleteReservationItem(reservation.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("inventory.deleteWarning"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("inventory.reservation.deleteSuccessToast"));
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsx8(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx8(PencilSquare3, {}),
              label: t("actions.edit"),
              to: `/reservations/${reservation.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx8(Trash2, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};

// src/routes/inventory/inventory-detail/components/reservations-table/use-reservation-list-table-columns.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var columnHelper2 = createColumnHelper2();
var useReservationTableColumn = ({ sku }) => {
  const { t } = useTranslation7();
  return useMemo2(
    () => [
      columnHelper2.display({
        id: "sku",
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("fields.sku") }),
        cell: () => {
          return /* @__PURE__ */ jsx9(TextCell, { text: sku });
        }
      }),
      columnHelper2.accessor("line_item.order_id", {
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("inventory.reservation.orderID") }),
        cell: ({ getValue }) => {
          const orderId = getValue();
          if (!orderId) {
            return /* @__PURE__ */ jsx9(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx9(TextCell, { text: orderId });
        }
      }),
      columnHelper2.accessor("description", {
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("fields.description") }),
        cell: ({ getValue }) => {
          const description = getValue();
          if (!description) {
            return /* @__PURE__ */ jsx9(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx9(TextCell, { text: description });
        }
      }),
      columnHelper2.accessor("location.name", {
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("inventory.reservation.location") }),
        cell: ({ getValue }) => {
          const location = getValue();
          if (!location) {
            return /* @__PURE__ */ jsx9(PlaceholderCell, {});
          }
          return /* @__PURE__ */ jsx9(TextCell, { text: location });
        }
      }),
      columnHelper2.accessor("created_at", {
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("fields.createdAt") }),
        cell: ({ getValue }) => /* @__PURE__ */ jsx9(CreatedAtCell, { date: getValue() })
      }),
      columnHelper2.accessor("quantity", {
        header: () => /* @__PURE__ */ jsx9(TextHeader, { text: t("fields.quantity"), align: "right" }),
        cell: ({ getValue }) => {
          return /* @__PURE__ */ jsx9(TextCell, { text: getValue(), align: "right" });
        }
      }),
      columnHelper2.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx9(ReservationActions, { reservation: row.original })
      })
    ],
    [t]
  );
};

// src/routes/inventory/inventory-detail/components/reservations-table/use-reservation-list-table-query.tsx
var useReservationsTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(
    [
      "id",
      "location_id",
      "inventory_item_id",
      "quantity",
      "line_item_id",
      "description",
      "created_by"
    ],
    prefix
  );
  const { quantity, ...params } = raw;
  const searchParams = {
    limit: pageSize,
    quantity: quantity ? JSON.parse(quantity) : void 0,
    ...params
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/inventory/inventory-detail/components/reservations-table/reservation-list-table.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var PAGE_SIZE2 = 20;
var ReservationItemTable = ({
  inventoryItem
}) => {
  const { searchParams, raw } = useReservationsTableQuery({
    pageSize: PAGE_SIZE2
  });
  const { reservations, count, isPending, isError, error } = useReservationItems({
    ...searchParams,
    inventory_item_id: [inventoryItem.id]
  });
  const { stock_locations } = useStockLocations({
    id: (reservations || []).map((r) => r.location_id)
  });
  const data = useMemo3(() => {
    const locationMap = new Map((stock_locations || []).map((l) => [l.id, l]));
    return (reservations || []).map((r) => ({
      ...r,
      location: locationMap.get(r.location_id)
    }));
  }, [reservations, stock_locations]);
  const columns = useReservationTableColumn({ sku: inventoryItem.sku });
  const { table } = useDataTable({
    data: data ?? [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE2
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx10(
    _DataTable,
    {
      table,
      columns,
      pageSize: PAGE_SIZE2,
      count,
      isLoading: isPending,
      pagination: true,
      queryObject: raw
    }
  );
};

// src/routes/inventory/inventory-detail/components/inventory-item-reservations.tsx
import { jsx as jsx11, jsxs as jsxs3 } from "react/jsx-runtime";
var InventoryItemReservationsSection = ({
  inventoryItem
}) => {
  const { t } = useTranslation8();
  return /* @__PURE__ */ jsxs3(Container3, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Heading3, { children: t("reservations.domain") }),
      /* @__PURE__ */ jsx11(Button2, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx11(Link2, { to: `/reservations/create?item_id=${inventoryItem.id}`, children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx11(ReservationItemTable, { inventoryItem })
  ] });
};

// src/routes/inventory/inventory-detail/components/inventory-item-variants/variants-section.tsx
import { TriangleRightMini } from "@medusajs/icons";
import { Container as Container4, Heading as Heading4 } from "@medusajs/ui";
import { useTranslation as useTranslation9 } from "react-i18next";
import { Link as Link3 } from "react-router-dom";
import { jsx as jsx12, jsxs as jsxs4 } from "react/jsx-runtime";
var InventoryItemVariantsSection = ({
  variants
}) => {
  const { t } = useTranslation9();
  if (!variants?.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs4(Container4, { className: "p-0", children: [
    /* @__PURE__ */ jsx12("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsx12(Heading4, { level: "h2", children: t("inventory.associatedVariants") }) }),
    /* @__PURE__ */ jsx12("div", { className: "txt-small flex flex-col gap-2 px-2 pb-2", children: variants.map((variant) => {
      const link = variant.product ? `/products/${variant.product.id}/variants/${variant.id}` : null;
      const Inner = /* @__PURE__ */ jsx12("div", { className: "shadow-elevation-card-rest bg-ui-bg-component rounded-md px-4 py-2 transition-colors", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx12("div", { className: "shadow-elevation-card-rest rounded-md", children: /* @__PURE__ */ jsx12(Thumbnail, { src: variant.product?.thumbnail }) }),
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsx12("span", { className: "text-ui-fg-base font-medium", children: variant.title }),
          /* @__PURE__ */ jsx12("span", { className: "text-ui-fg-subtle", children: variant.options.map((o) => o.value).join(" \u22C5 ") })
        ] }),
        /* @__PURE__ */ jsx12("div", { className: "size-7 flex items-center justify-center", children: /* @__PURE__ */ jsx12(TriangleRightMini, { className: "text-ui-fg-muted" }) })
      ] }) });
      if (!link) {
        return /* @__PURE__ */ jsx12("div", { children: Inner }, variant.id);
      }
      return /* @__PURE__ */ jsx12(
        Link3,
        {
          to: link,
          className: "outline-none focus-within:shadow-borders-interactive-with-focus rounded-md [&:hover>div]:bg-ui-bg-component-hover",
          children: Inner
        },
        variant.id
      );
    }) })
  ] });
};

// src/routes/inventory/inventory-detail/inventory-detail.tsx
import { jsx as jsx13, jsxs as jsxs5 } from "react/jsx-runtime";
var InventoryDetail = () => {
  const { id } = useParams();
  const initialData = useLoaderData();
  const {
    inventory_item,
    isPending: isLoading,
    isError,
    error
  } = useInventoryItem(
    id,
    {
      fields: INVENTORY_DETAIL_FIELDS
    },
    {
      initialData
    }
  );
  const { getWidgets } = useExtension();
  if (isLoading || !inventory_item) {
    return /* @__PURE__ */ jsx13(
      TwoColumnPageSkeleton,
      {
        showJSON: true,
        mainSections: 3,
        sidebarSections: 2,
        showMetadata: true
      }
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs5(
    TwoColumnPage,
    {
      widgets: {
        after: getWidgets("inventory_item.details.after"),
        before: getWidgets("inventory_item.details.before"),
        sideAfter: getWidgets("inventory_item.details.side.after"),
        sideBefore: getWidgets("inventory_item.details.side.before")
      },
      data: inventory_item,
      showJSON: true,
      showMetadata: true,
      children: [
        /* @__PURE__ */ jsxs5(TwoColumnPage.Main, { children: [
          /* @__PURE__ */ jsx13(InventoryItemGeneralSection, { inventoryItem: inventory_item }),
          /* @__PURE__ */ jsx13(InventoryItemLocationLevelsSection, { inventoryItem: inventory_item }),
          /* @__PURE__ */ jsx13(InventoryItemReservationsSection, { inventoryItem: inventory_item })
        ] }),
        /* @__PURE__ */ jsxs5(TwoColumnPage.Sidebar, { children: [
          /* @__PURE__ */ jsx13(
            InventoryItemVariantsSection,
            {
              variants: inventory_item.variants
            }
          ),
          /* @__PURE__ */ jsx13(InventoryItemAttributeSection, { inventoryItem: inventory_item })
        ] })
      ]
    }
  );
};

// src/routes/inventory/inventory-detail/loader.ts
var inventoryDetailQuery = (id) => ({
  queryKey: inventoryItemsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.inventoryItem.retrieve(id, {
    fields: INVENTORY_DETAIL_FIELDS
  })
});
var inventoryItemLoader = async ({ params }) => {
  const id = params.id;
  const query = inventoryDetailQuery(id);
  return queryClient.ensureQueryData(query);
};
export {
  InventoryDetailBreadcrumb as Breadcrumb,
  InventoryDetail as Component,
  inventoryItemLoader as loader
};
