import {
  getCountryProvinceObjectByIso2
} from "./chunk-THZJC662.mjs";
import {
  PercentageInput
} from "./chunk-YRY2CZ6I.mjs";
import {
  SwitchBox
} from "./chunk-D7H6ZNK4.mjs";
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
import {
  useCreateTaxRegion,
  useTaxRegion
} from "./chunk-I6E6CALJ.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/tax-regions/tax-region-province-create/tax-region-province-create.tsx
import { useParams } from "react-router-dom";

// src/routes/tax-regions/tax-region-province-create/components/tax-region-province-create-form/tax-region-province-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { InformationCircleSolid } from "@medusajs/icons";
import { Button, Heading, Input, Text, Tooltip, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { z } from "zod";

// src/components/inputs/province-select/province-select.tsx
import {
  forwardRef,
  useImperativeHandle,
  useRef
} from "react";
import { TrianglesMini } from "@medusajs/icons";
import { clx } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var ProvinceSelect = forwardRef(
  ({
    className,
    disabled,
    placeholder,
    country_code,
    valueAs = "iso_2",
    ...props
  }, ref) => {
    const { t } = useTranslation();
    const innerRef = useRef(null);
    useImperativeHandle(ref, () => innerRef.current);
    const isPlaceholder = innerRef.current?.value === "";
    const provinceObject = getCountryProvinceObjectByIso2(country_code);
    if (!provinceObject) {
      disabled = true;
    }
    const options = Object.entries(provinceObject?.options ?? {}).map(
      ([iso2, name]) => {
        return /* @__PURE__ */ jsx("option", { value: valueAs === "iso_2" ? iso2 : name, children: name }, iso2);
      }
    );
    const placeholderText = provinceObject ? t(`taxRegions.fields.sublevels.placeholders.${provinceObject.type}`) : "";
    const placeholderOption = provinceObject ? /* @__PURE__ */ jsx("option", { value: "", disabled: true, className: "text-ui-fg-muted", children: placeholder || placeholderText }) : null;
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        TrianglesMini,
        {
          className: clx(
            "text-ui-fg-muted transition-fg pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
            {
              "text-ui-fg-disabled": disabled
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          disabled,
          className: clx(
            "bg-ui-bg-field shadow-buttons-neutral transition-fg txt-compact-small flex w-full select-none appearance-none items-center justify-between rounded-md px-2 py-1.5 outline-none",
            "placeholder:text-ui-fg-muted text-ui-fg-base",
            "hover:bg-ui-bg-field-hover",
            "focus-visible:shadow-borders-interactive-with-active data-[state=open]:!shadow-borders-interactive-with-active",
            "aria-[invalid=true]:border-ui-border-error aria-[invalid=true]:shadow-borders-error",
            "invalid::border-ui-border-error invalid:shadow-borders-error",
            "disabled:!bg-ui-bg-disabled disabled:!text-ui-fg-disabled",
            {
              "text-ui-fg-muted": isPlaceholder
            },
            className
          ),
          ...props,
          ref: innerRef,
          children: [
            placeholderOption,
            options
          ]
        }
      )
    ] });
  }
);
ProvinceSelect.displayName = "CountrySelect";

// src/routes/tax-regions/tax-region-province-create/components/tax-region-province-create-form/tax-region-province-create-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CreateTaxRegionProvinceSchema = z.object({
  province_code: z.string().min(1),
  name: z.string().optional(),
  code: z.string().min(1),
  rate: z.object({
    float: z.number().optional(),
    value: z.string().optional()
  }).optional(),
  is_combinable: z.boolean().optional()
});
var TaxRegionProvinceCreateForm = ({
  parent
}) => {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      province_code: "",
      code: "",
      is_combinable: false,
      name: "",
      rate: {
        value: ""
      }
    },
    resolver: zodResolver(CreateTaxRegionProvinceSchema)
  });
  const { mutateAsync, isPending } = useCreateTaxRegion();
  const handleSubmit = form.handleSubmit(async (values) => {
    const defaultRate = values.name && values.rate?.float ? {
      name: values.name,
      rate: values.rate.float,
      code: values.code,
      is_combinable: values.is_combinable
    } : void 0;
    await mutateAsync(
      {
        country_code: parent.country_code,
        province_code: values.province_code,
        parent_id: parent.id,
        default_tax_rate: defaultRate
      },
      {
        onSuccess: ({ tax_region }) => {
          toast.success(t("taxRegions.create.successToast"));
          handleSuccess(
            `/settings/tax-regions/${parent.id}/provinces/${tax_region.id}`
          );
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const countryProvinceObject = getCountryProvinceObjectByIso2(
    parent.country_code
  );
  const type = countryProvinceObject?.type || "sublevel";
  const label = t(`taxRegions.fields.sublevels.labels.${type}`);
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs2("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2(Heading, { children: t(`taxRegions.${type}.create.header`) }),
            /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-subtle", children: t(`taxRegions.${type}.create.hint`) })
          ] }),
          /* @__PURE__ */ jsx2("div", { className: "grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "province_code",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsx2(
                    Form.Label,
                    {
                      tooltip: !countryProvinceObject && t("taxRegions.fields.sublevels.tooltips.sublevel"),
                      children: label
                    }
                  ),
                  /* @__PURE__ */ jsx2(Form.Control, { children: countryProvinceObject ? /* @__PURE__ */ jsx2(
                    ProvinceSelect,
                    {
                      country_code: parent.country_code,
                      ...field
                    }
                  ) : /* @__PURE__ */ jsx2(Input, { ...field, placeholder: "KR-26" }) }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
              /* @__PURE__ */ jsx2(Heading, { level: "h2", className: "!txt-compact-small-plus", children: t("taxRegions.fields.defaultTaxRate.label") }),
              /* @__PURE__ */ jsxs2(
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
              /* @__PURE__ */ jsx2(
                Tooltip,
                {
                  content: t("taxRegions.fields.defaultTaxRate.tooltip"),
                  children: /* @__PURE__ */ jsx2(InformationCircleSolid, { className: "text-ui-fg-muted" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
              /* @__PURE__ */ jsx2(
                Form.Field,
                {
                  control: form.control,
                  name: "name",
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                      /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.name") }),
                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field }) }),
                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ jsx2(
                Form.Field,
                {
                  control: form.control,
                  name: "rate",
                  render: ({ field: { value, onChange, ...field } }) => {
                    return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                      /* @__PURE__ */ jsx2(Form.Label, { children: t("taxRegions.fields.taxRate") }),
                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
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
                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                    ] });
                  }
                }
              ),
              /* @__PURE__ */ jsx2(
                Form.Field,
                {
                  control: form.control,
                  name: "code",
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                      /* @__PURE__ */ jsx2(Form.Label, { children: t("taxRegions.fields.taxCode") }),
                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field }) }),
                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                    ] });
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx2(
            SwitchBox,
            {
              control: form.control,
              name: "is_combinable",
              label: t("taxRegions.fields.isCombinable.label"),
              description: t("taxRegions.fields.isCombinable.hint")
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/tax-regions/tax-region-province-create/tax-region-province-create.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var TaxProvinceCreate = () => {
  const { id } = useParams();
  const { tax_region, isPending, isError, error } = useTaxRegion(id);
  const ready = !isPending && !!tax_region;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx3(TaxRegionProvinceCreateForm, { parent: tax_region }) });
};
export {
  TaxProvinceCreate as Component,
  TaxProvinceCreate
};
