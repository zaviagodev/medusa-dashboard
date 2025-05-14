import {
  getCurrencySymbol
} from "./chunk-MWVM4TYO.mjs";
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
  useCampaign,
  useUpdateCampaign
} from "./chunk-G2H6MAK7.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/campaigns/campaign-budget-edit/campaign-budget-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/campaigns/campaign-budget-edit/components/edit-campaign-budget-form/edit-campaign-budget-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CurrencyInput, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditCampaignSchema = zod.object({
  limit: zod.number().min(0).optional().nullable()
});
var EditCampaignBudgetForm = ({
  campaign
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      limit: campaign?.budget?.limit || void 0
    },
    resolver: zodResolver(EditCampaignSchema)
  });
  const { mutateAsync, isPending } = useUpdateCampaign(campaign.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        budget: {
          limit: data.limit ? data.limit : null
        }
      },
      {
        onSuccess: ({ campaign: campaign2 }) => {
          toast.success(
            t("campaigns.edit.successToast", {
              name: campaign2.name
            })
          );
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "limit",
        render: ({ field: { onChange, value, ...field } }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { className: "basis-1/2", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: t("campaigns.budget.fields.limit") }),
            /* @__PURE__ */ jsx(Form.Control, { children: campaign.budget?.type === "spend" ? /* @__PURE__ */ jsx(
              CurrencyInput,
              {
                min: 0,
                onValueChange: (value2) => onChange(value2 ? parseInt(value2) : null),
                code: campaign.budget?.currency_code,
                symbol: campaign.budget?.currency_code ? getCurrencySymbol(
                  campaign.budget?.currency_code
                ) : "",
                ...field,
                value: value || void 0
              }
            ) : /* @__PURE__ */ jsx(
              Input,
              {
                min: 0,
                ...field,
                value,
                onChange: (e) => {
                  onChange(
                    e.target.value === "" ? null : parseInt(e.target.value)
                  );
                }
              },
              "usage"
            ) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ) }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          isLoading: isPending,
          type: "submit",
          variant: "primary",
          size: "small",
          children: t("actions.save")
        }
      )
    ] }) })
  ] }) });
};

// src/routes/campaigns/campaign-budget-edit/campaign-budget-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CampaignBudgetEdit = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { campaign, isLoading, isError, error } = useCampaign(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("campaigns.budget.edit.header") }) }) }),
    !isLoading && campaign && /* @__PURE__ */ jsx2(EditCampaignBudgetForm, { campaign })
  ] });
};
export {
  CampaignBudgetEdit as Component
};
