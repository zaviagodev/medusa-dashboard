import {
  DataGridTogglableNumberCell
} from "./chunk-IM74HYR5.mjs";
import {
  DataGrid,
  DataGridReadonlyCell,
  DataGridSkeleton,
  createDataGridHelper,
  useDataGridDuplicateCell
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  PRODUCT_VARIANT_IDS_KEY
} from "./chunk-AM2BU2RH.mjs";
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
import {
  ProgressBar
} from "./chunk-D3YQN7HV.mjs";
import {
  Thumbnail
} from "./chunk-MNXC6Q4F.mjs";
import {
  Skeleton
} from "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-OBQI23QM.mjs";
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
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useBatchInventoryItemsLocationLevels
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-stock/loader.ts
import { defer } from "react-router-dom";
async function getProductStockData(id, productVariantIds) {
  const CHUNK_SIZE = 20;
  let offset = 0;
  let totalCount = 0;
  let allVariants = [];
  do {
    const { variants: chunk, count } = await sdk.admin.product.listVariants(
      id,
      {
        id: productVariantIds,
        offset,
        limit: CHUNK_SIZE,
        fields: "id,title,sku,inventory_items,inventory_items.*,inventory_items.inventory,inventory_items.inventory.id,inventory_items.inventory.title,inventory_items.inventory.sku,*inventory_items.inventory.location_levels,product.thumbnail"
      }
    );
    allVariants = [...allVariants, ...chunk];
    totalCount = count;
    offset += CHUNK_SIZE;
  } while (allVariants.length < totalCount);
  const { stock_locations } = await sdk.admin.stockLocation.list({
    limit: 9999,
    fields: "id,name"
  });
  return {
    variants: allVariants,
    locations: stock_locations
  };
}
var productStockLoader = async ({
  params,
  request
}) => {
  const id = params.id;
  const searchParams = new URLSearchParams(request.url);
  const productVariantIds = searchParams.get(PRODUCT_VARIANT_IDS_KEY)?.split(",") || void 0;
  const dataPromise = getProductStockData(id, productVariantIds);
  return defer({
    data: dataPromise
  });
};

// src/routes/products/product-stock/product-stock.tsx
import { AnimatePresence } from "motion/react";
import { Suspense, useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Await, useLoaderData } from "react-router-dom";

// src/routes/products/product-stock/components/product-stock-form/product-stock-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, toast, usePrompt } from "@medusajs/ui";
import { useEffect, useMemo as useMemo2, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/products/product-stock/hooks/use-product-stock-columns.tsx
import { InformationCircle } from "@medusajs/icons";
import { Switch, Tooltip } from "@medusajs/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

// src/components/data-grid/components/data-grid-duplicate-cell.tsx
import { jsx } from "react/jsx-runtime";
var DataGridDuplicateCell = ({
  duplicateOf,
  children
}) => {
  const { watchedValue } = useDataGridDuplicateCell({ duplicateOf });
  return /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base txt-compact-small text-ui-fg-subtle flex size-full cursor-not-allowed items-center justify-between overflow-hidden px-4 py-2.5 outline-none", children: typeof children === "function" ? children({ value: watchedValue }) : children });
};

// src/routes/products/product-stock/utils.ts
function isProductVariant(row) {
  return row.id.startsWith("variant_");
}
function isProductVariantWithInventoryPivot(row) {
  return row.inventory_items && row.inventory_items.length > 0;
}
function getDisabledInventoryRows(variants) {
  const seen = {};
  const disabled = {};
  variants.forEach((variant) => {
    const inventoryItems = variant.inventory_items;
    if (!inventoryItems) {
      return;
    }
    inventoryItems.forEach((item) => {
      const existing = seen[item.inventory_item_id];
      if (existing) {
        disabled[item.inventory_item_id] = {
          id: existing.id,
          title: existing.title || "",
          sku: existing.sku || ""
        };
        return;
      }
      seen[item.inventory_item_id] = variant;
    });
  });
  return disabled;
}

// src/routes/products/product-stock/hooks/use-product-stock-columns.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var helper = createDataGridHelper();
var useProductStockColumns = (locations = [], disabled = {}) => {
  const { t } = useTranslation();
  const getIsDisabled = useCallback(
    (item) => {
      const disabledItem = disabled[item.inventory_item_id];
      const isDisabled = !!disabledItem && disabledItem.id !== item.variant_id;
      if (!isDisabled) {
        return {
          isDisabled: false,
          item: void 0
        };
      }
      return {
        isDisabled,
        item: disabledItem
      };
    },
    [disabled]
  );
  return useMemo(
    () => [
      helper.column({
        id: "title",
        name: "Title",
        header: "Title",
        cell: (context) => {
          const item = context.row.original;
          if (isProductVariant(item)) {
            return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
              /* @__PURE__ */ jsx2(Thumbnail, { size: "small", src: item.product?.thumbnail }),
              /* @__PURE__ */ jsx2("span", { children: item.title || "-" })
            ] }) });
          }
          const { isDisabled, item: disabledItem } = getIsDisabled(item);
          if (isDisabled) {
            return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, color: "normal", children: /* @__PURE__ */ jsxs("div", { className: "flex size-full items-center justify-between gap-x-2", children: [
              /* @__PURE__ */ jsx2(
                "span",
                {
                  title: item.inventory?.title || void 0,
                  className: "text-ui-fg-disabled",
                  children: item.inventory?.title || "-"
                }
              ),
              /* @__PURE__ */ jsx2(
                Tooltip,
                {
                  content: disabledItem.sku ? t("products.stock.tooltips.alreadyManagedWithSku", {
                    title: disabledItem.title,
                    sku: disabledItem.sku
                  }) : t("products.stock.tooltips.alreadyManaged", {
                    title: disabledItem.title
                  }),
                  children: /* @__PURE__ */ jsx2(InformationCircle, {})
                }
              )
            ] }) });
          }
          return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, color: "normal", children: item.inventory?.title || "-" });
        },
        disableHiding: true
      }),
      helper.column({
        id: "sku",
        name: "SKU",
        header: "SKU",
        cell: (context) => {
          const item = context.row.original;
          if (isProductVariant(item)) {
            return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, children: item.sku || "-" });
          }
          const { isDisabled } = getIsDisabled(item);
          if (isDisabled) {
            return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, color: "normal", children: /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-disabled", children: item.inventory?.sku || "-" }) });
          }
          return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context, color: "normal", children: item.inventory?.sku || "-" });
        },
        disableHiding: true
      }),
      ...locations.map(
        (location) => helper.column({
          id: `location_${location.id}`,
          name: location.name,
          header: location.name,
          field: (context) => {
            const item = context.row.original;
            if (isProductVariant(item)) {
              return null;
            }
            const { isDisabled } = getIsDisabled(item);
            if (isDisabled) {
              return null;
            }
            return `variants.${item.variant_id}.inventory_items.${item.inventory_item_id}.locations.${location.id}`;
          },
          type: "togglable-number",
          cell: (context) => {
            const item = context.row.original;
            if (isProductVariant(item)) {
              return /* @__PURE__ */ jsx2(DataGridReadonlyCell, { context });
            }
            const { isDisabled, item: disabledItem } = getIsDisabled(item);
            if (isDisabled) {
              return /* @__PURE__ */ jsx2(
                DataGridDuplicateCell,
                {
                  duplicateOf: `variants.${disabledItem.id}.inventory_items.${item.inventory_item_id}.locations.${location.id}`,
                  children: ({ value }) => {
                    const { checked, quantity } = value;
                    return /* @__PURE__ */ jsxs("div", { className: "flex size-full items-center gap-x-2", children: [
                      /* @__PURE__ */ jsx2(
                        Switch,
                        {
                          className: "shrink-0 cursor-not-allowed",
                          tabIndex: -1,
                          size: "small",
                          checked,
                          disabled: true
                        }
                      ),
                      /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-disabled flex size-full items-center justify-end", children: quantity })
                    ] });
                  }
                }
              );
            }
            return /* @__PURE__ */ jsx2(
              DataGridTogglableNumberCell,
              {
                context,
                disabledToggleTooltip: t(
                  "inventory.stock.disabledToggleTooltip"
                ),
                placeholder: t("inventory.stock.placeholder")
              }
            );
          }
        })
      )
    ],
    [locations, getIsDisabled, t]
  );
};

// src/routes/products/product-stock/schema.ts
import { z } from "zod";
var LocationQuantitySchema = z.object({
  id: z.string().optional(),
  quantity: z.union([z.number(), z.string()]),
  checked: z.boolean(),
  disabledToggle: z.boolean()
});
var ProductStockLocationsSchema = z.record(LocationQuantitySchema);
var ProductStockInventoryItemSchema = z.object({
  locations: ProductStockLocationsSchema
});
var ProductStockVariantSchema = z.object({
  inventory_items: z.record(ProductStockInventoryItemSchema)
});
var ProductStockSchema = z.object({
  variants: z.record(ProductStockVariantSchema)
});

// src/routes/products/product-stock/components/product-stock-form/product-stock-form.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductStockForm = ({
  variants,
  locations,
  onLoaded
}) => {
  const { t } = useTranslation2();
  const { handleSuccess, setCloseOnEscape } = useRouteModal();
  const prompt = usePrompt();
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const form = useForm({
    defaultValues: getDefaultValue(variants, locations),
    resolver: zodResolver(ProductStockSchema)
  });
  const initialValues = useRef(getDefaultValue(variants, locations));
  const disabled = useMemo2(() => getDisabledInventoryRows(variants), [variants]);
  const columns = useProductStockColumns(locations, disabled);
  const { mutateAsync, isPending } = useBatchInventoryItemsLocationLevels();
  const onSubmit = form.handleSubmit(async (data) => {
    const payload = {
      create: [],
      update: [],
      delete: [],
      force: true
    };
    for (const [variantId, variant] of Object.entries(data.variants)) {
      for (const [inventory_item_id, item] of Object.entries(
        variant.inventory_items
      )) {
        for (const [location_id, level] of Object.entries(item.locations)) {
          if (level.id) {
            const wasChecked = initialValues.current?.variants?.[variantId]?.inventory_items?.[inventory_item_id]?.locations?.[location_id]?.checked;
            if (wasChecked && !level.checked) {
              payload.delete.push(level.id);
            } else {
              const newQuantity = level.quantity !== "" ? castNumber(level.quantity) : 0;
              const originalQuantity = initialValues.current?.variants?.[variantId]?.inventory_items?.[inventory_item_id]?.locations?.[location_id]?.quantity;
              if (newQuantity !== originalQuantity) {
                payload.update.push({
                  inventory_item_id,
                  location_id,
                  stocked_quantity: newQuantity
                });
              }
            }
          }
          if (!level.id && level.quantity !== "") {
            payload.create.push({
              inventory_item_id,
              location_id,
              stocked_quantity: castNumber(level.quantity)
            });
          }
        }
      }
    }
    if (payload.delete.length > 0) {
      setIsPromptOpen(true);
      const confirm = await prompt({
        title: t("general.areYouSure"),
        description: t("inventory.stock.disablePrompt", {
          count: payload.delete.length
        }),
        confirmText: t("actions.continue"),
        cancelText: t("actions.cancel"),
        variant: "confirmation"
      });
      setIsPromptOpen(false);
      if (!confirm) {
        return;
      }
    }
    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success(t("inventory.stock.successToast"));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx3(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs2(KeyboundForm, { onSubmit, className: "flex size-full flex-col", children: [
    /* @__PURE__ */ jsx3(RouteFocusModal.Header, {}),
    /* @__PURE__ */ jsx3(RouteFocusModal.Body, { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx3(
      DataGrid,
      {
        state: form,
        columns,
        data: variants,
        getSubRows,
        onEditingChange: (editing) => setCloseOnEscape(!editing),
        disableInteractions: isPending || isPromptOpen,
        multiColumnSelection: true
      }
    ) }),
    /* @__PURE__ */ jsx3(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsx3(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { variant: "secondary", size: "small", type: "button", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx3(Button, { type: "submit", size: "small", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};
function getSubRows(row) {
  if (isProductVariantWithInventoryPivot(row)) {
    return row.inventory_items;
  }
}
function getDefaultValue(variants, locations) {
  return {
    variants: variants.reduce((variantAcc, variant) => {
      const inventoryItems = variant.inventory_items?.reduce(
        (itemAcc, item) => {
          const locationsMap = locations.reduce((locationAcc, location) => {
            const level = item.inventory?.location_levels?.find(
              (level2) => level2.location_id === location.id
            );
            locationAcc[location.id] = {
              id: level?.id,
              quantity: level?.stocked_quantity !== void 0 ? level?.stocked_quantity : "",
              checked: !!level,
              disabledToggle: (level?.incoming_quantity || 0) > 0 || (level?.reserved_quantity || 0) > 0
            };
            return locationAcc;
          }, {});
          itemAcc[item.inventory_item_id] = { locations: locationsMap };
          return itemAcc;
        },
        {}
      );
      variantAcc[variant.id] = { inventory_items: inventoryItems || {} };
      return variantAcc;
    }, {})
  };
}

// src/routes/products/product-stock/product-stock.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductStock = () => {
  const { t } = useTranslation3();
  const data = useLoaderData();
  const [isLoading, setIsLoading] = useState2(false);
  const timeoutRef = useRef2();
  useEffect2(() => {
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);
    }, 200);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  const onLoaded = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
  };
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsx4("div", { className: "fixed inset-x-0 top-0 z-50 h-1", children: /* @__PURE__ */ jsx4(AnimatePresence, { children: isLoading ? /* @__PURE__ */ jsx4(ProgressBar, { duration: 5 }) : null }) }),
    /* @__PURE__ */ jsxs3(RouteFocusModal, { children: [
      /* @__PURE__ */ jsx4(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx4("span", { className: "sr-only", children: t("products.stock.heading") }) }),
      /* @__PURE__ */ jsx4(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx4("span", { className: "sr-only", children: t("products.stock.description") }) }),
      /* @__PURE__ */ jsx4(Suspense, { fallback: /* @__PURE__ */ jsx4(ProductStockFallback, {}), children: /* @__PURE__ */ jsx4(Await, { resolve: data.data, children: (data2) => {
        return /* @__PURE__ */ jsx4(
          ProductStockForm,
          {
            variants: data2.variants,
            locations: data2.locations,
            onLoaded
          }
        );
      } }) })
    ] })
  ] });
};
var ProductStockFallback = () => {
  return /* @__PURE__ */ jsx4("div", { className: "relative flex size-full flex-col items-center justify-center divide-y", children: /* @__PURE__ */ jsxs3("div", { className: "flex size-full flex-col divide-y", children: [
    /* @__PURE__ */ jsx4("div", { className: "px-4 py-2", children: /* @__PURE__ */ jsx4(Skeleton, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsx4("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx4(
      DataGridSkeleton,
      {
        columns: Array.from({ length: 10 })
      }
    ) }),
    /* @__PURE__ */ jsxs3("div", { className: "bg-ui-bg-base flex items-center justify-end gap-x-2 p-4", children: [
      /* @__PURE__ */ jsx4(Skeleton, { className: "h-7 w-[59px]" }),
      /* @__PURE__ */ jsx4(Skeleton, { className: "h-7 w-[46px]" })
    ] })
  ] }) });
};
export {
  ProductStock as Component,
  productStockLoader as loader
};
