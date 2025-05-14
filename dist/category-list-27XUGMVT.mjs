import {
  TextCell,
  TextHeader
} from "./chunk-MSDRGCRR.mjs";
import {
  useDeleteProductCategoryAction
} from "./chunk-TP7N4YBP.mjs";
import {
  getCategoryPath,
  getIsActiveProps,
  getIsInternalProps
} from "./chunk-54IEHX46.mjs";
import {
  StatusCell
} from "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useProductCategories
} from "./chunk-ZJ3OFMHB.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/categories/category-list/components/category-list-table/category-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Button, Container, Heading, Text as Text2 } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper as createColumnHelper2 } from "@tanstack/react-table";
import { useMemo as useMemo2 } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/categories/category-list/components/category-list-table/use-category-table-columns.tsx
import { TriangleRightMini } from "@medusajs/icons";
import { IconButton, Text, clx } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useCategoryTableColumns = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.accessor("name", {
        header: () => /* @__PURE__ */ jsx(TextHeader, { text: t("fields.name") }),
        cell: ({ getValue, row }) => {
          const expandHandler = row.getToggleExpandedHandler();
          if (row.original.parent_category !== void 0) {
            const path = getCategoryPath(row.original);
            return /* @__PURE__ */ jsx("div", { className: "flex size-full items-center gap-1 overflow-hidden", children: path.map((chip, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: clx("overflow-hidden", {
                  "text-ui-fg-muted flex items-center gap-x-1": index !== path.length - 1
                }),
                children: [
                  /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", className: "truncate", children: chip.name }),
                  index !== path.length - 1 && /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "/" })
                ]
              },
              chip.id
            )) });
          }
          return /* @__PURE__ */ jsxs("div", { className: "flex size-full items-center gap-x-3 overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "flex size-7 items-center justify-center", children: row.getCanExpand() ? /* @__PURE__ */ jsx(
              IconButton,
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  expandHandler();
                },
                size: "small",
                variant: "transparent",
                className: "text-ui-fg-subtle",
                children: /* @__PURE__ */ jsx(
                  TriangleRightMini,
                  {
                    className: clx({
                      "rotate-90 transition-transform will-change-transform": row.getIsExpanded()
                    })
                  }
                )
              }
            ) : null }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: getValue() })
          ] });
        }
      }),
      columnHelper.accessor("handle", {
        header: () => /* @__PURE__ */ jsx(TextHeader, { text: t("fields.handle") }),
        cell: ({ getValue }) => {
          return /* @__PURE__ */ jsx(TextCell, { text: `/${getValue()}` });
        }
      }),
      columnHelper.accessor("is_active", {
        header: () => /* @__PURE__ */ jsx(TextHeader, { text: t("fields.status") }),
        cell: ({ getValue }) => {
          const { color, label } = getIsActiveProps(getValue(), t);
          return /* @__PURE__ */ jsx(StatusCell, { color, children: label });
        }
      }),
      columnHelper.accessor("is_internal", {
        header: () => /* @__PURE__ */ jsx(TextHeader, { text: t("categories.fields.visibility.label") }),
        cell: ({ getValue }) => {
          const { color, label } = getIsInternalProps(getValue(), t);
          return /* @__PURE__ */ jsx(StatusCell, { color, children: label });
        }
      })
    ],
    [t]
  );
};

// src/routes/categories/category-list/components/category-list-table/use-category-table-query.tsx
var useCategoryTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(["q", "offset", "order"], prefix);
  const searchParams = {
    q: raw.q,
    limit: pageSize,
    offset: raw.offset ? Number(raw.offset) : 0,
    order: raw.order
  };
  return {
    raw,
    searchParams
  };
};

// src/routes/categories/category-list/components/category-list-table/category-list-table.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var CategoryListTable = () => {
  const { t } = useTranslation2();
  const { raw, searchParams } = useCategoryTableQuery({ pageSize: PAGE_SIZE });
  const query = raw.q ? {
    include_ancestors_tree: true,
    fields: "id,name,handle,is_active,is_internal,parent_category",
    ...searchParams
  } : {
    include_descendants_tree: true,
    parent_category_id: "null",
    fields: "id,name,category_children,handle,is_internal,is_active",
    ...searchParams
  };
  const { product_categories, count, isLoading, isError, error } = useProductCategories(
    {
      ...query
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const { table } = useDataTable({
    data: product_categories || [],
    columns,
    count,
    getRowId: (original) => original.id,
    getSubRows: (original) => original.category_children,
    enableExpandableRows: true,
    pageSize: PAGE_SIZE
  });
  const showRankingAction = !!product_categories && product_categories.length > 0;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(Heading, { children: t("categories.domain") }),
        /* @__PURE__ */ jsx2(Text2, { className: "text-ui-fg-subtle", size: "small", children: t("categories.subtitle") })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
        showRankingAction && /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx2(Link, { to: "organize", children: t("categories.organize.action") }) }),
        /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx2(Link, { to: "create", children: t("actions.create") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx2(
      _DataTable,
      {
        table,
        columns,
        count,
        pageSize: PAGE_SIZE,
        isLoading,
        navigateTo: (row) => row.id,
        queryObject: raw,
        search: true,
        pagination: true
      }
    )
  ] });
};
var CategoryRowActions = ({
  category
}) => {
  const { t } = useTranslation2();
  const handleDelete = useDeleteProductCategoryAction(category);
  return /* @__PURE__ */ jsx2(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.edit"),
              icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
              to: `${category.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              icon: /* @__PURE__ */ jsx2(Trash, {}),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};
var columnHelper2 = createColumnHelper2();
var useColumns = () => {
  const base = useCategoryTableColumns();
  return useMemo2(
    () => [
      ...base,
      columnHelper2.display({
        id: "actions",
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx2(CategoryRowActions, { category: row.original });
        }
      })
    ],
    [base]
  );
};

// src/routes/categories/category-list/category-list.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var CategoryList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx3(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("product_category.list.after"),
        before: getWidgets("product_category.list.before")
      },
      hasOutlet: true,
      children: /* @__PURE__ */ jsx3(CategoryListTable, {})
    }
  );
};
export {
  CategoryList as Component
};
