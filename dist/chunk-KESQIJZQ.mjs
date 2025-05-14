import {
  TaxRateRuleReferenceType
} from "./chunk-V3MOBCDF.mjs";
import {
  LocalizedTablePagination,
  useDeleteTaxRateAction
} from "./chunk-4FUGAJJD.mjs";
import {
  formatPercentage
} from "./chunk-3WXBLS2P.mjs";
import {
  DataTableSearch
} from "./chunk-YEDAFXMB.mjs";
import {
  DataTableOrderBy
} from "./chunk-AOFGTNG6.mjs";
import {
  NoRecords,
  NoResults
} from "./chunk-EMIHDNB7.mjs";
import {
  TableFooterSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import {
  useProductTypes
} from "./chunk-B4GODIOW.mjs";
import {
  useProducts
} from "./chunk-6I62UDJA.mjs";

// src/routes/tax-regions/common/components/tax-rate-line/tax-rate-line.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { StatusBadge, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRateLine = ({
  taxRate,
  isSublevelTaxRate
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-[1fr_1fr_auto] items-center gap-4 px-6 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1.5", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", weight: "plus", leading: "compact", children: taxRate.name }),
      taxRate.code && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1.5", children: [
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "\xB7" }),
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: taxRate.code })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: formatPercentage(taxRate.rate) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      isSublevelTaxRate && /* @__PURE__ */ jsx(StatusBadge, { color: taxRate.is_combinable ? "green" : "grey", children: taxRate.is_combinable ? t("taxRegions.fields.isCombinable.true") : t("taxRegions.fields.isCombinable.false") }),
      /* @__PURE__ */ jsx(TaxRateActions, { taxRate })
    ] })
  ] });
};
var TaxRateActions = ({ taxRate }) => {
  const { t } = useTranslation();
  const handleDelete = useDeleteTaxRateAction(taxRate);
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.edit"),
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              to: `tax-rates/${taxRate.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              icon: /* @__PURE__ */ jsx(Trash, {}),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};

// src/routes/tax-regions/common/components/tax-override-table/tax-override-table.tsx
import { Button } from "@medusajs/ui";
import { Link } from "react-router-dom";

// src/routes/tax-regions/common/components/tax-override-card/tax-override-card.tsx
import {
  ArrowDownRightMini,
  PencilSquare as PencilSquare2,
  Trash as Trash2,
  TriangleRightMini
} from "@medusajs/icons";
import {
  Badge,
  Divider,
  IconButton,
  StatusBadge as StatusBadge2,
  Text as Text2,
  Tooltip
} from "@medusajs/ui";
import { Collapsible as RadixCollapsible } from "radix-ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxOverrideCard = ({ taxRate }) => {
  const { t } = useTranslation2();
  const handleDelete = useDeleteTaxRateAction(taxRate);
  if (taxRate.is_default) {
    return null;
  }
  const groupedRules = taxRate.rules.reduce(
    (acc, rule) => {
      if (!acc[rule.reference]) {
        acc[rule.reference] = [];
      }
      acc[rule.reference].push(rule.reference_id);
      return acc;
    },
    {}
  );
  const validKeys = Object.values(TaxRateRuleReferenceType);
  const numberOfTargets = Object.keys(groupedRules).map(
    (key) => validKeys.includes(key)
  ).length;
  return /* @__PURE__ */ jsxs2(RadixCollapsible.Root, { children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-3", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx2(RadixCollapsible.Trigger, { asChild: true, children: /* @__PURE__ */ jsx2(IconButton, { size: "2xsmall", variant: "transparent", className: "group", children: /* @__PURE__ */ jsx2(TriangleRightMini, { className: "text-ui-fg-muted transition-transform group-data-[state='open']:rotate-90" }) }) }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1.5", children: [
          /* @__PURE__ */ jsx2(Text2, { size: "small", weight: "plus", leading: "compact", children: taxRate.name }),
          taxRate.code && /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex items-center gap-x-1.5", children: [
            /* @__PURE__ */ jsx2(Text2, { size: "small", leading: "compact", children: "\xB7" }),
            /* @__PURE__ */ jsx2(Text2, { size: "small", leading: "compact", children: taxRate.code })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
        /* @__PURE__ */ jsx2(Text2, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: t("taxRegions.fields.targets.numberOfTargets", {
          count: numberOfTargets
        }) }),
        /* @__PURE__ */ jsx2("div", { className: "bg-ui-border-base h-3 w-px" }),
        /* @__PURE__ */ jsx2(StatusBadge2, { color: taxRate.is_combinable ? "green" : "grey", children: taxRate.is_combinable ? t("taxRegions.fields.isCombinable.true") : t("taxRegions.fields.isCombinable.false") }),
        /* @__PURE__ */ jsx2(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: /* @__PURE__ */ jsx2(PencilSquare2, {}),
                    to: `overrides/${taxRate.id}/edit`
                  }
                ]
              },
              {
                actions: [
                  {
                    label: t("actions.delete"),
                    icon: /* @__PURE__ */ jsx2(Trash2, {}),
                    onClick: handleDelete
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx2(RadixCollapsible.Content, { children: /* @__PURE__ */ jsxs2("div", { className: "bg-ui-bg-subtle", children: [
      /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
      /* @__PURE__ */ jsx2("div", { className: "px-6 py-3", children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
        /* @__PURE__ */ jsx2("div", { className: "text-ui-fg-muted flex size-5 items-center justify-center", children: /* @__PURE__ */ jsx2(ArrowDownRightMini, {}) }),
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-wrap items-center gap-x-1.5 gap-y-2", children: [
          /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", children: formatPercentage(taxRate.rate) }),
          /* @__PURE__ */ jsx2(
            Text2,
            {
              size: "small",
              leading: "compact",
              className: "text-ui-fg-subtle",
              children: t("taxRegions.fields.targets.operators.on")
            }
          ),
          Object.entries(groupedRules).map(([reference, ids], index) => {
            return /* @__PURE__ */ jsxs2(
              "div",
              {
                className: "flex items-center gap-x-1.5",
                children: [
                  /* @__PURE__ */ jsx2(
                    Reference,
                    {
                      reference,
                      ids
                    },
                    reference
                  ),
                  index < Object.keys(groupedRules).length - 1 && /* @__PURE__ */ jsx2(
                    Text2,
                    {
                      size: "small",
                      leading: "compact",
                      className: "text-ui-fg-subtle",
                      children: t("taxRegions.fields.targets.operators.and")
                    }
                  )
                ]
              },
              reference
            );
          })
        ] })
      ] }) })
    ] }) })
  ] });
};
var Reference = ({
  reference,
  ids
}) => {
  return /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1.5", children: [
    /* @__PURE__ */ jsx2(ReferenceBadge, { reference }),
    /* @__PURE__ */ jsx2(ReferenceValues, { type: reference, ids })
  ] });
};
var ReferenceBadge = ({
  reference
}) => {
  const { t } = useTranslation2();
  let label = null;
  switch (reference) {
    case "product" /* PRODUCT */:
      label = t("taxRegions.fields.targets.tags.product");
      break;
    case "product_type" /* PRODUCT_TYPE */:
      label = t("taxRegions.fields.targets.tags.productType");
      break;
  }
  if (!label) {
    return null;
  }
  return /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", children: label });
};
var ReferenceValues = ({
  type,
  ids
}) => {
  const { t } = useTranslation2();
  const { isPending, additional, labels, isError, error } = useReferenceValues(
    type,
    ids
  );
  if (isError) {
    throw error;
  }
  if (isPending) {
    return /* @__PURE__ */ jsx2("div", { className: "bg-ui-tag-neutral-bg border-ui-tag-neutral-border h-5 w-14 animate-pulse rounded-md" });
  }
  return /* @__PURE__ */ jsx2(
    Tooltip,
    {
      content: /* @__PURE__ */ jsxs2("ul", { children: [
        labels?.map((label, index) => /* @__PURE__ */ jsx2("li", { children: label }, index)),
        additional > 0 && /* @__PURE__ */ jsx2("li", { children: t("taxRegions.fields.targets.additionalValues", {
          count: additional
        }) })
      ] }),
      children: /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", children: t("taxRegions.fields.targets.values", {
        count: ids.length
      }) })
    }
  );
};
var useReferenceValues = (type, ids) => {
  const products = useProducts(
    {
      id: ids,
      limit: 10
    },
    {
      enabled: !!ids.length && type === "product" /* PRODUCT */
    }
  );
  const productTypes = useProductTypes(
    {
      id: ids,
      limit: 10
    },
    {
      enabled: !!ids.length && type === "product_type" /* PRODUCT_TYPE */
    }
  );
  switch (type) {
    case "product" /* PRODUCT */:
      return {
        labels: products.products?.map((product) => product.title),
        isPending: products.isPending,
        additional: products.products && products.count ? products.count - products.products.length : 0,
        isError: products.isError,
        error: products.error
      };
    case "product_type" /* PRODUCT_TYPE */:
      return {
        labels: productTypes.product_types?.map((type2) => type2.value),
        isPending: productTypes.isPending,
        additional: productTypes.product_types && productTypes.count ? productTypes.count - productTypes.product_types.length : 0,
        isError: productTypes.isError,
        error: productTypes.error
      };
  }
};

// src/routes/tax-regions/common/components/tax-override-table/tax-override-table.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var TaxOverrideTable = ({
  isPending,
  action,
  count = 0,
  table,
  queryObject,
  prefix,
  children
}) => {
  if (isPending) {
    return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col divide-y", children: [
      Array.from({ length: 3 }).map((_, index) => {
        return /* @__PURE__ */ jsx3(
          "div",
          {
            className: "bg-ui-bg-field-component h-[52px] w-full animate-pulse"
          },
          index
        );
      }),
      /* @__PURE__ */ jsx3(TableFooterSkeleton, { layout: "fit" })
    ] });
  }
  const noQuery = Object.values(queryObject).filter((v) => Boolean(v)).length === 0;
  const noResults = !isPending && count === 0 && !noQuery;
  const noRecords = !isPending && count === 0 && noQuery;
  const { pageIndex, pageSize } = table.getState().pagination;
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col divide-y", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex flex-col justify-between gap-x-4 gap-y-3 px-6 py-4 md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsx3("div", { children }),
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-x-2", children: [
        !noRecords && /* @__PURE__ */ jsxs3("div", { className: "flex w-full items-center gap-x-2 md:w-fit", children: [
          /* @__PURE__ */ jsx3("div", { className: "w-full md:w-fit", children: /* @__PURE__ */ jsx3(DataTableSearch, { prefix }) }),
          /* @__PURE__ */ jsx3(
            DataTableOrderBy,
            {
              keys: ["name", "rate", "code", "updated_at", "created_at"],
              prefix
            }
          )
        ] }),
        /* @__PURE__ */ jsx3(Link, { to: action.to, children: /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", children: action.label }) })
      ] })
    ] }),
    noResults && /* @__PURE__ */ jsx3(NoResults, {}),
    noRecords && /* @__PURE__ */ jsx3(NoRecords, {}),
    !noRecords && !noResults ? !isPending ? table.getRowModel().rows.map((row) => {
      return /* @__PURE__ */ jsx3(
        TaxOverrideCard,
        {
          taxRate: row.original,
          role: "row",
          "aria-rowindex": row.index
        },
        row.id
      );
    }) : Array.from({ length: 3 }).map((_, index) => {
      return /* @__PURE__ */ jsx3(
        "div",
        {
          className: "bg-ui-bg-field-component h-[60px] w-full animate-pulse"
        },
        index
      );
    }) : null,
    !noRecords && /* @__PURE__ */ jsx3(
      LocalizedTablePagination,
      {
        prefix,
        canNextPage: table.getCanNextPage(),
        canPreviousPage: table.getCanPreviousPage(),
        count,
        nextPage: table.nextPage,
        previousPage: table.previousPage,
        pageCount: table.getPageCount(),
        pageIndex,
        pageSize
      }
    )
  ] });
};

// src/routes/tax-regions/common/hooks/use-tax-override-table.tsx
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
var useTaxOverrideTable = ({
  data = [],
  count = 0,
  pageSize: _pageSize = 10,
  prefix
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetKey = `${prefix ? `${prefix}_` : ""}offset`;
  const offset = searchParams.get(offsetKey);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: offset ? Math.ceil(Number(offset) / _pageSize) : 0,
    pageSize: _pageSize
  });
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    const index = offset ? Math.ceil(Number(offset) / _pageSize) : 0;
    if (index === pageIndex) {
      return;
    }
    setPagination((prev) => ({
      ...prev,
      pageIndex: index
    }));
  }, [offset, _pageSize, pageIndex]);
  const onPaginationChange = (updater) => {
    const state = updater(pagination);
    const { pageIndex: pageIndex2, pageSize: pageSize2 } = state;
    setSearchParams((prev) => {
      if (!pageIndex2) {
        prev.delete(offsetKey);
        return prev;
      }
      const newSearch = new URLSearchParams(prev);
      newSearch.set(offsetKey, String(pageIndex2 * pageSize2));
      return newSearch;
    });
    setPagination(state);
    return state;
  };
  const table = useReactTable({
    data,
    columns: [],
    // We don't actually want to render any columns
    pageCount: Math.ceil(count / pageSize),
    state: {
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true
  });
  return {
    table
  };
};

export {
  TaxRateLine,
  TaxOverrideTable,
  useTaxOverrideTable
};
