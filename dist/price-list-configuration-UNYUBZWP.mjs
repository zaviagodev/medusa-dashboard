import {
  PriceListCustomerGroupRuleForm
} from "./chunk-V4MGSJPP.mjs";
import "./chunk-ZJRFL6ZN.mjs";
import "./chunk-MOSRJHJ3.mjs";
import "./chunk-MSDRGCRR.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-DLZWPHHO.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  StackedDrawer,
  useRouteModal,
  useStackedModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  usePriceList,
  useUpdatePriceList
} from "./chunk-YS65UGPC.mjs";
import {
  useCustomerGroups
} from "./chunk-F6PXCY3N.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/price-lists/price-list-configuration/price-list-configuration.tsx
import { Heading as Heading2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/price-lists/price-list-configuration/components/price-list-configuration-form/price-list-configuration-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass, XMark } from "@medusajs/icons";
import {
  Button,
  DatePicker,
  Divider,
  Heading,
  IconButton,
  Text,
  clx,
  toast
} from "@medusajs/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var PriceListConfigurationSchema = z.object({
  ends_at: z.date().nullable(),
  starts_at: z.date().nullable(),
  customer_group_id: z.array(
    z.object({
      id: z.string(),
      name: z.string()
    })
  )
});
var STACKED_MODAL_ID = "cg";
var PriceListConfigurationForm = ({
  priceList,
  customerGroups
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const { setIsOpen } = useStackedModal();
  const form = useForm({
    defaultValues: {
      ends_at: priceList.ends_at ? new Date(priceList.ends_at) : null,
      starts_at: priceList.starts_at ? new Date(priceList.starts_at) : null,
      customer_group_id: customerGroups
    },
    resolver: zodResolver(PriceListConfigurationSchema)
  });
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "customer_group_id",
    keyName: "cg_id"
  });
  const handleAddCustomerGroup = (groups) => {
    if (!groups.length) {
      form.setValue("customer_group_id", []);
      setIsOpen(STACKED_MODAL_ID, false);
      return;
    }
    const newIds = groups.map((group) => group.id);
    const fieldsToAdd = groups.filter(
      (group) => !fields.some((field) => field.id === group.id)
    );
    for (const field of fields) {
      if (!newIds.includes(field.id)) {
        remove(fields.indexOf(field));
      }
    }
    append(fieldsToAdd);
    setIsOpen(STACKED_MODAL_ID, false);
  };
  const { mutateAsync } = useUpdatePriceList(priceList.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    const groupIds = values.customer_group_id.map((group) => group.id);
    const rules = { ...priceList.rules };
    if (groupIds.length) {
      rules["customer.groups.id"] = groupIds;
    } else {
      delete rules["customer.groups.id"];
    }
    await mutateAsync(
      {
        starts_at: values.starts_at?.toISOString() || null,
        ends_at: values.ends_at?.toISOString() || null,
        rules
      },
      {
        onSuccess: () => {
          toast.success(t("priceLists.configuration.edit.successToast"));
          handleSuccess();
        },
        onError: (error) => toast.error(error.message)
      }
    );
  });
  return /* @__PURE__ */ jsxs(RouteDrawer.Form, { form, children: [
    /* @__PURE__ */ jsx(RouteDrawer.Description, { className: "sr-only", children: t("priceLists.configuration.edit.description") }),
    /* @__PURE__ */ jsxs(
      KeyboundForm,
      {
        className: "flex flex-1 flex-col overflow-hidden",
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ jsxs(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-8 overflow-auto", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "starts_at",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.startsAt.label") }),
                        /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.startsAt.hint") })
                      ] }),
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        DatePicker,
                        {
                          granularity: "minute",
                          shouldCloseOnSelect: false,
                          ...field
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "ends_at",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.endsAt.label") }),
                        /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.endsAt.hint") })
                      ] }),
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        DatePicker,
                        {
                          granularity: "minute",
                          shouldCloseOnSelect: false,
                          ...field
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(Divider, {}),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "customer_group_id",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("priceLists.fields.customerAvailability.label") }),
                      /* @__PURE__ */ jsx(Form.Hint, { children: t("priceLists.fields.customerAvailability.hint") })
                    ] }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: clx(
                          "bg-ui-bg-component shadow-elevation-card-rest transition-fg grid gap-1.5 rounded-xl py-1.5",
                          "aria-[invalid='true']:shadow-borders-error"
                        ),
                        role: "application",
                        ref: field.ref,
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid gap-1.5 px-1.5 md:grid-cols-2", children: [
                            /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: t(
                              "priceLists.fields.customerAvailability.attribute"
                            ) }),
                            /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: t("operators.in") })
                          ] }),
                          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 px-1.5", children: /* @__PURE__ */ jsxs(StackedDrawer, { id: STACKED_MODAL_ID, children: [
                            /* @__PURE__ */ jsx(StackedDrawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                              "button",
                              {
                                type: "button",
                                className: "bg-ui-bg-field shadow-borders-base txt-compact-small text-ui-fg-muted flex flex-1 items-center gap-x-2 rounded-md px-2 py-1.5",
                                children: [
                                  /* @__PURE__ */ jsx(MagnifyingGlass, {}),
                                  t(
                                    "priceLists.fields.customerAvailability.placeholder"
                                  )
                                ]
                              }
                            ) }),
                            /* @__PURE__ */ jsx(StackedDrawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: t("actions.browse") }) }),
                            /* @__PURE__ */ jsxs(StackedDrawer.Content, { children: [
                              /* @__PURE__ */ jsxs(StackedDrawer.Header, { children: [
                                /* @__PURE__ */ jsx(StackedDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx(Heading, { children: t(
                                  "priceLists.fields.customerAvailability.header"
                                ) }) }),
                                /* @__PURE__ */ jsx(StackedDrawer.Description, { className: "sr-only", children: t(
                                  "priceLists.fields.customerAvailability.hint"
                                ) })
                              ] }),
                              /* @__PURE__ */ jsx(
                                PriceListCustomerGroupRuleForm,
                                {
                                  type: "drawer",
                                  setState: handleAddCustomerGroup,
                                  state: fields
                                }
                              )
                            ] })
                          ] }) }),
                          fields.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1.5", children: [
                            /* @__PURE__ */ jsx(Divider, { variant: "dashed" }),
                            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-1.5 px-1.5", children: fields.map((field2, index) => {
                              return /* @__PURE__ */ jsxs(
                                "div",
                                {
                                  className: "bg-ui-bg-field-component shadow-borders-base flex items-center justify-between gap-2 rounded-md px-2 py-0.5",
                                  children: [
                                    /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: field2.name }),
                                    /* @__PURE__ */ jsx(
                                      IconButton,
                                      {
                                        size: "small",
                                        variant: "transparent",
                                        type: "button",
                                        onClick: () => remove(index),
                                        children: /* @__PURE__ */ jsx(XMark, {})
                                      }
                                    )
                                  ]
                                },
                                field2.cg_id
                              );
                            }) })
                          ] }) : null
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx(RouteDrawer.Footer, { className: "shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
            /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
            /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", children: t("actions.save") })
          ] }) })
        ]
      }
    )
  ] });
};

// src/routes/price-lists/price-list-configuration/price-list-configuration.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PriceListConfiguration = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { price_list, isPending, isError, error } = usePriceList(id);
  const customerGroupIds = price_list?.rules?.["customer.groups.id"];
  const {
    customer_groups,
    isPending: isCustomerGroupsPending,
    isError: isCustomerGroupsError,
    error: customerGroupsError
  } = useCustomerGroups(
    {
      id: customerGroupIds
    },
    { enabled: !!customerGroupIds?.length }
  );
  const initialCustomerGroups = customer_groups?.map((group) => ({
    id: group.id,
    name: group.name
  })) || [];
  const isCustomerGroupsReady = isPending ? false : !!customerGroupIds?.length && isCustomerGroupsPending ? false : true;
  const ready = !isPending && !!price_list && isCustomerGroupsReady;
  if (isError) {
    throw error;
  }
  if (isCustomerGroupsError) {
    throw customerGroupsError;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading2, { children: t("priceLists.configuration.edit.header") }) }) }),
    ready && /* @__PURE__ */ jsx2(
      PriceListConfigurationForm,
      {
        priceList: price_list,
        customerGroups: initialCustomerGroups
      }
    )
  ] });
};
export {
  PriceListConfiguration as Component
};
