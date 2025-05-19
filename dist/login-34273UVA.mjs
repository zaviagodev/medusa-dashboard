import {
  AvatarBox
} from "./chunk-JOINXRQL.mjs";
import "./chunk-EQTBJSBZ.mjs";
import {
  isFetchError
} from "./chunk-ONB3JEHR.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import "./chunk-Z5UDPQIH.mjs";
import {
  useSignInWithEmailPass
} from "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/login/login.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Heading, Hint, Input, Text } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});
var Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { getWidgets } = useExtension();
  const from = location.state?.from?.pathname || "/orders";
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const { mutateAsync, isPending } = useSignInWithEmailPass();
  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    await mutateAsync(
      {
        email,
        password
      },
      {
        onError: (error) => {
          if (isFetchError(error)) {
            if (error.status === 401) {
              form.setError("email", {
                type: "manual",
                message: error.message
              });
              return;
            }
          }
          form.setError("root.serverError", {
            type: "manual",
            message: error.message
          });
        },
        onSuccess: () => {
          navigate(from, { replace: true });
        }
      }
    );
  });
  const serverError = form.formState.errors?.root?.serverError?.message;
  const validationError = form.formState.errors.email?.message || form.formState.errors.password?.message;
  return /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-subtle flex min-h-dvh w-dvw items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "m-4 flex w-full max-w-[280px] flex-col items-center", children: [
    /* @__PURE__ */ jsx(AvatarBox, {}),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(Heading, { children: t("login.title") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle text-center", children: t("login.hint") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-y-3", children: [
      getWidgets("login.before").map((Component, i) => {
        return /* @__PURE__ */ jsx(Component, {}, i);
      }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "flex w-full flex-col gap-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
              /* @__PURE__ */ jsx(
                Form.Field,
                {
                  control: form.control,
                  name: "email",
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsx(Form.Item, { children: /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        autoComplete: "email",
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
                  name: "password",
                  render: ({ field }) => {
                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                      /* @__PURE__ */ jsx(Form.Label, {}),
                      /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                        Input,
                        {
                          type: "password",
                          autoComplete: "current-password",
                          ...field,
                          className: "bg-ui-bg-field-component",
                          placeholder: t("fields.password")
                        }
                      ) })
                    ] });
                  }
                }
              )
            ] }),
            validationError && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Hint, { className: "inline-flex", variant: "error", children: validationError }) }),
            serverError && /* @__PURE__ */ jsx(
              Alert,
              {
                className: "bg-ui-bg-base items-center p-2",
                dismissible: true,
                variant: "error",
                children: serverError
              }
            ),
            /* @__PURE__ */ jsx(Button, { className: "w-full", type: "submit", isLoading: isPending, children: t("actions.continueWithEmail") })
          ]
        }
      ) }),
      getWidgets("login.after").map((Component, i) => {
        return /* @__PURE__ */ jsx(Component, {}, i);
      })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-ui-fg-muted txt-small my-6", children: /* @__PURE__ */ jsx(
      Trans,
      {
        i18nKey: "login.forgotPassword",
        components: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: "/reset-password",
              className: "text-ui-fg-interactive transition-fg hover:text-ui-fg-interactive-hover focus-visible:text-ui-fg-interactive-hover font-medium outline-none"
            },
            "reset-password-link"
          )
        ]
      }
    ) })
  ] }) });
};
export {
  Login as Component
};
