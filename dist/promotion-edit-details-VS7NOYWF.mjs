import {
  DeprecatedPercentageInput
} from "./chunk-YRY2CZ6I.mjs";
import {
  getCurrencySymbol
} from "./chunk-MWVM4TYO.mjs";
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
  usePromotion,
  useUpdatePromotion
} from "./chunk-G2H6MAK7.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/promotions/promotion-edit-details/promotion-edit-details.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/promotions/promotion-edit-details/components/edit-promotion-form/edit-promotion-details-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CurrencyInput, Input, RadioGroup, Text } from "@medusajs/ui";
import { useForm, useWatch } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditPromotionSchema = zod.object({
  is_automatic: zod.string().toLowerCase(),
  code: zod.string().min(1),
  status: zod.enum(["active", "inactive", "draft"]),
  value_type: zod.enum(["fixed", "percentage"]),
  value: zod.number(),
  allocation: zod.enum(["each", "across"])
});
var EditPromotionDetailsForm = ({
  promotion
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      is_automatic: promotion.is_automatic.toString(),
      code: promotion.code,
      status: promotion.status,
      value: promotion.application_method.value,
      allocation: promotion.application_method.allocation,
      value_type: promotion.application_method.type
    },
    resolver: zodResolver(EditPromotionSchema)
  });
  const watchValueType = useWatch({
    control: form.control,
    name: "value_type"
  });
  const isFixedValueType = watchValueType === "fixed";
  const { mutateAsync, isPending } = useUpdatePromotion(promotion.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        is_automatic: data.is_automatic === "true",
        code: data.code,
        status: data.status,
        application_method: {
          value: data.value,
          type: data.value_type,
          allocation: data.allocation
        }
      },
      {
        onSuccess: () => {
          handleSuccess();
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
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-8 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "status",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("promotions.form.status.label") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                    RadioGroup,
                    {
                      className: "flex-col gap-y-3",
                      ...field,
                      value: field.value,
                      onValueChange: field.onChange,
                      children: [
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "draft",
                            label: t("promotions.form.status.draft.title"),
                            description: t(
                              "promotions.form.status.draft.description"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "active",
                            label: t("promotions.form.status.active.title"),
                            description: t(
                              "promotions.form.status.active.description"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "inactive",
                            label: t("promotions.form.status.inactive.title"),
                            description: t(
                              "promotions.form.status.inactive.description"
                            )
                          }
                        )
                      ]
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
              name: "is_automatic",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("promotions.form.method.label") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                    RadioGroup,
                    {
                      className: "flex-col gap-y-3",
                      ...field,
                      value: field.value,
                      onValueChange: field.onChange,
                      children: [
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "false",
                            label: t("promotions.form.method.code.title"),
                            description: t(
                              "promotions.form.method.code.description"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "true",
                            label: t("promotions.form.method.automatic.title"),
                            description: t(
                              "promotions.form.method.automatic.description"
                            )
                          }
                        )
                      ]
                    }
                  ) }),
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
                name: "code",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("promotions.form.code.title") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) })
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Text,
              {
                size: "small",
                leading: "compact",
                className: "text-ui-fg-subtle",
                children: /* @__PURE__ */ jsx(
                  Trans,
                  {
                    t,
                    i18nKey: "promotions.form.code.description",
                    components: [/* @__PURE__ */ jsx("br", {}, "break")]
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "value_type",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("promotions.fields.value_type") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                    RadioGroup,
                    {
                      className: "flex-col gap-y-3",
                      ...field,
                      onValueChange: field.onChange,
                      children: [
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "fixed",
                            label: t("promotions.form.value_type.fixed.title"),
                            description: t(
                              "promotions.form.value_type.fixed.description"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "percentage",
                            label: t(
                              "promotions.form.value_type.percentage.title"
                            ),
                            description: t(
                              "promotions.form.value_type.percentage.description"
                            )
                          }
                        )
                      ]
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
              name: "value",
              render: ({ field: { onChange, ...field } }) => {
                const currencyCode = promotion.application_method?.currency_code ?? "USD";
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: isFixedValueType ? t("fields.amount") : t("fields.percentage") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: isFixedValueType ? /* @__PURE__ */ jsx(
                    CurrencyInput,
                    {
                      min: 0,
                      onValueChange: (val) => onChange(val ? parseInt(val) : null),
                      code: currencyCode,
                      symbol: getCurrencySymbol(currencyCode),
                      ...field,
                      value: field.value
                    }
                  ) : /* @__PURE__ */ jsx(
                    DeprecatedPercentageInput,
                    {
                      min: 0,
                      max: 100,
                      ...field,
                      value: field.value || "",
                      onChange: (e) => {
                        onChange(
                          e.target.value === "" ? null : parseInt(e.target.value)
                        );
                      }
                    },
                    "amount"
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
              name: "allocation",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("promotions.fields.allocation") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                    RadioGroup,
                    {
                      className: "flex-col gap-y-3",
                      ...field,
                      onValueChange: field.onChange,
                      children: [
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "each",
                            label: t("promotions.form.allocation.each.title"),
                            description: t(
                              "promotions.form.allocation.each.description"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          RadioGroup.ChoiceBox,
                          {
                            value: "across",
                            label: t("promotions.form.allocation.across.title"),
                            description: t(
                              "promotions.form.allocation.across.description"
                            )
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/promotions/promotion-edit-details/promotion-edit-details.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PromotionEditDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { promotion, isLoading, isError, error } = usePromotion(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("promotions.edit.title") }) }),
    !isLoading && promotion && /* @__PURE__ */ jsx2(EditPromotionDetailsForm, { promotion })
  ] });
};
export {
  PromotionEditDetails as Component
};
