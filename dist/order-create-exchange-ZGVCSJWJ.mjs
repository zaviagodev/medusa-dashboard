import {
  ItemPlaceholder
} from "./chunk-QJ6SBVJ2.mjs";
import {
  OutboundShippingPlaceholder,
  ReturnShippingPlaceholder
} from "./chunk-P3DRE4IY.mjs";
import {
  MoneyAmountCell
} from "./chunk-NNBHHXXN.mjs";
import {
  useAddExchangeInboundItems,
  useAddExchangeInboundShipping,
  useAddExchangeOutboundItems,
  useAddExchangeOutboundShipping,
  useCancelExchangeRequest,
  useCreateExchange,
  useDeleteExchangeInboundShipping,
  useDeleteExchangeOutboundShipping,
  useExchange,
  useExchangeConfirmRequest,
  useRemoveExchangeInboundItem,
  useRemoveExchangeOutboundItem,
  useUpdateExchangeInboundItem,
  useUpdateExchangeInboundShipping,
  useUpdateExchangeOutboundItems,
  useUpdateExchangeOutboundShipping
} from "./chunk-DCN4IKDA.mjs";
import {
  getReturnableQuantity
} from "./chunk-PXZ7QYKX.mjs";
import {
  useReturn,
  useUpdateReturn
} from "./chunk-A35MFVT3.mjs";
import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
import {
  getStylizedAmount
} from "./chunk-PDWBYQOW.mjs";
import {
  ProductCell,
  ProductHeader
} from "./chunk-IQBAUTU5.mjs";
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
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  StackedFocusModal,
  useRouteModal,
  useStackedModal
} from "./chunk-4TC5YS65.mjs";
import {
  useReturnReasons
} from "./chunk-2VTICXJR.mjs";
import {
  Thumbnail
} from "./chunk-MNXC6Q4F.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useVariants
} from "./chunk-Z5UDPQIH.mjs";
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
import {
  useShippingOptions
} from "./chunk-GRT22PE5.mjs";
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useOrder,
  useOrderPreview
} from "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-create-exchange/exchange-create.tsx
import { toast as toast4 } from "@medusajs/ui";
import { useEffect as useEffect4, useState as useState6 } from "react";
import { useTranslation as useTranslation12 } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSquare } from "@medusajs/icons";
import {
  Button as Button3,
  CurrencyInput,
  Heading as Heading3,
  IconButton as IconButton2,
  Switch,
  toast as toast3,
  usePrompt
} from "@medusajs/ui";
import { useEffect as useEffect3, useMemo as useMemo6, useState as useState5 } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation11 } from "react-i18next";

// src/routes/orders/order-create-exchange/components/exchange-create-form/schema.ts
import { z } from "zod";
var ExchangeCreateSchema = z.object({
  inbound_items: z.array(
    z.object({
      item_id: z.string(),
      quantity: z.number(),
      reason_id: z.string().nullish(),
      note: z.string().nullish()
    })
  ),
  outbound_items: z.array(
    z.object({
      item_id: z.string(),
      quantity: z.number()
    })
  ),
  location_id: z.string().optional(),
  inbound_option_id: z.string().nullish(),
  outbound_option_id: z.string().nullish(),
  send_notification: z.boolean().optional()
});

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-inbound-section.tsx
import { Alert, Button, Heading, Text as Text2, toast } from "@medusajs/ui";
import { useEffect, useMemo as useMemo3, useState as useState2 } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation as useTranslation5 } from "react-i18next";

// src/routes/orders/order-create-exchange/components/add-exchange-inbound-items-table/add-exchange-inbound-items-table.tsx
import { useMemo as useMemo2, useState } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/routes/orders/order-create-exchange/components/add-exchange-inbound-items-table/use-exchange-item-table-columns.tsx
import { Checkbox } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useExchangeItemTableColumns = (currencyCode) => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          const isSelectable = row.getCanSelect();
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              disabled: !isSelectable,
              checked: row.getIsSelected(),
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
        }
      }),
      columnHelper.display({
        id: "product",
        header: () => /* @__PURE__ */ jsx(ProductHeader, {}),
        cell: ({ row }) => /* @__PURE__ */ jsx(
          ProductCell,
          {
            product: {
              thumbnail: row.original.thumbnail,
              title: row.original.product_title
            }
          }
        )
      }),
      columnHelper.accessor("variant.sku", {
        header: t("fields.sku"),
        cell: ({ getValue }) => {
          return getValue() || "-";
        }
      }),
      columnHelper.accessor("variant.title", {
        header: t("fields.variant")
      }),
      columnHelper.accessor("quantity", {
        header: () => /* @__PURE__ */ jsx("div", { className: "flex size-full items-center overflow-hidden text-right", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: t("fields.quantity") }) }),
        cell: ({ getValue, row }) => {
          return getReturnableQuantity(row.original);
        }
      }),
      columnHelper.accessor("refundable_total", {
        header: () => /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-end overflow-hidden text-right", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: t("fields.price") }) }),
        cell: ({ getValue }) => {
          const amount = getValue() || 0;
          const stylized = getStylizedAmount(amount, currencyCode);
          return /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-end overflow-hidden text-right", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: stylized }) });
        }
      })
    ],
    [t, currencyCode]
  );
};

// src/routes/orders/order-create-exchange/components/add-exchange-inbound-items-table/use-exchange-item-table-filters.tsx
import { useTranslation as useTranslation2 } from "react-i18next";
var useExchangeItemTableFilters = () => {
  const { t } = useTranslation2();
  const filters = [
    {
      key: "created_at",
      label: t("fields.createdAt"),
      type: "date"
    },
    {
      key: "updated_at",
      label: t("fields.updatedAt"),
      type: "date"
    }
  ];
  return filters;
};

// src/routes/orders/order-create-exchange/components/add-exchange-inbound-items-table/use-exchange-item-table-query.tsx
var useExchangeItemTableQuery = ({
  pageSize = 50,
  prefix
}) => {
  const raw = useQueryParams(
    ["q", "offset", "order", "created_at", "updated_at"],
    prefix
  );
  const { offset, created_at, updated_at, ...rest } = raw;
  const searchParams = {
    ...rest,
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0
  };
  return { searchParams, raw };
};

// src/routes/orders/order-create-exchange/components/add-exchange-inbound-items-table/add-exchange-inbound-items-table.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 50;
var PREFIX = "rit";
var AddExchangeInboundItemsTable = ({
  onSelectionChange,
  selectedItems,
  items,
  currencyCode
}) => {
  const { t } = useTranslation3();
  const [rowSelection, setRowSelection] = useState(
    selectedItems.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {})
  );
  const updater = (fn) => {
    const newState = typeof fn === "function" ? fn(rowSelection) : fn;
    setRowSelection(newState);
    onSelectionChange(Object.keys(newState));
  };
  const { searchParams, raw } = useExchangeItemTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const queriedItems = useMemo2(() => {
    const { order, offset, limit, q, created_at, updated_at } = searchParams;
    let results = items;
    if (q) {
      results = results.filter((i) => {
        return i.product_title.toLowerCase().includes(q.toLowerCase()) || i.variant_title.toLowerCase().includes(q.toLowerCase()) || i.variant_sku?.toLowerCase().includes(q.toLowerCase());
      });
    }
    if (order) {
      const direction = order[0] === "-" ? "desc" : "asc";
      const field = order.replace("-", "");
      results = sortItems(results, field, direction);
    }
    if (created_at) {
      results = filterByDate(results, created_at, "created_at");
    }
    if (updated_at) {
      results = filterByDate(results, updated_at, "updated_at");
    }
    return results.slice(offset, offset + limit);
  }, [items, currencyCode, searchParams]);
  const columns = useExchangeItemTableColumns(currencyCode);
  const filters = useExchangeItemTableFilters();
  const { table } = useDataTable({
    data: queriedItems,
    columns,
    count: queriedItems.length,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
    enableRowSelection: (row) => {
      return getReturnableQuantity(row.original) > 0;
    },
    rowSelection: {
      state: rowSelection,
      updater
    }
  });
  return /* @__PURE__ */ jsx2("div", { className: "flex size-full flex-col overflow-hidden", children: /* @__PURE__ */ jsx2(
    _DataTable,
    {
      table,
      columns,
      pageSize: PAGE_SIZE,
      count: queriedItems.length,
      filters,
      pagination: true,
      layout: "fill",
      search: true,
      orderBy: [
        { key: "product_title", label: t("fields.product") },
        { key: "variant_title", label: t("fields.variant") },
        { key: "sku", label: t("fields.sku") }
      ],
      prefix: PREFIX,
      queryObject: raw
    }
  ) });
};
var sortItems = (items, field, direction) => {
  return items.sort((a, b) => {
    let aValue;
    let bValue;
    if (field === "product_title") {
      aValue = a.product_title;
      bValue = b.product_title;
    } else if (field === "variant_title") {
      aValue = a.variant_title;
      bValue = b.variant_title;
    } else if (field === "sku") {
      aValue = a.variant_sku;
      bValue = b.variant_sku;
    }
    if (aValue < bValue) {
      return direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return direction === "asc" ? 1 : -1;
    }
    return 0;
  });
};
var filterByDate = (items, date, field) => {
  const { gt, gte, lt, lte } = date;
  return items.filter((i) => {
    const itemDate = new Date(i[field]);
    let isValid = true;
    if (gt) {
      isValid = isValid && itemDate > new Date(gt);
    }
    if (gte) {
      isValid = isValid && itemDate >= new Date(gte);
    }
    if (lt) {
      isValid = isValid && itemDate < new Date(lt);
    }
    if (lte) {
      isValid = isValid && itemDate <= new Date(lte);
    }
    return isValid;
  });
};

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-inbound-item.tsx
import { ChatBubble, DocumentText, XCircle, XMark } from "@medusajs/icons";
import { IconButton, Input, Text } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
function ExchangeInboundItem({
  item,
  previewItem,
  currencyCode,
  form,
  onRemove,
  onUpdate,
  index
}) {
  const { t } = useTranslation4();
  const { return_reasons = [] } = useReturnReasons({ fields: "+label" });
  const formItem = form.watch(`inbound_items.${index}`);
  const showReturnReason = typeof formItem.reason_id === "string";
  const showNote = typeof formItem.note === "string";
  return /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 rounded-xl ", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-x-2 gap-y-2 p-3 text-sm md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-x-3", children: [
        /* @__PURE__ */ jsx3(Thumbnail, { src: item.thumbnail }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs(Text, { className: "txt-small", as: "span", weight: "plus", children: [
              item.title,
              " "
            ] }),
            item.variant_sku && /* @__PURE__ */ jsxs("span", { children: [
              "(",
              item.variant_sku,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx3(Text, { as: "div", className: "text-ui-fg-subtle txt-small", children: item.product_title })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-grow items-center gap-2", children: [
          /* @__PURE__ */ jsx3(
            Form.Field,
            {
              control: form.control,
              name: `inbound_items.${index}.quantity`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
                    Input,
                    {
                      ...field,
                      className: "bg-ui-bg-base txt-small w-[67px] rounded-lg",
                      min: 1,
                      max: item.quantity,
                      type: "number",
                      onBlur: (e) => {
                        const val = e.target.value;
                        const payload = val === "" ? null : Number(val);
                        field.onChange(payload);
                        if (payload) {
                          onUpdate({ quantity: payload });
                        }
                      }
                    }
                  ) }),
                  /* @__PURE__ */ jsx3(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx3(Text, { className: "txt-small text-ui-fg-subtle", children: t("fields.qty") })
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "text-ui-fg-subtle txt-small mr-2 flex flex-shrink-0", children: /* @__PURE__ */ jsx3(
          MoneyAmountCell,
          {
            currencyCode,
            amount: previewItem.return_requested_total
          }
        ) }),
        /* @__PURE__ */ jsx3(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  !showReturnReason && {
                    label: t("actions.addReason"),
                    onClick: () => form.setValue(`inbound_items.${index}.reason_id`, ""),
                    icon: /* @__PURE__ */ jsx3(ChatBubble, {})
                  },
                  !showNote && {
                    label: t("actions.addNote"),
                    onClick: () => form.setValue(`inbound_items.${index}.note`, ""),
                    icon: /* @__PURE__ */ jsx3(DocumentText, {})
                  },
                  {
                    label: t("actions.remove"),
                    onClick: onRemove,
                    icon: /* @__PURE__ */ jsx3(XCircle, {})
                  }
                ].filter(Boolean)
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Fragment, { children: [
      showReturnReason && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-2 p-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx3(Form.Label, { children: t("orders.returns.reason") }),
          /* @__PURE__ */ jsx3(Form.Hint, { className: "!mt-1", children: t("orders.returns.reasonHint") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3("div", { className: "flex-grow", children: /* @__PURE__ */ jsx3(
            Form.Field,
            {
              control: form.control,
              name: `inbound_items.${index}.reason_id`,
              render: ({ field: { ref, value, onChange, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
                    Combobox,
                    {
                      className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                      value,
                      onChange: (v) => {
                        onUpdate({ reason_id: v });
                        onChange(v);
                      },
                      ...field,
                      options: return_reasons.map((reason) => ({
                        label: reason.label,
                        value: reason.id
                      }))
                    }
                  ) }),
                  /* @__PURE__ */ jsx3(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsx3(
            IconButton,
            {
              type: "button",
              className: "flex-shrink",
              variant: "transparent",
              onClick: () => {
                form.setValue(`inbound_items.${index}.reason_id`, null);
                onUpdate({ reason_id: null });
              },
              children: /* @__PURE__ */ jsx3(XMark, { className: "text-ui-fg-muted" })
            }
          )
        ] })
      ] }),
      showNote && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-2 p-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx3(Form.Label, { children: t("orders.returns.note") }),
          /* @__PURE__ */ jsx3(Form.Hint, { className: "!mt-1", children: t("orders.returns.noteHint") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx3("div", { className: "flex-grow", children: /* @__PURE__ */ jsx3(
            Form.Field,
            {
              control: form.control,
              name: `inbound_items.${index}.note`,
              render: ({ field: { ref, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
                    Input,
                    {
                      ...field,
                      onBlur: () => {
                        field.onChange(field.value);
                        onUpdate({ internal_note: field.value });
                      },
                      className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover"
                    }
                  ) }),
                  /* @__PURE__ */ jsx3(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsx3(
            IconButton,
            {
              type: "button",
              className: "flex-shrink",
              variant: "transparent",
              onClick: () => {
                form.setValue(`inbound_items.${index}.note`, null);
                onUpdate({ internal_note: null });
              },
              children: /* @__PURE__ */ jsx3(XMark, { className: "text-ui-fg-muted" })
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-inbound-section.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var itemsToAdd = [];
var itemsToRemove = [];
var ExchangeInboundSection = ({
  order,
  preview,
  exchange,
  form,
  orderReturn
}) => {
  const { t } = useTranslation5();
  const { setIsOpen } = useStackedModal();
  const [inventoryMap, setInventoryMap] = useState2({});
  const { mutateAsync: updateReturn } = useUpdateReturn(
    preview?.order_change?.return_id,
    order.id
  );
  const { mutateAsync: addInboundShipping } = useAddExchangeInboundShipping(
    exchange.id,
    order.id
  );
  const { mutateAsync: deleteInboundShipping } = useDeleteExchangeInboundShipping(exchange.id, order.id);
  const { mutateAsync: addInboundItem } = useAddExchangeInboundItems(
    exchange.id,
    order.id
  );
  const { mutateAsync: updateInboundItem } = useUpdateExchangeInboundItem(
    exchange.id,
    order.id
  );
  const { mutateAsync: removeInboundItem } = useRemoveExchangeInboundItem(
    exchange.id,
    order.id
  );
  const previewInboundItems = useMemo3(
    () => preview?.items?.filter(
      (i) => !!i.actions?.find((a) => a.exchange_id === exchange.id)
    ),
    [preview.items]
  );
  const inboundPreviewItems = previewInboundItems.filter(
    (item) => !!item.actions?.find((a) => a.action === "RETURN_ITEM")
  );
  const itemsMap = useMemo3(
    () => new Map(order?.items?.map((i) => [i.id, i])),
    [order.items]
  );
  const locationId = form.watch("location_id");
  const { stock_locations = [] } = useStockLocations({ limit: 999 });
  const { shipping_options = [] } = useShippingOptions(
    {
      limit: 999,
      fields: "*prices,+service_zone.fulfillment_set.location.id",
      stock_location_id: locationId
    },
    {
      enabled: !!locationId
    }
  );
  const inboundShippingOptions = shipping_options.filter(
    (shippingOption) => !!shippingOption.rules.find(
      (r) => r.attribute === "is_return" && r.value === "true"
    )
  );
  const {
    fields: inboundItems,
    append,
    remove,
    update
  } = useFieldArray({
    name: "inbound_items",
    control: form.control
  });
  const inboundItemsMap = useMemo3(
    () => new Map(previewInboundItems.map((i) => [i.id, i])),
    [previewInboundItems, inboundItems]
  );
  useEffect(() => {
    const existingItemsMap = {};
    inboundPreviewItems.forEach((i) => {
      const ind = inboundItems.findIndex((field) => field.item_id === i.id);
      existingItemsMap[i.id] = true;
      if (ind > -1) {
        if (inboundItems[ind].quantity !== i.detail.return_requested_quantity) {
          const returnItemAction = i.actions?.find(
            (a) => a.action === "RETURN_ITEM"
          );
          update(ind, {
            ...inboundItems[ind],
            quantity: i.detail.return_requested_quantity,
            note: returnItemAction?.internal_note,
            reason_id: returnItemAction?.details?.reason_id
          });
        }
      } else {
        append(
          { item_id: i.id, quantity: i.detail.return_requested_quantity },
          { shouldFocus: false }
        );
      }
    });
    inboundItems.forEach((i, ind) => {
      if (!(i.item_id in existingItemsMap)) {
        remove(ind);
      }
    });
  }, [previewInboundItems]);
  useEffect(() => {
    const inboundShippingMethod = preview.shipping_methods.find(
      (s) => s.actions?.find((a) => a.action === "SHIPPING_ADD" && !!a.return_id)
    );
    if (inboundShippingMethod) {
      form.setValue(
        "inbound_option_id",
        inboundShippingMethod.shipping_option_id
      );
    } else {
      form.setValue("inbound_option_id", "");
    }
  }, [preview.shipping_methods]);
  useEffect(() => {
    form.setValue("location_id", orderReturn?.location_id);
  }, [orderReturn]);
  const showInboundItemsPlaceholder = !inboundItems.length;
  const onItemsSelected = async () => {
    itemsToAdd.length && await addInboundItem(
      {
        items: itemsToAdd.map((id) => ({
          id,
          quantity: 1
        }))
      },
      {
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
    for (const itemToRemove of itemsToRemove) {
      const actionId = previewInboundItems.find((i) => i.id === itemToRemove)?.actions?.find((a) => a.action === "RETURN_ITEM")?.id;
      if (actionId) {
        await removeInboundItem(actionId, {
          onError: (error) => {
            toast.error(error.message);
          }
        });
      }
    }
    setIsOpen("inbound-items", false);
  };
  const onLocationChange = async (selectedLocationId) => {
    await updateReturn({ location_id: selectedLocationId });
  };
  const onShippingOptionChange = async (selectedOptionId) => {
    const inboundShippingMethods = preview.shipping_methods.filter(
      (s) => s.actions?.find((a) => a.action === "SHIPPING_ADD" && !!a.return_id)
    );
    const promises = inboundShippingMethods.filter(Boolean).map((inboundShippingMethod) => {
      const action = inboundShippingMethod.actions?.find(
        (a) => a.action === "SHIPPING_ADD" && !!a.return_id
      );
      if (action) {
        return deleteInboundShipping(action.id);
      }
    });
    await Promise.all(promises);
    if (selectedOptionId) {
      await addInboundShipping(
        { shipping_option_id: selectedOptionId },
        {
          onError: (error) => {
            toast.error(error.message);
          }
        }
      );
    }
  };
  const showLevelsWarning = useMemo3(() => {
    if (!locationId) {
      return false;
    }
    const allItemsHaveLocation = inboundItems.map((_i) => {
      const item = itemsMap.get(_i.item_id);
      if (!item?.variant_id || !item?.variant) {
        return true;
      }
      if (!item.variant?.manage_inventory) {
        return true;
      }
      return inventoryMap[item.variant_id]?.find(
        (l) => l.location_id === locationId
      );
    }).every(Boolean);
    return !allItemsHaveLocation;
  }, [inboundItems, inventoryMap, locationId]);
  useEffect(() => {
    const getInventoryMap = async () => {
      const ret = {};
      if (!inboundItems.length) {
        return ret;
      }
      const variantIds = inboundItems.map((item) => item?.variant_id).filter(Boolean);
      const variants = (await sdk.admin.productVariant.list({
        id: variantIds,
        fields: "*inventory.location_levels"
      })).variants;
      variants.forEach((variant) => {
        ret[variant.id] = variant.inventory?.[0]?.location_levels || [];
      });
      return ret;
    };
    getInventoryMap().then((map) => {
      setInventoryMap(map);
    });
  }, [inboundItems]);
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsxs2("div", { className: "mt-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx4(Heading, { level: "h2", children: t("orders.returns.inbound") }),
      /* @__PURE__ */ jsxs2(StackedFocusModal, { id: "inbound-items", children: [
        /* @__PURE__ */ jsx4(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx4("a", { className: "focus-visible:shadow-borders-focus transition-fg txt-compact-small-plus cursor-pointer text-blue-500 outline-none hover:text-blue-400", children: t("actions.addItems") }) }),
        /* @__PURE__ */ jsxs2(StackedFocusModal.Content, { children: [
          /* @__PURE__ */ jsx4(StackedFocusModal.Header, {}),
          /* @__PURE__ */ jsx4(
            AddExchangeInboundItemsTable,
            {
              items: order.items,
              selectedItems: inboundItems.map((i) => i.item_id),
              currencyCode: order.currency_code,
              onSelectionChange: (finalSelection) => {
                const alreadySelected = inboundItems.map((i) => i.item_id);
                itemsToAdd = finalSelection.filter(
                  (selection) => !alreadySelected.includes(selection)
                );
                itemsToRemove = alreadySelected.filter(
                  (selection) => !finalSelection.includes(selection)
                );
              }
            }
          ),
          /* @__PURE__ */ jsx4(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsx4("div", { className: "flex w-full items-center justify-end gap-x-4", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
            /* @__PURE__ */ jsx4(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx4(Button, { type: "button", variant: "secondary", size: "small", children: t("actions.cancel") }) }),
            /* @__PURE__ */ jsx4(
              Button,
              {
                type: "submit",
                variant: "primary",
                size: "small",
                role: "button",
                onClick: async () => await onItemsSelected(),
                children: t("actions.save")
              },
              "submit-button"
            )
          ] }) }) })
        ] })
      ] })
    ] }),
    showInboundItemsPlaceholder && /* @__PURE__ */ jsx4(ItemPlaceholder, {}),
    inboundItems.map(
      (item, index) => inboundItemsMap.get(item.item_id) && itemsMap.get(item.item_id) && /* @__PURE__ */ jsx4(
        ExchangeInboundItem,
        {
          item: itemsMap.get(item.item_id),
          previewItem: inboundItemsMap.get(item.item_id),
          currencyCode: order.currency_code,
          form,
          onRemove: () => {
            const actionId = previewInboundItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "RETURN_ITEM")?.id;
            if (actionId) {
              removeInboundItem(actionId, {
                onError: (error) => {
                  toast.error(error.message);
                }
              });
            }
          },
          onUpdate: (payload) => {
            const action = previewInboundItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "RETURN_ITEM");
            if (action) {
              updateInboundItem(
                { ...payload, actionId: action.id },
                {
                  onError: (error) => {
                    if (action.details?.quantity && payload.quantity) {
                      form.setValue(
                        `inbound_items.${index}.quantity`,
                        action.details?.quantity
                      );
                    }
                    toast.error(error.message);
                  }
                }
              );
            }
          },
          index
        },
        item.id
      )
    ),
    !showInboundItemsPlaceholder && /* @__PURE__ */ jsxs2("div", { className: "mt-8 flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-1 gap-2 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx4(Form.Label, { children: t("orders.returns.location") }),
          /* @__PURE__ */ jsx4(Form.Hint, { className: "!mt-1", children: t("orders.returns.locationHint") })
        ] }),
        /* @__PURE__ */ jsx4(
          Form.Field,
          {
            control: form.control,
            name: "location_id",
            render: ({ field: { value, onChange, ...field } }) => {
              return /* @__PURE__ */ jsx4(Form.Item, { children: /* @__PURE__ */ jsx4(Form.Control, { children: /* @__PURE__ */ jsx4(
                Combobox,
                {
                  ...field,
                  value: value ?? void 0,
                  onChange: (v) => {
                    onChange(v);
                    onLocationChange(v);
                  },
                  options: (stock_locations ?? []).map(
                    (stockLocation) => ({
                      label: stockLocation.name,
                      value: stockLocation.id
                    })
                  )
                }
              ) }) });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-1 gap-2 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsxs2(Form.Label, { children: [
            t("orders.returns.inboundShipping"),
            /* @__PURE__ */ jsxs2(
              Text2,
              {
                size: "small",
                leading: "compact",
                className: "text-ui-fg-muted ml-1 inline",
                children: [
                  "(",
                  t("fields.optional"),
                  ")"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx4(Form.Hint, { className: "!mt-1", children: t("orders.returns.inboundShippingHint") })
        ] }),
        /* @__PURE__ */ jsx4(
          Form.Field,
          {
            control: form.control,
            name: "inbound_option_id",
            render: ({ field: { value, onChange, ...field } }) => {
              return /* @__PURE__ */ jsx4(Form.Item, { children: /* @__PURE__ */ jsx4(Form.Control, { children: /* @__PURE__ */ jsx4(
                Combobox,
                {
                  allowClear: true,
                  value: value ?? void 0,
                  onChange: (val) => {
                    onChange(val);
                    onShippingOptionChange(val);
                  },
                  ...field,
                  options: inboundShippingOptions.map((so) => ({
                    label: so.name,
                    value: so.id
                  })),
                  disabled: !locationId,
                  noResultsPlaceholder: /* @__PURE__ */ jsx4(ReturnShippingPlaceholder, {})
                }
              ) }) });
            }
          }
        )
      ] })
    ] }),
    showLevelsWarning && /* @__PURE__ */ jsxs2(Alert, { variant: "warning", dismissible: true, className: "mt-4 p-5", children: [
      /* @__PURE__ */ jsx4("div", { className: "text-ui-fg-subtle txt-small pb-2 font-medium leading-[20px]", children: t("orders.returns.noInventoryLevel") }),
      /* @__PURE__ */ jsx4(Text2, { className: "text-ui-fg-subtle txt-small leading-normal", children: t("orders.returns.noInventoryLevelDesc") })
    ] })
  ] });
};

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-outbound-section.tsx
import { Alert as Alert2, Button as Button2, Heading as Heading2, Text as Text4, toast as toast2 } from "@medusajs/ui";
import { useEffect as useEffect2, useMemo as useMemo5, useState as useState4 } from "react";
import { useFieldArray as useFieldArray2 } from "react-hook-form";
import { useTranslation as useTranslation10 } from "react-i18next";

// src/routes/orders/order-create-exchange/components/add-exchange-outbound-items-table/add-exchange-outbound-items-table.tsx
import { useState as useState3 } from "react";
import { useTranslation as useTranslation8 } from "react-i18next";

// src/routes/orders/order-create-exchange/components/add-exchange-outbound-items-table/use-exchange-outbound-item-table-columns.tsx
import { Checkbox as Checkbox2 } from "@medusajs/ui";
import { createColumnHelper as createColumnHelper2 } from "@tanstack/react-table";
import { useMemo as useMemo4 } from "react";
import { useTranslation as useTranslation6 } from "react-i18next";
import { jsx as jsx5 } from "react/jsx-runtime";
var columnHelper2 = createColumnHelper2();
var useExchangeOutboundItemTableColumns = (currencyCode) => {
  const { t } = useTranslation6();
  return useMemo4(
    () => [
      columnHelper2.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx5(
            Checkbox2,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          const isSelectable = row.getCanSelect();
          return /* @__PURE__ */ jsx5(
            Checkbox2,
            {
              disabled: !isSelectable,
              checked: row.getIsSelected(),
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
        }
      }),
      columnHelper2.display({
        id: "product",
        header: () => /* @__PURE__ */ jsx5(ProductHeader, {}),
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx5(ProductCell, { product: row.original.product });
        }
      }),
      columnHelper2.accessor("sku", {
        header: t("fields.sku"),
        cell: ({ getValue }) => {
          return getValue() || "-";
        }
      }),
      columnHelper2.accessor("title", {
        header: t("fields.title")
      })
    ],
    [t, currencyCode]
  );
};

// src/routes/orders/order-create-exchange/components/add-exchange-outbound-items-table/use-exchange-outbound-item-table-filters.tsx
import { useTranslation as useTranslation7 } from "react-i18next";
var useExchangeOutboundItemTableFilters = () => {
  const { t } = useTranslation7();
  const filters = [
    {
      key: "created_at",
      label: t("fields.createdAt"),
      type: "date"
    },
    {
      key: "updated_at",
      label: t("fields.updatedAt"),
      type: "date"
    }
  ];
  return filters;
};

// src/routes/orders/order-create-exchange/components/add-exchange-outbound-items-table/use-exchange-outbound-item-table-query.tsx
var useExchangeOutboundItemTableQuery = ({
  pageSize = 50,
  prefix
}) => {
  const raw = useQueryParams(
    ["q", "offset", "order", "created_at", "updated_at"],
    prefix
  );
  const { offset, created_at, updated_at, ...rest } = raw;
  const searchParams = {
    ...rest,
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0
  };
  return { searchParams, raw };
};

// src/routes/orders/order-create-exchange/components/add-exchange-outbound-items-table/add-exchange-outbound-items-table.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var PAGE_SIZE2 = 50;
var PREFIX2 = "rit";
var AddExchangeOutboundItemsTable = ({
  onSelectionChange,
  selectedItems,
  currencyCode
}) => {
  const { t } = useTranslation8();
  const [rowSelection, setRowSelection] = useState3(
    selectedItems.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {})
  );
  const updater = (fn) => {
    const newState = typeof fn === "function" ? fn(rowSelection) : fn;
    setRowSelection(newState);
    onSelectionChange(Object.keys(newState));
  };
  const { searchParams, raw } = useExchangeOutboundItemTableQuery({
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  const { variants = [], count } = useVariants({
    ...searchParams,
    fields: "*inventory_items.inventory.location_levels,+inventory_quantity"
  });
  const columns = useExchangeOutboundItemTableColumns(currencyCode);
  const filters = useExchangeOutboundItemTableFilters();
  const { table } = useDataTable({
    data: variants,
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE2,
    enableRowSelection: (_row) => {
      return true;
    },
    rowSelection: {
      state: rowSelection,
      updater
    }
  });
  return /* @__PURE__ */ jsx6("div", { className: "flex size-full flex-col overflow-hidden", children: /* @__PURE__ */ jsx6(
    _DataTable,
    {
      table,
      columns,
      pageSize: PAGE_SIZE2,
      count,
      filters,
      pagination: true,
      layout: "fill",
      search: true,
      orderBy: [
        { key: "product_id", label: t("fields.product") },
        { key: "title", label: t("fields.title") },
        { key: "sku", label: t("fields.sku") }
      ],
      prefix: PREFIX2,
      queryObject: raw
    }
  ) });
};

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-outbound-item.tsx
import { XCircle as XCircle2 } from "@medusajs/icons";
import { Input as Input2, Text as Text3 } from "@medusajs/ui";
import { useTranslation as useTranslation9 } from "react-i18next";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function ExchangeOutboundItem({
  previewItem,
  currencyCode,
  form,
  onRemove,
  onUpdate,
  index
}) {
  const { t } = useTranslation9();
  return /* @__PURE__ */ jsx7("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 rounded-xl ", children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-x-2 gap-y-2 p-3 text-sm md:flex-row", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex flex-1 items-center gap-x-3", children: [
      /* @__PURE__ */ jsx7(Thumbnail, { src: previewItem.thumbnail }),
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsxs3(Text3, { className: "txt-small", as: "span", weight: "plus", children: [
            previewItem.title,
            " "
          ] }),
          previewItem.variant_sku && /* @__PURE__ */ jsxs3("span", { children: [
            "(",
            previewItem.variant_sku,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsx7(Text3, { as: "div", className: "text-ui-fg-subtle txt-small", children: previewItem.subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "flex flex-1 justify-between", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-grow items-center gap-2", children: [
        /* @__PURE__ */ jsx7(
          Form.Field,
          {
            control: form.control,
            name: `outbound_items.${index}.quantity`,
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs3(Form.Item, { children: [
                /* @__PURE__ */ jsx7(Form.Control, { children: /* @__PURE__ */ jsx7(
                  Input2,
                  {
                    ...field,
                    className: "bg-ui-bg-base txt-small w-[67px] rounded-lg",
                    min: 1,
                    type: "number",
                    onBlur: (e) => {
                      const val = e.target.value;
                      const payload = val === "" ? null : Number(val);
                      field.onChange(payload);
                      if (payload) {
                        onUpdate({ quantity: payload });
                      }
                    }
                  }
                ) }),
                /* @__PURE__ */ jsx7(Form.ErrorMessage, {})
              ] });
            }
          }
        ),
        /* @__PURE__ */ jsx7(Text3, { className: "txt-small text-ui-fg-subtle", children: t("fields.qty") })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "text-ui-fg-subtle txt-small mr-2 flex flex-shrink-0", children: /* @__PURE__ */ jsx7(
        MoneyAmountCell,
        {
          currencyCode,
          amount: previewItem.total
        }
      ) }),
      /* @__PURE__ */ jsx7(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.remove"),
                  onClick: onRemove,
                  icon: /* @__PURE__ */ jsx7(XCircle2, {})
                }
              ].filter(Boolean)
            }
          ]
        }
      )
    ] })
  ] }) });
}

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-outbound-section.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var itemsToAdd2 = [];
var itemsToRemove2 = [];
var ExchangeOutboundSection = ({
  order,
  preview,
  exchange,
  form
}) => {
  const { t } = useTranslation10();
  const { setIsOpen } = useStackedModal();
  const [inventoryMap, setInventoryMap] = useState4({});
  const { shipping_options = [] } = useShippingOptions({
    limit: 999,
    fields: "*prices,+service_zone.fulfillment_set.location.id"
  });
  const outboundShippingOptions = shipping_options.filter(
    (shippingOption) => !!shippingOption.rules.find(
      (r) => r.attribute === "is_return" && r.value === "false"
    )
  );
  const { mutateAsync: addOutboundShipping } = useAddExchangeOutboundShipping(
    exchange.id,
    order.id
  );
  const { mutateAsync: deleteOutboundShipping } = useDeleteExchangeOutboundShipping(exchange.id, order.id);
  const { mutateAsync: addOutboundItem } = useAddExchangeOutboundItems(
    exchange.id,
    order.id
  );
  const { mutateAsync: updateOutboundItem } = useUpdateExchangeOutboundItems(
    exchange.id,
    order.id
  );
  const { mutateAsync: removeOutboundItem } = useRemoveExchangeOutboundItem(
    exchange.id,
    order.id
  );
  const previewOutboundItems = useMemo5(
    () => preview?.items?.filter(
      (i) => !!i.actions?.find(
        (a) => a.exchange_id === exchange.id && a.action === "ITEM_ADD"
      )
    ),
    [preview.items]
  );
  const variantItemMap = useMemo5(
    () => new Map(order?.items?.map((i) => [i.variant_id, i])),
    [order.items]
  );
  const {
    fields: outboundItems,
    append,
    remove,
    update
  } = useFieldArray2({
    name: "outbound_items",
    control: form.control
  });
  const variantOutboundMap = useMemo5(
    () => new Map(previewOutboundItems.map((i) => [i.variant_id, i])),
    [previewOutboundItems, outboundItems]
  );
  useEffect2(() => {
    const existingItemsMap = {};
    previewOutboundItems.forEach((i) => {
      const ind = outboundItems.findIndex((field) => field.item_id === i.id);
      existingItemsMap[i.id] = true;
      if (ind > -1) {
        if (outboundItems[ind].quantity !== i.detail.quantity) {
          update(ind, {
            ...outboundItems[ind],
            quantity: i.detail.quantity
          });
        }
      } else {
        append(
          {
            item_id: i.id,
            quantity: i.detail.quantity,
            variant_id: i.variant_id
          },
          { shouldFocus: false }
        );
      }
    });
    outboundItems.forEach((i, ind) => {
      if (!(i.item_id in existingItemsMap)) {
        remove(ind);
      }
    });
  }, [previewOutboundItems]);
  const locationId = form.watch("location_id");
  const showOutboundItemsPlaceholder = !outboundItems.length;
  const onItemsSelected = async () => {
    itemsToAdd2.length && await addOutboundItem(
      {
        items: itemsToAdd2.map((variantId) => ({
          variant_id: variantId,
          quantity: 1
        }))
      },
      {
        onError: (error) => {
          toast2.error(error.message);
        }
      }
    );
    for (const itemToRemove of itemsToRemove2) {
      const action = previewOutboundItems.find((i) => i.variant_id === itemToRemove)?.actions?.find((a) => a.action === "ITEM_ADD");
      if (action?.id) {
        await removeOutboundItem(action?.id, {
          onError: (error) => {
            toast2.error(error.message);
          }
        });
      }
    }
    setIsOpen("outbound-items", false);
  };
  useEffect2(() => {
    const outboundShipping = preview.shipping_methods.find(
      (s) => !!s.actions?.find((a) => a.action === "SHIPPING_ADD" && !a.return_id)
    );
    if (outboundShipping) {
      form.setValue("outbound_option_id", outboundShipping.shipping_option_id);
    } else {
      form.setValue("outbound_option_id", "");
    }
  }, [preview.shipping_methods]);
  const onShippingOptionChange = async (selectedOptionId) => {
    const outboundShippingMethods = preview.shipping_methods.filter(
      (s) => !!s.actions?.find((a) => a.action === "SHIPPING_ADD" && !a.return_id)
    );
    const promises = outboundShippingMethods.filter(Boolean).map((outboundShippingMethod) => {
      const action = outboundShippingMethod.actions?.find(
        (a) => a.action === "SHIPPING_ADD" && !a.return_id
      );
      if (action) {
        return deleteOutboundShipping(action.id);
      }
    });
    await Promise.all(promises);
    if (selectedOptionId) {
      await addOutboundShipping(
        { shipping_option_id: selectedOptionId },
        {
          onError: (error) => {
            toast2.error(error.message);
          }
        }
      );
    }
  };
  const showLevelsWarning = useMemo5(() => {
    if (!locationId) {
      return false;
    }
    const allItemsHaveLocation = outboundItems.map((i) => {
      const item = variantItemMap.get(i.variant_id);
      if (!item?.variant_id || !item?.variant) {
        return true;
      }
      if (!item.variant?.manage_inventory) {
        return true;
      }
      return inventoryMap[item.variant_id]?.find(
        (l) => l.location_id === locationId
      );
    }).every(Boolean);
    return !allItemsHaveLocation;
  }, [outboundItems, inventoryMap, locationId]);
  useEffect2(() => {
    const getInventoryMap = async () => {
      const ret = {};
      if (!outboundItems.length) {
        return ret;
      }
      const variantIds = outboundItems.map((item) => item?.variant_id).filter(Boolean);
      const variants = (await sdk.admin.productVariant.list({
        id: variantIds,
        fields: "*inventory.location_levels"
      })).variants;
      variants.forEach((variant) => {
        ret[variant.id] = variant.inventory?.[0]?.location_levels || [];
      });
      return ret;
    };
    getInventoryMap().then((map) => {
      setInventoryMap(map);
    });
  }, [outboundItems]);
  return /* @__PURE__ */ jsxs4("div", { children: [
    /* @__PURE__ */ jsxs4("div", { className: "mt-8 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx8(Heading2, { level: "h2", children: t("orders.returns.outbound") }),
      /* @__PURE__ */ jsxs4(StackedFocusModal, { id: "outbound-items", children: [
        /* @__PURE__ */ jsx8(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx8("a", { className: "focus-visible:shadow-borders-focus transition-fg txt-compact-small-plus cursor-pointer text-blue-500 outline-none hover:text-blue-400", children: t("actions.addItems") }) }),
        /* @__PURE__ */ jsxs4(StackedFocusModal.Content, { children: [
          /* @__PURE__ */ jsx8(StackedFocusModal.Header, {}),
          /* @__PURE__ */ jsx8(
            AddExchangeOutboundItemsTable,
            {
              selectedItems: outboundItems.map((i) => i.variant_id),
              currencyCode: order.currency_code,
              onSelectionChange: (finalSelection) => {
                const alreadySelected = outboundItems.map((i) => i.variant_id);
                itemsToAdd2 = finalSelection.filter(
                  (selection) => !alreadySelected.includes(selection)
                );
                itemsToRemove2 = alreadySelected.filter(
                  (selection) => !finalSelection.includes(selection)
                );
              }
            }
          ),
          /* @__PURE__ */ jsx8(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsx8("div", { className: "flex w-full items-center justify-end gap-x-4", children: /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-end gap-x-2", children: [
            /* @__PURE__ */ jsx8(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx8(Button2, { type: "button", variant: "secondary", size: "small", children: t("actions.cancel") }) }),
            /* @__PURE__ */ jsx8(
              Button2,
              {
                type: "submit",
                variant: "primary",
                size: "small",
                role: "button",
                onClick: async () => await onItemsSelected(),
                children: t("actions.save")
              },
              "submit-button"
            )
          ] }) }) })
        ] })
      ] })
    ] }),
    showOutboundItemsPlaceholder && /* @__PURE__ */ jsx8(ItemPlaceholder, {}),
    outboundItems.map(
      (item, index) => variantOutboundMap.get(item.variant_id) && /* @__PURE__ */ jsx8(
        ExchangeOutboundItem,
        {
          previewItem: variantOutboundMap.get(item.variant_id),
          currencyCode: order.currency_code,
          form,
          onRemove: () => {
            const actionId = previewOutboundItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "ITEM_ADD")?.id;
            if (actionId) {
              removeOutboundItem(actionId, {
                onError: (error) => {
                  toast2.error(error.message);
                }
              });
            }
          },
          onUpdate: (payload) => {
            const actionId = previewOutboundItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "ITEM_ADD")?.id;
            if (actionId) {
              updateOutboundItem(
                { ...payload, actionId },
                {
                  onError: (error) => {
                    toast2.error(error.message);
                  }
                }
              );
            }
          },
          index
        },
        item.id
      )
    ),
    !showOutboundItemsPlaceholder && /* @__PURE__ */ jsx8("div", { className: "mt-8 flex flex-col gap-y-4", children: /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 gap-2 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx8(Form.Label, { children: t("orders.exchanges.outboundShipping") }),
        /* @__PURE__ */ jsx8(Form.Hint, { className: "!mt-1", children: t("orders.exchanges.outboundShippingHint") })
      ] }),
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "outbound_option_id",
          render: ({ field: { value, onChange, ...field } }) => {
            return /* @__PURE__ */ jsx8(Form.Item, { children: /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(
              Combobox,
              {
                allowClear: true,
                noResultsPlaceholder: /* @__PURE__ */ jsx8(OutboundShippingPlaceholder, {}),
                value: value ?? void 0,
                onChange: (val) => {
                  onChange(val);
                  onShippingOptionChange(val);
                },
                ...field,
                options: outboundShippingOptions.map((so) => ({
                  label: so.name,
                  value: so.id
                })),
                disabled: !outboundShippingOptions.length
              }
            ) }) });
          }
        }
      )
    ] }) }),
    showLevelsWarning && /* @__PURE__ */ jsxs4(Alert2, { variant: "warning", dismissible: true, className: "mt-4 p-5", children: [
      /* @__PURE__ */ jsx8("div", { className: "text-ui-fg-subtle txt-small pb-2 font-medium leading-[20px]", children: t("orders.returns.noInventoryLevel") }),
      /* @__PURE__ */ jsx8(Text4, { className: "text-ui-fg-subtle txt-small leading-normal", children: t("orders.returns.noInventoryLevelDesc") })
    ] })
  ] });
};

// src/routes/orders/order-create-exchange/components/exchange-create-form/exchange-create-form.tsx
import { jsx as jsx9, jsxs as jsxs5 } from "react/jsx-runtime";
var IS_CANCELING = false;
var ExchangeCreateForm = ({
  order,
  preview,
  exchange,
  orderReturn
}) => {
  const { t } = useTranslation11();
  const { handleSuccess } = useRouteModal();
  const [isInboundShippingPriceEdit, setIsInboundShippingPriceEdit] = useState5(false);
  const [isOutboundShippingPriceEdit, setIsOutboundShippingPriceEdit] = useState5(false);
  const [customInboundShippingAmount, setCustomInboundShippingAmount] = useState5(0);
  const [customOutboundShippingAmount, setCustomOutboundShippingAmount] = useState5(0);
  const { mutateAsync: confirmExchangeRequest, isPending: isConfirming } = useExchangeConfirmRequest(exchange.id, order.id);
  const { mutateAsync: cancelExchangeRequest, isPending: isCanceling } = useCancelExchangeRequest(exchange.id, order.id);
  const {
    mutateAsync: updateInboundShipping,
    isPending: isUpdatingOutboundShipping
  } = useUpdateExchangeInboundShipping(exchange.id, order.id);
  const {
    mutateAsync: updateOutboundShipping,
    isPending: isUpdatingInboundShipping
  } = useUpdateExchangeOutboundShipping(exchange.id, order.id);
  const isRequestLoading = isConfirming || isCanceling || isUpdatingInboundShipping || isUpdatingOutboundShipping;
  const previewItems = useMemo6(
    () => preview?.items?.filter(
      (i) => !!i.actions?.find((a) => a.exchange_id === exchange.id)
    ),
    [preview.items]
  );
  const inboundPreviewItems = previewItems.filter(
    (item) => !!item.actions?.find((a) => a.action === "RETURN_ITEM")
  );
  const outboundPreviewItems = previewItems.filter(
    (item) => !!item.actions?.find((a) => a.action === "ITEM_ADD")
  );
  const form = useForm({
    defaultValues: () => {
      const inboundShippingMethod = preview.shipping_methods.find((s) => {
        return !!s.actions?.find(
          (a) => a.action === "SHIPPING_ADD" && !!a.return_id
        );
      });
      const outboundShippingMethod = preview.shipping_methods.find((s) => {
        return !!s.actions?.find(
          (a) => a.action === "SHIPPING_ADD" && !a.return_id
        );
      });
      return Promise.resolve({
        inbound_items: inboundPreviewItems.map((i) => {
          const inboundAction = i.actions?.find(
            (a) => a.action === "RETURN_ITEM"
          );
          return {
            item_id: i.id,
            variant_id: i.variant_id,
            quantity: i.detail.return_requested_quantity,
            note: inboundAction?.internal_note,
            reason_id: inboundAction?.details?.reason_id
          };
        }),
        outbound_items: outboundPreviewItems.map((i) => ({
          item_id: i.id,
          variant_id: i.variant_id,
          quantity: i.detail.quantity
        })),
        inbound_option_id: inboundShippingMethod ? inboundShippingMethod.shipping_option_id : "",
        outbound_option_id: outboundShippingMethod ? outboundShippingMethod.shipping_option_id : "",
        location_id: orderReturn?.location_id,
        send_notification: false
      });
    },
    resolver: zodResolver(ExchangeCreateSchema)
  });
  const inboundShipping = preview.shipping_methods.find((s) => {
    return !!s.actions?.find(
      (a) => a.action === "SHIPPING_ADD" && !!a.return_id
    );
  });
  const outboundShipping = preview.shipping_methods.find((s) => {
    return !!s.actions?.find((a) => a.action === "SHIPPING_ADD" && !a.return_id);
  });
  useEffect3(() => {
    if (inboundShipping) {
      setCustomInboundShippingAmount(inboundShipping.total);
    }
  }, [inboundShipping]);
  useEffect3(() => {
    if (outboundShipping) {
      setCustomOutboundShippingAmount(outboundShipping.total);
    }
  }, [outboundShipping]);
  const inboundShippingOptionId = form.watch("inbound_option_id");
  const outboundShippingOptionId = form.watch("outbound_option_id");
  const prompt = usePrompt();
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("orders.exchanges.confirmText"),
        confirmText: t("actions.continue"),
        cancelText: t("actions.cancel"),
        variant: "confirmation"
      });
      if (!res) {
        return;
      }
      await confirmExchangeRequest({ no_notification: !data.send_notification });
      handleSuccess();
    } catch (e) {
      toast3.error(t("general.error"), {
        description: e.message
      });
    }
  });
  useEffect3(() => {
    if (isInboundShippingPriceEdit) {
      document.getElementById("js-inbound-shipping-input")?.focus();
    }
  }, [isInboundShippingPriceEdit]);
  useEffect3(() => {
    if (isOutboundShippingPriceEdit) {
      document.getElementById("js-outbound-shipping-input")?.focus();
    }
  }, [isOutboundShippingPriceEdit]);
  useEffect3(() => {
    return () => {
      if (IS_CANCELING) {
        cancelExchangeRequest(void 0, {
          onSuccess: () => {
            toast3.success(
              t("orders.exchanges.actions.cancelExchange.successToast")
            );
          },
          onError: (error) => {
            toast3.error(error.message);
          }
        });
        IS_CANCELING = false;
      }
    };
  }, []);
  const inboundShippingTotal = useMemo6(() => {
    const method = preview.shipping_methods.find(
      (sm) => !!sm.actions?.find((a) => a.action === "SHIPPING_ADD" && !!a.return_id)
    );
    return method?.total || 0;
  }, [preview.shipping_methods]);
  return /* @__PURE__ */ jsx9(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs5(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx9(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx9(RouteFocusModal.Body, { className: "flex size-full justify-center overflow-y-auto", children: /* @__PURE__ */ jsxs5("div", { className: "mt-16 w-[720px] max-w-[100%] px-4 md:p-0", children: [
      /* @__PURE__ */ jsx9(Heading3, { level: "h1", children: t("orders.exchanges.create") }),
      /* @__PURE__ */ jsx9(
        ExchangeInboundSection,
        {
          form,
          preview,
          order,
          exchange,
          orderReturn
        }
      ),
      /* @__PURE__ */ jsx9(
        ExchangeOutboundSection,
        {
          form,
          preview,
          order,
          exchange
        }
      ),
      /* @__PURE__ */ jsxs5("div", { className: "mt-8 border-y border-dotted py-4", children: [
        /* @__PURE__ */ jsxs5("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.returns.inboundTotal") }),
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: getStylizedAmount(
            inboundPreviewItems.reduce((acc, item) => {
              const action = item.actions?.find(
                (act) => act.action === "RETURN_ITEM"
              );
              acc = acc + (action?.amount || 0);
              return acc;
            }, 0) * -1,
            order.currency_code
          ) })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.exchanges.outboundTotal") }),
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: getStylizedAmount(
            outboundPreviewItems.reduce((acc, item) => {
              const action = item.actions?.find(
                (act) => act.action === "ITEM_ADD"
              );
              acc = acc + (action?.amount || 0);
              return acc;
            }, 0),
            order.currency_code
          ) })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.returns.inboundShipping") }),
          /* @__PURE__ */ jsxs5("span", { className: "txt-small text-ui-fg-subtle flex items-center", children: [
            !isInboundShippingPriceEdit && /* @__PURE__ */ jsx9(
              IconButton2,
              {
                onClick: () => setIsInboundShippingPriceEdit(true),
                variant: "transparent",
                className: "text-ui-fg-muted",
                disabled: !inboundPreviewItems?.length || !inboundShippingOptionId,
                children: /* @__PURE__ */ jsx9(PencilSquare, {})
              }
            ),
            isInboundShippingPriceEdit ? /* @__PURE__ */ jsx9(
              CurrencyInput,
              {
                id: "js-inbound-shipping-input",
                onBlur: () => {
                  let actionId;
                  preview.shipping_methods.forEach((s) => {
                    if (s.actions) {
                      for (const a of s.actions) {
                        if (a.action === "SHIPPING_ADD" && !!a.return_id) {
                          actionId = a.id;
                        }
                      }
                    }
                  });
                  const customPrice = customInboundShippingAmount === "" ? null : parseFloat(customInboundShippingAmount);
                  if (actionId) {
                    updateInboundShipping(
                      {
                        actionId,
                        custom_amount: customPrice
                      },
                      {
                        onError: (error) => {
                          toast3.error(error.message);
                        }
                      }
                    );
                  }
                  setIsInboundShippingPriceEdit(false);
                },
                symbol: currencies[order.currency_code.toUpperCase()].symbol_native,
                code: order.currency_code,
                onValueChange: setCustomInboundShippingAmount,
                value: customInboundShippingAmount,
                disabled: !inboundPreviewItems?.length
              }
            ) : getStylizedAmount(inboundShippingTotal, order.currency_code)
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx9("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.exchanges.outboundShipping") }),
          /* @__PURE__ */ jsxs5("span", { className: "txt-small text-ui-fg-subtle flex items-center", children: [
            !isOutboundShippingPriceEdit && /* @__PURE__ */ jsx9(
              IconButton2,
              {
                onClick: () => setIsOutboundShippingPriceEdit(true),
                variant: "transparent",
                className: "text-ui-fg-muted",
                disabled: !outboundPreviewItems?.length || !outboundShippingOptionId,
                children: /* @__PURE__ */ jsx9(PencilSquare, {})
              }
            ),
            isOutboundShippingPriceEdit ? /* @__PURE__ */ jsx9(
              CurrencyInput,
              {
                id: "js-outbound-shipping-input",
                onBlur: () => {
                  let actionId;
                  preview.shipping_methods.forEach((s) => {
                    if (s.actions) {
                      for (const a of s.actions) {
                        if (a.action === "SHIPPING_ADD" && !a.return_id) {
                          actionId = a.id;
                        }
                      }
                    }
                  });
                  const customPrice = customOutboundShippingAmount === "" ? null : parseFloat(customOutboundShippingAmount);
                  if (actionId) {
                    updateOutboundShipping(
                      {
                        actionId,
                        custom_amount: customPrice
                      },
                      {
                        onError: (error) => {
                          toast3.error(error.message);
                        }
                      }
                    );
                  }
                  setIsOutboundShippingPriceEdit(false);
                },
                symbol: currencies[order.currency_code.toUpperCase()].symbol_native,
                code: order.currency_code,
                onValueChange: setCustomOutboundShippingAmount,
                value: customOutboundShippingAmount,
                disabled: !outboundPreviewItems?.length
              }
            ) : getStylizedAmount(
              outboundShipping?.amount ?? 0,
              order.currency_code
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "mt-4 flex items-center justify-between border-t border-dotted pt-4", children: [
          /* @__PURE__ */ jsx9("span", { className: "txt-small font-medium", children: t("orders.exchanges.refundAmount") }),
          /* @__PURE__ */ jsx9("span", { className: "txt-small font-medium", children: getStylizedAmount(
            preview.summary.pending_difference,
            order.currency_code
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx9("div", { className: "bg-ui-bg-field mt-8 rounded-lg border py-2 pl-2 pr-4", children: /* @__PURE__ */ jsx9(
        Form.Field,
        {
          control: form.control,
          name: "send_notification",
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsxs5(Form.Item, { children: [
              /* @__PURE__ */ jsxs5("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx9(Form.Control, { className: "mr-4 self-start", children: /* @__PURE__ */ jsx9(
                  Switch,
                  {
                    className: "mt-[2px]",
                    checked: !!value,
                    onCheckedChange: onChange,
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsxs5("div", { className: "block", children: [
                  /* @__PURE__ */ jsx9(Form.Label, { children: t("orders.returns.sendNotification") }),
                  /* @__PURE__ */ jsx9(Form.Hint, { className: "!mt-1", children: t("orders.returns.sendNotificationHint") })
                ] })
              ] }),
              /* @__PURE__ */ jsx9(Form.ErrorMessage, {})
            ] });
          }
        }
      ) }),
      /* @__PURE__ */ jsx9("div", { className: "p-8" })
    ] }) }),
    /* @__PURE__ */ jsx9(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsx9("div", { className: "flex w-full items-center justify-end gap-x-4", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx9(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx9(
        Button3,
        {
          type: "button",
          onClick: () => IS_CANCELING = true,
          variant: "secondary",
          size: "small",
          children: t("orders.exchanges.cancel.title")
        }
      ) }),
      /* @__PURE__ */ jsx9(
        Button3,
        {
          type: "submit",
          variant: "primary",
          size: "small",
          isLoading: isRequestLoading,
          children: t("orders.exchanges.confirm")
        },
        "submit-button"
      )
    ] }) }) })
  ] }) });
};

// src/routes/orders/order-create-exchange/exchange-create.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var IS_REQUEST_RUNNING = false;
var ExchangeCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation12();
  const { order } = useOrder(id, {
    fields: DEFAULT_FIELDS
  });
  const { order: preview } = useOrderPreview(id);
  const [activeExchangeId, setActiveExchangeId] = useState6();
  const { mutateAsync: createExchange } = useCreateExchange(order.id);
  const { exchange } = useExchange(activeExchangeId, void 0, {
    enabled: !!activeExchangeId
  });
  const { return: orderReturn } = useReturn(exchange?.return_id, void 0, {
    enabled: !!exchange?.return_id
  });
  useEffect4(() => {
    async function run() {
      if (IS_REQUEST_RUNNING || !preview) {
        return;
      }
      if (preview.order_change) {
        if (preview.order_change.change_type === "exchange") {
          setActiveExchangeId(preview.order_change.exchange_id);
        } else {
          navigate(`/orders/${preview.id}`, { replace: true });
          toast4.error(t("orders.exchanges.activeChangeError"));
        }
        return;
      }
      IS_REQUEST_RUNNING = true;
      try {
        const { exchange: createdExchange } = await createExchange({
          order_id: preview.id
        });
        setActiveExchangeId(createdExchange.id);
      } catch (e) {
        toast4.error(e.message);
        navigate(`/orders/${preview.id}`, { replace: true });
      } finally {
        IS_REQUEST_RUNNING = false;
      }
    }
    run();
  }, [preview]);
  return /* @__PURE__ */ jsx10(RouteFocusModal, { children: exchange && preview && order && /* @__PURE__ */ jsx10(
    ExchangeCreateForm,
    {
      order,
      exchange,
      preview,
      orderReturn
    }
  ) });
};
export {
  ExchangeCreate as Component
};
