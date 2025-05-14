import {
  RulesFormField
} from "./chunk-NGEWNLV7.mjs";
import "./chunk-YIZSVS2R.mjs";
import "./chunk-GZBFGV7Y.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  usePromotion,
  usePromotionAddRules,
  usePromotionRemoveRules,
  usePromotionUpdateRules,
  useUpdatePromotion
} from "./chunk-G2H6MAK7.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/promotions/common/edit-rules/edit-rules.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/promotions/common/edit-rules/components/edit-rules-form/edit-rules-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@medusajs/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// src/routes/promotions/common/edit-rules/components/edit-rules-form/form-schema.ts
import i18n from "i18next";
import { z } from "zod";
var EditRules = z.object({
  type: z.string().optional(),
  rules: z.array(
    z.object({
      id: z.string().optional(),
      attribute: z.string().min(1, { message: i18n.t("promotions.form.required") }),
      operator: z.string().min(1, { message: i18n.t("promotions.form.required") }),
      values: z.union([
        z.number().min(1, { message: i18n.t("promotions.form.required") }),
        z.string().min(1, { message: i18n.t("promotions.form.required") }),
        z.array(z.string()).min(1, { message: i18n.t("promotions.form.required") })
      ]),
      required: z.boolean().optional(),
      disguised: z.boolean().optional(),
      field_type: z.string().optional()
    })
  )
});

// src/routes/promotions/common/edit-rules/components/edit-rules-form/edit-rules-form.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EditRulesForm = ({
  promotion,
  ruleType,
  handleSubmit,
  isSubmitting
}) => {
  const { t } = useTranslation();
  const [rulesToRemove, setRulesToRemove] = useState([]);
  const form = useForm({
    defaultValues: { rules: [], type: promotion.type },
    resolver: zodResolver(EditRules)
  });
  const handleFormSubmit = form.handleSubmit(handleSubmit(rulesToRemove));
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleFormSubmit,
      className: "flex h-full flex-col",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx(
          RulesFormField,
          {
            form,
            ruleType,
            setRulesToRemove,
            rulesToRemove,
            promotion
          }
        ) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", disabled: isSubmitting, children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isSubmitting, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/promotions/common/edit-rules/components/edit-rules-wrapper/utils.ts
var getRuleValue = (rule) => {
  if (rule.field_type === "number") {
    return parseInt(rule.values);
  }
  return rule.values;
};

// src/routes/promotions/common/edit-rules/components/edit-rules-wrapper/edit-rules-wrapper.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var EditRulesWrapper = ({
  promotion,
  rules,
  ruleType
}) => {
  const { handleSuccess } = useRouteModal();
  const { mutateAsync: updatePromotion } = useUpdatePromotion(promotion.id);
  const { mutateAsync: addPromotionRules } = usePromotionAddRules(
    promotion.id,
    ruleType
  );
  const { mutateAsync: removePromotionRules } = usePromotionRemoveRules(
    promotion.id,
    ruleType
  );
  const { mutateAsync: updatePromotionRules, isPending } = usePromotionUpdateRules(promotion.id, ruleType);
  const handleSubmit = (rulesToRemove) => {
    return async function(data) {
      const applicationMethodData = {};
      const { rules: allRules = [] } = data;
      const disguisedRules = allRules.filter((rule) => rule.disguised);
      const disguisedRulesToRemove = rulesToRemove?.filter((r) => r.disguised) || [];
      for (const rule of disguisedRules) {
        applicationMethodData[rule.attribute] = getRuleValue(rule);
      }
      for (const rule of disguisedRulesToRemove) {
        applicationMethodData[rule.attribute] = null;
      }
      const rulesData = allRules.filter((rule) => !rule.disguised);
      const rulesToCreate = rulesData.filter(
        (rule) => !("id" in rule)
      );
      const rulesToUpdate = rulesData.filter(
        (rule) => typeof rule.id === "string"
      );
      if (Object.keys(applicationMethodData).length) {
        await updatePromotion({
          application_method: applicationMethodData
        });
      }
      rulesToCreate.length && await addPromotionRules({
        rules: rulesToCreate.map((rule) => {
          return {
            attribute: rule.attribute,
            operator: rule.operator,
            values: rule.values
          };
        })
      });
      rulesToRemove?.length && await removePromotionRules({
        rule_ids: rulesToRemove.map((r) => r.id).filter(Boolean)
      });
      rulesToUpdate.length && await updatePromotionRules({
        rules: rulesToUpdate.map((rule) => {
          return {
            id: rule.id,
            attribute: rule.attribute,
            operator: rule.operator,
            values: rule.values
          };
        })
      });
      handleSuccess();
    };
  };
  return /* @__PURE__ */ jsx2(
    EditRulesForm,
    {
      promotion,
      rules,
      ruleType,
      handleSubmit,
      isSubmitting: isPending
    }
  );
};

// src/routes/promotions/common/edit-rules/edit-rules.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var EditRules2 = () => {
  const params = useParams();
  const allowedParams = [
    "rules" /* RULES */,
    "buy-rules" /* BUY_RULES */,
    "target-rules" /* TARGET_RULES */
  ];
  if (!allowedParams.includes(params.ruleType)) {
    throw "invalid page";
  }
  const { t } = useTranslation2();
  const ruleType = params.ruleType;
  const id = params.id;
  const rules = [];
  const { promotion, isPending: isLoading, isError, error } = usePromotion(id);
  if (promotion) {
    if (ruleType === "rules" /* RULES */) {
      rules.push(...promotion.rules || []);
    } else if (ruleType === "target-rules" /* TARGET_RULES */) {
      rules.push(...promotion?.application_method?.target_rules || []);
    } else if (ruleType === "buy-rules" /* BUY_RULES */) {
      rules.push(...promotion.application_method?.buy_rules || []);
    }
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx3(RouteDrawer.Header, { children: /* @__PURE__ */ jsx3(Heading, { children: t(`promotions.edit.${ruleType}.title`) }) }),
    !isLoading && promotion && /* @__PURE__ */ jsx3(
      EditRulesWrapper,
      {
        promotion,
        rules,
        ruleType
      }
    )
  ] });
};
export {
  EditRules2 as Component
};
