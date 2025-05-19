import "./chunk-JOINXRQL.mjs";
import "./chunk-EQTBJSBZ.mjs";
import "./chunk-4GQOUCX6.mjs";
import {
  i18n
} from "./chunk-3TN3OOMF.mjs";
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
            children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "27", height: "29", fill: "none", children: [
              /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "idid_qXpcWAcDMg2143647607", x1: "0.49751243781094523", x2: "0.5024875621890548", y1: "0", y2: "1", children: [
                  /* @__PURE__ */ jsx("stop", { offset: "0", "stop-color": "rgb(173,126,225)", "stop-opacity": "1" }),
                  /* @__PURE__ */ jsx("stop", { offset: "1", "stop-color": "rgb(42,100,187)", "stop-opacity": "1" })
                ] }) }),
                /* @__PURE__ */ jsx("path", { d: "M 10.534 0.819 L 2.997 5.163 C 1.262 6.162 0.193 8.01 0.193 10.009 L 0.193 18.742 C 0.193 20.741 1.262 22.589 2.997 23.588 L 10.572 27.954 C 12.307 28.954 14.444 28.954 16.178 27.954 L 20.894 25.237 L 10.578 19.228 C 8.856 18.225 7.797 16.385 7.797 14.394 L 7.797 5.652 C 7.797 3.525 8.935 1.792 10.537 0.842 C 10.58 0.816 10.57 0.798 10.534 0.819 Z", fill: "url(#idid_qXpcWAcDMg2143647607)" })
              ] }),
              /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "idid_NQFUAF61gg-263379408", x1: "0", x2: "1", y1: "0.19293045194737052", y2: "0.8070695480526295", children: [
                  /* @__PURE__ */ jsx("stop", { offset: "0", "stop-color": "rgb(47,153,255)", "stop-opacity": "1" }),
                  /* @__PURE__ */ jsx("stop", { offset: "1", "stop-color": "rgb(0,44,125)", "stop-opacity": "1" })
                ] }) }),
                /* @__PURE__ */ jsx("path", { d: "M 26.625 9.961 L 26.629 18.642 C 26.629 18.684 26.607 18.683 26.607 18.633 C 26.582 16.775 21.384 13.415 19.537 12.352 C 19.537 12.352 18.722 11.527 18.183 11.048 C 17.644 10.568 17.618 10.546 17.216 10.28 C 16.867 10.05 16.504 9.87 16.271 9.754 L 16.249 9.743 C 16.017 9.628 15.321 9.321 15.321 9.321 C 12.922 8.478 12.226 8.401 10.834 9.475 C 10.834 9.475 9.209 11.048 8.59 12.467 C 7.971 13.886 7.814 15.133 8.087 15.919 C 8.101 15.958 8.11 15.995 8.117 16.03 C 8.922 18.066 9.482 18.389 10.889 19.2 C 10.993 19.261 11.103 19.324 11.218 19.391 L 14.777 21.079 L 21.43 23.495 L 15.985 27.954 C 14.251 28.954 12.113 28.954 10.379 27.954 L 2.803 23.588 C 1.069 22.589 0 20.741 0 18.742 L 0 10.009 C 0 8.01 1.069 6.162 2.803 5.163 L 10.34 0.819 C 10.377 0.798 10.387 0.816 10.344 0.842 C 10.257 0.893 10.17 0.966 10.083 1.058 L 10.622 0.748 C 12.358 -0.25 14.497 -0.249 16.233 0.75 L 23.817 5.117 C 25.553 6.116 26.624 7.963 26.625 9.961 Z", fill: "url(#idid_NQFUAF61gg-263379408)" })
              ] }),
              /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "idid_tB0RUb7cAg7674", x1: "0.1582083976082272", x2: "0.8417916023917729", y1: "1", y2: "0", children: [
                  /* @__PURE__ */ jsx("stop", { offset: "0", "stop-color": "rgb(36,165,250)", "stop-opacity": "1" }),
                  /* @__PURE__ */ jsx("stop", { offset: "1", "stop-color": "rgb(36,165,249)", "stop-opacity": "1" })
                ] }) }),
                /* @__PURE__ */ jsx("path", { d: "M 3.146 23.806 L 10.746 28.2 C 12.498 29.203 14.711 29.183 16.465 28.178 L 24.122 23.789 C 25.876 22.783 26.956 20.927 26.957 18.918 L 26.961 10.146 C 26.962 8.138 25.883 6.282 24.131 5.279 L 19.367 2.551 L 19.306 14.528 C 19.296 16.527 18.217 18.372 16.471 19.372 L 8.805 23.767 C 6.939 24.836 4.846 24.719 3.204 23.806 C 3.159 23.781 3.109 23.785 3.146 23.806 Z", fill: "url(#idid_tB0RUb7cAg7674)" })
              ] })
            ] })
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
