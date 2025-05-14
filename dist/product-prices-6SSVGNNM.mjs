import {
  DataGrid,
  createDataGridHelper,
  createDataGridPriceColumns
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
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import {
  useProduct,
  useUpdateProductVariantsBatch
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-prices/product-prices.tsx
import { useParams } from "react-router-dom";

// src/routes/products/product-prices/pricing-edit.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@medusajs/ui";
import { useMemo as useMemo2 } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import * as zod from "zod";

// src/routes/products/common/variant-pricing-form.tsx
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var VariantPricingForm = ({ form }) => {
  const { store } = useStore();
  const { regions } = useRegions({ limit: 9999 });
  const { price_preferences: pricePreferences } = usePricePreferences({});
  const { setCloseOnEscape } = useRouteModal();
  const columns = useVariantPriceGridColumns({
    currencies: store?.supported_currencies,
    regions,
    pricePreferences
  });
  const variants = useWatch({
    control: form.control,
    name: "variants"
  });
  return /* @__PURE__ */ jsx(
    DataGrid,
    {
      columns,
      data: variants,
      state: form,
      onEditingChange: (editing) => setCloseOnEscape(!editing)
    }
  );
};
var columnHelper = createDataGridHelper();
var useVariantPriceGridColumns = ({
  currencies = [],
  regions = [],
  pricePreferences = []
}) => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      columnHelper.column({
        id: t("fields.title"),
        header: t("fields.title"),
        cell: (context) => {
          const entity = context.row.original;
          return /* @__PURE__ */ jsx(DataGrid.ReadonlyCell, { context, children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center gap-x-2 overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: entity.title }) }) });
        },
        disableHiding: true
      }),
      ...createDataGridPriceColumns({
        currencies: currencies.map((c) => c.currency_code),
        regions,
        pricePreferences,
        getFieldName: (context, value) => {
          if (context.column.id?.startsWith("currency_prices")) {
            return `variants.${context.row.index}.prices.${value}`;
          }
          return `variants.${context.row.index}.prices.${value}`;
        },
        t
      })
    ];
  }, [t, currencies, regions, pricePreferences]);
};

// src/routes/products/product-prices/pricing-edit.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var UpdateVariantPricesSchema = zod.object({
  variants: zod.array(
    zod.object({
      prices: zod.record(zod.string(), zod.string().or(zod.number()).optional()).optional()
    })
  )
});
var PricingEdit = ({
  product,
  variantId
}) => {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const { mutateAsync, isPending } = useUpdateProductVariantsBatch(product.id);
  const { regions } = useRegions({ limit: 9999 });
  const regionsCurrencyMap = useMemo2(() => {
    if (!regions?.length) {
      return {};
    }
    return regions.reduce((acc, reg) => {
      acc[reg.id] = reg.currency_code;
      return acc;
    }, {});
  }, [regions]);
  const variants = variantId ? product.variants?.filter((v) => v.id === variantId) : product.variants;
  const form = useForm({
    defaultValues: {
      variants: variants?.map((variant) => ({
        title: variant.title,
        prices: variant.prices.reduce((acc, price) => {
          if (price.rules?.region_id) {
            acc[price.rules.region_id] = price.amount;
          } else {
            acc[price.currency_code] = price.amount;
          }
          return acc;
        }, {})
      }))
    },
    resolver: zodResolver(UpdateVariantPricesSchema, {})
  });
  const handleSubmit = form.handleSubmit(async (values) => {
    const reqData = values.variants.map((variant, ind) => ({
      id: variants[ind].id,
      prices: Object.entries(variant.prices || {}).filter(
        ([_, value]) => value !== "" && typeof value !== "undefined"
        // deleted cells
      ).map(([currencyCodeOrRegionId, value]) => {
        const regionId = currencyCodeOrRegionId.startsWith("reg_") ? currencyCodeOrRegionId : void 0;
        const currencyCode = currencyCodeOrRegionId.startsWith("reg_") ? regionsCurrencyMap[regionId] : currencyCodeOrRegionId;
        let existingId = void 0;
        if (regionId) {
          existingId = variants?.[ind]?.prices?.find(
            (p) => p.rules["region_id"] === regionId
          )?.id;
        } else {
          existingId = variants?.[ind]?.prices?.find(
            (p) => p.currency_code === currencyCode && Object.keys(p.rules ?? {}).length === 0
          )?.id;
        }
        const amount = castNumber(value);
        return {
          id: existingId,
          currency_code: currencyCode,
          amount,
          ...regionId ? { rules: { region_id: regionId } } : {}
        };
      })
    }));
    await mutateAsync(reqData, {
      onSuccess: () => {
        handleSuccess("..");
      }
    });
  });
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex size-full flex-col", children: [
    /* @__PURE__ */ jsx2(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx2(RouteFocusModal.Body, { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx2(VariantPricingForm, { form }) }),
    /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx2(
        Button,
        {
          type: "submit",
          variant: "primary",
          size: "small",
          isLoading: isPending,
          children: t("actions.save")
        }
      )
    ] }) })
  ] }) });
};

// src/routes/products/product-prices/product-prices.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ProductPrices = () => {
  const { id, variant_id } = useParams();
  const { product, isLoading, isError, error } = useProduct(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: !isLoading && product && /* @__PURE__ */ jsx3(PricingEdit, { product, variantId: variant_id }) });
};
export {
  ProductPrices as Component
};
