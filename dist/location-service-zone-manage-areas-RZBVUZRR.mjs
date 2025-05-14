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
import {
  countries
} from "./chunk-DG7J63J2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useUpdateFulfillmentSetServiceZone
} from "./chunk-ENV6YVOM.mjs";
import "./chunk-GRT22PE5.mjs";
import {
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-service-zone-manage-areas/location-service-zone-manage-areas.tsx
import { json, useParams } from "react-router-dom";

// src/routes/locations/location-service-zone-manage-areas/components/edit-region-areas-form/edit-service-zone-areas-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Heading, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditeServiceZoneSchema = z.object({
  countries: z.array(z.object({ iso_2: z.string().min(2), display_name: z.string() })).min(1)
});
function EditServiceZoneAreasForm({
  fulfillmentSetId,
  locationId,
  zone
}) {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      countries: zone.geo_zones.map((z2) => {
        const country = countries.find((c) => c.iso_2 === z2.country_code);
        return {
          iso_2: z2.country_code,
          display_name: country?.display_name || z2.country_code.toUpperCase()
        };
      })
    },
    resolver: zodResolver(EditeServiceZoneSchema)
  });
  const { mutateAsync: editServiceZone, isPending: isLoading } = useUpdateFulfillmentSetServiceZone(fulfillmentSetId, zone.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await editServiceZone(
      {
        geo_zones: data.countries.map(({ iso_2 }) => ({
          country_code: iso_2,
          type: "country"
        }))
      },
      {
        onSuccess: () => {
          toast.success(
            t("stockLocations.serviceZones.manageAreas.successToast", {
              name: zone.name
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
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex h-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-auto", children: /* @__PURE__ */ jsxs(StackedFocusModal, { id: GEO_ZONE_STACKED_MODAL_ID, children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
            /* @__PURE__ */ jsx(Heading, { children: t("stockLocations.serviceZones.manageAreas.header", {
              name: zone.name
            }) }),
            /* @__PURE__ */ jsx(GeoZoneForm, { form })
          ] }) }),
          /* @__PURE__ */ jsx(GeoZoneForm.AreaDrawer, { form })
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", size: "small", isLoading, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
}

// src/routes/locations/location-service-zone-manage-areas/location-service-zone-manage-areas.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var LocationServiceZoneManageAreas = () => {
  const { location_id, fset_id, zone_id } = useParams();
  const { stock_location, isPending, isFetching, isError, error } = useStockLocation(location_id, {
    fields: "*fulfillment_sets.service_zones.geo_zones,fulfillment_sets.service_zones.name"
  });
  const zone = stock_location?.fulfillment_sets?.find((f) => f.id === fset_id)?.service_zones.find((z2) => z2.id === zone_id);
  if (!isPending && !isFetching && !zone) {
    throw json(
      { message: `Service zone with ID ${zone_id} was not found` },
      404
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(RouteFocusModal, { prev: `/settings/locations/${location_id}`, children: zone && /* @__PURE__ */ jsx2(
    EditServiceZoneAreasForm,
    {
      zone,
      fulfillmentSetId: fset_id,
      locationId: location_id
    }
  ) });
};
export {
  LocationServiceZoneManageAreas as Component
};
