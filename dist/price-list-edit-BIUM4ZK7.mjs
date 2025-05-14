import {
  PriceListStatus,
  PriceListType
} from "./chunk-XUQVQCAO.mjs";
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
  usePriceList,
  useUpdatePriceList
} from "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/price-lists/price-list-edit/price-list-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/price-lists/price-list-edit/components/price-list-edit-form/edit-price-list-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  RadioGroup,
  Select,
  Textarea,
  toast
} from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var PriceListEditSchema = z.object({
  status: z.nativeEnum(PriceListStatus),
  type: z.nativeEnum(PriceListType),
  title: z.string().min(1),
  description: z.string().min(1)
});
var PriceListEditForm = ({ priceList }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      type: priceList.type,
      title: priceList.title,
      description: priceList.description,
      status: priceList.status
    },
    resolver: zodResolver(PriceListEditSchema)
  });
  const { mutateAsync, isPending } = useUpdatePriceList(priceList.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values, {
      onSuccess: ({ price_list }) => {
        toast.success(
          t("priceLists.edit.successToast", {
            title: price_list.title
          })
        );
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex flex-1 flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-6 overflow-auto", children: [
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "type",
              render: ({ field: { onChange, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("priceLists.fields.type.label") }),
                    /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.type.hint") })
                  ] }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(RadioGroup, { ...field, onValueChange: onChange, children: [
                    /* @__PURE__ */ jsx(
                      RadioGroup.ChoiceBox,
                      {
                        value: "sale" /* SALE */,
                        label: t("priceLists.fields.type.options.sale.label"),
                        description: t(
                          "priceLists.fields.type.options.sale.description"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      RadioGroup.ChoiceBox,
                      {
                        value: "override" /* OVERRIDE */,
                        label: t(
                          "priceLists.fields.type.options.override.label"
                        ),
                        description: t(
                          "priceLists.fields.type.options.override.description"
                        )
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
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
                        /* @__PURE__ */ jsx(Select.Item, { value: "active" /* ACTIVE */, children: t("priceLists.fields.status.options.active") }),
                        /* @__PURE__ */ jsx(Select.Item, { value: "draft" /* DRAFT */, children: t("priceLists.fields.status.options.draft") })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
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
          ] })
        ] }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { className: "shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/price-lists/price-list-edit/price-list-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PriceListEdit = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { price_list, isLoading, isError, error } = usePriceList(id);
  const ready = !isLoading && price_list;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("priceLists.edit.header") }) }),
    ready && /* @__PURE__ */ jsx2(PriceListEditForm, { priceList: price_list })
  ] });
};
export {
  PriceListEdit as Component
};
