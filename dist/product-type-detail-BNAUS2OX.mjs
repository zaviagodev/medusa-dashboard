import {
  useDeleteProductTypeAction
} from "./chunk-S22NYSST.mjs";
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
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import {
  productTypesQueryKeys,
  useProductType
} from "./chunk-B4GODIOW.mjs";
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

// src/routes/product-types/product-type-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var ProductTypeDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { product_type } = useProductType(id, void 0, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!product_type) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: product_type.value });
};

// src/routes/product-types/product-type-detail/loader.ts
var productTypeDetailQuery = (id) => ({
  queryKey: productTypesQueryKeys.detail(id),
  queryFn: async () => sdk.admin.productType.retrieve(id)
});
var productTypeLoader = async ({ params }) => {
  const id = params.id;
  const query = productTypeDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/product-types/product-type-detail/product-type-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/product-types/product-type-detail/components/product-type-general-section/product-type-general-section.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ProductTypeGeneralSection = ({
  productType
}) => {
  const { t } = useTranslation();
  const handleDelete = useDeleteProductTypeAction(
    productType.id,
    productType.value
  );
  return /* @__PURE__ */ jsxs(Container, { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx2(Heading, { children: productType.value }),
    /* @__PURE__ */ jsx2(
      ActionMenu,
      {
        groups: [
          {
            actions: [
              {
                label: t("actions.edit"),
                icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
                to: "edit"
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
    )
  ] });
};

// src/routes/product-types/product-type-detail/components/product-type-product-section/product-type-product-section.tsx
import { Container as Container2, Heading as Heading2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var ProductTypeProductSection = ({
  productType
}) => {
  const { t } = useTranslation2();
  const { searchParams, raw } = useProductTableQuery({
    pageSize: PAGE_SIZE
  });
  const { products, count, isPending, isError, error } = useProducts({
    ...searchParams,
    type_id: [productType.id]
  });
  const filters = useProductTableFilters(["product_types"]);
  const columns = useProductTableColumns();
  const { table } = useDataTable({
    columns,
    data: products,
    count: products?.length || 0,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx3("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("products.domain") }) }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        filters,
        isLoading: isPending,
        columns,
        count,
        pageSize: PAGE_SIZE,
        navigateTo: ({ original }) => `/products/${original.id}`,
        orderBy: [
          { key: "title", label: t("fields.title") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        queryObject: raw,
        search: true,
        pagination: true
      }
    )
  ] });
};

// src/routes/product-types/product-type-detail/product-type-detail.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductTypeDetail = () => {
  const { id } = useParams();
  const initialData = useLoaderData();
  const { product_type, isPending, isError, error } = useProductType(
    id,
    void 0,
    {
      initialData
    }
  );
  const { getWidgets } = useExtension();
  if (isPending || !product_type) {
    return /* @__PURE__ */ jsx4(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("product_type.details.after"),
        before: getWidgets("product_type.details.before")
      },
      showJSON: true,
      showMetadata: true,
      data: product_type,
      children: [
        /* @__PURE__ */ jsx4(ProductTypeGeneralSection, { productType: product_type }),
        /* @__PURE__ */ jsx4(ProductTypeProductSection, { productType: product_type })
      ]
    }
  );
};
export {
  ProductTypeDetailBreadcrumb as Breadcrumb,
  ProductTypeDetail as Component,
  productTypeLoader as loader
};
