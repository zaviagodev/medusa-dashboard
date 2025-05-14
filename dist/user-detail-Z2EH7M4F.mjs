import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
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
import {
  useDeleteUser,
  useUser
} from "./chunk-2ZKVRTBW.mjs";
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

// src/routes/users/user-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var UserDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { user } = useUser(id, void 0, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!user) {
    return null;
  }
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const display = name || user.email;
  return /* @__PURE__ */ jsx("span", { children: display });
};

// src/routes/users/user-detail/loader.ts
var userDetailQuery = (id) => ({
  queryKey: productsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.user.retrieve(id)
});
var userLoader = async ({ params }) => {
  const id = params.id;
  const query = userDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/users/user-detail/user-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/users/user-detail/components/user-general-section/user-general-section.tsx
import { PencilSquare, Trash } from "@medusajs/icons";
import { Container, Heading, Text, toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var UserGeneralSection = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteUser(user.id);
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const handleDeleteUser = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("users.deleteUserWarning", {
        name: name ?? user.email
      }),
      verificationText: name ?? user.email,
      verificationInstruction: t("general.typeToConfirm"),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(t("users.deleteUserSuccess", { name: user.email }));
        navigate("..");
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { children: user.email }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "edit",
                  icon: /* @__PURE__ */ jsx2(PencilSquare, {})
                }
              ]
            },
            {
              actions: [
                {
                  label: t("actions.delete"),
                  onClick: handleDeleteUser,
                  icon: /* @__PURE__ */ jsx2(Trash, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t("fields.name") }),
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: name ?? "-" })
    ] })
  ] });
};

// src/routes/users/user-detail/user-detail.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var UserDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const {
    user,
    isPending: isLoading,
    isError,
    error
  } = useUser(id, void 0, {
    initialData
  });
  const { getWidgets } = useExtension();
  if (isLoading || !user) {
    return /* @__PURE__ */ jsx3(SingleColumnPageSkeleton, { sections: 1, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(
    SingleColumnPage,
    {
      data: user,
      showJSON: true,
      showMetadata: true,
      widgets: {
        after: getWidgets("user.details.after"),
        before: getWidgets("user.details.before")
      },
      children: /* @__PURE__ */ jsx3(UserGeneralSection, { user })
    }
  );
};
export {
  UserDetailBreadcrumb as Breadcrumb,
  UserDetail as Component,
  userLoader as loader
};
