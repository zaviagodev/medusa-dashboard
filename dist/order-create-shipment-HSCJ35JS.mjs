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
import "./chunk-32IQRUVY.mjs";
import {
  useCreateOrderShipment,
  useOrder
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
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-create-shipment/order-create-shipment.tsx
import { useParams } from "react-router-dom";

// src/routes/orders/order-create-shipment/components/order-create-shipment-form/order-create-shipment-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Button, Heading, Input, Switch, toast } from "@medusajs/ui";
import { useFieldArray, useForm } from "react-hook-form";

// src/routes/orders/order-create-shipment/components/order-create-shipment-form/constants.ts
import { z } from "zod";
var CreateShipmentSchema = z.object({
  labels: z.array(
    z.object({
      tracking_number: z.string(),
      // TODO: this 2 are not optional in the API
      tracking_url: z.string().optional(),
      label_url: z.string().optional()
    })
  ),
  send_notification: z.boolean().optional()
});

// src/routes/orders/order-create-shipment/components/order-create-shipment-form/order-create-shipment-form.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function OrderCreateShipmentForm({
  order,
  fulfillment
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const { mutateAsync: createShipment, isPending: isMutating } = useCreateOrderShipment(order.id, fulfillment?.id);
  const form = useForm({
    defaultValues: {
      send_notification: !order.no_notification
    },
    resolver: zodResolver(CreateShipmentSchema)
  });
  const { fields: labels, append } = useFieldArray({
    name: "labels",
    control: form.control
  });
  const handleSubmit = form.handleSubmit(async (data) => {
    const addedLabels = data.labels.filter((l) => !!l.tracking_number).map((l) => ({
      tracking_number: l.tracking_number,
      tracking_url: "#",
      label_url: "#"
    }));
    await createShipment(
      {
        items: fulfillment?.items?.map((i) => ({
          id: i.line_item_id,
          quantity: i.quantity
        })),
        labels: [...addedLabels, ...fulfillment?.labels || []],
        no_notification: !data.send_notification
      },
      {
        onSuccess: () => {
          toast.success(t("orders.shipment.toastCreated"));
          handleSuccess(`/orders/${order.id}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isMutating, children: t("actions.save") })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex h-full w-full flex-col items-center divide-y overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "flex size-full flex-col items-center overflow-auto p-16", children: /* @__PURE__ */ jsx("div", { className: "flex w-full max-w-[736px] flex-col justify-center px-2 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col divide-y", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
            /* @__PURE__ */ jsx(Heading, { className: "mb-4", children: t("orders.shipment.title") }),
            labels.map((label, index) => /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: `labels.${index}.tracking_number`,
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { className: "mb-4", children: [
                    index === 0 && /* @__PURE__ */ jsx(Form.Label, { children: t("orders.shipment.trackingNumber") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: "123-456-789" }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              },
              label.id
            )),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                onClick: () => append({ tracking_number: "" }),
                className: "self-end",
                variant: "secondary",
                children: t("orders.shipment.addTracking")
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 pt-8 ", children: /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "send_notification",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("orders.shipment.sendNotification") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        checked: !!value,
                        onCheckedChange: onChange,
                        ...field
                      }
                    ) }) })
                  ] }),
                  /* @__PURE__ */ jsx(Form.Hint, { className: "!mt-1", children: t("orders.shipment.sendNotificationHint") }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ) })
        ] }) }) }) })
      ]
    }
  ) });
}

// src/routes/orders/order-create-shipment/order-create-shipment.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function OrderCreateShipment() {
  const { id, f_id } = useParams();
  const { order, isLoading, isError, error } = useOrder(id, {
    fields: "*fulfillments,*fulfillments.items,*fulfillments.labels"
  });
  if (isError) {
    throw error;
  }
  const ready = !isLoading && order;
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx2(
    OrderCreateShipmentForm,
    {
      order,
      fulfillment: order.fulfillments?.find((f) => f.id === f_id)
    }
  ) });
}
export {
  OrderCreateShipment as Component
};
