import {
  isProductRow
} from "./chunk-G2J2T2QU.mjs";
import {
  DataGrid,
  createDataGridHelper,
  createDataGridPriceColumns
} from "./chunk-53RYGJCD.mjs";
import {
  Thumbnail
} from "./chunk-MNXC6Q4F.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";

// src/routes/price-lists/common/hooks/use-price-list-currency-data.tsx
var usePriceListCurrencyData = () => {
  const {
    store,
    isPending: isStorePending,
    isError: isStoreError,
    error: storeError
  } = useStore({
    fields: "+supported_currencies"
  });
  const currencies = store?.supported_currencies;
  const {
    regions,
    isPending: isRegionsPending,
    isError: isRegionsError,
    error: regionsError
  } = useRegions({
    fields: "id,name,currency_code",
    limit: 999
  });
  const {
    price_preferences: pricePreferences,
    isPending: isPreferencesPending,
    isError: isPreferencesError,
    error: preferencesError
  } = usePricePreferences({});
  const isReady = !!currencies && !!regions && !!pricePreferences && !isStorePending && !isRegionsPending && !isPreferencesPending;
  if (isRegionsError) {
    throw regionsError;
  }
  if (isStoreError) {
    throw storeError;
  }
  if (isPreferencesError) {
    throw preferencesError;
  }
  if (!isReady) {
    return {
      regions: void 0,
      currencies: void 0,
      pricePreferences: void 0,
      isReady: false
    };
  }
  return { regions, currencies, pricePreferences, isReady };
};

// src/routes/price-lists/common/hooks/use-price-list-grid-columns.tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var columnHelper = createDataGridHelper();
var usePriceListGridColumns = ({
  currencies = [],
  regions = [],
  pricePreferences = []
}) => {
  const { t } = useTranslation();
  const colDefs = useMemo(() => {
    return [
      columnHelper.column({
        id: t("fields.title"),
        header: t("fields.title"),
        cell: (context) => {
          const entity = context.row.original;
          if (isProductRow(entity)) {
            return /* @__PURE__ */ jsx(DataGrid.ReadonlyCell, { context, children: /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full items-center gap-x-2 overflow-hidden", children: [
              /* @__PURE__ */ jsx(Thumbnail, { src: entity.thumbnail, size: "small" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: entity.title })
            ] }) });
          }
          return /* @__PURE__ */ jsx(DataGrid.ReadonlyCell, { context, color: "normal", children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center gap-x-2 overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: entity.title }) }) });
        },
        disableHiding: true
      }),
      ...createDataGridPriceColumns({
        currencies: currencies.map((c) => c.currency_code),
        regions,
        pricePreferences,
        isReadyOnly: (context) => {
          const entity = context.row.original;
          return isProductRow(entity);
        },
        getFieldName: (context, value) => {
          const entity = context.row.original;
          if (isProductRow(entity)) {
            return null;
          }
          if (context.column.id?.startsWith("currency_prices")) {
            return `products.${entity.product_id}.variants.${entity.id}.currency_prices.${value}.amount`;
          }
          return `products.${entity.product_id}.variants.${entity.id}.region_prices.${value}.amount`;
        },
        t
      })
    ];
  }, [t, currencies, regions, pricePreferences]);
  return colDefs;
};

// src/routes/price-lists/common/schemas.ts
import { z } from "zod";
var PriceListCustomerGroupSchema = z.object({
  id: z.string(),
  name: z.string()
});
var PriceListRulesSchema = z.object({
  customer_group_id: z.array(PriceListCustomerGroupSchema).nullish()
});
var PriceListCreateCurrencyPriceSchema = z.object({
  amount: z.string().or(z.number()).optional()
});
var PriceListCreateRegionPriceSchema = z.object({
  amount: z.string().or(z.number()).optional()
});
var PriceListCreateProductVariantSchema = z.object({
  currency_prices: z.record(PriceListCreateCurrencyPriceSchema.optional()),
  region_prices: z.record(PriceListCreateRegionPriceSchema.optional())
});
var PriceListCreateProductVariantsSchema = z.record(
  PriceListCreateProductVariantSchema
);
var PriceListCreateProductsSchema = z.record(
  z.object({
    variants: PriceListCreateProductVariantsSchema
  })
);
var PriceListUpdateCurrencyPriceSchema = z.object({
  amount: z.string().or(z.number()).optional(),
  id: z.string().nullish()
});
var PriceListUpdateRegionPriceSchema = z.object({
  amount: z.string().or(z.number()).optional(),
  id: z.string().nullish()
});
var PriceListUpdateProductVariantsSchema = z.record(
  z.object({
    currency_prices: z.record(PriceListUpdateCurrencyPriceSchema.optional()),
    region_prices: z.record(PriceListUpdateRegionPriceSchema.optional())
  })
);
var PriceListUpdateProductsSchema = z.record(
  z.object({
    variants: PriceListUpdateProductVariantsSchema
  })
);

export {
  usePriceListCurrencyData,
  usePriceListGridColumns,
  PriceListRulesSchema,
  PriceListCreateProductsSchema,
  PriceListUpdateProductsSchema
};
