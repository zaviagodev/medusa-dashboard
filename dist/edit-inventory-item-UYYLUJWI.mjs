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
  useInventoryItem,
  useUpdateInventoryItem
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/inventory/inventory-detail/components/edit-inventory-item/edit-item-drawer.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/inventory/inventory-detail/components/edit-inventory-item/components/edit-item-form.tsx
import { Button, Input, toast } from "@medusajs/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditInventoryItemSchema = z.object({
  title: z.string().optional(),
  sku: z.string().min(1)
});
var getDefaultValues = (item) => {
  return {
    title: item.title ?? void 0,
    sku: item.sku ?? void 0
  };
};
var EditInventoryItemForm = ({ item }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: getDefaultValues(item),
    resolver: zodResolver(EditInventoryItemSchema)
  });
  const { mutateAsync, isPending: isLoading } = useUpdateInventoryItem(item.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    mutateAsync(values, {
      onSuccess: () => {
        toast.success(t("inventory.toast.updateItem"));
        handleSuccess();
      },
      onError: (e) => toast.error(e.message)
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex flex-1 flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-8 overflow-auto", children: [
          /* @__PURE__ */ jsx(
            Form.Field,
            {
              control: form.control,
              name: "title",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.title") }),
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
              name: "sku",
              render: ({ field }) => {
                return /* @__PURE__ */ jsxs(Form.Item, { children: [
                  /* @__PURE__ */ jsx(Form.Label, { children: t("fields.sku") }),
                  /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                  /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "small", isLoading, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/inventory/inventory-detail/components/edit-inventory-item/edit-item-drawer.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var InventoryItemEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const {
    inventory_item: inventoryItem,
    isPending: isLoading,
    isError,
    error
  } = useInventoryItem(id);
  const ready = !isLoading && inventoryItem;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("inventory.editItemDetails") }) }),
    ready && /* @__PURE__ */ jsx2(EditInventoryItemForm, { item: inventoryItem })
  ] });
};
export {
  InventoryItemEdit as Component
};
