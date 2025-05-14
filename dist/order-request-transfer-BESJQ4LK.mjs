import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
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
  useOrder,
  useRequestTransferOrder
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

// src/routes/orders/order-request-transfer/order-request-transfer.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/orders/order-request-transfer/components/create-order-transfer-form/create-order-transfer-form.tsx
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// src/routes/orders/order-request-transfer/components/create-order-transfer-form/transfer-header.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function TransferHeader() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "200",
      height: "128",
      viewBox: "0 0 200 128",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "0.00428286",
            y: "-0.742904",
            width: "33.5",
            height: "65.5",
            rx: "6.75",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 149.756 60.938)",
            className: "stroke-ui-fg-subtle fill-ui-bg-base",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "0.00428286",
            y: "-0.742904",
            width: "33.5",
            height: "65.5",
            rx: "6.75",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 149.756 57.9383)",
            className: "stroke-ui-fg-subtle fill-ui-bg-base",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_20787_38934)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M140.579 79.6421L139.126 80.4592",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.88",
              d: "M142.305 82.046L140.257 82.0342",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.75",
              d: "M140.552 84.4297L139.108 83.5959",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.63",
              d: "M136.347 85.3975L136.354 84.23",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.5",
              d: "M132.154 84.3813L133.606 83.5642",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.38",
              d: "M130.428 81.9775L132.476 81.9893",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.25",
              d: "M132.181 79.5938L133.625 80.4275",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              opacity: "0.13",
              d: "M136.386 78.626L136.379 79.7935",
              className: "stroke-ui-fg-subtle",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "12",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 156.447 64.7927)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "0.00428286",
            y: "-0.742904",
            width: "33.5",
            height: "65.5",
            rx: "6.75",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 77.0232 18.9148)",
            className: "stroke-ui-fg-subtle fill-ui-fg-muted",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            x: "0.00428286",
            y: "-0.742904",
            width: "33.5",
            height: "65.5",
            rx: "6.75",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 77.0232 15.9148)",
            className: "stroke-ui-fg-subtle fill-ui-bg-base",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "12",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 83.7141 22.7693)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "17",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 57.5554 39.458)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "12",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 53.1975 41.9094)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip1_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M52.3603 36.4564C50.9277 35.6287 48.59 35.6152 47.148 36.4264C45.7059 37.2375 45.6983 38.5703 47.1308 39.398C48.5634 40.2257 50.9011 40.2392 52.3432 39.428C53.7852 38.6169 53.7929 37.2841 52.3603 36.4564ZM48.4382 38.6626C47.7221 38.2488 47.726 37.5822 48.4468 37.1768C49.1676 36.7713 50.3369 36.7781 51.0529 37.1918C51.769 37.6055 51.7652 38.2722 51.0444 38.6776C50.3236 39.083 49.1543 39.0763 48.4382 38.6626Z",
            className: "fill-ui-fg-subtle"
          }
        ) }),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "17",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 69.7573 32.5945)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx(
          "rect",
          {
            width: "12",
            height: "3",
            rx: "1.5",
            transform: "matrix(0.865865 0.500278 -0.871576 0.490261 65.3994 35.0459)",
            className: "fill-ui-fg-muted"
          }
        ),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip2_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M64.5622 29.5929C63.1296 28.7652 60.7919 28.7517 59.3499 29.5628C57.9079 30.374 57.9002 31.7067 59.3327 32.5344C60.7653 33.3622 63.103 33.3756 64.5451 32.5645C65.9871 31.7534 65.9948 30.4206 64.5622 29.5929ZM63.8581 31.3974L60.8148 31.6267C60.6827 31.6368 60.5495 31.6135 60.4486 31.5632C60.4399 31.5587 60.4321 31.5547 60.4244 31.5502C60.3386 31.5006 60.2899 31.4337 60.2903 31.3639L60.2933 30.6203C60.2937 30.4754 60.5012 30.3587 60.7557 30.3602C61.0102 30.3616 61.2163 30.4802 61.2155 30.6258L61.2138 31.0671L63.7317 30.8771C63.9833 30.858 64.2168 30.9586 64.2512 31.1032C64.286 31.247 64.1101 31.379 63.8581 31.3978L63.8581 31.3974Z",
            className: "fill-ui-fg-subtle"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip3_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M93.106 54.3022L100.49 54.3448L100.514 50.135",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip4_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M103.496 60.3056L110.881 60.3482L110.905 56.1384",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip5_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M113.887 66.3088L121.271 66.3514L121.295 62.1416",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip6_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M86.1135 61.6911L78.7294 61.6486L78.7051 65.8583",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip7_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M96.5039 67.6945L89.1198 67.652L89.0955 71.8618",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { clipPath: "url(#clip8_20787_38934)", children: /* @__PURE__ */ jsx(
          "path",
          {
            d: "M106.894 73.6977L99.5102 73.6551L99.4859 77.8649",
            className: "stroke-ui-fg-subtle",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsx("clipPath", { id: "clip0_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 136.401 76.0686)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip1_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "6",
              height: "6",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 49.7627 34.9556)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip2_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "6",
              height: "6",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 61.9646 28.092)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip3_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 98.3596 47.1509)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip4_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 108.75 53.1543)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip5_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 119.14 59.1575)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip6_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 80.9282 56.9561)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip7_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 91.3186 62.9595)"
            }
          ) }),
          /* @__PURE__ */ jsx("clipPath", { id: "clip8_20787_38934", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "12",
              height: "12",
              className: "fill-ui-bg-base",
              transform: "matrix(0.865865 0.500278 -0.871576 0.490261 101.709 68.9626)"
            }
          ) })
        ] })
      ]
    }
  );
}

// src/routes/orders/order-request-transfer/components/create-order-transfer-form/create-order-transfer-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CreateOrderTransferSchema = zod.object({
  customer_id: zod.string().min(1),
  current_customer_details: zod.string().min(1)
});
function CreateOrderTransferForm({
  order
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      customer_id: "",
      current_customer_details: order.customer?.first_name ? `${order.customer?.first_name} ${order.customer?.last_name} (${order.customer?.email}) ` : order.customer?.email
    },
    resolver: zodResolver(CreateOrderTransferSchema)
  });
  const customers = useComboboxData({
    queryKey: ["customers"],
    queryFn: (params) => sdk.admin.customer.list({ ...params, has_account: true }),
    getOptions: (data) => data.customers.map((item) => ({
      label: `${item.first_name || ""} ${item.last_name || ""} (${item.email})`,
      value: item.id
    }))
  });
  const { mutateAsync, isPending } = useRequestTransferOrder(order.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync({
        customer_id: data.customer_id
      });
      toast.success(t("orders.transfer.requestSuccess", { email: order.email }));
      handleSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  });
  return /* @__PURE__ */ jsx2(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx2(RouteDrawer.Body, { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-8", children: [
          /* @__PURE__ */ jsx2("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx2(TransferHeader, {}) }),
          /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "current_customer_details",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.transfer.currentOwner") }),
                  /* @__PURE__ */ jsx2("span", { className: "txt-small text-ui-fg-muted", children: t("orders.transfer.currentOwnerDescription") }),
                  /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { type: "email", ...field, disabled: true }) }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "customer_id",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsx2(Form.Label, { children: t("orders.transfer.newOwner") }),
                  /* @__PURE__ */ jsx2("span", { className: "txt-small text-ui-fg-muted", children: t("orders.transfer.newOwnerDescription") }),
                  /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                    Combobox,
                    {
                      ...field,
                      options: customers.options,
                      searchValue: customers.searchValue,
                      onSearchValueChange: customers.onSearchValueChange,
                      fetchNextPage: customers.fetchNextPage,
                      className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                      placeholder: t("actions.select")
                    }
                  ) }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx2(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              isLoading: isPending,
              type: "submit",
              variant: "primary",
              size: "small",
              disabled: !!Object.keys(form.formState.errors || {}).length,
              children: t("actions.save")
            }
          )
        ] }) })
      ]
    }
  ) });
}

// src/routes/orders/order-request-transfer/order-request-transfer.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var OrderRequestTransfer = () => {
  const { t } = useTranslation2();
  const params = useParams();
  const orderId = params.order_id || params.id;
  const { order, isPending, isError } = useOrder(orderId, {
    fields: DEFAULT_FIELDS
  });
  if (!isPending && isError) {
    throw new Error("Order not found");
  }
  return /* @__PURE__ */ jsxs3(RouteDrawer, { children: [
    /* @__PURE__ */ jsx3(RouteDrawer.Header, { children: /* @__PURE__ */ jsx3(Heading, { children: t("orders.transfer.title") }) }),
    order && /* @__PURE__ */ jsx3(CreateOrderTransferForm, { order })
  ] });
};
export {
  OrderRequestTransfer as Component
};
