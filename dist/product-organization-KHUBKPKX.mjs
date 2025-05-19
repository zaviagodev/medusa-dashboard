import {
  CategoryCombobox
} from "./chunk-RZD5DU5K.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  PRODUCT_DETAIL_FIELDS
} from "./chunk-GOSBIJAR.mjs";
import {
  FormExtensionZone,
  useExtendableForm
} from "./chunk-I25ZGXB3.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-3TN3OOMF.mjs";
import "./chunk-MNXC6Q4F.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-XKXNQ2KV.mjs";
import "./chunk-3NJTXRIY.mjs";
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
  useProduct,
  useUpdateProduct
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-organization/product-organization.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/products/product-organization/components/product-organization-form/product-organization-form.tsx
import { Button, toast } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var ProductOrganizationSchema = zod.object({
  type_id: zod.string().nullable(),
  collection_id: zod.string().nullable(),
  category_ids: zod.array(zod.string()),
  tag_ids: zod.array(zod.string())
});
var ProductOrganizationForm = ({
  product
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const { getFormConfigs, getFormFields } = useExtension();
  const configs = getFormConfigs("product", "organize");
  const fields = getFormFields("product", "organize");
  const collections = useComboboxData({
    queryKey: ["product_collections"],
    queryFn: (params) => sdk.admin.productCollection.list(params),
    getOptions: (data) => data.collections.map((collection) => ({
      label: collection.title,
      value: collection.id
    }))
  });
  const types = useComboboxData({
    queryKey: ["product_types"],
    queryFn: (params) => sdk.admin.productType.list(params),
    getOptions: (data) => data.product_types.map((type) => ({
      label: type.value,
      value: type.id
    }))
  });
  const tags = useComboboxData({
    queryKey: ["product_tags"],
    queryFn: (params) => sdk.admin.productTag.list(params),
    getOptions: (data) => data.product_tags.map((tag) => ({
      label: tag.value,
      value: tag.id
    }))
  });
  const form = useExtendableForm({
    defaultValues: {
      type_id: product.type_id ?? "",
      collection_id: product.collection_id ?? "",
      category_ids: product.categories?.map((c) => c.id) || [],
      tag_ids: product.tags?.map((t2) => t2.id) || []
    },
    schema: ProductOrganizationSchema,
    configs,
    data: product
  });
  const { mutateAsync, isPending } = useUpdateProduct(product.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        type_id: data.type_id || null,
        collection_id: data.collection_id || null,
        categories: data.category_ids.map((c) => ({ id: c })),
        tags: data.tag_ids?.map((t2) => ({ id: t2 }))
      },
      {
        onSuccess: ({ product: product2 }) => {
          toast.success(
            t("products.organization.edit.toasts.success", {
              title: product2.title
            })
          );
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "type_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.type.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: types.options,
                  searchValue: types.searchValue,
                  onSearchValueChange: types.onSearchValueChange,
                  fetchNextPage: types.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "collection_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.collection.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  multiple: false,
                  options: collections.options,
                  onSearchValueChange: collections.onSearchValueChange,
                  searchValue: collections.searchValue
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "category_ids",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.categories.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(CategoryCombobox, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "tag_ids",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.tags.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  multiple: true,
                  options: tags.options,
                  onSearchValueChange: tags.onSearchValueChange,
                  searchValue: tags.searchValue
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(FormExtensionZone, { fields, form })
    ] }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/products/product-organization/product-organization.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductOrganization = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { product, isLoading, isError, error } = useProduct(id, {
    fields: PRODUCT_DETAIL_FIELDS
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("products.organization.edit.header") }) }) }),
    !isLoading && product && /* @__PURE__ */ jsx2(ProductOrganizationForm, { product })
  ] });
};
export {
  ProductOrganization as Component
};
