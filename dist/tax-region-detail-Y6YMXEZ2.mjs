import {
  TaxOverrideTable,
  TaxRateLine,
  useTaxOverrideTable
} from "./chunk-KESQIJZQ.mjs";
import "./chunk-V3MOBCDF.mjs";
import {
  TaxRegionTable,
  useTaxRegionTable
} from "./chunk-ATYH24XU.mjs";
import {
  TaxRegionCard
} from "./chunk-4FUGAJJD.mjs";
import {
  getCountryProvinceObjectByIso2
} from "./chunk-THZJC662.mjs";
import {
  useTaxRateTableQuery
} from "./chunk-I5HYE2RW.mjs";
import {
  useTaxRegionTableQuery
} from "./chunk-RIV7FKGN.mjs";
import "./chunk-3WXBLS2P.mjs";
import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-EQTBJSBZ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import {
  TaxRegionDetailBreadcrumb,
  taxRegionLoader
} from "./chunk-NQIC7ZFS.mjs";
import "./chunk-DG7J63J2.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import {
  useTaxRates
} from "./chunk-X6DSNTTX.mjs";
import {
  useTaxRegion,
  useTaxRegions
} from "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/tax-regions/tax-region-detail/tax-region-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";
import { useState as useState2 } from "react";

// src/routes/tax-regions/tax-region-detail/components/tax-region-detail-section/tax-region-detail-section.tsx
import { Badge, Container, Tooltip } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionDetailSection = ({
  taxRegion
}) => {
  const { t } = useTranslation();
  const defaultRates = taxRegion.tax_rates.filter((r) => r.is_default === true);
  const showBage = defaultRates.length === 0;
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx(
      TaxRegionCard,
      {
        taxRegion,
        type: "header",
        asLink: false,
        badge: showBage && /* @__PURE__ */ jsx(Tooltip, { content: t("taxRegions.fields.noDefaultRate.tooltip"), children: /* @__PURE__ */ jsx(Badge, { color: "orange", size: "2xsmall", className: "cursor-default", children: t("taxRegions.fields.noDefaultRate.label") }) })
      }
    ),
    defaultRates.map((rate) => {
      return /* @__PURE__ */ jsx(TaxRateLine, { taxRate: rate }, rate.id);
    })
  ] });
};

// src/routes/tax-regions/tax-region-detail/components/tax-region-province-section/tax-region-province-section.tsx
import { Container as Container2, Heading } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "p";
var TaxRegionProvinceSection = ({
  taxRegion,
  showSublevelRegions
}) => {
  const { t } = useTranslation2();
  const { searchParams, raw } = useTaxRegionTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { tax_regions, count, isPending, isError, error } = useTaxRegions(
    {
      ...searchParams,
      parent_id: taxRegion.id
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const { table } = useTaxRegionTable({
    count,
    data: tax_regions,
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const provinceObject = getCountryProvinceObjectByIso2(taxRegion.country_code);
  if (!provinceObject && !showSublevelRegions && !taxRegion.children.length) {
    return null;
  }
  const type = provinceObject?.type || "sublevel";
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx2(Container2, { className: "divide-y p-0", children: /* @__PURE__ */ jsx2(
    TaxRegionTable,
    {
      variant: "province",
      action: { to: `provinces/create`, label: t("actions.create") },
      table,
      isPending,
      queryObject: raw,
      count,
      children: /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t(`taxRegions.${type}.header`) })
    }
  ) });
};

// src/routes/tax-regions/tax-region-detail/components/tax-region-override-section/tax-region-override-section.tsx
import { Container as Container3, Heading as Heading2 } from "@medusajs/ui";
import { keepPreviousData as keepPreviousData2 } from "@tanstack/react-query";
import { useTranslation as useTranslation3 } from "react-i18next";
import { jsx as jsx3 } from "react/jsx-runtime";
var PAGE_SIZE2 = 10;
var PREFIX2 = "o";
var TaxRegionOverrideSection = ({
  taxRegion
}) => {
  const { t } = useTranslation3();
  const { searchParams, raw } = useTaxRateTableQuery({
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  const { tax_rates, count, isPending, isError, error } = useTaxRates(
    {
      ...searchParams,
      tax_region_id: taxRegion.id,
      is_default: false
    },
    {
      placeholderData: keepPreviousData2
    }
  );
  const { table } = useTaxOverrideTable({
    count,
    data: tax_rates,
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(Container3, { className: "p-0", children: /* @__PURE__ */ jsx3(
    TaxOverrideTable,
    {
      isPending,
      table,
      count,
      action: {
        label: t("actions.create"),
        to: "overrides/create"
      },
      queryObject: raw,
      prefix: PREFIX2,
      children: /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("taxRegions.taxOverrides.header") })
    }
  ) });
};

// src/routes/tax-regions/tax-region-detail/components/tax-region-sublevel-alert/tax-region-sublevel-alert.tsx
import { Alert, Button, Text } from "@medusajs/ui";
import { useState } from "react";
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxRegionSublevelAlert = ({
  taxRegion,
  showSublevelRegions,
  setShowSublevelRegions
}) => {
  const { t } = useTranslation4();
  const [dismissed, setDismissed] = useState(false);
  const provinceObject = getCountryProvinceObjectByIso2(taxRegion.country_code);
  if (provinceObject || showSublevelRegions || dismissed || taxRegion.children.length) {
    return null;
  }
  return /* @__PURE__ */ jsx4(Alert, { dismissible: true, variant: "info", className: "bg-ui-bg-base", children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-3", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx4(Text, { size: "small", leading: "compact", weight: "plus", asChild: true, children: /* @__PURE__ */ jsx4("h2", { children: t("taxRegions.fields.sublevels.alert.header") }) }),
      /* @__PURE__ */ jsx4(Text, { size: "small", leading: "compact", className: "text-pretty", children: t("taxRegions.fields.sublevels.alert.description") })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx4(
        Button,
        {
          variant: "secondary",
          size: "small",
          onClick: () => setShowSublevelRegions(true),
          children: t("taxRegions.fields.sublevels.alert.action")
        }
      ),
      /* @__PURE__ */ jsx4(
        Button,
        {
          variant: "transparent",
          size: "small",
          onClick: () => setDismissed(true),
          children: t("actions.hide")
        }
      )
    ] })
  ] }) });
};

// src/routes/tax-regions/tax-region-detail/tax-region-provider-section/tax-region-provider-section.tsx
import { useTranslation as useTranslation5 } from "react-i18next";
import { Container as Container4, Heading as Heading3 } from "@medusajs/ui";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function TaxRegionProviderSection({
  taxRegion
}) {
  const { t } = useTranslation5();
  return /* @__PURE__ */ jsxs3(Container4, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx5(Heading3, { level: "h2", className: "px-6 py-4", children: t("taxRegions.provider.header") }),
    /* @__PURE__ */ jsx5("div", { className: "px-6 py-4", children: taxRegion.provider_id && /* @__PURE__ */ jsx5("span", { className: "text-ui-fg-subtle", children: formatProvider(taxRegion.provider_id) }) })
  ] });
}

// src/routes/tax-regions/tax-region-detail/tax-region-detail.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var TaxRegionDetail = () => {
  const { id } = useParams();
  const [showSublevelRegions, setShowSublevelRegions] = useState2(false);
  const initialData = useLoaderData();
  const {
    tax_region: taxRegion,
    isLoading,
    isError,
    error
  } = useTaxRegion(id, void 0, { initialData });
  const { getWidgets } = useExtension();
  if (isLoading || !taxRegion) {
    return /* @__PURE__ */ jsx6(SingleColumnPageSkeleton, { sections: 4, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs4(
    SingleColumnPage,
    {
      data: taxRegion,
      showJSON: true,
      widgets: {
        after: getWidgets("tax.details.after"),
        before: getWidgets("tax.details.before")
      },
      children: [
        /* @__PURE__ */ jsx6(
          TaxRegionSublevelAlert,
          {
            taxRegion,
            showSublevelRegions,
            setShowSublevelRegions
          }
        ),
        /* @__PURE__ */ jsx6(TaxRegionDetailSection, { taxRegion }),
        /* @__PURE__ */ jsx6(
          TaxRegionProvinceSection,
          {
            taxRegion,
            showSublevelRegions
          }
        ),
        /* @__PURE__ */ jsx6(TaxRegionOverrideSection, { taxRegion }),
        /* @__PURE__ */ jsx6(TaxRegionProviderSection, { taxRegion })
      ]
    }
  );
};
export {
  TaxRegionDetailBreadcrumb as Breadcrumb,
  TaxRegionDetail as Component,
  TaxRegionDetail,
  taxRegionLoader as loader
};
