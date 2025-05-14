import {
  useCurrenciesTableColumns,
  useCurrenciesTableQuery
} from "./chunk-NEZX6265.mjs";
import "./chunk-MSDRGCRR.mjs";
import {
  StatusCell
} from "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
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
import {
  useCurrencies
} from "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import {
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import {
  useSalesChannel
} from "./chunk-PNU5HPGY.mjs";
import {
  retrieveActiveStore,
  storeQueryKeys,
  useStore,
  useUpdateStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegion
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/store/store-detail/loader.ts
var storeDetailQuery = () => ({
  queryKey: storeQueryKeys.details(),
  queryFn: async () => retrieveActiveStore()
});
var storeLoader = async () => {
  const query = storeDetailQuery();
  return queryClient.getQueryData(query.queryKey) ?? await queryClient.fetchQuery(query);
};

// src/routes/store/store-detail/store-detail.tsx
import { useLoaderData } from "react-router-dom";

// src/routes/store/store-detail/components/store-general-section/store-general-section.tsx
import { PencilSquare } from "@medusajs/icons";
import { Badge, Container, Heading, Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var StoreGeneralSection = ({ store }) => {
  const { t } = useTranslation();
  const { region } = useRegion(store.default_region_id, void 0, {
    enabled: !!store.default_region_id
  });
  const defaultCurrency = store.supported_currencies?.find((c) => c.is_default);
  const { sales_channel } = useSalesChannel(store.default_sales_channel_id, {
    enabled: !!store.default_sales_channel_id
  });
  const { stock_location } = useStockLocation(
    store.default_location_id,
    {
      fields: "id,name"
    },
    {
      enabled: !!store.default_location_id
    }
  );
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Heading, { children: t("store.domain") }),
        /* @__PURE__ */ jsx(Text, { className: "text-ui-fg-subtle", size: "small", children: t("store.manageYourStoresDetails") })
      ] }),
      /* @__PURE__ */ jsx(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  icon: /* @__PURE__ */ jsx(PencilSquare, {}),
                  label: t("actions.edit"),
                  to: "edit"
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.name") }),
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: store.name })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("store.defaultCurrency") }),
      defaultCurrency ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx(Badge, { size: "2xsmall", children: defaultCurrency.currency_code?.toUpperCase() }),
        /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: defaultCurrency.currency?.name })
      ] }) : /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "-" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("store.defaultRegion") }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: region ? /* @__PURE__ */ jsx(Badge, { size: "2xsmall", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `/settings/regions/${region.id}`, children: region.name }) }) : /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "-" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("store.defaultSalesChannel") }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: sales_channel ? /* @__PURE__ */ jsx(Badge, { size: "2xsmall", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `/settings/sales-channels/${sales_channel.id}`, children: sales_channel.name }) }) : /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "-" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", weight: "plus", children: t("store.defaultLocation") }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: stock_location ? /* @__PURE__ */ jsx(Badge, { size: "2xsmall", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `/settings/locations/${stock_location.id}`, children: stock_location.name }) }) : /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: "-" }) })
    ] })
  ] });
};

// src/routes/store/store-detail/components/store-currency-section/store-currency-section.tsx
import { CheckCircle, Plus, Trash, XCircle } from "@medusajs/icons";
import {
  Checkbox,
  CommandBar,
  Container as Container2,
  Heading as Heading2,
  toast,
  usePrompt
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var StoreCurrencySection = ({ store }) => {
  const [rowSelection, setRowSelection] = useState({});
  const { searchParams, raw } = useCurrenciesTableQuery({ pageSize: PAGE_SIZE });
  const {
    currencies,
    count,
    isPending: isCurrenciesPending,
    isError: isCurrenciesError,
    error: currenciesError
  } = useCurrencies(
    {
      code: store.supported_currencies?.map((c) => c.currency_code),
      ...searchParams
    },
    {
      placeholderData: keepPreviousData,
      enabled: !!store.supported_currencies?.length
    }
  );
  const {
    price_preferences: pricePreferences,
    isPending: isPricePreferencesPending,
    isError: isPricePreferencesError,
    error: pricePreferencesError
  } = usePricePreferences(
    {
      attribute: "currency_code",
      value: store.supported_currencies?.map((c) => c.currency_code)
    },
    {
      enabled: !!store.supported_currencies?.length
    }
  );
  const columns = useColumns();
  const prefMap = useMemo(() => {
    return new Map(pricePreferences?.map((pref) => [pref.value, pref]));
  }, [pricePreferences]);
  const withTaxInclusivity = currencies?.map((c) => ({
    ...c,
    is_tax_inclusive: prefMap.get(c.code)?.is_tax_inclusive
  }));
  const { table } = useDataTable({
    data: withTaxInclusivity ?? [],
    columns,
    count,
    getRowId: (row) => row.code,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    },
    enablePagination: true,
    enableRowSelection: true,
    pageSize: PAGE_SIZE,
    meta: {
      storeId: store.id,
      supportedCurrencies: store.supported_currencies,
      defaultCurrencyCode: store.supported_currencies?.find((c) => c.is_default)?.currency_code,
      preferencesMap: prefMap
    }
  });
  const { mutateAsync } = useUpdateStore(store.id);
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const handleDeleteCurrencies = async () => {
    const ids = Object.keys(rowSelection);
    const result = await prompt({
      title: t("general.areYouSure"),
      description: t("store.removeCurrencyWarning", {
        count: ids.length
      }),
      confirmText: t("actions.remove"),
      cancelText: t("actions.cancel")
    });
    if (!result) {
      return;
    }
    await mutateAsync(
      {
        supported_currencies: store.supported_currencies?.filter(
          (c) => !ids.includes(c.currency_code)
        ) ?? []
      },
      {
        onSuccess: () => {
          setRowSelection({});
          toast.success(t("store.toast.currenciesRemoved"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  };
  if (isCurrenciesError) {
    throw currenciesError;
  }
  if (isPricePreferencesError) {
    throw pricePreferencesError;
  }
  const isLoading = isCurrenciesPending || isPricePreferencesPending;
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading2, { level: "h2", children: t("store.currencies") }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  icon: /* @__PURE__ */ jsx2(Plus, {}),
                  label: t("actions.add"),
                  to: "currencies"
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
        orderBy: [
          { key: "name", label: t("fields.name") },
          { key: "code", label: t("fields.code") }
        ],
        search: true,
        pagination: true,
        table,
        pageSize: PAGE_SIZE,
        columns,
        count: !store.supported_currencies?.length ? 0 : count,
        isLoading: !store.supported_currencies?.length ? false : isLoading,
        queryObject: raw
      }
    ),
    /* @__PURE__ */ jsx2(CommandBar, { open: !!Object.keys(rowSelection).length, children: /* @__PURE__ */ jsxs2(CommandBar.Bar, { children: [
      /* @__PURE__ */ jsx2(CommandBar.Value, { children: t("general.countSelected", {
        count: Object.keys(rowSelection).length
      }) }),
      /* @__PURE__ */ jsx2(CommandBar.Seperator, {}),
      /* @__PURE__ */ jsx2(
        CommandBar.Command,
        {
          action: handleDeleteCurrencies,
          shortcut: "r",
          label: t("actions.remove")
        }
      )
    ] }) })
  ] });
};
var CurrencyActions = ({
  storeId,
  currency,
  supportedCurrencies,
  defaultCurrencyCode,
  preferencesMap
}) => {
  const { mutateAsync } = useUpdateStore(storeId);
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const handleRemove = async () => {
    const result = await prompt({
      title: t("general.areYouSure"),
      description: t("store.removeCurrencyWarning", {
        count: 1
      }),
      verificationInstruction: t("general.typeToConfirm"),
      verificationText: currency.name,
      confirmText: t("actions.remove"),
      cancelText: t("actions.cancel")
    });
    if (!result) {
      return;
    }
    await mutateAsync(
      {
        supported_currencies: supportedCurrencies.filter(
          (c) => c.currency_code !== currency.code
        )
      },
      {
        onSuccess: () => {
          toast.success(t("store.toast.currenciesRemoved"));
        },
        onError: (e) => {
          toast.error(e.message);
        }
      }
    );
  };
  const handleToggleTaxInclusivity = async () => {
    await mutateAsync(
      {
        supported_currencies: supportedCurrencies.map((c) => {
          const pref = preferencesMap.get(c.currency_code);
          return {
            ...c,
            is_tax_inclusive: c.currency_code === currency.code ? !pref?.is_tax_inclusive : void 0
          };
        })
      },
      {
        onSuccess: () => {
          toast.success(t("store.toast.updatedTaxInclusivitySuccessfully"));
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
              icon: preferencesMap.get(currency.code)?.is_tax_inclusive ? /* @__PURE__ */ jsx2(XCircle, {}) : /* @__PURE__ */ jsx2(CheckCircle, {}),
              label: preferencesMap.get(currency.code)?.is_tax_inclusive ? t("store.disableTaxInclusivePricing") : t("store.enableTaxInclusivePricing"),
              onClick: handleToggleTaxInclusivity
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx2(Trash, {}),
              label: t("actions.remove"),
              onClick: handleRemove,
              disabled: currency.code === defaultCurrencyCode
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useCurrenciesTableColumns();
  const { t } = useTranslation2();
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
      columnHelper.accessor("is_tax_inclusive", {
        header: t("fields.taxInclusivePricing"),
        cell: ({ getValue }) => {
          const isTaxInclusive = getValue();
          return /* @__PURE__ */ jsx2(StatusCell, { color: isTaxInclusive ? "green" : "grey", children: isTaxInclusive ? t("fields.true") : t("fields.false") });
        }
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row, table }) => {
          const {
            supportedCurrencies,
            storeId,
            defaultCurrencyCode,
            preferencesMap
          } = table.options.meta;
          return /* @__PURE__ */ jsx2(
            CurrencyActions,
            {
              storeId,
              currency: row.original,
              supportedCurrencies,
              defaultCurrencyCode,
              preferencesMap
            }
          );
        }
      })
    ],
    [base, t]
  );
};

// src/routes/store/store-detail/store-detail.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var StoreDetail = () => {
  const initialData = useLoaderData();
  const { store, isPending, isError, error } = useStore(void 0, {
    initialData
  });
  const { getWidgets } = useExtension();
  if (isPending || !store) {
    return /* @__PURE__ */ jsx3(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("store.details.before"),
        after: getWidgets("store.details.after")
      },
      data: store,
      hasOutlet: true,
      showMetadata: true,
      showJSON: true,
      children: [
        /* @__PURE__ */ jsx3(StoreGeneralSection, { store }),
        /* @__PURE__ */ jsx3(StoreCurrencySection, { store })
      ]
    }
  );
};
export {
  StoreDetail as Component,
  storeLoader as loader
};
