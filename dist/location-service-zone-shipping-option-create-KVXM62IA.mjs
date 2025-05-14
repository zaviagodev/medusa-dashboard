import {
  ConditionalPriceForm,
  ConditionalPriceSchema,
  ShippingOptionPriceProvider,
  buildShippingOptionPriceRules,
  useShippingOptionPriceColumns
} from "./chunk-VTDYXPA4.mjs";
import {
  CONDITIONAL_PRICES_STACKED_MODAL_ID,
  ShippingOptionPriceType
} from "./chunk-PYIO3TDQ.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import "./chunk-PDWBYQOW.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  DataGrid
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  SwitchBox
} from "./chunk-D7H6ZNK4.mjs";
import {
  castNumber
} from "./chunk-6GU6IDUA.mjs";
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
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
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
import {
  useCreateShippingOptions
} from "./chunk-GRT22PE5.mjs";
import {
  useFulfillmentProviderOptions,
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-service-zone-shipping-option-create/location-service-zone-shipping-option-create.tsx
import { json, useParams, useSearchParams } from "react-router-dom";

// src/routes/locations/location-service-zone-shipping-option-create/components/create-shipping-options-form/create-shipping-options-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ProgressTabs, toast } from "@medusajs/ui";
import { useForm, useWatch as useWatch2 } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useState as useState2 } from "react";

// src/routes/locations/location-service-zone-shipping-option-create/components/create-shipping-options-form/create-shipping-option-details-form.tsx
import { Divider, Heading, Input, RadioGroup, Select, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
import { createElement } from "react";
var CreateShippingOptionDetailsForm = ({
  form,
  isReturn = false,
  zone,
  locationId,
  fulfillmentProviderOptions,
  selectedProviderId,
  type
}) => {
  const { t } = useTranslation();
  const isPickup = type === "pickup" /* Pickup */;
  const shippingProfiles = useComboboxData({
    queryFn: (params) => sdk.admin.shippingProfile.list(params),
    queryKey: ["shipping_profiles"],
    getOptions: (data) => data.shipping_profiles.map((profile) => ({
      label: profile.name,
      value: profile.id
    }))
  });
  const fulfillmentProviders = useComboboxData({
    queryFn: (params) => sdk.admin.fulfillmentProvider.list({
      ...params,
      stock_location_id: locationId
    }),
    queryKey: ["fulfillment_providers"],
    getOptions: (data) => data.fulfillment_providers.map((provider) => ({
      label: formatProvider(provider.id),
      value: provider.id
    }))
  });
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-6 py-16", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Heading, { children: t(
        `stockLocations.shippingOptions.create.${isPickup ? "pickup" : isReturn ? "returns" : "shipping"}.header`,
        {
          zone: zone.name
        }
      ) }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t(
        `stockLocations.shippingOptions.create.${isReturn ? "returns" : isPickup ? "pickup" : "shipping"}.hint`
      ) })
    ] }),
    !isPickup && /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "price_type",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsx(Form.Label, { children: t("stockLocations.shippingOptions.fields.priceType.label") }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
              RadioGroup,
              {
                className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                ...field,
                onValueChange: field.onChange,
                children: [
                  /* @__PURE__ */ jsx(
                    RadioGroup.ChoiceBox,
                    {
                      className: "flex-1",
                      value: "flat" /* FlatRate */,
                      label: t(
                        "stockLocations.shippingOptions.fields.priceType.options.fixed.label"
                      ),
                      description: t(
                        "stockLocations.shippingOptions.fields.priceType.options.fixed.hint"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    RadioGroup.ChoiceBox,
                    {
                      className: "flex-1",
                      value: "calculated" /* Calculated */,
                      label: t(
                        "stockLocations.shippingOptions.fields.priceType.options.calculated.label"
                      ),
                      description: t(
                        "stockLocations.shippingOptions.fields.priceType.options.calculated.hint"
                      )
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
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
          name: "shipping_profile_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("stockLocations.shippingOptions.fields.profile") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: shippingProfiles.options,
                  searchValue: shippingProfiles.searchValue,
                  onSearchValueChange: shippingProfiles.onSearchValueChange,
                  disabled: shippingProfiles.disabled
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "provider_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(
                Form.Label,
                {
                  tooltip: t(
                    "stockLocations.fulfillmentProviders.shippingOptionsTooltip"
                  ),
                  children: t("stockLocations.shippingOptions.fields.provider")
                }
              ),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  onChange: (e) => {
                    field.onChange(e);
                    form.setValue("fulfillment_option_id", "");
                  },
                  options: fulfillmentProviders.options,
                  searchValue: fulfillmentProviders.searchValue,
                  onSearchValueChange: fulfillmentProviders.onSearchValueChange,
                  disabled: fulfillmentProviders.disabled
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
          name: "fulfillment_option_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t(
                "stockLocations.shippingOptions.fields.fulfillmentOption"
              ) }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ createElement(
                Select,
                {
                  ...field,
                  onValueChange: field.onChange,
                  disabled: !selectedProviderId,
                  key: selectedProviderId
                },
                /* @__PURE__ */ jsx(Select.Trigger, { ref: field.ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                /* @__PURE__ */ jsx(Select.Content, { children: fulfillmentProviderOptions?.filter((fo) => !!fo.is_return === isReturn).map((option) => /* @__PURE__ */ jsx(Select.Item, { value: option.id, children: option.name || option.id }, option.id)) })
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(
      SwitchBox,
      {
        control: form.control,
        name: "enabled_in_store",
        label: t("stockLocations.shippingOptions.fields.enableInStore.label"),
        description: t(
          "stockLocations.shippingOptions.fields.enableInStore.hint"
        )
      }
    )
  ] }) });
};

// src/routes/locations/location-service-zone-shipping-option-create/components/create-shipping-options-form/create-shipping-options-prices-form.tsx
import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CreateShippingOptionsPricesForm = ({
  form,
  type
}) => {
  const isPickup = type === "pickup" /* Pickup */;
  const { getIsOpen, setIsOpen } = useStackedModal();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const onOpenConditionalPricesModal = (info) => {
    setIsOpen(CONDITIONAL_PRICES_STACKED_MODAL_ID, true);
    setSelectedPrice(info);
  };
  const onCloseConditionalPricesModal = () => {
    setIsOpen(CONDITIONAL_PRICES_STACKED_MODAL_ID, false);
    setSelectedPrice(null);
  };
  const {
    store,
    isLoading: isStoreLoading,
    isError: isStoreError,
    error: storeError
  } = useStore();
  const currencies = useMemo(
    () => store?.supported_currencies?.map((c) => c.currency_code) || [],
    [store]
  );
  const {
    regions,
    isLoading: isRegionsLoading,
    isError: isRegionsError,
    error: regionsError
  } = useRegions({
    fields: "id,name,currency_code",
    limit: 999
  });
  const { price_preferences: pricePreferences } = usePricePreferences({});
  const { setCloseOnEscape } = useRouteModal();
  const name = useWatch({ control: form.control, name: "name" });
  const columns = useShippingOptionPriceColumns({
    name,
    currencies,
    regions,
    pricePreferences
  });
  const isLoading = isStoreLoading || !store || isRegionsLoading || !regions;
  const data = useMemo(
    () => [[...currencies || [], ...regions || []]],
    [currencies, regions]
  );
  useEffect(() => {
    if (!isLoading && isPickup) {
      if (currencies.length > 0) {
        currencies.forEach((currency) => {
          form.setValue(`currency_prices.${currency}`, "0");
        });
      }
      if (regions.length > 0) {
        regions.forEach((region) => {
          form.setValue(`region_prices.${region.id}`, "0");
        });
      }
    }
  }, [isLoading, isPickup]);
  if (isStoreError) {
    throw storeError;
  }
  if (isRegionsError) {
    throw regionsError;
  }
  return /* @__PURE__ */ jsx2(
    StackedFocusModal,
    {
      id: CONDITIONAL_PRICES_STACKED_MODAL_ID,
      onOpenChangeCallback: (open) => {
        if (!open) {
          setSelectedPrice(null);
        }
      },
      children: /* @__PURE__ */ jsx2(
        ShippingOptionPriceProvider,
        {
          onOpenConditionalPricesModal,
          onCloseConditionalPricesModal,
          children: /* @__PURE__ */ jsxs2("div", { className: "flex size-full flex-col divide-y overflow-hidden", children: [
            /* @__PURE__ */ jsx2(
              DataGrid,
              {
                isLoading,
                data,
                columns,
                state: form,
                onEditingChange: (editing) => setCloseOnEscape(!editing),
                disableInteractions: getIsOpen(CONDITIONAL_PRICES_STACKED_MODAL_ID)
              }
            ),
            selectedPrice && /* @__PURE__ */ jsx2(ConditionalPriceForm, { info: selectedPrice, variant: "create" })
          ] })
        }
      )
    }
  );
};

// src/routes/locations/location-service-zone-shipping-option-create/components/create-shipping-options-form/schema.ts
import { z } from "zod";
var CreateShippingOptionDetailsSchema = z.object({
  name: z.string().min(1),
  price_type: z.nativeEnum(ShippingOptionPriceType),
  enabled_in_store: z.boolean(),
  shipping_profile_id: z.string().min(1),
  provider_id: z.string().min(1),
  fulfillment_option_id: z.string().min(1)
});
var ShippingOptionConditionalPriceSchema = z.object({
  conditional_region_prices: z.record(
    z.string(),
    z.array(ConditionalPriceSchema).optional()
  ),
  conditional_currency_prices: z.record(
    z.string(),
    z.array(ConditionalPriceSchema).optional()
  )
});
var CreateShippingOptionSchema = z.object({
  region_prices: z.record(z.string(), z.string().optional()),
  currency_prices: z.record(z.string(), z.string().optional())
}).merge(CreateShippingOptionDetailsSchema).merge(ShippingOptionConditionalPriceSchema);

// src/routes/locations/location-service-zone-shipping-option-create/components/create-shipping-options-form/create-shipping-options-form.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function CreateShippingOptionsForm({
  zone,
  isReturn,
  locationId,
  type
}) {
  const [activeTab, setActiveTab] = useState2("details" /* DETAILS */);
  const [validDetails, setValidDetails] = useState2(false);
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: "",
      price_type: "flat" /* FlatRate */,
      enabled_in_store: true,
      shipping_profile_id: "",
      provider_id: "",
      fulfillment_option_id: "",
      region_prices: {},
      currency_prices: {},
      conditional_region_prices: {},
      conditional_currency_prices: {}
    },
    resolver: zodResolver(CreateShippingOptionSchema)
  });
  const selectedProviderId = useWatch2({
    control: form.control,
    name: "provider_id"
  });
  const { fulfillment_options: fulfillmentProviderOptions } = useFulfillmentProviderOptions(selectedProviderId, {
    enabled: !!selectedProviderId
  });
  const isCalculatedPriceType = form.watch("price_type") === "calculated" /* Calculated */;
  const { mutateAsync, isPending: isLoading } = useCreateShippingOptions();
  const handleSubmit = form.handleSubmit(async (data) => {
    const currencyPrices = Object.entries(data.currency_prices).map(([code, value]) => {
      if (!value) {
        return void 0;
      }
      return {
        currency_code: code,
        amount: castNumber(value)
      };
    }).filter((p) => !!p);
    const regionPrices = Object.entries(data.region_prices).map(([region_id, value]) => {
      if (!value) {
        return void 0;
      }
      return {
        region_id,
        amount: castNumber(value)
      };
    }).filter((p) => !!p);
    const conditionalRegionPrices = Object.entries(
      data.conditional_region_prices
    ).flatMap(([region_id, value]) => {
      const prices = value?.map((rule) => ({
        region_id,
        amount: castNumber(rule.amount),
        rules: buildShippingOptionPriceRules(rule)
      })) || [];
      return prices?.filter(Boolean);
    });
    const conditionalCurrencyPrices = Object.entries(
      data.conditional_currency_prices
    ).flatMap(([currency_code, value]) => {
      const prices = value?.map((rule) => ({
        currency_code,
        amount: castNumber(rule.amount),
        rules: buildShippingOptionPriceRules(rule)
      })) || [];
      return prices?.filter(Boolean);
    });
    const allPrices = [
      ...currencyPrices,
      ...conditionalCurrencyPrices,
      ...regionPrices,
      ...conditionalRegionPrices
    ];
    const fulfillmentOptionData = fulfillmentProviderOptions?.find(
      (fo) => fo.id === data.fulfillment_option_id
    );
    await mutateAsync(
      {
        name: data.name,
        price_type: data.price_type,
        service_zone_id: zone.id,
        shipping_profile_id: data.shipping_profile_id,
        provider_id: data.provider_id,
        prices: allPrices,
        data: fulfillmentOptionData,
        rules: [
          {
            // eslint-disable-next-line
            value: isReturn ? "true" : "false",
            attribute: "is_return",
            operator: "eq"
          },
          {
            // eslint-disable-next-line
            value: data.enabled_in_store ? "true" : "false",
            attribute: "enabled_in_store",
            operator: "eq"
          }
        ],
        type: {
          // TODO: FETCH TYPES
          label: "Type label",
          description: "Type description",
          code: "type-code"
        }
      },
      {
        onSuccess: ({ shipping_option }) => {
          toast.success(
            t(
              `stockLocations.shippingOptions.create.${isReturn ? "returns" : "shipping"}.successToast`,
              { name: shipping_option.name }
            )
          );
          handleSuccess(`/settings/locations/${locationId}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  const onTabChange = (tab) => {
    if (tab === "pricing" /* PRICING */) {
      form.clearErrors();
      const result = CreateShippingOptionDetailsSchema.safeParse({
        ...form.getValues()
      });
      if (!result.success) {
        const [firstError, ...rest] = result.error.errors;
        for (const error of rest) {
          const _path = error.path.join(".");
          form.setError(_path, {
            message: error.message,
            type: error.code
          });
        }
        form.setError(
          firstError.path.join("."),
          {
            message: firstError.message,
            type: firstError.code
          },
          {
            shouldFocus: true
          }
        );
        setValidDetails(false);
        return;
      }
      setValidDetails(true);
    }
    setActiveTab(tab);
  };
  const pricesStatus = form.getFieldState("currency_prices")?.isDirty || form.getFieldState("region_prices")?.isDirty || activeTab === "pricing" /* PRICING */ ? "in-progress" : "not-started";
  const detailsStatus = validDetails ? "completed" : "in-progress";
  return /* @__PURE__ */ jsx3(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsx3(
    KeyboundForm,
    {
      className: "flex h-full flex-col",
      onSubmit: handleSubmit,
      onKeyDown: (e) => {
        const isEnterKey = e.key === "Enter";
        const isModifierPressed = e.metaKey || e.ctrlKey;
        const shouldContinueToPricing = activeTab !== "pricing" /* PRICING */ && !isCalculatedPriceType;
        if (!isEnterKey) {
          return;
        }
        e.preventDefault();
        if (!isModifierPressed) {
          return;
        }
        if (shouldContinueToPricing) {
          e.stopPropagation();
          onTabChange("pricing" /* PRICING */);
          return;
        }
        handleSubmit();
      },
      children: /* @__PURE__ */ jsxs3(
        ProgressTabs,
        {
          value: activeTab,
          className: "flex h-full flex-col overflow-hidden",
          onValueChange: (tab) => onTabChange(tab),
          children: [
            /* @__PURE__ */ jsx3(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs3(ProgressTabs.List, { className: "border-ui-border-base -my-2 ml-2 min-w-0 flex-1 border-l", children: [
              /* @__PURE__ */ jsx3(
                ProgressTabs.Trigger,
                {
                  value: "details" /* DETAILS */,
                  status: detailsStatus,
                  className: "w-full max-w-[200px]",
                  children: /* @__PURE__ */ jsx3("span", { className: "w-full cursor-auto overflow-hidden text-ellipsis whitespace-nowrap", children: t("stockLocations.shippingOptions.create.tabs.details") })
                }
              ),
              !isCalculatedPriceType && /* @__PURE__ */ jsx3(
                ProgressTabs.Trigger,
                {
                  value: "pricing" /* PRICING */,
                  status: pricesStatus,
                  className: "w-full max-w-[200px]",
                  children: /* @__PURE__ */ jsx3("span", { className: "w-full overflow-hidden text-ellipsis whitespace-nowrap", children: t("stockLocations.shippingOptions.create.tabs.prices") })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs3(RouteFocusModal.Body, { className: "size-full overflow-hidden", children: [
              /* @__PURE__ */ jsx3(
                ProgressTabs.Content,
                {
                  value: "details" /* DETAILS */,
                  className: "size-full overflow-y-auto",
                  children: /* @__PURE__ */ jsx3(
                    CreateShippingOptionDetailsForm,
                    {
                      form,
                      zone,
                      isReturn,
                      type,
                      locationId,
                      fulfillmentProviderOptions: fulfillmentProviderOptions || [],
                      selectedProviderId
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx3(ProgressTabs.Content, { value: "pricing" /* PRICING */, className: "size-full", children: /* @__PURE__ */ jsx3(CreateShippingOptionsPricesForm, { form, type }) })
            ] }),
            /* @__PURE__ */ jsx3(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end gap-x-2", children: [
              /* @__PURE__ */ jsx3(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
              activeTab === "pricing" /* PRICING */ || isCalculatedPriceType ? /* @__PURE__ */ jsx3(
                Button,
                {
                  size: "small",
                  className: "whitespace-nowrap",
                  isLoading,
                  type: "submit",
                  children: t("actions.save")
                },
                "submit-btn"
              ) : /* @__PURE__ */ jsx3(
                Button,
                {
                  size: "small",
                  className: "whitespace-nowrap",
                  isLoading,
                  onClick: () => onTabChange("pricing" /* PRICING */),
                  type: "button",
                  children: t("actions.continue")
                },
                "continue-btn"
              )
            ] }) })
          ]
        }
      )
    }
  ) });
}

// src/routes/locations/location-service-zone-shipping-option-create/constants.ts
var LOC_CREATE_SHIPPING_OPTION_FIELDS = "*fulfillment_sets,*fulfillment_sets.service_zones,*fulfillment_sets.service_zones.shipping_options";

// src/routes/locations/location-service-zone-shipping-option-create/location-service-zone-shipping-option-create.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function LocationServiceZoneShippingOptionCreate() {
  const { location_id, fset_id, zone_id } = useParams();
  const [searchParams] = useSearchParams();
  const isReturn = searchParams.has("is_return");
  const { stock_location, isPending, isFetching, isError, error } = useStockLocation(location_id, {
    fields: LOC_CREATE_SHIPPING_OPTION_FIELDS
  });
  const fulfillmentSet = stock_location?.fulfillment_sets?.find(
    (f) => f.id === fset_id
  );
  if (!isPending && !isFetching && !fulfillmentSet) {
    throw json(
      { message: `Fulfillment set with ID ${fset_id} was not found` },
      404
    );
  }
  const zone = fulfillmentSet?.service_zones?.find((z2) => z2.id === zone_id);
  if (!isPending && !isFetching && !zone) {
    throw json(
      { message: `Service zone with ID ${zone_id} was not found` },
      404
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx4(RouteFocusModal, { prev: `/settings/locations/${location_id}`, children: zone && /* @__PURE__ */ jsx4(
    CreateShippingOptionsForm,
    {
      zone,
      isReturn,
      locationId: location_id,
      type: fulfillmentSet.type
    }
  ) });
}
export {
  LocationServiceZoneShippingOptionCreate as Component
};
