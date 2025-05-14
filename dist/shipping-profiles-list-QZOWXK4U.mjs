import "./chunk-LQTHYS2Z.mjs";
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
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useDeleteShippingProfile,
  useShippingProfiles
} from "./chunk-PIR2H25N.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/shipping-profile-list-table.tsx
import { Button, Container, Heading, Text } from "@medusajs/ui";
import { Link } from "react-router-dom";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation4 } from "react-i18next";

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/use-shipping-profile-table-columns.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/shipping-options-row-actions.tsx
import { Trash } from "@medusajs/icons";
import { toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var ShippingOptionsRowActions = ({
  profile
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteShippingProfile(profile.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("shippingProfile.delete.title"),
      description: t("shippingProfile.delete.description", {
        name: profile.name
      }),
      verificationText: profile.name,
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
          t("shippingProfile.delete.successToast", {
            name: profile.name
          })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete
            }
          ]
        }
      ]
    }
  );
};

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/use-shipping-profile-table-columns.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useShippingProfileTableColumns = () => {
  const { t } = useTranslation2();
  return useMemo(
    () => [
      columnHelper.accessor("name", {
        header: t("fields.name"),
        cell: (cell) => cell.getValue()
      }),
      columnHelper.accessor("type", {
        header: t("fields.type"),
        cell: (cell) => cell.getValue()
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx2(ShippingOptionsRowActions, { profile: row.original })
      })
    ],
    [t]
  );
};

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/use-shipping-profile-table-filters.tsx
import { useTranslation as useTranslation3 } from "react-i18next";
var useShippingProfileTableFilters = () => {
  const { t } = useTranslation3();
  let filters = [];
  filters.push({
    key: "name",
    label: t("fields.name"),
    type: "string"
  });
  filters.push({
    key: "type",
    label: t("fields.type"),
    type: "string"
  });
  const dateFilters = [
    { label: t("fields.createdAt"), key: "created_at" },
    { label: t("fields.updatedAt"), key: "updated_at" }
  ].map((f) => ({
    key: f.key,
    label: f.label,
    type: "date"
  }));
  filters = [...filters, ...dateFilters];
  return filters;
};

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/use-shipping-profile-table-query.tsx
var useShippingProfileTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(
    ["offset", "q", "order", "created_at", "updated_at", "name", "type"],
    prefix
  );
  const searchParams = {
    limit: pageSize,
    offset: raw.offset ? parseInt(raw.offset) : 0,
    q: raw.q,
    order: raw.order,
    created_at: raw.created_at ? JSON.parse(raw.created_at) : void 0,
    updated_at: raw.updated_at ? JSON.parse(raw.updated_at) : void 0,
    name: raw.name,
    type: raw.type
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/shipping-profiles/shipping-profiles-list/components/shipping-profile-list-table/shipping-profile-list-table.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var ShippingProfileListTable = () => {
  const { t } = useTranslation4();
  const { raw, searchParams } = useShippingProfileTableQuery({
    pageSize: PAGE_SIZE
  });
  const { shipping_profiles, count, isLoading, isError, error } = useShippingProfiles(searchParams, {
    placeholderData: keepPreviousData
  });
  const columns = useShippingProfileTableColumns();
  const filters = useShippingProfileTableFilters();
  const { table } = useDataTable({
    data: shipping_profiles,
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx3(Heading, { children: t("shippingProfile.domain") }),
        /* @__PURE__ */ jsx3(Text, { className: "text-ui-fg-subtle", size: "small", children: t("shippingProfile.subtitle") })
      ] }),
      /* @__PURE__ */ jsx3("div", { children: /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx3(Link, { to: "create", children: t("actions.create") }) }) })
    ] }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        pageSize: PAGE_SIZE,
        count,
        columns,
        filters,
        orderBy: [
          { key: "name", label: t("fields.name") },
          { key: "type", label: t("fields.type") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        isLoading,
        navigateTo: (row) => row.id,
        queryObject: raw,
        search: true,
        pagination: true
      }
    )
  ] });
};

// src/routes/shipping-profiles/shipping-profiles-list/shipping-profile-list.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ShippingProfileList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx4(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("shipping_profile.list.before"),
        after: getWidgets("shipping_profile.list.after")
      },
      children: /* @__PURE__ */ jsx4(ShippingProfileListTable, {})
    }
  );
};
export {
  ShippingProfileList as Component
};
