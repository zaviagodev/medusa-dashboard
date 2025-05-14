import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useProductType,
  useUpdateProductType
} from "./chunk-B4GODIOW.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/product-types/product-type-edit/product-type-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/product-types/product-type-edit/components/edit-product-type-form/edit-product-type-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditProductTypeSchema = z.object({
  value: z.string().min(1)
});
var EditProductTypeForm = ({
  productType
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      value: productType.value
    },
    resolver: zodResolver(EditProductTypeSchema)
  });
  const { mutateAsync, isPending } = useUpdateProductType(productType.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        value: data.value
      },
      {
        onSuccess: ({ product_type }) => {
          toast.success(
            t("productTypes.edit.successToast", {
              value: product_type.value
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
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex flex-1 flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-8 overflow-y-auto", children: /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "value",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("productTypes.fields.value") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        ) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/product-types/product-type-edit/product-type-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductTypeEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { product_type, isPending, isError, error } = useProductType(id);
  const ready = !isPending && !!product_type;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("productTypes.edit.header") }) }),
    ready && /* @__PURE__ */ jsx2(EditProductTypeForm, { productType: product_type })
  ] });
};
export {
  ProductTypeEdit as Component
};
