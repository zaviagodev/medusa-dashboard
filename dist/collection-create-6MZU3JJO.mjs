import {
  HandleInput
} from "./chunk-7OYLCEKK.mjs";
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
  useCreateCollection
} from "./chunk-3OHH43G6.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/collections/collection-create/components/create-collection-form/create-collection-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Input, Text, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateCollectionSchema = zod.object({
  title: zod.string().min(1),
  handle: zod.string().optional()
});
var CreateCollectionForm = () => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      title: "",
      handle: ""
    },
    resolver: zodResolver(CreateCollectionSchema)
  });
  const { mutateAsync, isPending } = useCreateCollection();
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ collection }) => {
        handleSuccess(`/collections/${collection.id}`);
        toast.success(t("collections.createSuccess"));
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          size: "small",
          variant: "primary",
          type: "submit",
          isLoading: isPending,
          children: t("actions.create")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Heading, { children: t("collections.createCollection") }),
        /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("collections.createCollectionHint") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "title",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("fields.title") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { autoComplete: "off", ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "handle",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(
                  Form.Label,
                  {
                    optional: true,
                    tooltip: t("collections.handleTooltip"),
                    children: t("fields.handle")
                  }
                ),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(HandleInput, { ...field }) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        )
      ] })
    ] }) })
  ] }) });
};

// src/routes/collections/collection-create/collection-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var CollectionCreate = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(CreateCollectionForm, {}) });
};
export {
  CollectionCreate as Component
};
