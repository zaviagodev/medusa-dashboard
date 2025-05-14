import {
  PriceListCustomerGroupRuleForm
} from "./chunk-V4MGSJPP.mjs";
import "./chunk-ZJRFL6ZN.mjs";
import {
  PriceListCreateProductsSchema,
  PriceListRulesSchema,
  usePriceListCurrencyData,
  usePriceListGridColumns
} from "./chunk-HPXFQPHA.mjs";
import {
  exctractPricesFromProducts,
  isProductRow
} from "./chunk-G2J2T2QU.mjs";
import "./chunk-XUQVQCAO.mjs";
import "./chunk-MOSRJHJ3.mjs";
import "./chunk-MSDRGCRR.mjs";
import {
  useProductTableColumns
} from "./chunk-G3QXMPRB.mjs";
import {
  useProductTableQuery
} from "./chunk-PCFUZKDS.mjs";
import "./chunk-IQBAUTU5.mjs";
import "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import {
  DataGrid
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
import "./chunk-DLZWPHHO.mjs";
import {
  useProductTableFilters
} from "./chunk-FZRIVT5D.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-6GU6IDUA.mjs";
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
import "./chunk-MNXC6Q4F.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
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
import {
  useCreatePriceList
} from "./chunk-YS65UGPC.mjs";
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
  useProducts
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/price-lists/price-list-create/components/price-list-create-form/price-list-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button as Button2, ProgressTabs, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation3 } from "react-i18next";
import { useState as useState2 } from "react";

// src/routes/price-lists/price-list-create/components/price-list-create-form/price-list-details-form.tsx
import { MagnifyingGlass, XMarkMini } from "@medusajs/icons";
import {
  Button,
  DatePicker,
  Divider,
  Heading,
  IconButton,
  Input,
  RadioGroup,
  Select,
  Text,
  Textarea,
  clx
} from "@medusajs/ui";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var PriceListDetailsForm = ({ form }) => {
  const { t } = useTranslation();
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "rules.customer_group_id",
    keyName: "cg_id"
  });
  const { setIsOpen } = useStackedModal();
  const handleAddCustomerGroup = (groups) => {
    const newIds = groups.map((group) => group.id);
    const fieldsToAdd = groups.filter(
      (group) => !fields.some((field) => field.id === group.id)
    );
    for (const field of fields) {
      if (!newIds.includes(field.id)) {
        remove(fields.indexOf(field));
      }
    }
    append(fieldsToAdd);
    setIsOpen("cg", false);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-8 py-16", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Heading, { children: t("priceLists.create.header") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("priceLists.create.subheader") })
    ] }),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "type",
        render: ({ field: { onChange, ...rest } }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("priceLists.fields.type.label") }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.type.hint") })
              ] }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                RadioGroup,
                {
                  onValueChange: onChange,
                  ...rest,
                  className: "grid grid-cols-1 gap-4 md:grid-cols-2",
                  children: [
                    /* @__PURE__ */ jsx(
                      RadioGroup.ChoiceBox,
                      {
                        value: "sale",
                        label: t("priceLists.fields.type.options.sale.label"),
                        description: t(
                          "priceLists.fields.type.options.sale.description"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      RadioGroup.ChoiceBox,
                      {
                        value: "override",
                        label: t(
                          "priceLists.fields.type.options.override.label"
                        ),
                        description: t(
                          "priceLists.fields.type.options.override.description"
                        )
                      }
                    )
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1  gap-4 md:grid-cols-2", children: [
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
            name: "status",
            render: ({ field: { onChange, ref, ...field } }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("priceLists.fields.status.label") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: onChange, children: [
                  /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                  /* @__PURE__ */ jsxs(Select.Content, { children: [
                    /* @__PURE__ */ jsx(Select.Item, { value: "active", children: t("priceLists.fields.status.options.active") }),
                    /* @__PURE__ */ jsx(Select.Item, { value: "draft", children: t("priceLists.fields.status.options.draft") })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "description",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.description") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Textarea, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "starts_at",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.startsAt.label") }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.startsAt.hint") })
              ] }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                DatePicker,
                {
                  granularity: "minute",
                  shouldCloseOnSelect: false,
                  ...field
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "ends_at",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.endsAt.label") }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.endsAt.hint") })
              ] }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                DatePicker,
                {
                  granularity: "minute",
                  shouldCloseOnSelect: false,
                  ...field
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ),
    /* @__PURE__ */ jsx(Divider, {}),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "rules.customer_group_id",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.customerAvailability.label") }),
              /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.customerAvailability.hint") })
            ] }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: clx(
                  "bg-ui-bg-component shadow-elevation-card-rest transition-fg grid gap-1.5 rounded-xl py-1.5",
                  "aria-[invalid='true']:shadow-borders-error"
                ),
                role: "application",
                ref: field.ref,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid gap-1.5 px-1.5 md:grid-cols-2", children: [
                    /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: t("priceLists.fields.customerAvailability.attribute") }),
                    /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: t("operators.in") })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 px-1.5", children: /* @__PURE__ */ jsxs(StackedFocusModal, { id: "cg", children: [
                    /* @__PURE__ */ jsx(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover shadow-borders-base txt-compact-small text-ui-fg-muted transition-fg focus-visible:shadow-borders-interactive-with-active flex flex-1 items-center gap-x-2 rounded-md px-2 py-1.5 outline-none",
                        children: [
                          /* @__PURE__ */ jsx(MagnifyingGlass, {}),
                          t(
                            "priceLists.fields.customerAvailability.placeholder"
                          )
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: t("actions.browse") }) }),
                    /* @__PURE__ */ jsxs(StackedFocusModal.Content, { children: [
                      /* @__PURE__ */ jsx(StackedFocusModal.Header, {}),
                      /* @__PURE__ */ jsx(
                        PriceListCustomerGroupRuleForm,
                        {
                          state: fields,
                          setState: handleAddCustomerGroup,
                          type: "focus"
                        }
                      )
                    ] })
                  ] }) }),
                  fields.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1.5", children: [
                    /* @__PURE__ */ jsx(Divider, { variant: "dashed" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-1.5 px-1.5", children: fields.map((field2, index) => {
                      return /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "bg-ui-bg-field-component shadow-borders-base flex items-center justify-between gap-2 rounded-md px-2 py-0.5",
                          children: [
                            /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: field2.name }),
                            /* @__PURE__ */ jsx(
                              IconButton,
                              {
                                size: "small",
                                variant: "transparent",
                                type: "button",
                                onClick: () => remove(index),
                                children: /* @__PURE__ */ jsx(XMarkMini, {})
                              }
                            )
                          ]
                        },
                        field2.cg_id
                      );
                    }) })
                  ] }) : null
                ]
              }
            ) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    )
  ] }) });
};

// src/routes/price-lists/price-list-create/components/price-list-create-form/price-list-prices-form.tsx
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { jsx as jsx2 } from "react/jsx-runtime";
var PriceListPricesForm = ({
  form,
  currencies,
  regions,
  pricePreferences
}) => {
  const ids = useWatch({
    control: form.control,
    name: "product_ids"
  });
  const existingProducts = useWatch({
    control: form.control,
    name: "products"
  });
  const { products, isLoading, isError, error } = useProducts({
    id: ids.map((id) => id.id),
    limit: ids.length,
    fields: "title,thumbnail,*variants"
  });
  const { setCloseOnEscape } = useRouteModal();
  const { setValue } = form;
  useEffect(() => {
    if (!isLoading && products) {
      products.forEach((product) => {
        if (existingProducts[product.id] || !product.variants) {
          return;
        }
        setValue(`products.${product.id}.variants`, {
          ...product.variants.reduce((variants, variant) => {
            variants[variant.id] = {
              currency_prices: {},
              region_prices: {}
            };
            return variants;
          }, {})
        });
      });
    }
  }, [products, existingProducts, isLoading, setValue]);
  const columns = usePriceListGridColumns({
    currencies,
    regions,
    pricePreferences
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2("div", { className: "flex size-full flex-col divide-y overflow-hidden", children: /* @__PURE__ */ jsx2(
    DataGrid,
    {
      isLoading,
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
  ) });
};

// src/routes/price-lists/price-list-create/components/price-list-create-form/price-list-products-form.tsx
import { Checkbox } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useWatch as useWatch2 } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
var PAGE_SIZE = 50;
var PREFIX = "p";
function getInitialSelection(products) {
  return products.reduce((acc, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {});
}
var PriceListProductsForm = ({ form }) => {
  const { t } = useTranslation2();
  const { control, setValue } = form;
  const selectedIds = useWatch2({
    control,
    name: "product_ids"
  });
  const productRecords = useWatch2({
    control,
    name: "products"
  });
  const [rowSelection, setRowSelection] = useState(
    getInitialSelection(selectedIds)
  );
  const { searchParams, raw } = useProductTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { products, count, isLoading, isError, error } = useProducts(
    searchParams,
    {
      placeholderData: keepPreviousData
    }
  );
  const updater = (fn) => {
    const state = typeof fn === "function" ? fn(rowSelection) : fn;
    const ids = Object.keys(state);
    const productRecordKeys = Object.keys(productRecords);
    const updatedRecords = productRecordKeys.reduce((acc, key) => {
      if (ids.includes(key)) {
        acc[key] = productRecords[key];
      }
      return acc;
    }, {});
    const update = ids.map((id) => ({ id }));
    setValue("product_ids", update, { shouldDirty: true, shouldTouch: true });
    setValue("products", updatedRecords, {
      shouldDirty: true,
      shouldTouch: true
    });
    setRowSelection(state);
  };
  const columns = useColumns();
  const filters = useProductTableFilters();
  const { table } = useDataTable({
    data: products || [],
    columns,
    count,
    enablePagination: true,
    enableRowSelection: (row) => {
      return !!row.original.variants?.length;
    },
    getRowId: (row) => row.id,
    rowSelection: {
      state: rowSelection,
      updater
    },
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3("div", { className: "flex size-full flex-col", children: /* @__PURE__ */ jsx3(
    _DataTable,
    {
      table,
      columns,
      filters,
      pageSize: PAGE_SIZE,
      prefix: PREFIX,
      count,
      isLoading,
      layout: "fill",
      orderBy: [
        { key: "title", label: t("fields.title") },
        { key: "status", label: t("fields.status") },
        { key: "created_at", label: t("fields.createdAt") },
        { key: "updated_at", label: t("fields.updatedAt") }
      ],
      pagination: true,
      search: true,
      queryObject: raw,
      noRecords: {
        message: t("priceLists.create.products.list.noRecordsMessage")
      }
    }
  ) });
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useProductTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx3(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx3(
            Checkbox,
            {
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
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

// src/routes/price-lists/price-list-create/components/price-list-create-form/schema.ts
import { z } from "zod";
var PricingCustomerGroupsArray = z.array(
  z.object({
    id: z.string(),
    name: z.string()
  })
);
var PricingCreateSchema = z.object({
  type: z.enum(["sale", "override"]),
  status: z.enum(["draft", "active"]),
  title: z.string().min(1),
  description: z.string().min(1),
  starts_at: z.date().nullish(),
  ends_at: z.date().nullish(),
  product_ids: z.array(z.object({ id: z.string() })).min(1),
  products: PriceListCreateProductsSchema,
  rules: PriceListRulesSchema.nullish()
});
var PricingDetailsSchema = PricingCreateSchema.pick({
  type: true,
  title: true,
  description: true,
  starts_at: true,
  ends_at: true,
  customer_group_ids: true
});
var PricingDetailsFields = Object.keys(
  PricingDetailsSchema.shape
);
var PricingProductsSchema = PricingCreateSchema.pick({
  product_ids: true
});
var PricingProductsFields = Object.keys(
  PricingProductsSchema.shape
);
var PricingPricesSchema = PricingCreateSchema.pick({
  products: true
});
var PricingPricesFields = Object.keys(
  PricingPricesSchema.shape
);

// src/routes/price-lists/price-list-create/components/price-list-create-form/price-list-create-form.tsx
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var tabOrder = ["detail" /* DETAIL */, "product" /* PRODUCT */, "price" /* PRICE */];
var initialTabState = {
  ["detail" /* DETAIL */]: "in-progress",
  ["product" /* PRODUCT */]: "not-started",
  ["price" /* PRICE */]: "not-started"
};
var PriceListCreateForm = ({
  regions,
  currencies,
  pricePreferences
}) => {
  const [tab, setTab] = useState2("detail" /* DETAIL */);
  const [tabState, setTabState] = useState2(initialTabState);
  const { t } = useTranslation3();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      type: "sale",
      status: "active",
      title: "",
      description: "",
      starts_at: null,
      ends_at: null,
      product_ids: [],
      products: {},
      rules: {
        customer_group_id: []
      }
    },
    resolver: zodResolver(PricingCreateSchema)
  });
  const { mutateAsync, isPending } = useCreatePriceList();
  const handleSubmit = form.handleSubmit(async (data) => {
    const { rules, products } = data;
    const rulesPayload = rules?.customer_group_id?.length ? { "customer.groups.id": rules.customer_group_id.map((cg) => cg.id) } : void 0;
    const prices = exctractPricesFromProducts(products, regions);
    await mutateAsync(
      {
        title: data.title,
        type: data.type,
        status: data.status,
        description: data.description,
        starts_at: data.starts_at ? data.starts_at.toISOString() : null,
        ends_at: data.ends_at ? data.ends_at.toISOString() : null,
        rules: rulesPayload,
        prices
      },
      {
        onSuccess: ({ price_list }) => {
          toast.success(
            t("priceLists.create.successToast", {
              title: price_list.title
            })
          );
          handleSuccess(`../${price_list.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const partialFormValidation = (fields, schema) => {
    form.clearErrors(fields);
    const values = fields.reduce(
      (acc, key) => {
        acc[key] = form.getValues(key);
        return acc;
      },
      {}
    );
    const validationResult = schema.safeParse(values);
    if (!validationResult.success) {
      validationResult.error.errors.forEach(({ path, message, code }) => {
        form.setError(path.join("."), {
          type: code,
          message
        });
      });
      return false;
    }
    return true;
  };
  const isTabDirty = (tab2) => {
    switch (tab2) {
      case "detail" /* DETAIL */: {
        const fields = PricingDetailsFields;
        return fields.some((field) => {
          return form.getFieldState(field).isDirty;
        });
      }
      case "product" /* PRODUCT */: {
        const fields = PricingProductsFields;
        return fields.some((field) => {
          return form.getFieldState(field).isDirty;
        });
      }
      case "price" /* PRICE */: {
        const fields = PricingPricesFields;
        return fields.some((field) => {
          return form.getFieldState(field).isDirty;
        });
      }
    }
  };
  const handleChangeTab = (update) => {
    if (tab === update) {
      return;
    }
    if (tabOrder.indexOf(update) < tabOrder.indexOf(tab)) {
      const isCurrentTabDirty = isTabDirty(tab);
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
        if (!partialFormValidation(PricingDetailsFields, PricingDetailsSchema)) {
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
      } else if (tab2 === "product" /* PRODUCT */) {
        if (!partialFormValidation(PricingProductsFields, PricingProductsSchema)) {
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
  return /* @__PURE__ */ jsx4(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsx4(
    ProgressTabs,
    {
      value: tab,
      onValueChange: (tab2) => handleChangeTab(tab2),
      className: "flex h-full flex-col overflow-hidden",
      children: /* @__PURE__ */ jsxs2(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
        /* @__PURE__ */ jsx4(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx4("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsx4("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxs2(ProgressTabs.List, { className: "grid w-full grid-cols-3", children: [
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
              status: tabState.product,
              value: "product" /* PRODUCT */,
              children: t("priceLists.create.tabs.products")
            }
          ),
          /* @__PURE__ */ jsx4(
            ProgressTabs.Trigger,
            {
              status: tabState.price,
              value: "price" /* PRICE */,
              children: t("priceLists.create.tabs.prices")
            }
          )
        ] }) }) }) }),
        /* @__PURE__ */ jsxs2(RouteFocusModal.Body, { className: "size-full overflow-hidden", children: [
          /* @__PURE__ */ jsx4(
            ProgressTabs.Content,
            {
              className: "size-full overflow-y-auto",
              value: "detail" /* DETAIL */,
              children: /* @__PURE__ */ jsx4(PriceListDetailsForm, { form })
            }
          ),
          /* @__PURE__ */ jsx4(
            ProgressTabs.Content,
            {
              className: "size-full overflow-y-auto",
              value: "product" /* PRODUCT */,
              children: /* @__PURE__ */ jsx4(PriceListProductsForm, { form })
            }
          ),
          /* @__PURE__ */ jsx4(
            ProgressTabs.Content,
            {
              className: "size-full overflow-hidden",
              value: "price" /* PRICE */,
              children: /* @__PURE__ */ jsx4(
                PriceListPricesForm,
                {
                  form,
                  regions,
                  currencies,
                  pricePreferences
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx4(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx4(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx4(Button2, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx4(
            PrimaryButton,
            {
              tab,
              next: handleNextTab,
              isLoading: isPending
            }
          )
        ] }) })
      ] })
    }
  ) });
};
var PrimaryButton = ({ tab, next, isLoading }) => {
  const { t } = useTranslation3();
  if (tab === "price" /* PRICE */) {
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

// src/routes/price-lists/price-list-create/price-list-create.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var PriceListCreate = () => {
  const { isReady, regions, currencies, pricePreferences } = usePriceListCurrencyData();
  return /* @__PURE__ */ jsx5(RouteFocusModal, { children: isReady && /* @__PURE__ */ jsx5(
    PriceListCreateForm,
    {
      regions,
      currencies,
      pricePreferences
    }
  ) });
};
export {
  PriceListCreate as Component
};
