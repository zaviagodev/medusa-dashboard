import {
  useProductTableColumns
} from "./chunk-G3QXMPRB.mjs";
import {
  useProductTableQuery
} from "./chunk-PCFUZKDS.mjs";
import "./chunk-IQBAUTU5.mjs";
import "./chunk-ADOCJB6L.mjs";
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
  useProductTableFilters
} from "./chunk-FZRIVT5D.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import "./chunk-MNXC6Q4F.mjs";
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
import {
  useDeleteSalesChannel,
  useSalesChannel,
  useSalesChannelRemoveProducts
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  productsQueryKeys,
  useProducts
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/sales-channels/sales-channel-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var SalesChannelDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { sales_channel } = useSalesChannel(id, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!sales_channel) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: sales_channel.name });
};

// src/routes/sales-channels/sales-channel-detail/loader.ts
var salesChannelDetailQuery = (id) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.salesChannel.retrieve(id)
});
var salesChannelLoader = async ({ params }) => {
  const id = params.id;
  const query = salesChannelDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/sales-channels/sales-channel-detail/sales-channel-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/sales-channels/sales-channel-detail/components/sales-channel-general-section/sales-channel-general-section.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import {
  Container,
  Heading,
  StatusBadge,
  Text,
  toast,
  usePrompt
} from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var SalesChannelGeneralSection = ({
  salesChannel
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteSalesChannel(salesChannel.id);
  const handleDelete = async () => {
    const confirm = await prompt({
      title: t("general.areYouSure"),
      description: t("salesChannels.deleteSalesChannelWarning", {
        name: salesChannel.name
      }),
      verificationInstruction: t("general.typeToConfirm"),
      verificationText: salesChannel.name,
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!confirm) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("salesChannels.toast.delete"));
        navigate("/settings/sales-channels", { replace: true });
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { children: salesChannel.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx2(StatusBadge, { color: salesChannel.is_disabled ? "red" : "green", children: t(`general.${salesChannel.is_disabled ? "disabled" : "enabled"}`) }),
        /* @__PURE__ */ jsx2(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
                    label: t("actions.edit"),
                    to: `/settings/sales-channels/${salesChannel.id}/edit`
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
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-start px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.description") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: salesChannel.description || "-" })
    ] })
  ] });
};

// src/routes/sales-channels/sales-channel-detail/components/sales-channel-product-section/sales-channel-product-section.tsx
import { PencilSquare as PencilSquare2, Trash as Trash2 } from "@medusajs/icons";
import {
  Button,
  Checkbox,
  Container as Container2,
  Heading as Heading2,
  toast as toast2,
  usePrompt as usePrompt2
} from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Link } from "react-router-dom";
import { keepPreviousData } from "@tanstack/react-query";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var SalesChannelProductSection = ({
  salesChannel
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const { searchParams, raw } = useProductTableQuery({ pageSize: PAGE_SIZE });
  const {
    products,
    count,
    isPending: isLoading,
    isError,
    error
  } = useProducts(
    {
      ...searchParams,
      sales_channel_id: [salesChannel.id]
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useColumns();
  const filters = useProductTableFilters(["sales_channel_id"]);
  const { table } = useDataTable({
    data: products ?? [],
    columns,
    count,
    enablePagination: true,
    enableRowSelection: true,
    pageSize: PAGE_SIZE,
    getRowId: (row) => row.id,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    },
    meta: {
      salesChannelId: salesChannel.id
    }
  });
  const { mutateAsync } = useSalesChannelRemoveProducts(salesChannel.id);
  const prompt = usePrompt2();
  const { t } = useTranslation2();
  const handleRemove = async () => {
    const ids = Object.keys(rowSelection);
    const result = await prompt({
      title: t("general.areYouSure"),
      description: t("salesChannels.removeProductsWarning", {
        count: ids.length,
        sales_channel: salesChannel.name
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!result) {
      return;
    }
    await mutateAsync(ids, {
      onSuccess: () => {
        toast2.success(t("salesChannels.toast.update"));
        setRowSelection({});
      },
      onError: (error2) => {
        toast2.error(error2.message);
      }
    });
  };
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("products.domain") }),
      /* @__PURE__ */ jsx3(Link, { to: `/settings/sales-channels/${salesChannel.id}/add-products`, children: /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", children: t("general.add") }) })
    ] }),
    /* @__PURE__ */ jsx3(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        commands: [
          {
            action: handleRemove,
            label: t("actions.remove"),
            shortcut: "r"
          }
        ],
        count,
        pagination: true,
        search: true,
        filters,
        navigateTo: (row) => `/products/${row.id}`,
        isLoading,
        orderBy: [
          { key: "title", label: t("fields.title") },
          { key: "status", label: t("fields.status") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        queryObject: raw,
        noRecords: {
          message: t("salesChannels.products.list.noRecordsMessage")
        }
      }
    )
  ] });
};
var columnHelper = createColumnHelper();
var useColumns = () => {
  const base = useProductTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx3(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx3(
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
          const { salesChannelId } = table.options.meta;
          return /* @__PURE__ */ jsx3(
            ProductListCellActions,
            {
              productId: row.original.id,
              salesChannelId
            }
          );
        }
      })
    ],
    [base]
  );
};
var ProductListCellActions = ({
  salesChannelId,
  productId
}) => {
  const { t } = useTranslation2();
  const { mutateAsync } = useSalesChannelRemoveProducts(salesChannelId);
  const onRemove = async () => {
    await mutateAsync([productId], {
      onSuccess: () => {
        toast2.success(t("salesChannels.toast.update"));
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
              icon: /* @__PURE__ */ jsx3(PencilSquare2, {}),
              label: t("actions.edit"),
              to: `/products/${productId}`
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx3(Trash2, {}),
              label: t("actions.remove"),
              onClick: onRemove
            }
          ]
        }
      ]
    }
  );
};

// src/routes/sales-channels/sales-channel-detail/sales-channel-detail.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var SalesChannelDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const { sales_channel, isPending: isLoading } = useSalesChannel(id, {
    initialData
  });
  const { getWidgets } = useExtension();
  if (isLoading || !sales_channel) {
    return /* @__PURE__ */ jsx4(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  return /* @__PURE__ */ jsxs3(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("sales_channel.details.before"),
        after: getWidgets("sales_channel.details.after")
      },
      showJSON: true,
      showMetadata: true,
      data: sales_channel,
      children: [
        /* @__PURE__ */ jsx4(SalesChannelGeneralSection, { salesChannel: sales_channel }),
        /* @__PURE__ */ jsx4(SalesChannelProductSection, { salesChannel: sales_channel })
      ]
    }
  );
};
export {
  SalesChannelDetailBreadcrumb as Breadcrumb,
  SalesChannelDetail as Component,
  salesChannelLoader as loader
};
