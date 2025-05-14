import {
  isOptionEnabledInStore
} from "./chunk-R2O6QX4D.mjs";
import {
  ShippingOptionPriceType
} from "./chunk-PYIO3TDQ.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  SwitchBox
} from "./chunk-D7H6ZNK4.mjs";
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
  useShippingOptions,
  useUpdateShippingOptions
} from "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-service-zone-shipping-option-edit/location-service-zone-shipping-option-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { json, useParams } from "react-router-dom";

// src/routes/locations/location-service-zone-shipping-option-edit/components/edit-region-form/edit-shipping-option-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, RadioGroup, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";

// src/lib/common.ts
function pick(obj, keys) {
  const ret = {};
  keys.forEach((k) => {
    if (k in obj) {
      ret[k] = obj[k];
    }
  });
  return ret;
}

// src/routes/locations/location-service-zone-shipping-option-edit/components/edit-region-form/edit-shipping-option-form.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var EditShippingOptionSchema = zod.object({
  name: zod.string().min(1),
  price_type: zod.nativeEnum(ShippingOptionPriceType),
  enabled_in_store: zod.boolean().optional(),
  shipping_profile_id: zod.string()
});
var EditShippingOptionForm = ({
  locationId,
  shippingOption,
  type
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const isPickup = type === "pickup" /* Pickup */;
  const shippingProfiles = useComboboxData({
    queryFn: (params) => sdk.admin.shippingProfile.list(params),
    queryKey: ["shipping_profiles"],
    getOptions: (data) => data.shipping_profiles.map((profile) => ({
      label: profile.name,
      value: profile.id
    })),
    defaultValue: shippingOption.shipping_profile_id
  });
  const form = useForm({
    defaultValues: {
      name: shippingOption.name,
      price_type: shippingOption.price_type,
      enabled_in_store: isOptionEnabledInStore(shippingOption),
      shipping_profile_id: shippingOption.shipping_profile_id
    },
    resolver: zodResolver(EditShippingOptionSchema)
  });
  const { mutateAsync, isPending: isLoading } = useUpdateShippingOptions(
    shippingOption.id
  );
  const handleSubmit = form.handleSubmit(async (values) => {
    const rules = shippingOption.rules.map((r) => ({
      ...pick(r, ["id", "attribute", "operator", "value"])
    }));
    const storeRule = rules.find((r) => r.attribute === "enabled_in_store");
    if (!storeRule) {
      rules.push({
        value: values.enabled_in_store ? "true" : "false",
        attribute: "enabled_in_store",
        operator: "eq"
      });
    } else {
      storeRule.value = values.enabled_in_store ? "true" : "false";
    }
    await mutateAsync(
      {
        name: values.name,
        price_type: values.price_type,
        shipping_profile_id: values.shipping_profile_id,
        rules
      },
      {
        onSuccess: ({ shipping_option }) => {
          toast.success(
            t("stockLocations.shippingOptions.edit.successToast", {
              name: shipping_option.name
            })
          );
          handleSuccess(`/settings/locations/${locationId}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
      !isPickup && /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "price_type",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t(
                "stockLocations.shippingOptions.fields.priceType.label"
              ) }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(RadioGroup, { ...field, onValueChange: field.onChange, children: [
                /* @__PURE__ */ jsx(
                  RadioGroup.ChoiceBox,
                  {
                    className: "flex-1",
                    value: "flat" /* FlatRate */,
                    label: t(
                      "stockLocations.shippingOptions.fields.priceType.options.fixed.label"
                    ),
                    description: t(
                      "stockLocations.shippingOptions.fields.priceType.options.fixed.hint"
                    )
                  }
                ),
                /* @__PURE__ */ jsx(
                  RadioGroup.ChoiceBox,
                  {
                    className: "flex-1",
                    value: "calculated" /* Calculated */,
                    label: t(
                      "stockLocations.shippingOptions.fields.priceType.options.calculated.label"
                    ),
                    description: t(
                      "stockLocations.shippingOptions.fields.priceType.options.calculated.hint"
                    )
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-y-4", children: [
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
            name: "shipping_profile_id",
            render: ({ field }) => {
              return /* @__PURE__ */ jsxs(Form.Item, { children: [
                /* @__PURE__ */ jsx(Form.Label, { children: t("stockLocations.shippingOptions.fields.profile") }),
                /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                  Combobox,
                  {
                    ...field,
                    options: shippingProfiles.options,
                    searchValue: shippingProfiles.searchValue,
                    onSearchValueChange: shippingProfiles.onSearchValueChange,
                    disabled: shippingProfiles.disabled
                  }
                ) }),
                /* @__PURE__ */ jsx(Form.ErrorMessage, {})
              ] });
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(
        SwitchBox,
        {
          control: form.control,
          name: "enabled_in_store",
          label: t(
            "stockLocations.shippingOptions.fields.enableInStore.label"
          ),
          description: t(
            "stockLocations.shippingOptions.fields.enableInStore.hint"
          )
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/locations/location-service-zone-shipping-option-edit/location-service-zone-shipping-option-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var LocationServiceZoneShippingOptionEdit = () => {
  const { t } = useTranslation2();
  const { location_id, so_id } = useParams();
  const { shipping_options, isPending, isFetching, isError, error } = useShippingOptions({
    id: so_id,
    fields: "+service_zone.fulfillment_set.type"
  });
  const shippingOption = shipping_options?.find((so) => so.id === so_id);
  if (!isPending && !isFetching && !shippingOption) {
    throw json(
      { message: `Shipping option with ID ${so_id} was not found` },
      404
    );
  }
  if (isError) {
    throw error;
  }
  const isPickup = shippingOption?.service_zone.fulfillment_set.type === "pickup" /* Pickup */;
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t(
      `stockLocations.${isPickup ? "pickupOptions" : "shippingOptions"}.edit.header`
    ) }) }),
    shippingOption && /* @__PURE__ */ jsx2(
      EditShippingOptionForm,
      {
        shippingOption,
        locationId: location_id,
        type: shippingOption.service_zone.fulfillment_set.type
      }
    )
  ] });
};
export {
  LocationServiceZoneShippingOptionEdit as Component
};
