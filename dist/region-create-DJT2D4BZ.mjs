import {
  useCountries,
  useCountryTableColumns,
  useCountryTableQuery
} from "./chunk-NOAFLTPV.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import "./chunk-LQTHYS2Z.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  StackedFocusModal,
  useRouteModal,
  useStackedModal
} from "./chunk-4TC5YS65.mjs";
import {
  countries
} from "./chunk-DG7J63J2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-R2NIHOCX.mjs";
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
  useCreateRegion
} from "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/regions/region-create/components/create-region-form/create-region-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkMini } from "@medusajs/icons";
import {
  Button,
  Checkbox,
  Heading,
  Input,
  Select,
  Switch,
  Text,
  clx,
  toast
} from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateRegionSchema = zod.object({
  name: zod.string().min(1),
  currency_code: zod.string().min(2, "Select a currency"),
  automatic_taxes: zod.boolean(),
  is_tax_inclusive: zod.boolean(),
  countries: zod.array(zod.object({ code: zod.string(), name: zod.string() })),
  payment_providers: zod.array(zod.string()).min(1)
});
var PREFIX = "cr";
var PAGE_SIZE = 50;
var STACKED_MODAL_ID = "countries-modal";
var CreateRegionForm = ({
  currencies: currencies2,
  paymentProviders
}) => {
  const { setIsOpen } = useStackedModal();
  const [rowSelection, setRowSelection] = useState({});
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: "",
      currency_code: "",
      automatic_taxes: true,
      is_tax_inclusive: false,
      countries: [],
      payment_providers: []
    },
    resolver: zodResolver(CreateRegionSchema)
  });
  const selectedCountries = useWatch({
    control: form.control,
    name: "countries",
    defaultValue: []
  });
  const { t } = useTranslation();
  const { mutateAsync: createRegion, isPending: isPendingRegion } = useCreateRegion();
  const handleSubmit = form.handleSubmit(async (values) => {
    await createRegion(
      {
        name: values.name,
        countries: values.countries.map((c) => c.code),
        currency_code: values.currency_code,
        payment_providers: values.payment_providers,
        automatic_taxes: values.automatic_taxes,
        is_tax_inclusive: values.is_tax_inclusive
      },
      {
        onSuccess: ({ region }) => {
          toast.success(t("regions.toast.create"));
          handleSuccess(`../${region.id}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  const { searchParams, raw } = useCountryTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { countries: countries2, count } = useCountries({
    countries: countries.map((c, i) => ({
      display_name: c.display_name,
      name: c.name,
      id: i,
      iso_2: c.iso_2,
      iso_3: c.iso_3,
      num_code: c.num_code,
      region_id: null,
      region: {}
    })),
    ...searchParams
  });
  const columns = useColumns();
  const { table } = useDataTable({
    data: countries2 || [],
    columns,
    count,
    enablePagination: true,
    enableRowSelection: true,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    },
    getRowId: (row) => row.iso_2,
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const saveCountries = () => {
    const selected = Object.keys(rowSelection).filter(
      (key) => rowSelection[key]
    );
    form.setValue(
      "countries",
      selected.map((key) => ({
        code: key,
        name: countries.find((c) => c.iso_2 === key).display_name
      })),
      { shouldDirty: true, shouldTouch: true }
    );
    setIsOpen(STACKED_MODAL_ID, false);
  };
  const removeCountry = (code) => {
    const update = selectedCountries.filter((c) => c.code !== code);
    const ids = update.map((c) => c.code).reduce((acc, c) => {
      acc[c] = true;
      return acc;
    }, {});
    form.setValue("countries", update, { shouldDirty: true, shouldTouch: true });
    setRowSelection(ids);
  };
  const clearCountries = () => {
    form.setValue("countries", [], { shouldDirty: true, shouldTouch: true });
    setRowSelection({});
  };
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex h-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPendingRegion, children: t("actions.save") })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex overflow-hidden", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: clx(
              "flex h-full w-full flex-col items-center overflow-y-auto p-16"
            ),
            id: "form-section",
            children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Heading, { children: t("regions.createRegion") }),
                /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("regions.createRegionHint") })
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
                    name: "currency_code",
                    render: ({ field: { onChange, ref, ...field } }) => {
                      return /* @__PURE__ */ jsxs(Form.Item, { children: [
                        /* @__PURE__ */ jsx(Form.Label, { children: t("fields.currency") }),
                        /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: onChange, children: [
                          /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                          /* @__PURE__ */ jsx(Select.Content, { children: currencies2.map((currency) => /* @__PURE__ */ jsx(
                            Select.Item,
                            {
                              value: currency.code,
                              children: currency.name
                            },
                            currency.code
                          )) })
                        ] }) }),
                        /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                      ] });
                    }
                  }
                )
              ] }) }),
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
              ),
              /* @__PURE__ */ jsx("div", { className: "bg-ui-border-base h-px w-full" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.countries") }),
                  /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("regions.countriesHint") })
                ] }),
                selectedCountries.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  selectedCountries.map((country) => /* @__PURE__ */ jsx(
                    CountryTag,
                    {
                      country,
                      onRemove: removeCountry
                    },
                    country.code
                  )),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "transparent",
                      size: "small",
                      className: "text-ui-fg-muted hover:text-ui-fg-subtle",
                      onClick: clearCountries,
                      children: t("actions.clearAll")
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs(StackedFocusModal, { id: STACKED_MODAL_ID, children: [
                  /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("regions.addCountries") }) }) }),
                  /* @__PURE__ */ jsx(StackedFocusModal.Content, { children: /* @__PURE__ */ jsxs("div", { className: "flex size-full flex-col overflow-hidden", children: [
                    /* @__PURE__ */ jsx(StackedFocusModal.Header, { children: /* @__PURE__ */ jsx(StackedFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: t("regions.addCountries") }) }) }),
                    /* @__PURE__ */ jsx(StackedFocusModal.Body, { className: "overflow-hidden", children: /* @__PURE__ */ jsx(
                      _DataTable,
                      {
                        table,
                        columns,
                        count,
                        pageSize: PAGE_SIZE,
                        orderBy: [
                          { key: "display_name", label: t("fields.name") },
                          { key: "iso_2", label: t("fields.code") }
                        ],
                        pagination: true,
                        search: "autofocus",
                        layout: "fill",
                        queryObject: raw,
                        prefix: PREFIX
                      }
                    ) }),
                    /* @__PURE__ */ jsx(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
                      /* @__PURE__ */ jsx(StackedFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
                      /* @__PURE__ */ jsx(
                        Button,
                        {
                          size: "small",
                          type: "button",
                          onClick: saveCountries,
                          children: t("actions.save")
                        }
                      )
                    ] }) })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "bg-ui-border-base h-px w-full" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.providers") }),
                  /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("regions.providersHint") })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsx(
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
                ) })
              ] })
            ] })
          }
        ) })
      ]
    }
  ) });
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useCountryTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          const isPreselected = !row.getCanSelect();
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: row.getIsSelected() || isPreselected,
              disabled: isPreselected,
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
        }
      }),
      ...base
    ],
    [base]
  );
};
var CountryTag = ({
  country,
  onRemove
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-field shadow-borders-base transition-fg hover:bg-ui-bg-field-hover flex h-7 items-center overflow-hidden rounded-md", children: [
    /* @__PURE__ */ jsx("div", { className: "txt-compact-small-plus flex h-full select-none items-center justify-center px-2 py-0.5", children: country.name }),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onRemove(country.code),
        className: "focus-visible:bg-ui-bg-field-hover transition-fg hover:bg-ui-bg-field-hover flex h-full w-7 items-center justify-center border-l outline-none",
        children: /* @__PURE__ */ jsx(XMarkMini, { className: "text-ui-fg-muted" })
      }
    )
  ] });
};

// src/routes/regions/region-create/region-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var RegionCreate = () => {
  const { store, isPending: isLoading, isError, error } = useStore();
  const storeCurrencies = (store?.supported_currencies ?? []).map(
    (c) => currencies[c.currency_code.toUpperCase()]
  );
  const { payment_providers: paymentProviders = [] } = usePaymentProviders({
    is_enabled: true
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: !isLoading && store && /* @__PURE__ */ jsx2(
    CreateRegionForm,
    {
      currencies: storeCurrencies,
      paymentProviders
    }
  ) });
};
export {
  RegionCreate as Component
};
