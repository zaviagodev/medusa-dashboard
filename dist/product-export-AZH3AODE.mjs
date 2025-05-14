import "./chunk-GW6TVOAA.mjs";
import "./chunk-CBSCX7RE.mjs";
import "./chunk-LT4MVCA7.mjs";
import "./chunk-A2UMBW3V.mjs";
import "./chunk-W7625H47.mjs";
import "./chunk-DLZWPHHO.mjs";
import "./chunk-LSEYENCI.mjs";
import "./chunk-FVK4ZYYM.mjs";
import {
  useProductTableFilters
} from "./chunk-FZRIVT5D.mjs";
import {
  DataTableFilter
} from "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
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
import {
  useExportProducts
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-export/product-export.tsx
import { Button, Heading as Heading2, toast } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/products/product-export/components/export-filters.tsx
import { Heading, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var ExportFilters = () => {
  const { t } = useTranslation();
  const filters = useProductTableFilters();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("products.export.filters.title") }),
    /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("products.export.filters.description") }),
    /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(DataTableFilter, { filters, readonly: true }) })
  ] });
};

// src/routes/products/product-export/product-export.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductExport = () => {
  const { t } = useTranslation2();
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading2, { children: t("products.export.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("products.export.description") })
    ] }),
    /* @__PURE__ */ jsx2(ProductExportContent, {})
  ] });
};
var ProductExportContent = () => {
  const { t } = useTranslation2();
  const { mutateAsync } = useExportProducts();
  const { handleSuccess } = useRouteModal();
  const handleExportRequest = async () => {
    await mutateAsync(
      {},
      {
        onSuccess: () => {
          toast.info(t("products.export.success.title"), {
            description: t("products.export.success.description")
          });
          handleSuccess();
        },
        onError: (err) => {
          toast.error(err.message);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Body, { children: /* @__PURE__ */ jsx2(ExportFilters, {}) }),
    /* @__PURE__ */ jsx2(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx2(Button, { onClick: handleExportRequest, size: "small", children: t("actions.export") })
    ] }) })
  ] });
};
export {
  ProductExport as Component
};
