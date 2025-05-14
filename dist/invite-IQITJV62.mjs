import {
  AvatarBox
} from "./chunk-Q6MSICBU.mjs";
import "./chunk-EQTBJSBZ.mjs";
import {
  isFetchError
} from "./chunk-ONB3JEHR.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useSignUpWithEmailPass
} from "./chunk-KOSCMAIC.mjs";
import {
  useAcceptInvite
} from "./chunk-RLY2SL5E.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/invite/invite.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Heading, Hint, Input, Text, toast } from "@medusajs/ui";
import i18n from "i18next";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { decodeToken } from "react-jwt";
import { Link, useSearchParams } from "react-router-dom";
import * as z from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateAccountSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  password: z.string().min(1),
  repeat_password: z.string().min(1)
}).superRefine(({ password, repeat_password }, ctx) => {
  if (password !== repeat_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: i18n.t("invite.passwordMismatch"),
      path: ["repeat_password"]
    });
  }
});
var Invite = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const token = searchParams.get("token");
  const invite = token ? decodeToken(token) : null;
  const isValidInvite = invite && validateDecodedInvite(invite);
  return /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-subtle relative flex min-h-dvh w-dvw items-center justify-center p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[360px] flex-col items-center", children: [
    /* @__PURE__ */ jsx(AvatarBox, { checked: success }),
    /* @__PURE__ */ jsx("div", { className: "max-h-[557px] w-full will-change-contents", children: isValidInvite ? /* @__PURE__ */ jsx(AnimatePresence, { children: !success ? /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: false,
        animate: {
          height: "557px",
          y: 0
        },
        exit: {
          height: 0,
          y: 40
        },
        transition: {
          duration: 0.8,
          delay: 0.6,
          ease: [0, 0.71, 0.2, 1.01]
        },
        className: "w-full will-change-transform",
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: false,
            animate: {
              opacity: 1,
              scale: 1
            },
            exit: {
              opacity: 0,
              scale: 0.7
            },
            transition: {
              duration: 0.6,
              delay: 0,
              ease: [0, 0.71, 0.2, 1.01]
            },
            children: /* @__PURE__ */ jsx(
              CreateView,
              {
                onSuccess: () => setSuccess(true),
                token,
                invite
              }
            )
          },
          "inner-create-account"
        )
      },
      "create-account"
    ) : /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: {
          opacity: 0,
          scale: 0.4
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        transition: {
          duration: 1,
          delay: 0.6,
          ease: [0, 0.71, 0.2, 1.01]
        },
        className: "w-full",
        children: /* @__PURE__ */ jsx(SuccessView, {})
      },
      "success-view"
    ) }) : /* @__PURE__ */ jsx(InvalidView, {}) })
  ] }) });
};
var LoginLink = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "my-6 h-px w-full border-b border-dotted" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/login",
        className: "txt-small text-ui-fg-base transition-fg hover:text-ui-fg-base-hover focus-visible:text-ui-fg-base-hover font-medium outline-none",
        children: t("invite.backToLogin")
      },
      "login-link"
    )
  ] });
};
var InvalidView = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-1", children: [
      /* @__PURE__ */ jsx(Heading, { children: t("invite.invalidTokenTitle") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("invite.invalidTokenHint") })
    ] }),
    /* @__PURE__ */ jsx(LoginLink, {})
  ] });
};
var CreateView = ({
  onSuccess,
  token,
  invite
}) => {
  const { t } = useTranslation();
  const [invalid, setInvalid] = useState(false);
  const [params] = useSearchParams();
  const isFirstRun = params.get("first_run") === "true";
  const form = useForm({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      email: isFirstRun ? "" : invite.email || "",
      first_name: "",
      last_name: "",
      password: "",
      repeat_password: ""
    }
  });
  const { mutateAsync: signUpEmailPass, isPending: isCreatingAuthUser } = useSignUpWithEmailPass();
  const { mutateAsync: acceptInvite, isPending: isAcceptingInvite } = useAcceptInvite(token);
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const authToken = await signUpEmailPass({
        email: data.email,
        password: data.password
      });
      const invitePayload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name
      };
      await acceptInvite({
        ...invitePayload,
        auth_token: authToken
      });
      toast.success(t("invite.toast.accepted"));
      onSuccess();
    } catch (error) {
      if (isFetchError(error) && error.status === 400) {
        form.setError("root", {
          type: "manual",
          message: t("invite.invalidInvite")
        });
        setInvalid(true);
        return;
      }
      form.setError("root", {
        type: "manual",
        message: t("errors.serverError")
      });
    }
  });
  const serverError = form.formState.errors.root?.message;
  const validationError = form.formState.errors.email?.message || form.formState.errors.password?.message || form.formState.errors.repeat_password?.message || form.formState.errors.first_name?.message || form.formState.errors.last_name?.message;
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(Heading, { children: t("invite.title") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("invite.hint") })
    ] }),
    /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "flex w-full flex-col gap-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-2", children: [
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  autoComplete: "off",
                  ...field,
                  className: "bg-ui-bg-field-component",
                  placeholder: t("fields.email")
                }
              ) }) });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "first_name",
            render: ({ field }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  autoComplete: "given-name",
                  ...field,
                  className: "bg-ui-bg-field-component",
                  placeholder: t("fields.firstName")
                }
              ) }) });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "last_name",
            render: ({ field }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  autoComplete: "family-name",
                  ...field,
                  className: "bg-ui-bg-field-component",
                  placeholder: t("fields.lastName")
                }
              ) }) });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "password",
            render: ({ field }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  autoComplete: "new-password",
                  type: "password",
                  ...field,
                  className: "bg-ui-bg-field-component",
                  placeholder: t("fields.password")
                }
              ) }) });
            }
          }
        ),
        /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "repeat_password",
            render: ({ field }) => {
              return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Input,
                {
                  autoComplete: "off",
                  type: "password",
                  ...field,
                  className: "bg-ui-bg-field-component",
                  placeholder: t("fields.repeatPassword")
                }
              ) }) });
            }
          }
        ),
        validationError && /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(Hint, { className: "inline-flex", variant: "error", children: validationError }) }),
        serverError && /* @__PURE__ */ jsx(
          Alert,
          {
            className: "bg-ui-bg-base items-center p-2",
            dismissible: true,
            variant: "error",
            children: serverError
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "w-full",
          type: "submit",
          isLoading: isCreatingAuthUser || isAcceptingInvite,
          disabled: invalid,
          children: t("invite.createAccount")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(LoginLink, {})
  ] });
};
var SuccessView = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center gap-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-1", children: [
      /* @__PURE__ */ jsx(Heading, { className: "text-center", children: t("invite.successTitle") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("invite.successHint") })
    ] }),
    /* @__PURE__ */ jsx(Button, { variant: "secondary", asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: "/login", replace: true, children: t("invite.successAction") }) }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/login",
        className: "txt-small text-ui-fg-base transition-fg hover:text-ui-fg-base-hover focus-visible:text-ui-fg-base-hover font-medium outline-none",
        children: t("invite.backToLogin")
      },
      "login-link"
    )
  ] });
};
var InviteSchema = z.object({
  id: z.string(),
  jti: z.string(),
  exp: z.number(),
  iat: z.number()
});
var validateDecodedInvite = (decoded) => {
  return InviteSchema.safeParse(decoded).success;
};
export {
  Invite as Component
};
