import {
  useCustomerGroupTableColumns
} from "./chunk-ZJRFL6ZN.mjs";
import {
  useCustomerGroupTableQuery
} from "./chunk-MOSRJHJ3.mjs";
import {
  useOrderTableColumns
} from "./chunk-3IRPEKIV.mjs";
import {
  useOrderTableQuery
} from "./chunk-XMAWMECC.mjs";
import "./chunk-3OHUAQUF.mjs";
import "./chunk-NNBHHXXN.mjs";
import "./chunk-7DXVXBSA.mjs";
import "./chunk-PDWBYQOW.mjs";
import "./chunk-MSDRGCRR.mjs";
import "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import {
  NoRecords
} from "./chunk-EMIHDNB7.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  useCustomerGroupTableFilters
} from "./chunk-DLZWPHHO.mjs";
import {
  useOrderTableFilters
} from "./chunk-FVK4ZYYM.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  TwoColumnPage
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
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import {
  useBatchCustomerCustomerGroups,
  useCustomer,
  useCustomerGroups,
  useDeleteCustomer,
  useDeleteCustomerAddress,
  useRemoveCustomersFromGroup
} from "./chunk-F6PXCY3N.mjs";
import "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import {
  useOrders
} from "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  productsQueryKeys
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/customers/customer-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var CustomerDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { customer } = useCustomer(id, void 0, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!customer) {
    return null;
  }
  const name = [customer.first_name, customer.last_name].filter(Boolean).join(" ");
  const display = name || customer.email;
  return /* @__PURE__ */ jsx("span", { children: display });
};

// src/routes/customers/customer-detail/customer-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/customers/customer-detail/components/customer-address-section/customer-address-section.tsx
import { clx, Container, Heading, toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { Trash } from "@medusajs/icons";
import { Link, useNavigate } from "react-router-dom";

// src/components/common/listicle/listicle.tsx
import { Text } from "@medusajs/ui";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Listicle = ({
  labelKey,
  descriptionKey,
  children
}) => {
  return /* @__PURE__ */ jsx2("div", { className: "flex flex-col gap-2 px-2 pb-2", children: /* @__PURE__ */ jsx2("div", { className: "shadow-elevation-card-rest bg-ui-bg-component transition-fg hover:bg-ui-bg-component-hover active:bg-ui-bg-component-pressed group-focus-visible:shadow-borders-interactive-with-active rounded-md px-4 py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: labelKey }),
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: descriptionKey })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: "flex size-7 items-center justify-center", children })
  ] }) }) });
};

// src/routes/customers/customer-detail/components/customer-address-section/customer-address-section.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var CustomerAddressSection = ({
  customer
}) => {
  const { t: t2 } = useTranslation();
  const prompt = usePrompt();
  const navigate = useNavigate();
  const { mutateAsync: deleteAddress } = useDeleteCustomerAddress(customer.id);
  const addresses = customer.addresses ?? [];
  const handleDelete = async (address) => {
    const confirm = await prompt({
      title: t2("general.areYouSure"),
      description: t2("general.areYouSureDescription", {
        entity: t2("fields.address"),
        title: address.address_name ?? "n/a"
      }),
      verificationInstruction: t2("general.typeToConfirm"),
      verificationText: address.address_name ?? "address",
      confirmText: t2("actions.delete"),
      cancelText: t2("actions.cancel")
    });
    if (!confirm) {
      return;
    }
    await deleteAddress(address.id, {
      onSuccess: () => {
        toast.success(
          t2("general.success", { name: address.address_name ?? "address" })
        );
        navigate(`/customers/${customer.id}`, { replace: true });
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs2(Container, { className: "p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Heading, { level: "h2", children: t2("addresses.title") }),
      /* @__PURE__ */ jsx3(Link, { to: `create-address`, className: "text-ui-fg-muted text-xs", children: "Add" })
    ] }),
    addresses.length === 0 && /* @__PURE__ */ jsx3(
      NoRecords,
      {
        className: clx({
          "flex h-full flex-col overflow-hidden border-t p-6": true
        }),
        icon: null,
        title: t2("general.noRecordsTitle"),
        message: t2("general.noRecordsMessage")
      }
    ),
    addresses.map((address) => {
      return /* @__PURE__ */ jsx3(
        Listicle,
        {
          labelKey: address.address_name ?? "n/a",
          descriptionKey: [address.address_1, address.address_2].join(" "),
          children: /* @__PURE__ */ jsx3(
            ActionMenu,
            {
              groups: [
                {
                  actions: [
                    {
                      icon: /* @__PURE__ */ jsx3(Trash, {}),
                      label: t2("actions.delete"),
                      onClick: async () => {
                        await handleDelete(address);
                      }
                    }
                  ]
                }
              ]
            }
          )
        },
        address.id
      );
    })
  ] });
};

// src/routes/customers/customer-detail/components/customer-general-section/customer-general-section.tsx
import { PencilSquare, Trash as Trash2 } from "@medusajs/icons";
import {
  Container as Container2,
  Heading as Heading2,
  StatusBadge,
  Text as Text2,
  toast as toast2,
  usePrompt as usePrompt2
} from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate as useNavigate2 } from "react-router-dom";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var CustomerGeneralSection = ({
  customer
}) => {
  const { t: t2 } = useTranslation2();
  const prompt = usePrompt2();
  const navigate = useNavigate2();
  const { mutateAsync } = useDeleteCustomer(customer.id);
  const name = [customer.first_name, customer.last_name].filter(Boolean).join(" ");
  const statusColor = customer.has_account ? "green" : "orange";
  const statusText = customer.has_account ? t2("customers.fields.registered") : t2("customers.fields.guest");
  const handleDelete = async () => {
    const res = await prompt({
      title: t2("customers.delete.title"),
      description: t2("customers.delete.description", {
        email: customer.email
      }),
      verificationInstruction: t2("general.typeToConfirm"),
      verificationText: customer.email,
      confirmText: t2("actions.delete"),
      cancelText: t2("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast2.success(
          t2("customers.delete.successToast", {
            email: customer.email
          })
        );
        navigate("/customers", { replace: true });
      },
      onError: (error) => {
        toast2.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs3(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx4(Heading2, { children: customer.email }),
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ jsx4(StatusBadge, { color: statusColor, children: statusText }),
        /* @__PURE__ */ jsx4(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t2("actions.edit"),
                    icon: /* @__PURE__ */ jsx4(PencilSquare, {}),
                    to: "edit"
                  }
                ]
              },
              {
                actions: [
                  {
                    label: t2("actions.delete"),
                    icon: /* @__PURE__ */ jsx4(Trash2, {}),
                    onClick: handleDelete
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", weight: "plus", children: t2("fields.name") }),
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", children: name || "-" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", weight: "plus", children: t2("fields.company") }),
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", children: customer.company_name || "-" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", weight: "plus", children: t2("fields.phone") }),
      /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", children: customer.phone || "-" })
    ] })
  ] });
};

// src/routes/customers/customer-detail/components/customer-group-section/customer-group-section.tsx
import {
  Button,
  Checkbox,
  Container as Container3,
  Heading as Heading3,
  toast as toast3,
  usePrompt as usePrompt3
} from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { PencilSquare as PencilSquare2, Trash as Trash3 } from "@medusajs/icons";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Link as Link2 } from "react-router-dom";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "cusgr";
var CustomerGroupSection = ({
  customer
}) => {
  const prompt = usePrompt3();
  const [rowSelection, setRowSelection] = useState({});
  const { raw, searchParams } = useCustomerGroupTableQuery({
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { customer_groups, count, isLoading, isError, error } = useCustomerGroups(
    {
      ...searchParams,
      fields: "+customers.id",
      customers: { id: customer.id }
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const { mutateAsync: batchCustomerCustomerGroups } = useBatchCustomerCustomerGroups(customer.id);
  const filters = useCustomerGroupTableFilters();
  const columns = useColumns(customer.id);
  const { table } = useDataTable({
    data: customer_groups ?? [],
    columns,
    count,
    getRowId: (row) => row.id,
    enablePagination: true,
    enableRowSelection: true,
    pageSize: PAGE_SIZE,
    prefix: PREFIX,
    rowSelection: {
      state: rowSelection,
      updater: setRowSelection
    }
  });
  const handleRemove = async () => {
    const customerGroupIds = Object.keys(rowSelection);
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("customers.groups.removeMany", {
        groups: customer_groups?.filter((g) => customerGroupIds.includes(g.id)).map((g) => g.name).join(",")
      }),
      confirmText: t("actions.remove"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await batchCustomerCustomerGroups(
      { remove: customerGroupIds },
      {
        onSuccess: () => {
          toast3.success(
            t("customers.groups.removed.success", {
              groups: customer_groups.filter((cg) => customerGroupIds.includes(cg.id)).map((cg) => cg?.name)
            })
          );
        },
        onError: (error2) => {
          toast3.error(error2.message);
        }
      }
    );
  };
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs4(Container3, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx5(Heading3, { level: "h2", children: t("customerGroups.domain") }),
      /* @__PURE__ */ jsx5(Link2, { to: `/customers/${customer.id}/add-customer-groups`, children: /* @__PURE__ */ jsx5(Button, { variant: "secondary", size: "small", children: t("general.add") }) })
    ] }),
    /* @__PURE__ */ jsx5(
      _DataTable,
      {
        table,
        columns,
        pageSize: PAGE_SIZE,
        isLoading,
        count,
        prefix: PREFIX,
        navigateTo: (row) => `/customer-groups/${row.id}`,
        filters,
        search: true,
        pagination: true,
        orderBy: [
          { key: "name", label: t("fields.name") },
          { key: "created_at", label: t("fields.createdAt") },
          { key: "updated_at", label: t("fields.updatedAt") }
        ],
        commands: [
          {
            action: handleRemove,
            label: t("actions.remove"),
            shortcut: "r"
          }
        ],
        queryObject: raw,
        noRecords: {
          message: t("customers.groups.list.noRecordsMessage")
        }
      }
    )
  ] });
};
var CustomerGroupRowActions = ({
  group,
  customerId
}) => {
  const prompt = usePrompt3();
  const { t: t2 } = useTranslation3();
  const { mutateAsync } = useRemoveCustomersFromGroup(group.id);
  const onRemove = async () => {
    const res = await prompt({
      title: t2("general.areYouSure"),
      description: t2("customers.groups.remove", {
        name: group.name
      }),
      confirmText: t2("actions.remove"),
      cancelText: t2("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync([customerId], {
      onError: (error) => {
        toast3.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsx5(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t2("actions.edit"),
              icon: /* @__PURE__ */ jsx5(PencilSquare2, {}),
              to: `/customer-groups/${group.id}/edit`
            },
            {
              label: t2("actions.remove"),
              onClick: onRemove,
              icon: /* @__PURE__ */ jsx5(Trash3, {})
            }
          ]
        }
      ]
    }
  );
};
var columnHelper = createColumnHelper();
var useColumns = (customerId) => {
  const columns = useCustomerGroupTableColumns();
  return useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return /* @__PURE__ */ jsx5(
            Checkbox,
            {
              checked: table.getIsSomePageRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected(),
              onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value)
            }
          );
        },
        cell: ({ row }) => {
          return /* @__PURE__ */ jsx5(
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
      ...columns,
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx5(
          CustomerGroupRowActions,
          {
            group: row.original,
            customerId
          }
        )
      })
    ],
    [columns, customerId]
  );
};

// src/routes/customers/customer-detail/components/customer-order-section/customer-order-section.tsx
import { ArrowPath } from "@medusajs/icons";
import { Container as Container4, Heading as Heading4 } from "@medusajs/ui";
import { keepPreviousData as keepPreviousData2 } from "@tanstack/react-query";
import { createColumnHelper as createColumnHelper2 } from "@tanstack/react-table";
import { useMemo as useMemo2 } from "react";
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var PREFIX2 = "cusord";
var PAGE_SIZE2 = 10;
var DEFAULT_RELATIONS = "*customer,*items,*sales_channel";
var DEFAULT_FIELDS = "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code";
var CustomerOrderSection = ({
  customer
}) => {
  const { t: t2 } = useTranslation4();
  const { searchParams, raw } = useOrderTableQuery({
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  const { orders, count, isLoading, isError, error } = useOrders(
    {
      customer_id: customer.id,
      fields: DEFAULT_FIELDS + "," + DEFAULT_RELATIONS,
      ...searchParams
    },
    {
      placeholderData: keepPreviousData2
    }
  );
  const columns = useColumns2();
  const filters = useOrderTableFilters();
  const { table } = useDataTable({
    data: orders ?? [],
    columns,
    enablePagination: true,
    count,
    pageSize: PAGE_SIZE2,
    prefix: PREFIX2
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs5(Container4, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx6("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsx6(Heading4, { level: "h2", children: t2("orders.domain") }) }),
    /* @__PURE__ */ jsx6(
      _DataTable,
      {
        columns,
        table,
        pagination: true,
        navigateTo: (row) => `/orders/${row.original.id}`,
        filters,
        count,
        isLoading,
        pageSize: PAGE_SIZE2,
        orderBy: [
          { key: "display_id", label: t2("orders.fields.displayId") },
          { key: "created_at", label: t2("fields.createdAt") },
          { key: "updated_at", label: t2("fields.updatedAt") }
        ],
        search: true,
        queryObject: raw,
        prefix: PREFIX2
      }
    )
  ] });
};
var CustomerOrderActions = ({ order }) => {
  const { t: t2 } = useTranslation4();
  return /* @__PURE__ */ jsx6(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t2("transferOwnership.label"),
              to: `${order.id}/transfer`,
              icon: /* @__PURE__ */ jsx6(ArrowPath, {})
            }
          ]
        }
      ]
    }
  );
};
var columnHelper2 = createColumnHelper2();
var useColumns2 = () => {
  const base = useOrderTableColumns({ exclude: ["customer"] });
  return useMemo2(
    () => [
      ...base,
      columnHelper2.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx6(CustomerOrderActions, { order: row.original })
      })
    ],
    [base]
  );
};

// src/routes/customers/customer-detail/customer-detail.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var CustomerDetail = () => {
  const { id } = useParams();
  const initialData = useLoaderData();
  const { customer, isLoading, isError, error } = useCustomer(
    id,
    { fields: "+*addresses" },
    { initialData }
  );
  const { getWidgets } = useExtension();
  if (isLoading || !customer) {
    return /* @__PURE__ */ jsx7(SingleColumnPageSkeleton, { sections: 2, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs6(
    TwoColumnPage,
    {
      widgets: {
        before: getWidgets("customer.details.before"),
        after: getWidgets("customer.details.after"),
        sideAfter: getWidgets("customer.details.side.after"),
        sideBefore: getWidgets("customer.details.side.before")
      },
      data: customer,
      hasOutlet: true,
      showJSON: true,
      showMetadata: true,
      children: [
        /* @__PURE__ */ jsxs6(TwoColumnPage.Main, { children: [
          /* @__PURE__ */ jsx7(CustomerGeneralSection, { customer }),
          /* @__PURE__ */ jsx7(CustomerOrderSection, { customer }),
          /* @__PURE__ */ jsx7(CustomerGroupSection, { customer })
        ] }),
        /* @__PURE__ */ jsx7(TwoColumnPage.Sidebar, { children: /* @__PURE__ */ jsx7(CustomerAddressSection, { customer }) })
      ]
    }
  );
};

// src/routes/customers/customer-detail/loader.ts
var customerDetailQuery = (id) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.customer.retrieve(id, {
    fields: "+*addresses"
  })
});
var customerLoader = async ({ params }) => {
  const id = params.id;
  const query = customerDetailQuery(id);
  return queryClient.ensureQueryData(query);
};
export {
  CustomerDetailBreadcrumb as Breadcrumb,
  CustomerDetail as Component,
  customerLoader as loader
};
