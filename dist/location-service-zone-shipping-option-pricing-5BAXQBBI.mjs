import {
  ConditionalPriceForm,
  ShippingOptionPriceProvider,
  UpdateConditionalPriceSchema,
  buildShippingOptionPriceRules,
  useShippingOptionPriceColumns
} from "./chunk-VTDYXPA4.mjs";
import {
  CONDITIONAL_PRICES_STACKED_MODAL_ID,
  ITEM_TOTAL_ATTRIBUTE,
  REGION_ID_ATTRIBUTE
} from "./chunk-PYIO3TDQ.mjs";
import "./chunk-PDWBYQOW.mjs";
import {
  DataGrid
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
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
import "./chunk-OBQI23QM.mjs";
import {
  useShippingOption,
  useUpdateShippingOptions
} from "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-service-zone-shipping-option-pricing/location-service-zone-shipping-option-pricing.tsx
import { json, useParams } from "react-router-dom";

// src/routes/locations/location-service-zone-shipping-option-pricing/components/create-shipping-options-form/edit-shipping-options-pricing-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Button, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var EditShippingOptionPricingSchema = zod.object({
  region_prices: zod.record(
    zod.string(),
    zod.string().or(zod.number()).optional()
  ),
  currency_prices: zod.record(
    zod.string(),
    zod.string().or(zod.number()).optional()
  ),
  conditional_region_prices: zod.record(
    zod.string(),
    zod.array(UpdateConditionalPriceSchema)
  ),
  conditional_currency_prices: zod.record(
    zod.string(),
    zod.array(UpdateConditionalPriceSchema)
  )
});
function EditShippingOptionsPricingForm({
  shippingOption
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
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
  const form = useForm({
    defaultValues: getDefaultValues(shippingOption.prices),
    resolver: zodResolver(EditShippingOptionPricingSchema)
  });
  const { mutateAsync, isPending } = useUpdateShippingOptions(shippingOption.id);
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
  const columns = useShippingOptionPriceColumns({
    name: shippingOption.name,
    currencies,
    regions,
    pricePreferences
  });
  const data = useMemo(
    () => [[...currencies || [], ...regions || []]],
    [currencies, regions]
  );
  const handleSubmit = form.handleSubmit(async (data2) => {
    const currencyPrices = Object.entries(data2.currency_prices).map(([code, value]) => {
      if (!value || !currencies.some((c) => c.toLowerCase() === code.toLowerCase())) {
        return void 0;
      }
      const priceRecord = {
        currency_code: code,
        amount: castNumber(value)
      };
      const existingPrice = shippingOption.prices.find(
        (p) => p.currency_code === code && !p.price_rules.length
      );
      if (existingPrice) {
        priceRecord.id = existingPrice.id;
      }
      return priceRecord;
    }).filter((p) => !!p);
    const conditionalCurrencyPrices = Object.entries(
      data2.conditional_currency_prices
    ).flatMap(
      ([currency_code, value]) => value?.map((rule) => ({
        id: rule.id,
        currency_code,
        amount: castNumber(rule.amount),
        rules: buildShippingOptionPriceRules(rule)
      }))
    );
    const regionPrices = Object.entries(data2.region_prices).map(([region_id, value]) => {
      if (!value || !regions?.some((region) => region.id === region_id)) {
        return void 0;
      }
      const priceRecord = {
        region_id,
        amount: castNumber(value)
      };
      return priceRecord;
    }).filter((p) => !!p);
    const conditionalRegionPrices = Object.entries(
      data2.conditional_region_prices
    ).flatMap(
      ([region_id, value]) => value?.map((rule) => ({
        id: rule.id,
        region_id,
        amount: castNumber(rule.amount),
        rules: buildShippingOptionPriceRules(rule)
      }))
    );
    const allPrices = [
      ...currencyPrices,
      ...conditionalCurrencyPrices,
      ...regionPrices,
      ...conditionalRegionPrices
    ];
    await mutateAsync(
      { prices: allPrices },
      {
        onSuccess: () => {
          toast.success(t("general.success"));
          handleSuccess();
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  const isLoading = isStoreLoading || isRegionsLoading || !currencies || !regions;
  if (isStoreError) {
    throw storeError;
  }
  if (isRegionsError) {
    throw regionsError;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex h-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { children: /* @__PURE__ */ jsx(
          StackedFocusModal,
          {
            id: CONDITIONAL_PRICES_STACKED_MODAL_ID,
            onOpenChangeCallback: (open) => {
              if (!open) {
                setSelectedPrice(null);
              }
            },
            children: /* @__PURE__ */ jsxs(
              ShippingOptionPriceProvider,
              {
                onOpenConditionalPricesModal,
                onCloseConditionalPricesModal,
                children: [
                  /* @__PURE__ */ jsx("div", { className: "flex size-full flex-col divide-y overflow-hidden", children: /* @__PURE__ */ jsx(
                    DataGrid,
                    {
                      isLoading,
                      data,
                      columns,
                      state: form,
                      onEditingChange: (editing) => setCloseOnEscape(!editing),
                      disableInteractions: getIsOpen(
                        CONDITIONAL_PRICES_STACKED_MODAL_ID
                      )
                    }
                  ) }),
                  selectedPrice && /* @__PURE__ */ jsx(ConditionalPriceForm, { info: selectedPrice, variant: "update" })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "small",
              className: "whitespace-nowrap",
              isLoading: isPending,
              onClick: handleSubmit,
              type: "button",
              children: t("actions.save")
            }
          )
        ] }) })
      ]
    }
  ) });
}
var findRuleValue = (rules, operator) => {
  const fallbackValue = ["eq", "gt", "lt"].includes(operator) ? void 0 : null;
  return rules?.find(
    (r) => r.attribute === ITEM_TOTAL_ATTRIBUTE && r.operator === operator
  )?.value || fallbackValue;
};
var mapToConditionalPrice = (price) => {
  const rules = price.price_rules || [];
  return {
    id: price.id,
    amount: price.amount,
    gte: findRuleValue(rules, "gte"),
    lte: findRuleValue(rules, "lte"),
    gt: findRuleValue(rules, "gt"),
    lt: findRuleValue(rules, "lt"),
    eq: findRuleValue(rules, "eq")
  };
};
var getDefaultValues = (prices) => {
  const hasAttributes = (price, required, forbidden = []) => {
    const attributes = price.price_rules?.map((r) => r.attribute) || [];
    return required.every((attr) => attributes.includes(attr)) && !forbidden.some((attr) => attributes.includes(attr));
  };
  const currency_prices = {};
  const conditional_currency_prices = {};
  const region_prices = {};
  const conditional_region_prices = {};
  prices.forEach((price) => {
    if (!price.price_rules?.length) {
      currency_prices[price.currency_code] = price.amount;
      return;
    }
    if (hasAttributes(price, [ITEM_TOTAL_ATTRIBUTE], [REGION_ID_ATTRIBUTE])) {
      const code = price.currency_code;
      if (!conditional_currency_prices[code]) {
        conditional_currency_prices[code] = [];
      }
      conditional_currency_prices[code].push(mapToConditionalPrice(price));
      return;
    }
    if (hasAttributes(price, [REGION_ID_ATTRIBUTE], [ITEM_TOTAL_ATTRIBUTE])) {
      const regionId = price.price_rules.find(
        (r) => r.attribute === REGION_ID_ATTRIBUTE
      )?.value;
      region_prices[regionId] = price.amount;
      return;
    }
    if (hasAttributes(price, [REGION_ID_ATTRIBUTE, ITEM_TOTAL_ATTRIBUTE])) {
      const regionId = price.price_rules.find(
        (r) => r.attribute === REGION_ID_ATTRIBUTE
      )?.value;
      if (!conditional_region_prices[regionId]) {
        conditional_region_prices[regionId] = [];
      }
      conditional_region_prices[regionId].push(mapToConditionalPrice(price));
    }
  });
  return {
    currency_prices,
    conditional_currency_prices,
    region_prices,
    conditional_region_prices
  };
};

// src/routes/locations/location-service-zone-shipping-option-pricing/location-service-zone-shipping-option-pricing.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function LocationServiceZoneShippingOptionPricing() {
  const { so_id, location_id } = useParams();
  if (!so_id) {
    throw json({
      message: "Shipping Option ID paramater is missing",
      status: 404
    });
  }
  const {
    shipping_option: shippingOption,
    isError,
    error
  } = useShippingOption(so_id, {
    fields: "*prices,*prices.price_rules"
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { prev: `/settings/locations/${location_id}`, children: shippingOption && /* @__PURE__ */ jsx2(EditShippingOptionsPricingForm, { shippingOption }) });
}
export {
  LocationServiceZoneShippingOptionPricing as Component
};
