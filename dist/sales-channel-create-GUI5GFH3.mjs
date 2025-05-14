import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useCreateSalesChannel
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/sales-channels/sales-channel-create/components/create-sales-channel-form/create-sales-channel-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Heading,
  Input,
  Switch,
  Text,
  Textarea,
  toast
} from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateSalesChannelSchema = zod.object({
  name: zod.string().min(1),
  description: zod.string().min(1),
  enabled: zod.boolean()
});
var CreateSalesChannelForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      enabled: true
    },
    resolver: zodResolver(CreateSalesChannelSchema)
  });
  const { mutateAsync, isPending } = useCreateSalesChannel();
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        name: values.name,
        description: values.description,
        is_disabled: !values.enabled
      },
      {
        onSuccess: ({ sales_channel }) => {
          toast.success(t("salesChannels.toast.create"));
          handleSuccess(`../${sales_channel.id}`);
        },
        onError: (error) => toast.error(error.message)
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Heading, { className: "capitalize", children: t("salesChannels.createSalesChannel") }),
            /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("salesChannels.createSalesChannelHint") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2", children: /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "name",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { size: "small", ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ) }),
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
          ] }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "enabled",
              render: ({ field: { value, onChange, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("general.enabled") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        ...field,
                        checked: value,
                        onCheckedChange: onChange
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsx(Form.Hint, { children: t("salesChannels.enabledHint") }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/sales-channels/sales-channel-create/sales-channel-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var SalesChannelCreate = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(CreateSalesChannelForm, {}) });
};
export {
  SalesChannelCreate as Component
};
