import {
  useProductTableColumns
} from "./chunk-G3QXMPRB.mjs";
import {
  useProductTableQuery
} from "./chunk-PCFUZKDS.mjs";
import "./chunk-IQBAUTU5.mjs";
import "./chunk-ADOCJB6L.mjs";
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
import {
  useCollection,
  useUpdateCollectionProducts
} from "./chunk-3OHH43G6.mjs";
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

// src/routes/collections/collection-add-products/collection-add-products.tsx
import { useParams } from "react-router-dom";

// src/routes/collections/collection-add-products/components/add-products-to-collection-form/add-products-to-collection-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Hint, Tooltip, toast } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import {
  createColumnHelper
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var AddProductsToCollectionSchema = zod.object({
  add: zod.array(zod.string()).min(1)
});
var PAGE_SIZE = 50;
var PREFIX = "p";
var AddProductsToCollectionForm = ({
  collection
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      add: []
    },
    resolver: zodResolver(AddProductsToCollectionSchema)
  });
  const { setValue } = form;
  const { mutateAsync, isPending: isMutating } = useUpdateCollectionProducts(
    collection.id
  );
  const [rowSelection, setRowSelection] = useState({});
  const updater = (newSelection) => {
    const update = typeof newSelection === "function" ? newSelection(rowSelection) : newSelection;
    setValue(
      "add",
      Object.keys(update).filter((k) => update[k]),
      {
        shouldDirty: true,
        shouldTouch: true
      }
    );
    setRowSelection(update);
  };
  useEffect(() => {
    setValue(
      "add",
      Object.keys(rowSelection).filter((k) => rowSelection[k]),
      {
        shouldDirty: true,
        shouldTouch: true
      }
    );
  }, [rowSelection, setValue]);
  const { searchParams, raw } = useProductTableQuery({
    prefix: PREFIX,
    pageSize: PAGE_SIZE
  });
  const { products, count, isLoading, isError, error } = useProducts(
    {
      fields: "*variants,*sales_channels",
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useProductTableFilters(["collections"]);
  const { table } = useDataTable({
    data: products ?? [],
    columns,
    count,
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
    getRowId: (row) => row.id,
    enableRowSelection: true,
    rowSelection: {
      state: rowSelection,
      updater
    },
    enablePagination: true,
    meta: {
      collectionId: collection.id
    }
  });
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        add: values.add
      },
      {
        onSuccess: () => {
          toast.success(
            t("collections.products.add.successToast", {
              count: values.add.length
            })
          );
          handleSuccess();
        },
        onError: (e) => {
          toast.error(e.message);
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
          form.formState.errors.add && /* @__PURE__ */ jsx(Hint, { variant: "error", children: form.formState.errors.add.message }),
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
            isLoading,
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
        cell: ({ row, table }) => {
          const { collectionId } = table.options.meta;
          const isAdded = row.original.collection_id === collectionId;
          const isSelected = row.getIsSelected() || isAdded;
          const Component = /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: isSelected,
              disabled: isAdded,
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
          if (isAdded) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: t("salesChannels.productAlreadyAdded"),
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

// src/routes/collections/collection-add-products/collection-add-products.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CollectionAddProducts = () => {
  const { id } = useParams();
  const { collection, isLoading, isError, error } = useCollection(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: !isLoading && collection && /* @__PURE__ */ jsx2(AddProductsToCollectionForm, { collection }) });
};
export {
  CollectionAddProducts as Component
};
