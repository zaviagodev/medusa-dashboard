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
import {
  useShippingOptions
} from "./chunk-GRT22PE5.mjs";
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useCreateOrderFulfillment,
  useOrder
} from "./chunk-FNYASI54.mjs";
import {
  useReservationItems
} from "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useProductVariant
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-create-fulfillment/order-create-fulfillments.tsx
import { useParams, useSearchParams } from "react-router-dom";

// src/routes/orders/order-create-fulfillment/components/order-create-fulfillment-form/order-create-fulfillment-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo as useMemo2, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Alert, Button, Select, Switch, toast } from "@medusajs/ui";
import { useForm, useWatch } from "react-hook-form";

// src/routes/orders/order-create-fulfillment/components/order-create-fulfillment-form/constants.ts
import { z } from "zod";
var CreateFulfillmentSchema = z.object({
  quantity: z.record(z.string(), z.number()),
  location_id: z.string(),
  shipping_option_id: z.string().optional(),
  send_notification: z.boolean().optional()
});

// src/routes/orders/order-create-fulfillment/components/order-create-fulfillment-form/order-create-fulfillment-item.tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { clx, Input, Text, Tooltip } from "@medusajs/ui";
import { InformationCircleSolid } from "@medusajs/icons";
import { jsx, jsxs } from "react/jsx-runtime";
function OrderCreateFulfillmentItem({
  item,
  form,
  locationId,
  itemReservedQuantitiesMap,
  disabled
}) {
  const { t } = useTranslation();
  const { variant } = useProductVariant(
    item.product_id,
    item.variant_id,
    {
      fields: "*inventory,*inventory.location_levels"
    },
    {
      enabled: !!item.variant
    }
  );
  const { availableQuantity, inStockQuantity } = useMemo(() => {
    if (!variant || !locationId) {
      return {};
    }
    const { inventory } = variant;
    const locationInventory = inventory[0]?.location_levels?.find(
      (inv) => inv.location_id === locationId
    );
    if (!locationInventory) {
      return {};
    }
    const reservedQuantityForItem = itemReservedQuantitiesMap.get(item.id) ?? 0;
    return {
      availableQuantity: locationInventory.available_quantity + reservedQuantityForItem,
      inStockQuantity: locationInventory.stocked_quantity
    };
  }, [variant, locationId, itemReservedQuantitiesMap]);
  const minValue = 0;
  const maxValue = Math.min(
    getFulfillableQuantity(item),
    availableQuantity || Number.MAX_SAFE_INTEGER
  );
  return /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center", children: [
    disabled && /* @__PURE__ */ jsx("div", { className: "inline-flex items-center ml-4", children: /* @__PURE__ */ jsx(
      Tooltip,
      {
        content: t("orders.fulfillment.disabledItemTooltip"),
        side: "top",
        children: /* @__PURE__ */ jsx(InformationCircleSolid, { className: "text-ui-tag-orange-icon" })
      }
    ) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: clx(
          "flex flex-col flex-1 gap-x-2 gap-y-2 border-b p-3 text-sm sm:flex-row",
          disabled && "opacity-50 pointer-events-none"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-x-3", children: [
            /* @__PURE__ */ jsx(Thumbnail, { src: item.thumbnail }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Text, { className: "txt-small", as: "span", weight: "plus", children: item.title }),
                item.variant_sku && /* @__PURE__ */ jsxs("span", { children: [
                  "(",
                  item.variant_sku,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsx(Text, { as: "div", className: "text-ui-fg-subtle txt-small", children: item.variant_title })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-x-1", children: [
            /* @__PURE__ */ jsx("div", { className: "mr-2 block h-[16px] w-[2px] bg-gray-200" }),
            /* @__PURE__ */ jsxs("div", { className: "text-small flex flex-1 flex-col", children: [
              /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("orders.fulfillment.available") }),
              /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle", children: availableQuantity || "N/A" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-x-1", children: [
              /* @__PURE__ */ jsx("div", { className: "mr-2 block h-[16px] w-[2px] bg-gray-200" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "text-ui-fg-subtle font-medium", children: t("orders.fulfillment.inStock") }),
                /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-subtle", children: [
                  inStockQuantity || "N/A",
                  " ",
                  inStockQuantity && /* @__PURE__ */ jsxs("span", { className: "font-medium text-red-500", children: [
                    "-",
                    form.getValues(`quantity.${item.id}`)
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                Form.Field,
                {
                  control: form.control,
                  name: `quantity.${item.id}`,
                  rules: { required: true, min: minValue, max: maxValue },
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        Input,
                        {
                          className: "bg-ui-bg-base txt-small w-[50px] rounded-lg text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                          type: "number",
                          ...field,
                          onChange: (e) => {
                            const val = e.target.value === "" ? null : Number(e.target.value);
                            field.onChange(val);
                            if (!isNaN(val)) {
                              if (val < minValue || val > maxValue) {
                                form.setError(`quantity.${item.id}`, {
                                  type: "manual",
                                  message: t(
                                    "orders.fulfillment.error.wrongQuantity",
                                    {
                                      count: maxValue,
                                      number: maxValue
                                    }
                                  )
                                });
                              } else {
                                form.clearErrors(`quantity.${item.id}`);
                              }
                            }
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "text-ui-fg-subtle", children: [
                "/ ",
                item.quantity,
                " ",
                t("fields.qty")
              ] })
            ] })
          ] })
        ]
      }
    )
  ] }) });
}

// src/routes/orders/order-create-fulfillment/components/order-create-fulfillment-form/order-create-fulfillment-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function OrderCreateFulfillmentForm({
  order,
  requiresShipping
}) {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const { mutateAsync: createOrderFulfillment, isPending: isMutating } = useCreateOrderFulfillment(order.id);
  const { reservations } = useReservationItems({
    line_item_id: order.items.map((i) => i.id)
  });
  const itemReservedQuantitiesMap = useMemo2(
    () => new Map((reservations || []).map((r) => [r.line_item_id, r.quantity])),
    [reservations]
  );
  const [fulfillableItems, setFulfillableItems] = useState(
    () => (order.items || []).filter(
      (item) => item.requires_shipping === requiresShipping && getFulfillableQuantity(item) > 0
    )
  );
  const form = useForm({
    defaultValues: {
      quantity: fulfillableItems.reduce(
        (acc, item) => {
          acc[item.id] = getFulfillableQuantity(item);
          return acc;
        },
        {}
      ),
      send_notification: !order.no_notification
    },
    resolver: zodResolver(CreateFulfillmentSchema)
  });
  const selectedLocationId = useWatch({
    name: "location_id",
    control: form.control
  });
  const { stock_locations = [] } = useStockLocations();
  const { shipping_options = [], isLoading: isShippingOptionsLoading } = useShippingOptions({
    stock_location_id: selectedLocationId,
    // is_return: false, // TODO: 500 when enabled
    fields: "+service_zone.fulfillment_set.location.id"
  });
  const shippingOptionId = useWatch({
    name: "shipping_option_id",
    control: form.control
  });
  const handleSubmit = form.handleSubmit(async (data) => {
    const selectedShippingOption = shipping_options.find(
      (o) => o.id === shippingOptionId
    );
    if (!selectedShippingOption) {
      form.setError("shipping_option_id", {
        type: "manual",
        message: t("orders.fulfillment.error.noShippingOption")
      });
      return;
    }
    if (!selectedLocationId) {
      form.setError("location_id", {
        type: "manual",
        message: t("orders.fulfillment.error.noLocation")
      });
      return;
    }
    let items = Object.entries(data.quantity).map(([id, quantity]) => ({
      id,
      quantity
    })).filter(({ quantity }) => !!quantity);
    if (requiresShipping) {
      const selectedShippingProfileId = selectedShippingOption?.shipping_profile_id;
      const itemShippingProfileMap = order.items.reduce((acc, item) => {
        acc[item.id] = item.variant?.product?.shipping_profile?.id;
        return acc;
      }, {});
      items = items.filter(
        ({ id }) => itemShippingProfileMap[id] === selectedShippingProfileId
      );
    }
    const payload = {
      location_id: selectedLocationId,
      shipping_option_id: shippingOptionId,
      no_notification: !data.send_notification,
      items
    };
    try {
      await createOrderFulfillment(payload);
      toast.success(t("orders.fulfillment.toast.created"));
      handleSuccess(`/orders/${order.id}`);
    } catch (e) {
      toast.error(e.message);
    }
  });
  useEffect(() => {
    if (stock_locations?.length && shipping_options?.length) {
      const initialShippingOptionId = order.shipping_methods?.[0]?.shipping_option_id;
      if (initialShippingOptionId) {
        const shippingOption = shipping_options.find(
          (o) => o.id === initialShippingOptionId
        );
        if (shippingOption) {
          const locationId = shippingOption.service_zone.fulfillment_set.location.id;
          form.setValue("location_id", locationId);
          form.setValue(
            "shipping_option_id",
            initialShippingOptionId || void 0
          );
        }
      }
    }
  }, [stock_locations?.length, shipping_options?.length]);
  const fulfilledQuantityArray = (order.items || []).map(
    (item) => item.requires_shipping === requiresShipping && item.detail.fulfilled_quantity
  );
  useEffect(() => {
    const itemsToFulfill = order?.items?.filter(
      (item) => item.requires_shipping === requiresShipping && getFulfillableQuantity(item) > 0
    ) || [];
    setFulfillableItems(itemsToFulfill);
    if (itemsToFulfill.length) {
      form.clearErrors("root");
    } else {
      form.setError("root", {
        type: "manual",
        message: t("orders.fulfillment.error.noItems")
      });
    }
    const quantityMap = itemsToFulfill.reduce(
      (acc, item) => {
        acc[item.id] = getFulfillableQuantity(item);
        return acc;
      },
      {}
    );
    form.setValue("quantity", quantityMap);
  }, [...fulfilledQuantityArray, requiresShipping]);
  const differentOptionSelected = shippingOptionId && order.shipping_methods?.[0]?.shipping_option_id !== shippingOptionId;
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "flex h-full w-full flex-col items-center divide-y overflow-y-auto", children: /* @__PURE__ */ jsx2("div", { className: "flex size-full flex-col items-center overflow-auto p-16", children: /* @__PURE__ */ jsx2("div", { className: "flex w-full max-w-[736px] flex-col justify-center px-2 pb-2", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col divide-y divide-dashed", children: [
          /* @__PURE__ */ jsx2("div", { className: "pb-8", children: /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "location_id",
              render: ({ field: { onChange, ref, ...field } }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-2 xl:flex-row xl:items-center", children: [
                    /* @__PURE__ */ jsxs2("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.location") }),
                      /* @__PURE__ */ jsx2(Form.Hint, { children: t("orders.fulfillment.locationDescription") })
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
          ) }),
          /* @__PURE__ */ jsxs2("div", { className: "py-8", children: [
            /* @__PURE__ */ jsx2(
              Form.Field,
              {
                control: form.control,
                name: "shipping_option_id",
                render: ({ field: { onChange, ref, ...field } }) => {
                  return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-2 xl:flex-row xl:items-center", children: [
                      /* @__PURE__ */ jsxs2("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.shippingMethod") }),
                        /* @__PURE__ */ jsx2(Form.Hint, { children: t("orders.fulfillment.methodDescription") })
                      ] }),
                      /* @__PURE__ */ jsx2("div", { className: "flex-1", children: /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsxs2(
                        Select,
                        {
                          onValueChange: onChange,
                          ...field,
                          disabled: !selectedLocationId,
                          children: [
                            /* @__PURE__ */ jsx2(
                              Select.Trigger,
                              {
                                className: "bg-ui-bg-base",
                                ref,
                                children: isShippingOptionsLoading ? /* @__PURE__ */ jsxs2("span", { className: "text-right", children: [
                                  t("labels.loading"),
                                  "..."
                                ] }) : /* @__PURE__ */ jsx2(Select.Value, {})
                              }
                            ),
                            /* @__PURE__ */ jsx2(Select.Content, { children: shipping_options.map((o) => /* @__PURE__ */ jsx2(Select.Item, { value: o.id, children: o.name }, o.id)) })
                          ]
                        }
                      ) }) })
                    ] }),
                    /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            differentOptionSelected && /* @__PURE__ */ jsxs2(Alert, { className: "mt-4 p-4", variant: "warning", children: [
              /* @__PURE__ */ jsx2("span", { className: "-mt-[3px] block font-medium", children: t("labels.beaware") }),
              /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-muted", children: t("orders.fulfillment.differentOptionSelected") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsxs2(Form.Item, { className: "mt-8", children: [
              /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.fulfillment.itemsToFulfill") }),
              /* @__PURE__ */ jsx2(Form.Hint, { children: t("orders.fulfillment.itemsToFulfillDesc") }),
              /* @__PURE__ */ jsx2("div", { className: "flex flex-col gap-y-1", children: fulfillableItems.map((item) => {
                const isShippingProfileMatching = shipping_options.find(
                  (o) => o.id === shippingOptionId
                )?.shipping_profile_id === item.variant?.product?.shipping_profile?.id;
                return /* @__PURE__ */ jsx2(
                  OrderCreateFulfillmentItem,
                  {
                    form,
                    item,
                    locationId: selectedLocationId,
                    disabled: requiresShipping && !isShippingProfileMatching,
                    itemReservedQuantitiesMap
                  },
                  item.id
                );
              }) })
            ] }),
            form.formState.errors.root && /* @__PURE__ */ jsx2(
              Alert,
              {
                variant: "error",
                dismissible: false,
                className: "flex items-center",
                classNameInner: "flex justify-between flex-1 items-center",
                children: form.formState.errors.root.message
              }
            )
          ] }),
          /* @__PURE__ */ jsx2("div", { className: "mt-8 pt-8 ", children: /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "send_notification",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.returns.sendNotification") }),
                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      Switch,
                      {
                        checked: !!value,
                        onCheckedChange: onChange,
                        ...field
                      }
                    ) }) })
                  ] }),
                  /* @__PURE__ */ jsx2(Form.Hint, { className: "!mt-1", children: t("orders.fulfillment.sendNotificationHint") }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          ) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              size: "small",
              type: "submit",
              isLoading: isMutating,
              disabled: !shippingOptionId,
              children: t("orders.fulfillment.create")
            }
          )
        ] }) })
      ]
    }
  ) });
}

// src/routes/orders/order-create-fulfillment/order-create-fulfillments.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function OrderCreateFulfillment() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const requiresShipping = searchParams.get("requires_shipping") === "true";
  const { order, isLoading, isError, error } = useOrder(id, {
    fields: "currency_code,*items,*items.variant,+items.variant.product.shipping_profile.id,*shipping_address,+shipping_methods.shipping_option_id"
  });
  if (isError) {
    throw error;
  }
  const ready = !isLoading && order;
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx3(
    OrderCreateFulfillmentForm,
    {
      order,
      requiresShipping
    }
  ) });
}
export {
  OrderCreateFulfillment as Component
};
