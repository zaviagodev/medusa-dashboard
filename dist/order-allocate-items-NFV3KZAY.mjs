import {
  getFulfillableQuantity
} from "./chunk-WKOPGFW5.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Thumbnail
} from "./chunk-MNXC6Q4F.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  ordersQueryKeys,
  useOrder
} from "./chunk-FNYASI54.mjs";
import {
  useCreateReservationItem
} from "./chunk-FVC7M755.mjs";
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-allocate-items/order-allocate-items.tsx
import { useParams } from "react-router-dom";

// src/routes/orders/order-allocate-items/components/order-create-fulfillment-form/order-allocate-items-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo as useMemo2, useState as useState2 } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Alert, Button, Heading, Input as Input2, Select, toast } from "@medusajs/ui";
import { useForm, useWatch as useWatch2 } from "react-hook-form";

// src/routes/orders/order-allocate-items/components/order-create-fulfillment-form/constants.ts
import { z } from "zod";
var AllocateItemsSchema = z.object({
  location_id: z.string(),
  quantity: z.record(z.string(), z.number().or(z.string()))
});

// src/routes/orders/order-allocate-items/components/order-create-fulfillment-form/order-allocate-items-item.tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Component,
  ExclamationCircleSolid,
  TriangleDownMini
} from "@medusajs/icons";
import { useWatch } from "react-hook-form";
import { Input, Text, clx } from "@medusajs/ui";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function OrderAllocateItemsItem({
  item,
  form,
  locationId,
  onQuantityChange
}) {
  const { t } = useTranslation();
  const variant = item.variant;
  const inventory = item.variant?.inventory || [];
  const [isOpen, setIsOpen] = useState(false);
  const quantityField = useWatch({
    control: form.control,
    name: "quantity"
  });
  const hasInventoryKit = !!variant?.inventory_items.length && variant?.inventory_items.length > 1;
  const { availableQuantity, inStockQuantity } = useMemo(() => {
    if (!variant || !locationId) {
      return {};
    }
    const locationInventory = inventory[0]?.location_levels?.find(
      (inv) => inv.location_id === locationId
    );
    if (!locationInventory) {
      return {};
    }
    return {
      availableQuantity: locationInventory.available_quantity,
      inStockQuantity: locationInventory.stocked_quantity
    };
  }, [variant, locationId]);
  const hasQuantityError = !hasInventoryKit && availableQuantity && quantityField[`${item.id}-${item.variant?.inventory[0].id}`] && quantityField[`${item.id}-${item.variant?.inventory[0].id}`] > availableQuantity;
  const minValue = 0;
  const maxValue = Math.min(
    getFulfillableQuantity(item),
    availableQuantity || Number.MAX_SAFE_INTEGER
  );
  return /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 min-w-[720px] divide-y divide-dashed rounded-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3 p-3 text-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
        hasQuantityError && /* @__PURE__ */ jsx(ExclamationCircleSolid, { className: "text-ui-fg-error" }),
        /* @__PURE__ */ jsx(Thumbnail, { src: item.thumbnail }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row", children: [
            /* @__PURE__ */ jsx(Text, { className: "txt-small flex", as: "span", weight: "plus", children: item.product_title }),
            item.variant_sku && /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-subtle", children: [
              " ",
              "(",
              item.variant_sku,
              ")"
            ] }),
            hasInventoryKit && /* @__PURE__ */ jsx(Component, { className: "text-ui-fg-muted ml-2 overflow-visible pt-[2px]" })
          ] }),
          /* @__PURE__ */ jsx(Text, { as: "div", className: "text-ui-fg-subtle txt-small", children: item.title })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: clx(
            "flex flex-1 items-center gap-x-3",
            hasInventoryKit ? "justify-end" : "justify-between"
          ),
          children: [
            !hasInventoryKit && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
                /* @__PURE__ */ jsxs("div", { className: "txt-small flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("labels.available") }),
                  /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-muted", children: [
                    availableQuantity || "-",
                    availableQuantity && !hasInventoryKit && quantityField[`${item.id}-${item.variant?.inventory[0].id}`] && /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-error txt-small ml-1", children: [
                      "-",
                      quantityField[`${item.id}-${item.variant?.inventory[0].id}`]
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
                /* @__PURE__ */ jsxs("div", { className: "txt-small flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("labels.inStock") }),
                  /* @__PURE__ */ jsx("span", { className: "text-ui-fg-muted", children: inStockQuantity || "-" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
              /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle txt-small mr-2 flex flex-row items-center gap-2", children: [
                /* @__PURE__ */ jsx(
                  Form.Field,
                  {
                    control: form.control,
                    name: hasInventoryKit ? `quantity.${item.id}-` : `quantity.${item.id}-${item.variant?.inventory[0].id}`,
                    rules: {
                      required: !hasInventoryKit,
                      min: !hasInventoryKit && minValue,
                      max: maxValue
                    },
                    render: ({ field }) => {
                      return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        Input,
                        {
                          className: "bg-ui-bg-base txt-small w-[46px] rounded-lg text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                          type: "number",
                          ...field,
                          disabled: !locationId,
                          onChange: (e) => {
                            const val = e.target.value === "" ? null : Number(e.target.value);
                            onQuantityChange(
                              item.variant?.inventory[0],
                              item,
                              hasInventoryKit,
                              val,
                              true
                            );
                          }
                        }
                      ) }) });
                    }
                  }
                ),
                " ",
                "/ ",
                item.quantity,
                " ",
                t("fields.qty")
              ] })
            ] })
          ]
        }
      )
    ] }),
    hasInventoryKit && /* @__PURE__ */ jsx("div", { className: "px-4 py-2", children: /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => setIsOpen((o) => !o),
        className: "flex items-center gap-x-2",
        children: [
          /* @__PURE__ */ jsx(
            TriangleDownMini,
            {
              style: { transform: `rotate(${isOpen ? -90 : 0}deg)` },
              className: "text-ui-fg-muted -mt-[1px]"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "txt-small text-ui-fg-muted cursor-pointer", children: t("orders.allocateItems.consistsOf", {
            num: inventory.length
          }) })
        ]
      }
    ) }),
    isOpen && variant.inventory.map((i, ind) => {
      const location = i.location_levels.find(
        (l) => l.location_id === locationId
      );
      const hasQuantityError2 = !!quantityField[`${item.id}-${i.id}`] && quantityField[`${item.id}-${i.id}`] > location.available_quantity;
      return /* @__PURE__ */ jsxs("div", { className: "txt-small flex items-center gap-x-3 p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-row items-center gap-3", children: [
          hasQuantityError2 && /* @__PURE__ */ jsx(ExclamationCircleSolid, { className: "text-ui-fg-error" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle", children: i.title }),
            /* @__PURE__ */ jsx("span", { className: "text-ui-fg-muted", children: t("orders.allocateItems.requires", {
              num: variant.inventory_items[ind].required_quantity
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-row justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
            /* @__PURE__ */ jsxs("div", { className: "txt-small flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("labels.available") }),
              /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-muted", children: [
                location?.available_quantity || "-",
                location?.available_quantity && quantityField[`${item.id}-${i.id}`] && /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-error txt-small ml-1", children: [
                  "-",
                  quantityField[`${item.id}-${i.id}`]
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
            /* @__PURE__ */ jsxs("div", { className: "txt-small flex flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("labels.inStock") }),
              /* @__PURE__ */ jsx("span", { className: "text-ui-fg-muted", children: location?.stocked_quantity || "-" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-ui-border-strong block h-[12px] w-[1px]" }),
            /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle txt-small mr-1 flex flex-row items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Form.Field,
                {
                  control: form.control,
                  name: `quantity.${item.id}-${i.id}`,
                  rules: {
                    required: true,
                    min: 0,
                    max: location?.available_quantity
                  },
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        className: "bg-ui-bg-base txt-small w-[46px] rounded-lg text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                        type: "number",
                        ...field,
                        disabled: !locationId,
                        onChange: (e) => {
                          const val = e.target.value === "" ? null : Number(e.target.value);
                          onQuantityChange(
                            i,
                            item,
                            hasInventoryKit,
                            val
                          );
                        }
                      }
                    ) }) });
                  }
                }
              ),
              "/",
              " ",
              item.quantity * variant.inventory_items[ind].required_quantity,
              " ",
              t("fields.qty")
            ] })
          ] })
        ] })
      ] }, i.id);
    })
  ] });
}

// src/routes/orders/order-allocate-items/components/order-create-fulfillment-form/order-allocate-items-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function OrderAllocateItemsForm({ order }) {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const [disableSubmit, setDisableSubmit] = useState2(false);
  const [filterTerm, setFilterTerm] = useState2("");
  const { mutateAsync: allocateItems, isPending: isMutating } = useCreateReservationItem();
  const itemsToAllocate = useMemo2(
    () => order.items.filter(
      (item) => item.variant?.manage_inventory && item.variant?.inventory.length && item.quantity - item.detail.fulfilled_quantity > 0
    ),
    [order.items]
  );
  const filteredItems = useMemo2(() => {
    return itemsToAllocate.filter(
      (i) => i.variant_title.toLowerCase().includes(filterTerm) || i.product_title.toLowerCase().includes(filterTerm)
    );
  }, [itemsToAllocate, filterTerm]);
  const noItemsToAllocate = !itemsToAllocate.length;
  const form = useForm({
    defaultValues: {
      location_id: "",
      quantity: defaultAllocations(itemsToAllocate)
    },
    resolver: zodResolver(AllocateItemsSchema)
  });
  const { stock_locations = [] } = useStockLocations();
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const payload = Object.entries(data.quantity).filter(([key]) => !key.endsWith("-")).map(([key, quantity]) => [...key.split("-"), quantity]);
      if (payload.some((d) => d[2] === "")) {
        form.setError("root.quantityNotAllocated", {
          type: "manual",
          message: t("orders.allocateItems.error.quantityNotAllocated")
        });
        return;
      }
      const promises = payload.map(
        ([itemId, inventoryId, quantity]) => allocateItems({
          location_id: data.location_id,
          inventory_item_id: inventoryId,
          line_item_id: itemId,
          quantity
        })
      );
      await Promise.all(promises);
      await queryClient.invalidateQueries({
        queryKey: ordersQueryKeys.details()
      });
      handleSuccess(`/orders/${order.id}`);
      toast.success(t("general.success"), {
        description: t("orders.allocateItems.toast.created"),
        dismissLabel: t("actions.close")
      });
    } catch (e) {
      toast.error(t("general.error"), {
        description: e.message,
        dismissLabel: t("actions.close")
      });
    }
  });
  const onQuantityChange = (inventoryItem, lineItem, hasInventoryKit, value, isRoot) => {
    let shouldDisableSubmit = false;
    const key = isRoot && hasInventoryKit ? `quantity.${lineItem.id}-` : `quantity.${lineItem.id}-${inventoryItem.id}`;
    form.setValue(key, value);
    if (value) {
      const location = inventoryItem.location_levels.find(
        (l) => l.location_id === selectedLocationId
      );
      if (location) {
        if (location.available_quantity < value) {
          shouldDisableSubmit = true;
        }
      }
    }
    if (hasInventoryKit && !isRoot) {
      form.resetField(`quantity.${lineItem.id}-`, { defaultValue: "" });
    }
    if (hasInventoryKit && isRoot) {
      const item = itemsToAllocate.find((i) => i.id === lineItem.id);
      item.variant?.inventory_items.forEach((ii, ind) => {
        const num = value || 0;
        const inventory = item.variant?.inventory[ind];
        form.setValue(
          `quantity.${lineItem.id}-${inventory.id}`,
          num * ii.required_quantity
        );
        if (value) {
          const location = inventory?.location_levels.find(
            (l) => l.location_id === selectedLocationId
          );
          if (location) {
            if (location.available_quantity < value) {
              shouldDisableSubmit = true;
            }
          }
        }
      });
    }
    form.clearErrors("root.quantityNotAllocated");
    setDisableSubmit(shouldDisableSubmit);
  };
  const selectedLocationId = useWatch2({
    name: "location_id",
    control: form.control
  });
  useEffect(() => {
    if (selectedLocationId) {
      form.setValue("quantity", defaultAllocations(itemsToAllocate));
    }
  }, [selectedLocationId]);
  const allocationError = form.formState.errors?.root?.quantityNotAllocated?.message;
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "flex h-full w-full flex-col items-center divide-y overflow-y-auto", children: /* @__PURE__ */ jsx2("div", { className: "flex size-full flex-col items-center overflow-auto p-16", children: /* @__PURE__ */ jsx2("div", { className: "flex w-full max-w-[736px] flex-col justify-center px-2 pb-2", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-8 divide-y divide-dashed", children: [
          /* @__PURE__ */ jsx2(Heading, { children: t("orders.allocateItems.title") }),
          /* @__PURE__ */ jsxs2("div", { className: "flex-1 divide-y divide-dashed pt-8", children: [
            /* @__PURE__ */ jsx2(
              Form.Field,
              {
                control: form.control,
                name: "location_id",
                render: ({ field: { onChange, ref, ...field } }) => {
                  return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxs2("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.location") }),
                        /* @__PURE__ */ jsx2(Form.Hint, { children: t("orders.allocateItems.locationDescription") })
                      ] }),
                      /* @__PURE__ */ jsx2("div", { className: "flex-1", children: /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsxs2(Select, { onValueChange: onChange, ...field, children: [
                        /* @__PURE__ */ jsx2(
                          Select.Trigger,
                          {
                            className: "bg-ui-bg-base",
                            ref,
                            children: /* @__PURE__ */ jsx2(Select.Value, {})
                          }
                        ),
                        /* @__PURE__ */ jsx2(Select.Content, { children: stock_locations.map((l) => /* @__PURE__ */ jsx2(Select.Item, { value: l.id, children: l.name }, l.id)) })
                      ] }) }) })
                    ] }),
                    /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsxs2(Form.Item, { className: "mt-8 pt-8", children: [
              /* @__PURE__ */ jsxs2("div", { className: "flex flex-row items-center", children: [
                /* @__PURE__ */ jsxs2("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.allocateItems.itemsToAllocate") }),
                  /* @__PURE__ */ jsx2(Form.Hint, { children: t("orders.allocateItems.itemsToAllocateDesc") })
                ] }),
                /* @__PURE__ */ jsx2("div", { className: "flex-1", children: /* @__PURE__ */ jsx2(
                  Input2,
                  {
                    value: filterTerm,
                    onChange: (e) => setFilterTerm(e.target.value),
                    placeholder: t("orders.allocateItems.search"),
                    autoComplete: "off",
                    type: "search"
                  }
                ) })
              ] }),
              allocationError && /* @__PURE__ */ jsx2(Alert, { className: "mb-4", dismissible: true, variant: "error", children: allocationError }),
              /* @__PURE__ */ jsx2("div", { className: "flex flex-col gap-y-1", children: filteredItems.map((item) => /* @__PURE__ */ jsx2(
                OrderAllocateItemsItem,
                {
                  form,
                  item,
                  locationId: selectedLocationId,
                  onQuantityChange
                },
                item.id
              )) })
            ] })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              size: "small",
              type: "submit",
              isLoading: isMutating,
              disabled: !selectedLocationId || disableSubmit,
              children: t("orders.allocateItems.action")
            }
          )
        ] }) })
      ]
    }
  ) });
}
function defaultAllocations(items) {
  const ret = {};
  items.forEach((item) => {
    const hasInventoryKit = item.variant?.inventory_items.length > 1;
    ret[hasInventoryKit ? `${item.id}-` : `${item.id}-${item.variant?.inventory[0].id}`] = "";
    if (hasInventoryKit) {
      item.variant?.inventory.forEach((i) => {
        ret[`${item.id}-${i.id}`] = "";
      });
    }
  });
  return ret;
}

// src/routes/orders/order-allocate-items/order-allocate-items.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function OrderAllocateItems() {
  const { id } = useParams();
  const { order, isLoading, isError, error } = useOrder(id, {
    fields: "currency_code,*items,*items.variant,+items.variant.product.title,*items.variant.inventory,*items.variant.inventory.location_levels,*items.variant.inventory_items,*shipping_address"
  });
  if (isError) {
    throw error;
  }
  const ready = !isLoading && order;
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx3(OrderAllocateItemsForm, { order }) });
}
export {
  OrderAllocateItems as Component
};
