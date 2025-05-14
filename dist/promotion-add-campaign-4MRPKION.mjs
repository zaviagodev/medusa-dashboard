import {
  AddCampaignPromotionForm
} from "./chunk-AYAWUL3C.mjs";
import "./chunk-TDDYKNA2.mjs";
import "./chunk-MWVM4TYO.mjs";
import "./chunk-IUCDCPJU.mjs";
import "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer
} from "./chunk-4TC5YS65.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useCampaigns,
  usePromotion
} from "./chunk-G2H6MAK7.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/promotions/promotion-add-campaign/promotion-add-campaign.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PromotionAddCampaign = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { promotion, isPending, isError, error } = usePromotion(id);
  let campaignQuery = {};
  if (promotion?.application_method?.currency_code) {
    campaignQuery = {
      budget: {
        currency_code: promotion?.application_method?.currency_code
      }
    };
  }
  const {
    campaigns,
    isPending: areCampaignsLoading,
    isError: isCampaignError,
    error: campaignError
  } = useCampaigns(campaignQuery);
  if (isError || isCampaignError) {
    throw error || campaignError;
  }
  return /* @__PURE__ */ jsxs(RouteDrawer, { children: [
    /* @__PURE__ */ jsx(RouteDrawer.Header, { children: /* @__PURE__ */ jsx(Heading, { children: t("promotions.campaign.edit.header") }) }),
    !isPending && !areCampaignsLoading && promotion && campaigns && /* @__PURE__ */ jsx(AddCampaignPromotionForm, { promotion, campaigns })
  ] });
};
export {
  PromotionAddCampaign as Component
};
