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
import {
  useCollection,
  useUpdateCollection
} from "./chunk-3OHH43G6.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/collections/collection-edit/collection-edit.tsx
import { Heading } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/collections/collection-edit/components/edit-collection-form/edit-collection-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Text } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as zod from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var EditCollectionSchema = zod.object({
  title: zod.string().min(1),
  handle: zod.string().min(1)
});
var EditCollectionForm = ({ collection }) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      title: collection.title,
      handle: collection.handle
    },
    resolver: zodResolver(EditCollectionSchema)
  });
  const { mutateAsync, isPending } = useUpdateCollection(collection.id);
  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(data, {
      onSuccess: () => {
        handleSuccess();
      }
    });
  });
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(KeyboundForm, { onSubmit: handleSubmit, className: "flex flex-1 flex-col", children: [
    /* @__PURE__ */ jsx(RouteDrawer.Body, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "title",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.title") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "handle",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { tooltip: t("collections.handleTooltip"), children: t("fields.handle") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 z-10 flex w-8 items-center justify-center border-r", children: /* @__PURE__ */ jsx(
                  Text,
                  {
                    className: "text-ui-fg-muted",
                    size: "small",
                    leading: "compact",
                    weight: "plus",
                    children: "/"
                  }
                ) }),
                /* @__PURE__ */ jsx(Input, { ...field, className: "pl-10" })
              ] }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
    ] }) })
  ] }) });
};

// src/routes/collections/collection-edit/collection-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CollectionEdit = () => {
  const { id } = useParams();
  const { t } = useTranslation2();
  const { collection, isLoading, isError, error } = useCollection(id);
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsx2(RouteDrawer.Header, { children: /* @__PURE__ */ jsx2(Heading, { children: t("collections.editCollection") }) }),
    !isLoading && collection && /* @__PURE__ */ jsx2(EditCollectionForm, { collection })
  ] });
};
export {
  CollectionEdit as Component
};
