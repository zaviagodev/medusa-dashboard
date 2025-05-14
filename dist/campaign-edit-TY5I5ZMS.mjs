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
  useCampaign,
  useUpdateCampaign
} from "./chunk-G2H6MAK7.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/campaigns/campaign-edit/campaign-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/campaigns/campaign-edit/components/edit-campaign-form/edit-campaign-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditCampaignSchema = zod.object({
  name: zod.string(),
  description: zod.string().optional(),
  campaign_identifier: zod.string().optional(),
  starts_at: zod.date().optional(),
  ends_at: zod.date().optional()
});
var EditCampaignForm = ({ campaign }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: campaign.name || "",
      description: campaign.description || "",
      campaign_identifier: campaign.campaign_identifier || "",
      starts_at: campaign.starts_at ? new Date(campaign.starts_at) : void 0,
      ends_at: campaign.ends_at ? new Date(campaign.ends_at) : void 0
    },
    resolver: zodResolver(EditCampaignSchema)
  });
  const { mutateAsync, isPending } = useUpdateCampaign(campaign.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        name: data.name,
        description: data.description,
        campaign_identifier: data.campaign_identifier,
        starts_at: data.starts_at,
        ends_at: data.ends_at
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
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "description",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.description") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "campaign_identifier",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("campaigns.fields.identifier") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
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

// src/routes/campaigns/campaign-edit/campaign-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CampaignEdit = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { campaign, isLoading, isError, error } = useCampaign(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("campaigns.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { asChild: true, children: /* @__PURE__ */ jsx2(VisuallyHidden, { children: t("campaigns.edit.description") }) })
    ] }),
    !isLoading && campaign && /* @__PURE__ */ jsx2(EditCampaignForm, { campaign })
  ] });
};
export {
  CampaignEdit as Component
};
