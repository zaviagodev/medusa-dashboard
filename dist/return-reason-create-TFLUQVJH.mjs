import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  useCreateReturnReason
} from "./chunk-2VTICXJR.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/return-reasons/return-reason-create/components/return-reason-create-form/return-reason-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Input, Text, Textarea, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var ReturnReasonCreateSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional()
});
var ReturnReasonCreateForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      value: "",
      label: "",
      description: ""
    },
    resolver: zodResolver(ReturnReasonCreateSchema)
  });
  const { mutateAsync, isPending } = useCreateReturnReason();
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ return_reason }) => {
        toast.success(
          t("returnReasons.create.successToast", {
            label: return_reason.label
          })
        );
        handleSuccess(`../`);
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex size-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 justify-center overflow-auto px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
            /* @__PURE__ */ jsx(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx(Heading, { children: t("returnReasons.create.header") }) }),
            /* @__PURE__ */ jsx(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("returnReasons.create.subtitle") }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "value",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(
                      Form.Label,
                      {
                        tooltip: t("returnReasons.fields.value.tooltip"),
                        children: t("returnReasons.fields.value.label")
                      }
                    ),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        ...field,
                        placeholder: t(
                          "returnReasons.fields.value.placeholder"
                        )
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
                name: "label",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("returnReasons.fields.label.label") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        ...field,
                        placeholder: t(
                          "returnReasons.fields.label.placeholder"
                        )
                      }
                    ) }),
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
              name: "description",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("returnReasons.fields.description.label") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      ...field,
                      placeholder: t(
                        "returnReasons.fields.description.placeholder"
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", type: "button", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/return-reasons/return-reason-create/return-reason-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ReturnReasonCreate = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(ReturnReasonCreateForm, {}) });
};
export {
  ReturnReasonCreate as Component
};
