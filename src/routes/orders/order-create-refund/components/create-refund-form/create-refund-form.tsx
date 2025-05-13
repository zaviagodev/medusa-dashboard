import { zodResolver } from "@hookform/resolvers/zod"
import { HttpTypes } from "@medusajs/types"
import {
  Button,
  CurrencyInput,
  Label,
  Select,
  Textarea,
  toast,
} from "@medusajs/ui"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as zod from "zod"
import { Form } from "../../../../../components/common/form"
import { RouteDrawer, useRouteModal } from "../../../../../components/modals"
import { KeyboundForm } from "../../../../../components/utilities/keybound-form"
import { useRefundPayment } from "../../../../../hooks/api"
import { currencies } from "../../../../../lib/data/currencies"
import { formatCurrency } from "../../../../../lib/format-currency"
import { getLocaleAmount } from "../../../../../lib/money-amount-helpers"
import { getPaymentsFromOrder } from "../../../order-detail/components/order-payment-section"
import { formatValue } from "react-currency-input-field"

type CreateRefundFormProps = {
  order: HttpTypes.AdminOrder
  refundReasons: HttpTypes.AdminRefundReason[]
}

const CreateRefundSchema = zod.object({
  amount: zod.string().or(zod.number()),
  refund_reason_id: zod.string().nullish(),
  note: zod.string().optional(),
})

export const CreateRefundForm = ({
  order,
  refundReasons,
}: CreateRefundFormProps) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get("paymentId")
  const payments = getPaymentsFromOrder(order)
  const payment = payments.find((p) => p.id === paymentId)!
  const paymentAmount = payment?.amount || 0

  const currency = useMemo(
    () => currencies[order.currency_code.toUpperCase()],
    [order.currency_code]
  )

  const form = useForm<zod.infer<typeof CreateRefundSchema>>({
    defaultValues: {
      amount: paymentAmount,
      note: "",
    },
    resolver: zodResolver(CreateRefundSchema),
  })

  useEffect(() => {
    const pendingDifference = order.summary.pending_difference as number
    const paymentAmount = (payment?.amount || 0) as number
    const pendingAmount =
      pendingDifference < 0
        ? Math.min(pendingDifference, paymentAmount)
        : paymentAmount

    const normalizedAmount =
      pendingAmount < 0 ? pendingAmount * -1 : pendingAmount

    form.setValue("amount", normalizedAmount as number)
  }, [payment])

  const { mutateAsync, isPending } = useRefundPayment(order.id, payment?.id!)

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        amount: parseFloat(data.amount as string),
        refund_reason_id: data.refund_reason_id,
        note: data.note,
      },
      {
        onSuccess: () => {
          toast.success(
            t("orders.payment.refundPaymentSuccess", {
              amount: formatCurrency(data.amount, payment?.currency_code!),
            })
          )

          handleSuccess()
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm
        onSubmit={handleSubmit}
        className="flex size-full flex-col overflow-hidden"
      >
        <RouteDrawer.Body className="flex-1 overflow-auto">
          <div className="flex flex-col gap-y-4">
            <Select
              value={payment?.id}
              onValueChange={(value) => {
                navigate(`/orders/${order.id}/refund?paymentId=${value}`, {
                  replace: true,
                })
              }}
            >
              <Label className="txt-compact-small mb-[-6px] font-sans font-medium">
                {t("orders.payment.selectPaymentToRefund")}
              </Label>

              <Select.Trigger>
                <Select.Value
                  placeholder={t("orders.payment.selectPaymentToRefund")}
                />
              </Select.Trigger>

              <Select.Content>
                {payments.map((payment) => {
                  const totalRefunded = payment.refunds.reduce(
                    (acc, next) => next.amount + acc,
                    0
                  )

                  return (
                    <Select.Item
                      value={payment!.id}
                      key={payment.id}
                      disabled={
                        !!payment.canceled_at || totalRefunded >= payment.amount
                      }
                    >
                      <span>
                        {getLocaleAmount(
                          payment.amount as number,
                          payment.currency_code
                        )}
                        {" - "}
                      </span>
                      <span>{payment.provider_id}</span>
                      <span> - ({payment.id.replace("pay_", "")})</span>
                    </Select.Item>
                  )
                })}
              </Select.Content>
            </Select>

            <Form.Field
              control={form.control}
              name="amount"
              rules={{
                required: true,
                min: 0,
                max: paymentAmount,
              }}
              render={({ field: { onChange, ...field } }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.amount")}</Form.Label>

                    <Form.Control>
                      <CurrencyInput
                        {...field}
                        min={0}
                        placeholder={formatValue({
                          value: "0",
                          decimalScale: currency.decimal_digits,
                        })}
                        decimalScale={currency.decimal_digits}
                        symbol={currency.symbol_native}
                        code={currency.code}
                        value={field.value}
                        onValueChange={(_value, _name, values) =>
                          onChange(values?.value ? values?.value : "")
                        }
                        autoFocus
                      />
                    </Form.Control>

                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />

            {/* TODO: Bring this back when we have a refund reason management UI */}
            {/* <Form.Field
              control={form.control}
              name="refund_reason_id"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.refundReason")}</Form.Label>

                    <Form.Control>
                      <Combobox
                        {...field}
                        options={refundReasons.map((pp) => ({
                          label: upperCaseFirst(pp.label),
                          value: pp.id,
                        }))}
                      />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            /> */}

            <Form.Field
              control={form.control}
              name={`note`}
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>{t("fields.note")}</Form.Label>

                    <Form.Control>
                      <Textarea {...field} />
                    </Form.Control>

                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
          </div>
        </RouteDrawer.Body>

        <RouteDrawer.Footer>
          <div className="flex items-center justify-end gap-x-2">
            <RouteDrawer.Close asChild>
              <Button variant="secondary" size="small">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>

            <Button
              isLoading={isPending}
              type="submit"
              variant="primary"
              size="small"
              disabled={!!Object.keys(form.formState.errors || {}).length}
            >
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
