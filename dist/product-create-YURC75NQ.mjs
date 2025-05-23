import {
  ChipGroup
} from "./chunk-X5VECN6S.mjs";
import {
  HandleInput
} from "./chunk-7OYLCEKK.mjs";
import {
  useSalesChannelTableColumns,
  useSalesChannelTableEmptyState,
  useSalesChannelTableFilters,
  useSalesChannelTableQuery
} from "./chunk-44QN6VEG.mjs";
import {
  CategoryCombobox
} from "./chunk-RZD5DU5K.mjs";
import {
  useComboboxData
} from "./chunk-YIZSVS2R.mjs";
import {
  Combobox
} from "./chunk-GZBFGV7Y.mjs";
import {
  PRODUCT_CREATE_FORM_DEFAULTS,
  ProductCreateSchema,
  UploadMediaFormItem,
  decorateVariantsWithDefaultValues,
  normalizeProductFormValues
} from "./chunk-VE4PHRLM.mjs";
import "./chunk-ZQRKUG6J.mjs";
import {
  DataGrid,
  createDataGridHelper,
  createDataGridPriceColumns
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  ChipInput
} from "./chunk-XDJ7OMBR.mjs";
import "./chunk-TYTNUPXB.mjs";
import "./chunk-4BTG27L5.mjs";
import {
  DataTable
} from "./chunk-3IIOXMXN.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  SwitchBox
} from "./chunk-D7H6ZNK4.mjs";
import "./chunk-6GU6IDUA.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  StackedFocusModal,
  useRouteModal,
  useStackedModal
} from "./chunk-4TC5YS65.mjs";
import {
  FormExtensionZone,
  useExtendableForm
} from "./chunk-OM2VZAQR.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-53D6Z3S2.mjs";
import "./chunk-MNXC6Q4F.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-XKXNQ2KV.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
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
  useSalesChannel,
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import {
  useStore
} from "./chunk-V2LANK5S.mjs";
import {
  useRegions
} from "./chunk-QZ6PT4QV.mjs";
import {
  usePricePreferences
} from "./chunk-QL4XKIVL.mjs";
import {
  useCreateProduct
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-create/product-create.tsx
import { useTranslation as useTranslation10 } from "react-i18next";

// src/routes/products/product-create/components/product-create-form/product-create-form.tsx
import { Button as Button5, ProgressTabs, toast } from "@medusajs/ui";
import { useEffect as useEffect2, useMemo as useMemo4, useState as useState4 } from "react";
import { useWatch as useWatch4 } from "react-hook-form";
import { useTranslation as useTranslation9 } from "react-i18next";

// src/routes/products/product-create/components/product-create-details-form/product-create-details-form.tsx
import { Divider, Heading as Heading2 } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";

// src/routes/products/product-create/components/product-create-details-form/components/product-create-details-general-section/product-create-general-section.tsx
import { Input, Textarea } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var ProductCreateGeneralSection = ({
  form
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs("div", { id: "general", className: "flex flex-col gap-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-2", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "title",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { children: t("products.fields.title.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: t("products.fields.title.placeholder") }) })
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx(
        Form.Field,
        {
          control: form.control,
          name: "subtitle",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs(Form.Item, { children: [
              /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.subtitle.label") }),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: t("products.fields.subtitle.placeholder") }) })
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
              /* @__PURE__ */ jsx(
                Form.Label,
                {
                  tooltip: t("products.fields.handle.tooltip"),
                  optional: true,
                  children: t("fields.handle")
                }
              ),
              /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(HandleInput, { ...field, placeholder: t("products.fields.handle.placeholder") }) })
            ] });
          }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      Form.Field,
      {
        control: form.control,
        name: "description",
        render: ({ field }) => {
          return /* @__PURE__ */ jsxs(Form.Item, { children: [
            /* @__PURE__ */ jsx(Form.Label, { optional: true, children: t("products.fields.description.label") }),
            /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Textarea, { ...field, placeholder: t("products.fields.description.placeholder") }) })
          ] });
        }
      }
    )
  ] });
};

// src/routes/products/product-create/components/product-create-details-form/components/product-create-details-media-section/product-create-details-media-section.tsx
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DotsSix,
  StackPerspective,
  ThumbnailBadge,
  Trash,
  XMark
} from "@medusajs/icons";
import { IconButton, Text } from "@medusajs/ui";
import { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
var ProductCreateMediaSection = ({
  form
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "media",
    control: form.control,
    keyName: "field_id"
  });
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };
  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((item) => item.field_id === active.id);
      const newIndex = fields.findIndex((item) => item.field_id === over?.id);
      form.setValue("media", arrayMove(fields, oldIndex, newIndex), {
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };
  const handleDragCancel = () => {
    setActiveId(null);
  };
  const getOnDelete = (index) => {
    return () => {
      remove(index);
    };
  };
  const getMakeThumbnail = (index) => {
    return () => {
      const newFields = fields.map((field, i) => {
        return {
          ...field,
          isThumbnail: i === index
        };
      });
      form.setValue("media", newFields, {
        shouldDirty: true,
        shouldTouch: true
      });
    };
  };
  const getItemHandlers = (index) => {
    return {
      onDelete: getOnDelete(index),
      onMakeThumbnail: getMakeThumbnail(index)
    };
  };
  return /* @__PURE__ */ jsxs2("div", { id: "media", className: "flex flex-col gap-y-2", children: [
    /* @__PURE__ */ jsx2(UploadMediaFormItem, { form, append, showHint: false }),
    /* @__PURE__ */ jsxs2(
      DndContext,
      {
        sensors,
        onDragEnd: handleDragEnd,
        onDragStart: handleDragStart,
        onDragCancel: handleDragCancel,
        children: [
          /* @__PURE__ */ jsx2(DragOverlay, { dropAnimation: dropAnimationConfig, children: activeId ? /* @__PURE__ */ jsx2(
            MediaGridItemOverlay,
            {
              field: fields.find((m) => m.field_id === activeId)
            }
          ) : null }),
          /* @__PURE__ */ jsx2("ul", { className: "flex flex-col gap-y-2", children: /* @__PURE__ */ jsx2(SortableContext, { items: fields.map((field) => field.field_id), children: fields.map((field, index) => {
            const { onDelete, onMakeThumbnail } = getItemHandlers(index);
            return /* @__PURE__ */ jsx2(
              MediaItem,
              {
                field,
                onDelete,
                onMakeThumbnail
              },
              field.field_id
            );
          }) }) })
        ]
      }
    )
  ] });
};
var MediaItem = ({ field, onDelete, onMakeThumbnail }) => {
  const { t } = useTranslation2();
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: field.field_id });
  const style = {
    opacity: isDragging ? 0.4 : void 0,
    transform: CSS.Translate.toString(transform),
    transition
  };
  if (!field.file) {
    return null;
  }
  return /* @__PURE__ */ jsxs2(
    "li",
    {
      className: "bg-ui-bg-component shadow-elevation-card-rest flex items-center justify-between rounded-lg px-3 py-2",
      ref: setNodeRef,
      style,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
          /* @__PURE__ */ jsx2(
            IconButton,
            {
              variant: "transparent",
              type: "button",
              size: "small",
              ...attributes,
              ...listeners,
              ref: setActivatorNodeRef,
              className: "cursor-grab touch-none active:cursor-grabbing",
              children: /* @__PURE__ */ jsx2(DotsSix, { className: "text-ui-fg-muted" })
            }
          ),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
            /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-base h-10 w-[30px] overflow-hidden rounded-md", children: /* @__PURE__ */ jsx2(ThumbnailPreview, { url: field.url }) }),
            /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: field.file.name }),
              /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
                field.isThumbnail && /* @__PURE__ */ jsx2(ThumbnailBadge, {}),
                /* @__PURE__ */ jsx2(
                  Text,
                  {
                    size: "xsmall",
                    leading: "compact",
                    className: "text-ui-fg-subtle",
                    children: formatFileSize(field.file.size)
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
          /* @__PURE__ */ jsx2(
            ActionMenu,
            {
              groups: [
                {
                  actions: [
                    {
                      label: t("products.media.makeThumbnail"),
                      icon: /* @__PURE__ */ jsx2(StackPerspective, {}),
                      onClick: onMakeThumbnail
                    }
                  ]
                },
                {
                  actions: [
                    {
                      icon: /* @__PURE__ */ jsx2(Trash, {}),
                      label: t("actions.delete"),
                      onClick: onDelete
                    }
                  ]
                }
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            IconButton,
            {
              type: "button",
              size: "small",
              variant: "transparent",
              onClick: onDelete,
              children: /* @__PURE__ */ jsx2(XMark, {})
            }
          )
        ] })
      ]
    }
  );
};
var MediaGridItemOverlay = ({ field }) => {
  return /* @__PURE__ */ jsxs2("li", { className: "bg-ui-bg-component shadow-elevation-card-rest flex items-center justify-between rounded-lg px-3 py-2", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx2(
        IconButton,
        {
          variant: "transparent",
          size: "small",
          className: "cursor-grab touch-none active:cursor-grabbing",
          children: /* @__PURE__ */ jsx2(DotsSix, { className: "text-ui-fg-muted" })
        }
      ),
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-3", children: [
        /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-base h-10 w-[30px] overflow-hidden rounded-md", children: /* @__PURE__ */ jsx2(ThumbnailPreview, { url: field.url }) }),
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", children: field.file?.name }),
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
            field.isThumbnail && /* @__PURE__ */ jsx2(ThumbnailBadge, {}),
            /* @__PURE__ */ jsx2(
              Text,
              {
                size: "xsmall",
                leading: "compact",
                className: "text-ui-fg-subtle",
                children: formatFileSize(field.file?.size ?? 0)
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
      /* @__PURE__ */ jsx2(ActionMenu, { groups: [] }),
      /* @__PURE__ */ jsx2(
        IconButton,
        {
          type: "button",
          size: "small",
          variant: "transparent",
          onClick: () => {
          },
          children: /* @__PURE__ */ jsx2(XMark, {})
        }
      )
    ] })
  ] });
};
var ThumbnailPreview = ({ url }) => {
  if (!url) {
    return null;
  }
  return /* @__PURE__ */ jsx2("img", { src: url, alt: "", className: "size-full object-cover object-center" });
};
function formatFileSize(bytes, decimalPlaces = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPlaces)) + " " + sizes[i];
}

// src/routes/products/product-create/components/product-create-details-form/components/product-create-details-variant-section/product-create-details-variant-section.tsx
import { XMarkMini } from "@medusajs/icons";
import {
  Alert,
  Button,
  Checkbox,
  Heading,
  Hint,
  IconButton as IconButton3,
  InlineTip,
  Input as Input2,
  Label,
  Text as Text2,
  clx as clx2
} from "@medusajs/ui";
import {
  Controller,
  useFieldArray as useFieldArray2,
  useWatch
} from "react-hook-form";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/components/common/sortable-list/sortable-list.tsx
import {
  DndContext as DndContext2,
  DragOverlay as DragOverlay2,
  KeyboardSensor as KeyboardSensor2,
  PointerSensor as PointerSensor2,
  defaultDropAnimationSideEffects as defaultDropAnimationSideEffects2,
  useSensor as useSensor2,
  useSensors as useSensors2
} from "@dnd-kit/core";
import {
  SortableContext as SortableContext2,
  arrayMove as arrayMove2,
  sortableKeyboardCoordinates as sortableKeyboardCoordinates2,
  useSortable as useSortable2
} from "@dnd-kit/sortable";
import { CSS as CSS2 } from "@dnd-kit/utilities";
import { DotsSix as DotsSix2 } from "@medusajs/icons";
import { IconButton as IconButton2, clx } from "@medusajs/ui";
import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  useState as useState2
} from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var List = ({
  items,
  onChange,
  renderItem
}) => {
  const [active, setActive] = useState2(null);
  const [activeItem, activeIndex] = useMemo(() => {
    if (active === null) {
      return [null, null];
    }
    const index = items.findIndex(({ id }) => id === active.id);
    return [items[index], index];
  }, [active, items]);
  const sensors = useSensors2(
    useSensor2(PointerSensor2),
    useSensor2(KeyboardSensor2, {
      coordinateGetter: sortableKeyboardCoordinates2
    })
  );
  const handleDragStart = ({ active: active2 }) => {
    setActive(active2);
  };
  const handleDragEnd = ({ active: active2, over }) => {
    if (over && active2.id !== over.id) {
      const activeIndex2 = items.findIndex(({ id }) => id === active2.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      onChange(arrayMove2(items, activeIndex2, overIndex));
    }
    setActive(null);
  };
  const handleDragCancel = () => {
    setActive(null);
  };
  return /* @__PURE__ */ jsxs3(
    DndContext2,
    {
      sensors,
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
      children: [
        /* @__PURE__ */ jsx3(Overlay, { children: activeItem && activeIndex !== null ? renderItem(activeItem, activeIndex) : null }),
        /* @__PURE__ */ jsx3(SortableContext2, { items, children: /* @__PURE__ */ jsx3(
          "ul",
          {
            role: "application",
            className: "flex list-inside list-none list-image-none flex-col p-0",
            children: items.map((item, index) => /* @__PURE__ */ jsx3(Fragment, { children: renderItem(item, index) }, item.id))
          }
        ) })
      ]
    }
  );
};
var dropAnimationConfig2 = {
  sideEffects: defaultDropAnimationSideEffects2({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
var Overlay = ({ children }) => {
  return /* @__PURE__ */ jsx3(
    DragOverlay2,
    {
      className: "shadow-elevation-card-hover overflow-hidden rounded-md [&>li]:border-b-0",
      dropAnimation: dropAnimationConfig2,
      children
    }
  );
};
var SortableItemContext = createContext(null);
var useSortableItemContext = () => {
  const context = useContext(SortableItemContext);
  if (!context) {
    throw new Error(
      "useSortableItemContext must be used within a SortableItemContext"
    );
  }
  return context;
};
var Item = ({
  id,
  className,
  children
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable2({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
      isDragging
    }),
    [attributes, listeners, setActivatorNodeRef, isDragging]
  );
  const style = {
    opacity: isDragging ? 0.4 : void 0,
    transform: CSS2.Translate.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx3(SortableItemContext.Provider, { value: context, children: /* @__PURE__ */ jsx3(
    "li",
    {
      className: clx("transition-fg flex flex-1 list-none", className),
      ref: setNodeRef,
      style,
      children
    }
  ) });
};
var DragHandle = () => {
  const { attributes, listeners, ref } = useSortableItemContext();
  return /* @__PURE__ */ jsx3(
    IconButton2,
    {
      variant: "transparent",
      size: "small",
      ...attributes,
      ...listeners,
      ref,
      className: "cursor-grab touch-none active:cursor-grabbing",
      children: /* @__PURE__ */ jsx3(DotsSix2, { className: "text-ui-fg-muted" })
    }
  );
};
var SortableList = Object.assign(List, {
  Item,
  DragHandle
});

// src/routes/products/product-create/components/product-create-details-form/components/product-create-details-variant-section/product-create-details-variant-section.tsx
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var getPermutations = (data) => {
  if (data.length === 0) {
    return [];
  }
  if (data.length === 1) {
    return data[0].values.map((value) => ({ [data[0].title]: value }));
  }
  const toProcess = data[0];
  const rest = data.slice(1);
  return toProcess.values.flatMap((value) => {
    return getPermutations(rest).map((permutation) => {
      return {
        [toProcess.title]: value,
        ...permutation
      };
    });
  });
};
var getVariantName = (options) => {
  return Object.values(options).join(" / ");
};
var ProductCreateVariantsSection = ({
  form
}) => {
  const { t } = useTranslation3();
  const options = useFieldArray2({
    control: form.control,
    name: "options"
  });
  const variants = useFieldArray2({
    control: form.control,
    name: "variants"
  });
  const watchedAreVariantsEnabled = useWatch({
    control: form.control,
    name: "enable_variants",
    defaultValue: false
  });
  const watchedOptions = useWatch({
    control: form.control,
    name: "options",
    defaultValue: []
  });
  const watchedVariants = useWatch({
    control: form.control,
    name: "variants",
    defaultValue: []
  });
  const showInvalidOptionsMessage = !!form.formState.errors.options?.length;
  const showInvalidVariantsMessage = form.formState.errors.variants?.root?.message === "invalid_length";
  const handleOptionValueUpdate = (index, value) => {
    const { isTouched: hasUserSelectedVariants } = form.getFieldState("variants");
    const newOptions = [...watchedOptions];
    newOptions[index].values = value;
    const permutations = getPermutations(newOptions);
    const oldVariants = [...watchedVariants];
    const findMatchingPermutation = (options2) => {
      return permutations.find(
        (permutation) => Object.keys(options2).every((key) => options2[key] === permutation[key])
      );
    };
    const newVariants = oldVariants.reduce((variants2, variant) => {
      const match = findMatchingPermutation(variant.options);
      if (match) {
        variants2.push({
          ...variant,
          title: getVariantName(match),
          options: match
        });
      }
      return variants2;
    }, []);
    const usedPermutations = new Set(
      newVariants.map((variant) => variant.options)
    );
    const unusedPermutations = permutations.filter(
      (permutation) => !usedPermutations.has(permutation)
    );
    unusedPermutations.forEach((permutation) => {
      newVariants.push({
        title: getVariantName(permutation),
        options: permutation,
        should_create: hasUserSelectedVariants ? false : true,
        variant_rank: newVariants.length,
        // NOTE - prepare inventory array here for now so we prevent rendering issue if we append the items later
        inventory: [{ inventory_item_id: "", required_quantity: "" }]
      });
    });
    form.setValue("variants", newVariants);
  };
  const handleRemoveOption = (index) => {
    if (index === 0) {
      return;
    }
    options.remove(index);
    const newOptions = [...watchedOptions];
    newOptions.splice(index, 1);
    const permutations = getPermutations(newOptions);
    const oldVariants = [...watchedVariants];
    const findMatchingPermutation = (options2) => {
      return permutations.find(
        (permutation) => Object.keys(options2).every((key) => options2[key] === permutation[key])
      );
    };
    const newVariants = oldVariants.reduce((variants2, variant) => {
      const match = findMatchingPermutation(variant.options);
      if (match) {
        variants2.push({
          ...variant,
          title: getVariantName(match),
          options: match
        });
      }
      return variants2;
    }, []);
    const usedPermutations = new Set(
      newVariants.map((variant) => variant.options)
    );
    const unusedPermutations = permutations.filter(
      (permutation) => !usedPermutations.has(permutation)
    );
    unusedPermutations.forEach((permutation) => {
      newVariants.push({
        title: getVariantName(permutation),
        options: permutation,
        should_create: false,
        variant_rank: newVariants.length
      });
    });
    form.setValue("variants", newVariants);
  };
  const handleRankChange = (items) => {
    const update = items.map((item, index) => {
      const variant = watchedVariants.find((v) => v.title === item.title);
      return {
        id: item.id,
        ...variant || item,
        variant_rank: index
      };
    });
    variants.replace(update);
  };
  const getCheckboxState = (variants2) => {
    if (variants2.every((variant) => variant.should_create)) {
      return true;
    }
    if (variants2.some((variant) => variant.should_create)) {
      return "indeterminate";
    }
    return false;
  };
  const onCheckboxChange = (value) => {
    switch (value) {
      case true: {
        const update = watchedVariants.map((variant) => {
          return {
            ...variant,
            should_create: true
          };
        });
        form.setValue("variants", update);
        break;
      }
      case false: {
        const update = watchedVariants.map((variant) => {
          return {
            ...variant,
            should_create: false
          };
        });
        form.setValue("variants", decorateVariantsWithDefaultValues(update));
        break;
      }
      case "indeterminate":
        break;
    }
  };
  const createDefaultOptionAndVariant = () => {
    form.setValue("options", [
      {
        title: "Default option",
        values: ["Default option value"]
      }
    ]);
    form.setValue(
      "variants",
      decorateVariantsWithDefaultValues([
        {
          title: "Default variant",
          should_create: true,
          variant_rank: 0,
          options: {
            "Default option": "Default option value"
          },
          inventory: [{ inventory_item_id: "", required_quantity: "" }],
          is_default: true
        }
      ])
    );
  };
  return /* @__PURE__ */ jsxs4("div", { id: "variants", className: "flex flex-col gap-y-8", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-y-6", children: [
      /* @__PURE__ */ jsx4(Heading, { level: "h2", children: t("products.create.variants.header") }),
      /* @__PURE__ */ jsx4(
        SwitchBox,
        {
          control: form.control,
          name: "enable_variants",
          label: t("products.create.variants.subHeadingTitle"),
          description: t("products.create.variants.subHeadingDescription"),
          onCheckedChange: (checked) => {
            if (checked) {
              form.setValue("options", [
                {
                  title: "",
                  values: []
                }
              ]);
              form.setValue("variants", []);
            } else {
              createDefaultOptionAndVariant();
            }
          }
        }
      )
    ] }),
    watchedAreVariantsEnabled && /* @__PURE__ */ jsxs4(Fragment2, { children: [
      /* @__PURE__ */ jsx4("div", { className: "flex flex-col gap-y-6", children: /* @__PURE__ */ jsx4(
        Form.Field,
        {
          control: form.control,
          name: "options",
          render: () => {
            return /* @__PURE__ */ jsx4(Form.Item, { children: /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-y-6", children: [
              /* @__PURE__ */ jsxs4("div", { className: "flex items-start justify-between gap-x-4", children: [
                /* @__PURE__ */ jsxs4("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx4(Form.Label, { children: t("products.create.variants.productOptions.label") }),
                  /* @__PURE__ */ jsx4(Form.Hint, { children: t("products.create.variants.productOptions.hint") })
                ] }),
                /* @__PURE__ */ jsx4(
                  Button,
                  {
                    size: "small",
                    variant: "secondary",
                    type: "button",
                    onClick: () => {
                      options.append({
                        title: "",
                        values: []
                      });
                    },
                    children: t("actions.add")
                  }
                )
              ] }),
              showInvalidOptionsMessage && /* @__PURE__ */ jsx4(Alert, { dismissible: true, variant: "error", children: t("products.create.errors.options") }),
              /* @__PURE__ */ jsx4("ul", { className: "flex flex-col gap-y-4", children: options.fields.map((option, index) => {
                return /* @__PURE__ */ jsxs4(
                  "li",
                  {
                    className: "bg-ui-bg-component shadow-elevation-card-rest grid grid-cols-[1fr_28px] items-center gap-1.5 rounded-xl p-1.5",
                    children: [
                      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-[min-content,1fr] items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx4("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx4(
                          Label,
                          {
                            size: "xsmall",
                            weight: "plus",
                            className: "text-ui-fg-subtle",
                            htmlFor: `options.${index}.title`,
                            children: t("fields.title")
                          }
                        ) }),
                        /* @__PURE__ */ jsx4(
                          Input2,
                          {
                            className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                            ...form.register(
                              `options.${index}.title`
                            ),
                            placeholder: t(
                              "products.fields.options.optionTitlePlaceholder"
                            )
                          }
                        ),
                        /* @__PURE__ */ jsx4("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx4(
                          Label,
                          {
                            size: "xsmall",
                            weight: "plus",
                            className: "text-ui-fg-subtle",
                            htmlFor: `options.${index}.values`,
                            children: t("fields.values")
                          }
                        ) }),
                        /* @__PURE__ */ jsx4(
                          Controller,
                          {
                            control: form.control,
                            name: `options.${index}.values`,
                            render: ({
                              field: { onChange, ...field }
                            }) => {
                              const handleValueChange = (value) => {
                                handleOptionValueUpdate(index, value);
                                onChange(value);
                              };
                              return /* @__PURE__ */ jsx4(
                                ChipInput,
                                {
                                  ...field,
                                  variant: "contrast",
                                  onChange: handleValueChange,
                                  placeholder: t(
                                    "products.fields.options.variantionsPlaceholder"
                                  )
                                }
                              );
                            }
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsx4(
                        IconButton3,
                        {
                          type: "button",
                          size: "small",
                          variant: "transparent",
                          className: "text-ui-fg-muted",
                          disabled: index === 0,
                          onClick: () => handleRemoveOption(index),
                          children: /* @__PURE__ */ jsx4(XMarkMini, {})
                        }
                      )
                    ]
                  },
                  option.id
                );
              }) })
            ] }) });
          }
        }
      ) }),
      /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-1 gap-x-4 gap-y-8", children: /* @__PURE__ */ jsxs4("div", { className: "flex flex-col gap-y-6", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx4(Label, { weight: "plus", children: t("products.create.variants.productVariants.label") }),
          /* @__PURE__ */ jsx4(Hint, { children: t("products.create.variants.productVariants.hint") })
        ] }),
        !showInvalidOptionsMessage && showInvalidVariantsMessage && /* @__PURE__ */ jsx4(Alert, { dismissible: true, variant: "error", children: t("products.create.errors.variants") }),
        variants.fields.length > 0 ? /* @__PURE__ */ jsxs4("div", { className: "overflow-hidden rounded-xl border", children: [
          /* @__PURE__ */ jsxs4(
            "div",
            {
              className: "bg-ui-bg-component text-ui-fg-subtle grid items-center gap-3 border-b px-6 py-2.5",
              style: {
                gridTemplateColumns: `20px 28px repeat(${watchedOptions.length}, 1fr)`
              },
              children: [
                /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsx4(
                  Checkbox,
                  {
                    className: "relative",
                    checked: getCheckboxState(watchedVariants),
                    onCheckedChange: onCheckboxChange
                  }
                ) }),
                /* @__PURE__ */ jsx4("div", {}),
                watchedOptions.map((option, index) => /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", weight: "plus", children: option.title }) }, index))
              ]
            }
          ),
          /* @__PURE__ */ jsx4(
            SortableList,
            {
              items: variants.fields,
              onChange: handleRankChange,
              renderItem: (item, index) => {
                return /* @__PURE__ */ jsx4(
                  SortableList.Item,
                  {
                    id: item.id,
                    className: clx2("bg-ui-bg-base border-b", {
                      "border-b-0": index === variants.fields.length - 1
                    }),
                    children: /* @__PURE__ */ jsxs4(
                      "div",
                      {
                        className: "text-ui-fg-subtle grid w-full items-center gap-3 px-6 py-2.5",
                        style: {
                          gridTemplateColumns: `20px 28px repeat(${watchedOptions.length}, 1fr)`
                        },
                        children: [
                          /* @__PURE__ */ jsx4(
                            Form.Field,
                            {
                              control: form.control,
                              name: `variants.${index}.should_create`,
                              render: ({
                                field: { value, onChange, ...field }
                              }) => {
                                return /* @__PURE__ */ jsx4(Form.Item, { children: /* @__PURE__ */ jsx4(Form.Control, { children: /* @__PURE__ */ jsx4(
                                  Checkbox,
                                  {
                                    className: "relative",
                                    ...field,
                                    checked: value,
                                    onCheckedChange: onChange
                                  }
                                ) }) });
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx4(SortableList.DragHandle, {}),
                          Object.values(item.options).map((value, index2) => /* @__PURE__ */ jsx4(Text2, { size: "small", leading: "compact", children: value }, index2))
                        ]
                      }
                    )
                  }
                );
              }
            }
          )
        ] }) : /* @__PURE__ */ jsx4(Alert, { children: t("products.create.variants.productVariants.alert") }),
        variants.fields.length > 0 && /* @__PURE__ */ jsx4(InlineTip, { label: t("general.tip"), children: t("products.create.variants.productVariants.tip") })
      ] }) })
    ] })
  ] });
};

// src/routes/products/product-create/components/product-create-details-form/product-create-details-form.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var ProductCreateDetailsForm = ({ form }) => {
  const { getFormFields } = useExtension();
  const fields = getFormFields("product", "create", "general");
  return /* @__PURE__ */ jsx5("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsxs5("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
    /* @__PURE__ */ jsx5(Header, {}),
    /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-y-6", children: [
      /* @__PURE__ */ jsx5(ProductCreateGeneralSection, { form }),
      /* @__PURE__ */ jsx5(FormExtensionZone, { fields, form }),
      /* @__PURE__ */ jsx5(ProductCreateMediaSection, { form })
    ] }),
    /* @__PURE__ */ jsx5(Divider, {}),
    /* @__PURE__ */ jsx5(ProductCreateVariantsSection, { form })
  ] }) });
};
var Header = () => {
  const { t } = useTranslation4();
  return /* @__PURE__ */ jsx5("div", { className: "flex flex-col", children: /* @__PURE__ */ jsx5(Heading2, { children: t("products.create.header") }) });
};

// src/routes/products/product-create/components/product-create-inventory-kit-form/components/product-create-inventory-kit-section/product-create-inventory-kit-section.tsx
import { Button as Button2, Heading as Heading3, IconButton as IconButton4, Input as Input3, Label as Label2 } from "@medusajs/ui";
import { useFieldArray as useFieldArray3, useWatch as useWatch2 } from "react-hook-form";
import { XMarkMini as XMarkMini2 } from "@medusajs/icons";
import { useTranslation as useTranslation5 } from "react-i18next";
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function InventoryItemRow({
  form,
  variantIndex,
  inventoryIndex,
  inventoryItem,
  isItemOptionDisabled,
  onRemove
}) {
  const { t } = useTranslation5();
  const items = useComboboxData({
    queryKey: ["inventory_items"],
    defaultValueKey: "id",
    defaultValue: inventoryItem.inventory_item_id,
    // prefetch existing inventory items
    queryFn: (params) => sdk.admin.inventoryItem.list(params),
    getOptions: (data) => data.inventory_items.map((item) => ({
      label: `${item.title} ${item.sku ? `(${item.sku})` : ""}`,
      value: item.id
    }))
  });
  return /* @__PURE__ */ jsxs6(
    "li",
    {
      className: "bg-ui-bg-component shadow-elevation-card-rest grid grid-cols-[1fr_28px] items-center gap-1.5 rounded-xl p-1.5",
      children: [
        /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-[min-content,1fr] items-center gap-1.5", children: [
          /* @__PURE__ */ jsx6("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx6(
            Label2,
            {
              size: "xsmall",
              weight: "plus",
              className: "text-ui-fg-subtle",
              htmlFor: `variants.${variantIndex}.inventory.${inventoryIndex}.inventory_item_id`,
              children: t("fields.item")
            }
          ) }),
          /* @__PURE__ */ jsx6(
            Form.Field,
            {
              control: form.control,
              name: `variants.${variantIndex}.inventory.${inventoryIndex}.inventory_item_id`,
              render: ({ field }) => {
                return /* @__PURE__ */ jsx6(Form.Item, { children: /* @__PURE__ */ jsx6(Form.Control, { children: /* @__PURE__ */ jsx6(
                  Combobox,
                  {
                    ...field,
                    options: items.options.map((o) => ({
                      ...o,
                      disabled: isItemOptionDisabled(o, inventoryIndex)
                    })),
                    searchValue: items.searchValue,
                    onBlur: () => items.onSearchValueChange(""),
                    onSearchValueChange: items.onSearchValueChange,
                    fetchNextPage: items.fetchNextPage,
                    className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover",
                    placeholder: t("products.create.inventory.itemPlaceholder")
                  }
                ) }) });
              }
            }
          ),
          /* @__PURE__ */ jsx6("div", { className: "flex items-center px-2 py-1.5", children: /* @__PURE__ */ jsx6(
            Label2,
            {
              size: "xsmall",
              weight: "plus",
              className: "text-ui-fg-subtle",
              htmlFor: `variants.${variantIndex}.inventory.${inventoryIndex}.required_quantity`,
              children: t("fields.quantity")
            }
          ) }),
          /* @__PURE__ */ jsx6(
            Form.Field,
            {
              control: form.control,
              name: `variants.${variantIndex}.inventory.${inventoryIndex}.required_quantity`,
              render: ({ field: { onChange, value, ...field } }) => {
                return /* @__PURE__ */ jsxs6(Form.Item, { children: [
                  /* @__PURE__ */ jsx6(Form.Control, { children: /* @__PURE__ */ jsx6(
                    Input3,
                    {
                      type: "number",
                      className: "bg-ui-bg-field-component",
                      min: 0,
                      value,
                      onChange: (e) => {
                        const value2 = e.target.value;
                        if (value2 === "") {
                          onChange(null);
                        } else {
                          onChange(Number(value2));
                        }
                      },
                      ...field,
                      placeholder: t(
                        "products.create.inventory.quantityPlaceholder"
                      )
                    }
                  ) }),
                  /* @__PURE__ */ jsx6(Form.ErrorMessage, {})
                ] });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx6(
          IconButton4,
          {
            type: "button",
            size: "small",
            variant: "transparent",
            className: "text-ui-fg-muted",
            onClick: onRemove,
            children: /* @__PURE__ */ jsx6(XMarkMini2, {})
          }
        )
      ]
    },
    inventoryItem.id
  );
}
function VariantSection({ form, variant, index }) {
  const { t } = useTranslation5();
  const inventory = useFieldArray3({
    control: form.control,
    name: `variants.${index}.inventory`
  });
  const inventoryFormData = useWatch2({
    control: form.control,
    name: `variants.${index}.inventory`
  });
  const isItemOptionDisabled = (option, inventoryIndex) => {
    return !!inventoryFormData?.some(
      (i, index2) => index2 != inventoryIndex && i.inventory_item_id === option.value
    );
  };
  return /* @__PURE__ */ jsxs6("div", { className: "grid gap-y-4", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-start justify-between gap-x-4", children: [
      /* @__PURE__ */ jsxs6("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsx6(Form.Label, { children: variant.title }),
        /* @__PURE__ */ jsx6(Form.Hint, { children: t("products.create.inventory.label") })
      ] }),
      /* @__PURE__ */ jsx6(
        Button2,
        {
          size: "small",
          variant: "secondary",
          type: "button",
          onClick: () => {
            inventory.append({
              inventory_item_id: "",
              required_quantity: ""
            });
          },
          children: t("actions.add")
        }
      )
    ] }),
    inventory.fields.map((inventoryItem, inventoryIndex) => /* @__PURE__ */ jsx6(
      InventoryItemRow,
      {
        form,
        variantIndex: index,
        inventoryIndex,
        inventoryItem,
        isItemOptionDisabled,
        onRemove: () => inventory.remove(inventoryIndex)
      },
      inventoryItem.id
    ))
  ] });
}
var ProductCreateInventoryKitSection = ({
  form
}) => {
  const { t } = useTranslation5();
  const variants = useFieldArray3({
    control: form.control,
    name: "variants"
  });
  return /* @__PURE__ */ jsxs6("div", { id: "organize", className: "flex flex-col gap-y-8", children: [
    /* @__PURE__ */ jsx6(Heading3, { children: t("products.create.inventory.heading") }),
    variants.fields.filter((v) => v.inventory_kit).map((variant, variantIndex) => /* @__PURE__ */ jsx6(
      VariantSection,
      {
        form,
        variant,
        index: variantIndex
      },
      variant.id
    ))
  ] });
};

// src/routes/products/product-create/components/product-create-inventory-kit-form/product-create-inventory-kit-form.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var ProductCreateInventoryKitForm = ({
  form
}) => {
  return /* @__PURE__ */ jsx7("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsx7("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: /* @__PURE__ */ jsx7(ProductCreateInventoryKitSection, { form }) }) });
};

// src/routes/products/product-create/components/product-create-organize-form/components/product-create-organize-section/product-create-details-organize-section.tsx
import { Button as Button3, Heading as Heading4 } from "@medusajs/ui";
import { useFieldArray as useFieldArray4 } from "react-hook-form";
import { Trans, useTranslation as useTranslation6 } from "react-i18next";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var ProductCreateOrganizationSection = ({
  form
}) => {
  const { t } = useTranslation6();
  const collections = useComboboxData({
    queryKey: ["product_collections"],
    queryFn: (params) => sdk.admin.productCollection.list(params),
    getOptions: (data) => data.collections.map((collection) => ({
      label: collection.title,
      value: collection.id
    }))
  });
  const types = useComboboxData({
    queryKey: ["product_types"],
    queryFn: (params) => sdk.admin.productType.list(params),
    getOptions: (data) => data.product_types.map((type) => ({
      label: type.value,
      value: type.id
    }))
  });
  const tags = useComboboxData({
    queryKey: ["product_tags"],
    queryFn: (params) => sdk.admin.productTag.list(params),
    getOptions: (data) => data.product_tags.map((tag) => ({
      label: tag.value,
      value: tag.id
    }))
  });
  const shippingProfiles = useComboboxData({
    queryKey: ["shipping_profiles"],
    queryFn: (params) => sdk.admin.shippingProfile.list(params),
    getOptions: (data) => data.shipping_profiles.map((shippingProfile) => ({
      label: shippingProfile.name,
      value: shippingProfile.id
    }))
  });
  const { fields, remove, replace } = useFieldArray4({
    control: form.control,
    name: "sales_channels",
    keyName: "key"
  });
  const handleClearAllSalesChannels = () => {
    replace([]);
  };
  return /* @__PURE__ */ jsxs7("div", { id: "organize", className: "flex flex-col gap-y-8", children: [
    /* @__PURE__ */ jsx8(Heading4, { children: t("products.organization.header") }),
    /* @__PURE__ */ jsx8(
      SwitchBox,
      {
        control: form.control,
        name: "discountable",
        label: t("products.fields.discountable.label"),
        description: t("products.fields.discountable.hint"),
        optional: true
      }
    ),
    /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "type_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs7(Form.Item, { children: [
              /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.type.label") }),
              /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(
                Combobox,
                {
                  ...field,
                  options: types.options,
                  searchValue: types.searchValue,
                  onSearchValueChange: types.onSearchValueChange,
                  fetchNextPage: types.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx8(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "collection_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs7(Form.Item, { children: [
              /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.collection.label") }),
              /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(
                Combobox,
                {
                  ...field,
                  options: collections.options,
                  searchValue: collections.searchValue,
                  onSearchValueChange: collections.onSearchValueChange,
                  fetchNextPage: collections.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx8(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "categories",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs7(Form.Item, { children: [
              /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.categories.label") }),
              /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(CategoryCombobox, { ...field }) }),
              /* @__PURE__ */ jsx8(Form.ErrorMessage, {})
            ] });
          }
        }
      ),
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "tags",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs7(Form.Item, { children: [
              /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.tags.label") }),
              /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(
                Combobox,
                {
                  ...field,
                  options: tags.options,
                  searchValue: tags.searchValue,
                  onSearchValueChange: tags.onSearchValueChange,
                  fetchNextPage: tags.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx8(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs7("div", { children: [
        /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.shipping_profile.label") }),
        /* @__PURE__ */ jsx8(Form.Hint, { children: /* @__PURE__ */ jsx8(Trans, { i18nKey: "products.fields.shipping_profile.hint" }) })
      ] }),
      /* @__PURE__ */ jsx8(
        Form.Field,
        {
          control: form.control,
          name: "shipping_profile_id",
          render: ({ field }) => {
            return /* @__PURE__ */ jsxs7(Form.Item, { children: [
              /* @__PURE__ */ jsx8(Form.Control, { children: /* @__PURE__ */ jsx8(
                Combobox,
                {
                  ...field,
                  options: shippingProfiles.options,
                  searchValue: shippingProfiles.searchValue,
                  onSearchValueChange: shippingProfiles.onSearchValueChange,
                  fetchNextPage: shippingProfiles.fetchNextPage
                }
              ) }),
              /* @__PURE__ */ jsx8(Form.ErrorMessage, {})
            ] });
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-1 gap-y-4", children: /* @__PURE__ */ jsx8(
      Form.Field,
      {
        control: form.control,
        name: "sales_channels",
        render: () => {
          return /* @__PURE__ */ jsxs7(Form.Item, { children: [
            /* @__PURE__ */ jsxs7("div", { className: "flex items-start justify-between gap-x-4", children: [
              /* @__PURE__ */ jsxs7("div", { children: [
                /* @__PURE__ */ jsx8(Form.Label, { optional: true, children: t("products.fields.sales_channels.label") }),
                /* @__PURE__ */ jsx8(Form.Hint, { children: /* @__PURE__ */ jsx8(Trans, { i18nKey: "products.fields.sales_channels.hint" }) })
              ] }),
              /* @__PURE__ */ jsx8(StackedFocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx8(Button3, { size: "small", variant: "secondary", type: "button", children: t("actions.add") }) })
            ] }),
            /* @__PURE__ */ jsx8(Form.Control, { className: "mt-0", children: fields.length > 0 && /* @__PURE__ */ jsx8(
              ChipGroup,
              {
                onClearAll: handleClearAllSalesChannels,
                onRemove: remove,
                className: "py-4",
                children: fields.map((field, index) => /* @__PURE__ */ jsx8(ChipGroup.Chip, { index, children: field.name }, field.key))
              }
            ) })
          ] });
        }
      }
    ) })
  ] });
};

// src/routes/products/product-create/components/product-create-organize-form/components/product-create-sales-channel-stacked-modal/product-create-sales-channel-drawer.tsx
import {
  Button as Button4,
  createDataTableColumnHelper
} from "@medusajs/ui";
import { useEffect, useMemo as useMemo2, useState as useState3 } from "react";
import { useTranslation as useTranslation7 } from "react-i18next";
import { keepPreviousData } from "@tanstack/react-query";

// src/routes/products/product-create/components/product-create-organize-form/constants.ts
var SC_STACKED_MODAL_ID = "sc";

// src/routes/products/product-create/components/product-create-organize-form/components/product-create-sales-channel-stacked-modal/product-create-sales-channel-drawer.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var PAGE_SIZE = 50;
var ProductCreateSalesChannelStackedModal = ({
  form
}) => {
  const { t } = useTranslation7();
  const { getValues, setValue } = form;
  const { setIsOpen, getIsOpen } = useStackedModal();
  const [rowSelection, setRowSelection] = useState3(
    {}
  );
  const [state, setState] = useState3([]);
  const searchParams = useSalesChannelTableQuery({
    pageSize: PAGE_SIZE,
    prefix: SC_STACKED_MODAL_ID
  });
  const { sales_channels, count, isLoading, isError, error } = useSalesChannels(
    searchParams,
    {
      placeholderData: keepPreviousData
    }
  );
  const open = getIsOpen(SC_STACKED_MODAL_ID);
  useEffect(() => {
    if (!open) {
      return;
    }
    const salesChannels = getValues("sales_channels");
    if (salesChannels) {
      setState(
        salesChannels.map((channel) => ({
          id: channel.id,
          name: channel.name
        }))
      );
      setRowSelection(
        salesChannels.reduce(
          (acc, channel) => ({
            ...acc,
            [channel.id]: true
          }),
          {}
        )
      );
    }
  }, [open, getValues]);
  const onRowSelectionChange = (state2) => {
    const ids = Object.keys(state2);
    const addedIdsSet = new Set(
      ids.filter((id) => state2[id] && !rowSelection[id])
    );
    let addedSalesChannels = [];
    if (addedIdsSet.size > 0) {
      addedSalesChannels = sales_channels?.filter((channel) => addedIdsSet.has(channel.id)) ?? [];
    }
    setState((prev) => {
      const filteredPrev = prev.filter((channel) => state2[channel.id]);
      return Array.from(/* @__PURE__ */ new Set([...filteredPrev, ...addedSalesChannels]));
    });
    setRowSelection(state2);
  };
  const handleAdd = () => {
    setValue("sales_channels", state, {
      shouldDirty: true,
      shouldTouch: true
    });
    setIsOpen(SC_STACKED_MODAL_ID, false);
  };
  const filters = useSalesChannelTableFilters();
  const columns = useColumns();
  const emptyState = useSalesChannelTableEmptyState();
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs8(StackedFocusModal.Content, { className: "flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx9(StackedFocusModal.Header, {}),
    /* @__PURE__ */ jsx9(StackedFocusModal.Body, { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsx9(
      DataTable,
      {
        data: sales_channels,
        columns,
        filters,
        emptyState,
        rowCount: count,
        pageSize: PAGE_SIZE,
        getRowId: (row) => row.id,
        rowSelection: {
          state: rowSelection,
          onRowSelectionChange
        },
        isLoading,
        layout: "fill",
        prefix: SC_STACKED_MODAL_ID
      }
    ) }),
    /* @__PURE__ */ jsx9(StackedFocusModal.Footer, { children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsx9(StackedFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx9(Button4, { size: "small", variant: "secondary", type: "button", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx9(Button4, { size: "small", onClick: handleAdd, type: "button", children: t("actions.save") })
    ] }) })
  ] });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = () => {
  const base = useSalesChannelTableColumns();
  return useMemo2(() => [columnHelper.select(), ...base], [base]);
};

// src/routes/products/product-create/components/product-create-organize-form/product-create-organize-form.tsx
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var ProductCreateOrganizeForm = ({ form }) => {
  const { getFormFields } = useExtension();
  const fields = getFormFields("product", "create", "organize");
  return /* @__PURE__ */ jsxs9(StackedFocusModal, { id: SC_STACKED_MODAL_ID, children: [
    /* @__PURE__ */ jsx10("div", { className: "flex flex-col items-center p-16", children: /* @__PURE__ */ jsxs9("div", { className: "flex w-full max-w-[720px] flex-col gap-y-8", children: [
      /* @__PURE__ */ jsx10(ProductCreateOrganizationSection, { form }),
      /* @__PURE__ */ jsx10(FormExtensionZone, { fields, form })
    ] }) }),
    /* @__PURE__ */ jsx10(ProductCreateSalesChannelStackedModal, { form })
  ] });
};

// src/routes/products/product-create/components/product-create-variants-form/product-create-variants-form.tsx
import { useMemo as useMemo3 } from "react";
import { useWatch as useWatch3 } from "react-hook-form";
import { useTranslation as useTranslation8 } from "react-i18next";
import { jsx as jsx11 } from "react/jsx-runtime";
var ProductCreateVariantsForm = ({
  form,
  regions,
  store,
  pricePreferences
}) => {
  const { setCloseOnEscape } = useRouteModal();
  const currencyCodes = useMemo3(
    () => store?.supported_currencies?.map((c) => c.currency_code) || [],
    [store]
  );
  const variants = useWatch3({
    control: form.control,
    name: "variants",
    defaultValue: []
  });
  const options = useWatch3({
    control: form.control,
    name: "options",
    defaultValue: []
  });
  const columns = useColumns2({
    options,
    currencies: currencyCodes,
    regions,
    pricePreferences
  });
  const variantData = useMemo3(() => {
    const ret = [];
    variants.forEach((v, i) => {
      if (v.should_create) {
        ret.push({ ...v, originalIndex: i });
      }
    });
    return ret;
  }, [variants]);
  return /* @__PURE__ */ jsx11("div", { className: "flex size-full flex-col divide-y overflow-hidden", children: /* @__PURE__ */ jsx11(
    DataGrid,
    {
      columns,
      data: variantData,
      state: form,
      onEditingChange: (editing) => setCloseOnEscape(!editing)
    }
  ) });
};
var columnHelper2 = createDataGridHelper();
var useColumns2 = ({
  options,
  currencies = [],
  regions = [],
  pricePreferences = []
}) => {
  const { t } = useTranslation8();
  return useMemo3(
    () => [
      columnHelper2.column({
        id: "options",
        header: () => /* @__PURE__ */ jsx11("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx11("span", { className: "truncate", children: options.map((o) => o.title).join(" / ") }) }),
        cell: (context) => {
          return /* @__PURE__ */ jsx11(DataGrid.ReadonlyCell, { context, children: options.map((o) => context.row.original.options[o.title]).join(" / ") });
        },
        disableHiding: true
      }),
      columnHelper2.column({
        id: "title",
        name: t("fields.title"),
        header: t("fields.title"),
        field: (context) => `variants.${context.row.original.originalIndex}.title`,
        type: "text",
        cell: (context) => {
          return /* @__PURE__ */ jsx11(DataGrid.TextCell, { context });
        }
      }),
      columnHelper2.column({
        id: "sku",
        name: t("fields.sku"),
        header: t("fields.sku"),
        field: (context) => `variants.${context.row.original.originalIndex}.sku`,
        type: "text",
        cell: (context) => {
          return /* @__PURE__ */ jsx11(DataGrid.TextCell, { context });
        }
      }),
      columnHelper2.column({
        id: "manage_inventory",
        name: t("fields.managedInventory"),
        header: t("fields.managedInventory"),
        field: (context) => `variants.${context.row.original.originalIndex}.manage_inventory`,
        type: "boolean",
        cell: (context) => {
          return /* @__PURE__ */ jsx11(DataGrid.BooleanCell, { context });
        }
      }),
      columnHelper2.column({
        id: "allow_backorder",
        name: t("fields.allowBackorder"),
        header: t("fields.allowBackorder"),
        field: (context) => `variants.${context.row.original.originalIndex}.allow_backorder`,
        type: "boolean",
        cell: (context) => {
          return /* @__PURE__ */ jsx11(DataGrid.BooleanCell, { context });
        }
      }),
      columnHelper2.column({
        id: "inventory_kit",
        name: t("fields.inventoryKit"),
        header: t("fields.inventoryKit"),
        field: (context) => `variants.${context.row.original.originalIndex}.inventory_kit`,
        type: "boolean",
        cell: (context) => {
          return /* @__PURE__ */ jsx11(
            DataGrid.BooleanCell,
            {
              context,
              disabled: !context.row.original.manage_inventory
            }
          );
        }
      }),
      ...createDataGridPriceColumns({
        currencies,
        regions,
        pricePreferences,
        getFieldName: (context, value) => {
          if (context.column.id?.startsWith("currency_prices")) {
            return `variants.${context.row.original.originalIndex}.prices.${value}`;
          }
          return `variants.${context.row.original.originalIndex}.prices.${value}`;
        },
        t
      })
    ],
    [currencies, regions, options, pricePreferences, t]
  );
};

// src/routes/products/product-create/components/product-create-form/product-create-form.tsx
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
var SAVE_DRAFT_BUTTON = "save-draft-button";
var ProductCreateForm = ({
  defaultChannel,
  regions,
  store,
  pricePreferences
}) => {
  const [tab, setTab] = useState4("details" /* DETAILS */);
  const [tabState, setTabState] = useState4({
    ["details" /* DETAILS */]: "in-progress",
    ["organize" /* ORGANIZE */]: "not-started",
    ["variants" /* VARIANTS */]: "not-started",
    ["inventory" /* INVENTORY */]: "not-started"
  });
  const { t } = useTranslation9();
  const { handleSuccess } = useRouteModal();
  const { getFormConfigs } = useExtension();
  const configs = getFormConfigs("product", "create");
  const form = useExtendableForm({
    defaultValues: {
      ...PRODUCT_CREATE_FORM_DEFAULTS,
      sales_channels: defaultChannel ? [{ id: defaultChannel.id, name: defaultChannel.name }] : []
    },
    schema: ProductCreateSchema,
    configs
  });
  const { mutateAsync, isPending } = useCreateProduct();
  const regionsCurrencyMap = useMemo4(() => {
    if (!regions?.length) {
      return {};
    }
    return regions.reduce(
      (acc, reg) => {
        acc[reg.id] = reg.currency_code;
        return acc;
      },
      {}
    );
  }, [regions]);
  const watchedVariants = useWatch4({
    control: form.control,
    name: "variants"
  });
  const showInventoryTab = useMemo4(
    () => watchedVariants.some((v) => v.manage_inventory && v.inventory_kit),
    [watchedVariants]
  );
  const handleSubmit = form.handleSubmit(async (values, e) => {
    let isDraftSubmission = false;
    if (e?.nativeEvent instanceof SubmitEvent) {
      const submitter = e?.nativeEvent?.submitter;
      isDraftSubmission = submitter.dataset.name === SAVE_DRAFT_BUTTON;
    }
    const media = values.media || [];
    const payload = { ...values, media: void 0 };
    let uploadedMedia = [];
    try {
      if (media.length) {
        const thumbnailReq = media.find((m) => m.isThumbnail);
        const otherMediaReq = media.filter((m) => !m.isThumbnail);
        const fileReqs = [];
        if (thumbnailReq) {
          fileReqs.push(
            sdk.admin.upload.create({ files: [thumbnailReq.file] }).then((r) => r.files.map((f) => ({ ...f, isThumbnail: true })))
          );
        }
        if (otherMediaReq?.length) {
          fileReqs.push(
            sdk.admin.upload.create({
              files: otherMediaReq.map((m) => m.file)
            }).then((r) => r.files.map((f) => ({ ...f, isThumbnail: false })))
          );
        }
        uploadedMedia = (await Promise.all(fileReqs)).flat();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    await mutateAsync(
      normalizeProductFormValues({
        ...payload,
        media: uploadedMedia,
        status: isDraftSubmission ? "draft" : "published",
        regionsCurrencyMap
      }),
      {
        onSuccess: (data) => {
          toast.success(
            t("products.create.successToast", {
              title: data.product.title
            })
          );
          handleSuccess(`../${data.product.id}`);
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const onNext = async (currentTab) => {
    const valid = await form.trigger();
    if (!valid) {
      return;
    }
    if (currentTab === "details" /* DETAILS */) {
      setTab("organize" /* ORGANIZE */);
    }
    if (currentTab === "organize" /* ORGANIZE */) {
      setTab("variants" /* VARIANTS */);
    }
    if (currentTab === "variants" /* VARIANTS */) {
      setTab("inventory" /* INVENTORY */);
    }
  };
  useEffect2(() => {
    const currentState = { ...tabState };
    if (tab === "details" /* DETAILS */) {
      currentState["details" /* DETAILS */] = "in-progress";
    }
    if (tab === "organize" /* ORGANIZE */) {
      currentState["details" /* DETAILS */] = "completed";
      currentState["organize" /* ORGANIZE */] = "in-progress";
    }
    if (tab === "variants" /* VARIANTS */) {
      currentState["details" /* DETAILS */] = "completed";
      currentState["organize" /* ORGANIZE */] = "completed";
      currentState["variants" /* VARIANTS */] = "in-progress";
    }
    if (tab === "inventory" /* INVENTORY */) {
      currentState["details" /* DETAILS */] = "completed";
      currentState["organize" /* ORGANIZE */] = "completed";
      currentState["variants" /* VARIANTS */] = "completed";
      currentState["inventory" /* INVENTORY */] = "in-progress";
    }
    setTabState({ ...currentState });
  }, [tab]);
  return /* @__PURE__ */ jsx12(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsxs10(
    KeyboundForm,
    {
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          if (e.target instanceof HTMLTextAreaElement && !(e.metaKey || e.ctrlKey)) {
            return;
          }
          e.preventDefault();
          if (e.metaKey || e.ctrlKey) {
            if (tab !== "variants" /* VARIANTS */) {
              e.preventDefault();
              e.stopPropagation();
              onNext(tab);
              return;
            }
            handleSubmit();
          }
        }
      },
      onSubmit: handleSubmit,
      className: "flex h-full flex-col",
      children: [
        /* @__PURE__ */ jsxs10(
          ProgressTabs,
          {
            value: tab,
            onValueChange: async (tab2) => {
              const valid = await form.trigger();
              if (!valid) {
                return;
              }
              setTab(tab2);
            },
            className: "flex h-full flex-col overflow-hidden",
            children: [
              /* @__PURE__ */ jsx12(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx12("div", { className: "-my-2 w-full border-l", children: /* @__PURE__ */ jsxs10(ProgressTabs.List, { className: "justify-start-start flex w-full items-center", children: [
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Trigger,
                  {
                    status: tabState["details" /* DETAILS */],
                    value: "details" /* DETAILS */,
                    className: "max-w-[200px] truncate",
                    children: t("products.create.tabs.details")
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Trigger,
                  {
                    status: tabState["organize" /* ORGANIZE */],
                    value: "organize" /* ORGANIZE */,
                    className: "max-w-[200px] truncate",
                    children: t("products.create.tabs.organize")
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Trigger,
                  {
                    status: tabState["variants" /* VARIANTS */],
                    value: "variants" /* VARIANTS */,
                    className: "max-w-[200px] truncate",
                    children: t("products.create.tabs.variants")
                  }
                ),
                showInventoryTab && /* @__PURE__ */ jsx12(
                  ProgressTabs.Trigger,
                  {
                    status: tabState["inventory" /* INVENTORY */],
                    value: "inventory" /* INVENTORY */,
                    className: "max-w-[200px] truncate",
                    children: t("products.create.tabs.inventory")
                  }
                )
              ] }) }) }),
              /* @__PURE__ */ jsxs10(RouteFocusModal.Body, { className: "size-full overflow-hidden", children: [
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Content,
                  {
                    className: "size-full overflow-y-auto",
                    value: "details" /* DETAILS */,
                    children: /* @__PURE__ */ jsx12(ProductCreateDetailsForm, { form })
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Content,
                  {
                    className: "size-full overflow-y-auto",
                    value: "organize" /* ORGANIZE */,
                    children: /* @__PURE__ */ jsx12(ProductCreateOrganizeForm, { form })
                  }
                ),
                /* @__PURE__ */ jsx12(
                  ProgressTabs.Content,
                  {
                    className: "size-full overflow-y-auto",
                    value: "variants" /* VARIANTS */,
                    children: /* @__PURE__ */ jsx12(
                      ProductCreateVariantsForm,
                      {
                        form,
                        store,
                        regions,
                        pricePreferences
                      }
                    )
                  }
                ),
                showInventoryTab && /* @__PURE__ */ jsx12(
                  ProgressTabs.Content,
                  {
                    className: "size-full overflow-y-auto",
                    value: "inventory" /* INVENTORY */,
                    children: /* @__PURE__ */ jsx12(ProductCreateInventoryKitForm, { form })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx12(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx12(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx12(Button5, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx12(
            Button5,
            {
              "data-name": SAVE_DRAFT_BUTTON,
              size: "small",
              type: "submit",
              isLoading: isPending,
              className: "whitespace-nowrap",
              children: t("actions.saveAsDraft")
            }
          ),
          /* @__PURE__ */ jsx12(
            PrimaryButton,
            {
              tab,
              next: onNext,
              isLoading: isPending,
              showInventoryTab
            }
          )
        ] }) })
      ]
    }
  ) });
};
var PrimaryButton = ({
  tab,
  next,
  isLoading,
  showInventoryTab
}) => {
  const { t } = useTranslation9();
  if (tab === "variants" /* VARIANTS */ && !showInventoryTab || tab === "inventory" /* INVENTORY */ && showInventoryTab) {
    return /* @__PURE__ */ jsx12(
      Button5,
      {
        "data-name": "publish-button",
        type: "submit",
        variant: "primary",
        size: "small",
        isLoading,
        children: t("actions.publish")
      },
      "submit-button"
    );
  }
  return /* @__PURE__ */ jsx12(
    Button5,
    {
      type: "button",
      variant: "primary",
      size: "small",
      onClick: () => next(tab),
      children: t("actions.continue")
    },
    "next-button"
  );
};

// src/routes/products/product-create/product-create.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
var ProductCreate = () => {
  const { t } = useTranslation10();
  const {
    store,
    isPending: isStorePending,
    isError: isStoreError,
    error: storeError
  } = useStore({
    fields: "+default_sales_channel"
  });
  const {
    sales_channel,
    isPending: isSalesChannelPending,
    isError: isSalesChannelError,
    error: salesChannelError
  } = useSalesChannel(store?.default_sales_channel_id, {
    enabled: !!store?.default_sales_channel_id
  });
  const {
    regions,
    isPending: isRegionsPending,
    isError: isRegionsError,
    error: regionsError
  } = useRegions({ limit: 9999 });
  const {
    price_preferences,
    isPending: isPricePreferencesPending,
    isError: isPricePreferencesError,
    error: pricePreferencesError
  } = usePricePreferences({
    limit: 9999
  });
  const ready = !!store && !isStorePending && !!regions && !isRegionsPending && !!sales_channel && !isSalesChannelPending && !!price_preferences && !isPricePreferencesPending;
  if (isStoreError) {
    throw storeError;
  }
  if (isRegionsError) {
    throw regionsError;
  }
  if (isSalesChannelError) {
    throw salesChannelError;
  }
  if (isPricePreferencesError) {
    throw pricePreferencesError;
  }
  return /* @__PURE__ */ jsxs11(RouteFocusModal, { children: [
    /* @__PURE__ */ jsx13(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx13("span", { className: "sr-only", children: t("products.create.title") }) }),
    /* @__PURE__ */ jsx13(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx13("span", { className: "sr-only", children: t("products.create.description") }) }),
    ready && /* @__PURE__ */ jsx13(
      ProductCreateForm,
      {
        defaultChannel: sales_channel,
        store,
        pricePreferences: price_preferences,
        regions
      }
    )
  ] });
};
export {
  ProductCreate as Component
};
