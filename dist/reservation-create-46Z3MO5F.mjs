import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useCreateReservationItem
} from "./chunk-FVC7M755.mjs";
import {
  useInventoryItems
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/reservations/reservation-create/reservation-create.tsx
import { useSearchParams } from "react-router-dom";

// src/routes/reservations/reservation-create/components/reservation-create-from/reservation-create-from.tsx
import * as zod from "zod";
import { Button, Heading, Input, Text, Textarea, toast } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateReservationSchema = zod.object({
  inventory_item_id: zod.string().min(1),
  location_id: zod.string().min(1),
  quantity: zod.number().min(1),
  description: zod.string().optional()
});
var AttributeGridRow = ({
  title,
  value
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 divide-x", children: [
    /* @__PURE__ */ jsx(Text, { className: "px-2 py-1.5", size: "small", leading: "compact", children: title }),
    /* @__PURE__ */ jsx(Text, { className: "px-2 py-1.5", size: "small", leading: "compact", children: value })
  ] });
};
var ReservationCreateForm = (props) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const [inventorySearch, setInventorySearch] = React.useState(
    null
  );
  const form = useForm({
    defaultValues: {
      inventory_item_id: props.inventoryItemId || "",
      location_id: "",
      quantity: 0,
      description: ""
    },
    resolver: zodResolver(CreateReservationSchema)
  });
  const { inventory_items } = useInventoryItems({
    q: inventorySearch
  });
  const inventoryItemId = form.watch("inventory_item_id");
  const selectedInventoryItem = inventory_items?.find(
    (it) => it.id === inventoryItemId
  );
  const locationId = form.watch("location_id");
  const selectedLocationLevel = selectedInventoryItem?.location_levels?.find(
    (it) => it.location_id === locationId
  );
  const quantity = form.watch("quantity");
  const { stock_locations } = useStockLocations(
    {
      id: selectedInventoryItem?.location_levels?.map(
        (level) => level.location_id
      ) ?? []
    },
    {
      enabled: !!selectedInventoryItem
    }
  );
  const { mutateAsync, isPending } = useCreateReservationItem();
  const handleSubmit = form.handleSubmit(async (data) => {
    const min = 1;
    const max = selectedLocationLevel?.available_quantity ? selectedLocationLevel.available_quantity : 0;
    if (!selectedLocationLevel?.available_quantity) {
      form.setError("quantity", {
        type: "manual",
        message: t("inventory.reservation.errors.noAvaliableQuantity")
      });
      return;
    }
    if (data.quantity < min || data.quantity > max) {
      form.setError("quantity", {
        type: "manual",
        message: t("inventory.reservation.errors.quantityOutOfRange", {
          max
        })
      });
      return;
    }
    await mutateAsync(data, {
      onSuccess: ({ reservation }) => {
        toast.success(t("inventory.reservation.successToast"));
        handleSuccess(
          props.inventoryItemId ? `/inventory/${props.inventoryItemId}` : `/reservations/${reservation.id}`
        );
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col items-center overflow-auto py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
          /* @__PURE__ */ jsx(Heading, { children: t("inventory.reservation.create") }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "inventory_item_id",
                render: ({ field: { value, onChange, ...field } }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("inventory.reservation.itemToReserve") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Combobox,
                      {
                        onSearchValueChange: (value2) => setInventorySearch(value2),
                        value,
                        onChange: (v) => {
                          onChange(v);
                        },
                        ...field,
                        disabled: !!props.inventoryItemId,
                        options: (inventory_items ?? []).map(
                          (inventoryItem) => ({
                            label: inventoryItem.title ?? inventoryItem.sku,
                            value: inventoryItem.id
                          })
                        )
                      }
                    ) })
                  ] });
                }
              },
              "inventory_item_id"
            ),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "location_id",
                render: ({ field: { value, onChange, ...field } }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("fields.location") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Combobox,
                      {
                        value,
                        onChange: (v) => {
                          onChange(v);
                        },
                        ...field,
                        disabled: !inventoryItemId,
                        options: (stock_locations ?? []).map(
                          (stockLocation) => ({
                            label: stockLocation.name,
                            value: stockLocation.id
                          })
                        )
                      }
                    ) })
                  ] });
                }
              },
              "location_id"
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle shadow-elevation-card-rest grid grid-rows-4 divide-y rounded-lg", children: [
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("fields.title"),
                value: selectedInventoryItem?.title ?? selectedInventoryItem?.sku ?? "-"
              }
            ),
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("fields.sku"),
                value: selectedInventoryItem?.sku ?? "-"
              }
            ),
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("fields.inStock"),
                value: selectedLocationLevel?.stocked_quantity ?? "-"
              }
            ),
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("inventory.available"),
                value: selectedLocationLevel?.available_quantity ? selectedLocationLevel.available_quantity - (quantity || 0) : "-"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/2", children: /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "quantity",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.quantity") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "number",
                      placeholder: t(
                        "inventory.reservation.quantityPlaceholder"
                      ),
                      value: value || "",
                      onChange: (e) => {
                        const value2 = e.target.value;
                        if (value2 === "") {
                          onChange(null);
                        } else {
                          onChange(parseFloat(value2));
                        }
                      },
                      ...field,
                      disabled: !inventoryItemId || !locationId
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "description",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.description") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      ...field,
                      disabled: !inventoryItemId || !locationId,
                      placeholder: t(
                        "inventory.reservation.descriptionPlaceholder"
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "submit",
              variant: "primary",
              size: "small",
              isLoading: isPending,
              children: t("actions.create")
            }
          )
        ] }) })
      ]
    }
  ) });
};

// src/routes/reservations/reservation-create/reservation-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ReservationCreate = () => {
  const [params] = useSearchParams();
  const inventoryItemId = params.get("item_id");
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(ReservationCreateForm, { inventoryItemId }) });
};
export {
  ReservationCreate as Component
};
