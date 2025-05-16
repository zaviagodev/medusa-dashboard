import "./chunk-Q6MSICBU.mjs";
import "./chunk-EQTBJSBZ.mjs";
import "./chunk-4GQOUCX6.mjs";
import {
  i18n
} from "./chunk-WNBMJMFU.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useResetPasswordForEmailPass,
  useUpdateProviderForEmailPass
} from "./chunk-KOSCMAIC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/reset-password/reset-password.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Heading, Input, Text, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as z from "zod";
import { useState } from "react";
import { decodeToken } from "react-jwt";

// src/components/common/logo-box/logo-box.tsx
import { clx } from "@medusajs/ui";
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
var LogoBox = ({
  className,
  checked,
  containerTransition = {
    duration: 0.8,
    delay: 0.5,
    ease: [0, 0.71, 0.2, 1.01]
  },
  pathTransition = {
    duration: 0.8,
    delay: 0.6,
    ease: [0.1, 0.8, 0.2, 1.01]
  }
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clx(
        "size-14 bg-ui-button-neutral shadow-buttons-neutral relative flex items-center justify-center rounded-xl",
        "after:button-neutral-gradient after:inset-0 after:content-['']",
        className
      ),
      children: [
        checked && /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "size-5 absolute -right-[5px] -top-1 flex items-center justify-center rounded-full border-[0.5px] border-[rgba(3,7,18,0.2)] bg-[#3B82F6] bg-gradient-to-b from-white/0 to-white/20 shadow-[0px_1px_2px_0px_rgba(3,7,18,0.12),0px_1px_2px_0px_rgba(255,255,255,0.10)_inset,0px_-1px_5px_0px_rgba(255,255,255,0.10)_inset,0px_0px_0px_0px_rgba(3,7,18,0.06)_inset]",
            initial: { opacity: 0, scale: 0.5 },
            animate: { opacity: 1, scale: 1 },
            transition: containerTransition,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none",
                children: /* @__PURE__ */ jsx(
                  motion.path,
                  {
                    d: "M5.8335 10.4167L9.16683 13.75L14.1668 6.25",
                    stroke: "white",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    initial: { pathLength: 0, opacity: 0 },
                    animate: { pathLength: 1, opacity: 1 },
                    transition: pathTransition
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "36",
            height: "38",
            viewBox: "0 0 36 38",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M30.85 6.16832L22.2453 1.21782C19.4299 -0.405941 15.9801 -0.405941 13.1648 1.21782L4.52043 6.16832C1.74473 7.79208 0 10.802 0 14.0099V23.9505C0 27.198 1.74473 30.1683 4.52043 31.7921L13.1251 36.7822C15.9405 38.4059 19.3903 38.4059 22.2056 36.7822L30.8103 31.7921C33.6257 30.1683 35.3307 27.198 35.3307 23.9505V14.0099C35.41 10.802 33.6653 7.79208 30.85 6.16832ZM17.6852 27.8317C12.8079 27.8317 8.8426 23.8713 8.8426 19C8.8426 14.1287 12.8079 10.1683 17.6852 10.1683C22.5625 10.1683 26.5674 14.1287 26.5674 19C26.5674 23.8713 22.6022 27.8317 17.6852 27.8317Z",
                className: "fill-ui-button-inverted relative drop-shadow-sm"
              }
            )
          }
        )
      ]
    }
  );
};

// src/routes/reset-password/reset-password.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ResetPasswordInstructionsSchema = z.object({
  email: z.string().email()
});
var ResetPasswordSchema = z.object({
  password: z.string().min(1),
  repeat_password: z.string().min(1)
}).superRefine(({ password, repeat_password }, ctx) => {
  if (password !== repeat_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: i18n.t("resetPassword.passwordMismatch"),
      path: ["repeat_password"]
    });
  }
});
var ResetPasswordTokenSchema = z.object({
  entity_id: z.string(),
  provider: z.string(),
  exp: z.number(),
  iat: z.number()
});
var validateDecodedResetPasswordToken = (decoded) => {
  return ResetPasswordTokenSchema.safeParse(decoded).success;
};
var InvalidResetToken = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-base flex min-h-dvh w-dvw items-center justify-center", children: /* @__PURE__ */ jsxs2("div", { className: "m-4 flex w-full max-w-[300px] flex-col items-center", children: [
    /* @__PURE__ */ jsx2(LogoBox, { className: "mb-4" }),
    /* @__PURE__ */ jsxs2("div", { className: "mb-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx2(Heading, { children: t("resetPassword.invalidLinkTitle") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("resetPassword.invalidLinkHint") })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "flex w-full flex-col gap-y-3", children: /* @__PURE__ */ jsx2(
      Button,
      {
        onClick: () => navigate("/reset-password", { replace: true }),
        className: "w-full",
        type: "submit",
        children: t("resetPassword.goToResetPassword")
      }
    ) }),
    /* @__PURE__ */ jsx2("span", { className: "txt-small my-6", children: /* @__PURE__ */ jsx2(
      Trans,
      {
        i18nKey: "resetPassword.backToLogin",
        components: [
          /* @__PURE__ */ jsx2(
            Link,
            {
              to: "/login",
              className: "text-ui-fg-interactive transition-fg hover:text-ui-fg-interactive-hover focus-visible:text-ui-fg-interactive-hover outline-none"
            },
            "login-link"
          )
        ]
      }
    ) })
  ] }) });
};
var ChooseNewPassword = ({ token }) => {
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(false);
  const invite = token ? decodeToken(token) : null;
  const isValidResetPasswordToken = invite && validateDecodedResetPasswordToken(invite);
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      repeat_password: ""
    }
  });
  const { mutateAsync, isPending } = useUpdateProviderForEmailPass(token);
  const handleSubmit = form.handleSubmit(async ({ password }) => {
    if (!invite) {
      return;
    }
    await mutateAsync(
      {
        password
      },
      {
        onSuccess: () => {
          form.setValue("password", "");
          form.setValue("repeat_password", "");
          setShowAlert(true);
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  if (!isValidResetPasswordToken) {
    return /* @__PURE__ */ jsx2(InvalidResetToken, {});
  }
  return /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-subtle flex min-h-dvh w-dvw items-center justify-center", children: /* @__PURE__ */ jsxs2("div", { className: "m-4 flex w-full max-w-[280px] flex-col items-center", children: [
    /* @__PURE__ */ jsx2(LogoBox, { className: "mb-4" }),
    /* @__PURE__ */ jsxs2("div", { className: "mb-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx2(Heading, { children: t("resetPassword.resetPassword") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("resetPassword.newPasswordHint") })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "flex w-full flex-col gap-y-3", children: /* @__PURE__ */ jsx2(Form, { ...form, children: /* @__PURE__ */ jsxs2(
      "form",
      {
        onSubmit: handleSubmit,
        className: "flex w-full flex-col gap-y-6",
        children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-4", children: [
            /* @__PURE__ */ jsx2(Input, { type: "email", disabled: true, value: invite?.entity_id }),
            /* @__PURE__ */ jsx2(
              Form.Field,
              {
                control: form.control,
                name: "password",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      Input,
                      {
                        autoComplete: "new-password",
                        type: "password",
                        ...field,
                        placeholder: t("resetPassword.newPassword")
                      }
                    ) }),
                    /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx2(
              Form.Field,
              {
                control: form.control,
                name: "repeat_password",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      Input,
                      {
                        autoComplete: "off",
                        type: "password",
                        ...field,
                        placeholder: t("resetPassword.repeatNewPassword")
                      }
                    ) }),
                    /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                  ] });
                }
              }
            )
          ] }),
          showAlert && /* @__PURE__ */ jsx2(Alert, { dismissible: true, variant: "success", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-base mb-1", children: t("resetPassword.successfulResetTitle") }),
            /* @__PURE__ */ jsx2("span", { children: t("resetPassword.successfulReset") })
          ] }) }),
          !showAlert && /* @__PURE__ */ jsx2(Button, { className: "w-full", type: "submit", isLoading: isPending, children: t("resetPassword.resetPassword") })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx2("span", { className: "txt-small my-6", children: /* @__PURE__ */ jsx2(
      Trans,
      {
        i18nKey: "resetPassword.backToLogin",
        components: [
          /* @__PURE__ */ jsx2(
            Link,
            {
              to: "/login",
              className: "text-ui-fg-base transition-fg hover:text-ui-fg-base-hover focus-visible:text-ui-fg-base-hover outline-none"
            },
            "login-link"
          )
        ]
      }
    ) })
  ] }) });
};
var ResetPassword = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [showAlert, setShowAlert] = useState(false);
  const token = searchParams.get("token");
  const form = useForm({
    resolver: zodResolver(ResetPasswordInstructionsSchema),
    defaultValues: {
      email: ""
    }
  });
  const { mutateAsync, isPending } = useResetPasswordForEmailPass();
  const handleSubmit = form.handleSubmit(async ({ email }) => {
    await mutateAsync(
      {
        email
      },
      {
        onSuccess: () => {
          form.setValue("email", "");
          setShowAlert(true);
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  if (token) {
    return /* @__PURE__ */ jsx2(ChooseNewPassword, { token });
  }
  return /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-base flex min-h-dvh w-dvw items-center justify-center", children: /* @__PURE__ */ jsxs2("div", { className: "m-4 flex w-full max-w-[300px] flex-col items-center", children: [
    /* @__PURE__ */ jsx2(LogoBox, { className: "mb-4" }),
    /* @__PURE__ */ jsxs2("div", { className: "mb-4 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx2(Heading, { children: t("resetPassword.resetPassword") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("resetPassword.hint") })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "flex w-full flex-col gap-y-3", children: /* @__PURE__ */ jsx2(Form, { ...form, children: /* @__PURE__ */ jsxs2(
      "form",
      {
        onSubmit: handleSubmit,
        className: "flex w-full flex-col gap-y-6",
        children: [
          /* @__PURE__ */ jsx2("div", { className: "mt-4 flex flex-col gap-y-3", children: /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control: form.control,
              name: "email",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs2(Form.Item, { children: [
                  /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                    Input,
                    {
                      autoComplete: "email",
                      ...field,
                      placeholder: t("fields.email")
                    }
                  ) }),
                  /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                ] });
              }
            }
          ) }),
          showAlert && /* @__PURE__ */ jsx2(Alert, { dismissible: true, variant: "success", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-base mb-1", children: t("resetPassword.successfulRequestTitle") }),
            /* @__PURE__ */ jsx2("span", { children: t("resetPassword.successfulRequest") })
          ] }) }),
          /* @__PURE__ */ jsx2(Button, { className: "w-full", type: "submit", isLoading: isPending, children: t("resetPassword.sendResetInstructions") })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx2("span", { className: "txt-small my-6", children: /* @__PURE__ */ jsx2(
      Trans,
      {
        i18nKey: "resetPassword.backToLogin",
        components: [
          /* @__PURE__ */ jsx2(
            Link,
            {
              to: "/login",
              className: "text-ui-fg-base transition-fg hover:text-ui-fg-base-hover focus-visible:text-ui-fg-base-hover outline-none"
            },
            "login-link"
          )
        ]
      }
    ) })
  ] }) });
};
export {
  ResetPassword as Component
};
