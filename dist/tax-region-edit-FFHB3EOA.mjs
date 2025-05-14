import {
  formatProvider
} from "./chunk-IR5DHEKS.mjs";
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
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import {
  useTaxRegion,
  useUpdateTaxRegion
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
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/tax-regions/tax-region-edit/tax-region-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/tax-regions/tax-region-edit/components/tax-region-edit/tax-region-edit-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var TaxRegionEditSchema = z.object({
  provider_id: z.string().min(1)
});
var TaxRegionEditForm = ({ taxRegion }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const taxProviders = useComboboxData({
    queryKey: ["tax_providers"],
    queryFn: (params) => sdk.admin.taxProvider.list(params),
    getOptions: (data) => data.tax_providers.map((provider) => ({
      label: formatProvider(provider.id),
      value: provider.id
    }))
  });
  const form = useForm({
    defaultValues: {
      provider_id: taxRegion.provider_id
    },
    resolver: zodResolver(TaxRegionEditSchema)
  });
  const { mutateAsync, isPending } = useUpdateTaxRegion(taxRegion.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(
      {
        provider_id: values.provider_id
      },
      {
        onSuccess: () => {
          toast.success(t("taxRegions.edit.successToast"));
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex flex-1 flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-6 overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-4", children: /* @__PURE__ */ jsx(
          Form.Field,
          {
            control: form.control,
            name: "provider_id",
            render: ({ field }) => /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxProvider") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                Combobox,
                {
                  ...field,
                  options: taxProviders.options,
                  searchValue: taxProviders.searchValue,
                  onSearchValueChange: taxProviders.onSearchValueChange,
                  fetchNextPage: taxProviders.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] })
          }
        ) }) }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { className: "shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/tax-regions/tax-region-edit/tax-region-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxRegionEdit = () => {
  const { t } = useTranslation2();
  const { id } = useParams();
  const { tax_region, isPending, isError, error } = useTaxRegion(id);
  const ready = !isPending && !!tax_region;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading, { children: t("taxRegions.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("taxRegions.edit.hint") })
    ] }),
    ready && /* @__PURE__ */ jsx2(TaxRegionEditForm, { taxRegion: tax_region })
  ] });
};
export {
  TaxRegionEdit as Component
};
