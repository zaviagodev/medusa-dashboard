import {
  getApiKeyTypeFromPathname
} from "./chunk-G22WWLPG.mjs";
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
  useCreateApiKey
} from "./chunk-F6IJV2I2.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/api-key-management/api-key-management-create/api-key-management-create.tsx
import { useLocation } from "react-router-dom";

// src/routes/api-key-management/api-key-management-create/components/api-key-create-form/api-key-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, Input, Prompt, Text, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { Eye, EyeSlash } from "@medusajs/icons";
import { Fragment, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var ApiKeyCreateSchema = zod.object({
  title: zod.string().min(1)
});
function getRedactedKey(key) {
  if (!key) {
    return "";
  }
  const firstThree = key.slice(0, 4);
  const lastTwo = key.slice(-2);
  return `${firstThree}${"\u2022".repeat(key.length - 6)}${lastTwo}`;
}
var ApiKeyCreateForm = ({ keyType }) => {
  const [createdKey, setCreatedKey] = useState(null);
  const [showRedactedKey, setShowRedactedKey] = useState(true);
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      title: ""
    },
    resolver: zodResolver(ApiKeyCreateSchema)
  });
  const { mutateAsync, isPending } = useCreateApiKey();
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      // @ts-ignore
      { title: values.title, type: keyType },
      {
        onSuccess: ({ api_key }) => {
          toast.success(t("apiKeyManagement.create.successToast"));
          switch (keyType) {
            case "publishable" /* PUBLISHABLE */:
              handleSuccess(`/settings/publishable-api-keys/${api_key.id}`);
              break;
            case "secret" /* SECRET */:
              setCreatedKey(api_key);
              break;
          }
        },
        onError: (err) => {
          toast.error(err.message);
        }
      }
    );
  });
  const handleCopyToken = () => {
    if (!createdKey) {
      toast.error(t("apiKeyManagement.create.copySecretTokenFailure"));
    }
    navigator.clipboard.writeText(createdKey?.token ?? "");
    toast.success(t("apiKeyManagement.create.copySecretTokenSuccess"));
  };
  const handleGoToSecretKey = () => {
    if (!createdKey) {
      return;
    }
    handleSuccess(`/settings/secret-api-keys/${createdKey.id}`);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
      KeyboundForm,
      {
        className: "flex h-full flex-col overflow-hidden",
        onSubmit: handleSubmit,
        children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
          /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx(Heading, { children: keyType === "publishable" /* PUBLISHABLE */ ? t("apiKeyManagement.create.createPublishableHeader") : t("apiKeyManagement.create.createSecretHeader") }) }),
              /* @__PURE__ */ jsx(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: keyType === "publishable" /* PUBLISHABLE */ ? t("apiKeyManagement.create.createPublishableHint") : t("apiKeyManagement.create.createSecretHint") }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
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
            ) })
          ] }) }) }),
          /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
            /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
            /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
          ] }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Prompt, { variant: "confirmation", open: !!createdKey, children: /* @__PURE__ */ jsxs(Prompt.Content, { className: "w-fit max-w-[42.5%]", children: [
      /* @__PURE__ */ jsxs(Prompt.Header, { children: [
        /* @__PURE__ */ jsx(Prompt.Title, { children: t("apiKeyManagement.create.secretKeyCreatedHeader") }),
        /* @__PURE__ */ jsx(Prompt.Description, { children: t("apiKeyManagement.create.secretKeyCreatedHint") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-3 px-6 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "shadow-borders-base bg-ui-bg-component grid h-8 grid-cols-[1fr_32px] items-center overflow-hidden rounded-md", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center px-2", children: /* @__PURE__ */ jsx(Text, { family: "mono", size: "small", children: showRedactedKey ? getRedactedKey(createdKey?.token) : createdKey?.token }) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "transition-fg hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed text-ui-fg-muted active:text-ui-fg-subtle flex size-8 appearance-none items-center justify-center border-l",
              type: "button",
              onClick: () => setShowRedactedKey(!showRedactedKey),
              children: showRedactedKey ? /* @__PURE__ */ jsx(EyeSlash, {}) : /* @__PURE__ */ jsx(Eye, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "small",
            variant: "secondary",
            type: "button",
            className: "w-full",
            onClick: handleCopyToken,
            children: t("apiKeyManagement.actions.copy")
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Prompt.Footer, { className: "border-t py-4", children: /* @__PURE__ */ jsx(Prompt.Action, { onClick: handleGoToSecretKey, children: t("actions.continue") }) })
    ] }) })
  ] });
};

// src/routes/api-key-management/api-key-management-create/api-key-management-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var ApiKeyManagementCreate = () => {
  const { pathname } = useLocation();
  const keyType = getApiKeyTypeFromPathname(pathname);
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(ApiKeyCreateForm, { keyType }) });
};
export {
  ApiKeyManagementCreate as Component
};
