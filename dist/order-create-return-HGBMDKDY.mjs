import {
  ReturnShippingPlaceholder
} from "./chunk-P3DRE4IY.mjs";
import {
  MoneyAmountCell
} from "./chunk-NNBHHXXN.mjs";
import {
  getReturnableQuantity
} from "./chunk-PXZ7QYKX.mjs";
import {
  useAddReturnItem,
  useAddReturnShipping,
  useCancelReturnRequest,
  useConfirmReturnRequest,
  useDeleteReturnShipping,
  useInitiateReturn,
  useRemoveReturnItem,
  useReturn,
  useUpdateReturn,
  useUpdateReturnItem,
  useUpdateReturnShipping
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
import "./chunk-IUCDCPJU.mjs";
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
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-create-return/return-create.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect as useEffect2, useState as useState3 } from "react";
import { useTranslation as useTranslation6 } from "react-i18next";
import { toast as toast2 } from "@medusajs/ui";

// src/routes/orders/order-create-return/components/return-create-form/return-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSquare } from "@medusajs/icons";
import {
  Alert,
  Button,
  CurrencyInput,
  Heading,
  IconButton as IconButton2,
  Switch,
  Text as Text2,
  toast,
  usePrompt
} from "@medusajs/ui";
import { useEffect, useMemo as useMemo3, useState as useState2 } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation as useTranslation5 } from "react-i18next";

// src/routes/orders/order-create-return/components/add-return-items-table/add-return-items-table.tsx
import { useMemo as useMemo2, useState } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/routes/orders/order-create-return/components/add-return-items-table/use-return-item-table-columns.tsx
import { useMemo } from "react";
import { Checkbox } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useReturnItemTableColumns = (currencyCode) => {
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

// src/routes/orders/order-create-return/components/add-return-items-table/use-return-item-table-filters.tsx
import { useTranslation as useTranslation2 } from "react-i18next";
var useReturnItemTableFilters = () => {
  const { t } = useTranslation2();
  const filters = [
    {
      key: "returnable_quantity",
      label: t("orders.returns.returnableQuantityLabel"),
      type: "number"
    },
    {
      key: "refundable_amount",
      label: t("orders.returns.refundableAmountLabel"),
      type: "number"
    },
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

// src/routes/orders/order-create-return/components/add-return-items-table/use-return-item-table-query.tsx
var useReturnItemTableQuery = ({
  pageSize = 50,
  prefix
}) => {
  const raw = useQueryParams(
    [
      "q",
      "offset",
      "order",
      "created_at",
      "updated_at",
      "returnable_quantity",
      "refundable_amount"
    ],
    prefix
  );
  const {
    offset,
    created_at,
    updated_at,
    refundable_amount,
    returnable_quantity,
    ...rest
  } = raw;
  const searchParams = {
    ...rest,
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0,
    refundable_amount: refundable_amount ? JSON.parse(refundable_amount) : void 0,
    returnable_quantity: returnable_quantity ? JSON.parse(returnable_quantity) : void 0
  };
  return { searchParams, raw };
};

// src/routes/orders/order-create-return/components/add-return-items-table/add-return-items-table.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 50;
var PREFIX = "rit";
var AddReturnItemsTable = ({
  onSelectionChange,
  selectedItems: selectedItems2,
  items,
  currencyCode
}) => {
  const { t } = useTranslation3();
  const [rowSelection, setRowSelection] = useState(
    selectedItems2.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {})
  );
  const updater = (fn) => {
    const newState = typeof fn === "function" ? fn(rowSelection) : fn;
    setRowSelection(newState);
    onSelectionChange(Object.keys(newState));
  };
  const { searchParams, raw } = useReturnItemTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const queriedItems = useMemo2(() => {
    const {
      order,
      offset,
      limit,
      q,
      created_at,
      updated_at,
      refundable_amount,
      returnable_quantity
    } = searchParams;
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
    if (returnable_quantity) {
      results = filterByNumber(
        results,
        returnable_quantity,
        "returnable_quantity",
        currencyCode
      );
    }
    if (refundable_amount) {
      results = filterByNumber(
        results,
        refundable_amount,
        "refundable_amount",
        currencyCode
      );
    }
    return results.slice(offset, offset + limit);
  }, [items, currencyCode, searchParams]);
  const columns = useReturnItemTableColumns(currencyCode);
  const filters = useReturnItemTableFilters();
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
        { key: "sku", label: t("fields.sku") },
        {
          key: "returnable_quantity",
          label: t("orders.fields.returnableQuantity")
        },
        {
          key: "refundable_amount",
          label: t("orders.fields.refundableAmount")
        }
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
    } else if (field === "returnable_quantity") {
      aValue = a.quantity - (a.returned_quantity || 0);
      bValue = b.quantity - (b.returned_quantity || 0);
    } else if (field === "refundable_amount") {
      aValue = a.refundable || 0;
      bValue = b.refundable || 0;
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
var defaultOperators = {
  eq: void 0,
  gt: void 0,
  gte: void 0,
  lt: void 0,
  lte: void 0
};
var filterByNumber = (items, value, field, currency_code) => {
  const { eq, gt, lt, gte, lte } = typeof value === "object" ? { ...defaultOperators, ...value } : { ...defaultOperators, eq: value };
  return items.filter((i) => {
    const returnableQuantity = i.quantity - (i.returned_quantity || 0);
    const refundableAmount = getStylizedAmount(i.refundable || 0, currency_code);
    const itemValue = field === "returnable_quantity" ? returnableQuantity : refundableAmount;
    if (eq) {
      return itemValue === eq;
    }
    let isValid = true;
    if (gt) {
      isValid = isValid && itemValue > gt;
    }
    if (gte) {
      isValid = isValid && itemValue >= gte;
    }
    if (lt) {
      isValid = isValid && itemValue < lt;
    }
    if (lte) {
      isValid = isValid && itemValue <= lte;
    }
    return isValid;
  });
};

// src/routes/orders/order-create-return/components/return-create-form/return-item.tsx
import { useTranslation as useTranslation4 } from "react-i18next";
import { IconButton, Input, Text } from "@medusajs/ui";
import { ChatBubble, DocumentText, XCircle, XMark } from "@medusajs/icons";
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
function ReturnItem({
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
  const formItem = form.watch(`items.${index}`);
  const showReturnReason = typeof formItem.reason_id === "string";
  const showNote = typeof formItem.note === "string";
  return /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 rounded-xl ", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-x-2 gap-y-2 border-b p-3 text-sm md:flex-row", children: [
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
              name: `items.${index}.quantity`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
                    Input,
                    {
                      className: "bg-ui-bg-base txt-small w-[67px] rounded-lg",
                      min: 1,
                      max: item.quantity,
                      type: "number",
                      ...field,
                      onChange: (e) => {
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
                    onClick: () => form.setValue(`items.${index}.reason_id`, ""),
                    icon: /* @__PURE__ */ jsx3(ChatBubble, {})
                  },
                  !showNote && {
                    label: t("actions.addNote"),
                    onClick: () => form.setValue(`items.${index}.note`, ""),
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
              name: `items.${index}.reason_id`,
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
                onUpdate({ reason_id: null });
                form.setValue(`items.${index}.reason_id`, null);
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
              name: `items.${index}.note`,
              render: ({ field: { ref, onChange, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx3(Form.Control, { children: /* @__PURE__ */ jsx3(
                    Input,
                    {
                      onChange,
                      ...field,
                      onBlur: () => onUpdate({ internal_note: field.value }),
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
                form.setValue(`items.${index}.note`, {
                  shouldDirty: true,
                  shouldTouch: true
                });
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

// src/routes/orders/order-create-return/components/return-create-form/schema.ts
import { z } from "zod";
var ReturnCreateSchema = z.object({
  items: z.array(
    z.object({
      item_id: z.string(),
      quantity: z.number(),
      reason_id: z.string().optional().nullable(),
      note: z.string().optional().nullable()
    })
  ),
  location_id: z.string().optional(),
  option_id: z.string(),
  send_notification: z.boolean().optional(),
  // TODO: implement this
  receive_now: z.boolean().optional()
});

// src/routes/orders/order-create-return/components/return-create-form/return-create-form.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var selectedItems = [];
var ReturnCreateForm = ({
  order,
  preview,
  activeReturn
}) => {
  const { t } = useTranslation5();
  const { handleSuccess } = useRouteModal();
  const itemsMap = useMemo3(
    () => new Map((order.items || []).map((i) => [i.id, i])),
    [order.items]
  );
  const previewItems = useMemo3(
    () => preview.items.filter(
      (i) => !!i.actions?.find((a) => a.return_id === activeReturn.id)
    ),
    [preview.items]
  );
  const previewItemsMap = useMemo3(
    () => new Map(previewItems.map((i) => [i.id, i])),
    [previewItems]
  );
  const { setIsOpen } = useStackedModal();
  const [isShippingPriceEdit, setIsShippingPriceEdit] = useState2(false);
  const [customShippingAmount, setCustomShippingAmount] = useState2(0);
  const [inventoryMap, setInventoryMap] = useState2({});
  const { stock_locations = [] } = useStockLocations({ limit: 999 });
  const { shipping_options = [] } = useShippingOptions({
    limit: 999,
    fields: "*prices,+service_zone.fulfillment_set.location.id"
    /**
     * TODO: this should accept filter for location_id
     */
  });
  const { mutateAsync: confirmReturnRequest, isPending: isConfirming } = useConfirmReturnRequest(activeReturn.id, order.id);
  const { mutateAsync: cancelReturnRequest, isPending: isCanceling } = useCancelReturnRequest(activeReturn.id, order.id);
  const { mutateAsync: updateReturnRequest, isPending: isUpdating } = useUpdateReturn(activeReturn.id, order.id);
  const { mutateAsync: addReturnShipping, isPending: isAddingReturnShipping } = useAddReturnShipping(activeReturn.id, order.id);
  const {
    mutateAsync: updateReturnShipping,
    isPending: isUpdatingReturnShipping
  } = useUpdateReturnShipping(activeReturn.id, order.id);
  const {
    mutateAsync: deleteReturnShipping,
    isPending: isDeletingReturnShipping
  } = useDeleteReturnShipping(activeReturn.id, order.id);
  const { mutateAsync: addReturnItem, isPending: isAddingReturnItem } = useAddReturnItem(activeReturn.id, order.id);
  const { mutateAsync: removeReturnItem, isPending: isRemovingReturnItem } = useRemoveReturnItem(activeReturn.id, order.id);
  const { mutateAsync: updateReturnItem, isPending: isUpdatingReturnItem } = useUpdateReturnItem(activeReturn.id, order.id);
  const isRequestLoading = isConfirming || isCanceling || isAddingReturnShipping || isUpdatingReturnShipping || isDeletingReturnShipping || isAddingReturnItem || isRemovingReturnItem || isUpdatingReturnItem || isUpdating;
  const form = useForm({
    /**
     * TODO: reason selection once Return reason settings are added
     */
    defaultValues: () => {
      const method = preview.shipping_methods.find(
        (s) => !!s.actions?.find((a) => a.action === "SHIPPING_ADD")
      );
      return Promise.resolve({
        items: previewItems.map((i) => ({
          item_id: i.id,
          quantity: i.detail.return_requested_quantity,
          note: i.actions?.find((a) => a.action === "RETURN_ITEM")?.internal_note,
          reason_id: i.actions?.find((a) => a.action === "RETURN_ITEM")?.details?.reason_id
        })),
        option_id: method ? method.shipping_option_id : "",
        location_id: activeReturn?.location_id,
        send_notification: false
      });
    },
    resolver: zodResolver(ReturnCreateSchema)
  });
  const {
    fields: items,
    append,
    remove,
    update
  } = useFieldArray({
    name: "items",
    control: form.control
  });
  useEffect(() => {
    const existingItemsMap = {};
    previewItems.forEach((i) => {
      const ind = items.findIndex((field) => field.item_id === i.id);
      if (!i.detail.return_requested_quantity) {
        return;
      }
      existingItemsMap[i.id] = true;
      if (ind > -1) {
        if (items[ind].quantity !== i.detail.return_requested_quantity) {
          const returnItemAction = i.actions?.find(
            (a) => a.action === "RETURN_ITEM"
          );
          update(ind, {
            ...items[ind],
            quantity: i.detail.return_requested_quantity,
            note: returnItemAction?.internal_note,
            reason_id: returnItemAction?.details?.reason_id
          });
        }
      } else {
        append({ item_id: i.id, quantity: i.detail.return_requested_quantity });
      }
    });
    items.forEach((i, ind) => {
      if (!(i.item_id in existingItemsMap)) {
        remove(ind);
      }
    });
  }, [previewItems]);
  useEffect(() => {
    const method = preview.shipping_methods?.find(
      (s) => !!s.actions?.find((a) => a.action === "SHIPPING_ADD")
    );
    if (method) {
      form.setValue("option_id", method.shipping_option_id);
    } else {
      form.setValue("option_id", "");
    }
  }, [preview.shipping_methods]);
  const showPlaceholder = !items.length;
  const locationId = form.watch("location_id");
  const shippingOptionId = form.watch("option_id");
  const prompt = usePrompt();
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("orders.returns.confirmText"),
        confirmText: t("actions.continue"),
        cancelText: t("actions.cancel"),
        variant: "confirmation"
      });
      if (!res) {
        return;
      }
      await confirmReturnRequest({ no_notification: !data.send_notification });
      handleSuccess();
    } catch (e) {
      toast.error(t("general.error"), {
        description: e.message,
        dismissLabel: t("actions.close")
      });
    }
  });
  const onItemsSelected = () => {
    addReturnItem({
      items: selectedItems.map((id) => ({
        id,
        quantity: 1
      }))
    });
    setIsOpen("items", false);
  };
  const onLocationChange = async (selectedLocationId) => {
    await updateReturnRequest({ location_id: selectedLocationId });
  };
  const onShippingOptionChange = async (selectedOptionId) => {
    const promises = preview.shipping_methods.map((s) => s.actions?.find((a) => a.action === "SHIPPING_ADD")?.id).filter(Boolean).map(deleteReturnShipping);
    await Promise.all(promises);
    if (selectedOptionId) {
      await addReturnShipping({ shipping_option_id: selectedOptionId });
    }
  };
  useEffect(() => {
    if (isShippingPriceEdit) {
      document.getElementById("js-shipping-input").focus();
    }
  }, [isShippingPriceEdit]);
  useEffect(() => {
    form.setValue("location_id", activeReturn?.location_id || "");
  }, [activeReturn]);
  const showLevelsWarning = useMemo3(() => {
    if (!locationId) {
      return false;
    }
    const allItemsHaveLocation = items.map((_i) => {
      const item = itemsMap.get(_i.item_id);
      if (!item?.variant_id) {
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
  }, [items, inventoryMap, locationId]);
  useEffect(() => {
    const getInventoryMap = async () => {
      const ret = {};
      if (!items.length) {
        return ret;
      }
      ;
      (await Promise.all(
        items.map(async (_i) => {
          const item = itemsMap.get(_i.item_id);
          if (!item.variant_id) {
            return void 0;
          }
          return await sdk.admin.product.retrieveVariant(
            item.product_id,
            item.variant_id,
            { fields: "*inventory,*inventory.location_levels" }
          );
        })
      )).filter((it) => it?.variant).forEach((item) => {
        const { variant } = item;
        const levels = variant.inventory[0]?.location_levels;
        if (!levels) {
          return;
        }
        ret[variant.id] = levels;
      });
      return ret;
    };
    getInventoryMap().then((map) => {
      setInventoryMap(map);
    });
  }, [items]);
  const returnTotal = preview.return_requested_total;
  const shippingTotal = useMemo3(() => {
    const method = preview.shipping_methods.find(
      (sm) => !!sm.actions?.find((a) => a.action === "SHIPPING_ADD")
    );
    return method?.total || 0;
  }, [preview.shipping_methods]);
  return /* @__PURE__ */ jsx4(
    RouteFocusModal.Form,
    {
      form,
      onClose: (isSubmitSuccessful) => {
        if (!isSubmitSuccessful) {
          cancelReturnRequest();
        }
      },
      children: /* @__PURE__ */ jsxs2(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
        /* @__PURE__ */ jsx4(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx4(RouteFocusModal.Body, { className: "flex size-full justify-center overflow-y-auto", children: /* @__PURE__ */ jsxs2("div", { className: "mt-16 w-[720px] max-w-[100%] px-4 md:p-0", children: [
          /* @__PURE__ */ jsx4(Heading, { level: "h1", children: t("orders.returns.create") }),
          /* @__PURE__ */ jsxs2("div", { className: "mt-8 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx4(Heading, { level: "h2", children: t("orders.returns.inbound") }),
            /* @__PURE__ */ jsxs2(StackedFocusModal, { id: "items", children: [
              /* @__PURE__ */ jsx4(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx4("a", { className: "focus-visible:shadow-borders-focus transition-fg txt-compact-small-plus cursor-pointer text-blue-500 outline-none hover:text-blue-400", children: t("actions.addItems") }) }),
              /* @__PURE__ */ jsxs2(StackedFocusModal.Content, { children: [
                /* @__PURE__ */ jsx4(StackedFocusModal.Header, {}),
                /* @__PURE__ */ jsx4(
                  AddReturnItemsTable,
                  {
                    items: order.items,
                    selectedItems: items.map((i) => i.item_id),
                    currencyCode: order.currency_code,
                    onSelectionChange: (s) => selectedItems = s
                  }
                ),
                /* @__PURE__ */ jsx4(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsx4("div", { className: "flex w-full items-center justify-end gap-x-4", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
                  /* @__PURE__ */ jsx4(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx4(
                    Button,
                    {
                      type: "button",
                      variant: "secondary",
                      size: "small",
                      children: t("actions.cancel")
                    }
                  ) }),
                  /* @__PURE__ */ jsx4(
                    Button,
                    {
                      type: "submit",
                      variant: "primary",
                      size: "small",
                      role: "button",
                      onClick: () => onItemsSelected(),
                      children: t("actions.save")
                    },
                    "submit-button"
                  )
                ] }) }) })
              ] })
            ] })
          ] }),
          showPlaceholder && /* @__PURE__ */ jsx4(
            "div",
            {
              style: {
                background: "repeating-linear-gradient(-45deg, rgb(212, 212, 216, 0.15), rgb(212, 212, 216,.15) 10px, transparent 10px, transparent 20px)"
              },
              className: "bg-ui-bg-field mt-4 block h-[56px] w-full rounded-lg border border-dashed"
            }
          ),
          items.filter((item) => !!previewItemsMap.get(item.item_id)).map((item, index) => /* @__PURE__ */ jsx4(
            ReturnItem,
            {
              item: itemsMap.get(item.item_id),
              previewItem: previewItemsMap.get(item.item_id),
              currencyCode: order.currency_code,
              form,
              onRemove: () => {
                const actionId = previewItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "RETURN_ITEM")?.id;
                if (actionId) {
                  removeReturnItem(actionId);
                }
              },
              onUpdate: (payload) => {
                const action = previewItems.find((i) => i.id === item.item_id)?.actions?.find((a) => a.action === "RETURN_ITEM");
                if (action) {
                  updateReturnItem(
                    { ...payload, actionId: action.id },
                    {
                      onError: (error) => {
                        if (action.details?.quantity && payload.quantity) {
                          form.setValue(
                            `items.${index}.quantity`,
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
          )),
          !showPlaceholder && /* @__PURE__ */ jsxs2("div", { className: "mt-8 flex flex-col gap-y-4", children: [
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
                        value,
                        onChange: (v) => {
                          onChange(v);
                          onLocationChange(v);
                        },
                        ...field,
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
                  name: "option_id",
                  render: ({ field: { value, onChange, ...field } }) => {
                    return /* @__PURE__ */ jsx4(Form.Item, { children: /* @__PURE__ */ jsx4(Form.Control, { children: /* @__PURE__ */ jsx4(
                      Combobox,
                      {
                        allowClear: true,
                        value,
                        onChange: (v) => {
                          onChange(v);
                          onShippingOptionChange(v);
                        },
                        ...field,
                        options: (shipping_options ?? []).filter(
                          (so) => (locationId ? so.service_zone.fulfillment_set.location.id === locationId : true) && !!so.rules.find(
                            (r) => r.attribute === "is_return" && r.value === "true"
                          )
                        ).map((so) => ({
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
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "mt-8 border-y border-dotted py-4", children: [
            /* @__PURE__ */ jsxs2("div", { className: "mb-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx4("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.returns.returnTotal") }),
              /* @__PURE__ */ jsx4("span", { className: "txt-small text-ui-fg-subtle", children: getStylizedAmount(
                returnTotal ? -1 * returnTotal : returnTotal,
                order.currency_code
              ) })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx4("span", { className: "txt-small text-ui-fg-subtle", children: t("orders.returns.inboundShipping") }),
              /* @__PURE__ */ jsxs2("span", { className: "txt-small text-ui-fg-subtle flex items-center", children: [
                !isShippingPriceEdit && /* @__PURE__ */ jsx4(
                  IconButton2,
                  {
                    onClick: () => setIsShippingPriceEdit(true),
                    variant: "transparent",
                    className: "text-ui-fg-muted",
                    disabled: showPlaceholder || !shippingOptionId,
                    children: /* @__PURE__ */ jsx4(PencilSquare, {})
                  }
                ),
                isShippingPriceEdit ? /* @__PURE__ */ jsx4(
                  CurrencyInput,
                  {
                    id: "js-shipping-input",
                    onBlur: () => {
                      let actionId;
                      preview.shipping_methods.forEach((s) => {
                        if (s.actions) {
                          for (const a of s.actions) {
                            if (a.action === "SHIPPING_ADD") {
                              actionId = a.id;
                            }
                          }
                        }
                      });
                      if (actionId) {
                        updateReturnShipping({
                          actionId,
                          custom_amount: typeof customShippingAmount === "string" ? null : customShippingAmount
                        });
                      }
                      setIsShippingPriceEdit(false);
                    },
                    symbol: currencies[order.currency_code.toUpperCase()].symbol_native,
                    code: order.currency_code,
                    onValueChange: (value) => setCustomShippingAmount(value ? parseFloat(value) : ""),
                    value: customShippingAmount,
                    disabled: showPlaceholder
                  }
                ) : getStylizedAmount(shippingTotal, order.currency_code)
              ] })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "mt-4 flex items-center justify-between border-t border-dotted pt-4", children: [
              /* @__PURE__ */ jsx4("span", { className: "txt-small font-medium", children: t("orders.returns.estDifference") }),
              /* @__PURE__ */ jsx4("span", { className: "txt-small font-medium", children: getStylizedAmount(
                preview.summary.pending_difference,
                order.currency_code
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx4("div", { className: "bg-ui-bg-field mt-8 rounded-lg border py-2 pl-2 pr-4", children: /* @__PURE__ */ jsx4(
            Form.Field,
            {
              control: form.control,
              name: "send_notification",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex items-center", children: [
                    /* @__PURE__ */ jsx4(Form.Control, { className: "mr-4 self-start", children: /* @__PURE__ */ jsx4(
                      Switch,
                      {
                        className: "mt-[2px]",
                        checked: !!value,
                        onCheckedChange: onChange,
                        ...field
                      }
                    ) }),
                    /* @__PURE__ */ jsxs2("div", { className: "block", children: [
                      /* @__PURE__ */ jsx4(Form.Label, { children: t("orders.returns.sendNotification") }),
                      /* @__PURE__ */ jsx4(Form.Hint, { className: "!mt-1", children: t("orders.returns.sendNotificationHint") })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx4(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsx4("div", { className: "p-8" })
        ] }) }),
        /* @__PURE__ */ jsx4(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsx4("div", { className: "flex w-full items-center justify-end gap-x-4", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx4(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx4(Button, { type: "button", variant: "secondary", size: "small", children: t("orders.returns.cancel.title") }) }),
          /* @__PURE__ */ jsx4(
            Button,
            {
              type: "submit",
              variant: "primary",
              size: "small",
              isLoading: isRequestLoading,
              children: t("orders.returns.confirm")
            },
            "submit-button"
          )
        ] }) }) })
      ] })
    }
  );
};

// src/routes/orders/order-create-return/return-create.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var IS_REQUEST_RUNNING = false;
var ReturnCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation6();
  const { order } = useOrder(id, {
    fields: DEFAULT_FIELDS
  });
  const { order: preview } = useOrderPreview(id, void 0, {});
  const [activeReturnId, setActiveReturnId] = useState3();
  const { mutateAsync: initiateReturn } = useInitiateReturn(order.id);
  const { return: activeReturn } = useReturn(activeReturnId, void 0, {
    enabled: !!activeReturnId
  });
  useEffect2(() => {
    async function run() {
      if (IS_REQUEST_RUNNING || !preview) {
        return;
      }
      if (preview.order_change) {
        if (preview.order_change.change_type === "return_request") {
          setActiveReturnId(preview.order_change.return_id);
        } else {
          navigate(`/orders/${order.id}`, { replace: true });
          toast2.error(t("orders.returns.activeChangeError"));
        }
        return;
      }
      IS_REQUEST_RUNNING = true;
      try {
        const orderReturn = await initiateReturn({ order_id: order.id });
        setActiveReturnId(orderReturn.id);
      } catch (e) {
        navigate(`/orders/${order.id}`, { replace: true });
        toast2.error(e.message);
      } finally {
        IS_REQUEST_RUNNING = false;
      }
    }
    run();
  }, [preview]);
  return /* @__PURE__ */ jsx5(RouteFocusModal, { children: activeReturn && preview && order && /* @__PURE__ */ jsx5(
    ReturnCreateForm,
    {
      order,
      activeReturn,
      preview
    }
  ) });
};
export {
  ReturnCreate as Component
};
