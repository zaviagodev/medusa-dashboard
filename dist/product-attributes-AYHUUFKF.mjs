import {
  CountrySelect
} from "./chunk-SCBXRJPV.mjs";
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
} from "./chunk-F3KEKDWT.mjs";
import {
  FormExtensionZone,
  useExtendableForm
} from "./chunk-BQXL5Z53.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-3CBDGI2O.mjs";
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
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-attributes/product-attributes.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/products/product-attributes/components/product-attributes-form/product-attributes-form.tsx
import { Button, Input } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var dimension = zod.union([zod.string(), zod.number()]).transform((value) => {
  if (value === "") {
    return null;
  }
  return Number(value);
}).optional().nullable();
var ProductAttributesSchema = zod.object({
  weight: dimension,
  length: dimension,
  width: dimension,
  height: dimension,
  mid_code: zod.string().optional(),
  hs_code: zod.string().optional(),
  origin_country: zod.string().optional()
});
var ProductAttributesForm = ({
  product
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const { getFormConfigs, getFormFields } = useExtension();
  const configs = getFormConfigs("product", "attributes");
  const fields = getFormFields("product", "attributes");
  const form = useExtendableForm({
    defaultValues: {
      height: product.height ? product.height : null,
      width: product.width ? product.width : null,
      length: product.length ? product.length : null,
      weight: product.weight ? product.weight : null,
      mid_code: product.mid_code || "",
      hs_code: product.hs_code || "",
      origin_country: product.origin_country || ""
    },
    schema: ProductAttributesSchema,
    configs,
    data: product
  });
  const { mutateAsync, isPending } = useUpdateProduct(product.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        weight: data.weight ? data.weight : void 0,
        length: data.length ? data.length : void 0,
        width: data.width ? data.width : void 0,
        height: data.height ? data.height : void 0,
        mid_code: data.mid_code,
        hs_code: data.hs_code,
        origin_country: data.origin_country
      },
      {
        onSuccess: () => {
          handleSuccess();
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx("div", { className: "flex h-full flex-col gap-y-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "width",
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.width") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: value || "",
                  onChange: (e) => {
                    const value2 = e.target.value;
                    if (value2 === "") {
                      onChange(null);
                    } else {
                      onChange(parseFloat(value2));
                    }
                  },
                  ...field
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
          name: "height",
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.height") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: value || "",
                  onChange: (e) => {
                    const value2 = e.target.value;
                    if (value2 === "") {
                      onChange(null);
                    } else {
                      onChange(Number(value2));
                    }
                  },
                  ...field
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
          name: "length",
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.length") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: value || "",
                  onChange: (e) => {
                    const value2 = e.target.value;
                    if (value2 === "") {
                      onChange(null);
                    } else {
                      onChange(Number(value2));
                    }
                  },
                  ...field
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
          name: "weight",
          render: ({ field: { onChange, value, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.weight") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  type: "number",
                  min: 0,
                  value: value || "",
                  onChange: (e) => {
                    const value2 = e.target.value;
                    if (value2 === "") {
                      onChange(null);
                    } else {
                      onChange(Number(value2));
                    }
                  },
                  ...field
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
          name: "mid_code",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.midCode") }),
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
          name: "hs_code",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.hsCode") }),
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
          name: "origin_country",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.countryOfOrigin") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(CountrySelect, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(FormExtensionZone, { fields, form })
    ] }) }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/products/product-attributes/product-attributes.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductAttributes = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { product, isLoading, isError, error } = useProduct(id, {
    fields: PRODUCT_DETAIL_FIELDS
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("products.editAttributes") }) }) }),
    !isLoading && product && /* @__PURE__ */ jsx2(ProductAttributesForm, { product })
  ] });
};
export {
  ProductAttributes as Component
};
