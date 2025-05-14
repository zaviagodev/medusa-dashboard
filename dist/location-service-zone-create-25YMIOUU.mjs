import {
  GeoZoneForm
} from "./chunk-6F5CLHPU.mjs";
import "./chunk-NOAFLTPV.mjs";
import {
  GEO_ZONE_STACKED_MODAL_ID
} from "./chunk-PYIO3TDQ.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-X5VECN6S.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  StackedFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useCreateFulfillmentSetServiceZone
} from "./chunk-ENV6YVOM.mjs";
import "./chunk-GRT22PE5.mjs";
import {
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-service-zone-create/location-service-zone-create.tsx
import { json, useParams } from "react-router-dom";

// src/routes/locations/location-service-zone-create/components/create-service-zone-form/create-service-zone-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, InlineTip, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateServiceZoneSchema = z.object({
  name: z.string().min(1),
  countries: z.array(z.object({ iso_2: z.string().min(2), display_name: z.string() })).min(1)
});
function CreateServiceZoneForm({
  fulfillmentSet,
  type,
  location
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: "",
      countries: []
    },
    resolver: zodResolver(CreateServiceZoneSchema)
  });
  const { mutateAsync, isPending } = useCreateFulfillmentSetServiceZone(
    fulfillmentSet.id
  );
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        name: data.name,
        geo_zones: data.countries.map(({ iso_2 }) => ({
          country_code: iso_2,
          type: "country"
        }))
      },
      {
        onSuccess: () => {
          toast.success(
            t("stockLocations.serviceZones.create.successToast", {
              name: data.name
            })
          );
          handleSuccess(`/settings/locations/${location.id}`);
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex h-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col items-center overflow-auto", children: /* @__PURE__ */ jsxs(StackedFocusModal, { id: GEO_ZONE_STACKED_MODAL_ID, children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
            /* @__PURE__ */ jsx(Heading, { children: type === "pickup" /* Pickup */ ? t("stockLocations.serviceZones.create.headerPickup", {
              location: location.name
            }) : t("stockLocations.serviceZones.create.headerShipping", {
              location: location.name
            }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsx(
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
            ) }),
            /* @__PURE__ */ jsx(InlineTip, { label: t("general.tip"), children: t("stockLocations.serviceZones.fields.tip") }),
            /* @__PURE__ */ jsx(GeoZoneForm, { form })
          ] }) }),
          /* @__PURE__ */ jsx(GeoZoneForm.AreaDrawer, { form })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "small", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
}

// src/routes/locations/location-service-zone-create/location-service-zone-create.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function LocationCreateServiceZone() {
  const { fset_id, location_id } = useParams();
  const { stock_location, isPending, isFetching, isError, error } = useStockLocation(location_id, {
    fields: "*fulfillment_sets"
  });
  const fulfillmentSet = stock_location?.fulfillment_sets?.find(
    (f) => f.id === fset_id
  );
  const type = fulfillmentSet?.type === "pickup" /* Pickup */ ? "pickup" /* Pickup */ : "shipping" /* Shipping */;
  if (!isPending && !isFetching && !fulfillmentSet) {
    throw json(
      { message: `Fulfillment set with ID: ${fset_id} was not found.` },
      404
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { prev: `/settings/locations/${location_id}`, children: fulfillmentSet && /* @__PURE__ */ jsx2(
    CreateServiceZoneForm,
    {
      fulfillmentSet,
      location: stock_location,
      type
    }
  ) });
}
export {
  LocationCreateServiceZone as Component
};
