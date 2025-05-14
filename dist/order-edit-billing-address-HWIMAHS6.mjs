import {
  DEFAULT_FIELDS
} from "./chunk-7I5DQGWY.mjs";
import {
  CountrySelect
} from "./chunk-SCBXRJPV.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-DG7J63J2.mjs";
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
  useUpdateOrder
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

// src/routes/orders/order-edit-billing-address/order-edit-billing-address.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/orders/order-edit-billing-address/components/edit-order-billing-address-form/edit-order-billing-address-form.tsx
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var EditOrderBillingAddressSchema = zod.object({
  address_1: zod.string().min(1),
  address_2: zod.string().optional(),
  country_code: zod.string().min(2).max(2),
  city: zod.string().optional(),
  postal_code: zod.string().optional(),
  province: zod.string().optional(),
  company: zod.string().optional(),
  phone: zod.string().optional()
});
function EditOrderBillingAddressForm({
  order
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      address_1: order.billing_address?.address_1 || "",
      address_2: order.billing_address?.address_2 || "",
      city: order.billing_address?.city || "",
      company: order.billing_address?.company || "",
      country_code: order.billing_address?.country_code || "",
      phone: order.billing_address?.phone || "",
      postal_code: order.billing_address?.postal_code || "",
      province: order.billing_address?.province || ""
    },
    resolver: zodResolver(EditOrderBillingAddressSchema)
  });
  const { mutateAsync, isPending } = useUpdateOrder(order.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync({
        billing_address: data
      });
      toast.success(t("orders.edit.billingAddress.requestSuccess"));
      handleSuccess();
    } catch (error) {
      toast.error(error.message);
    }
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "address_1",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.address") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "address_2",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.address2") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "postal_code",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.postalCode") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "city",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.city") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "country_code",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.country") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(CountrySelect, { ...field, disabled: true }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "province",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.state") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "company",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.company") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "phone",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.phone") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(
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

// src/routes/orders/order-edit-billing-address/order-edit-billing-address.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var OrderEditBillingAddress = () => {
  const { t } = useTranslation2();
  const params = useParams();
  const { order, isPending, isError, error } = useOrder(params.id, {
    fields: DEFAULT_FIELDS
  });
  if (!isPending && isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("orders.edit.billingAddress.title") }) }),
    order && /* @__PURE__ */ jsx2(EditOrderBillingAddressForm, { order })
  ] });
};
export {
  OrderEditBillingAddress as Component
};
