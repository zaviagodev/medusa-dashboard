import {
  useUserInviteTableQuery
} from "./chunk-FHSC5X62.mjs";
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
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal
} from "./chunk-4TC5YS65.mjs";
import {
  isFetchError
} from "./chunk-ONB3JEHR.mjs";
import "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useCreateInvite,
  useDeleteInvite,
  useInvites,
  useResendInvite
} from "./chunk-RLY2SL5E.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/users/user-invite/components/invite-user-form/invite-user-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowPath, Link, Trash } from "@medusajs/icons";
import {
  Alert,
  Button,
  Container,
  Heading,
  Input,
  StatusBadge,
  Text,
  Tooltip,
  usePrompt
} from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import copy from "copy-to-clipboard";
import { format } from "date-fns";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var InviteUserSchema = zod.object({
  email: zod.string().email()
});
var PAGE_SIZE = 10;
var PREFIX = "usr_invite";
var INVITE_URL = `${window.location.origin}${__BASE__ === "/" ? "" : __BASE__}/invite?token=`;
var InviteUserForm = () => {
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      email: ""
    },
    resolver: zodResolver(InviteUserSchema)
  });
  const { raw, searchParams } = useUserInviteTableQuery({
    prefix: PREFIX,
    pageSize: PAGE_SIZE
  });
  const {
    invites,
    count,
    isPending: isLoading,
    isError,
    error
  } = useInvites(searchParams);
  const columns = useColumns();
  const { table } = useDataTable({
    data: invites ?? [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
    prefix: PREFIX
  });
  const { mutateAsync, isPending } = useCreateInvite();
  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await mutateAsync({ email: values.email });
      form.reset();
    } catch (error2) {
      if (isFetchError(error2) && error2.status === 400) {
        form.setError("root", {
          type: "manual",
          message: error2.message
        });
        return;
      }
    }
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex h-full flex-col overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, {}),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-1 flex-col overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "flex flex-1 flex-col items-center overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8 px-2 py-16", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Heading, { children: t("users.inviteUser") }),
            /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("users.inviteUserHint") })
          ] }),
          form.formState.errors.root && /* @__PURE__ */ jsx(
            Alert,
            {
              variant: "error",
              dismissible: false,
              className: "text-balance",
              children: form.formState.errors.root.message
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "email",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("fields.email") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                size: "small",
                variant: "secondary",
                type: "submit",
                isLoading: isPending,
                children: t("users.sendInvite")
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
            /* @__PURE__ */ jsx(Heading, { level: "h2", children: t("users.pendingInvites") }),
            /* @__PURE__ */ jsx(Container, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsx(
              _DataTable,
              {
                table,
                columns,
                count,
                pageSize: PAGE_SIZE,
                pagination: true,
                search: "autofocus",
                isLoading,
                queryObject: raw,
                prefix: PREFIX,
                orderBy: [
                  { key: "email", label: t("fields.email") },
                  { key: "created_at", label: t("fields.createdAt") },
                  { key: "updated_at", label: t("fields.updatedAt") }
                ]
              }
            ) })
          ] })
        ] }) }) })
      ]
    }
  ) });
};
var InviteActions = ({ invite }) => {
  const { mutateAsync: revokeAsync } = useDeleteInvite(invite.id);
  const { mutateAsync: resendAsync } = useResendInvite(invite.id);
  const prompt = usePrompt();
  const { t } = useTranslation();
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("users.deleteInviteWarning", {
        email: invite.email
      }),
      cancelText: t("actions.cancel"),
      confirmText: t("actions.delete")
    });
    if (!res) {
      return;
    }
    await revokeAsync();
  };
  const handleResend = async () => {
    await resendAsync();
  };
  const handleCopyInviteLink = () => {
    const inviteUrl = `${INVITE_URL}${invite.token}`;
    copy(inviteUrl);
  };
  return /* @__PURE__ */ jsx(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(ArrowPath, {}),
              label: t("users.resendInvite"),
              onClick: handleResend
            }
          ]
        },
        {
          actions: [
            {
              icon: /* @__PURE__ */ jsx(Link, {}),
              label: t("users.copyInviteLink"),
              onClick: handleCopyInviteLink
            }
          ]
        },
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
var columnHelper = createColumnHelper();
var useColumns = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.accessor("email", {
        header: t("fields.email"),
        cell: ({ getValue }) => {
          return getValue();
        }
      }),
      columnHelper.accessor("accepted", {
        header: t("fields.status"),
        cell: ({ getValue, row }) => {
          const accepted = getValue();
          const expired = new Date(row.original.expires_at) < /* @__PURE__ */ new Date();
          if (accepted) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: t("users.acceptedOnDate", {
                  date: format(
                    new Date(row.original.updated_at),
                    "dd MMM, yyyy"
                  )
                }),
                children: /* @__PURE__ */ jsx(StatusBadge, { color: "green", children: t("users.inviteStatus.accepted") })
              }
            );
          }
          if (expired) {
            return /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: t("users.expiredOnDate", {
                  date: format(
                    new Date(row.original.expires_at),
                    "dd MMM, yyyy"
                  )
                }),
                children: /* @__PURE__ */ jsx(StatusBadge, { color: "red", children: t("users.inviteStatus.expired") })
              }
            );
          }
          return /* @__PURE__ */ jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsx(
                Trans,
                {
                  i18nKey: "users.validFromUntil",
                  components: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium" }, "from"),
                    /* @__PURE__ */ jsx("span", { className: "font-medium" }, "untill")
                  ],
                  values: {
                    from: format(
                      new Date(row.original.created_at),
                      "dd MMM, yyyy"
                    ),
                    until: format(
                      new Date(row.original.expires_at),
                      "dd MMM, yyyy"
                    )
                  }
                }
              ),
              children: /* @__PURE__ */ jsx(StatusBadge, { color: "orange", children: t("users.inviteStatus.pending") })
            }
          );
        }
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => /* @__PURE__ */ jsx(InviteActions, { invite: row.original })
      })
    ],
    [t]
  );
};

// src/routes/users/user-invite/user-invite.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var UserInvite = () => {
  return /* @__PURE__ */ jsx2(RouteFocusModal, { children: /* @__PURE__ */ jsx2(InviteUserForm, {}) });
};
export {
  UserInvite as Component
};
