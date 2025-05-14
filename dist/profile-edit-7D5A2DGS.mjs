import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  languages
} from "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useMe,
  useUpdateUser
} from "./chunk-2ZKVRTBW.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/profile/profile-edit/profile-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/profile/profile-edit/components/edit-profile-form/edit-profile-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditProfileSchema = zod.object({
  first_name: zod.string().optional(),
  last_name: zod.string().optional(),
  language: zod.string()
  // usage_insights: zod.boolean(),
});
var EditProfileForm = ({ user }) => {
  const { t, i18n } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      language: i18n.language
      // usage_insights: usageInsights,
    },
    resolver: zodResolver(EditProfileSchema)
  });
  const changeLanguage = async (code) => {
    await i18n.changeLanguage(code);
  };
  const sortedLanguages = languages.sort(
    (a, b) => a.display_name.localeCompare(b.display_name)
  );
  const { mutateAsync, isPending } = useUpdateUser(user.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        first_name: values.first_name,
        last_name: values.last_name
      },
      {
        onError: (error) => {
          toast.error(error.message);
          return;
        }
      }
    );
    await changeLanguage(values.language);
    toast.success(t("profile.toast.edit"));
    handleSuccess();
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "first_name",
            render: ({ field }) => /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.firstName") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "last_name",
            render: ({ field }) => /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.lastName") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "language",
          render: ({ field: { ref, ...field } }) => /* @__PURE__ */ jsxs(Form.Item, { className: "gap-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("profile.fields.languageLabel") }),
              /* @__PURE__ */ jsx(Form.Hint, { children: t("profile.edit.languageHint") })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(Select.Trigger, { ref, className: "py-1 text-[13px]", children: /* @__PURE__ */ jsx(
                  Select.Value,
                  {
                    placeholder: t("profile.edit.languagePlaceholder"),
                    children: sortedLanguages.find(
                      (language) => language.code === field.value
                    )?.display_name
                  }
                ) }),
                /* @__PURE__ */ jsx(Select.Content, { children: languages.map((language) => /* @__PURE__ */ jsx(
                  Select.Item,
                  {
                    value: language.code,
                    children: language.display_name
                  },
                  language.code
                )) })
              ] }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/profile/profile-edit/profile-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProfileEdit = () => {
  const { user, isPending: isLoading, isError, error } = useMe();
  const { t } = useTranslation2();
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { className: "capitalize", children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("profile.edit.header") }) }) }),
    !isLoading && user && /* @__PURE__ */ jsx2(EditProfileForm, { user })
  ] });
};
export {
  ProfileEdit as Component
};
