import {
  PercentageInput
} from "./chunk-YRY2CZ6I.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import {
  CountrySelect
} from "./chunk-SCBXRJPV.mjs";
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
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-DG7J63J2.mjs";
import {
  i18n
} from "./chunk-3CBDGI2O.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import {
  useCreateTaxRegion
} from "./chunk-I6E6CALJ.mjs";
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
import "./chunk-FNYASI54.mjs";
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

// src/routes/tax-regions/tax-region-create/components/tax-region-create-form/tax-region-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InformationCircleSolid } from "@medusajs/icons";
import { Button, Heading, Input, Text, Tooltip, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionCreateSchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  rate: z.object({
    float: z.number().optional(),
    value: z.string().optional()
  }),
  country_code: z.string(),
  provider_id: z.string()
}).superRefine(({ provider_id, country_code }, ctx) => {
  if (!provider_id) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: i18n.t("taxRegions.create.errors.missingProvider"),
      path: ["provider_id"]
    });
  }
  if (!country_code) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: i18n.t("taxRegions.create.errors.missingCountry"),
      path: ["country_code"]
    });
  }
});
var TaxRegionCreateForm = ({ parentId }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const taxProviders = useComboboxData({
    queryKey: ["tax_providers"],
    queryFn: (params) => sdk.admin.taxProvider.list(params),
    getOptions: (data) => data.tax_providers.map((provider) => ({
      label: formatProvider(provider.id),
      value: provider.id
    }))
  });
  const form = useForm({
    defaultValues: {
      name: "",
      rate: {
        value: ""
      },
      code: "",
      country_code: "",
      provider_id: ""
    },
    resolver: zodResolver(TaxRegionCreateSchema)
  });
  const { mutateAsync, isPending } = useCreateTaxRegion();
  const handleSubmit = form.handleSubmit(async (values) => {
    const defaultRate = values.name ? {
      name: values.name,
      rate: values.rate?.value === "" ? void 0 : parseFloat(values.rate.value),
      code: values.code
    } : void 0;
    await mutateAsync(
      {
        country_code: values.country_code,
        parent_id: parentId,
        default_tax_rate: defaultRate,
        provider_id: values.provider_id
      },
      {
        onSuccess: ({ tax_region }) => {
          toast.success(t("taxRegions.create.successToast"));
          handleSuccess(`../${tax_region.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
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
            /* @__PURE__ */ jsx(Heading, { className: "capitalize", children: t("taxRegions.create.header") }),
            /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("taxRegions.create.hint") })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "country_code",
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
                name: "provider_id",
                render: ({ field }) => /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxProvider") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Combobox,
                    {
                      ...field,
                      options: taxProviders.options,
                      searchValue: taxProviders.searchValue,
                      onSearchValueChange: taxProviders.onSearchValueChange,
                      fetchNextPage: taxProviders.fetchNextPage
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] })
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1", children: [
              /* @__PURE__ */ jsx(Heading, { level: "h2", className: "!txt-compact-small-plus", children: t("taxRegions.fields.defaultTaxRate.label") }),
              /* @__PURE__ */ jsxs(
                Text,
                {
                  size: "small",
                  leading: "compact",
                  className: "text-ui-fg-muted",
                  children: [
                    "(",
                    t("fields.optional"),
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Tooltip,
                {
                  content: t("taxRegions.fields.defaultTaxRate.tooltip"),
                  children: /* @__PURE__ */ jsx(InformationCircleSolid, { className: "text-ui-fg-muted" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
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
                  name: "rate",
                  render: ({ field: { value, onChange, ...field } }) => {
                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                      /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxRate") }),
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        PercentageInput,
                        {
                          ...field,
                          value: value?.value,
                          onValueChange: (value2, _name, values) => onChange({
                            value: value2,
                            float: values?.float
                          })
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
                  name: "code",
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                      /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxCode") }),
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                      /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                    ] });
                  }
                }
              )
            ] }) })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/tax-regions/tax-region-create/tax-region-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var TaxRegionCreate = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(TaxRegionCreateForm, {}) });
};
export {
  TaxRegionCreate as Component,
  TaxRegionCreate
};
