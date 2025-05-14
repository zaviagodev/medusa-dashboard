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
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
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
import "./chunk-R2NIHOCX.mjs";
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
import {
  useProductCategory,
  useUpdateProductCategoryProducts
} from "./chunk-ZJ3OFMHB.mjs";
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

// src/routes/categories/category-products/category-products.tsx
import { useParams } from "react-router-dom";

// src/routes/categories/category-products/components/edit-category-products-form/edit-category-products-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Checkbox, Hint, Tooltip, toast } from "@medusajs/ui";
import {
  createColumnHelper
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var EditCategoryProductsSchema = z.object({
  product_ids: z.array(z.string())
});
var PAGE_SIZE = 50;
var PREFIX = "p";
var EditCategoryProductsForm = ({
  categoryId,
  products = []
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const [selection, setSelection] = useState(
    products.reduce((acc, p) => {
      acc[p.id] = true;
      return acc;
    }, {})
  );
  const form = useForm({
    defaultValues: {
      product_ids: []
    },
    resolver: zodResolver(EditCategoryProductsSchema)
  });
  const updater = (newSelection) => {
    const value = typeof newSelection === "function" ? newSelection(selection) : newSelection;
    form.setValue("product_ids", Object.keys(value), {
      shouldDirty: true,
      shouldTouch: true
    });
    setSelection(value);
  };
  const { searchParams, raw } = useProductTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const {
    products: data,
    count,
    isPending,
    isError,
    error
  } = useProducts({
    ...searchParams
  });
  const columns = useColumns();
  const filters = useProductTableFilters(["categories"]);
  const { table } = useDataTable({
    data,
    columns,
    getRowId: (original) => original.id,
    count,
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
    enableRowSelection: (row) => {
      return !products.some((p) => p.id === row.original.id);
    },
    enablePagination: true,
    rowSelection: {
      state: selection,
      updater
    }
  });
  const { mutateAsync, isPending: isMutating } = useUpdateProductCategoryProducts(categoryId);
  const handleSubmit = form.handleSubmit(async (data2) => {
    await mutateAsync(
      {
        add: data2.product_ids
      },
      {
        onSuccess: () => {
          toast.success(
            t("categories.products.add.successToast", {
              count: data2.product_ids.length - products.length
            })
          );
          handleSuccess();
        },
        onError: (error2) => {
          toast.error(error2.message);
        }
      }
    );
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          form.formState.errors.product_ids && /* @__PURE__ */ jsx(Hint, { variant: "error", children: form.formState.errors.product_ids.message }),
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isMutating, children: t("actions.save") })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "size-full overflow-hidden", children: /* @__PURE__ */ jsx(
          _DataTable,
          {
            table,
            columns,
            pageSize: PAGE_SIZE,
            count,
            queryObject: raw,
            filters,
            orderBy: [
              { key: "title", label: t("fields.title") },
              { key: "created_at", label: t("fields.createdAt") },
              { key: "updated_at", label: t("fields.updatedAt") }
            ],
            prefix: PREFIX,
            isLoading: isPending,
            layout: "fill",
            pagination: true,
            search: "autofocus"
          }
        ) })
      ]
    }
  ) });
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  const base = useProductTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          const isPreSelected = !row.getCanSelect();
          const isSelected = row.getIsSelected() || isPreSelected;
          const Component = /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: isSelected,
              disabled: isPreSelected,
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
          if (isPreSelected) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: t("categories.products.add.disabledTooltip"),
                side: "right",
                children: Component
              }
            );
          }
          return Component;
        }
      }),
      ...base
    ],
    [t, base]
  );
};

// src/routes/categories/category-products/category-products.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CategoryProducts = () => {
  const { id } = useParams();
  const { product_category, isPending, isFetching, isError, error } = useProductCategory(id, {
    fields: "products.id"
  });
  const ready = !isPending && !isFetching && !!product_category;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx2(
    EditCategoryProductsForm,
    {
      categoryId: product_category.id,
      products: product_category.products
    }
  ) });
};
export {
  CategoryProducts as Component
};
