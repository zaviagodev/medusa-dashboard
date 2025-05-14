import {
  VARIANT_DETAIL_FIELDS
} from "./chunk-EUTK2A3J.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  castNumber
} from "./chunk-6GU6IDUA.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useProductVariant,
  useProductVariantsInventoryItemsBatch
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/product-variants/product-variant-manage-inventory-items/product-variant-manage-inventory-items.tsx
import { useParams } from "react-router-dom";

// src/routes/product-variants/product-variant-manage-inventory-items/components/manage-variant-inventory-items-form/manage-variant-inventory-items-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkMini } from "@medusajs/icons";
import { Button, Heading, IconButton, Input, Label, toast } from "@medusajs/ui";
import i18next from "i18next";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var ManageVariantInventoryItemsSchema = zod.object({
  inventory: zod.array(
    zod.object({
      inventory_item_id: zod.string().min(1, i18next.t("products.variant.inventory.validation.itemId")),
      required_quantity: zod.union([zod.number(), zod.string()])
    }).superRefine((data, ctx) => {
      const quantity = data.required_quantity ? castNumber(data.required_quantity) : 0;
      if (quantity < 1) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: i18next.t(
            "products.variant.inventory.validation.quantity"
          ),
          path: ["required_quantity"]
        });
      }
    })
  )
});
function VariantInventoryItemRow({
  form,
  inventoryIndex,
  inventoryItem,
  onRemove
}) {
  const { t } = useTranslation();
  const items = useComboboxData({
    queryKey: ["inventory_items"],
    defaultValueKey: "id",
    defaultValue: inventoryItem.inventory_item_id,
    queryFn: (params) => sdk.admin.inventoryItem.list(params),
    getOptions: (data) => data.inventory_items.map((item) => ({
      label: `${item.title} ${item.sku ? `(${item.sku})` : ""}`,
      value: item.id
    }))
  });
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: "bg-ui-bg-component shadow-elevation-card-rest grid grid-cols-[1fr_28px] items-center gap-1.5 rounded-xl p-1.5",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[min-content,1fr] items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx(
            Label,
            {
              size: "xsmall",
              weight: "plus",
              className: "text-ui-fg-subtle",
              htmlFor: `inventory.${inventoryIndex}.inventory_item_id`,
              children: t("fields.item")
            }
          ) }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: `inventory.${inventoryIndex}.inventory_item_id`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Combobox,
                    {
                      ...field,
                      options: items.options,
                      searchValue: items.searchValue,
                      onSearchValueChange: items.onSearchValueChange,
                      onBlur: () => items.onSearchValueChange(""),
                      fetchNextPage: items.fetchNextPage,
                      className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                      placeholder: t("products.create.inventory.itemPlaceholder")
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx(
            Label,
            {
              size: "xsmall",
              weight: "plus",
              className: "text-ui-fg-subtle",
              htmlFor: `inventory.${inventoryIndex}.required_quantity`,
              children: t("fields.quantity")
            }
          ) }),
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: `inventory.${inventoryIndex}.required_quantity`,
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                    Input,
                    {
                      type: "number",
                      className: "bg-ui-bg-field-component",
                      min: 0,
                      value,
                      onChange,
                      ...field,
                      placeholder: t(
                        "products.create.inventory.quantityPlaceholder"
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          IconButton,
          {
            type: "button",
            size: "small",
            variant: "transparent",
            className: "text-ui-fg-muted",
            onClick: onRemove,
            children: /* @__PURE__ */ jsx(XMarkMini, {})
          }
        )
      ]
    },
    inventoryItem.id
  );
}
function ManageVariantInventoryItemsForm({
  variant
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      inventory: variant.inventory_items.length ? variant.inventory_items.map((i) => ({
        required_quantity: i.required_quantity,
        inventory_item_id: i.inventory.id
      })) : [
        {
          inventory_item_id: "",
          required_quantity: ""
        }
      ]
    },
    resolver: zodResolver(ManageVariantInventoryItemsSchema)
  });
  const inventory = useFieldArray({
    control: form.control,
    name: `inventory`
  });
  const hasKit = inventory.fields.length > 1;
  const { mutateAsync, isPending } = useProductVariantsInventoryItemsBatch(
    variant?.product_id
  );
  const handleSubmit = form.handleSubmit(async (values) => {
    const existingItems = {};
    const selectedItems = {};
    variant.inventory_items.forEach(
      (i) => existingItems[i.inventory.id] = i.required_quantity
    );
    values.inventory.forEach((i) => selectedItems[i.inventory_item_id] = true);
    const payload = {};
    values.inventory.forEach((v) => {
      if (v.inventory_item_id in existingItems) {
        if (v.required_quantity !== existingItems[v.inventory_item_id]) {
          payload.update = payload.update || [];
          payload.update.push({
            required_quantity: castNumber(v.required_quantity),
            inventory_item_id: v.inventory_item_id,
            variant_id: variant.id
          });
        }
      } else {
        payload.create = payload.create || [];
        payload.create.push({
          required_quantity: castNumber(v.required_quantity),
          inventory_item_id: v.inventory_item_id,
          variant_id: variant.id
        });
      }
    });
    variant.inventory_items.forEach((i) => {
      if (!(i.inventory.id in selectedItems)) {
        payload.delete = payload.delete || [];
        payload.delete.push({
          inventory_item_id: i.inventory.id,
          variant_id: variant.id
        });
      }
    });
    await mutateAsync(payload, {
      onSuccess: () => {
        toast.success(t("products.variant.inventory.toast.itemsManageSuccess"));
        handleSuccess();
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex h-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col gap-y-8 px-6 pt-12 md:w-[720px] md:pt-24", children: [
          /* @__PURE__ */ jsx(Heading, { children: t(
            hasKit ? "products.create.inventory.heading" : "fields.inventoryItems"
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-x-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx(Form.Label, { children: variant.title }),
                /* @__PURE__ */ jsx(Form.Hint, { children: t(
                  hasKit ? "products.create.inventory.label" : "fields.inventoryItem"
                ) })
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "small",
                  variant: "secondary",
                  type: "button",
                  onClick: () => {
                    inventory.append({
                      inventory_item_id: "",
                      required_quantity: ""
                    });
                  },
                  children: t("actions.add")
                }
              )
            ] }),
            inventory.fields.map((inventoryItem, inventoryIndex) => /* @__PURE__ */ jsx(
              VariantInventoryItemRow,
              {
                form,
                inventoryIndex,
                inventoryItem,
                onRemove: () => inventory.remove(inventoryIndex)
              },
              inventoryItem.id
            ))
          ] })
        ] }) })
      ]
    }
  ) });
}

// src/routes/product-variants/product-variant-manage-inventory-items/product-variant-manage-inventory-items.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function ProductVariantManageInventoryItems() {
  const { id, variant_id } = useParams();
  const {
    variant,
    isPending: isLoading,
    isError,
    error
  } = useProductVariant(id, variant_id, {
    fields: VARIANT_DETAIL_FIELDS
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: !isLoading && variant && /* @__PURE__ */ jsx2(ManageVariantInventoryItemsForm, { variant }) });
}
export {
  ProductVariantManageInventoryItems as Component
};
