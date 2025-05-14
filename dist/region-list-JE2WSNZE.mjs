import {
  useRegionTableColumns
} from "./chunk-QMRGIWOP.mjs";
import "./chunk-I3VB6NM2.mjs";
import {
  useRegionTableQuery
} from "./chunk-XR4GEMGR.mjs";
import "./chunk-IR5DHEKS.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import {
  useRegionTableFilters
} from "./chunk-LT4MVCA7.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-DG7J63J2.mjs";
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
  useDeleteRegion,
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/regions/region-list/components/region-list-table/region-list-table.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import {
  Button,
  Container,
  Heading,
  Text,
  toast,
  usePrompt
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var RegionListTable = () => {
  const { t } = useTranslation();
  const { searchParams, raw } = useRegionTableQuery({ pageSize: PAGE_SIZE });
  const {
    regions,
    count,
    isPending: isLoading,
    isError,
    error
  } = useRegions(
    {
      ...searchParams,
      fields: "*payment_providers"
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const filters = useRegionTableFilters();
  const columns = useColumns();
  const { table } = useDataTable({
    data: regions ?? [],
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
        /* @__PURE__ */ jsx(Heading, { children: t("regions.domain") }),
        /* @__PURE__ */ jsx(Text, { className: "text-ui-fg-subtle", size: "small", children: t("regions.subtitle") })
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/settings/regions/create", children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx(
      _DataTable,
      {
        table,
        columns,
        count,
        pageSize: PAGE_SIZE,
        isLoading,
        filters,
        orderBy: [
          { key: "name", label: t("fields.name") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        navigateTo: (row) => `${row.original.id}`,
        pagination: true,
        search: true,
        queryObject: raw,
        noRecords: {
          message: t("regions.list.noRecordsMessage")
        }
      }
    )
  ] });
};
var RegionActions = ({ region }) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteRegion(region.id);
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
        toast.success(t("regions.toast.delete"));
      },
      onError: (e) => {
        toast.error(e.message);
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
              label: t("actions.edit"),
              to: `/settings/regions/${region.id}/edit`,
              icon: /* @__PURE__ */ jsx(PencilSquare, {})
            }
          ]
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              onClick: handleDelete,
              icon: /* @__PURE__ */ jsx(Trash, {})
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useRegionTableColumns();
  return useMemo(
    () => [
      ...base,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx(RegionActions, { region: row.original });
        }
      })
    ],
    [base]
  );
};

// src/routes/regions/region-list/region-list.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var RegionList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx2(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("region.list.before"),
        after: getWidgets("region.list.after")
      },
      children: /* @__PURE__ */ jsx2(RegionListTable, {})
    }
  );
};
export {
  RegionList as Component
};
