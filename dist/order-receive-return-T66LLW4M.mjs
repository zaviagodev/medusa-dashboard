import {
  useAddDismissItems,
  useAddReceiveItems,
  useCancelReceiveReturn,
  useConfirmReturnReceive,
  useInitiateReceiveReturn,
  useRemoveDismissItem,
  useRemoveReceiveItems,
  useReturn,
  useUpdateDismissItem,
  useUpdateReceiveItem
} from "./chunk-A35MFVT3.mjs";
import {
  getStylizedAmount
} from "./chunk-PDWBYQOW.mjs";
import "./chunk-MWVM4TYO.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
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
import "./chunk-GRT22PE5.mjs";
import {
  useStockLocation
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
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-receive-return/order-receive-return.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Heading, toast as toast3 } from "@medusajs/ui";
import { useEffect as useEffect2 } from "react";

// src/routes/orders/order-receive-return/components/order-receive-return-form/order-receive-return-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "@medusajs/icons";
import { Alert, Button as Button2, Input as Input2, Switch, Text, toast as toast2 } from "@medusajs/ui";
import { useEffect, useMemo as useMemo2 } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/orders/order-receive-return/components/order-receive-return-form/constants.ts
import { z } from "zod";
var ReceiveReturnSchema = z.object({
  items: z.array(
    z.object({
      quantity: z.number().nullish(),
      dismissed_quantity: z.number().nullish(),
      item_id: z.string()
    })
  ),
  send_notification: z.boolean().optional()
});

// src/routes/orders/order-receive-return/components/order-receive-return-form/dismissed-quantity.tsx
import { useMemo, useState } from "react";
import { HeartBroken } from "@medusajs/icons";
import { useTranslation } from "react-i18next";
import { Button, Input, Popover, toast } from "@medusajs/ui";
import { jsx, jsxs } from "react/jsx-runtime";
function DismissedQuantity({
  form,
  item,
  index,
  returnId,
  orderId
}) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: addDismissedItems } = useAddDismissItems(
    returnId,
    orderId
  );
  const { mutateAsync: updateDismissedItems } = useUpdateDismissItem(
    returnId,
    orderId
  );
  const { mutateAsync: removeDismissedItems } = useRemoveDismissItem(
    returnId,
    orderId
  );
  const [receivedQuantity, dismissedQuantity] = useMemo(() => {
    const receivedAction = item.actions?.find(
      (a) => a.action === "RECEIVE_RETURN_ITEM"
    );
    const dismissedAction = item.actions?.find(
      (a) => a.action === "RECEIVE_DAMAGED_RETURN_ITEM"
    );
    return [receivedAction?.details.quantity, dismissedAction?.details.quantity];
  }, [item]);
  const onDismissedQuantityChanged = async (value) => {
    const action = item.actions?.find(
      (a) => a.action === "RECEIVE_DAMAGED_RETURN_ITEM"
    );
    if (typeof value === "number" && value < 0) {
      form.setValue(`items.${index}.dismissed_quantity`, dismissedQuantity, {
        shouldTouch: true,
        shouldDirty: true
      });
      toast.error(t("orders.returns.receive.toast.errorNegativeValue"));
      return;
    }
    if (typeof value === "number" && value > item.quantity - item.detail.return_received_quantity) {
      form.setValue(`items.${index}.dismissed_quantity`, dismissedQuantity, {
        shouldTouch: true,
        shouldDirty: true
      });
      toast.error(t("orders.returns.receive.toast.errorLargeDamagedValue"));
      return;
    }
    try {
      if (value) {
        if (!action) {
          await addDismissedItems({
            items: [{ id: item.id, quantity: value }]
          });
        } else {
          await updateDismissedItems({ actionId: action.id, quantity: value });
        }
      } else {
        if (action) {
          await removeDismissedItems(action.id);
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxs(Popover, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "flex gap-2 px-2", variant: "secondary", type: "button", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(HeartBroken, {}) }),
      !!dismissedQuantity && /* @__PURE__ */ jsx("span", { children: dismissedQuantity })
    ] }) }),
    /* @__PURE__ */ jsx(Popover.Content, { align: "center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-2", children: [
      /* @__PURE__ */ jsx("span", { className: "txt-small text-ui-fg-subtle mb-2 font-medium", children: t("orders.returns.receive.writeOffInputLabel") }),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: `items.${index}.dismissed_quantity`,
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsx(Form.Item, { className: "w-full", children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
              Input,
              {
                min: 0,
                max: item.quantity,
                type: "number",
                value,
                className: "bg-ui-bg-field-component text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                onChange: (e) => {
                  const value2 = e.target.value === "" ? null : parseFloat(e.target.value);
                  onChange(value2);
                },
                ...field,
                onBlur: () => {
                  field.onBlur();
                  onDismissedQuantityChanged(value);
                }
              }
            ) }) });
          }
        }
      )
    ] }) })
  ] });
}
var dismissed_quantity_default = DismissedQuantity;

// src/routes/orders/order-receive-return/components/order-receive-return-form/order-receive-return-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function OrderReceiveReturnForm({
  order,
  preview,
  orderReturn
}) {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const previewItems = useMemo2(() => {
    const idsMap = {};
    orderReturn.items.forEach((i) => idsMap[i.item_id] = true);
    return preview.items.filter((i) => idsMap[i.id]);
  }, [preview.items, orderReturn]);
  const { mutateAsync: confirmReturnReceive } = useConfirmReturnReceive(
    orderReturn.id,
    order.id
  );
  const { mutateAsync: cancelReceiveReturn } = useCancelReceiveReturn(
    orderReturn.id,
    order.id
  );
  const { mutateAsync: addReceiveItems } = useAddReceiveItems(
    orderReturn.id,
    order.id
  );
  const { mutateAsync: updateReceiveItem } = useUpdateReceiveItem(
    orderReturn.id,
    order.id
  );
  const { mutateAsync: removeReceiveItem } = useRemoveReceiveItems(
    orderReturn.id,
    order.id
  );
  const { stock_location } = useStockLocation(
    orderReturn.location_id,
    void 0,
    {
      enabled: !!orderReturn.location_id
    }
  );
  const itemsMap = useMemo2(() => {
    const ret = {};
    order.items.forEach((i) => ret[i.id] = i);
    return ret;
  }, [order.items]);
  const form = useForm({
    defaultValues: {
      items: previewItems?.sort((i1, i2) => i1.id.localeCompare(i2.id)).map((i) => ({
        item_id: i.id
      })),
      send_notification: false
    },
    resolver: zodResolver(ReceiveReturnSchema)
  });
  useEffect(() => {
    previewItems?.sort((i1, i2) => i1.id.localeCompare(i2.id)).forEach((item, index) => {
      const receivedAction = item.actions?.find(
        (a) => a.action === "RECEIVE_RETURN_ITEM"
      );
      const dismissedAction = item.actions?.find(
        (a) => a.action === "RECEIVE_DAMAGED_RETURN_ITEM"
      );
      form.setValue(
        `items.${index}.quantity`,
        receivedAction?.details.quantity,
        { shouldTouch: true, shouldDirty: true }
      );
      form.setValue(
        `items.${index}.dismissed_quantity`,
        dismissedAction?.details.quantity,
        { shouldTouch: true, shouldDirty: true }
      );
    });
  }, [previewItems]);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await confirmReturnReceive({ no_notification: !data.send_notification });
      handleSuccess(`/orders/${order.id}`);
      toast2.success(t("general.success"), {
        description: t("orders.returns.receive.toast.success"),
        dismissLabel: t("actions.close")
      });
    } catch (e) {
      toast2.error(t("general.error"), {
        description: e.message,
        dismissLabel: t("actions.close")
      });
    }
  });
  const handleQuantityChange = async (itemId, value, index) => {
    const item = previewItems?.find((i) => i.id === itemId);
    const action = item?.actions?.find(
      (a) => a.action === "RECEIVE_RETURN_ITEM"
    );
    if (typeof value === "number" && value < 0) {
      form.setValue(
        `items.${index}.quantity`,
        item.detail.return_received_quantity,
        { shouldTouch: true, shouldDirty: true }
      );
      toast2.error(t("orders.returns.receive.toast.errorNegativeValue"));
      return;
    }
    if (typeof value === "number" && value > item.quantity) {
      form.setValue(
        `items.${index}.quantity`,
        item.detail.return_received_quantity,
        { shouldTouch: true, shouldDirty: true }
      );
      toast2.error(t("orders.returns.receive.toast.errorLargeValue"));
      return;
    }
    try {
      if (action) {
        if (value === null || value === 0) {
          await removeReceiveItem(action.id);
          return;
        }
        await updateReceiveItem({ actionId: action.id, quantity: value });
      } else {
        if (typeof value === "number" && value > 0 && value <= item.quantity) {
          await addReceiveItems({ items: [{ id: item.id, quantity: value }] });
        }
      }
    } catch (e) {
      toast2.error(e.message);
    }
  };
  const onFormClose = async (isSubmitSuccessful) => {
    try {
      if (!isSubmitSuccessful) {
        await cancelReceiveReturn();
      }
    } catch (e) {
      toast2.error(e.message);
    }
  };
  return /* @__PURE__ */ jsx2(RouteDrawer.Form, { form, onClose: onFormClose, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs2(RouteDrawer.Body, { className: "flex size-full flex-col overflow-auto", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx2("div", { children: stock_location && /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx2(ArrowRight, { className: "text-ui-fg-subtle" }),
              " ",
              /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-base txt-small font-medium", children: stock_location.name })
            ] }) }),
            /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-muted txt-small text-right", children: t("orders.returns.receive.itemsLabel") })
          ] }),
          previewItems.map((item, ind) => {
            const originalItem = itemsMap[item.id];
            return /* @__PURE__ */ jsx2(
              "div",
              {
                className: "bg-ui-bg-subtle shadow-elevation-card-rest mt-2 rounded-xl",
                children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center gap-x-2 gap-y-2 p-3 text-sm md:flex-row", children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 items-center gap-x-3", children: [
                    /* @__PURE__ */ jsxs2(Text, { size: "small", className: "text-ui-fg-subtle", children: [
                      item.quantity,
                      "x"
                    ] }),
                    /* @__PURE__ */ jsx2(Thumbnail, { src: item.thumbnail }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsxs2("div", { children: [
                        /* @__PURE__ */ jsxs2(Text, { className: "txt-small", as: "span", weight: "plus", children: [
                          item.title,
                          " "
                        ] }),
                        originalItem.variant_sku && /* @__PURE__ */ jsxs2("span", { children: [
                          "(",
                          originalItem.variant_sku,
                          ")"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx2(Text, { as: "div", className: "text-ui-fg-subtle txt-small", children: originalItem.product_title })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 flex-row items-center gap-2", children: [
                    /* @__PURE__ */ jsx2(
                      dismissed_quantity_default,
                      {
                        form,
                        item,
                        index: ind,
                        returnId: orderReturn.id,
                        orderId: order.id
                      }
                    ),
                    /* @__PURE__ */ jsx2(
                      Form.Field,
                      {
                        control: form.control,
                        name: `items.${ind}.quantity`,
                        render: ({ field: { onChange, value, ...field } }) => {
                          return /* @__PURE__ */ jsx2(Form.Item, { className: "w-full", children: /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                            Input2,
                            {
                              min: 0,
                              max: item.quantity,
                              type: "number",
                              value,
                              className: "bg-ui-bg-field-component text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                              onChange: (e) => {
                                const value2 = e.target.value === "" ? null : parseFloat(e.target.value);
                                onChange(value2);
                              },
                              ...field,
                              onBlur: () => {
                                field.onBlur();
                                handleQuantityChange(item.id, value, ind);
                              }
                            }
                          ) }) });
                        }
                      }
                    )
                  ] })
                ] })
              },
              item.id
            );
          }),
          /* @__PURE__ */ jsxs2("div", { className: "my-6 border-b border-t border-dashed py-4", children: [
            /* @__PURE__ */ jsxs2("div", { className: "mb-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx2("span", { className: "txt-small text-ui-fg-subtle", children: t("fields.total") }),
              /* @__PURE__ */ jsx2("span", { className: "txt-small text-ui-fg-subtle", children: getStylizedAmount(preview.total, order.currency_code) })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "mt-4 flex items-center justify-between border-t border-dotted pt-4", children: [
              /* @__PURE__ */ jsx2("span", { className: "txt-small font-medium", children: t("orders.returns.outstandingAmount") }),
              /* @__PURE__ */ jsx2("span", { className: "txt-small font-medium", children: getStylizedAmount(
                preview.summary.pending_difference || 0,
                order.currency_code
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx2(Alert, { className: "rounded-xl", variant: "warning", children: t("orders.returns.receive.inventoryWarning") }),
          /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-subtle shadow-elevation-card-rest my-2 rounded-xl p-3", children: /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "send_notification",
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      Switch,
                      {
                        className: "mt-1 self-start",
                        checked: !!value,
                        onCheckedChange: onChange,
                        ...field
                      }
                    ) }),
                    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.returns.sendNotification") }),
                      /* @__PURE__ */ jsx2(Form.Hint, { className: "!mt-1", children: t("orders.returns.receive.sendNotificationHint") })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx2(RouteDrawer.Footer, { className: "overflow-hidden", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button2, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(Button2, { size: "small", type: "submit", isLoading: false, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
}

// src/routes/orders/order-receive-return/order-receive-return.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var IS_REQUEST_RUNNING = false;
function OrderReceiveReturn() {
  const { id, return_id } = useParams();
  const { t } = useTranslation3();
  const navigate = useNavigate();
  const { order } = useOrder(id, { fields: "+currency_code,*items" });
  const { order: preview } = useOrderPreview(id);
  const { return: orderReturn } = useReturn(return_id, {
    fields: "*items.item,*items.item.variant,*items.item.variant.product"
  });
  const { mutateAsync: initiateReceiveReturn } = useInitiateReceiveReturn(
    return_id,
    id
  );
  const { mutateAsync: addReceiveItems } = useAddReceiveItems(return_id, id);
  useEffect2(() => {
    ;
    (async function() {
      if (IS_REQUEST_RUNNING || !preview) {
        return;
      }
      if (preview.order_change) {
        if (preview.order_change.change_type !== "return_receive") {
          navigate(`/orders/${id}`, { replace: true });
          toast3.error(t("orders.returns.activeChangeError"));
        }
        return;
      }
      IS_REQUEST_RUNNING = true;
      try {
        const { return: _return } = await initiateReceiveReturn({});
        await addReceiveItems({
          items: _return.items.map((i) => ({
            id: i.item_id,
            quantity: i.quantity
          }))
        });
      } catch (e) {
        toast3.error(e.message);
      } finally {
        IS_REQUEST_RUNNING = false;
      }
    })();
  }, [preview]);
  const ready = order && orderReturn && preview;
  return /* @__PURE__ */ jsxs3(RouteDrawer, { children: [
    /* @__PURE__ */ jsx3(RouteDrawer.Header, { children: /* @__PURE__ */ jsx3(Heading, { children: t("orders.returns.receive.title", {
      returnId: return_id?.slice(-7)
    }) }) }),
    ready && /* @__PURE__ */ jsx3(
      OrderReceiveReturnForm,
      {
        order,
        orderReturn,
        preview
      }
    )
  ] });
}
export {
  OrderReceiveReturn as Component
};
