import {
  useCountries,
  useCountryTableColumns,
  useCountryTableQuery
} from "./chunk-NOAFLTPV.mjs";
import {
  ListSummary
} from "./chunk-I3VB6NM2.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import "./chunk-LQTHYS2Z.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SectionRow
} from "./chunk-LFLGEXIG.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  regionsQueryKeys,
  useDeleteRegion,
  useRegion,
  useUpdateRegion
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/regions/region-detail/constants.ts
var REGION_DETAIL_FIELDS = "*payment_providers,*countries,+automatic_taxes";

// src/routes/regions/region-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var RegionDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { region } = useRegion(
    id,
    {
      fields: REGION_DETAIL_FIELDS
    },
    {
      initialData: props.data,
      enabled: Boolean(id)
    }
  );
  if (!region) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: region.name });
};

// src/routes/regions/region-detail/loader.ts
var regionQuery = (id) => ({
  queryKey: regionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.region.retrieve(id, {
    fields: REGION_DETAIL_FIELDS
  })
});
var regionLoader = async ({ params }) => {
  const id = params.id;
  const query = regionQuery(id);
  return queryClient.getQueryData(
    query.queryKey
  ) ?? await queryClient.fetchQuery(query);
};

// src/routes/regions/region-detail/region-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/regions/region-detail/components/region-country-section/region-country-section.tsx
import { PlusMini, Trash } from "@medusajs/icons";
import { Checkbox, Container, Heading, toast, usePrompt } from "@medusajs/ui";
import {
  createColumnHelper
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var PREFIX = "c";
var PAGE_SIZE = 10;
var RegionCountrySection = ({ region }) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const [rowSelection, setRowSelection] = useState({});
  const { searchParams, raw } = useCountryTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { countries, count } = useCountries({
    countries: region.countries || [],
    ...searchParams
  });
  const columns = useColumns();
  const { table } = useDataTable({
    data: countries || [],
    columns,
    count,
    enablePagination: true,
    enableRowSelection: true,
    getRowId: (row) => row.iso_2,
    pageSize: PAGE_SIZE,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    },
    prefix: PREFIX,
    meta: {
      region
    }
  });
  const { mutateAsync } = useUpdateRegion(region.id);
  const handleRemoveCountries = async () => {
    const ids = Object.keys(rowSelection).filter((k) => rowSelection[k]);
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("regions.removeCountriesWarning", {
        count: ids.length
      }),
      verificationText: t("actions.remove"),
      verificationInstruction: t("general.typeToConfirm"),
      cancelText: t("actions.cancel"),
      confirmText: t("actions.remove")
    });
    if (!res) {
      return;
    }
    const payload = region.countries?.filter((c) => !ids.includes(c.iso_2)).map((c) => c.iso_2);
    await mutateAsync(
      {
        countries: payload
      },
      {
        onSuccess: () => {
          toast.success(t("regions.toast.countries"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("fields.countries") }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("regions.addCountries"),
                  icon: /* @__PURE__ */ jsx2(PlusMini, {}),
                  to: "countries/add"
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        count,
        orderBy: [
          { key: "display_name", label: t("fields.name") },
          { key: "iso_2", label: t("fields.code") }
        ],
        search: true,
        pagination: true,
        queryObject: raw,
        prefix: PREFIX,
        commands: [
          {
            action: handleRemoveCountries,
            label: t("actions.remove"),
            shortcut: "r"
          }
        ]
      }
    )
  ] });
};
var CountryActions = ({
  country,
  region
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useUpdateRegion(region.id);
  const payload = region.countries?.filter((c) => c.iso_2 !== country.iso_2).map((c) => c.iso_2);
  const handleRemove = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("regions.removeCountryWarning", {
        name: country.display_name
      }),
      verificationText: country.display_name,
      verificationInstruction: t("general.typeToConfirm"),
      cancelText: t("actions.cancel"),
      confirmText: t("actions.remove")
    });
    if (!res) {
      return;
    }
    await mutateAsync(
      {
        countries: payload
      },
      {
        onSuccess: () => {
          toast.success(t("regions.toast.countries"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  };
  return /* @__PURE__ */ jsx2(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.remove"),
              onClick: handleRemove,
              icon: /* @__PURE__ */ jsx2(Trash, {})
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useCountryTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx2(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx2(
            Checkbox,
            {
              checked: row.getIsSelected(),
              onCheckedChange: (value) => row.toggleSelected(!!value),
              onClick: (e) => {
                e.stopPropagation();
              }
            }
          );
        }
      }),
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row, table }) => {
          const { region } = table.options.meta;
          return /* @__PURE__ */ jsx2(CountryActions, { country: row.original, region });
        }
      })
    ],
    [base]
  );
};

// src/routes/regions/region-detail/components/region-general-section/region-general-section.tsx
import { PencilSquare, Trash as Trash2 } from "@medusajs/icons";
import { Badge, Container as Container2, Heading as Heading2, Text, toast as toast2, usePrompt as usePrompt2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var RegionGeneralSection = ({
  region,
  pricePreferences
}) => {
  const { t } = useTranslation2();
  const pricePreferenceForRegion = pricePreferences?.find(
    (preference) => preference.attribute === "region_id" && preference.value === region.id
  );
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Heading2, { children: region.name }),
      /* @__PURE__ */ jsx3(RegionActions, { region })
    ] }),
    /* @__PURE__ */ jsx3(
      SectionRow,
      {
        title: t("fields.currency"),
        value: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsx3(Badge, { size: "2xsmall", className: "uppercase", children: region.currency_code }),
          /* @__PURE__ */ jsx3(Text, { size: "small", leading: "compact", children: currencies[region.currency_code.toUpperCase()].name })
        ] })
      }
    ),
    /* @__PURE__ */ jsx3(
      SectionRow,
      {
        title: t("fields.automaticTaxes"),
        value: region.automatic_taxes ? t("fields.true") : t("fields.false")
      }
    ),
    /* @__PURE__ */ jsx3(
      SectionRow,
      {
        title: t("fields.taxInclusivePricing"),
        value: pricePreferenceForRegion?.is_tax_inclusive ? t("fields.true") : t("fields.false")
      }
    ),
    /* @__PURE__ */ jsx3(
      SectionRow,
      {
        title: t("fields.paymentProviders"),
        value: /* @__PURE__ */ jsx3("div", { className: "inline-flex", children: region.payment_providers?.length ? /* @__PURE__ */ jsx3(
          ListSummary,
          {
            list: region.payment_providers.map((p) => formatProvider(p.id))
          }
        ) : "-" })
      }
    )
  ] });
};
var RegionActions = ({ region }) => {
  const navigate = useNavigate();
  const { t } = useTranslation2();
  const { mutateAsync } = useDeleteRegion(region.id);
  const prompt = usePrompt2();
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("regions.deleteRegionWarning", {
        name: region.name
      }),
      verificationText: region.name,
      verificationInstruction: t("general.typeToConfirm"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast2.success(t("regions.toast.delete"));
        navigate("/settings/regions", { replace: true });
      },
      onError: (e) => {
        toast2.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsx3(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx3(PencilSquare, {}),
              label: t("actions.edit"),
              to: `/settings/regions/${region.id}/edit`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx3(Trash2, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};

// src/routes/regions/region-detail/region-detail.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var RegionDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const {
    region,
    isPending: isLoading,
    isError: isRegionError,
    error: regionError
  } = useRegion(
    id,
    { fields: REGION_DETAIL_FIELDS },
    {
      initialData
    }
  );
  const {
    price_preferences: pricePreferences,
    isPending: isLoadingPreferences,
    isError: isPreferencesError,
    error: preferencesError
  } = usePricePreferences(
    {
      attribute: "region_id",
      value: id
    },
    { enabled: !!region }
  );
  const { getWidgets } = useExtension();
  if (isLoading || isLoadingPreferences || !region) {
    return /* @__PURE__ */ jsx4(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  if (isRegionError) {
    throw regionError;
  }
  if (isPreferencesError) {
    throw preferencesError;
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("region.details.before"),
        after: getWidgets("region.details.after")
      },
      data: region,
      showMetadata: true,
      showJSON: true,
      children: [
        /* @__PURE__ */ jsx4(
          RegionGeneralSection,
          {
            region,
            pricePreferences: pricePreferences ?? []
          }
        ),
        /* @__PURE__ */ jsx4(RegionCountrySection, { region })
      ]
    }
  );
};
export {
  RegionDetailBreadcrumb as Breadcrumb,
  RegionDetail as Component,
  regionLoader as loader
};
