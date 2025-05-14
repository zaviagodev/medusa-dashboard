import {
  VisuallyHidden
} from "./chunk-F6ZOHZVB.mjs";
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
  useApiKey,
  useUpdateApiKey
} from "./chunk-F6IJV2I2.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/api-key-management/api-key-management-edit/api-key-management-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/api-key-management/api-key-management-edit/components/edit-api-key-form/edit-api-key-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditApiKeySchema = zod.object({
  title: zod.string().min(1)
});
var EditApiKeyForm = ({ apiKey }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      title: apiKey.title
    },
    resolver: zodResolver(EditApiKeySchema)
  });
  const { mutateAsync, isPending } = useUpdateApiKey(apiKey.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: ({ api_key }) => {
        toast.success(
          t("apiKeyManagement.edit.successToast", {
            title: api_key.title
          })
        );
        handleSuccess();
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsx(
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
    ) }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/api-key-management/api-key-management-edit/api-key-management-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ApiKeyManagementEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { api_key, isLoading, isError, error } = useApiKey(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("apiKeyManagement.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { asChild: true, children: /* @__PURE__ */ jsx2(VisuallyHidden, { children: t("apiKeyManagement.edit.description") }) })
    ] }),
    !isLoading && !!api_key && /* @__PURE__ */ jsx2(EditApiKeyForm, { apiKey: api_key })
  ] });
};
export {
  ApiKeyManagementEdit as Component
};
