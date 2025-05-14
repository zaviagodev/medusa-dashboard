import {
  formatCurrency
} from "./chunk-OV5NMSY6.mjs";
import {
  getOrderPaymentStatus
} from "./chunk-7DXVXBSA.mjs";
import {
  getLocaleAmount,
  getStylizedAmount
} from "./chunk-PDWBYQOW.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import {
  useCapturePayment
} from "./chunk-FO3VP56P.mjs";

// src/routes/orders/order-detail/components/order-payment-section/order-payment-section.tsx
import { ArrowDownRightMini, DocumentText, XCircle } from "@medusajs/icons";
import {
  Badge,
  Button,
  Container,
  Heading,
  StatusBadge,
  Text,
  toast as toast2,
  Tooltip as Tooltip2,
  usePrompt
} from "@medusajs/ui";
import { format } from "date-fns";
import { Trans, useTranslation as useTranslation2 } from "react-i18next";

// src/components/common/display-id/display-id.tsx
import { useTranslation } from "react-i18next";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { clx, toast, Tooltip } from "@medusajs/ui";
import { jsx, jsxs } from "react/jsx-runtime";
function DisplayId({ id, className }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const onClick = () => {
    copy(id);
    toast.success(t("actions.idCopiedToClipboard"));
  };
  return /* @__PURE__ */ jsx(Tooltip, { maxWidth: 260, content: id, open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs("span", { onClick, className: clx("cursor-pointer", className), children: [
    "#",
    id.slice(-7)
  ] }) });
}
var display_id_default = DisplayId;

// src/lib/payment.ts
var getTotalCaptured = (paymentCollections) => paymentCollections.reduce((acc, paymentCollection) => {
  acc = acc + (paymentCollection.captured_amount - paymentCollection.refunded_amount);
  return acc;
}, 0);
var getTotalPending = (paymentCollections) => paymentCollections.filter((pc) => pc.status !== "canceled").reduce((acc, paymentCollection) => {
  acc += paymentCollection.amount - paymentCollection.captured_amount;
  return acc;
}, 0);

// src/routes/orders/order-detail/components/order-payment-section/order-payment-section.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var getPaymentsFromOrder = (order) => {
  return order.payment_collections.map((collection) => collection.payments).flat(1).filter(Boolean);
};
var OrderPaymentSection = ({ order }) => {
  const payments = getPaymentsFromOrder(order);
  const refunds = payments.map((payment) => payment?.refunds).flat(1).filter(Boolean);
  return /* @__PURE__ */ jsxs2(Container, { className: "divide-y divide-dashed p-0", children: [
    /* @__PURE__ */ jsx2(Header, { order }),
    /* @__PURE__ */ jsx2(
      PaymentBreakdown,
      {
        order,
        payments,
        refunds,
        currencyCode: order.currency_code
      }
    ),
    /* @__PURE__ */ jsx2(Total, { order })
  ] });
};
var Header = ({ order }) => {
  const { t } = useTranslation2();
  const { label, color } = getOrderPaymentStatus(t, order.payment_status);
  return /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("orders.payment.title") }),
    /* @__PURE__ */ jsx2(StatusBadge, { color, className: "text-nowrap", children: label })
  ] });
};
var Refund = ({
  refund,
  currencyCode
}) => {
  const { t } = useTranslation2();
  const RefundReasonBadge = refund?.refund_reason && /* @__PURE__ */ jsx2(
    Badge,
    {
      size: "2xsmall",
      className: "cursor-default select-none capitalize",
      rounded: "full",
      children: refund.refund_reason.label
    }
  );
  const RefundNoteIndicator = refund.note && /* @__PURE__ */ jsx2(Tooltip2, { content: refund.note, children: /* @__PURE__ */ jsx2(DocumentText, { className: "text-ui-tag-neutral-icon ml-1 inline" }) });
  return /* @__PURE__ */ jsxs2("div", { className: "bg-ui-bg-subtle text-ui-fg-subtle grid grid-cols-[1fr_1fr_1fr_20px] items-center gap-x-4 px-6 py-4", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-row", children: [
      /* @__PURE__ */ jsx2("div", { className: "self-center pr-3", children: /* @__PURE__ */ jsx2(ArrowDownRightMini, { className: "text-ui-fg-muted" }) }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsxs2(Text, { size: "small", leading: "compact", weight: "plus", children: [
          t("orders.payment.refund"),
          " ",
          RefundNoteIndicator
        ] }),
        /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: format(new Date(refund.created_at), "dd MMM, yyyy, HH:mm:ss") })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-end", children: RefundReasonBadge }),
    /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxs2(Text, { size: "small", leading: "compact", children: [
      "- ",
      getLocaleAmount(refund.amount, currencyCode)
    ] }) })
  ] });
};
var Payment = ({
  order,
  payment,
  refunds,
  currencyCode
}) => {
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const { mutateAsync } = useCapturePayment(order.id, payment.id);
  const handleCapture = async () => {
    const res = await prompt({
      title: t("orders.payment.capture"),
      description: t("orders.payment.capturePayment", {
        amount: formatCurrency(payment.amount, currencyCode)
      }),
      confirmText: t("actions.confirm"),
      cancelText: t("actions.cancel"),
      variant: "confirmation"
    });
    if (!res) {
      return;
    }
    await mutateAsync(
      { amount: payment.amount },
      {
        onSuccess: () => {
          toast2.success(
            t("orders.payment.capturePaymentSuccess", {
              amount: formatCurrency(payment.amount, currencyCode)
            })
          );
        },
        onError: (error) => {
          toast2.error(error.message);
        }
      }
    );
  };
  const getPaymentStatusAttributes = (payment2) => {
    if (payment2.canceled_at) {
      return ["Canceled", "red"];
    } else if (payment2.captured_at) {
      return ["Captured", "green"];
    } else {
      return ["Pending", "orange"];
    }
  };
  const [status, color] = getPaymentStatusAttributes(payment);
  const showCapture = payment.captured_at === null && payment.canceled_at === null;
  const totalRefunded = payment.refunds.reduce(
    (acc, next) => next.amount + acc,
    0
  );
  return /* @__PURE__ */ jsxs2("div", { className: "divide-y divide-dashed", children: [
    /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle grid grid-cols-[1fr_1fr_1fr_20px] items-center gap-x-4 px-6 py-4 sm:grid-cols-[1fr_1fr_1fr_1fr_20px]", children: [
      /* @__PURE__ */ jsxs2("div", { className: "w-full min-w-[60px] overflow-hidden", children: [
        /* @__PURE__ */ jsx2(
          Text,
          {
            size: "small",
            leading: "compact",
            weight: "plus",
            className: "truncate",
            children: /* @__PURE__ */ jsx2(display_id_default, { id: payment.id })
          }
        ),
        /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: format(
          new Date(payment.created_at),
          "dd MMM, yyyy, HH:mm:ss"
        ) })
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "hidden items-center justify-end sm:flex", children: /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", className: "capitalize", children: payment.provider_id }) }),
      /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx2(StatusBadge, { color, className: "text-nowrap", children: status }) }),
      /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: getLocaleAmount(payment.amount, payment.currency_code) }) }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("orders.payment.refund"),
                  icon: /* @__PURE__ */ jsx2(XCircle, {}),
                  to: `/orders/${order.id}/refund?paymentId=${payment.id}`,
                  disabled: !payment.captured_at || !!payment.canceled_at || totalRefunded >= payment.amount
                }
              ]
            }
          ]
        }
      )
    ] }),
    showCapture && /* @__PURE__ */ jsxs2("div", { className: "bg-ui-bg-subtle flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx2(ArrowDownRightMini, { className: "text-ui-fg-muted shrink-0" }),
        /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: /* @__PURE__ */ jsx2(
          Trans,
          {
            i18nKey: "orders.payment.isReadyToBeCaptured",
            components: [/* @__PURE__ */ jsx2(display_id_default, { id: payment.id })]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs2(
        Button,
        {
          className: "shrink-0",
          size: "small",
          variant: "secondary",
          onClick: handleCapture,
          children: [
            /* @__PURE__ */ jsx2("span", { className: "hidden sm:block", children: t("orders.payment.capture") }),
            /* @__PURE__ */ jsx2("span", { className: "sm:hidden", children: t("orders.payment.capture_short") })
          ]
        }
      )
    ] }),
    refunds.map((refund) => /* @__PURE__ */ jsx2(Refund, { refund, currencyCode }, refund.id))
  ] });
};
var PaymentBreakdown = ({
  order,
  payments,
  refunds,
  currencyCode
}) => {
  const orderRefunds = refunds.filter((refund) => refund.payment_id === null);
  const entries = [...orderRefunds, ...payments].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  }).map((entry) => {
    return {
      event: entry,
      type: entry.id.startsWith("pay_") ? "payment" : "refund"
    };
  });
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-col divide-y divide-dashed", children: entries.map(({ type, event }) => {
    switch (type) {
      case "payment":
        return /* @__PURE__ */ jsx2(
          Payment,
          {
            order,
            payment: event,
            refunds: refunds.filter(
              (refund) => refund.payment_id === event.id
            ),
            currencyCode
          },
          event.id
        );
      case "refund":
        return /* @__PURE__ */ jsx2(
          Refund,
          {
            refund: event,
            currencyCode
          },
          event.id
        );
    }
  }) });
};
var Total = ({ order }) => {
  const { t } = useTranslation2();
  const totalPending = getTotalPending(order.payment_collections);
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", leading: "compact", children: t("orders.payment.totalPaidByCustomer") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", leading: "compact", children: getStylizedAmount(
        getTotalCaptured(order.payment_collections),
        order.currency_code
      ) })
    ] }),
    order.status !== "canceled" && totalPending > 0 && /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", leading: "compact", children: "Total pending" }),
      /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", leading: "compact", children: getStylizedAmount(totalPending, order.currency_code) })
    ] })
  ] });
};

export {
  getTotalCaptured,
  getPaymentsFromOrder,
  OrderPaymentSection
};
