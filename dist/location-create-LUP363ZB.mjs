import {
  CountrySelect
} from "./chunk-SCBXRJPV.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-DG7J63J2.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useCreateStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-create/components/create-location-form/create-location-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Input, Text, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateLocationSchema = zod.object({
  name: zod.string().min(1),
  address: zod.object({
    address_1: zod.string().min(1),
    address_2: zod.string().optional(),
    country_code: zod.string().min(2).max(2),
    city: zod.string().optional(),
    postal_code: zod.string().optional(),
    province: zod.string().optional(),
    company: zod.string().optional(),
    phone: zod.string().optional()
  })
});
var CreateLocationForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: "",
      address: {
        address_1: "",
        address_2: "",
        city: "",
        company: "",
        country_code: "",
        phone: "",
        postal_code: "",
        province: ""
      }
    },
    resolver: zodResolver(CreateLocationSchema)
  });
  const { mutateAsync, isPending } = useCreateStockLocation();
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        name: values.name,
        address: values.address
      },
      {
        onSuccess: ({ stock_location }) => {
          toast.success(t("locations.toast.create"));
          handleSuccess(`/settings/locations/${stock_location.id}`);
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
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Heading, { className: "capitalize", children: t("stockLocations.create.header") }),
            /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("stockLocations.create.hint") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "name",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "address.address_1",
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
                name: "address.address_2",
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
                name: "address.postal_code",
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
                name: "address.city",
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
                name: "address.country_code",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("fields.country") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(CountrySelect, { ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "address.province",
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
                name: "address.company",
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
                name: "address.phone",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.phone") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            )
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "small", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/locations/location-create/location-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var LocationCreate = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(CreateLocationForm, {}) });
};
export {
  LocationCreate as Component
};
