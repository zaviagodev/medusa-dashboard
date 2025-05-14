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
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import {
  useBatchInventoryItemLocationLevels,
  useInventoryItem
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/inventory/inventory-detail/components/manage-locations/manage-locations-drawer.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/inventory/inventory-detail/components/manage-locations/components/manage-locations-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text as Text2, toast } from "@medusajs/ui";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useEffect, useMemo } from "react";

// src/routes/inventory/inventory-detail/components/manage-locations/components/location-item.tsx
import { Checkbox, Text, clx } from "@medusajs/ui";
import { jsx, jsxs } from "react/jsx-runtime";
var LocationItem = ({
  selected,
  onSelect,
  location
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clx(
        "flex w-full cursor-pointer gap-x-2 rounded-lg border px-2 py-2",
        {
          "border-ui-border-interactive ": selected
        }
      ),
      onClick: () => onSelect(!selected),
      children: [
        /* @__PURE__ */ jsx("div", { className: "h-5 w-5", children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            onClick: (e) => {
              e.stopPropagation();
              onSelect(!selected);
            },
            checked: selected
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col", children: [
          /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: location.name }),
          /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: [
            location.address?.address_1,
            location.address?.city,
            location.address?.country_code
          ].filter((el) => !!el).join(", ") })
        ] })
      ]
    }
  );
};

// src/routes/inventory/inventory-detail/components/manage-locations/components/manage-locations-form.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var EditInventoryItemAttributesSchema = z.object({
  locations: z.array(
    z.object({
      id: z.string(),
      location_id: z.string(),
      selected: z.boolean()
    })
  )
});
var getDefaultValues = (allLocations, existingLevels) => {
  return {
    locations: allLocations.map((location) => ({
      ...location,
      location_id: location.id,
      selected: existingLevels.has(location.id)
    }))
  };
};
var ManageLocationsForm = ({
  item,
  locations
}) => {
  const existingLocationLevels = useMemo(
    () => new Set(item.location_levels?.map((l) => l.location_id) ?? []),
    item.location_levels
  );
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: getDefaultValues(locations, existingLocationLevels),
    resolver: zodResolver(EditInventoryItemAttributesSchema)
  });
  const { fields: locationFields, update: updateField } = useFieldArray({
    control: form.control,
    name: "locations"
  });
  useEffect(() => {
    form.setValue(
      "locations",
      getDefaultValues(locations, existingLocationLevels).locations
    );
  }, [existingLocationLevels, locations]);
  const { mutateAsync } = useBatchInventoryItemLocationLevels(item.id);
  const handleSubmit = form.handleSubmit(async ({ locations: locations2 }) => {
    const [selectedLocations, unselectedLocations] = locations2.reduce(
      (acc, location) => {
        if (!location.selected && !existingLocationLevels.has(location.location_id) || location.selected && existingLocationLevels.has(location.location_id)) {
          return acc;
        }
        if (location.selected) {
          acc[0].push(location.location_id);
        } else {
          acc[1].push(location.location_id);
        }
        return acc;
      },
      [[], []]
    );
    if (selectedLocations.length === 0 && unselectedLocations.length === 0) {
      return handleSuccess();
    }
    await mutateAsync(
      {
        create: selectedLocations.map((location_id) => ({
          location_id
        })),
        delete: unselectedLocations
      },
      {
        onSuccess: () => {
          toast.success(t("inventory.toast.updateLocations"));
          handleSuccess();
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx2(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs2(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex flex-1 flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsxs2(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-4 overflow-auto", children: [
          /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle shadow-elevation-card-rest grid grid-rows-2 divide-y rounded-lg border", children: [
            /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 divide-x", children: [
              /* @__PURE__ */ jsx2(Text2, { className: "px-2 py-1.5", size: "small", leading: "compact", children: t("fields.title") }),
              /* @__PURE__ */ jsx2(Text2, { className: "px-2 py-1.5", size: "small", leading: "compact", children: item.title ?? "-" })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-2 divide-x", children: [
              /* @__PURE__ */ jsx2(Text2, { className: "px-2 py-1.5", size: "small", leading: "compact", children: t("fields.sku") }),
              /* @__PURE__ */ jsx2(Text2, { className: "px-2 py-1.5", size: "small", leading: "compact", children: item.sku })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx2(Text2, { size: "small", weight: "plus", leading: "compact", children: t("locations.domain") }),
            /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex w-full justify-between", children: [
              /* @__PURE__ */ jsx2(Text2, { size: "small", leading: "compact", children: t("locations.selectLocations") }),
              /* @__PURE__ */ jsxs2(Text2, { size: "small", leading: "compact", children: [
                "(",
                t("general.countOfTotalSelected", {
                  count: locationFields.filter((l) => l.selected).length,
                  total: locations.length
                }),
                ")"
              ] })
            ] })
          ] }),
          locationFields.map((location, idx) => {
            return /* @__PURE__ */ jsx2(
              LocationItem,
              {
                selected: location.selected,
                location,
                onSelect: () => updateField(idx, {
                  ...location,
                  selected: !location.selected
                })
              },
              location.id
            );
          })
        ] }),
        /* @__PURE__ */ jsx2(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx2(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx2(Button, { type: "submit", size: "small", isLoading: false, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/inventory/inventory-detail/components/manage-locations/manage-locations-drawer.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var ManageLocationsDrawer = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const {
    inventory_item: inventoryItem,
    isPending: isLoading,
    isError,
    error
  } = useInventoryItem(id);
  const { stock_locations, isLoading: loadingLocations } = useStockLocations();
  const ready = !isLoading && !loadingLocations && inventoryItem && stock_locations;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(RouteDrawer, { children: [
    /* @__PURE__ */ jsx3(RouteDrawer.Header, { children: /* @__PURE__ */ jsx3(Heading, { children: t("inventory.manageLocations") }) }),
    ready && /* @__PURE__ */ jsx3(ManageLocationsForm, { item: inventoryItem, locations: stock_locations })
  ] });
};
export {
  ManageLocationsDrawer as Component
};
