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

// src/routes/campaigns/campaign-configuration/campaign-configuration.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/campaigns/campaign-configuration/components/campaign-configuration-form/campaign-configuration-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CampaignConfigurationSchema = z.object({
  starts_at: z.date().nullable(),
  ends_at: z.date().nullable()
});
var CampaignConfigurationForm = ({
  campaign
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      starts_at: campaign.starts_at ? new Date(campaign.starts_at) : void 0,
      ends_at: campaign.ends_at ? new Date(campaign.ends_at) : void 0
    },
    resolver: zodResolver(CampaignConfigurationSchema)
  });
  const { mutateAsync, isPending } = useUpdateCampaign(campaign.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        starts_at: data.starts_at || null,
        ends_at: data.ends_at || null
      },
      {
        onSuccess: ({ campaign: campaign2 }) => {
          toast.success(
            t("campaigns.configuration.edit.successToast", {
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
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "starts_at",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("campaigns.fields.start_date") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                DatePicker,
                {
                  granularity: "minute",
                  hourCycle: 12,
                  shouldCloseOnSelect: false,
                  ...field
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
          name: "ends_at",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("campaigns.fields.end_date") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                DatePicker,
                {
                  granularity: "minute",
                  shouldCloseOnSelect: false,
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }) }),
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

// src/routes/campaigns/campaign-configuration/campaign-configuration.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CampaignConfiguration = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { campaign, isLoading, isError, error } = useCampaign(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("campaigns.configuration.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("campaigns.configuration.edit.description") })
    ] }),
    !isLoading && campaign && /* @__PURE__ */ jsx2(CampaignConfigurationForm, { campaign })
  ] });
};
export {
  CampaignConfiguration as Component
};
