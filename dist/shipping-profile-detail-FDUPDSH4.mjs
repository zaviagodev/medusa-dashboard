import "./chunk-YOYOJU5D.mjs";
import {
  SectionRow
} from "./chunk-LFLGEXIG.mjs";
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
  shippingProfileQueryKeys,
  useDeleteShippingProfile,
  useShippingProfile
} from "./chunk-PIR2H25N.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/shipping-profiles/shipping-profile-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var ShippingProfileDetailBreadcrumb = (props) => {
  const { shipping_profile_id } = props.params || {};
  const { shipping_profile } = useShippingProfile(
    shipping_profile_id,
    void 0,
    {
      initialData: props.data,
      enabled: Boolean(shipping_profile_id)
    }
  );
  if (!shipping_profile) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: shipping_profile.name });
};

// src/routes/shipping-profiles/shipping-profile-detail/loader.ts
var shippingProfileQuery = (id) => ({
  queryKey: shippingProfileQueryKeys.detail(id),
  queryFn: async () => sdk.admin.shippingProfile.retrieve(id)
});
var shippingProfileLoader = async ({ params }) => {
  const id = params.shipping_profile_id;
  const query = shippingProfileQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/shipping-profiles/shipping-profile-detail/shipping-profile-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/shipping-profiles/shipping-profile-detail/components/shipping-profile-general-section/shipping-profile-general-section.tsx
import { Trash } from "@medusajs/icons";
import { Container, Heading, toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ShippingProfileGeneralSection = ({
  profile
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const navigate = useNavigate();
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
        navigate("/settings/locations/shipping-profiles", { replace: true });
      },
      onError: (error) => {
        toast.error(error.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { children: profile.name }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
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
    ] }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.type"), value: profile.type })
  ] });
};

// src/routes/shipping-profiles/shipping-profile-detail/shipping-profile-detail.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var ShippingProfileDetail = () => {
  const { shipping_profile_id } = useParams();
  const initialData = useLoaderData();
  const { shipping_profile, isLoading, isError, error } = useShippingProfile(
    shipping_profile_id,
    void 0,
    { initialData }
  );
  const { getWidgets } = useExtension();
  if (isLoading || !shipping_profile) {
    return /* @__PURE__ */ jsx3(SingleColumnPageSkeleton, { sections: 1, showJSON: true, showMetadata: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(
    SingleColumnPage,
    {
      widgets: {
        before: getWidgets("shipping_profile.details.before"),
        after: getWidgets("shipping_profile.details.after")
      },
      showMetadata: true,
      showJSON: true,
      data: shipping_profile,
      children: /* @__PURE__ */ jsx3(ShippingProfileGeneralSection, { profile: shipping_profile })
    }
  );
};
export {
  ShippingProfileDetailBreadcrumb as Breadcrumb,
  ShippingProfileDetail as Component,
  shippingProfileLoader as loader
};
