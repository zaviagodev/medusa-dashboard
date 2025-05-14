import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
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
  usePaymentProviders
} from "./chunk-FO3VP56P.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegion,
  useUpdateRegion
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/regions/region-edit/region-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/regions/region-edit/components/edit-region-form/edit-region-form.tsx
import { Button, Input, Select, Switch, Text, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditRegionSchema = zod.object({
  name: zod.string().min(1),
  currency_code: zod.string(),
  payment_providers: zod.array(zod.string()),
  automatic_taxes: zod.boolean(),
  is_tax_inclusive: zod.boolean()
});
var EditRegionForm = ({
  region,
  currencies: currencies2,
  paymentProviders,
  pricePreferences
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const pricePreferenceForRegion = pricePreferences?.find(
    (preference) => preference.attribute === "region_id" && preference.value === region.id
  );
  const form = useForm({
    defaultValues: {
      name: region.name,
      currency_code: region.currency_code.toUpperCase(),
      payment_providers: region.payment_providers?.map((pp) => pp.id) || [],
      automatic_taxes: region.automatic_taxes,
      is_tax_inclusive: pricePreferenceForRegion?.is_tax_inclusive || false
    }
  });
  const { mutateAsync: updateRegion, isPending: isPendingRegion } = useUpdateRegion(region.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    await updateRegion(
      {
        name: values.name,
        automatic_taxes: values.automatic_taxes,
        currency_code: values.currency_code.toLowerCase(),
        payment_providers: values.payment_providers,
        is_tax_inclusive: values.is_tax_inclusive
      },
      {
        onSuccess: () => {
          toast.success(t("regions.toast.edit"));
          handleSuccess();
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "currency_code",
            render: ({ field: { onChange, ref, ...field } }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("fields.currency") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { onValueChange: onChange, ...field, children: [
                  /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                  /* @__PURE__ */ jsx(Select.Content, { children: currencies2.map((c) => /* @__PURE__ */ jsx(Select.Item, { value: c.code, children: c.code.toUpperCase() }, c.code)) })
                ] }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "automatic_taxes",
            render: ({ field: { value, onChange, ...field } }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.automaticTaxes") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Switch,
                    {
                      ...field,
                      checked: value,
                      onCheckedChange: onChange
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t("regions.automaticTaxesHint") }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] }) });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "is_tax_inclusive",
            render: ({ field: { value, onChange, ...field } }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.taxInclusivePricing") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Switch,
                    {
                      ...field,
                      checked: value,
                      onCheckedChange: onChange
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t("regions.taxInclusiveHint") }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] }) });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: "Providers" }),
          /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("regions.providersHint") })
        ] }),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "payment_providers",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("fields.paymentProviders") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                  Combobox,
                  {
                    options: paymentProviders.map((pp) => ({
                      label: formatProvider(pp.id),
                      value: pp.id
                    })),
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPendingRegion, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/regions/region-edit/region-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var RegionEdit = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const {
    region,
    isPending: isRegionLoading,
    isError: isRegionError,
    error: regionError
  } = useRegion(id, {
    fields: "*payment_providers,*countries,+automatic_taxes"
  });
  const {
    store,
    isPending: isStoreLoading,
    isError: isStoreError,
    error: storeError
  } = useStore();
  const {
    price_preferences: pricePreferences = [],
    isPending: isPreferenceLoading,
    isError: isPreferenceError,
    error: preferenceError
  } = usePricePreferences(
    {
      attribute: "region_id",
      value: id
    },
    { enabled: !!region }
  );
  const isLoading = isRegionLoading || isStoreLoading || isPreferenceLoading;
  const storeCurrencies = (store?.supported_currencies ?? []).map(
    (c) => currencies[c.currency_code.toUpperCase()]
  );
  const { payment_providers: paymentProviders = [] } = usePaymentProviders({
    limit: 999,
    is_enabled: true
  });
  if (isRegionError) {
    throw regionError;
  }
  if (isStoreError) {
    throw storeError;
  }
  if (isPreferenceError) {
    throw preferenceError;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("regions.editRegion") }) }),
    !isLoading && region && /* @__PURE__ */ jsx2(
      EditRegionForm,
      {
        region,
        currencies: storeCurrencies,
        paymentProviders,
        pricePreferences
      }
    )
  ] });
};
export {
  RegionEdit as Component
};
