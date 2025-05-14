import {
  By
} from "./chunk-GXXQ33F7.mjs";
import "./chunk-PYIO3TDQ.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import {
  OrderPaymentSection,
  getPaymentsFromOrder,
  getTotalCaptured
} from "./chunk-EA4G7XL6.mjs";
import {
  formatCurrency
} from "./chunk-OV5NMSY6.mjs";
import {
  useCancelClaim,
  useCancelClaimRequest,
  useClaims
} from "./chunk-MKELWOST.mjs";
import {
  useCancelExchange,
  useCancelExchangeRequest,
  useExchanges
} from "./chunk-DCN4IKDA.mjs";
import {
  getReturnableQuantity
} from "./chunk-PXZ7QYKX.mjs";
import {
  useCancelReturn,
  useCancelReturnRequest,
  useReturns
} from "./chunk-A35MFVT3.mjs";
import {
  useCancelOrderEdit,
  useConfirmOrderEdit
} from "./chunk-5CCKT6WV.mjs";
import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
import {
  getCanceledOrderStatus,
  getOrderFulfillmentStatus,
  getOrderPaymentStatus
} from "./chunk-7DXVXBSA.mjs";
import {
  getLocaleAmount,
  getStylizedAmount,
  isAmountLessThenRoundingError
} from "./chunk-PDWBYQOW.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  getFormattedAddress,
  isSameAddress
} from "./chunk-B6ZOPCPA.mjs";
import {
  TwoColumnPage
} from "./chunk-2RQLKDBF.mjs";
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
  Skeleton,
  TwoColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useMarkPaymentCollectionAsPaid
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
import {
  useCustomer
} from "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import {
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import {
  ordersQueryKeys,
  useCancelOrder,
  useCancelOrderFulfillment,
  useCancelOrderTransfer,
  useMarkOrderFulfillmentAsDelivered,
  useOrder,
  useOrderChanges,
  useOrderLineItems,
  useOrderPreview
} from "./chunk-FNYASI54.mjs";
import {
  useReservationItems
} from "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/orders/order-detail/breadcrumb.tsx
import { jsxs } from "react/jsx-runtime";
var OrderDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { order } = useOrder(
    id,
    {
      fields: DEFAULT_FIELDS
    },
    {
      initialData: props.data,
      enabled: Boolean(id)
    }
  );
  if (!order) {
    return null;
  }
  return /* @__PURE__ */ jsxs("span", { children: [
    "#",
    order.display_id
  ] });
};

// src/routes/orders/order-detail/loader.ts
var orderDetailQuery = (id) => ({
  queryKey: ordersQueryKeys.detail(id),
  queryFn: async () => sdk.admin.order.retrieve(id, {
    fields: DEFAULT_FIELDS
  })
});
var orderLoader = async ({ params }) => {
  const id = params.id;
  const query = orderDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/orders/order-detail/order-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/orders/order-detail/components/active-order-claim-section/active-order-claim-section.tsx
import { ExclamationCircle } from "@medusajs/icons";
import { Button, Container, Heading, Text, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx, jsxs as jsxs2 } from "react/jsx-runtime";
var ActiveOrderClaimSection = ({
  orderPreview
}) => {
  const { t } = useTranslation();
  const claimId = orderPreview?.order_change?.claim_id;
  const { mutateAsync: cancelClaim } = useCancelClaimRequest(
    claimId,
    orderPreview.id
  );
  const navigate = useNavigate();
  const onContinueClaim = async () => {
    navigate(`/orders/${orderPreview.id}/claims`);
  };
  const onCancelClaim = async () => {
    await cancelClaim(void 0, {
      onSuccess: () => {
        toast.success(t("orders.claims.toast.canceledSuccessfully"));
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  if (!claimId) {
    return;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        background: "repeating-linear-gradient(-45deg, rgb(212, 212, 216, 0.15), rgb(212, 212, 216,.15) 10px, transparent 10px, transparent 20px)"
      },
      className: "-m-4 mb-1 border-b border-l p-4",
      children: /* @__PURE__ */ jsx(Container, { className: "flex items-center justify-between p-0", children: /* @__PURE__ */ jsxs2("div", { className: "flex w-full flex-row justify-between", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsxs2("div", { className: "mb-2 flex items-center gap-2 px-6 pt-4", children: [
            /* @__PURE__ */ jsx(ExclamationCircle, { className: "text-ui-fg-subtle" }),
            /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("orders.claims.panel.title") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "gap-2 px-6 pb-4", children: /* @__PURE__ */ jsx(Text, { children: t("orders.claims.panel.description") }) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
          /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", onClick: onCancelClaim, children: t("orders.claims.cancel.title") }),
          /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", onClick: onContinueClaim, children: t("actions.continue") })
        ] })
      ] }) })
    }
  );
};

// src/routes/orders/order-detail/components/active-order-exchange-section/active-order-exchange-section.tsx
import { ArrowPath } from "@medusajs/icons";
import { Button as Button2, Container as Container2, Heading as Heading2, Text as Text2, toast as toast2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate as useNavigate2 } from "react-router-dom";
import { jsx as jsx2, jsxs as jsxs3 } from "react/jsx-runtime";
var ActiveOrderExchangeSection = ({
  orderPreview
}) => {
  const { t } = useTranslation2();
  const exchangeId = orderPreview?.order_change?.exchange_id;
  const { mutateAsync: cancelExchange } = useCancelExchangeRequest(
    exchangeId,
    orderPreview.id
  );
  const navigate = useNavigate2();
  const onContinueExchange = async () => {
    navigate(`/orders/${orderPreview.id}/exchanges`);
  };
  const onCancelExchange = async () => {
    await cancelExchange(void 0, {
      onSuccess: () => {
        toast2.success(t("orders.exchanges.toast.canceledSuccessfully"));
      },
      onError: (error) => {
        toast2.error(error.message);
      }
    });
  };
  if (!exchangeId) {
    return;
  }
  return /* @__PURE__ */ jsx2(
    "div",
    {
      style: {
        background: "repeating-linear-gradient(-45deg, rgb(212, 212, 216, 0.15), rgb(212, 212, 216,.15) 10px, transparent 10px, transparent 20px)"
      },
      className: "-m-4 mb-1 border-b border-l p-4",
      children: /* @__PURE__ */ jsx2(Container2, { className: "flex items-center justify-between p-0", children: /* @__PURE__ */ jsxs3("div", { className: "flex w-full flex-row justify-between", children: [
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsxs3("div", { className: "mb-2 flex items-center gap-2 px-6 pt-4", children: [
            /* @__PURE__ */ jsx2(ArrowPath, { className: "text-ui-fg-subtle" }),
            /* @__PURE__ */ jsx2(Heading2, { level: "h2", children: t("orders.exchanges.panel.title") })
          ] }),
          /* @__PURE__ */ jsx2("div", { className: "gap-2 px-6 pb-4", children: /* @__PURE__ */ jsx2(Text2, { children: t("orders.exchanges.panel.description") }) })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
          /* @__PURE__ */ jsx2(Button2, { size: "small", variant: "secondary", onClick: onCancelExchange, children: t("orders.exchanges.cancel.title") }),
          /* @__PURE__ */ jsx2(
            Button2,
            {
              size: "small",
              variant: "secondary",
              onClick: onContinueExchange,
              children: t("actions.continue")
            }
          )
        ] })
      ] }) })
    }
  );
};

// src/routes/orders/order-detail/components/active-order-return-section/active-order-return-section.tsx
import { ArrowUturnLeft } from "@medusajs/icons";
import { Button as Button3, Container as Container3, Heading as Heading3, Text as Text3, toast as toast3 } from "@medusajs/ui";
import { useTranslation as useTranslation3 } from "react-i18next";
import { useNavigate as useNavigate3 } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs4 } from "react/jsx-runtime";
var ActiveOrderReturnSection = ({
  orderPreview
}) => {
  const { t } = useTranslation3();
  const orderChange = orderPreview?.order_change;
  const returnId = orderChange?.return_id;
  const isReturnRequest = orderChange?.change_type === "return_request" && !!orderChange.return_id;
  const { mutateAsync: cancelReturn } = useCancelReturnRequest(
    returnId,
    orderPreview.id
  );
  const navigate = useNavigate3();
  const onContinueReturn = async () => {
    navigate(`/orders/${orderPreview.id}/returns`);
  };
  const onCancelReturn = async () => {
    await cancelReturn(void 0, {
      onSuccess: () => {
        toast3.success(t("orders.returns.toast.canceledSuccessfully"));
      },
      onError: (error) => {
        toast3.error(error.message);
      }
    });
  };
  if (!returnId || !isReturnRequest) {
    return;
  }
  return /* @__PURE__ */ jsx3(
    "div",
    {
      style: {
        background: "repeating-linear-gradient(-45deg, rgb(212, 212, 216, 0.15), rgb(212, 212, 216,.15) 10px, transparent 10px, transparent 20px)"
      },
      className: "-m-4 mb-1 border-b border-l p-4",
      children: /* @__PURE__ */ jsx3(Container3, { className: "flex items-center justify-between p-0", children: /* @__PURE__ */ jsxs4("div", { className: "flex w-full flex-row justify-between", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsxs4("div", { className: "mb-2 flex items-center gap-2 px-6 pt-4", children: [
            /* @__PURE__ */ jsx3(ArrowUturnLeft, { className: "text-ui-fg-subtle" }),
            /* @__PURE__ */ jsx3(Heading3, { level: "h2", children: t("orders.returns.panel.title") })
          ] }),
          /* @__PURE__ */ jsx3("div", { className: "gap-2 px-6 pb-4", children: /* @__PURE__ */ jsx3(Text3, { children: t("orders.returns.panel.description") }) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
          /* @__PURE__ */ jsx3(Button3, { size: "small", variant: "secondary", onClick: onCancelReturn, children: t("orders.returns.cancel.title") }),
          /* @__PURE__ */ jsx3(Button3, { size: "small", variant: "secondary", onClick: onContinueReturn, children: t("actions.continue") })
        ] })
      ] }) })
    }
  );
};

// src/routes/orders/order-detail/components/order-active-edit-section/order-active-edit-section.tsx
import { Button as Button4, Container as Container4, Copy, Heading as Heading4, toast as toast4 } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { ExclamationCircleSolid } from "@medusajs/icons";
import { useMemo } from "react";
import { useNavigate as useNavigate4 } from "react-router-dom";
import { jsx as jsx4, jsxs as jsxs5 } from "react/jsx-runtime";
function EditItem({
  item,
  quantity
}) {
  return /* @__PURE__ */ jsx4("div", { className: "text-ui-fg-subtle items-center gap-x-2", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-x-2", children: [
    /* @__PURE__ */ jsxs5("div", { className: "w-fit min-w-[27px]", children: [
      /* @__PURE__ */ jsx4("span", { className: "txt-small tabular-nums", children: quantity }),
      "x"
    ] }),
    /* @__PURE__ */ jsx4(Thumbnail, { src: item.thumbnail }),
    /* @__PURE__ */ jsx4("span", { className: "txt-small text-ui-fg-subtle font-medium", children: item.title }),
    item.variant_sku && " \xB7 ",
    item.variant_sku && /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-x-1", children: [
      /* @__PURE__ */ jsx4("span", { className: "txt-small", children: item.variant_sku }),
      /* @__PURE__ */ jsx4(Copy, { content: item.variant_sku, className: "text-ui-fg-muted" })
    ] })
  ] }) }, item.id);
}
var OrderActiveEditSection = ({
  order
}) => {
  const { t } = useTranslation4();
  const navigate = useNavigate4();
  const { order: orderPreview } = useOrderPreview(order.id);
  const { mutateAsync: cancelOrderEdit } = useCancelOrderEdit(order.id);
  const { mutateAsync: confirmOrderEdit } = useConfirmOrderEdit(order.id);
  const isPending = orderPreview.order_change?.status === "pending";
  const [addedItems, removedItems] = useMemo(() => {
    const added = [];
    const removed = [];
    const orderLookupMap = new Map(order.items.map((i) => [i.id, i]));
    (orderPreview?.items || []).forEach((currentItem) => {
      const originalItem = orderLookupMap.get(currentItem.id);
      if (!originalItem) {
        added.push({ item: currentItem, quantity: currentItem.quantity });
        return;
      }
      if (originalItem.quantity > currentItem.quantity) {
        removed.push({
          item: currentItem,
          quantity: originalItem.quantity - currentItem.quantity
        });
      }
      if (originalItem.quantity < currentItem.quantity) {
        added.push({
          item: currentItem,
          quantity: currentItem.quantity - originalItem.quantity
        });
      }
    });
    return [added, removed];
  }, [orderPreview]);
  const onConfirmOrderEdit = async () => {
    try {
      await confirmOrderEdit();
      toast4.success(t("orders.edits.toast.confirmedSuccessfully"));
    } catch (e) {
      toast4.error(e.message);
    }
  };
  const onCancelOrderEdit = async () => {
    try {
      await cancelOrderEdit();
      toast4.success(t("orders.edits.toast.canceledSuccessfully"));
    } catch (e) {
      toast4.error(e.message);
    }
  };
  if (!orderPreview || orderPreview.order_change?.change_type !== "edit") {
    return null;
  }
  return /* @__PURE__ */ jsx4(
    "div",
    {
      style: {
        background: "repeating-linear-gradient(-45deg, rgb(212, 212, 216, 0.15), rgb(212, 212, 216,.15) 10px, transparent 10px, transparent 20px)"
      },
      className: "-m-4 mb-1 border-b border-l p-4",
      children: /* @__PURE__ */ jsx4(Container4, { className: "flex items-center justify-between p-0", children: /* @__PURE__ */ jsxs5("div", { className: "flex w-full flex-col divide-y divide-dashed", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 px-6 py-4", children: [
          /* @__PURE__ */ jsx4(ExclamationCircleSolid, { className: "text-blue-500" }),
          /* @__PURE__ */ jsx4(Heading4, { level: "h2", children: t(
            isPending ? "orders.edits.panel.titlePending" : "orders.edits.panel.title"
          ) })
        ] }),
        !!addedItems.length && /* @__PURE__ */ jsxs5("div", { className: "txt-small text-ui-fg-subtle flex flex-row px-6 py-4", children: [
          /* @__PURE__ */ jsx4("span", { className: "flex-1 font-medium", children: t("labels.added") }),
          /* @__PURE__ */ jsx4("div", { className: "flex flex-1 flex-col gap-y-2", children: addedItems.map(({ item, quantity }) => /* @__PURE__ */ jsx4(EditItem, { item, quantity }, item.id)) })
        ] }),
        !!removedItems.length && /* @__PURE__ */ jsxs5("div", { className: "txt-small text-ui-fg-subtle flex flex-row px-6 py-4", children: [
          /* @__PURE__ */ jsx4("span", { className: "flex-1 font-medium", children: t("labels.removed") }),
          /* @__PURE__ */ jsx4("div", { className: "flex flex-1 flex-col gap-y-2", children: removedItems.map(({ item, quantity }) => /* @__PURE__ */ jsx4(EditItem, { item, quantity }, item.id)) })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "bg-ui-bg-subtle flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
          isPending ? /* @__PURE__ */ jsx4(
            Button4,
            {
              size: "small",
              variant: "secondary",
              onClick: () => navigate(`/orders/${order.id}/edits`),
              children: t("actions.continueEdit")
            }
          ) : /* @__PURE__ */ jsx4(
            Button4,
            {
              size: "small",
              variant: "secondary",
              onClick: onConfirmOrderEdit,
              children: t("actions.forceConfirm")
            }
          ),
          /* @__PURE__ */ jsx4(
            Button4,
            {
              size: "small",
              variant: "secondary",
              onClick: onCancelOrderEdit,
              children: t("actions.cancel")
            }
          )
        ] })
      ] }) })
    }
  );
};

// src/routes/orders/order-detail/components/order-activity-section/order-activity-section.tsx
import { Container as Container5, Heading as Heading5 } from "@medusajs/ui";
import { useTranslation as useTranslation8 } from "react-i18next";

// src/routes/orders/order-detail/components/order-activity-section/order-timeline.tsx
import { Button as Button5, Text as Text6, Tooltip, clx, usePrompt } from "@medusajs/ui";
import { Collapsible as RadixCollapsible } from "radix-ui";
import { useMemo as useMemo2, useState as useState3 } from "react";
import { useTranslation as useTranslation7 } from "react-i18next";

// src/routes/orders/order-detail/components/order-activity-section/activity-items.tsx
import { Popover, Text as Text4 } from "@medusajs/ui";
import { useState } from "react";
import { useTranslation as useTranslation5 } from "react-i18next";
import { jsx as jsx5, jsxs as jsxs6 } from "react/jsx-runtime";
function ActivityItems(props) {
  const { t } = useTranslation5();
  const [open, setOpen] = useState(false);
  const itemsToSend = props.itemsToSend;
  const itemsToReturn = props.itemsToReturn;
  const itemsMap = props.itemsMap;
  const title = props.title;
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  if (!itemsToSend?.length && !itemsToReturn?.length) {
    return;
  }
  return /* @__PURE__ */ jsxs6(Popover, { open, children: [
    /* @__PURE__ */ jsx5(
      Popover.Trigger,
      {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        autoFocus: false,
        className: "focus-visible:outline-none",
        children: /* @__PURE__ */ jsx5(Text4, { size: "small", leading: "compact", weight: "plus", children: title })
      }
    ),
    /* @__PURE__ */ jsx5(
      Popover.Content,
      {
        align: "center",
        side: "top",
        className: "bg-ui-bg-component max-w-[200px] p-0 focus-visible:outline-none",
        children: /* @__PURE__ */ jsxs6("div", { className: "flex flex-col", children: [
          !!itemsToSend?.length && /* @__PURE__ */ jsxs6("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx5("div", { className: "txt-compact-small-plus mb-1", children: t("orders.activity.events.common.toSend") }),
            /* @__PURE__ */ jsxs6("div", { className: "flex flex-col", children: [
              itemsToSend?.map((item) => {
                const originalItem = itemsMap?.get(item.item_id);
                return /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-x-3", children: [
                  /* @__PURE__ */ jsxs6(Text4, { size: "small", className: "text-ui-fg-subtle", children: [
                    item.quantity,
                    "x"
                  ] }),
                  /* @__PURE__ */ jsx5(Thumbnail, { src: originalItem?.thumbnail }),
                  /* @__PURE__ */ jsx5(Text4, { className: "txt-compact-small text-ui-fg-subtle truncate", children: `${originalItem?.variant_title} \xB7 ${originalItem?.product_title}` })
                ] }, item.id);
              }),
              /* @__PURE__ */ jsx5("div", { className: "flex flex-1 flex-row items-center gap-2" })
            ] })
          ] }),
          !!itemsToReturn?.length && /* @__PURE__ */ jsxs6("div", { className: "border-t-2 border-dotted p-3", children: [
            /* @__PURE__ */ jsx5("div", { className: "txt-compact-small-plus mb-1", children: t("orders.activity.events.common.toReturn") }),
            /* @__PURE__ */ jsxs6("div", { className: "flex flex-col", children: [
              itemsToReturn?.map((item) => {
                const originalItem = itemsMap?.get(item.item_id);
                return /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-x-3", children: [
                  /* @__PURE__ */ jsxs6(Text4, { size: "small", className: "text-ui-fg-subtle", children: [
                    item.quantity,
                    "x"
                  ] }),
                  /* @__PURE__ */ jsx5(Thumbnail, { src: originalItem?.thumbnail }),
                  /* @__PURE__ */ jsx5(Text4, { className: "txt-compact-small text-ui-fg-subtle truncate", children: `${originalItem?.variant_title} \xB7 ${originalItem?.product_title}` })
                ] }, item.id);
              }),
              /* @__PURE__ */ jsx5("div", { className: "flex flex-1 flex-row items-center gap-2" })
            ] })
          ] })
        ] })
      }
    )
  ] });
}
var activity_items_default = ActivityItems;

// src/routes/orders/order-detail/components/order-activity-section/change-details-tooltip.tsx
import { Popover as Popover2, Text as Text5 } from "@medusajs/ui";
import { useState as useState2 } from "react";
import { useTranslation as useTranslation6 } from "react-i18next";
import { jsx as jsx6, jsxs as jsxs7 } from "react/jsx-runtime";
function ChangeDetailsTooltip(props) {
  const { t } = useTranslation6();
  const [open, setOpen] = useState2(false);
  const previous = props.previous;
  const next = props.next;
  const title = props.title;
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  if (!previous && !next) {
    return null;
  }
  return /* @__PURE__ */ jsxs7(Popover2, { open, children: [
    /* @__PURE__ */ jsx6(
      Popover2.Trigger,
      {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        autoFocus: false,
        className: "focus-visible:outline-none",
        children: /* @__PURE__ */ jsx6(Text5, { size: "small", leading: "compact", weight: "plus", children: title })
      }
    ),
    /* @__PURE__ */ jsx6(
      Popover2.Content,
      {
        align: "center",
        side: "top",
        className: "bg-ui-bg-component max-w-[200px] p-0 focus-visible:outline-none",
        children: /* @__PURE__ */ jsxs7("div", { className: "flex flex-col", children: [
          !!previous && /* @__PURE__ */ jsxs7("div", { className: "p-3", children: [
            /* @__PURE__ */ jsx6("div", { className: "txt-compact-small-plus mb-1", children: t("labels.from") }),
            /* @__PURE__ */ jsx6("p", { className: "txt-compact-small text-ui-fg-subtle", children: previous })
          ] }),
          !!next && /* @__PURE__ */ jsxs7("div", { className: "border-t-2 border-dotted p-3", children: [
            /* @__PURE__ */ jsx6("div", { className: "txt-compact-small-plus mb-1", children: t("labels.to") }),
            /* @__PURE__ */ jsx6("p", { className: "txt-compact-small text-ui-fg-subtle", children: next })
          ] })
        ] })
      }
    )
  ] });
}
var change_details_tooltip_default = ChangeDetailsTooltip;

// src/routes/orders/order-detail/components/order-activity-section/order-timeline.tsx
import { Fragment, jsx as jsx7, jsxs as jsxs8 } from "react/jsx-runtime";
var NON_RMA_CHANGE_TYPES = ["transfer", "update_order"];
var OrderTimeline = ({ order }) => {
  const items = useActivityItems(order);
  if (items.length <= 3) {
    return /* @__PURE__ */ jsx7("div", { className: "flex flex-col gap-y-0.5", children: items.map((item, index) => {
      return /* @__PURE__ */ jsx7(
        OrderActivityItem,
        {
          title: item.title,
          timestamp: item.timestamp,
          isFirst: index === items.length - 1,
          itemsToSend: item.itemsToSend,
          itemsToReturn: item.itemsToReturn,
          itemsMap: item.itemsMap,
          children: item.children
        },
        index
      );
    }) });
  }
  const lastItems = items.slice(0, 2);
  const collapsibleItems = items.slice(2, items.length - 1);
  const firstItem = items[items.length - 1];
  return /* @__PURE__ */ jsxs8("div", { className: "flex flex-col gap-y-0.5", children: [
    lastItems.map((item, index) => {
      return /* @__PURE__ */ jsx7(
        OrderActivityItem,
        {
          title: item.title,
          timestamp: item.timestamp,
          itemsToSend: item.itemsToSend,
          itemsToReturn: item.itemsToReturn,
          itemsMap: item.itemsMap,
          children: item.children
        },
        index
      );
    }),
    /* @__PURE__ */ jsx7(OrderActivityCollapsible, { activities: collapsibleItems }),
    /* @__PURE__ */ jsx7(
      OrderActivityItem,
      {
        title: firstItem.title,
        timestamp: firstItem.timestamp,
        isFirst: true,
        itemsToSend: firstItem.itemsToSend,
        itemsToReturn: firstItem.itemsToReturn,
        itemsMap: firstItem.itemsMap,
        children: firstItem.children
      }
    )
  ] });
};
var useActivityItems = (order) => {
  const { t } = useTranslation7();
  const { order_changes: orderChanges = [] } = useOrderChanges(order.id, {
    change_type: [
      "edit",
      "claim",
      "exchange",
      "return",
      "transfer",
      "update_order"
    ]
  });
  const rmaChanges = orderChanges.filter(
    (oc) => !NON_RMA_CHANGE_TYPES.includes(oc.change_type)
  );
  const missingLineItemIds = getMissingLineItemIds(order, rmaChanges);
  const { order_items: removedLineItems = [] } = useOrderLineItems(
    order.id,
    {
      fields: "+quantity",
      item_id: missingLineItemIds
    },
    {
      enabled: !!rmaChanges.length
    }
  );
  const itemsMap = useMemo2(() => {
    const _itemsMap = new Map(order?.items?.map((i) => [i.id, i]));
    for (const id of missingLineItemIds) {
      const i = removedLineItems.find((i2) => i2.item.id === id);
      if (i) {
        _itemsMap.set(id, { ...i.item, quantity: i.quantity });
      }
    }
    return _itemsMap;
  }, [order.items, removedLineItems, missingLineItemIds]);
  const { returns = [] } = useReturns({
    order_id: order.id,
    fields: "+received_at,*items"
  });
  const { claims = [] } = useClaims({
    order_id: order.id,
    fields: "*additional_items"
  });
  const { exchanges = [] } = useExchanges({
    order_id: order.id,
    fields: "*additional_items"
  });
  const payments = getPaymentsFromOrder(order);
  const notes = [];
  const isLoading = false;
  return useMemo2(() => {
    if (isLoading) {
      return [];
    }
    const items = [];
    for (const payment of payments) {
      const amount = payment.amount;
      items.push({
        title: t("orders.activity.events.payment.awaiting"),
        timestamp: payment.created_at,
        children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: getStylizedAmount(amount, payment.currency_code) })
      });
      if (payment.canceled_at) {
        items.push({
          title: t("orders.activity.events.payment.canceled"),
          timestamp: payment.canceled_at,
          children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: getStylizedAmount(amount, payment.currency_code) })
        });
      }
      if (payment.captured_at) {
        items.push({
          title: t("orders.activity.events.payment.captured"),
          timestamp: payment.captured_at,
          children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: getStylizedAmount(amount, payment.currency_code) })
        });
      }
      for (const refund of payment.refunds || []) {
        items.push({
          title: t("orders.activity.events.payment.refunded"),
          timestamp: refund.created_at,
          children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: getStylizedAmount(
            refund.amount,
            payment.currency_code
          ) })
        });
      }
    }
    for (const fulfillment of order.fulfillments || []) {
      items.push({
        title: t("orders.activity.events.fulfillment.created"),
        timestamp: fulfillment.created_at,
        children: /* @__PURE__ */ jsx7(FulfillmentCreatedBody, { fulfillment })
      });
      if (fulfillment.delivered_at) {
        items.push({
          title: t("orders.activity.events.fulfillment.delivered"),
          timestamp: fulfillment.delivered_at,
          children: /* @__PURE__ */ jsx7(FulfillmentCreatedBody, { fulfillment })
        });
      }
      if (fulfillment.shipped_at) {
        items.push({
          title: t("orders.activity.events.fulfillment.shipped"),
          timestamp: fulfillment.shipped_at,
          children: /* @__PURE__ */ jsx7(FulfillmentCreatedBody, { fulfillment, isShipment: true })
        });
      }
      if (fulfillment.canceled_at) {
        items.push({
          title: t("orders.activity.events.fulfillment.canceled"),
          timestamp: fulfillment.canceled_at
        });
      }
    }
    const returnMap = /* @__PURE__ */ new Map();
    for (const ret of returns) {
      returnMap.set(ret.id, ret);
      if (ret.claim_id || ret.exchange_id) {
        continue;
      }
      items.push({
        title: t("orders.activity.events.return.created", {
          returnId: ret.id.slice(-7)
        }),
        timestamp: ret.created_at,
        itemsToReturn: ret?.items,
        itemsMap,
        children: /* @__PURE__ */ jsx7(ReturnBody, { orderReturn: ret, isCreated: !ret.canceled_at })
      });
      if (ret.canceled_at) {
        items.push({
          title: t("orders.activity.events.return.canceled", {
            returnId: ret.id.slice(-7)
          }),
          timestamp: ret.canceled_at
        });
      }
      if (ret.status === "received" || ret.status === "partially_received") {
        items.push({
          title: t("orders.activity.events.return.received", {
            returnId: ret.id.slice(-7)
          }),
          timestamp: ret.received_at,
          itemsToReturn: ret?.items,
          itemsMap,
          children: /* @__PURE__ */ jsx7(ReturnBody, { orderReturn: ret, isReceived: true })
        });
      }
    }
    for (const claim of claims) {
      const claimReturn = returnMap.get(claim.return_id);
      items.push({
        title: t(
          claim.canceled_at ? "orders.activity.events.claim.canceled" : "orders.activity.events.claim.created",
          {
            claimId: claim.id.slice(-7)
          }
        ),
        timestamp: claim.canceled_at || claim.created_at,
        itemsToSend: claim.additional_items,
        itemsToReturn: claimReturn?.items,
        itemsMap,
        children: /* @__PURE__ */ jsx7(ClaimBody, { claim, claimReturn })
      });
    }
    for (const exchange of exchanges) {
      const exchangeReturn = returnMap.get(exchange.return_id);
      items.push({
        title: t(
          exchange.canceled_at ? "orders.activity.events.exchange.canceled" : "orders.activity.events.exchange.created",
          {
            exchangeId: exchange.id.slice(-7)
          }
        ),
        timestamp: exchange.canceled_at || exchange.created_at,
        itemsToSend: exchange.additional_items,
        itemsToReturn: exchangeReturn?.items,
        itemsMap,
        children: /* @__PURE__ */ jsx7(ExchangeBody, { exchange, exchangeReturn })
      });
    }
    for (const edit of orderChanges.filter((oc) => oc.change_type === "edit")) {
      const isConfirmed = edit.status === "confirmed";
      const isPending = edit.status === "pending";
      if (isPending) {
        continue;
      }
      items.push({
        title: t(`orders.activity.events.edit.${edit.status}`, {
          editId: edit.id.slice(-7)
        }),
        timestamp: edit.status === "requested" ? edit.requested_at : edit.status === "confirmed" ? edit.confirmed_at : edit.status === "declined" ? edit.declined_at : edit.status === "canceled" ? edit.canceled_at : edit.created_at,
        children: isConfirmed ? /* @__PURE__ */ jsx7(OrderEditBody, { edit }) : null
      });
    }
    for (const transfer of orderChanges.filter(
      (oc) => oc.change_type === "transfer"
    )) {
      if (transfer.requested_at) {
        items.push({
          title: t(`orders.activity.events.transfer.requested`, {
            transferId: transfer.id.slice(-7)
          }),
          timestamp: transfer.requested_at,
          children: /* @__PURE__ */ jsx7(TransferOrderRequestBody, { transfer })
        });
      }
      if (transfer.confirmed_at) {
        items.push({
          title: t(`orders.activity.events.transfer.confirmed`, {
            transferId: transfer.id.slice(-7)
          }),
          timestamp: transfer.confirmed_at
        });
      }
      if (transfer.declined_at) {
        items.push({
          title: t(`orders.activity.events.transfer.declined`, {
            transferId: transfer.id.slice(-7)
          }),
          timestamp: transfer.declined_at
        });
      }
    }
    for (const update of orderChanges.filter(
      (oc) => oc.change_type === "update_order"
    )) {
      const updateType = update.actions[0]?.details?.type;
      if (updateType === "shipping_address") {
        items.push({
          title: /* @__PURE__ */ jsx7(
            change_details_tooltip_default,
            {
              title: t(`orders.activity.events.update_order.shipping_address`),
              previous: getFormattedAddress({
                address: update.actions[0].details.old
              }).join(", "),
              next: getFormattedAddress({
                address: update.actions[0].details.new
              }).join(", ")
            }
          ),
          timestamp: update.created_at,
          children: /* @__PURE__ */ jsxs8("div", { className: "text-ui-fg-subtle mt-2 flex gap-x-2 text-sm", children: [
            t("fields.by"),
            " ",
            /* @__PURE__ */ jsx7(By, { id: update.created_by })
          ] })
        });
      }
      if (updateType === "billing_address") {
        items.push({
          title: /* @__PURE__ */ jsx7(
            change_details_tooltip_default,
            {
              title: t(`orders.activity.events.update_order.billing_address`),
              previous: getFormattedAddress({
                address: update.actions[0].details.old
              }).join(", "),
              next: getFormattedAddress({
                address: update.actions[0].details.new
              }).join(", ")
            }
          ),
          timestamp: update.created_at,
          children: /* @__PURE__ */ jsxs8("div", { className: "text-ui-fg-subtle mt-2 flex gap-x-2 text-sm", children: [
            t("fields.by"),
            " ",
            /* @__PURE__ */ jsx7(By, { id: update.created_by })
          ] })
        });
      }
      if (updateType === "email") {
        items.push({
          title: /* @__PURE__ */ jsx7(
            change_details_tooltip_default,
            {
              title: t(`orders.activity.events.update_order.email`),
              previous: update.actions[0].details.old,
              next: update.actions[0].details.new
            }
          ),
          timestamp: update.created_at,
          children: /* @__PURE__ */ jsxs8("div", { className: "text-ui-fg-subtle mt-2 flex gap-x-2 text-sm", children: [
            t("fields.by"),
            " ",
            /* @__PURE__ */ jsx7(By, { id: update.created_by })
          ] })
        });
      }
    }
    if (order.canceled_at) {
      items.push({
        title: t("orders.activity.events.canceled.title"),
        timestamp: order.canceled_at
      });
    }
    const sortedActivities = items.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    const createdAt = {
      title: t("orders.activity.events.placed.title"),
      timestamp: order.created_at,
      children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: getStylizedAmount(order.total, order.currency_code) })
    };
    return [...sortedActivities, createdAt];
  }, [
    order,
    payments,
    returns,
    exchanges,
    orderChanges,
    notes,
    isLoading,
    itemsMap
  ]);
};
var OrderActivityItem = ({
  title,
  timestamp,
  isFirst = false,
  children,
  itemsToSend,
  itemsToReturn,
  itemsMap
}) => {
  const { getFullDate, getRelativeDate } = useDate();
  return /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-[20px_1fr] items-start gap-2", children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex size-full flex-col items-center gap-y-0.5", children: [
      /* @__PURE__ */ jsx7("div", { className: "flex size-5 items-center justify-center", children: /* @__PURE__ */ jsx7("div", { className: "bg-ui-bg-base shadow-borders-base flex size-2.5 items-center justify-center rounded-full", children: /* @__PURE__ */ jsx7("div", { className: "bg-ui-tag-neutral-icon size-1.5 rounded-full" }) }) }),
      !isFirst && /* @__PURE__ */ jsx7("div", { className: "bg-ui-border-base w-px flex-1" })
    ] }),
    /* @__PURE__ */ jsxs8(
      "div",
      {
        className: clx({
          "pb-4": !isFirst
        }),
        children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between", children: [
            itemsToSend?.length || itemsToReturn?.length ? /* @__PURE__ */ jsx7(
              activity_items_default,
              {
                title,
                itemsToSend,
                itemsToReturn,
                itemsMap
              },
              title
            ) : /* @__PURE__ */ jsx7(Text6, { size: "small", leading: "compact", weight: "plus", children: title }),
            timestamp && /* @__PURE__ */ jsx7(
              Tooltip,
              {
                content: getFullDate({ date: timestamp, includeTime: true }),
                children: /* @__PURE__ */ jsx7(
                  Text6,
                  {
                    size: "small",
                    leading: "compact",
                    className: "text-ui-fg-subtle text-right",
                    children: getRelativeDate(timestamp)
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx7("div", { children })
        ]
      }
    )
  ] });
};
var OrderActivityCollapsible = ({
  activities
}) => {
  const [open, setOpen] = useState3(false);
  const { t } = useTranslation7();
  if (!activities.length) {
    return null;
  }
  return /* @__PURE__ */ jsxs8(RadixCollapsible.Root, { open, onOpenChange: setOpen, children: [
    !open && /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-[20px_1fr] items-start gap-2", children: [
      /* @__PURE__ */ jsx7("div", { className: "flex size-full flex-col items-center", children: /* @__PURE__ */ jsx7("div", { className: "border-ui-border-strong w-px flex-1 bg-[linear-gradient(var(--border-strong)_33%,rgba(255,255,255,0)_0%)] bg-[length:1px_3px] bg-right bg-repeat-y" }) }),
      /* @__PURE__ */ jsx7("div", { className: "pb-4", children: /* @__PURE__ */ jsx7(RadixCollapsible.Trigger, { className: "text-left", children: /* @__PURE__ */ jsx7(
        Text6,
        {
          size: "small",
          leading: "compact",
          weight: "plus",
          className: "text-ui-fg-muted",
          children: t("orders.activity.showMoreActivities", {
            count: activities.length
          })
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx7(RadixCollapsible.Content, { children: /* @__PURE__ */ jsx7("div", { className: "flex flex-col gap-y-0.5", children: activities.map((item, index) => {
      return /* @__PURE__ */ jsx7(
        OrderActivityItem,
        {
          title: item.title,
          timestamp: item.timestamp,
          itemsToSend: item.itemsToSend,
          itemsToReturn: item.itemsToReturn,
          itemsMap: item.itemsMap,
          children: item.children
        },
        index
      );
    }) }) })
  ] });
};
var FulfillmentCreatedBody = ({
  fulfillment
}) => {
  const { t } = useTranslation7();
  const numberOfItems = fulfillment.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  return /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.fulfillment.items", {
    count: numberOfItems
  }) }) });
};
var ReturnBody = ({
  orderReturn,
  isCreated,
  isReceived
}) => {
  const prompt = usePrompt();
  const { t } = useTranslation7();
  const { mutateAsync: cancelReturnRequest } = useCancelReturn(
    orderReturn.id,
    orderReturn.order_id
  );
  const onCancel = async () => {
    const res = await prompt({
      title: t("orders.returns.cancel.title"),
      description: t("orders.returns.cancel.description"),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await cancelReturnRequest();
  };
  const numberOfItems = orderReturn.items.reduce((acc, item) => {
    return acc + (isReceived ? item.received_quantity : item.quantity);
  }, 0);
  return /* @__PURE__ */ jsxs8("div", { className: "flex items-start gap-1", children: [
    /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.return.items", {
      count: numberOfItems
    }) }),
    isCreated && /* @__PURE__ */ jsxs8(Fragment, { children: [
      /* @__PURE__ */ jsx7("div", { className: "mt-[2px] flex items-center leading-none", children: "\u22C5" }),
      /* @__PURE__ */ jsx7(
        Button5,
        {
          onClick: onCancel,
          className: "text-ui-fg-subtle h-auto px-0 leading-none hover:bg-transparent",
          variant: "transparent",
          size: "small",
          children: t("actions.cancel")
        }
      )
    ] })
  ] });
};
var ClaimBody = ({
  claim,
  claimReturn
}) => {
  const prompt = usePrompt();
  const { t } = useTranslation7();
  const isCanceled = !!claim.created_at;
  const { mutateAsync: cancelClaim } = useCancelClaim(claim.id, claim.order_id);
  const onCancel = async () => {
    const res = await prompt({
      title: t("orders.claims.cancel.title"),
      description: t("orders.claims.cancel.description"),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await cancelClaim();
  };
  const outboundItems = (claim.additional_items || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const inboundItems = (claimReturn?.items || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return /* @__PURE__ */ jsxs8("div", { children: [
    outboundItems > 0 && /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.claim.itemsInbound", {
      count: outboundItems
    }) }),
    inboundItems > 0 && /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.claim.itemsOutbound", {
      count: inboundItems
    }) }),
    !isCanceled && /* @__PURE__ */ jsx7(
      Button5,
      {
        onClick: onCancel,
        className: "text-ui-fg-subtle h-auto px-0 leading-none hover:bg-transparent",
        variant: "transparent",
        size: "small",
        children: t("actions.cancel")
      }
    )
  ] });
};
var ExchangeBody = ({
  exchange,
  exchangeReturn
}) => {
  const prompt = usePrompt();
  const { t } = useTranslation7();
  const isCanceled = !!exchange.canceled_at;
  const { mutateAsync: cancelExchange } = useCancelExchange(
    exchange.id,
    exchange.order_id
  );
  const onCancel = async () => {
    const res = await prompt({
      title: t("orders.exchanges.cancel.title"),
      description: t("orders.exchanges.cancel.description"),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await cancelExchange();
  };
  const outboundItems = (exchange.additional_items || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const inboundItems = (exchangeReturn?.items || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return /* @__PURE__ */ jsxs8("div", { children: [
    outboundItems > 0 && /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.exchange.itemsInbound", {
      count: outboundItems
    }) }),
    inboundItems > 0 && /* @__PURE__ */ jsx7(Text6, { size: "small", className: "text-ui-fg-subtle", children: t("orders.activity.events.exchange.itemsOutbound", {
      count: inboundItems
    }) }),
    !isCanceled && /* @__PURE__ */ jsx7(
      Button5,
      {
        onClick: onCancel,
        className: "text-ui-fg-subtle h-auto px-0 leading-none hover:bg-transparent",
        variant: "transparent",
        size: "small",
        children: t("actions.cancel")
      }
    )
  ] });
};
var OrderEditBody = ({ edit }) => {
  const { t } = useTranslation7();
  const [itemsAdded, itemsRemoved] = useMemo2(
    () => countItemsChange(edit.actions),
    [edit]
  );
  return /* @__PURE__ */ jsxs8("div", { children: [
    itemsAdded > 0 && /* @__PURE__ */ jsxs8(Text6, { size: "small", className: "text-ui-fg-subtle", children: [
      t("labels.added"),
      ": ",
      itemsAdded
    ] }),
    itemsRemoved > 0 && /* @__PURE__ */ jsxs8(Text6, { size: "small", className: "text-ui-fg-subtle", children: [
      t("labels.removed"),
      ": ",
      itemsRemoved
    ] })
  ] });
};
var TransferOrderRequestBody = ({
  transfer
}) => {
  const prompt = usePrompt();
  const { t } = useTranslation7();
  const action = transfer.actions[0];
  const { customer } = useCustomer(action.reference_id);
  const isCompleted = !!transfer.confirmed_at;
  const { mutateAsync: cancelTransfer } = useCancelOrderTransfer(
    transfer.order_id
  );
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("actions.cannotUndo"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await cancelTransfer();
  };
  return /* @__PURE__ */ jsxs8("div", { children: [
    /* @__PURE__ */ jsxs8(Text6, { size: "small", className: "text-ui-fg-subtle", children: [
      t("orders.activity.from"),
      ": ",
      action.details?.original_email
    ] }),
    /* @__PURE__ */ jsxs8(Text6, { size: "small", className: "text-ui-fg-subtle", children: [
      t("orders.activity.to"),
      ":",
      " ",
      customer?.first_name ? `${customer?.first_name} ${customer?.last_name}` : customer?.email
    ] }),
    !isCompleted && /* @__PURE__ */ jsx7(
      Button5,
      {
        onClick: handleDelete,
        className: "text-ui-fg-subtle h-auto px-0 leading-none hover:bg-transparent",
        variant: "transparent",
        size: "small",
        children: t("actions.cancel")
      }
    )
  ] });
};
function countItemsChange(actions) {
  let added = 0;
  let removed = 0;
  actions.forEach((action) => {
    if (action.action === "ITEM_ADD") {
      added += action.details.quantity;
    }
    if (action.action === "ITEM_UPDATE") {
      const quantityDiff = action.details.quantity_diff;
      if (quantityDiff > 0) {
        added += quantityDiff;
      } else {
        removed += Math.abs(quantityDiff);
      }
    }
  });
  return [added, removed];
}
function getMissingLineItemIds(order, changes) {
  if (!changes?.length) {
    return [];
  }
  const retIds = /* @__PURE__ */ new Set();
  const existingItemsMap = new Map(order.items.map((item) => [item.id, true]));
  changes.forEach((change) => {
    change.actions.forEach((action) => {
      if (!action.details?.reference_id) {
        return;
      }
      if (action.details.reference_id.startsWith("ordli_") && !existingItemsMap.has(action.details.reference_id)) {
        retIds.add(action.details.reference_id);
      }
    });
  });
  return Array.from(retIds);
}

// src/routes/orders/order-detail/components/order-activity-section/order-activity-section.tsx
import { jsx as jsx8, jsxs as jsxs9 } from "react/jsx-runtime";
var OrderActivitySection = ({ order }) => {
  const { t } = useTranslation8();
  return /* @__PURE__ */ jsxs9(Container5, { className: "flex flex-col gap-y-8 px-6 py-4", children: [
    /* @__PURE__ */ jsx8("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsx8("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx8(Heading5, { level: "h2", children: t("orders.activity.header") }) }) }),
    /* @__PURE__ */ jsx8(OrderTimeline, { order })
  ] });
};

// src/routes/orders/order-detail/components/order-customer-section/order-customer-section.tsx
import { Container as Container6, Heading as Heading6 } from "@medusajs/ui";
import { useTranslation as useTranslation10 } from "react-i18next";
import { ArrowPath as ArrowPath2, CurrencyDollar, Envelope, FlyingBox } from "@medusajs/icons";

// src/components/common/customer-info/customer-info.tsx
import { Avatar, Copy as Copy2, Text as Text7 } from "@medusajs/ui";
import { useTranslation as useTranslation9 } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx as jsx9, jsxs as jsxs10 } from "react/jsx-runtime";
var ID = ({ data }) => {
  const { t } = useTranslation9();
  const id = data.customer_id;
  const name = getOrderCustomer(data);
  const email = data.email;
  const fallback = (name || email || "").charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxs10("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
    /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", weight: "plus", children: t("fields.id") }),
    /* @__PURE__ */ jsx9(
      Link,
      {
        to: `/customers/${id}`,
        className: "focus:shadow-borders-focus rounded-[4px] outline-none transition-shadow",
        children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-x-2 overflow-hidden", children: [
          /* @__PURE__ */ jsx9(Avatar, { size: "2xsmall", fallback }),
          /* @__PURE__ */ jsx9(
            Text7,
            {
              size: "small",
              leading: "compact",
              className: "text-ui-fg-subtle hover:text-ui-fg-base transition-fg truncate",
              children: name || email
            }
          )
        ] })
      }
    )
  ] });
};
var Company = ({ data }) => {
  const { t } = useTranslation9();
  const company = data.shipping_address?.company || data.billing_address?.company;
  if (!company) {
    return null;
  }
  return /* @__PURE__ */ jsxs10("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
    /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", weight: "plus", children: t("fields.company") }),
    /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", className: "truncate", children: company })
  ] });
};
var Contact = ({ data }) => {
  const { t } = useTranslation9();
  const phone = data.shipping_address?.phone || data.billing_address?.phone;
  const email = data.email || "";
  return /* @__PURE__ */ jsxs10("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4", children: [
    /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", weight: "plus", children: t("orders.customer.contactLabel") }),
    /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-y-2", children: [
      /* @__PURE__ */ jsxs10("div", { className: "grid grid-cols-[1fr_20px] items-start gap-x-2", children: [
        /* @__PURE__ */ jsx9(
          Text7,
          {
            size: "small",
            leading: "compact",
            className: "text-pretty break-all",
            children: email
          }
        ),
        /* @__PURE__ */ jsx9("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx9(Copy2, { content: email, className: "text-ui-fg-muted" }) })
      ] }),
      phone && /* @__PURE__ */ jsxs10("div", { className: "grid grid-cols-[1fr_20px] items-start gap-x-2", children: [
        /* @__PURE__ */ jsx9(
          Text7,
          {
            size: "small",
            leading: "compact",
            className: "text-pretty break-all",
            children: phone
          }
        ),
        /* @__PURE__ */ jsx9("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx9(Copy2, { content: email, className: "text-ui-fg-muted" }) })
      ] })
    ] })
  ] });
};
var AddressPrint = ({
  address,
  type
}) => {
  const { t } = useTranslation9();
  return /* @__PURE__ */ jsxs10("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4", children: [
    /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", weight: "plus", children: type === "shipping" ? t("addresses.shippingAddress.label") : t("addresses.billingAddress.label") }),
    address ? /* @__PURE__ */ jsxs10("div", { className: "grid grid-cols-[1fr_20px] items-start gap-x-2", children: [
      /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", children: getFormattedAddress({ address }).map((line, i) => {
        return /* @__PURE__ */ jsxs10("span", { className: "break-words", children: [
          line,
          /* @__PURE__ */ jsx9("br", {})
        ] }, i);
      }) }),
      /* @__PURE__ */ jsx9("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx9(
        Copy2,
        {
          content: getFormattedAddress({ address }).join("\n"),
          className: "text-ui-fg-muted"
        }
      ) })
    ] }) : /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", children: "-" })
  ] });
};
var Addresses = ({ data }) => {
  const { t } = useTranslation9();
  return /* @__PURE__ */ jsxs10("div", { className: "divide-y", children: [
    /* @__PURE__ */ jsx9(AddressPrint, { address: data.shipping_address, type: "shipping" }),
    !isSameAddress(data.shipping_address, data.billing_address) ? /* @__PURE__ */ jsx9(AddressPrint, { address: data.billing_address, type: "billing" }) : /* @__PURE__ */ jsxs10("div", { className: "grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx9(
        Text7,
        {
          size: "small",
          leading: "compact",
          weight: "plus",
          className: "text-ui-fg-subtle",
          children: t("addresses.billingAddress.label")
        }
      ),
      /* @__PURE__ */ jsx9(Text7, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: t("addresses.billingAddress.sameAsShipping") })
    ] })
  ] });
};
var CustomerInfo = Object.assign(
  {},
  {
    ID,
    Company,
    Contact,
    Addresses
  }
);
var getOrderCustomer = (obj) => {
  const { first_name: sFirstName, last_name: sLastName } = obj.shipping_address || {};
  const { first_name: bFirstName, last_name: bLastName } = obj.billing_address || {};
  const { first_name: cFirstName, last_name: cLastName } = obj.customer || {};
  const customerName = [cFirstName, cLastName].filter(Boolean).join(" ");
  const shippingName = [sFirstName, sLastName].filter(Boolean).join(" ");
  const billingName = [bFirstName, bLastName].filter(Boolean).join(" ");
  const name = customerName || shippingName || billingName;
  return name;
};

// src/routes/orders/order-detail/components/order-customer-section/order-customer-section.tsx
import { jsx as jsx10, jsxs as jsxs11 } from "react/jsx-runtime";
var OrderCustomerSection = ({ order }) => {
  return /* @__PURE__ */ jsxs11(Container6, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx10(Header, {}),
    /* @__PURE__ */ jsx10(CustomerInfo.ID, { data: order }),
    /* @__PURE__ */ jsx10(CustomerInfo.Contact, { data: order }),
    /* @__PURE__ */ jsx10(CustomerInfo.Company, { data: order }),
    /* @__PURE__ */ jsx10(CustomerInfo.Addresses, { data: order })
  ] });
};
var Header = () => {
  const { t } = useTranslation10();
  return /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsx10(Heading6, { level: "h2", children: t("fields.customer") }),
    /* @__PURE__ */ jsx10(
      ActionMenu,
      {
        groups: [
          {
            actions: [
              {
                label: t("transferOwnership.label"),
                to: `transfer`,
                icon: /* @__PURE__ */ jsx10(ArrowPath2, {})
              }
            ]
          },
          {
            actions: [
              {
                label: t("addresses.shippingAddress.editLabel"),
                to: "shipping-address",
                icon: /* @__PURE__ */ jsx10(FlyingBox, {})
              },
              {
                label: t("addresses.billingAddress.editLabel"),
                to: "billing-address",
                icon: /* @__PURE__ */ jsx10(CurrencyDollar, {})
              }
            ]
          },
          {
            actions: [
              {
                label: t("email.editLabel"),
                to: `email`,
                icon: /* @__PURE__ */ jsx10(Envelope, {})
              }
            ]
          }
        ]
      }
    )
  ] });
};

// src/routes/orders/order-detail/components/order-fulfillment-section/order-fulfillment-section.tsx
import { Buildings, XCircle } from "@medusajs/icons";
import {
  Button as Button6,
  Container as Container7,
  Copy as Copy3,
  Heading as Heading7,
  StatusBadge,
  Text as Text8,
  Tooltip as Tooltip2,
  toast as toast5,
  usePrompt as usePrompt2
} from "@medusajs/ui";
import { format } from "date-fns";
import { useTranslation as useTranslation11 } from "react-i18next";
import { Link as Link2, useNavigate as useNavigate5 } from "react-router-dom";
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs12 } from "react/jsx-runtime";
var OrderFulfillmentSection = ({
  order
}) => {
  const fulfillments = order.fulfillments || [];
  return /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-y-3", children: [
    /* @__PURE__ */ jsx11(UnfulfilledItemBreakdown, { order }),
    fulfillments.map((f, index) => /* @__PURE__ */ jsx11(Fulfillment, { index, fulfillment: f, order }, f.id))
  ] });
};
var UnfulfilledItem = ({
  item,
  currencyCode
}) => {
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4",
      children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-x-4", children: [
          /* @__PURE__ */ jsx11(Thumbnail, { src: item.thumbnail }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx11(
              Text8,
              {
                size: "small",
                leading: "compact",
                weight: "plus",
                className: "text-ui-fg-base",
                children: item.title
              }
            ),
            item.variant_sku && /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-x-1", children: [
              /* @__PURE__ */ jsx11(Text8, { size: "small", children: item.variant_sku }),
              /* @__PURE__ */ jsx11(Copy3, { content: item.variant_sku, className: "text-ui-fg-muted" })
            ] }),
            /* @__PURE__ */ jsx11(Text8, { size: "small", children: item.variant?.options.map((o) => o.value).join(" \xB7 ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { className: "grid grid-cols-3 items-center gap-x-4", children: [
          /* @__PURE__ */ jsx11("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx11(Text8, { size: "small", children: getLocaleAmount(item.unit_price, currencyCode) }) }),
          /* @__PURE__ */ jsx11("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxs12(Text8, { children: [
            /* @__PURE__ */ jsx11("span", { className: "tabular-nums", children: item.quantity - item.detail.fulfilled_quantity }),
            "x"
          ] }) }),
          /* @__PURE__ */ jsx11("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx11(Text8, { size: "small", children: getLocaleAmount(item.subtotal || 0, currencyCode) }) })
        ] })
      ]
    },
    item.id
  );
};
var UnfulfilledItemBreakdown = ({ order }) => {
  const unfulfilledItemsWithShipping = order.items.filter(
    (i) => i.requires_shipping && i.detail.fulfilled_quantity < i.quantity
  );
  const unfulfilledItemsWithoutShipping = order.items.filter(
    (i) => !i.requires_shipping && i.detail.fulfilled_quantity < i.quantity
  );
  return /* @__PURE__ */ jsxs12(Fragment2, { children: [
    !!unfulfilledItemsWithShipping.length && /* @__PURE__ */ jsx11(
      UnfulfilledItemDisplay,
      {
        order,
        unfulfilledItems: unfulfilledItemsWithShipping,
        requiresShipping: true
      }
    ),
    !!unfulfilledItemsWithoutShipping.length && /* @__PURE__ */ jsx11(
      UnfulfilledItemDisplay,
      {
        order,
        unfulfilledItems: unfulfilledItemsWithoutShipping,
        requiresShipping: false
      }
    )
  ] });
};
var UnfulfilledItemDisplay = ({
  order,
  unfulfilledItems,
  requiresShipping = false
}) => {
  const { t } = useTranslation11();
  if (order.status === "canceled") {
    return;
  }
  return /* @__PURE__ */ jsxs12(Container7, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Heading7, { level: "h2", children: t("orders.fulfillment.unfulfilledItems") }),
      /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-x-4", children: [
        requiresShipping && /* @__PURE__ */ jsx11(StatusBadge, { color: "red", className: "text-nowrap", children: t("orders.fulfillment.requiresShipping") }),
        /* @__PURE__ */ jsx11(StatusBadge, { color: "red", className: "text-nowrap", children: t("orders.fulfillment.awaitingFulfillmentBadge") }),
        /* @__PURE__ */ jsx11(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("orders.fulfillment.fulfillItems"),
                    icon: /* @__PURE__ */ jsx11(Buildings, {}),
                    to: `/orders/${order.id}/fulfillment?requires_shipping=${requiresShipping}`
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx11("div", { children: unfulfilledItems.map((item) => /* @__PURE__ */ jsx11(
      UnfulfilledItem,
      {
        item,
        currencyCode: order.currency_code
      },
      item.id
    )) })
  ] });
};
var Fulfillment = ({
  fulfillment,
  order,
  index
}) => {
  const { t } = useTranslation11();
  const prompt = usePrompt2();
  const navigate = useNavigate5();
  const showLocation = !!fulfillment.location_id;
  const isPickUpFulfillment = fulfillment.shipping_option?.service_zone.fulfillment_set.type === "pickup" /* Pickup */;
  const { stock_location, isError, error } = useStockLocation(
    fulfillment.location_id,
    void 0,
    {
      enabled: showLocation
    }
  );
  let statusText = fulfillment.requires_shipping ? isPickUpFulfillment ? "Awaiting pickup" : "Awaiting shipping" : "Awaiting delivery";
  let statusColor = "blue";
  let statusTimestamp = fulfillment.created_at;
  if (fulfillment.canceled_at) {
    statusText = "Canceled";
    statusColor = "red";
    statusTimestamp = fulfillment.canceled_at;
  } else if (fulfillment.delivered_at) {
    statusText = "Delivered";
    statusColor = "green";
    statusTimestamp = fulfillment.delivered_at;
  } else if (fulfillment.shipped_at) {
    statusText = "Shipped";
    statusColor = "green";
    statusTimestamp = fulfillment.shipped_at;
  }
  const { mutateAsync } = useCancelOrderFulfillment(order.id, fulfillment.id);
  const { mutateAsync: markAsDelivered } = useMarkOrderFulfillmentAsDelivered(
    order.id,
    fulfillment.id
  );
  const showShippingButton = !fulfillment.canceled_at && !fulfillment.shipped_at && !fulfillment.delivered_at && fulfillment.requires_shipping && !isPickUpFulfillment;
  const showDeliveryButton = !fulfillment.canceled_at && !fulfillment.delivered_at;
  const handleMarkAsDelivered = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("orders.fulfillment.markAsDeliveredWarning"),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel"),
      variant: "confirmation"
    });
    if (res) {
      await markAsDelivered(void 0, {
        onSuccess: () => {
          toast5.success(
            t(
              isPickUpFulfillment ? "orders.fulfillment.toast.fulfillmentPickedUp" : "orders.fulfillment.toast.fulfillmentDelivered"
            )
          );
        },
        onError: (e) => {
          toast5.error(e.message);
        }
      });
    }
  };
  const handleCancel = async () => {
    if (fulfillment.shipped_at) {
      toast5.warning(t("orders.fulfillment.toast.fulfillmentShipped"));
      return;
    }
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("orders.fulfillment.cancelWarning"),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel")
    });
    if (res) {
      await mutateAsync(void 0, {
        onSuccess: () => {
          toast5.success(t("orders.fulfillment.toast.canceled"));
        },
        onError: (e) => {
          toast5.error(e.message);
        }
      });
    }
  };
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs12(Container7, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs12("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Heading7, { level: "h2", children: t("orders.fulfillment.number", {
        number: index + 1
      }) }),
      /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-x-4", children: [
        /* @__PURE__ */ jsx11(
          Tooltip2,
          {
            content: format(
              new Date(statusTimestamp),
              "dd MMM, yyyy, HH:mm:ss"
            ),
            children: /* @__PURE__ */ jsx11(StatusBadge, { color: statusColor, className: "text-nowrap", children: statusText })
          }
        ),
        /* @__PURE__ */ jsx11(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("actions.cancel"),
                    icon: /* @__PURE__ */ jsx11(XCircle, {}),
                    onClick: handleCancel,
                    disabled: !!fulfillment.canceled_at || !!fulfillment.shipped_at || !!fulfillment.delivered_at
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", weight: "plus", children: t("orders.fulfillment.itemsLabel") }),
      /* @__PURE__ */ jsx11("ul", { children: fulfillment.items.map((f_item) => /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsxs12(Text8, { size: "small", leading: "compact", children: [
        f_item.quantity,
        "x ",
        f_item.title
      ] }) }, f_item.line_item_id)) })
    ] }),
    showLocation && /* @__PURE__ */ jsxs12("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", weight: "plus", children: t("orders.fulfillment.shippingFromLabel") }),
      stock_location ? /* @__PURE__ */ jsx11(
        Link2,
        {
          to: `/settings/locations/${stock_location.id}`,
          className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg",
          children: /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", children: stock_location.name })
        }
      ) : /* @__PURE__ */ jsx11(Skeleton, { className: "w-16" })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", weight: "plus", children: t("fields.provider") }),
      /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", children: formatProvider(fulfillment.provider_id) })
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4", children: [
      /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", weight: "plus", children: t("orders.fulfillment.trackingLabel") }),
      /* @__PURE__ */ jsx11("div", { children: fulfillment.labels && fulfillment.labels.length > 0 ? /* @__PURE__ */ jsx11("ul", { children: fulfillment.labels.map((tlink) => {
        const hasUrl = tlink.url && tlink.url.length > 0 && tlink.url !== "#";
        if (hasUrl) {
          return /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11(
            "a",
            {
              href: tlink.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg",
              children: /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", children: tlink.tracking_number })
            }
          ) }, tlink.tracking_number);
        }
        return /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", children: tlink.tracking_number }) }, tlink.tracking_number);
      }) }) : /* @__PURE__ */ jsx11(Text8, { size: "small", leading: "compact", children: "-" }) })
    ] }),
    (showShippingButton || showDeliveryButton) && /* @__PURE__ */ jsxs12("div", { className: "bg-ui-bg-subtle flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
      showDeliveryButton && /* @__PURE__ */ jsx11(Button6, { onClick: handleMarkAsDelivered, variant: "secondary", children: t(
        isPickUpFulfillment ? "orders.fulfillment.markAsPickedUp" : "orders.fulfillment.markAsDelivered"
      ) }),
      showShippingButton && /* @__PURE__ */ jsx11(
        Button6,
        {
          onClick: () => navigate(`./${fulfillment.id}/create-shipment`),
          variant: "secondary",
          children: t("orders.fulfillment.markAsShipped")
        }
      )
    ] })
  ] });
};

// src/routes/orders/order-detail/components/order-general-section/order-general-section.tsx
import { XCircle as XCircle2 } from "@medusajs/icons";
import {
  Container as Container8,
  Copy as Copy4,
  Heading as Heading8,
  StatusBadge as StatusBadge2,
  Text as Text9,
  toast as toast6,
  usePrompt as usePrompt3
} from "@medusajs/ui";
import { useTranslation as useTranslation12 } from "react-i18next";
import { jsx as jsx12, jsxs as jsxs13 } from "react/jsx-runtime";
var OrderGeneralSection = ({ order }) => {
  const { t } = useTranslation12();
  const prompt = usePrompt3();
  const { getFullDate } = useDate();
  const { mutateAsync: cancelOrder } = useCancelOrder(order.id);
  const handleCancel = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("orders.cancelWarning", {
        id: `#${order.display_id}`
      }),
      confirmText: t("actions.continue"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await cancelOrder(void 0, {
      onSuccess: () => {
        toast6.success(t("orders.orderCanceled"));
      },
      onError: (e) => {
        toast6.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs13(Container8, { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsxs13("div", { children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-x-1", children: [
        /* @__PURE__ */ jsxs13(Heading8, { children: [
          "#",
          order.display_id
        ] }),
        /* @__PURE__ */ jsx12(Copy4, { content: `#${order.display_id}`, className: "text-ui-fg-muted" })
      ] }),
      /* @__PURE__ */ jsx12(Text9, { size: "small", className: "text-ui-fg-subtle", children: t("orders.onDateFromSalesChannel", {
        date: getFullDate({ date: order.created_at, includeTime: true }),
        salesChannel: order.sales_channel?.name
      }) })
    ] }),
    /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-x-4", children: [
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-x-1.5", children: [
        /* @__PURE__ */ jsx12(OrderBadge, { order }),
        /* @__PURE__ */ jsx12(PaymentBadge, { order }),
        /* @__PURE__ */ jsx12(FulfillmentBadge, { order })
      ] }),
      /* @__PURE__ */ jsx12(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.cancel"),
                  onClick: handleCancel,
                  disabled: !!order.canceled_at,
                  icon: /* @__PURE__ */ jsx12(XCircle2, {})
                }
              ]
            }
          ]
        }
      )
    ] })
  ] });
};
var FulfillmentBadge = ({ order }) => {
  const { t } = useTranslation12();
  const { label, color } = getOrderFulfillmentStatus(
    t,
    order.fulfillment_status
  );
  return /* @__PURE__ */ jsx12(StatusBadge2, { color, className: "text-nowrap", children: label });
};
var PaymentBadge = ({ order }) => {
  const { t } = useTranslation12();
  const { label, color } = getOrderPaymentStatus(t, order.payment_status);
  return /* @__PURE__ */ jsx12(StatusBadge2, { color, className: "text-nowrap", children: label });
};
var OrderBadge = ({ order }) => {
  const { t } = useTranslation12();
  const orderStatus = getCanceledOrderStatus(t, order.status);
  if (!orderStatus) {
    return null;
  }
  return /* @__PURE__ */ jsx12(StatusBadge2, { color: orderStatus.color, className: "text-nowrap", children: orderStatus.label });
};

// src/routes/orders/order-detail/components/order-summary-section/order-summary-section.tsx
import { useMemo as useMemo3, useState as useState6 } from "react";
import { useTranslation as useTranslation16 } from "react-i18next";
import { Link as Link3 } from "react-router-dom";
import {
  ArrowDownRightMini,
  ArrowLongRight,
  ArrowPath as ArrowPath3,
  ArrowUturnLeft as ArrowUturnLeft2,
  DocumentText,
  ExclamationCircle as ExclamationCircle2,
  PencilSquare,
  TriangleDownMini
} from "@medusajs/icons";
import {
  Badge as Badge3,
  Button as Button8,
  clx as clx2,
  Container as Container9,
  Copy as Copy5,
  Heading as Heading9,
  StatusBadge as StatusBadge3,
  Text as Text11,
  toast as toast7,
  Tooltip as Tooltip5,
  usePrompt as usePrompt4
} from "@medusajs/ui";

// src/routes/orders/order-detail/components/copy-payment-link/copy-payment-link.tsx
import { CheckCircleSolid, SquareTwoStack } from "@medusajs/icons";
import { Button as Button7, Tooltip as Tooltip3 } from "@medusajs/ui";
import copy from "copy-to-clipboard";
import React, { useState as useState4 } from "react";
import { useTranslation as useTranslation13 } from "react-i18next";

// src/lib/storefront.ts
var MEDUSA_STOREFRONT_URL = __STOREFRONT_URL__ ?? "http://localhost:8000";

// src/routes/orders/order-detail/components/copy-payment-link/copy-payment-link.tsx
import { jsx as jsx13, jsxs as jsxs14 } from "react/jsx-runtime";
var CopyPaymentLink = React.forwardRef(
  ({ paymentCollection, order }, ref) => {
    const [done, setDone] = useState4(false);
    const [open, setOpen] = useState4(false);
    const [text, setText] = useState4("CopyPaymentLink");
    const { t } = useTranslation13();
    const copyToClipboard = async (e) => {
      e.stopPropagation();
      setDone(true);
      copy(
        `${MEDUSA_STOREFRONT_URL}/payment-collection/${paymentCollection.id}`
      );
      setTimeout(() => {
        setDone(false);
      }, 2e3);
    };
    React.useEffect(() => {
      if (done) {
        setText(t("actions.copied"));
        return;
      }
      setTimeout(() => {
        setText(t("actions.copy"));
      }, 500);
    }, [done]);
    return /* @__PURE__ */ jsx13(Tooltip3, { content: text, open: done || open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs14(
      Button7,
      {
        ref,
        variant: "secondary",
        size: "small",
        "aria-label": "CopyPaymentLink code snippet",
        onClick: copyToClipboard,
        children: [
          done ? /* @__PURE__ */ jsx13(CheckCircleSolid, { className: "inline" }) : /* @__PURE__ */ jsx13(SquareTwoStack, { className: "inline" }),
          t("orders.payment.paymentLink", {
            amount: getStylizedAmount(
              paymentCollection.amount,
              order?.currency_code
            )
          })
        ]
      }
    ) });
  }
);
CopyPaymentLink.displayName = "CopyPaymentLink";

// src/routes/orders/order-detail/components/order-summary-section/return-info-popover.tsx
import { InformationCircleSolid } from "@medusajs/icons";
import { Badge, Popover as Popover3, Text as Text10 } from "@medusajs/ui";
import { useState as useState5 } from "react";
import { useTranslation as useTranslation14 } from "react-i18next";
import { jsx as jsx14, jsxs as jsxs15 } from "react/jsx-runtime";
function ReturnInfoPopover({ orderReturn }) {
  const { t } = useTranslation14();
  const [open, setOpen] = useState5(false);
  const { getFullDate } = useDate();
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };
  let returnType = "Return";
  let returnTypeId = orderReturn.id;
  if (orderReturn.claim_id) {
    returnType = "Claim";
    returnTypeId = orderReturn.claim_id;
  }
  if (orderReturn.exchange_id) {
    returnType = "Exchange";
    returnTypeId = orderReturn.exchange_id;
  }
  if (typeof orderReturn !== "object") {
    return;
  }
  return /* @__PURE__ */ jsxs15(Popover3, { open, children: [
    /* @__PURE__ */ jsx14(
      Popover3.Trigger,
      {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        autoFocus: false,
        className: "align-sub focus-visible:outline-none",
        children: /* @__PURE__ */ jsx14(InformationCircleSolid, {})
      }
    ),
    /* @__PURE__ */ jsx14(
      Popover3.Content,
      {
        align: "center",
        side: "top",
        className: "bg-ui-bg-component p-2 focus-visible:outline-none",
        children: /* @__PURE__ */ jsxs15("div", { className: "", children: [
          /* @__PURE__ */ jsxs15(Badge, { size: "2xsmall", className: "mb-2", rounded: "full", children: [
            returnType,
            ": #",
            returnTypeId.slice(-7)
          ] }),
          /* @__PURE__ */ jsxs15(Text10, { size: "xsmall", children: [
            /* @__PURE__ */ jsx14("span", { className: "text-ui-fg-subtle", children: t(`orders.returns.returnRequested`) }),
            " \xB7 ",
            getFullDate({ date: orderReturn.requested_at, includeTime: true })
          ] }),
          /* @__PURE__ */ jsxs15(Text10, { size: "xsmall", children: [
            /* @__PURE__ */ jsx14("span", { className: "text-ui-fg-subtle", children: t(`orders.returns.itemReceived`) }),
            " \xB7 ",
            orderReturn.received_at ? getFullDate({
              date: orderReturn.received_at,
              includeTime: true
            }) : "-"
          ] })
        ] })
      }
    )
  ] });
}
var return_info_popover_default = ReturnInfoPopover;

// src/routes/orders/order-detail/components/order-summary-section/shipping-info-popover.tsx
import { InformationCircleSolid as InformationCircleSolid2 } from "@medusajs/icons";
import { Badge as Badge2, Tooltip as Tooltip4 } from "@medusajs/ui";
import { useTranslation as useTranslation15 } from "react-i18next";
import { jsx as jsx15, jsxs as jsxs16 } from "react/jsx-runtime";
function ShippingInfoPopover({ shippingMethod }) {
  const { t } = useTranslation15();
  const shippingDetail = shippingMethod?.detail;
  if (!shippingDetail) {
    return;
  }
  let rmaType = t("orders.return");
  let rmaId = shippingDetail.return_id;
  if (shippingDetail.claim_id) {
    rmaType = t("orders.claim");
    rmaId = shippingDetail.claim_id;
  }
  if (shippingDetail.exchange_id) {
    rmaType = t("orders.exchange");
    rmaId = shippingDetail.exchange_id;
  }
  if (!rmaId) {
    return;
  }
  return /* @__PURE__ */ jsx15(
    Tooltip4,
    {
      content: /* @__PURE__ */ jsxs16(Badge2, { size: "2xsmall", rounded: "full", children: [
        rmaType,
        ": #",
        rmaId.slice(-7)
      ] }),
      children: /* @__PURE__ */ jsx15(InformationCircleSolid2, { className: "inline-block text-ui-fg-muted ml-1" })
    }
  );
}
var shipping_info_popover_default = ShippingInfoPopover;

// src/routes/orders/order-detail/components/order-summary-section/order-summary-section.tsx
import { Fragment as Fragment3, jsx as jsx16, jsxs as jsxs17 } from "react/jsx-runtime";
var OrderSummarySection = ({ order }) => {
  const { t } = useTranslation16();
  const prompt = usePrompt4();
  const { reservations } = useReservationItems(
    {
      line_item_id: order?.items?.map((i) => i.id)
    },
    { enabled: Array.isArray(order?.items) }
  );
  const { order: orderPreview } = useOrderPreview(order.id);
  const { returns = [] } = useReturns({
    status: "requested",
    order_id: order.id,
    fields: "+received_at"
  });
  const receivableReturns = useMemo3(
    () => returns.filter((r) => !r.canceled_at),
    [returns]
  );
  const showReturns = !!receivableReturns.length;
  const showAllocateButton = useMemo3(() => {
    if (!reservations) {
      return false;
    }
    const reservationsMap = new Map(
      reservations.map((r) => [r.line_item_id, r.id])
    );
    for (const item of order.items) {
      if (item.variant?.manage_inventory) {
        if (item.quantity - item.detail.fulfilled_quantity > 0) {
          if (!reservationsMap.has(item.id)) {
            return true;
          }
        }
      }
    }
    return false;
  }, [order.items, reservations]);
  const unpaidPaymentCollection = order.payment_collections.find(
    (pc) => pc.status === "not_paid"
  );
  const { mutateAsync: markAsPaid } = useMarkPaymentCollectionAsPaid(
    order.id,
    unpaidPaymentCollection?.id
  );
  const pendingDifference = order.summary?.pending_difference || 0;
  const isAmountSignificant = !isAmountLessThenRoundingError(
    pendingDifference,
    order.currency_code
  );
  const showPayment = unpaidPaymentCollection && pendingDifference > 0 && isAmountSignificant;
  const showRefund = unpaidPaymentCollection && pendingDifference < 0 && isAmountSignificant;
  const handleMarkAsPaid = async (paymentCollection) => {
    const res = await prompt({
      title: t("orders.payment.markAsPaid"),
      description: t("orders.payment.markAsPaidPayment", {
        amount: formatCurrency(
          paymentCollection.amount,
          order.currency_code
        )
      }),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel"),
      variant: "confirmation"
    });
    if (!res) {
      return;
    }
    await markAsPaid(
      { order_id: order.id },
      {
        onSuccess: () => {
          toast7.success(
            t("orders.payment.markAsPaidPaymentSuccess", {
              amount: formatCurrency(
                paymentCollection.amount,
                order.currency_code
              )
            })
          );
        },
        onError: (error) => {
          toast7.error(error.message);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs17(Container9, { className: "divide-y divide-dashed p-0", children: [
    /* @__PURE__ */ jsx16(Header2, { order, orderPreview }),
    /* @__PURE__ */ jsx16(ItemBreakdown, { order, reservations }),
    /* @__PURE__ */ jsx16(CostBreakdown, { order }),
    /* @__PURE__ */ jsx16(Total, { order }),
    (showAllocateButton || showReturns || showPayment || showRefund) && /* @__PURE__ */ jsxs17("div", { className: "bg-ui-bg-subtle flex items-center justify-end gap-x-2 rounded-b-xl px-4 py-4", children: [
      showReturns && (receivableReturns.length === 1 ? /* @__PURE__ */ jsx16(Button8, { asChild: true, variant: "secondary", size: "small", children: /* @__PURE__ */ jsx16(
        Link3,
        {
          to: `/orders/${order.id}/returns/${receivableReturns[0].id}/receive`,
          children: t("orders.returns.receive.action")
        }
      ) }) : /* @__PURE__ */ jsx16(
        ActionMenu,
        {
          groups: [
            {
              actions: receivableReturns.map((r) => {
                let id = r.id;
                let returnType = "Return";
                if (r.exchange_id) {
                  id = r.exchange_id;
                  returnType = "Exchange";
                }
                if (r.claim_id) {
                  id = r.claim_id;
                  returnType = "Claim";
                }
                return {
                  label: t("orders.returns.receive.receiveItems", {
                    id: `#${id.slice(-7)}`,
                    returnType
                  }),
                  icon: /* @__PURE__ */ jsx16(ArrowLongRight, {}),
                  to: `/orders/${order.id}/returns/${r.id}/receive`
                };
              })
            }
          ],
          children: /* @__PURE__ */ jsx16(Button8, { variant: "secondary", size: "small", children: t("orders.returns.receive.action") })
        }
      )),
      showAllocateButton && /* @__PURE__ */ jsx16(Button8, { asChild: true, variant: "secondary", size: "small", children: /* @__PURE__ */ jsx16(Link3, { to: "allocate-items", children: t("orders.allocateItems.action") }) }),
      showPayment && /* @__PURE__ */ jsx16(
        CopyPaymentLink,
        {
          paymentCollection: unpaidPaymentCollection,
          order
        }
      ),
      showPayment && /* @__PURE__ */ jsx16(
        Button8,
        {
          size: "small",
          variant: "secondary",
          onClick: () => handleMarkAsPaid(unpaidPaymentCollection),
          children: t("orders.payment.markAsPaid")
        }
      ),
      showRefund && /* @__PURE__ */ jsx16(Button8, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx16(Link3, { to: `/orders/${order.id}/refund`, children: t("orders.payment.refundAmount", {
        amount: getStylizedAmount(
          pendingDifference * -1,
          order?.currency_code
        )
      }) }) })
    ] })
  ] });
};
var Header2 = ({
  order,
  orderPreview
}) => {
  const { t } = useTranslation16();
  const shouldDisableReturn = order.items.every(
    (i) => !(getReturnableQuantity(i) > 0)
  );
  const isOrderEditActive = orderPreview?.order_change?.change_type === "edit";
  const isOrderEditPending = orderPreview?.order_change?.change_type === "edit" && orderPreview?.order_change?.status === "pending";
  return /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsx16(Heading9, { level: "h2", children: t("fields.summary") }),
    /* @__PURE__ */ jsx16(
      ActionMenu,
      {
        groups: [
          {
            actions: [
              {
                label: t(
                  isOrderEditPending ? "orders.summary.editOrderContinue" : "orders.summary.editOrder"
                ),
                to: `/orders/${order.id}/edits`,
                icon: /* @__PURE__ */ jsx16(PencilSquare, {}),
                disabled: order.status === "canceled" || orderPreview?.order_change && orderPreview?.order_change?.change_type !== "edit" || orderPreview?.order_change?.change_type === "edit" && orderPreview?.order_change?.status === "requested"
              }
            ]
          },
          {
            actions: [
              {
                label: t("orders.returns.create"),
                to: `/orders/${order.id}/returns`,
                icon: /* @__PURE__ */ jsx16(ArrowUturnLeft2, {}),
                disabled: shouldDisableReturn || isOrderEditActive || !!orderPreview?.order_change?.exchange_id || !!orderPreview?.order_change?.claim_id
              },
              {
                label: orderPreview?.order_change?.id && orderPreview?.order_change?.exchange_id ? t("orders.exchanges.manage") : t("orders.exchanges.create"),
                to: `/orders/${order.id}/exchanges`,
                icon: /* @__PURE__ */ jsx16(ArrowPath3, {}),
                disabled: shouldDisableReturn || isOrderEditActive || !!orderPreview?.order_change?.return_id && !orderPreview?.order_change?.exchange_id || !!orderPreview?.order_change?.claim_id
              },
              {
                label: orderPreview?.order_change?.id && orderPreview?.order_change?.claim_id ? t("orders.claims.manage") : t("orders.claims.create"),
                to: `/orders/${order.id}/claims`,
                icon: /* @__PURE__ */ jsx16(ExclamationCircle2, {}),
                disabled: shouldDisableReturn || isOrderEditActive || !!orderPreview?.order_change?.return_id && !orderPreview?.order_change?.claim_id || !!orderPreview?.order_change?.exchange_id
              }
            ]
          }
        ]
      }
    )
  ] });
};
var Item = ({
  item,
  currencyCode,
  reservation,
  returns,
  claims,
  exchanges
}) => {
  const { t } = useTranslation16();
  const isInventoryManaged = item.variant?.manage_inventory;
  const hasInventoryKit = isInventoryManaged && (item.variant?.inventory_items?.length || 0) > 1;
  const hasUnfulfilledItems = item.quantity - item.detail.fulfilled_quantity > 0;
  return /* @__PURE__ */ jsxs17(Fragment3, { children: [
    /* @__PURE__ */ jsxs17(
      "div",
      {
        className: "text-ui-fg-subtle grid grid-cols-2 items-center gap-x-4 px-6 py-4",
        children: [
          /* @__PURE__ */ jsxs17("div", { className: "flex items-start gap-x-4", children: [
            /* @__PURE__ */ jsx16(Thumbnail, { src: item.thumbnail }),
            /* @__PURE__ */ jsxs17("div", { children: [
              /* @__PURE__ */ jsx16(
                Text11,
                {
                  size: "small",
                  leading: "compact",
                  weight: "plus",
                  className: "text-ui-fg-base",
                  children: item.title
                }
              ),
              item.variant_sku && /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-x-1", children: [
                /* @__PURE__ */ jsx16(Text11, { size: "small", children: item.variant_sku }),
                /* @__PURE__ */ jsx16(Copy5, { content: item.variant_sku, className: "text-ui-fg-muted" })
              ] }),
              /* @__PURE__ */ jsx16(Text11, { size: "small", children: item.variant?.options?.map((o) => o.value).join(" \xB7 ") })
            ] })
          ] }),
          /* @__PURE__ */ jsxs17("div", { className: "grid grid-cols-3 items-center gap-x-4", children: [
            /* @__PURE__ */ jsx16("div", { className: "flex items-center justify-end gap-x-4", children: /* @__PURE__ */ jsx16(Text11, { size: "small", children: getLocaleAmount(item.unit_price, currencyCode) }) }),
            /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-x-2", children: [
              /* @__PURE__ */ jsx16("div", { className: "w-fit min-w-[27px]", children: /* @__PURE__ */ jsxs17(Text11, { size: "small", children: [
                /* @__PURE__ */ jsx16("span", { className: "tabular-nums", children: item.quantity }),
                "x"
              ] }) }),
              /* @__PURE__ */ jsx16("div", { className: "overflow-visible", children: isInventoryManaged && hasUnfulfilledItems && /* @__PURE__ */ jsx16(
                StatusBadge3,
                {
                  color: reservation ? "green" : "orange",
                  className: "text-nowrap",
                  children: reservation ? t("orders.reservations.allocatedLabel") : t("orders.reservations.notAllocatedLabel")
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx16("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx16(Text11, { size: "small", className: "pt-[1px]", children: getLocaleAmount(item.subtotal || 0, currencyCode) }) })
          ] })
        ]
      },
      item.id
    ),
    hasInventoryKit && /* @__PURE__ */ jsx16(InventoryKitBreakdown, { item }),
    returns.map((r) => /* @__PURE__ */ jsx16(ReturnBreakdown, { orderReturn: r, itemId: item.id }, r.id)),
    claims.map((claim) => /* @__PURE__ */ jsx16(ClaimBreakdown, { claim, itemId: item.id }, claim.id)),
    exchanges.map((exchange) => /* @__PURE__ */ jsx16(
      ExchangeBreakdown,
      {
        exchange,
        itemId: item.id
      },
      exchange.id
    ))
  ] });
};
var ItemBreakdown = ({
  order,
  reservations
}) => {
  const { claims = [] } = useClaims({
    order_id: order.id,
    fields: "*additional_items"
  });
  const { exchanges = [] } = useExchanges({
    order_id: order.id,
    fields: "*additional_items"
  });
  const { returns = [] } = useReturns({
    order_id: order.id,
    fields: "*items,*items.reason"
  });
  const reservationsMap = useMemo3(
    () => new Map((reservations || []).map((r) => [r.line_item_id, r])),
    [reservations]
  );
  return /* @__PURE__ */ jsx16("div", { children: order.items?.map((item) => {
    const reservation = reservationsMap.get(item.id);
    return /* @__PURE__ */ jsx16(
      Item,
      {
        item,
        currencyCode: order.currency_code,
        reservation,
        returns,
        exchanges,
        claims
      },
      item.id
    );
  }) });
};
var Cost = ({
  label,
  value,
  secondaryValue,
  tooltip
}) => /* @__PURE__ */ jsxs17("div", { className: "grid grid-cols-3 items-center", children: [
  /* @__PURE__ */ jsxs17(Text11, { size: "small", leading: "compact", children: [
    label,
    " ",
    tooltip
  ] }),
  /* @__PURE__ */ jsx16("div", { className: "text-right", children: /* @__PURE__ */ jsx16(Text11, { size: "small", leading: "compact", children: secondaryValue }) }),
  /* @__PURE__ */ jsx16("div", { className: "text-right", children: /* @__PURE__ */ jsx16(Text11, { size: "small", leading: "compact", children: value }) })
] });
var CostBreakdown = ({
  order
}) => {
  const { t } = useTranslation16();
  const [isTaxOpen, setIsTaxOpen] = useState6(false);
  const [isShippingOpen, setIsShippingOpen] = useState6(false);
  const discountCodes = useMemo3(() => {
    const codes = /* @__PURE__ */ new Set();
    order.items.forEach(
      (item) => item.adjustments?.forEach((adj) => {
        codes.add(adj.code);
      })
    );
    return Array.from(codes).sort();
  }, [order]);
  const taxCodes = useMemo3(() => {
    const taxCodeMap = {};
    order.items.forEach((item) => {
      item.tax_lines?.forEach((line) => {
        taxCodeMap[line.code] = (taxCodeMap[line.code] || 0) + line.total;
      });
    });
    order.shipping_methods.forEach((sm) => {
      sm.tax_lines?.forEach((line) => {
        taxCodeMap[line.code] = (taxCodeMap[line.code] || 0) + line.total;
      });
    });
    return taxCodeMap;
  }, [order]);
  const automaticTaxesOn = !!order.region?.automatic_taxes;
  const hasTaxLines = !!Object.keys(taxCodes).length;
  const discountTotal = automaticTaxesOn ? order.discount_total : order.discount_subtotal;
  return /* @__PURE__ */ jsxs17("div", { className: "text-ui-fg-subtle flex flex-col gap-y-2 px-6 py-4", children: [
    /* @__PURE__ */ jsx16(
      Cost,
      {
        label: t(
          automaticTaxesOn ? "orders.summary.itemTotal" : "orders.summary.itemSubtotal"
        ),
        value: getLocaleAmount(order.item_total, order.currency_code)
      }
    ),
    /* @__PURE__ */ jsx16(
      Cost,
      {
        label: /* @__PURE__ */ jsxs17(
          "div",
          {
            onClick: () => setIsShippingOpen((o) => !o),
            className: "flex cursor-pointer items-center gap-1",
            children: [
              /* @__PURE__ */ jsx16("span", { children: t(
                automaticTaxesOn ? "orders.summary.shippingTotal" : "orders.summary.shippingSubtotal"
              ) }),
              /* @__PURE__ */ jsx16(
                TriangleDownMini,
                {
                  style: {
                    transform: `rotate(${isShippingOpen ? 0 : -90}deg)`
                  }
                }
              )
            ]
          }
        ),
        value: getLocaleAmount(
          automaticTaxesOn ? order.shipping_total : order.shipping_subtotal,
          order.currency_code
        )
      }
    ),
    isShippingOpen && /* @__PURE__ */ jsx16("div", { className: "flex flex-col gap-1 pl-5", children: (order.shipping_methods || []).sort(
      (m1, m2) => m1.created_at.localeCompare(m2.created_at)
    ).map((sm, i) => {
      return /* @__PURE__ */ jsxs17(
        "div",
        {
          className: "flex items-center justify-between gap-x-2",
          children: [
            /* @__PURE__ */ jsx16("div", { children: /* @__PURE__ */ jsxs17("span", { className: "txt-small text-ui-fg-subtle font-medium", children: [
              sm.name,
              sm.detail.return_id && ` (${t("fields.returnShipping")})`,
              " ",
              /* @__PURE__ */ jsx16(shipping_info_popover_default, { shippingMethod: sm }, i)
            ] }) }),
            /* @__PURE__ */ jsx16("div", { className: "relative flex-1", children: /* @__PURE__ */ jsx16("div", { className: "bottom-[calc(50% - 2px)] absolute h-[1px] w-full border-b border-dashed" }) }),
            /* @__PURE__ */ jsx16("span", { className: "txt-small text-ui-fg-muted", children: getLocaleAmount(
              automaticTaxesOn ? sm.total : sm.subtotal,
              order.currency_code
            ) })
          ]
        },
        sm.id
      );
    }) }),
    /* @__PURE__ */ jsx16(
      Cost,
      {
        label: t(
          automaticTaxesOn ? "orders.summary.discountTotal" : "orders.summary.discountSubtotal"
        ),
        secondaryValue: discountCodes.join(", "),
        value: discountTotal > 0 ? `- ${getLocaleAmount(discountTotal, order.currency_code)}` : "-"
      }
    ),
    /* @__PURE__ */ jsxs17(Fragment3, { children: [
      /* @__PURE__ */ jsxs17("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs17(
          "div",
          {
            onClick: () => hasTaxLines && setIsTaxOpen((o) => !o),
            className: clx2("flex items-center gap-1", {
              "cursor-pointer": hasTaxLines
            }),
            children: [
              /* @__PURE__ */ jsx16("span", { className: "txt-small select-none", children: t(
                automaticTaxesOn ? "orders.summary.taxTotalIncl" : "orders.summary.taxTotal"
              ) }),
              hasTaxLines && /* @__PURE__ */ jsx16(
                TriangleDownMini,
                {
                  style: {
                    transform: `rotate(${isTaxOpen ? 0 : -90}deg)`
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx16("div", { className: "text-right", children: /* @__PURE__ */ jsx16(Text11, { size: "small", leading: "compact", children: getLocaleAmount(order.tax_total, order.currency_code) }) })
      ] }),
      isTaxOpen && /* @__PURE__ */ jsx16("div", { className: "flex flex-col gap-1 pl-5", children: Object.entries(taxCodes).map(([code, total]) => {
        return /* @__PURE__ */ jsxs17(
          "div",
          {
            className: "flex items-center justify-between gap-x-2",
            children: [
              /* @__PURE__ */ jsx16("div", { children: /* @__PURE__ */ jsx16("span", { className: "txt-small text-ui-fg-subtle font-medium", children: code }) }),
              /* @__PURE__ */ jsx16("div", { className: "relative flex-1", children: /* @__PURE__ */ jsx16("div", { className: "bottom-[calc(50% - 2px)] absolute h-[1px] w-full border-b border-dashed" }) }),
              /* @__PURE__ */ jsx16("span", { className: "txt-small text-ui-fg-muted", children: getLocaleAmount(total, order.currency_code) })
            ]
          },
          code
        );
      }) })
    ] })
  ] });
};
var InventoryKitBreakdown = ({ item }) => {
  const { t } = useTranslation16();
  const [isOpen, setIsOpen] = useState6(false);
  const inventory = item.variant?.inventory_items || [];
  return /* @__PURE__ */ jsxs17(Fragment3, { children: [
    /* @__PURE__ */ jsxs17(
      "div",
      {
        onClick: () => setIsOpen((o) => !o),
        className: "flex cursor-pointer items-center gap-2 border-t border-dashed px-6 py-4",
        children: [
          /* @__PURE__ */ jsx16(
            TriangleDownMini,
            {
              style: {
                transform: `rotate(${isOpen ? 0 : -90}deg)`
              }
            }
          ),
          /* @__PURE__ */ jsx16("span", { className: "text-ui-fg-muted txt-small select-none", children: t("orders.summary.inventoryKit", { count: inventory.length }) })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx16("div", { className: "flex flex-col gap-1 px-6 pb-4", children: inventory.map((i) => {
      return /* @__PURE__ */ jsxs17(
        "div",
        {
          className: "flex items-center justify-between gap-x-2",
          children: [
            /* @__PURE__ */ jsx16("div", { children: /* @__PURE__ */ jsxs17("span", { className: "txt-small text-ui-fg-subtle font-medium", children: [
              i.inventory.title,
              i.inventory.sku && /* @__PURE__ */ jsxs17("span", { className: "text-ui-fg-subtle font-normal", children: [
                " ",
                "\u22C5 ",
                i.inventory.sku
              ] })
            ] }) }),
            /* @__PURE__ */ jsx16("div", { className: "relative flex-1", children: /* @__PURE__ */ jsx16("div", { className: "bottom-[calc(50% - 2px)] absolute h-[1px] w-full border-b border-dashed" }) }),
            /* @__PURE__ */ jsxs17("span", { className: "txt-small text-ui-fg-muted", children: [
              i.required_quantity,
              "x"
            ] })
          ]
        },
        i.inventory.id
      );
    }) })
  ] });
};
var ReturnBreakdownWithDamages = ({
  orderReturn,
  itemId
}) => {
  const { t } = useTranslation16();
  const item = orderReturn?.items?.find((ri) => ri.item_id === itemId);
  const damagedQuantity = item?.damaged_quantity || 0;
  return item && /* @__PURE__ */ jsxs17(
    "div",
    {
      className: "txt-compact-small-plus text-ui-fg-subtle bg-ui-bg-subtle flex flex-row justify-between gap-y-2 border-t-2 border-dotted px-6 py-4",
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx16(ArrowDownRightMini, { className: "text-ui-fg-muted" }),
          /* @__PURE__ */ jsx16(Text11, { size: "small", children: t(`orders.returns.damagedItemsReturned`, {
            quantity: damagedQuantity
          }) }),
          item?.note && /* @__PURE__ */ jsx16(Tooltip5, { content: item.note, children: /* @__PURE__ */ jsx16(DocumentText, { className: "text-ui-tag-neutral-icon ml-1 inline" }) }),
          item?.reason && /* @__PURE__ */ jsx16(
            Badge3,
            {
              size: "2xsmall",
              className: "cursor-default select-none capitalize",
              rounded: "full",
              children: item?.reason?.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxs17(Text11, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: [
          t(`orders.returns.damagedItemReceived`),
          /* @__PURE__ */ jsx16("span", { className: "ml-2", children: /* @__PURE__ */ jsx16(return_info_popover_default, { orderReturn }) })
        ] })
      ]
    },
    orderReturn.id
  );
};
var ReturnBreakdown = ({
  orderReturn,
  itemId
}) => {
  const { t } = useTranslation16();
  const { getRelativeDate } = useDate();
  if (!["requested", "received", "partially_received"].includes(
    orderReturn.status || ""
  )) {
    return null;
  }
  const isRequested = orderReturn.status === "requested";
  const item = orderReturn?.items?.find((ri) => ri.item_id === itemId);
  const damagedQuantity = item?.damaged_quantity || 0;
  return item && /* @__PURE__ */ jsxs17(Fragment3, { children: [
    damagedQuantity > 0 && /* @__PURE__ */ jsx16(
      ReturnBreakdownWithDamages,
      {
        orderReturn,
        itemId
      }
    ),
    /* @__PURE__ */ jsxs17(
      "div",
      {
        className: "txt-compact-small-plus text-ui-fg-subtle bg-ui-bg-subtle flex flex-row justify-between gap-y-2 border-t-2 border-dotted px-6 py-4",
        children: [
          /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx16(ArrowDownRightMini, { className: "text-ui-fg-muted" }),
            /* @__PURE__ */ jsx16(Text11, { size: "small", children: t(
              `orders.returns.${isRequested ? "returnRequestedInfo" : "returnReceivedInfo"}`,
              {
                requestedItemsCount: item?.[isRequested ? "quantity" : "received_quantity"]
              }
            ) }),
            item?.note && /* @__PURE__ */ jsx16(Tooltip5, { content: item.note, children: /* @__PURE__ */ jsx16(DocumentText, { className: "text-ui-tag-neutral-icon ml-1 inline" }) }),
            item?.reason && /* @__PURE__ */ jsx16(
              Badge3,
              {
                size: "2xsmall",
                className: "cursor-default select-none capitalize",
                rounded: "full",
                children: item?.reason?.label
              }
            )
          ] }),
          orderReturn && isRequested && /* @__PURE__ */ jsxs17(Text11, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: [
            getRelativeDate(orderReturn.created_at),
            /* @__PURE__ */ jsx16("span", { className: "ml-2", children: /* @__PURE__ */ jsx16(return_info_popover_default, { orderReturn }) })
          ] }),
          orderReturn && !isRequested && /* @__PURE__ */ jsxs17(Text11, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: [
            t(`orders.returns.itemReceived`),
            /* @__PURE__ */ jsx16("span", { className: "ml-2", children: /* @__PURE__ */ jsx16(return_info_popover_default, { orderReturn }) })
          ] })
        ]
      },
      item.id
    )
  ] });
};
var ClaimBreakdown = ({
  claim,
  itemId
}) => {
  const { t } = useTranslation16();
  const { getRelativeDate } = useDate();
  const items = claim.additional_items.filter(
    (item) => item.item?.id === itemId
  );
  return !!items.length && /* @__PURE__ */ jsxs17(
    "div",
    {
      className: "txt-compact-small-plus text-ui-fg-subtle bg-ui-bg-subtle flex flex-row justify-between gap-y-2 border-b-2 border-t-2 border-dotted px-6 py-4",
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx16(ArrowDownRightMini, { className: "text-ui-fg-muted" }),
          /* @__PURE__ */ jsx16(Text11, { size: "small", children: t(`orders.claims.outboundItemAdded`, {
            itemsCount: items.reduce(
              (acc, item) => acc = acc + item.quantity,
              0
            )
          }) })
        ] }),
        /* @__PURE__ */ jsx16(Text11, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: getRelativeDate(claim.created_at) })
      ]
    },
    claim.id
  );
};
var ExchangeBreakdown = ({
  exchange,
  itemId
}) => {
  const { t } = useTranslation16();
  const { getRelativeDate } = useDate();
  const items = exchange.additional_items.filter(
    (item) => item?.item?.id === itemId
  );
  return !!items.length && /* @__PURE__ */ jsxs17(
    "div",
    {
      className: "txt-compact-small-plus text-ui-fg-subtle bg-ui-bg-subtle flex flex-row justify-between gap-y-2 border-b-2 border-t-2 border-dotted px-6 py-4",
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx16(ArrowDownRightMini, { className: "text-ui-fg-muted" }),
          /* @__PURE__ */ jsx16(Text11, { size: "small", children: t(`orders.exchanges.outboundItemAdded`, {
            itemsCount: items.reduce(
              (acc, item) => acc = acc + item.quantity,
              0
            )
          }) })
        ] }),
        /* @__PURE__ */ jsx16(Text11, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: getRelativeDate(exchange.created_at) })
      ]
    },
    exchange.id
  );
};
var Total = ({ order }) => {
  const { t } = useTranslation16();
  return /* @__PURE__ */ jsxs17("div", { className: " flex flex-col gap-y-2 px-6 py-4", children: [
    /* @__PURE__ */ jsxs17("div", { className: "text-ui-fg-base flex items-center justify-between", children: [
      /* @__PURE__ */ jsx16(
        Text11,
        {
          weight: "plus",
          className: "text-ui-fg-subtle",
          size: "small",
          leading: "compact",
          children: t("fields.total")
        }
      ),
      /* @__PURE__ */ jsx16(
        Text11,
        {
          weight: "plus",
          className: "text-ui-fg-subtle",
          size: "small",
          leading: "compact",
          children: getStylizedAmount(order.total, order.currency_code)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs17("div", { className: "text-ui-fg-base flex items-center justify-between", children: [
      /* @__PURE__ */ jsx16(
        Text11,
        {
          weight: "plus",
          className: "text-ui-fg-subtle",
          size: "small",
          leading: "compact",
          children: t("fields.paidTotal")
        }
      ),
      /* @__PURE__ */ jsx16(
        Text11,
        {
          weight: "plus",
          className: "text-ui-fg-subtle",
          size: "small",
          leading: "compact",
          children: getStylizedAmount(
            getTotalCaptured(order.payment_collections || []),
            order.currency_code
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs17("div", { className: "text-ui-fg-base flex items-center justify-between", children: [
      /* @__PURE__ */ jsx16(
        Text11,
        {
          className: "text-ui-fg-subtle text-semibold",
          size: "small",
          leading: "compact",
          weight: "plus",
          children: t("orders.returns.outstandingAmount")
        }
      ),
      /* @__PURE__ */ jsx16(
        Text11,
        {
          className: "text-ui-fg-subtle text-bold",
          size: "small",
          leading: "compact",
          weight: "plus",
          children: getStylizedAmount(
            order.summary.pending_difference || 0,
            order.currency_code
          )
        }
      )
    ] })
  ] });
};

// src/routes/orders/order-detail/order-detail.tsx
import { jsx as jsx17, jsxs as jsxs18 } from "react/jsx-runtime";
var OrderDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const { getWidgets } = useExtension();
  const { order, isLoading, isError, error } = useOrder(
    id,
    {
      fields: DEFAULT_FIELDS
    },
    {
      initialData
    }
  );
  if (order) {
    order.items = order.items.sort((itemA, itemB) => {
      if (itemA.created_at > itemB.created_at) {
        return 1;
      }
      if (itemA.created_at < itemB.created_at) {
        return -1;
      }
      return 0;
    });
  }
  const { order: orderPreview, isLoading: isPreviewLoading } = useOrderPreview(
    id
  );
  if (isLoading || !order || isPreviewLoading) {
    return /* @__PURE__ */ jsx17(TwoColumnPageSkeleton, { mainSections: 4, sidebarSections: 2, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs18(
    TwoColumnPage,
    {
      widgets: {
        after: getWidgets("order.details.after"),
        before: getWidgets("order.details.before"),
        sideAfter: getWidgets("order.details.side.after"),
        sideBefore: getWidgets("order.details.side.before")
      },
      data: order,
      showJSON: true,
      showMetadata: true,
      hasOutlet: true,
      children: [
        /* @__PURE__ */ jsxs18(TwoColumnPage.Main, { children: [
          /* @__PURE__ */ jsx17(OrderActiveEditSection, { order }),
          /* @__PURE__ */ jsx17(ActiveOrderClaimSection, { orderPreview }),
          /* @__PURE__ */ jsx17(ActiveOrderExchangeSection, { orderPreview }),
          /* @__PURE__ */ jsx17(ActiveOrderReturnSection, { orderPreview }),
          /* @__PURE__ */ jsx17(OrderGeneralSection, { order }),
          /* @__PURE__ */ jsx17(OrderSummarySection, { order }),
          /* @__PURE__ */ jsx17(OrderPaymentSection, { order }),
          /* @__PURE__ */ jsx17(OrderFulfillmentSection, { order })
        ] }),
        /* @__PURE__ */ jsxs18(TwoColumnPage.Sidebar, { children: [
          /* @__PURE__ */ jsx17(OrderCustomerSection, { order }),
          /* @__PURE__ */ jsx17(OrderActivitySection, { order })
        ] })
      ]
    }
  );
};
export {
  OrderDetailBreadcrumb as Breadcrumb,
  OrderDetail as Component,
  orderLoader as loader
};
