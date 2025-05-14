import {
  getApiKeyStatusProps,
  getApiKeyTypeFromPathname,
  getApiKeyTypeProps,
  prettifyRedactedToken
} from "./chunk-G22WWLPG.mjs";
import {
  DateCell
} from "./chunk-3OHUAQUF.mjs";
import {
  TextCell
} from "./chunk-MSDRGCRR.mjs";
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
  useApiKeys,
  useDeleteApiKey,
  useRevokeApiKey
} from "./chunk-F6IJV2I2.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/api-key-management/api-key-management-list/api-key-management-list.tsx
import { useLocation } from "react-router-dom";

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/api-key-management-list-table.tsx
import { Button, Container, Heading, Text } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation4 } from "react-i18next";
import { Link } from "react-router-dom";

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/use-api-key-management-table-columns.tsx
import { Badge } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/api-key-row-actions.tsx
import { PencilSquare, SquareTwoStack, Trash, XCircle } from "@medusajs/icons";
import { toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var ApiKeyRowActions = ({
  apiKey
}) => {
  const { mutateAsync: revokeAsync } = useRevokeApiKey(apiKey.id);
  const { mutateAsync: deleteAsync } = useDeleteApiKey(apiKey.id);
  const { t } = useTranslation();
  const prompt = usePrompt();
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("apiKeyManagement.delete.warning", {
        title: apiKey.title
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await deleteAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("apiKeyManagement.delete.successToast", {
            title: apiKey.title
          })
        );
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  };
  const handleRevoke = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("apiKeyManagement.revoke.warning", {
        title: apiKey.title
      }),
      confirmText: t("apiKeyManagement.actions.revoke"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await revokeAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("apiKeyManagement.revoke.successToast", {
            title: apiKey.title
          })
        );
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  };
  const handleCopyToken = () => {
    navigator.clipboard.writeText(apiKey.token);
    toast.success(t("apiKeyManagement.actions.copySuccessToast"));
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(PencilSquare, {}),
              label: t("actions.edit"),
              to: `${apiKey.id}/edit`
            },
            ...apiKey.type !== "secret" ? [
              {
                label: t("apiKeyManagement.actions.copy"),
                onClick: handleCopyToken,
                icon: /* @__PURE__ */ jsx(SquareTwoStack, {})
              }
            ] : []
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(XCircle, {}),
              label: t("apiKeyManagement.actions.revoke"),
              onClick: handleRevoke,
              disabled: !!apiKey.revoked_at
            },
            {
              icon: /* @__PURE__ */ jsx(Trash, {}),
              label: t("actions.delete"),
              onClick: handleDelete,
              disabled: !apiKey.revoked_at
            }
          ]
        }
      ]
    }
  );
};

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/use-api-key-management-table-columns.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useApiKeyManagementTableColumns = () => {
  const { t } = useTranslation2();
  return useMemo(
    () => [
      columnHelper.accessor("title", {
        header: t("fields.title"),
        cell: ({ getValue }) => /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center", children: /* @__PURE__ */ jsx2("span", { className: "truncate", children: getValue() }) })
      }),
      columnHelper.accessor("redacted", {
        header: "Token",
        cell: ({ getValue }) => {
          const token = getValue();
          return /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", children: prettifyRedactedToken(token) });
        }
      }),
      columnHelper.accessor("type", {
        header: t("fields.type"),
        cell: ({ getValue }) => {
          const { label } = getApiKeyTypeProps(getValue(), t);
          return /* @__PURE__ */ jsx2(TextCell, { text: label });
        }
      }),
      columnHelper.accessor("revoked_at", {
        header: t("fields.status"),
        cell: ({ getValue }) => {
          const { color, label } = getApiKeyStatusProps(getValue(), t);
          return /* @__PURE__ */ jsx2(StatusCell, { color, children: label });
        }
      }),
      columnHelper.accessor("last_used_at", {
        header: t("apiKeyManagement.table.lastUsedAtHeader"),
        cell: ({ getValue }) => {
          const date = getValue();
          return /* @__PURE__ */ jsx2(DateCell, { date });
        }
      }),
      columnHelper.accessor("created_at", {
        header: t("fields.created"),
        cell: ({ getValue }) => {
          const date = getValue();
          return /* @__PURE__ */ jsx2(DateCell, { date });
        }
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx2(ApiKeyRowActions, { apiKey: row.original });
        }
      })
    ],
    [t]
  );
};

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/use-api-key-management-table-filters.tsx
import { useTranslation as useTranslation3 } from "react-i18next";
var useApiKeyManagementTableFilters = () => {
  const { t } = useTranslation3();
  let filters = [];
  const dateFilters = [
    { label: t("fields.createdAt"), key: "created_at", type: "date" },
    { label: t("fields.updatedAt"), key: "updated_at", type: "date" },
    { label: t("fields.revokedAt"), key: "revoked_at", type: "date" }
  ];
  filters = [...filters, ...dateFilters];
  return filters;
};

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/use-api-key-management-table-query.tsx
var useApiKeyManagementTableQuery = ({
  prefix,
  pageSize = 20
}) => {
  const queryObject = useQueryParams(
    ["offset", "q", "created_at", "updated_at", "revoked_at", "order"],
    prefix
  );
  const { offset, created_at, updated_at, revoked_at, q, order } = queryObject;
  const searchParams = {
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0,
    revoked_at: revoked_at ? JSON.parse(revoked_at) : void 0,
    order,
    q
  };
  return {
    searchParams,
    raw: queryObject
  };
};

// src/routes/api-key-management/api-key-management-list/components/api-key-management-list-table/api-key-management-list-table.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var ApiKeyManagementListTable = ({
  keyType
}) => {
  const { t } = useTranslation4();
  const { searchParams, raw } = useApiKeyManagementTableQuery({
    pageSize: PAGE_SIZE
  });
  const query = {
    ...searchParams,
    type: keyType,
    fields: "id,title,redacted,token,type,created_at,updated_at,revoked_at,last_used_at,created_by,revoked_by"
  };
  const { api_keys, count, isLoading, isError, error } = useApiKeys(query, {
    placeholderData: keepPreviousData
  });
  const filters = useApiKeyManagementTableFilters();
  const columns = useApiKeyManagementTableColumns();
  const { table } = useDataTable({
    data: api_keys || [],
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
        /* @__PURE__ */ jsx3(Heading, { level: "h2", children: keyType === "publishable" ? t(`apiKeyManagement.domain.publishable`) : t("apiKeyManagement.domain.secret") }),
        /* @__PURE__ */ jsx3(Text, { className: "text-ui-fg-subtle", size: "small", children: keyType === "publishable" ? t(`apiKeyManagement.subtitle.publishable`) : t("apiKeyManagement.subtitle.secret") })
      ] }),
      /* @__PURE__ */ jsx3(Link, { to: "create", children: /* @__PURE__ */ jsx3(Button, { variant: "secondary", size: "small", children: t("actions.create") }) })
    ] }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        filters,
        columns,
        count,
        pageSize: PAGE_SIZE,
        orderBy: [
          { key: "title", label: t("fields.title") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") },
          { key: "revoked_at", label: t("fields.revokedAt") }
        ],
        navigateTo: (row) => row.id,
        pagination: true,
        search: true,
        queryObject: raw,
        isLoading
      }
    )
  ] });
};

// src/routes/api-key-management/api-key-management-list/api-key-management-list.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var ApiKeyManagementList = () => {
  const { pathname } = useLocation();
  const { getWidgets } = useExtension();
  const keyType = getApiKeyTypeFromPathname(pathname);
  return /* @__PURE__ */ jsx4(
    SingleColumnPage,
    {
      hasOutlet: true,
      widgets: {
        before: getWidgets("api_key.list.before"),
        after: getWidgets("api_key.list.after")
      },
      children: /* @__PURE__ */ jsx4(ApiKeyManagementListTable, { keyType })
    }
  );
};
export {
  ApiKeyManagementList as Component
};
