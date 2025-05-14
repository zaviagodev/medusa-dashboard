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
import {
  useStockLocation,
  useUpdateStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-edit/location-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/locations/location-edit/components/edit-location-form/edit-location-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditLocationSchema = zod.object({
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
    // TODO: Add validation
  })
});
var EditLocationForm = ({ location }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: location.name,
      address: {
        address_1: location.address?.address_1 || "",
        address_2: location.address?.address_2 || "",
        city: location.address?.city || "",
        company: location.address?.company || "",
        country_code: location.address?.country_code || "",
        phone: location.address?.phone || "",
        postal_code: location.address?.postal_code || "",
        province: location.address?.province || ""
      }
    },
    resolver: zodResolver(EditLocationSchema)
  });
  const { mutateAsync, isPending } = useUpdateStockLocation(location.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    const { name, address } = values;
    await mutateAsync(
      {
        name,
        address
      },
      {
        onSuccess: () => {
          toast.success(t("stockLocations.edit.successToast"));
          handleSuccess();
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex flex-1 flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex flex-col gap-y-8 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
          /* @__PURE__ */ jsx(
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
          ),
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
        ] }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/locations/location-edit/location-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var LocationEdit = () => {
  const { t } = useTranslation2();
  const { location_id } = useParams();
  const { stock_location, isPending, isError, error } = useStockLocation(
    location_id,
    {
      fields: "*address"
    }
  );
  const ready = !isPending && !!stock_location;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { className: "capitalize", children: t("locations.editLocation") }) }),
    ready && /* @__PURE__ */ jsx2(EditLocationForm, { location: stock_location })
  ] });
};
export {
  LocationEdit as Component
};
