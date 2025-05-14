import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
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
  useStore,
  useUpdateStore
} from "./chunk-V2LANK5S.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/store/store-edit/store-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/store/store-edit/components/edit-store-form/edit-store-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditStoreSchema = z.object({
  name: z.string().min(1),
  default_currency_code: z.string().optional(),
  default_region_id: z.string().optional(),
  default_sales_channel_id: z.string().optional(),
  default_location_id: z.string().optional()
});
var EditStoreForm = ({ store }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: store.name,
      default_region_id: store.default_region_id || void 0,
      default_currency_code: store.supported_currencies?.find((c) => c.is_default)?.currency_code || void 0,
      default_sales_channel_id: store.default_sales_channel_id || void 0,
      default_location_id: store.default_location_id || void 0
    },
    resolver: zodResolver(EditStoreSchema)
  });
  const { mutateAsync, isPending } = useUpdateStore(store.id);
  const regionsCombobox = useComboboxData({
    queryKey: ["regions", "default_region_id"],
    queryFn: (params) => sdk.admin.region.list({ ...params, fields: "id,name" }),
    defaultValue: store.default_region_id || void 0,
    getOptions: (data) => data.regions.map((r) => ({ label: r.name, value: r.id }))
  });
  const salesChannelsCombobox = useComboboxData({
    queryFn: (params) => sdk.admin.salesChannel.list({ ...params, fields: "id,name" }),
    getOptions: (data) => data.sales_channels.map((sc) => ({ label: sc.name, value: sc.id })),
    queryKey: ["sales_channels", "default_sales_channel_id"],
    defaultValue: store.default_sales_channel_id || void 0
  });
  const locationsCombobox = useComboboxData({
    queryFn: (params) => sdk.admin.stockLocation.list({ ...params, fields: "id,name" }),
    getOptions: (data) => data.stock_locations.map((l) => ({ label: l.name, value: l.id })),
    queryKey: ["stock_locations", "default_location_id"],
    defaultValue: store.default_location_id || void 0
  });
  const handleSubmit = form.handleSubmit(async (values) => {
    const { default_currency_code, ...rest } = values;
    const normalizedMutation = {
      ...rest,
      supported_currencies: store.supported_currencies?.map((c) => ({
        ...c,
        is_default: c.currency_code === default_currency_code
      }))
    };
    await mutateAsync(normalizedMutation, {
      onSuccess: () => {
        toast.success(t("store.toast.update"));
        handleSuccess();
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { placeholder: "ACME", ...field }) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "default_currency_code",
          render: ({ field: { onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("store.defaultCurrency") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: onChange, children: [
                /* @__PURE__ */ jsx(Select.Trigger, { ref: field.ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                /* @__PURE__ */ jsx(Select.Content, { children: store.supported_currencies?.map((currency) => /* @__PURE__ */ jsx(
                  Select.Item,
                  {
                    value: currency.currency_code,
                    children: currency.currency_code.toUpperCase()
                  },
                  currency.currency_code
                )) })
              ] }) })
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "default_region_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("store.defaultRegion") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: regionsCombobox.options,
                  searchValue: regionsCombobox.searchValue,
                  onSearchValueChange: regionsCombobox.onSearchValueChange,
                  disabled: regionsCombobox.disabled
                }
              ) })
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "default_sales_channel_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("store.defaultSalesChannel") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: salesChannelsCombobox.options,
                  searchValue: salesChannelsCombobox.searchValue,
                  onSearchValueChange: salesChannelsCombobox.onSearchValueChange,
                  disabled: salesChannelsCombobox.disabled
                }
              ) })
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "default_location_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("store.defaultLocation") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: locationsCombobox.options,
                  searchValue: locationsCombobox.searchValue,
                  onSearchValueChange: locationsCombobox.onSearchValueChange,
                  disabled: locationsCombobox.disabled
                }
              ) })
            ] });
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", isLoading: isPending, type: "submit", children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/store/store-edit/store-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var StoreEdit = () => {
  const { t } = useTranslation2();
  const { store, isPending: isLoading, isError, error } = useStore();
  if (isError) {
    throw error;
  }
  const ready = !!store && !isLoading;
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("store.edit.header") }) }),
    ready && /* @__PURE__ */ jsx2(EditStoreForm, { store })
  ] });
};
export {
  StoreEdit as Component
};
