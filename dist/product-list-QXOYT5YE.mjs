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
  useProductTableFilters
} from "./chunk-FZRIVT5D.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-MNXC6Q4F.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
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
  productsQueryKeys,
  useDeleteProduct,
  useProducts
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-list/loader.ts
var productsListQuery = () => ({
  queryKey: productsQueryKeys.list({
    limit: 20,
    offset: 0,
    is_giftcard: false
  }),
  queryFn: async () => sdk.admin.product.list({ limit: 20, offset: 0, is_giftcard: false })
});
var productsLoader = (client) => {
  return async () => {
    const query = productsListQuery();
    return queryClient.getQueryData(
      query.queryKey
    ) ?? await client.fetchQuery(query);
  };
};

// src/routes/products/product-list/components/product-list-table/product-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Button, Container, Heading, toast, usePrompt } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var ProductListTable = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const initialData = useLoaderData();
  const { searchParams, raw } = useProductTableQuery({ pageSize: PAGE_SIZE });
  const { products, count, isLoading, isError, error } = useProducts(
    {
      ...searchParams,
      is_giftcard: false
    },
    {
      initialData,
      placeholderData: keepPreviousData
    }
  );
  const filters = useProductTableFilters();
  const columns = useColumns();
  const { table } = useDataTable({
    data: products ?? [],
    columns,
    count,
    enablePagination: true,
    pageSize: PAGE_SIZE,
    getRowId: (row) => row.id
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("products.domain") }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-x-2", children: [
        /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `export${location.search}`, children: t("actions.export") }) }),
        /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "import", children: t("actions.import") }) }),
        /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "create", children: t("actions.create") }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      _DataTable,
      {
        table,
        columns,
        count,
        pageSize: PAGE_SIZE,
        filters,
        search: true,
        pagination: true,
        isLoading,
        queryObject: raw,
        navigateTo: (row) => `${row.original.id}`,
        orderBy: [
          { key: "title", label: t("fields.title") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        noRecords: {
          message: t("products.list.noRecordsMessage")
        }
      }
    ),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
var ProductActions = ({ product }) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteProduct(product.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("products.deleteWarning", {
        title: product.title
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("products.toasts.delete.success.header"), {
          description: t("products.toasts.delete.success.description", {
            title: product.title
          })
        });
      },
      onError: (e) => {
        toast.error(t("products.toasts.delete.error.header"), {
          description: e.message
        });
      }
    });
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/products/${product.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useProductTableColumns();
  const columns = useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx(ProductActions, { product: row.original });
        }
      })
    ],
    [base]
  );
  return columns;
};

// src/routes/products/product-list/product-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ProductList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("product.list.after"),
        before: getWidgets("product.list.before")
      },
      children: /* @__PURE__ */ jsx2(ProductListTable, {})
    }
  );
};
export {
  ProductList as Component,
  productsLoader as productLoader
};
