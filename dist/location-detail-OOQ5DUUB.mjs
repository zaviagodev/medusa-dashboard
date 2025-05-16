import {
  isOptionEnabledInStore,
  isReturnOption
} from "./chunk-R2O6QX4D.mjs";
import {
  ListSummary
} from "./chunk-I3VB6NM2.mjs";
import "./chunk-PYIO3TDQ.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import {
  LinkButton
} from "./chunk-6WKBBTKM.mjs";
import {
  NoRecords
} from "./chunk-EMIHDNB7.mjs";
import {
  IconAvatar
} from "./chunk-EQTBJSBZ.mjs";
import {
  getFormattedAddress
} from "./chunk-B6ZOPCPA.mjs";
import {
  TwoColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  countries
} from "./chunk-DG7J63J2.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  TwoColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import {
  useDeleteFulfillmentServiceZone,
  useDeleteFulfillmentSet
} from "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import {
  useDeleteShippingOption
} from "./chunk-GRT22PE5.mjs";
import {
  stockLocationsQueryKeys,
  useCreateStockLocationFulfillmentSet,
  useDeleteStockLocation,
  useFulfillmentProviders,
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import {
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/locations/location-detail/constants.ts
var LOCATION_DETAILS_FIELD = "name,*sales_channels,*address,fulfillment_sets.type,fulfillment_sets.name,*fulfillment_sets.service_zones.geo_zones,*fulfillment_sets.service_zones,*fulfillment_sets.service_zones.shipping_options,*fulfillment_sets.service_zones.shipping_options.rules,*fulfillment_sets.service_zones.shipping_options.shipping_profile,*fulfillment_providers";

// src/routes/locations/location-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var LocationDetailBreadcrumb = (props) => {
  const { location_id } = props.params || {};
  const { stock_location } = useStockLocation(
    location_id,
    {
      fields: LOCATION_DETAILS_FIELD
    },
    {
      initialData: props.data,
      enabled: Boolean(location_id)
    }
  );
  if (!stock_location) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: stock_location.name });
};

// src/routes/locations/location-detail/loader.ts
var locationQuery = (id) => ({
  queryKey: stockLocationsQueryKeys.detail(id, {
    fields: LOCATION_DETAILS_FIELD
  }),
  queryFn: async () => sdk.admin.stockLocation.retrieve(id, {
    fields: LOCATION_DETAILS_FIELD
  })
});
var locationLoader = async ({ params }) => {
  const id = params.location_id;
  const query = locationQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/locations/location-detail/location-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/locations/location-detail/components/location-general-section/location-general-section.tsx
import {
  ArchiveBox,
  CurrencyDollar,
  Map,
  PencilSquare,
  Plus,
  Trash,
  TriangleDownMini
} from "@medusajs/icons";
import {
  Badge,
  Container,
  Divider,
  Heading,
  IconButton,
  StatusBadge,
  Text,
  toast,
  usePrompt
} from "@medusajs/ui";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var LocationGeneralSection = ({
  location
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(Container, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx2(Heading, { children: location.name }),
        /* @__PURE__ */ jsx2(Text, { className: "text-ui-fg-subtle txt-small", children: getFormattedAddress({ address: location.address }).join(", ") })
      ] }),
      /* @__PURE__ */ jsx2(Actions, { location })
    ] }) }),
    /* @__PURE__ */ jsx2(
      FulfillmentSet,
      {
        locationId: location.id,
        locationName: location.name,
        type: "pickup" /* Pickup */,
        fulfillmentSet: location.fulfillment_sets?.find(
          (f) => f.type === "pickup" /* Pickup */
        )
      }
    ),
    /* @__PURE__ */ jsx2(
      FulfillmentSet,
      {
        locationId: location.id,
        locationName: location.name,
        type: "shipping" /* Shipping */,
        fulfillmentSet: location.fulfillment_sets?.find(
          (f) => f.type === "shipping" /* Shipping */
        )
      }
    )
  ] });
};
function ShippingOption({
  option,
  fulfillmentSetId,
  locationId
}) {
  const prompt = usePrompt();
  const { t } = useTranslation();
  const isStoreOption = isOptionEnabledInStore(option);
  const { mutateAsync } = useDeleteShippingOption(option.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("stockLocations.shippingOptions.delete.confirmation", {
        name: option.name
      }),
      verificationInstruction: t("general.typeToConfirm"),
      verificationText: option.name,
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("stockLocations.shippingOptions.delete.successToast", {
            name: option.name
          })
        );
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-3 py-2", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex-1", children: /* @__PURE__ */ jsxs(Text, { size: "small", weight: "plus", children: [
      option.name,
      " - ",
      option.shipping_profile.name,
      " (",
      formatProvider(option.provider_id),
      ")"
    ] }) }),
    /* @__PURE__ */ jsx2(
      Badge,
      {
        className: "mr-4",
        color: isStoreOption ? "grey" : "purple",
        size: "2xsmall",
        rounded: "full",
        children: isStoreOption ? t("general.store") : t("general.admin")
      }
    ),
    /* @__PURE__ */ jsx2(
      ActionMenu,
      {
        groups: [
          {
            actions: [
              {
                icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
                label: t("stockLocations.shippingOptions.edit.action"),
                to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${option.service_zone_id}/shipping-option/${option.id}/edit`
              },
              {
                label: t("stockLocations.shippingOptions.pricing.action"),
                icon: /* @__PURE__ */ jsx2(CurrencyDollar, {}),
                disabled: option.price_type === "calculated" /* Calculated */,
                to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${option.service_zone_id}/shipping-option/${option.id}/pricing`
              }
            ]
          },
          {
            actions: [
              {
                label: t("actions.delete"),
                icon: /* @__PURE__ */ jsx2(Trash, {}),
                onClick: handleDelete
              }
            ]
          }
        ]
      }
    )
  ] });
}
function ServiceZoneOptions({
  zone,
  locationId,
  fulfillmentSetId,
  type
}) {
  const { t } = useTranslation();
  const shippingOptions = zone.shipping_options.filter(
    (o) => !isReturnOption(o)
  );
  const returnOptions = zone.shipping_options.filter((o) => isReturnOption(o));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4 px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "item-center flex justify-between", children: [
        /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-subtle txt-small self-center font-medium", children: t(`stockLocations.shippingOptions.create.${type}.label`) }),
        /* @__PURE__ */ jsx2(
          LinkButton,
          {
            to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${zone.id}/shipping-option/create`,
            children: t("stockLocations.shippingOptions.create.action")
          }
        )
      ] }),
      !!shippingOptions.length && /* @__PURE__ */ jsx2("div", { className: "shadow-elevation-card-rest bg-ui-bg-subtle grid divide-y rounded-md", children: shippingOptions.map((o) => /* @__PURE__ */ jsx2(
        ShippingOption,
        {
          option: o,
          locationId,
          fulfillmentSetId
        },
        o.id
      )) })
    ] }),
    /* @__PURE__ */ jsx2(Divider, { variant: "dashed" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4 px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "item-center flex justify-between", children: [
        /* @__PURE__ */ jsx2("span", { className: "text-ui-fg-subtle txt-small self-center font-medium", children: t("stockLocations.shippingOptions.create.returns.label") }),
        /* @__PURE__ */ jsx2(
          LinkButton,
          {
            to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${zone.id}/shipping-option/create?is_return`,
            children: t("stockLocations.shippingOptions.create.action")
          }
        )
      ] }),
      !!returnOptions.length && /* @__PURE__ */ jsx2("div", { className: "shadow-elevation-card-rest bg-ui-bg-subtle grid divide-y rounded-md", children: returnOptions.map((o) => /* @__PURE__ */ jsx2(
        ShippingOption,
        {
          option: o,
          locationId,
          fulfillmentSetId
        },
        o.id
      )) })
    ] })
  ] });
}
function ServiceZone({
  zone,
  locationId,
  fulfillmentSetId,
  type
}) {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const [open, setOpen] = useState(true);
  const { mutateAsync: deleteZone } = useDeleteFulfillmentServiceZone(
    fulfillmentSetId,
    zone.id
  );
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("stockLocations.serviceZones.delete.confirmation", {
        name: zone.name
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await deleteZone(void 0, {
      onError: (e) => {
        toast.error(e.message);
      },
      onSuccess: () => {
        toast.success(
          t("stockLocations.serviceZones.delete.successToast", {
            name: zone.name
          })
        );
      }
    });
  };
  const countries2 = useMemo(() => {
    const countryGeoZones = zone.geo_zones.filter((g) => g.type === "country");
    const countries3 = countryGeoZones.map(
      ({ country_code }) => countries.find((c) => c.iso_2 === country_code)
    ).filter((c) => !!c);
    if (process.env.NODE_ENV === "development" && countryGeoZones.length !== countries3.length) {
      console.warn(
        "Some countries are missing in the static countries list",
        countryGeoZones.filter((g) => !countries3.find((c) => c.iso_2 === g.country_code)).map((g) => g.country_code)
      );
    }
    return countries3.sort((c1, c2) => c1.name.localeCompare(c2.name));
  }, [zone.geo_zones]);
  const [shippingOptionsCount, returnOptionsCount] = useMemo(() => {
    const options = zone.shipping_options;
    const optionsCount = options.filter((o) => !isReturnOption(o)).length;
    const returnOptionsCount2 = options.filter(isReturnOption).length;
    return [optionsCount, returnOptionsCount2];
  }, [zone.shipping_options]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between gap-x-4 px-6 py-4", children: [
      /* @__PURE__ */ jsx2(IconAvatar, { children: /* @__PURE__ */ jsx2(Map, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "grow-1 flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: zone.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx2(
            ListSummary,
            {
              variant: "base",
              list: countries2.map((c) => c.display_name),
              inline: true,
              n: 1
            }
          ),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2(Text, { className: "text-ui-fg-subtle txt-small", children: t(`stockLocations.shippingOptions.fields.count.${type}`, {
            count: shippingOptionsCount
          }) }),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2(Text, { className: "text-ui-fg-subtle txt-small", children: t("stockLocations.shippingOptions.fields.count.returns", {
            count: returnOptionsCount
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex grow-0 items-center gap-4", children: [
        /* @__PURE__ */ jsx2(
          IconButton,
          {
            size: "small",
            onClick: () => setOpen((s) => !s),
            variant: "transparent",
            children: /* @__PURE__ */ jsx2(
              TriangleDownMini,
              {
                style: {
                  transform: `rotate(${!open ? 0 : 180}deg)`,
                  transition: ".2s transform ease-in-out"
                }
              }
            )
          }
        ),
        /* @__PURE__ */ jsx2(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
                    to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${zone.id}/edit`
                  },
                  {
                    label: t("stockLocations.serviceZones.manageAreas.action"),
                    icon: /* @__PURE__ */ jsx2(Map, {}),
                    to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSetId}/service-zone/${zone.id}/areas`
                  }
                ]
              },
              {
                actions: [
                  {
                    label: t("actions.delete"),
                    icon: /* @__PURE__ */ jsx2(Trash, {}),
                    onClick: handleDelete
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsx2(
      ServiceZoneOptions,
      {
        fulfillmentSetId,
        locationId,
        type,
        zone
      }
    )
  ] });
}
function FulfillmentSet(props) {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { fulfillmentSet, locationName, locationId, type } = props;
  const fulfillmentSetExists = !!fulfillmentSet;
  const hasServiceZones = !!fulfillmentSet?.service_zones.length;
  const { mutateAsync: createFulfillmentSet } = useCreateStockLocationFulfillmentSet(locationId);
  const { mutateAsync: deleteFulfillmentSet } = useDeleteFulfillmentSet(
    fulfillmentSet?.id
  );
  const handleCreate = async () => {
    await createFulfillmentSet(
      {
        name: `${locationName} ${type === "pickup" /* Pickup */ ? "pick up" : type}`,
        type
      },
      {
        onSuccess: () => {
          toast.success(t(`stockLocations.fulfillmentSets.enable.${type}`));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  };
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t(`stockLocations.fulfillmentSets.disable.confirmation`, {
        name: fulfillmentSet?.name
      }),
      confirmText: t("actions.disable"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await deleteFulfillmentSet(void 0, {
      onSuccess: () => {
        toast.success(t(`stockLocations.fulfillmentSets.disable.${type}`));
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  const groups = fulfillmentSet ? [
    {
      actions: [
        {
          icon: /* @__PURE__ */ jsx2(Plus, {}),
          label: t("stockLocations.serviceZones.create.action"),
          to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSet.id}/service-zones/create`
        }
      ]
    },
    {
      actions: [
        {
          icon: /* @__PURE__ */ jsx2(Trash, {}),
          label: t("actions.disable"),
          onClick: handleDelete
        }
      ]
    }
  ] : [
    {
      actions: [
        {
          icon: /* @__PURE__ */ jsx2(Plus, {}),
          label: t("actions.enable"),
          onClick: handleCreate
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsx2(Container, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col divide-y", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t(`stockLocations.fulfillmentSets.${type}.header`) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx2(StatusBadge, { color: fulfillmentSetExists ? "green" : "grey", children: t(
          fulfillmentSetExists ? "statuses.enabled" : "statuses.disabled"
        ) }),
        /* @__PURE__ */ jsx2(ActionMenu, { groups })
      ] })
    ] }),
    fulfillmentSetExists && !hasServiceZones && /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-center py-8 pt-6", children: /* @__PURE__ */ jsx2(
      NoRecords,
      {
        message: t("stockLocations.serviceZones.fields.noRecords"),
        className: "h-fit",
        action: {
          to: `/settings/locations/${locationId}/fulfillment-set/${fulfillmentSet.id}/service-zones/create`,
          label: t("stockLocations.serviceZones.create.action")
        }
      }
    ) }),
    hasServiceZones && /* @__PURE__ */ jsx2("div", { className: "flex flex-col divide-y", children: fulfillmentSet?.service_zones.map((zone) => /* @__PURE__ */ jsx2(
      ServiceZone,
      {
        zone,
        type,
        locationId,
        fulfillmentSetId: fulfillmentSet.id
      },
      zone.id
    )) })
  ] }) });
}
var Actions = ({ location }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync } = useDeleteStockLocation(location.id);
  const prompt = usePrompt();
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("stockLocations.delete.confirmation", {
        name: location.name
      }),
      verificationText: location.name,
      verificationInstruction: t("general.typeToConfirm"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("stockLocations.create.successToast", {
            name: location.name
          })
        );
        navigate("/settings/locations", { replace: true });
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsx2(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
              label: t("actions.edit"),
              to: `edit`
            },
            {
              icon: /* @__PURE__ */ jsx2(ArchiveBox, {}),
              label: t("stockLocations.edit.viewInventory"),
              to: `/inventory?location_id=${location.id}`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx2(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};

// src/routes/locations/location-detail/components/location-sales-channels-section/locations-sales-channels-section.tsx
import { Channels, PencilSquare as PencilSquare2 } from "@medusajs/icons";
import { Container as Container2, Heading as Heading2, Text as Text2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function LocationsSalesChannelsSection({
  location
}) {
  const { t } = useTranslation2();
  const { count } = useSalesChannels({ limit: 1, fields: "id" });
  const hasConnectedChannels = !!location.sales_channels?.length;
  return /* @__PURE__ */ jsxs2(Container2, { className: "flex flex-col px-6 py-4", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("stockLocations.salesChannels.header") }),
      /* @__PURE__ */ jsx3(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "sales-channels",
                  icon: /* @__PURE__ */ jsx3(PencilSquare2, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    hasConnectedChannels ? /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-4 pt-4", children: [
      /* @__PURE__ */ jsxs2("div", { className: "grid grid-cols-[28px_1fr] items-center gap-x-3", children: [
        /* @__PURE__ */ jsx3(IconAvatar, { children: /* @__PURE__ */ jsx3(Channels, { className: "text-ui-fg-subtle" }) }),
        /* @__PURE__ */ jsx3(
          ListSummary,
          {
            n: 3,
            className: "text-ui-fg-base",
            inline: true,
            list: location.sales_channels?.map((sc) => sc.name) ?? []
          }
        )
      ] }),
      /* @__PURE__ */ jsx3(Text2, { className: "text-ui-fg-subtle", size: "small", leading: "compact", children: t("stockLocations.salesChannels.connectedTo", {
        count: location.sales_channels?.length,
        total: count
      }) })
    ] }) : /* @__PURE__ */ jsx3(
      NoRecords,
      {
        className: "h-fit pb-2 pt-6",
        action: {
          label: t("stockLocations.salesChannels.action"),
          to: "sales-channels"
        },
        message: t("stockLocations.salesChannels.noChannels")
      }
    )
  ] });
}
var locations_sales_channels_section_default = LocationsSalesChannelsSection;

// src/routes/locations/location-detail/components/location-fulfillment-providers-section/location-fulfillment-providers-section.tsx
import { HandTruck, PencilSquare as PencilSquare3 } from "@medusajs/icons";
import { Container as Container3, Heading as Heading3 } from "@medusajs/ui";
import { Fragment as Fragment2 } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function LocationsFulfillmentProvidersSection({
  location
}) {
  const { t } = useTranslation3();
  const { fulfillment_providers } = useFulfillmentProviders({
    stock_location_id: location.id,
    fields: "id",
    is_enabled: true
  });
  return /* @__PURE__ */ jsxs3(Container3, { className: "flex flex-col px-6 py-4", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx4(Heading3, { level: "h2", children: t("stockLocations.fulfillmentProviders.header") }),
      /* @__PURE__ */ jsx4(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "fulfillment-providers",
                  icon: /* @__PURE__ */ jsx4(PencilSquare3, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    fulfillment_providers?.length ? /* @__PURE__ */ jsx4("div", { className: "flex flex-col gap-y-4 pt-4", children: /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-[28px_1fr] items-center gap-x-3 gap-y-3", children: fulfillment_providers?.map((fulfillmentProvider) => {
      return /* @__PURE__ */ jsxs3(Fragment2, { children: [
        /* @__PURE__ */ jsx4(IconAvatar, { children: /* @__PURE__ */ jsx4(HandTruck, { className: "text-ui-fg-subtle" }) }),
        /* @__PURE__ */ jsx4("div", { className: "txt-compact-small", children: formatProvider(fulfillmentProvider.id) })
      ] }, fulfillmentProvider.id);
    }) }) }) : /* @__PURE__ */ jsx4(
      NoRecords,
      {
        className: "h-fit pb-2 pt-6 text-center",
        action: {
          label: t("stockLocations.fulfillmentProviders.action"),
          to: "fulfillment-providers"
        },
        message: t("stockLocations.fulfillmentProviders.noProviders")
      }
    )
  ] });
}
var location_fulfillment_providers_section_default = LocationsFulfillmentProvidersSection;

// src/routes/locations/location-detail/location-detail.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var LocationDetail = () => {
  const initialData = useLoaderData();
  const { location_id } = useParams();
  const {
    stock_location: location,
    isPending: isLoading,
    isError,
    error
  } = useStockLocation(
    location_id,
    { fields: LOCATION_DETAILS_FIELD },
    { initialData }
  );
  const { getWidgets } = useExtension();
  if (isLoading || !location) {
    return /* @__PURE__ */ jsx5(TwoColumnPageSkeleton, { mainSections: 3, sidebarSections: 2, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs4(
    TwoColumnPage,
    {
      widgets: {
        after: getWidgets("location.details.after"),
        before: getWidgets("location.details.before"),
        sideAfter: getWidgets("location.details.side.after"),
        sideBefore: getWidgets("location.details.side.before")
      },
      data: location,
      showJSON: true,
      hasOutlet: true,
      children: [
        /* @__PURE__ */ jsx5(TwoColumnPage.Main, { children: /* @__PURE__ */ jsx5(LocationGeneralSection, { location }) }),
        /* @__PURE__ */ jsxs4(TwoColumnPage.Sidebar, { children: [
          /* @__PURE__ */ jsx5(locations_sales_channels_section_default, { location }),
          /* @__PURE__ */ jsx5(location_fulfillment_providers_section_default, { location })
        ] })
      ]
    }
  );
};
export {
  LocationDetailBreadcrumb as Breadcrumb,
  LocationDetail as Component,
  locationLoader as loader
};
