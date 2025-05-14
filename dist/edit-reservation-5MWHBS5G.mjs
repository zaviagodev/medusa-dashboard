import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useReservationItem,
  useUpdateReservationItem
} from "./chunk-FVC7M755.mjs";
import {
  useInventoryItem
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/reservations/reservation-detail/components/edit-reservation/edit-reservation-modal.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/reservations/reservation-detail/components/edit-reservation/components/edit-reservation-form.tsx
import { Button, Input, Select, Text, Textarea, toast } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditReservationSchema = z.object({
  location_id: z.string(),
  description: z.string().optional(),
  quantity: z.number().min(1)
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
var getDefaultValues = (reservation) => {
  return {
    quantity: reservation.quantity,
    location_id: reservation.location_id,
    description: reservation.description ?? void 0
  };
};
var EditReservationForm = ({
  reservation,
  item,
  locations
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: getDefaultValues(reservation),
    resolver: zodResolver(EditReservationSchema)
  });
  const { mutateAsync } = useUpdateReservationItem(reservation.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    mutateAsync(values, {
      onSuccess: () => {
        toast.success(t("inventory.reservation.updateSuccessToast"));
        handleSuccess();
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  });
  const reservedQuantity = form.watch("quantity");
  const locationId = form.watch("location_id");
  const level = item.location_levels.find(
    (level2) => level2.location_id === locationId
  );
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex flex-1 flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-8 overflow-auto", children: [
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "location_id",
              render: ({ field: { onChange, value, ref, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("inventory.reservation.location") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                    Select,
                    {
                      value,
                      onValueChange: (v) => {
                        onChange(v);
                      },
                      ...field,
                      children: [
                        /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                        /* @__PURE__ */ jsx(Select.Content, { children: (locations || []).map((r) => /* @__PURE__ */ jsx(Select.Item, { value: r.id, children: r.name }, r.id)) })
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle shadow-elevation-card-rest grid grid-rows-4 divide-y rounded-lg border", children: [
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("fields.title"),
                value: item.title ?? item.sku
              }
            ),
            /* @__PURE__ */ jsx(AttributeGridRow, { title: t("fields.sku"), value: item.sku }),
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("fields.inStock"),
                value: level.stocked_quantity
              }
            ),
            /* @__PURE__ */ jsx(
              AttributeGridRow,
              {
                title: t("inventory.available"),
                value: level.stocked_quantity - (level.reserved_quantity - reservation.quantity) - reservedQuantity
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "quantity",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("inventory.reservation.reservedAmount") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "number",
                      min: 0,
                      max: (level.available_quantity || 0) + (reservation.quantity || 0),
                      value: value || "",
                      onChange: (e) => {
                        const value2 = e.target.value;
                        if (value2 === "") {
                          onChange(null);
                        } else {
                          onChange(parseFloat(value2));
                        }
                      },
                      ...field
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "description",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.description") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Textarea, { ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "small", isLoading: false, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/reservations/reservation-detail/components/edit-reservation/edit-reservation-modal.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ReservationEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { reservation, isPending, isError, error } = useReservationItem(id);
  const { inventory_item: inventoryItem } = useInventoryItem(
    reservation?.inventory_item_id,
    {
      enabled: !!reservation
    }
  );
  const { stock_locations } = useStockLocations(
    {
      id: inventoryItem?.location_levels?.map(
        (l) => l.location_id
      )
    },
    {
      enabled: !!inventoryItem?.location_levels
    }
  );
  const ready = !isPending && reservation && inventoryItem && stock_locations;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("inventory.reservation.editItemDetails") }) }),
    ready && /* @__PURE__ */ jsx2(
      EditReservationForm,
      {
        locations: stock_locations,
        reservation,
        item: inventoryItem
      }
    )
  ] });
};
export {
  ReservationEdit as Component
};
