import {
  PriceListUpdateProductsSchema,
  usePriceListCurrencyData,
  usePriceListGridColumns
} from "./chunk-HPXFQPHA.mjs";
import {
  isProductRow
} from "./chunk-G2J2T2QU.mjs";
import "./chunk-XUQVQCAO.mjs";
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
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-MNXC6Q4F.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useBatchPriceListPrices,
  usePriceList
} from "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useProducts
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/price-lists/price-list-prices-edit/price-list-prices-edit.tsx
import { useParams, useSearchParams } from "react-router-dom";

// src/routes/price-lists/price-list-prices-edit/components/price-list-prices-edit-form/price-list-prices-edit-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, toast } from "@medusajs/ui";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var PricingProductPricesSchema = z.object({
  products: PriceListUpdateProductsSchema
});
var PriceListPricesEditForm = ({
  priceList,
  products,
  regions,
  currencies,
  pricePreferences
}) => {
  const { t } = useTranslation();
  const { handleSuccess, setCloseOnEscape } = useRouteModal();
  const initialValue = useRef(initRecord(priceList, products));
  const form = useForm({
    defaultValues: {
      products: initialValue.current
    },
    resolver: zodResolver(PricingProductPricesSchema)
  });
  const { mutateAsync, isPending } = useBatchPriceListPrices(priceList.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    const { products: products2 } = values;
    const { pricesToDelete, pricesToCreate, pricesToUpdate } = sortPrices(
      products2,
      initialValue.current,
      regions
    );
    mutateAsync(
      {
        delete: pricesToDelete,
        update: pricesToUpdate,
        create: pricesToCreate
      },
      {
        onSuccess: () => {
          toast.success(t("priceLists.products.edit.successToast"));
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const columns = usePriceListGridColumns({
    currencies,
    regions,
    pricePreferences
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex size-full flex-col", children: [
    /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx(
      DataGrid,
      {
        columns,
        data: products,
        getSubRows: (row) => {
          if (isProductRow(row) && row.variants) {
            return row.variants;
          }
        },
        state: form,
        onEditingChange: (editing) => setCloseOnEscape(!editing)
      }
    ) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};
function initRecord(priceList, products) {
  const record = {};
  const variantPrices = priceList.prices?.reduce((variants, price) => {
    const variantObject = variants[price.variant_id] || {};
    const isRegionPrice = !!price.rules?.region_id;
    if (isRegionPrice) {
      const regionId = price.rules.region_id;
      variantObject.region_prices = {
        ...variantObject.region_prices,
        [regionId]: {
          amount: price.amount.toString(),
          id: price.id
        }
      };
    } else {
      variantObject.currency_prices = {
        ...variantObject.currency_prices,
        [price.currency_code]: {
          amount: price.amount.toString(),
          id: price.id
        }
      };
    }
    variants[price.variant_id] = variantObject;
    return variants;
  }, {});
  for (const product of products) {
    record[product.id] = {
      variants: product.variants?.reduce((variants, variant) => {
        const prices = variantPrices[variant.id] || {};
        variants[variant.id] = prices;
        return variants;
      }, {}) || {}
    };
  }
  return record;
}
function convertToPriceArray(data, regions) {
  const prices = [];
  const regionCurrencyMap = regions.reduce((map, region) => {
    map[region.id] = region.currency_code;
    return map;
  }, {});
  for (const [_productId, product] of Object.entries(data || {})) {
    const { variants } = product || {};
    for (const [variantId, variant] of Object.entries(variants || {})) {
      const { currency_prices: currencyPrices, region_prices: regionPrices } = variant || {};
      for (const [currencyCode, currencyPrice] of Object.entries(
        currencyPrices || {}
      )) {
        if (currencyPrice?.amount !== "" && typeof currencyPrice?.amount !== "undefined") {
          prices.push({
            variantId,
            currencyCode,
            amount: castNumber(currencyPrice.amount),
            id: currencyPrice.id
          });
        }
      }
      for (const [regionId, regionPrice] of Object.entries(
        regionPrices || {}
      )) {
        if (regionPrice?.amount !== "" && typeof regionPrice?.amount !== "undefined") {
          prices.push({
            variantId,
            regionId,
            currencyCode: regionCurrencyMap[regionId],
            amount: castNumber(regionPrice.amount),
            id: regionPrice.id
          });
        }
      }
    }
  }
  return prices;
}
function createMapKey(obj) {
  return `${obj.variantId}-${obj.currencyCode}-${obj.regionId || "none"}-${obj.id || "none"}`;
}
function comparePrices(initialPrices, newPrices) {
  const pricesToUpdate = [];
  const pricesToCreate = [];
  const pricesToDelete = [];
  const initialPriceMap = initialPrices.reduce((map, price) => {
    map[createMapKey(price)] = price;
    return map;
  }, {});
  const newPriceMap = newPrices.reduce((map, price) => {
    map[createMapKey(price)] = price;
    return map;
  }, {});
  const keys = /* @__PURE__ */ new Set([
    ...Object.keys(initialPriceMap),
    ...Object.keys(newPriceMap)
  ]);
  for (const key of keys) {
    const initialPrice = initialPriceMap[key];
    const newPrice = newPriceMap[key];
    if (initialPrice && newPrice) {
      if (isNaN(newPrice.amount) && newPrice.id) {
        pricesToDelete.push(newPrice.id);
      }
      if (initialPrice.amount !== newPrice.amount && newPrice.id) {
        pricesToUpdate.push({
          id: newPrice.id,
          variant_id: newPrice.variantId,
          currency_code: newPrice.currencyCode,
          rules: newPrice.regionId ? { region_id: newPrice.regionId } : void 0,
          amount: newPrice.amount
        });
      }
    }
    if (!initialPrice && newPrice) {
      pricesToCreate.push({
        variant_id: newPrice.variantId,
        currency_code: newPrice.currencyCode,
        rules: newPrice.regionId ? { region_id: newPrice.regionId } : void 0,
        amount: newPrice.amount
      });
    }
    if (initialPrice && !newPrice && initialPrice.id) {
      pricesToDelete.push(initialPrice.id);
    }
  }
  return { pricesToDelete, pricesToCreate, pricesToUpdate };
}
function sortPrices(data, initialValue, regions) {
  const initialPrices = convertToPriceArray(initialValue, regions);
  const newPrices = convertToPriceArray(data, regions);
  return comparePrices(initialPrices, newPrices);
}

// src/routes/price-lists/price-list-prices-edit/price-list-prices-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PriceListPricesEdit = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const ids = searchParams.get("ids[]");
  const { price_list, isLoading, isError, error } = usePriceList(id);
  const productIds = ids?.split(",");
  const {
    products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productError
  } = useProducts({
    id: productIds,
    limit: productIds?.length || 9999,
    // Temporary until we support lazy loading in the DataGrid
    price_list_id: [id],
    fields: "title,thumbnail,*variants"
  });
  const { isReady, regions, currencies, pricePreferences } = usePriceListCurrencyData();
  const ready = !isLoading && !!price_list && !isProductsLoading && !!products && isReady;
  if (isError) {
    throw error;
  }
  if (isProductsError) {
    throw productError;
  }
  return /* @__PURE__ */ jsxs2(RouteFocusModal, { children: [
    /* @__PURE__ */ jsx2(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsxs2("span", { className: "sr-only", children: [
      "Edit Prices for ",
      price_list?.title
    ] }) }),
    /* @__PURE__ */ jsx2(RouteFocusModal.Description, { className: "sr-only", children: "Update prices for products in the price list" }),
    ready && /* @__PURE__ */ jsx2(
      PriceListPricesEditForm,
      {
        priceList: price_list,
        products,
        regions,
        currencies,
        pricePreferences
      }
    )
  ] });
};
export {
  PriceListPricesEdit as Component
};
