import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  optionalInt,
  partialFormValidation
} from "./chunk-ZQRKUG6J.mjs";
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
  RouteDrawer,
  RouteFocusModal,
  useRouteModal
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
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
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
import {
  useCreateProductVariant,
  useProduct
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-create-variant/product-create-variant.tsx
import { useParams } from "react-router-dom";

// src/routes/products/product-create-variant/components/create-product-variant-form/create-product-variant-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button as Button2, ProgressTabs, toast } from "@medusajs/ui";
import { useEffect, useMemo as useMemo2, useState } from "react";
import { useFieldArray as useFieldArray2, useForm, useWatch as useWatch3 } from "react-hook-form";
import { useTranslation as useTranslation4 } from "react-i18next";

// src/routes/products/product-create-variant/components/create-product-variant-form/constants.ts
import { z } from "zod";
import * as zod from "zod";
var CreateProductVariantSchema = z.object({
  title: z.string().min(1),
  sku: z.string().optional(),
  manage_inventory: z.boolean().optional(),
  allow_backorder: z.boolean().optional(),
  inventory_kit: z.boolean().optional(),
  options: z.record(z.string()),
  prices: zod.record(zod.string(), zod.string().or(zod.number()).optional()).optional(),
  inventory: z.array(
    z.object({
      inventory_item_id: z.string(),
      required_quantity: optionalInt
    })
  ).optional()
});
var CreateVariantDetailsSchema = CreateProductVariantSchema.pick({
  title: true,
  sku: true,
  manage_inventory: true,
  allow_backorder: true,
  inventory_kit: true,
  options: true
});
var CreateVariantDetailsFields = Object.keys(
  CreateVariantDetailsSchema.shape
);
var CreateVariantPriceSchema = CreateProductVariantSchema.pick({
  prices: true
});
var CreateVariantPriceFields = Object.keys(
  CreateVariantPriceSchema.shape
);

// src/routes/products/product-create-variant/components/create-product-variant-form/details-tab.tsx
import { Heading, Input, Switch } from "@medusajs/ui";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
function DetailsTab({ form, product }) {
  const { t } = useTranslation();
  const manageInventoryEnabled = useWatch({
    control: form.control,
    name: "manage_inventory"
  });
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-8 py-16", children: [
    /* @__PURE__ */ jsx(Heading, { level: "h1", children: t("products.variant.create.header") }),
    /* @__PURE__ */ jsxs("div", { className: "my-8 grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "title",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.title") }),
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
          name: "sku",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.sku") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      product.options.map((option) => /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: `options.${option.title}`,
          render: ({ field: { value, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: option.title }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  value,
                  onChange: (v) => {
                    onChange(v);
                  },
                  ...field,
                  options: option.values.map((v) => ({
                    label: v.value,
                    value: v.value
                  }))
                }
              ) })
            ] });
          }
        },
        option.id
      ))
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "manage_inventory",
          render: ({ field: { value, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-component shadow-elevation-card-rest flex gap-x-3 rounded-lg p-4", children: [
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                  Switch,
                  {
                    className: "mt-[2px]",
                    checked: value,
                    onCheckedChange: (checked) => onChange(!!checked),
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("products.variant.inventory.manageInventoryLabel") }),
                  /* @__PURE__ */ jsx(Form.Hint, { children: t("products.variant.inventory.manageInventoryHint") })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "allow_backorder",
          disabled: !manageInventoryEnabled,
          render: ({ field: { value, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-component shadow-elevation-card-rest flex gap-x-3 rounded-lg p-4", children: [
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                  Switch,
                  {
                    checked: value,
                    onCheckedChange: (checked) => onChange(!!checked),
                    ...field,
                    disabled: !manageInventoryEnabled
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("products.variant.inventory.allowBackordersLabel") }),
                  /* @__PURE__ */ jsx(Form.Hint, { children: t("products.variant.inventory.allowBackordersHint") })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "inventory_kit",
          render: ({ field: { value, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-component shadow-elevation-card-rest flex gap-x-3 rounded-lg p-4", children: [
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                  Switch,
                  {
                    checked: value,
                    onCheckedChange: (checked) => onChange(!!checked),
                    ...field,
                    disabled: !manageInventoryEnabled
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("products.variant.inventory.inventoryKit") }),
                  /* @__PURE__ */ jsx(Form.Hint, { children: t("products.variant.inventory.inventoryKitHint") })
                ] })
              ] }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] })
  ] }) });
}
var details_tab_default = DetailsTab;

// src/routes/products/product-create-variant/components/create-product-variant-form/inventory-kit-tab.tsx
import { useFieldArray } from "react-hook-form";
import { Button, Heading as Heading2, IconButton, Input as Input2, Label } from "@medusajs/ui";
import { XMarkMini } from "@medusajs/icons";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function InventoryKitTab({ form }) {
  const { t } = useTranslation2();
  const inventory = useFieldArray({
    control: form.control,
    name: `inventory`
  });
  const inventoryFormData = inventory.fields;
  const items = useComboboxData({
    queryKey: ["inventory_items"],
    queryFn: (params) => sdk.admin.inventoryItem.list(params),
    getOptions: (data) => data.inventory_items.map((item) => ({
      label: item.title,
      value: item.id
    }))
  });
  const isItemOptionDisabled = (option, inventoryIndex) => {
    return inventoryFormData?.some(
      (i, index) => index != inventoryIndex && i.inventory_item_id === option.value
    );
  };
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsx2("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: /* @__PURE__ */ jsxs2("div", { id: "organize", className: "flex flex-col gap-y-8", children: [
    /* @__PURE__ */ jsx2(Heading2, { children: t("products.create.inventory.heading") }),
    /* @__PURE__ */ jsxs2("div", { className: "grid gap-y-4", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-start justify-between gap-x-4", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx2(Form.Label, { children: form.getValues("title") }),
          /* @__PURE__ */ jsx2(Form.Hint, { children: t("products.create.inventory.label") })
        ] }),
        /* @__PURE__ */ jsx2(
          Button,
          {
            size: "small",
            variant: "secondary",
            type: "button",
            onClick: () => {
              inventory.append({
                inventory_item_id: "",
                required_quantity: ""
              });
            },
            children: t("actions.add")
          }
        )
      ] }),
      inventory.fields.map((inventoryItem, inventoryIndex) => /* @__PURE__ */ jsxs2(
        "li",
        {
          className: "bg-ui-bg-component shadow-elevation-card-rest grid grid-cols-[1fr_28px] items-center gap-1.5 rounded-xl p-1.5",
          children: [
            /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-[min-content,1fr] items-center gap-1.5", children: [
              /* @__PURE__ */ jsx2("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx2(
                Label,
                {
                  size: "xsmall",
                  weight: "plus",
                  className: "text-ui-fg-subtle",
                  htmlFor: `inventory.${inventoryIndex}.inventory_item_id`,
                  children: t("fields.item")
                }
              ) }),
              /* @__PURE__ */ jsx2(
                Form.Field,
                {
                  control: form.control,
                  name: `inventory.${inventoryIndex}.inventory_item_id`,
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsx2(Form.Item, { children: /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      Combobox,
                      {
                        ...field,
                        options: items.options.map((o) => ({
                          ...o,
                          disabled: isItemOptionDisabled(
                            o,
                            inventoryIndex
                          )
                        })),
                        searchValue: items.searchValue,
                        onSearchValueChange: items.onSearchValueChange,
                        fetchNextPage: items.fetchNextPage,
                        className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                        placeholder: t(
                          "products.create.inventory.itemPlaceholder"
                        )
                      }
                    ) }) });
                  }
                }
              ),
              /* @__PURE__ */ jsx2("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx2(
                Label,
                {
                  size: "xsmall",
                  weight: "plus",
                  className: "text-ui-fg-subtle",
                  htmlFor: `inventory.${inventoryIndex}.required_quantity`,
                  children: t("fields.quantity")
                }
              ) }),
              /* @__PURE__ */ jsx2(
                Form.Field,
                {
                  control: form.control,
                  name: `inventory.${inventoryIndex}.required_quantity`,
                  render: ({ field: { onChange, value, ...field } }) => {
                    return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                        Input2,
                        {
                          type: "number",
                          className: "bg-ui-bg-field-component",
                          min: 0,
                          value,
                          onChange: (e) => {
                            const value2 = e.target.value;
                            if (value2 === "") {
                              onChange(null);
                            } else {
                              onChange(Number(value2));
                            }
                          },
                          ...field,
                          placeholder: t(
                            "products.create.inventory.quantityPlaceholder"
                          )
                        }
                      ) }),
                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                    ] });
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx2(
              IconButton,
              {
                type: "button",
                size: "small",
                variant: "transparent",
                className: "text-ui-fg-muted",
                onClick: () => inventory.remove(inventoryIndex),
                children: /* @__PURE__ */ jsx2(XMarkMini, {})
              }
            )
          ]
        },
        inventoryItem.id
      ))
    ] })
  ] }) }) });
}
var inventory_kit_tab_default = InventoryKitTab;

// src/routes/products/product-create-variant/components/create-product-variant-form/pricing-tab.tsx
import { useMemo } from "react";
import { useWatch as useWatch2 } from "react-hook-form";
import { useTranslation as useTranslation3 } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
function PricingTab({ form }) {
  const { store } = useStore();
  const { regions } = useRegions({ limit: 9999 });
  const { price_preferences: pricePreferences } = usePricePreferences({});
  const { setCloseOnEscape } = useRouteModal();
  const columns = useVariantPriceGridColumns({
    currencies: store?.supported_currencies,
    regions,
    pricePreferences
  });
  const variant = useWatch2({
    control: form.control
  });
  return /* @__PURE__ */ jsx3(
    DataGrid,
    {
      columns,
      data: [variant],
      state: form,
      onEditingChange: (editing) => setCloseOnEscape(!editing)
    }
  );
}
var columnHelper = createDataGridHelper();
var useVariantPriceGridColumns = ({
  currencies = [],
  regions = [],
  pricePreferences = []
}) => {
  const { t } = useTranslation3();
  return useMemo(() => {
    return [
      columnHelper.column({
        id: t("fields.title"),
        header: t("fields.title"),
        cell: (context) => {
          const entity = context.row.original;
          return /* @__PURE__ */ jsx3(DataGrid.ReadonlyCell, { context, children: /* @__PURE__ */ jsx3("div", { className: "flex h-full w-full items-center gap-x-2 overflow-hidden", children: /* @__PURE__ */ jsx3("span", { className: "truncate", children: entity.title }) }) });
        },
        disableHiding: true
      }),
      ...createDataGridPriceColumns({
        currencies: currencies.map((c) => c.currency_code),
        regions,
        pricePreferences,
        getFieldName: (context, value) => {
          if (context.column.id?.startsWith("currency_prices")) {
            return `prices.${value}`;
          }
          return `prices.${value}`;
        },
        t
      })
    ];
  }, [t, currencies, regions, pricePreferences]);
};
var pricing_tab_default = PricingTab;

// src/routes/products/product-create-variant/components/create-product-variant-form/create-product-variant-form.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var initialTabState = {
  ["detail" /* DETAIL */]: "in-progress",
  ["price" /* PRICE */]: "not-started",
  ["inventory" /* INVENTORY */]: "not-started"
};
var CreateProductVariantForm = ({
  product
}) => {
  const { t } = useTranslation4();
  const { handleSuccess } = useRouteModal();
  const [tab, setTab] = useState("detail" /* DETAIL */);
  const [tabState, setTabState] = useState(initialTabState);
  const form = useForm({
    defaultValues: {
      sku: "",
      title: "",
      manage_inventory: false,
      allow_backorder: false,
      inventory_kit: false,
      options: {}
    },
    resolver: zodResolver(CreateProductVariantSchema)
  });
  const { mutateAsync, isPending } = useCreateProductVariant(product.id);
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
  const isManageInventoryEnabled = useWatch3({
    control: form.control,
    name: "manage_inventory"
  });
  const isInventoryKitEnabled = useWatch3({
    control: form.control,
    name: "inventory_kit"
  });
  const inventoryField = useFieldArray2({
    control: form.control,
    name: `inventory`
  });
  const inventoryTabEnabled = isManageInventoryEnabled && isInventoryKitEnabled;
  const tabOrder = useMemo2(() => {
    if (inventoryTabEnabled) {
      return ["detail" /* DETAIL */, "price" /* PRICE */, "inventory" /* INVENTORY */];
    }
    return ["detail" /* DETAIL */, "price" /* PRICE */];
  }, [inventoryTabEnabled]);
  useEffect(() => {
    if (isInventoryKitEnabled && inventoryField.fields.length === 0) {
      inventoryField.append({
        inventory_item_id: "",
        required_quantity: void 0
      });
    }
  }, [isInventoryKitEnabled]);
  const handleChangeTab = (update) => {
    if (tab === update) {
      return;
    }
    if (tabOrder.indexOf(update) < tabOrder.indexOf(tab)) {
      const isCurrentTabDirty = false;
      setTabState((prev) => ({
        ...prev,
        [tab]: isCurrentTabDirty ? prev[tab] : "not-started",
        [update]: "in-progress"
      }));
      setTab(update);
      return;
    }
    const tabs = tabOrder.slice(0, tabOrder.indexOf(update));
    for (const tab2 of tabs) {
      if (tab2 === "detail" /* DETAIL */) {
        if (!partialFormValidation(
          form,
          CreateVariantDetailsFields,
          CreateVariantDetailsSchema
        )) {
          setTabState((prev) => ({
            ...prev,
            [tab2]: "in-progress"
          }));
          setTab(tab2);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab2]: "completed"
        }));
      } else if (tab2 === "price" /* PRICE */) {
        if (!partialFormValidation(
          form,
          CreateVariantPriceFields,
          CreateVariantPriceSchema
        )) {
          setTabState((prev) => ({
            ...prev,
            [tab2]: "in-progress"
          }));
          setTab(tab2);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab2]: "completed"
        }));
      }
    }
    setTabState((prev) => ({
      ...prev,
      [tab]: "completed",
      [update]: "in-progress"
    }));
    setTab(update);
  };
  const handleNextTab = (tab2) => {
    if (tabOrder.indexOf(tab2) + 1 >= tabOrder.length) {
      return;
    }
    const nextTab = tabOrder[tabOrder.indexOf(tab2) + 1];
    handleChangeTab(nextTab);
  };
  const handleSubmit = form.handleSubmit(async (data) => {
    const { allow_backorder, manage_inventory, sku, title } = data;
    await mutateAsync(
      {
        title,
        sku: sku || void 0,
        allow_backorder,
        manage_inventory,
        options: data.options,
        prices: Object.entries(data.prices ?? {}).map(([currencyOrRegion, value]) => {
          if (value === "" || value === void 0) {
            return void 0;
          }
          const ret = {};
          const amount = castNumber(value);
          if (currencyOrRegion.startsWith("reg_")) {
            ret.rules = { region_id: currencyOrRegion };
            ret.currency_code = regionsCurrencyMap[currencyOrRegion];
          } else {
            ret.currency_code = currencyOrRegion;
          }
          ret.amount = amount;
          return ret;
        }).filter(Boolean),
        inventory_items: (data.inventory || []).map((i) => {
          if (!i.required_quantity || !i.inventory_item_id) {
            return false;
          }
          return {
            ...i,
            required_quantity: castNumber(i.required_quantity)
          };
        }).filter(Boolean)
      },
      {
        onSuccess: () => {
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx4(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsx4(
    ProgressTabs,
    {
      value: tab,
      onValueChange: (tab2) => handleChangeTab(tab2),
      className: "flex h-full flex-col overflow-hidden",
      children: /* @__PURE__ */ jsxs3(
        KeyboundForm,
        {
          onSubmit: handleSubmit,
          className: "flex h-full flex-col overflow-hidden",
          children: [
            /* @__PURE__ */ jsx4(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx4("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsx4("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxs3(ProgressTabs.List, { className: "grid w-full grid-cols-3", children: [
              /* @__PURE__ */ jsx4(
                ProgressTabs.Trigger,
                {
                  status: tabState.detail,
                  value: "detail" /* DETAIL */,
                  children: t("priceLists.create.tabs.details")
                }
              ),
              /* @__PURE__ */ jsx4(
                ProgressTabs.Trigger,
                {
                  status: tabState.price,
                  value: "price" /* PRICE */,
                  children: t("priceLists.create.tabs.prices")
                }
              ),
              !!inventoryTabEnabled && /* @__PURE__ */ jsx4(
                ProgressTabs.Trigger,
                {
                  status: tabState.inventory,
                  value: "inventory" /* INVENTORY */,
                  children: t("products.create.tabs.inventory")
                }
              )
            ] }) }) }) }),
            /* @__PURE__ */ jsxs3(RouteFocusModal.Body, { className: "size-full overflow-hidden", children: [
              /* @__PURE__ */ jsx4(
                ProgressTabs.Content,
                {
                  className: "size-full overflow-y-auto",
                  value: "detail" /* DETAIL */,
                  children: /* @__PURE__ */ jsx4(details_tab_default, { form, product })
                }
              ),
              /* @__PURE__ */ jsx4(
                ProgressTabs.Content,
                {
                  className: "size-full overflow-y-auto",
                  value: "price" /* PRICE */,
                  children: /* @__PURE__ */ jsx4(pricing_tab_default, { form })
                }
              ),
              !!inventoryTabEnabled && /* @__PURE__ */ jsx4(
                ProgressTabs.Content,
                {
                  className: "size-full overflow-hidden",
                  value: "inventory" /* INVENTORY */,
                  children: /* @__PURE__ */ jsx4(inventory_kit_tab_default, { form })
                }
              )
            ] }),
            /* @__PURE__ */ jsx4(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end gap-x-2", children: [
              /* @__PURE__ */ jsx4(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx4(Button2, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
              /* @__PURE__ */ jsx4(
                PrimaryButton,
                {
                  tab,
                  next: handleNextTab,
                  isLoading: isPending,
                  inventoryTabEnabled: !!inventoryTabEnabled
                }
              )
            ] }) })
          ]
        }
      )
    }
  ) });
};
var PrimaryButton = ({
  tab,
  next,
  isLoading,
  inventoryTabEnabled
}) => {
  const { t } = useTranslation4();
  if (inventoryTabEnabled && tab === "inventory" /* INVENTORY */ || !inventoryTabEnabled && tab === "price" /* PRICE */) {
    return /* @__PURE__ */ jsx4(
      Button2,
      {
        type: "submit",
        variant: "primary",
        size: "small",
        isLoading,
        children: t("actions.save")
      },
      "submit-button"
    );
  }
  return /* @__PURE__ */ jsx4(
    Button2,
    {
      type: "button",
      variant: "primary",
      size: "small",
      onClick: () => next(tab),
      children: t("actions.continue")
    },
    "next-button"
  );
};

// src/routes/products/product-create-variant/product-create-variant.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var ProductCreateVariant = () => {
  const { id } = useParams();
  const { product, isLoading, isError, error } = useProduct(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx5(RouteFocusModal, { children: !isLoading && product && /* @__PURE__ */ jsx5(CreateProductVariantForm, { product }) });
};
export {
  ProductCreateVariant as Component
};
