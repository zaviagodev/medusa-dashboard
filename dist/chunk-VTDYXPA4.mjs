import {
  ITEM_TOTAL_ATTRIBUTE
} from "./chunk-PYIO3TDQ.mjs";
import {
  getLocaleAmount
} from "./chunk-PDWBYQOW.mjs";
import {
  DataGrid,
  DataGridCellContainer,
  IncludesTaxTooltip,
  createDataGridHelper,
  useCombinedRefs,
  useDataGridCell,
  useDataGridCellError
} from "./chunk-53RYGJCD.mjs";
import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
import {
  castNumber
} from "./chunk-6GU6IDUA.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  StackedFocusModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";

// src/routes/locations/common/utils/price-rule-helpers.ts
var createPriceRule = (attribute, operator, value) => {
  const rule = {
    attribute,
    operator,
    value: castNumber(value)
  };
  return rule;
};
var buildShippingOptionPriceRules = (rule) => {
  const conditions = [
    { value: rule.gte, operator: "gte" },
    { value: rule.lte, operator: "lte" },
    { value: rule.gt, operator: "gt" },
    { value: rule.lt, operator: "lt" },
    { value: rule.eq, operator: "eq" }
  ];
  const conditionsWithValues = conditions.filter(({ value }) => value);
  return conditionsWithValues.map(
    ({ operator, value }) => createPriceRule(ITEM_TOTAL_ATTRIBUTE, operator, value)
  );
};

// src/routes/locations/common/schema.ts
import { t } from "i18next";
import { z } from "zod";
var ConditionalPriceSchema = z.object({
  amount: z.union([z.string(), z.number()]),
  gte: z.union([z.string(), z.number()]).nullish(),
  lte: z.union([z.string(), z.number()]).nullish(),
  lt: z.number().nullish(),
  gt: z.number().nullish(),
  eq: z.number().nullish()
}).refine((data) => data.amount !== "", {
  message: t(
    "stockLocations.shippingOptions.conditionalPrices.errors.amountRequired"
  ),
  path: ["amount"]
}).refine(
  (data) => {
    const hasEqLtGt = data.eq !== void 0 || data.lt !== void 0 || data.gt !== void 0;
    if (hasEqLtGt) {
      return true;
    }
    return data.gte !== void 0 && data.gte !== "" || data.lte !== void 0 && data.lte !== "";
  },
  {
    message: t(
      "stockLocations.shippingOptions.conditionalPrices.errors.minOrMaxRequired"
    ),
    path: ["gte"]
  }
).refine(
  (data) => {
    if (data.gte != null && data.gte !== "" && data.lte != null && data.lte !== "") {
      const gte = castNumber(data.gte);
      const lte = castNumber(data.lte);
      return gte <= lte;
    }
    return true;
  },
  {
    message: t(
      "stockLocations.shippingOptions.conditionalPrices.errors.minGreaterThanMax"
    ),
    path: ["gte"]
  }
);
var UpdateConditionalPriceSchema = ConditionalPriceSchema.and(
  z.object({
    id: z.string().optional()
  })
);
function refineDuplicates(data, ctx) {
  const prices = data.prices;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const price1 = prices[i];
      const price2 = prices[j];
      if (price1.amount === "" || price2.amount === "") {
        continue;
      }
      const price1Amount = castNumber(price1.amount);
      const price2Amount = castNumber(price2.amount);
      if (price1Amount === price2Amount) {
        addDuplicateAmountError(ctx, j);
      }
      const conditions = [
        { value: price1.gte, type: "gte" },
        { value: price1.lte, type: "lte" },
        { value: price1.eq, type: "eq" },
        { value: price1.lt, type: "lt" },
        { value: price1.gt, type: "gt" }
      ];
      conditions.forEach((condition1) => {
        if (!condition1.value && condition1.value !== 0) {
          return;
        }
        const conditions2 = [
          { value: price2.gte, type: "gte" },
          { value: price2.lte, type: "lte" },
          { value: price2.eq, type: "eq" },
          { value: price2.lt, type: "lt" },
          { value: price2.gt, type: "gt" }
        ];
        conditions2.forEach((condition2) => {
          if (!condition2.value && condition2.value !== 0) {
            return;
          }
          const condition1Value = castNumber(
            condition1.value
          );
          const condition2Value = castNumber(
            condition2.value
          );
          if (condition1Value === condition2Value) {
            addOverlappingConditionError(ctx, j, condition2.type);
          }
        });
      });
    }
  }
}
var CondtionalPriceRuleSchema = z.object({
  prices: z.array(ConditionalPriceSchema)
}).superRefine(refineDuplicates);
var UpdateConditionalPriceRuleSchema = z.object({
  prices: z.array(UpdateConditionalPriceSchema)
}).superRefine(refineDuplicates);
var addDuplicateAmountError = (ctx, index) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: t(
      "stockLocations.shippingOptions.conditionalPrices.errors.duplicateAmount"
    ),
    path: ["prices", index, "amount"]
  });
};
var addOverlappingConditionError = (ctx, index, type) => {
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: t(
      "stockLocations.shippingOptions.conditionalPrices.errors.overlappingConditions"
    ),
    path: ["prices", index, type]
  });
};

// src/routes/locations/common/components/shipping-option-price-provider/shipping-option-price-context.tsx
import { createContext } from "react";
var ShippingOptionPriceContext = createContext(null);

// src/routes/locations/common/components/shipping-option-price-provider/shipping-option-price-provider.tsx
import { jsx } from "react/jsx-runtime";
var ShippingOptionPriceProvider = ({
  children,
  onOpenConditionalPricesModal,
  onCloseConditionalPricesModal
}) => {
  return /* @__PURE__ */ jsx(
    ShippingOptionPriceContext.Provider,
    {
      value: { onOpenConditionalPricesModal, onCloseConditionalPricesModal },
      children
    }
  );
};

// src/routes/locations/common/components/shipping-option-price-provider/use-shipping-option-price.tsx
import { useContext } from "react";
var useShippingOptionPrice = () => {
  const context = useContext(ShippingOptionPriceContext);
  if (!context) {
    throw new Error(
      "useShippingOptionPrice must be used within a ShippingOptionPriceProvider"
    );
  }
  return context;
};

// src/routes/locations/common/components/conditional-price-form/conditional-price-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InformationCircleSolid,
  Plus,
  TriangleDownMini,
  XMark,
  XMarkMini
} from "@medusajs/icons";
import {
  Badge,
  Button,
  clx,
  CurrencyInput,
  Divider,
  Heading,
  IconButton,
  Label,
  Text,
  Tooltip
} from "@medusajs/ui";
import { Accordion as RadixAccordion } from "radix-ui";
import { Fragment, useRef, useState } from "react";
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch
} from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { formatValue } from "react-currency-input-field";

// src/routes/locations/common/utils/get-custom-shipping-option-price-field-info.ts
var getCustomShippingOptionPriceFieldName = (field, type) => {
  const prefix = type === "region" ? "region_prices" : "currency_prices";
  const customPrefix = type === "region" ? "conditional_region_prices" : "conditional_currency_prices";
  const name = field.replace(
    prefix,
    customPrefix
  );
  return name;
};

// src/routes/locations/common/components/conditional-price-form/conditional-price-form.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var RULE_ITEM_PREFIX = "rule-item";
var getRuleValue = (index) => `${RULE_ITEM_PREFIX}-${index}`;
var ConditionalPriceForm = ({
  info,
  variant
}) => {
  const { t: t2 } = useTranslation();
  const { getValues, setValue: setFormValue } = useFormContext();
  const { onCloseConditionalPricesModal } = useShippingOptionPrice();
  const [value, setValue] = useState([getRuleValue(0)]);
  const { field, type, currency, name: header } = info;
  const name = getCustomShippingOptionPriceFieldName(field, type);
  const conditionalPriceForm = useForm({
    defaultValues: {
      prices: getValues(name) || [
        {
          amount: "",
          gte: "",
          lte: null
        }
      ]
    },
    resolver: zodResolver(
      variant === "create" ? CondtionalPriceRuleSchema : UpdateConditionalPriceRuleSchema
    )
  });
  const { fields, append, remove } = useFieldArray({
    control: conditionalPriceForm.control,
    name: "prices"
  });
  const handleAdd = () => {
    append({
      amount: "",
      gte: "",
      lte: null
    });
    setValue([...value, getRuleValue(fields.length)]);
  };
  const handleRemove = (index) => {
    remove(index);
  };
  const handleOnSubmit = conditionalPriceForm.handleSubmit(
    (values) => {
      setFormValue(name, values.prices, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true
      });
      onCloseConditionalPricesModal();
    },
    (e) => {
      const indexesWithErrors = Object.keys(e.prices || {});
      setValue((prev) => {
        const values = new Set(prev);
        indexesWithErrors.forEach((index) => {
          values.add(getRuleValue(Number(index)));
        });
        return Array.from(values);
      });
    }
  );
  const handleOnKeyDown = (event) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      console.log("Fired");
      event.preventDefault();
      event.stopPropagation();
      handleOnSubmit();
    }
  };
  return /* @__PURE__ */ jsx2(Form, { ...conditionalPriceForm, children: /* @__PURE__ */ jsx2(
    KeyboundForm,
    {
      onSubmit: handleOnSubmit,
      onKeyDown: handleOnKeyDown,
      className: "flex h-full flex-col",
      children: /* @__PURE__ */ jsxs(StackedFocusModal.Content, { children: [
        /* @__PURE__ */ jsx2(StackedFocusModal.Header, {}),
        /* @__PURE__ */ jsx2(StackedFocusModal.Body, { className: "size-full overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: "flex size-full flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsx2("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-6 py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx2(StackedFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t2(
              "stockLocations.shippingOptions.conditionalPrices.header",
              {
                name: header
              }
            ) }) }),
            /* @__PURE__ */ jsx2(StackedFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-subtle", children: t2(
              "stockLocations.shippingOptions.conditionalPrices.description"
            ) }) })
          ] }),
          /* @__PURE__ */ jsx2(ConditionalPriceList, { value, onValueChange: setValue, children: fields.map((field2, index) => /* @__PURE__ */ jsx2(
            ConditionalPriceItem,
            {
              index,
              onRemove: handleRemove,
              currency,
              control: conditionalPriceForm.control
            },
            field2.id
          )) }),
          /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx2(
            Button,
            {
              variant: "secondary",
              size: "small",
              type: "button",
              onClick: handleAdd,
              children: t2(
                "stockLocations.shippingOptions.conditionalPrices.actions.addPrice"
              )
            }
          ) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx2(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx2(StackedFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", type: "button", children: t2("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(Button, { size: "small", type: "button", onClick: handleOnSubmit, children: t2("actions.save") })
        ] }) })
      ] })
    }
  ) });
};
var ConditionalPriceList = ({
  children,
  value,
  onValueChange
}) => {
  return /* @__PURE__ */ jsx2(
    RadixAccordion.Root,
    {
      type: "multiple",
      defaultValue: [getRuleValue(0)],
      value,
      onValueChange,
      className: "flex flex-col gap-y-3",
      children
    }
  );
};
var ConditionalPriceItem = ({
  index,
  currency,
  onRemove,
  control
}) => {
  const { t: t2 } = useTranslation();
  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(index);
  };
  return /* @__PURE__ */ jsxs(
    RadixAccordion.Item,
    {
      value: getRuleValue(index),
      className: clx(
        "bg-ui-bg-component shadow-elevation-card-rest rounded-lg"
      ),
      children: [
        /* @__PURE__ */ jsx2(RadixAccordion.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs("div", { className: "group/trigger flex w-full cursor-pointer items-start justify-between gap-x-2 p-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx2("div", { className: "flex h-7 items-center", children: /* @__PURE__ */ jsx2(
              AmountDisplay,
              {
                index,
                currency,
                control
              }
            ) }),
            /* @__PURE__ */ jsx2("div", { className: "flex min-h-7 items-center", children: /* @__PURE__ */ jsx2(
              ConditionDisplay,
              {
                index,
                currency,
                control
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
            /* @__PURE__ */ jsx2(
              IconButton,
              {
                size: "small",
                variant: "transparent",
                className: "text-ui-fg-muted hover:text-ui-fg-subtle focus-visible:text-ui-fg-subtle",
                onClick: handleRemove,
                children: /* @__PURE__ */ jsx2(XMarkMini, {})
              }
            ),
            /* @__PURE__ */ jsx2(
              IconButton,
              {
                size: "small",
                variant: "transparent",
                className: "text-ui-fg-muted hover:text-ui-fg-subtle focus-visible:text-ui-fg-subtle",
                children: /* @__PURE__ */ jsx2(TriangleDownMini, { className: "transition-transform group-data-[state=open]/trigger:rotate-180" })
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(RadixAccordion.Content, { className: "text-ui-fg-subtle", children: [
          /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
          /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control,
              name: `prices.${index}.amount`,
              render: ({ field: { value, onChange, ...props } }) => {
                return /* @__PURE__ */ jsx2(Form.Item, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-start gap-x-2 p-3", children: [
                  /* @__PURE__ */ jsx2("div", { className: "flex h-8 items-center", children: /* @__PURE__ */ jsx2(Form.Label, { children: t2(
                    "stockLocations.shippingOptions.conditionalPrices.rules.amount"
                  ) }) }),
                  /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                      CurrencyInput,
                      {
                        className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover focus-visible:bg-ui-bg-field-component-hover",
                        placeholder: formatValue({
                          value: "0",
                          decimalScale: currency.decimal_digits
                        }),
                        decimalScale: currency.decimal_digits,
                        symbol: currency.symbol_native,
                        code: currency.code,
                        value,
                        onValueChange: (_value, _name, values) => onChange(values?.value ? values?.value : ""),
                        autoFocus: true,
                        ...props
                      }
                    ) }),
                    /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                  ] })
                ] }) });
              }
            }
          ),
          /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
          /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control,
              name: `prices.${index}.gte`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsx2(
                  OperatorInput,
                  {
                    field,
                    label: t2(
                      "stockLocations.shippingOptions.conditionalPrices.rules.gte"
                    ),
                    currency,
                    placeholder: "1000"
                  }
                );
              }
            }
          ),
          /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
          /* @__PURE__ */ jsx2(
            Form.Field,
            {
              control,
              name: `prices.${index}.lte`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsx2(
                  OperatorInput,
                  {
                    field,
                    label: t2(
                      "stockLocations.shippingOptions.conditionalPrices.rules.lte"
                    ),
                    currency,
                    placeholder: "1000"
                  }
                );
              }
            }
          ),
          /* @__PURE__ */ jsx2(
            ReadOnlyConditions,
            {
              index,
              control,
              currency
            }
          )
        ] })
      ]
    }
  );
};
var OperatorInput = ({
  field,
  label,
  currency,
  placeholder
}) => {
  const innerRef = useRef(null);
  const { value, onChange, ref, ...props } = field;
  const refs = useCombinedRefs(innerRef, ref);
  const action = () => {
    if (value === null) {
      onChange("");
      requestAnimationFrame(() => {
        innerRef.current?.focus();
      });
      return;
    }
    onChange(null);
  };
  const isNull = value === null;
  return /* @__PURE__ */ jsx2(Form.Item, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-start gap-x-2 p-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex h-8 items-center gap-x-1", children: [
      /* @__PURE__ */ jsx2(IconButton, { size: "2xsmall", variant: "transparent", onClick: action, children: isNull ? /* @__PURE__ */ jsx2(Plus, {}) : /* @__PURE__ */ jsx2(XMark, {}) }),
      /* @__PURE__ */ jsx2(Form.Label, { children: label })
    ] }),
    !isNull && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1", children: [
      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
        CurrencyInput,
        {
          className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover focus-visible:bg-ui-bg-field-component-hover",
          placeholder: formatValue({
            value: placeholder,
            decimalScale: currency.decimal_digits
          }),
          decimalScale: currency.decimal_digits,
          symbol: currency.symbol_native,
          code: currency.code,
          value,
          ref: refs,
          onValueChange: (_value, _name, values) => onChange(values?.value ? values?.value : ""),
          ...props
        }
      ) }),
      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
    ] })
  ] }) });
};
var ReadOnlyConditions = ({
  index,
  control,
  currency
}) => {
  const { t: t2 } = useTranslation();
  const item = useWatch({
    control,
    name: `prices.${index}`
  });
  if (item.eq == null && item.gt == null && item.lt == null) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1 px-3 pt-3", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t2(
        "stockLocations.shippingOptions.conditionalPrices.customRules.label"
      ) }),
      /* @__PURE__ */ jsx2(
        Tooltip,
        {
          content: t2(
            "stockLocations.shippingOptions.conditionalPrices.customRules.tooltip"
          ),
          children: /* @__PURE__ */ jsx2(InformationCircleSolid, { className: "text-ui-fg-muted" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      item.eq != null && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-start gap-x-2 p-3", children: [
        /* @__PURE__ */ jsx2("div", { className: "flex h-8 items-center", children: /* @__PURE__ */ jsx2(Label, { weight: "plus", size: "small", children: t2(
          "stockLocations.shippingOptions.conditionalPrices.customRules.eq"
        ) }) }),
        /* @__PURE__ */ jsx2(
          CurrencyInput,
          {
            className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover focus-visible:bg-ui-bg-field-component-hover",
            symbol: currency.symbol_native,
            code: currency.code,
            value: item.eq,
            disabled: true
          }
        )
      ] }),
      item.gt != null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-start gap-x-2 p-3", children: [
          /* @__PURE__ */ jsx2("div", { className: "flex h-8 items-center", children: /* @__PURE__ */ jsx2(Label, { weight: "plus", size: "small", children: t2(
            "stockLocations.shippingOptions.conditionalPrices.customRules.gt"
          ) }) }),
          /* @__PURE__ */ jsx2(
            CurrencyInput,
            {
              className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover focus-visible:bg-ui-bg-field-component-hover",
              symbol: currency.symbol_native,
              code: currency.code,
              value: item.gt,
              disabled: true
            }
          )
        ] })
      ] }),
      item.lt != null && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-start gap-x-2 p-3", children: [
          /* @__PURE__ */ jsx2("div", { className: "flex h-8 items-center", children: /* @__PURE__ */ jsx2(Label, { weight: "plus", size: "small", children: t2(
            "stockLocations.shippingOptions.conditionalPrices.customRules.lt"
          ) }) }),
          /* @__PURE__ */ jsx2(
            CurrencyInput,
            {
              className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover focus-visible:bg-ui-bg-field-component-hover",
              symbol: currency.symbol_native,
              code: currency.code,
              value: item.lt,
              disabled: true
            }
          )
        ] })
      ] })
    ] })
  ] });
};
var AmountDisplay = ({
  index,
  currency,
  control
}) => {
  const amount = useWatch({
    control,
    name: `prices.${index}.amount`
  });
  if (amount === "" || amount === void 0) {
    return /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", children: "-" });
  }
  const castAmount = castNumber(amount);
  return /* @__PURE__ */ jsx2(Text, { size: "small", weight: "plus", children: getLocaleAmount(castAmount, currency.code) });
};
var ConditionContainer = ({ children }) => /* @__PURE__ */ jsx2("div", { className: "text-ui-fg-subtle txt-small flex flex-wrap items-center gap-1.5", children });
var ConditionDisplay = ({
  index,
  currency,
  control
}) => {
  const { t: t2, i18n } = useTranslation();
  const gte = useWatch({
    control,
    name: `prices.${index}.gte`
  });
  const lte = useWatch({
    control,
    name: `prices.${index}.lte`
  });
  const renderCondition = () => {
    const castGte = gte ? castNumber(gte) : void 0;
    const castLte = lte ? castNumber(lte) : void 0;
    if (!castGte && !castLte) {
      return null;
    }
    if (castGte && !castLte) {
      return /* @__PURE__ */ jsx2(ConditionContainer, { children: /* @__PURE__ */ jsx2(
        Trans,
        {
          i18n,
          i18nKey: "stockLocations.shippingOptions.conditionalPrices.summaries.greaterThan",
          components: [
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "attribute"),
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "gte")
          ],
          values: {
            attribute: t2(
              "stockLocations.shippingOptions.conditionalPrices.attributes.cartItemTotal"
            ),
            gte: getLocaleAmount(castGte, currency.code)
          }
        }
      ) });
    }
    if (!castGte && castLte) {
      return /* @__PURE__ */ jsx2(ConditionContainer, { children: /* @__PURE__ */ jsx2(
        Trans,
        {
          i18n,
          i18nKey: "stockLocations.shippingOptions.conditionalPrices.summaries.lessThan",
          components: [
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "attribute"),
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "lte")
          ],
          values: {
            attribute: t2(
              "stockLocations.shippingOptions.conditionalPrices.attributes.cartItemTotal"
            ),
            lte: getLocaleAmount(castLte, currency.code)
          }
        }
      ) });
    }
    if (castGte && castLte) {
      return /* @__PURE__ */ jsx2(ConditionContainer, { children: /* @__PURE__ */ jsx2(
        Trans,
        {
          i18n,
          i18nKey: "stockLocations.shippingOptions.conditionalPrices.summaries.range",
          components: [
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "attribute"),
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "gte"),
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall" }, "lte")
          ],
          values: {
            attribute: t2(
              "stockLocations.shippingOptions.conditionalPrices.attributes.cartItemTotal"
            ),
            gte: getLocaleAmount(castGte, currency.code),
            lte: getLocaleAmount(castLte, currency.code)
          }
        }
      ) });
    }
    return null;
  };
  return renderCondition();
};

// src/routes/locations/common/hooks/use-shipping-option-price-columns.tsx
import { useMemo } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/locations/common/components/shipping-option-price-cell/shipping-option-price-cell.tsx
import { ArrowsPointingOut, CircleSliders } from "@medusajs/icons";
import { clx as clx2 } from "@medusajs/ui";
import { useCallback, useEffect, useRef as useRef2, useState as useState2 } from "react";
import CurrencyInput2, {
  formatValue as formatValue2
} from "react-currency-input-field";
import {
  Controller,
  useWatch as useWatch2
} from "react-hook-form";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ShippingOptionPriceCell = ({
  context,
  code,
  header,
  type
}) => {
  const [symbolWidth, setSymbolWidth] = useState2(0);
  const measuredRef = useCallback((node) => {
    if (node) {
      const width = node.offsetWidth;
      setSymbolWidth(width);
    }
  }, []);
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  const { isAnchor } = container;
  const currency = currencies[code.toUpperCase()];
  return /* @__PURE__ */ jsx3(
    Controller,
    {
      control,
      name: field,
      render: ({ field: props }) => {
        return /* @__PURE__ */ jsx3(
          DataGridCellContainer,
          {
            ...container,
            ...errorProps,
            outerComponent: /* @__PURE__ */ jsx3(
              OuterComponent,
              {
                header,
                isAnchor,
                field,
                control,
                symbolWidth,
                type,
                currency
              }
            ),
            children: /* @__PURE__ */ jsx3(
              Inner,
              {
                field: props,
                inputProps: input,
                currencyInfo: currency,
                onMeasureSymbol: measuredRef
              }
            )
          }
        );
      }
    }
  );
};
var OuterComponent = ({
  isAnchor,
  header,
  field,
  control,
  symbolWidth,
  type,
  currency
}) => {
  const { onOpenConditionalPricesModal } = useShippingOptionPrice();
  const buttonRef = useRef2(null);
  const name = getCustomShippingOptionPriceFieldName(field, type);
  const price = useWatch2({ control, name });
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnchor && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAnchor]);
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "absolute inset-y-0 z-[3] flex w-fit items-center justify-center",
      style: {
        left: symbolWidth ? `${symbolWidth + 16 + 4}px` : void 0
      },
      children: [
        price?.length > 0 && !isAnchor && /* @__PURE__ */ jsx3("div", { className: "flex size-[15px] items-center justify-center group-hover/container:hidden", children: /* @__PURE__ */ jsx3(CircleSliders, { className: "text-ui-fg-interactive" }) }),
        /* @__PURE__ */ jsx3(
          "button",
          {
            ref: buttonRef,
            type: "button",
            className: clx2(
              "hover:text-ui-fg-subtle text-ui-fg-muted transition-fg hidden size-[15px] items-center justify-center rounded-md bg-transparent group-hover/container:flex",
              { flex: isAnchor }
            ),
            onClick: () => onOpenConditionalPricesModal({
              type,
              field,
              currency,
              name: header
            }),
            children: /* @__PURE__ */ jsx3(ArrowsPointingOut, {})
          }
        )
      ]
    }
  );
};
var Inner = ({
  field,
  onMeasureSymbol,
  inputProps,
  currencyInfo
}) => {
  const { value, onChange: _, onBlur, ref, ...rest } = field;
  const {
    ref: inputRef,
    onBlur: onInputBlur,
    onFocus,
    onChange,
    ...attributes
  } = inputProps;
  const formatter = useCallback(
    (value2) => {
      const ensuredValue = typeof value2 === "number" ? value2.toString() : value2 || "";
      return formatValue2({
        value: ensuredValue,
        decimalScale: currencyInfo.decimal_digits,
        disableGroupSeparators: true,
        decimalSeparator: "."
      });
    },
    [currencyInfo]
  );
  const [localValue, setLocalValue] = useState2(value || "");
  const handleValueChange = (value2, _name, _values) => {
    if (!value2) {
      setLocalValue("");
      return;
    }
    setLocalValue(value2);
  };
  useEffect(() => {
    let update = value;
    if (!isNaN(Number(value))) {
      update = formatter(update);
    }
    setLocalValue(update);
  }, [value, formatter]);
  const combinedRed = useCombinedRefs(inputRef, ref);
  return /* @__PURE__ */ jsxs2("div", { className: "relative flex size-full items-center", children: [
    /* @__PURE__ */ jsx3(
      "span",
      {
        className: "txt-compact-small text-ui-fg-muted pointer-events-none absolute left-0 w-fit min-w-4",
        "aria-hidden": true,
        ref: onMeasureSymbol,
        children: currencyInfo.symbol_native
      }
    ),
    /* @__PURE__ */ jsx3(
      CurrencyInput2,
      {
        ...rest,
        ...attributes,
        ref: combinedRed,
        className: "txt-compact-small w-full flex-1 cursor-default appearance-none bg-transparent pl-[60px] text-right outline-none",
        value: localValue || void 0,
        onValueChange: handleValueChange,
        formatValueOnBlur: true,
        onBlur: () => {
          onBlur();
          onInputBlur();
          onChange(localValue, value);
        },
        onFocus,
        decimalScale: currencyInfo.decimal_digits,
        decimalsLimit: currencyInfo.decimal_digits,
        autoComplete: "off",
        tabIndex: -1
      }
    )
  ] });
};

// src/routes/locations/common/hooks/use-shipping-option-price-columns.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var columnHelper = createDataGridHelper();
var useShippingOptionPriceColumns = ({
  name,
  currencies: currencies2 = [],
  regions = [],
  pricePreferences = []
}) => {
  const { t: t2 } = useTranslation2();
  return useMemo(() => {
    return [
      columnHelper.column({
        id: "name",
        name: t2("fields.name"),
        disableHiding: true,
        header: t2("fields.name"),
        cell: (context) => {
          return /* @__PURE__ */ jsx4(DataGrid.ReadonlyCell, { context, children: name });
        }
      }),
      ...createDataGridPriceColumns({
        currencies: currencies2,
        regions,
        pricePreferences,
        getFieldName: (context, value) => {
          if (context.column.id?.startsWith("currency_prices")) {
            return `currency_prices.${value}`;
          }
          return `region_prices.${value}`;
        },
        t: t2
      })
    ];
  }, [t2, currencies2, regions, pricePreferences, name]);
};
var createDataGridPriceColumns = ({
  currencies: currencies2,
  regions,
  pricePreferences,
  getFieldName,
  t: t2
}) => {
  const columnHelper2 = createDataGridHelper();
  return [
    ...currencies2?.map((currency) => {
      const preference = pricePreferences?.find(
        (p) => p.attribute === "currency_code" && p.value === currency
      );
      const translatedCurrencyName = t2("fields.priceTemplate", {
        regionOrCurrency: currency.toUpperCase()
      });
      return columnHelper2.column({
        id: `currency_prices.${currency}`,
        name: t2("fields.priceTemplate", {
          regionOrCurrency: currency.toUpperCase()
        }),
        field: (context) => {
          return getFieldName(context, currency);
        },
        type: "number",
        header: () => /* @__PURE__ */ jsxs3("div", { className: "flex w-full items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx4("span", { className: "truncate", title: translatedCurrencyName, children: translatedCurrencyName }),
          /* @__PURE__ */ jsx4(IncludesTaxTooltip, { includesTax: preference?.is_tax_inclusive })
        ] }),
        cell: (context) => {
          return /* @__PURE__ */ jsx4(
            ShippingOptionPriceCell,
            {
              type: "currency",
              header: translatedCurrencyName,
              code: currency,
              context
            }
          );
        }
      });
    }) ?? [],
    ...regions?.map((region) => {
      const preference = pricePreferences?.find(
        (p) => p.attribute === "region_id" && p.value === region.id
      );
      const translatedRegionName = t2("fields.priceTemplate", {
        regionOrCurrency: region.name
      });
      return columnHelper2.column({
        id: `region_prices.${region.id}`,
        name: t2("fields.priceTemplate", {
          regionOrCurrency: region.name
        }),
        field: (context) => {
          return getFieldName(context, region.id);
        },
        type: "number",
        header: () => /* @__PURE__ */ jsxs3("div", { className: "flex w-full items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx4("span", { className: "truncate", title: translatedRegionName, children: translatedRegionName }),
          /* @__PURE__ */ jsx4(IncludesTaxTooltip, { includesTax: preference?.is_tax_inclusive })
        ] }),
        cell: (context) => {
          const currency = currencies2?.find((c) => c === region.currency_code);
          if (!currency) {
            return null;
          }
          return /* @__PURE__ */ jsx4(
            ShippingOptionPriceCell,
            {
              type: "region",
              header: translatedRegionName,
              code: region.currency_code,
              context
            }
          );
        }
      });
    }) ?? []
  ];
};

export {
  buildShippingOptionPriceRules,
  ConditionalPriceSchema,
  UpdateConditionalPriceSchema,
  ShippingOptionPriceProvider,
  ConditionalPriceForm,
  useShippingOptionPriceColumns
};
