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

// src/routes/locations/location-service-zone-edit/location-service-zone-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { json, useParams } from "react-router-dom";

// src/routes/locations/location-service-zone-edit/components/edit-region-form/edit-service-zone-form.tsx
import { Button, InlineTip, Input, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditServiceZoneSchema = zod.object({
  name: zod.string().min(1)
});
var EditServiceZoneForm = ({
  zone,
  fulfillmentSetId,
  locationId
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      name: zone.name
    }
  });
  const { mutateAsync, isPending: isLoading } = useUpdateFulfillmentSetServiceZone(fulfillmentSetId, zone.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        name: values.name
      },
      {
        onSuccess: () => {
          toast.success(
            t("stockLocations.serviceZones.edit.successToast", {
              name: values.name
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
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(InlineTip, { label: t("general.tip"), children: t("stockLocations.serviceZones.fields.tip") })
        ] }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/locations/location-service-zone-edit/location-service-zone-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var LocationServiceZoneEdit = () => {
  const { t } = useTranslation2();
  const { location_id, fset_id, zone_id } = useParams();
  const { stock_location, isPending, isFetching, isError, error } = useStockLocation(location_id, {
    fields: "*fulfillment_sets.service_zones"
  });
  const serviceZone = stock_location?.fulfillment_sets?.find((f) => f.id === fset_id)?.service_zones.find((z) => z.id === zone_id);
  if (!isPending && !isFetching && !serviceZone) {
    throw json(
      { message: `Service zone with ID ${zone_id} was not found` },
      404
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { prev: `/settings/locations/${location_id}`, children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("stockLocations.serviceZones.edit.header") }) }),
    serviceZone && /* @__PURE__ */ jsx2(
      EditServiceZoneForm,
      {
        zone: serviceZone,
        fulfillmentSetId: fset_id,
        locationId: location_id
      }
    )
  ] });
};
export {
  LocationServiceZoneEdit as Component
};
