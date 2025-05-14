import {
  CategoryTree
} from "./chunk-XDCNT5GQ.mjs";
import {
  insertCategoryTreeItem
} from "./chunk-54IEHX46.mjs";
import {
  HandleInput
} from "./chunk-7OYLCEKK.mjs";
import {
  transformNullableFormData
} from "./chunk-3ISBJK7K.mjs";
import "./chunk-6GU6IDUA.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useCreateProductCategory,
  useProductCategories
} from "./chunk-ZJ3OFMHB.mjs";
import "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/categories/category-create/category-create.tsx
import { useSearchParams } from "react-router-dom";

// src/routes/categories/category-create/components/create-category-form/create-category-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ProgressTabs, toast } from "@medusajs/ui";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation3 } from "react-i18next";
import { useState as useState2 } from "react";

// src/routes/categories/category-create/components/create-category-form/create-category-details.tsx
import { Heading, Input, Select, Text, Textarea } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var CreateCategoryDetails = ({ form }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Heading, { children: t("categories.create.header") }),
      /* @__PURE__ */ jsx(Text, { size: "small", className: "text-ui-fg-subtle", children: t("categories.create.hint") })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("fields.title") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { autoComplete: "off", ...field }) }),
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
              /* @__PURE__ */ jsx(Form.Label, { optional: true, tooltip: t("collections.handleTooltip"), children: t("fields.handle") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(HandleInput, { ...field }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "description",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("fields.description") }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Textarea, { ...field }) }),
            /* @__PURE__ */ jsx(Form.ErrorMessage, {})
          ] });
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "status",
          render: ({ field: { ref, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("categories.fields.status.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: onChange, children: [
                /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                /* @__PURE__ */ jsxs(Select.Content, { children: [
                  /* @__PURE__ */ jsx(Select.Item, { value: "active", children: t("categories.fields.status.active") }),
                  /* @__PURE__ */ jsx(Select.Item, { value: "inactive", children: t("categories.fields.status.inactive") })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "visibility",
          render: ({ field: { ref, onChange, ...field } }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("categories.fields.visibility.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsxs(Select, { ...field, onValueChange: onChange, children: [
                /* @__PURE__ */ jsx(Select.Trigger, { ref, children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                /* @__PURE__ */ jsxs(Select.Content, { children: [
                  /* @__PURE__ */ jsx(Select.Item, { value: "public", children: t("categories.fields.visibility.public") }),
                  /* @__PURE__ */ jsx(Select.Item, { value: "internal", children: t("categories.fields.visibility.internal") })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] })
  ] }) });
};

// src/routes/categories/category-create/components/create-category-form/create-category-nesting.tsx
import { Badge } from "@medusajs/ui";
import { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ID = "new-item";
var CreateCategoryNesting = ({
  form,
  shouldFreeze
}) => {
  const { t } = useTranslation2();
  const [snapshot, setSnapshot] = useState([]);
  const { product_categories, isPending, isError, error } = useProductCategories({
    parent_category_id: "null",
    limit: 9999,
    fields: "id,name,parent_category_id,rank,category_children,rank",
    include_descendants_tree: true
  });
  const parentCategoryId = useWatch({
    control: form.control,
    name: "parent_category_id"
  });
  const watchedRank = useWatch({
    control: form.control,
    name: "rank"
  });
  const watchedName = useWatch({
    control: form.control,
    name: "name"
  });
  const value = useMemo(() => {
    const temp = {
      id: ID,
      name: watchedName,
      parent_category_id: parentCategoryId,
      rank: watchedRank,
      category_children: null
    };
    return insertCategoryTreeItem(product_categories ?? [], temp);
  }, [product_categories, watchedName, parentCategoryId, watchedRank]);
  const handleChange = ({
    parentId,
    index
  }, list) => {
    form.setValue("parent_category_id", parentId, {
      shouldDirty: true,
      shouldTouch: true
    });
    form.setValue("rank", index, {
      shouldDirty: true,
      shouldTouch: true
    });
    setSnapshot(list);
  };
  if (isError) {
    throw error;
  }
  const ready = !isPending && !!product_categories;
  return /* @__PURE__ */ jsx2(
    CategoryTree,
    {
      value: shouldFreeze ? snapshot : value,
      enableDrag: (item) => item.id === ID,
      onChange: handleChange,
      renderValue: (item) => {
        if (item.id === ID) {
          return /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
            /* @__PURE__ */ jsx2("span", { children: item.name }),
            /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", color: "blue", children: t("categories.fields.new.label") })
          ] });
        }
        return item.name;
      },
      isLoading: !ready
    }
  );
};

// src/routes/categories/category-create/components/create-category-form/schema.ts
import { z } from "zod";
var CreateCategoryDetailsSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  handle: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  visibility: z.enum(["public", "internal"])
});
var CreateCategorySchema = z.object({
  rank: z.number().nullable(),
  parent_category_id: z.string().nullable()
}).merge(CreateCategoryDetailsSchema);

// src/routes/categories/category-create/components/create-category-form/create-category-form.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var CreateCategoryForm = ({
  parentCategoryId
}) => {
  const { t } = useTranslation3();
  const { handleSuccess } = useRouteModal();
  const [activeTab, setActiveTab] = useState2("details" /* DETAILS */);
  const [validDetails, setValidDetails] = useState2(false);
  const [shouldFreeze, setShouldFreeze] = useState2(false);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      handle: "",
      status: "active",
      visibility: "public",
      rank: parentCategoryId ? 0 : null,
      parent_category_id: parentCategoryId
    },
    resolver: zodResolver(CreateCategorySchema)
  });
  const handleTabChange = (tab) => {
    if (tab === "organize" /* ORGANIZE */) {
      const { name, handle, description, status, visibility } = form.getValues();
      const result = CreateCategoryDetailsSchema.safeParse({
        name,
        handle,
        description,
        status,
        visibility
      });
      if (!result.success) {
        result.error.errors.forEach((error) => {
          form.setError(error.path.join("."), {
            type: "manual",
            message: error.message
          });
        });
        return;
      }
      form.clearErrors();
      setValidDetails(true);
    }
    setActiveTab(tab);
  };
  const { mutateAsync, isPending } = useCreateProductCategory();
  const handleSubmit = form.handleSubmit((data) => {
    const { visibility, status, parent_category_id, rank, name, ...rest } = data;
    const parsedData = transformNullableFormData(rest, false);
    setShouldFreeze(true);
    mutateAsync(
      {
        name,
        ...parsedData,
        parent_category_id: parent_category_id ?? void 0,
        rank: rank ?? void 0,
        is_active: status === "active",
        is_internal: visibility === "internal"
      },
      {
        onSuccess: ({ product_category }) => {
          toast.success(
            t("categories.create.successToast", {
              name: product_category.name
            })
          );
          handleSuccess(`/categories/${product_category.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
          setShouldFreeze(false);
        }
      }
    );
  });
  const nestingStatus = form.getFieldState("parent_category_id")?.isDirty || form.getFieldState("rank")?.isDirty || activeTab === "organize" /* ORGANIZE */ ? "in-progress" : "not-started";
  const detailsStatus = validDetails ? "completed" : "in-progress";
  return /* @__PURE__ */ jsx3(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsx3(
    KeyboundForm,
    {
      onSubmit: handleSubmit,
      className: "flex size-full flex-col overflow-hidden",
      children: /* @__PURE__ */ jsxs3(
        ProgressTabs,
        {
          value: activeTab,
          onValueChange: (tab) => handleTabChange(tab),
          className: "flex size-full flex-col",
          children: [
            /* @__PURE__ */ jsx3(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx3("div", { className: "flex w-full items-center justify-between", children: /* @__PURE__ */ jsx3("div", { className: "-my-2 w-full max-w-[400px] border-l", children: /* @__PURE__ */ jsxs3(ProgressTabs.List, { className: "grid w-full grid-cols-2", children: [
              /* @__PURE__ */ jsx3(
                ProgressTabs.Trigger,
                {
                  value: "details" /* DETAILS */,
                  status: detailsStatus,
                  className: "w-full min-w-0 overflow-hidden",
                  children: /* @__PURE__ */ jsx3("span", { className: "truncate", children: t("categories.create.tabs.details") })
                }
              ),
              /* @__PURE__ */ jsx3(
                ProgressTabs.Trigger,
                {
                  value: "organize" /* ORGANIZE */,
                  status: nestingStatus,
                  className: "w-full min-w-0 overflow-hidden",
                  children: /* @__PURE__ */ jsx3("span", { className: "truncate", children: t("categories.create.tabs.organize") })
                }
              )
            ] }) }) }) }),
            /* @__PURE__ */ jsxs3(RouteFocusModal.Body, { className: "flex size-full flex-col overflow-auto", children: [
              /* @__PURE__ */ jsx3(ProgressTabs.Content, { value: "details" /* DETAILS */, children: /* @__PURE__ */ jsx3(CreateCategoryDetails, { form }) }),
              /* @__PURE__ */ jsx3(
                ProgressTabs.Content,
                {
                  value: "organize" /* ORGANIZE */,
                  className: "bg-ui-bg-subtle flex-1",
                  children: /* @__PURE__ */ jsx3(CreateCategoryNesting, { form, shouldFreeze })
                }
              )
            ] }),
            /* @__PURE__ */ jsx3(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end gap-x-2", children: [
              /* @__PURE__ */ jsx3(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
              activeTab === "organize" /* ORGANIZE */ ? /* @__PURE__ */ jsx3(
                Button,
                {
                  size: "small",
                  variant: "primary",
                  type: "submit",
                  isLoading: isPending,
                  children: t("actions.save")
                },
                "submit-btn"
              ) : /* @__PURE__ */ jsx3(
                Button,
                {
                  size: "small",
                  variant: "primary",
                  type: "button",
                  onClick: () => handleTabChange("organize" /* ORGANIZE */),
                  children: t("actions.continue")
                },
                "continue-btn"
              )
            ] }) })
          ]
        }
      )
    }
  ) });
};

// src/routes/categories/category-create/category-create.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var CategoryCreate = () => {
  const [searchParams] = useSearchParams();
  const parentCategoryId = searchParams.get("parent_category_id");
  return /* @__PURE__ */ jsx4(RouteFocusModal, { children: /* @__PURE__ */ jsx4(CreateCategoryForm, { parentCategoryId }) });
};
export {
  CategoryCreate as Component
};
