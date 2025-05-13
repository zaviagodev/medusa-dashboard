import { HttpTypes } from "@medusajs/types"
import { Input } from "@medusajs/ui"
import { useWatch } from "react-hook-form"
import { Form } from "../../../../../../components/common/form"
import { Combobox } from "../../../../../../components/inputs/combobox"
import { useStore } from "../../../../../../hooks/api/store"
import { useComboboxData } from "../../../../../../hooks/use-combobox-data"
import { sdk } from "../../../../../../lib/client"

type RuleValueFormFieldType = {
  form: any
  identifier: string
  scope:
    | "application_method.buy_rules"
    | "rules"
    | "application_method.target_rules"
  name: string
  operator: string
  fieldRule: any
  attributes: HttpTypes.AdminRuleAttributeOption[]
  ruleType: "rules" | "target-rules" | "buy-rules"
}

const buildFilters = (attribute?: string, store?: HttpTypes.AdminStore) => {
  if (!attribute || !store) {
    return {}
  }

  if (attribute === "currency_code") {
    return {
      value: store.supported_currencies?.map((c) => c.currency_code),
    }
  }

  return {}
}

export const RuleValueFormField = ({
  form,
  identifier,
  scope,
  name,
  operator,
  fieldRule,
  attributes,
  ruleType,
}: RuleValueFormFieldType) => {
  const attribute = attributes?.find(
    (attr) => attr.value === fieldRule.attribute
  )

  const { store, isLoading: isStoreLoading } = useStore()

  const comboboxData = useComboboxData({
    queryFn: async (params) => {
      return await sdk.admin.promotion.listRuleValues(
        ruleType,
        attribute?.id!,
        {
          ...params,
          ...buildFilters(attribute?.id, store!),
        }
      )
    },
    enabled:
      !!attribute?.id &&
      ["select", "multiselect"].includes(attribute.field_type) &&
      !isStoreLoading,
    getOptions: (data) => data.values,
    queryKey: ["rule-value-options", ruleType, attribute?.id],
  })

  const watchOperator = useWatch({
    control: form.control,
    name: operator,
  })

  return (
    <Form.Field
      key={`${identifier}.${scope}.${name}-${fieldRule.attribute}`}
      name={name}
      render={({ field: { onChange, ref, ...field } }) => {
        if (attribute?.field_type === "number") {
          return (
            <Form.Item className="basis-1/2">
              <Form.Control>
                <Input
                  {...field}
                  type="number"
                  onChange={onChange}
                  className="bg-ui-bg-base"
                  ref={ref}
                  min={1}
                  disabled={!fieldRule.attribute}
                />
              </Form.Control>
              <Form.ErrorMessage />
            </Form.Item>
          )
        } else if (attribute?.field_type === "text") {
          return (
            <Form.Item className="basis-1/2">
              <Form.Control>
                <Input
                  {...field}
                  ref={ref}
                  onChange={onChange}
                  className="bg-ui-bg-base"
                  disabled={!fieldRule.attribute}
                />
              </Form.Control>
              <Form.ErrorMessage />
            </Form.Item>
          )
        } else {
          return (
            <Form.Item className="basis-1/2">
              <Form.Control>
                <Combobox
                  {...field}
                  {...comboboxData}
                  multiple={watchOperator !== "eq"}
                  ref={ref}
                  placeholder={
                    watchOperator === "eq" ? "Select Value" : "Select Values"
                  }
                  onChange={onChange}
                />
              </Form.Control>
              <Form.ErrorMessage />
            </Form.Item>
          )
        }
      }}
    />
  )
}
