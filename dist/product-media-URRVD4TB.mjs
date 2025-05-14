import {
  EditProductMediaSchema,
  UploadMediaFormItem
} from "./chunk-LJGH7IDZ.mjs";
import "./chunk-ZQRKUG6J.mjs";
import "./chunk-TYTNUPXB.mjs";
import "./chunk-6GU6IDUA.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteFocusModal,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-3CBDGI2O.mjs";
import "./chunk-OBQI23QM.mjs";
import {
  useProduct,
  useUpdateProduct
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-media/product-media.tsx
import { useTranslation as useTranslation3 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/products/product-media/components/product-media-view/product-media-view.tsx
import { useSearchParams } from "react-router-dom";

// src/routes/products/product-media/components/edit-product-media-form/edit-product-media-form.tsx
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
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbnailBadge } from "@medusajs/icons";
import { Button, Checkbox, clx, CommandBar, toast, Tooltip } from "@medusajs/ui";
import { Fragment, useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
var EditProductMediaForm = ({ product }) => {
  const [selection, setSelection] = useState({});
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const form = useForm({
    defaultValues: {
      media: getDefaultValues(product.images, product.thumbnail)
    },
    resolver: zodResolver(EditProductMediaSchema)
  });
  const { fields, append, remove, update } = useFieldArray({
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
  const { mutateAsync, isPending } = useUpdateProduct(product.id);
  const handleSubmit = form.handleSubmit(async ({ media }) => {
    const filesToUpload = media.map((m, i) => ({ file: m.file, index: i })).filter((m) => !!m.file);
    let uploaded = [];
    if (filesToUpload.length) {
      const { files: uploads } = await sdk.admin.upload.create({ files: filesToUpload.map((m) => m.file) }).catch(() => {
        form.setError("media", {
          type: "invalid_file",
          message: t("products.media.failedToUpload")
        });
        return { files: [] };
      });
      uploaded = uploads;
    }
    const withUpdatedUrls = media.map((entry, i) => {
      const toUploadIndex = filesToUpload.findIndex((m) => m.index === i);
      if (toUploadIndex > -1) {
        return { ...entry, url: uploaded[toUploadIndex]?.url };
      }
      return entry;
    });
    const thumbnail = withUpdatedUrls.find((m) => m.isThumbnail)?.url;
    await mutateAsync(
      {
        images: withUpdatedUrls.map((file) => ({ url: file.url, id: file.id })),
        thumbnail: thumbnail || null
      },
      {
        onSuccess: () => {
          toast.success(t("products.media.successToast"));
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const handleCheckedChange = useCallback(
    (id) => {
      return (val) => {
        if (!val) {
          const { [id]: _, ...rest } = selection;
          setSelection(rest);
        } else {
          setSelection((prev) => ({ ...prev, [id]: true }));
        }
      };
    },
    [selection]
  );
  const handleDelete = () => {
    const ids = Object.keys(selection);
    const indices = ids.map((id) => fields.findIndex((m) => m.id === id));
    remove(indices);
    setSelection({});
  };
  const handlePromoteToThumbnail = () => {
    const ids = Object.keys(selection);
    if (!ids.length) {
      return;
    }
    const currentThumbnailIndex = fields.findIndex((m) => m.isThumbnail);
    if (currentThumbnailIndex > -1) {
      update(currentThumbnailIndex, {
        ...fields[currentThumbnailIndex],
        isThumbnail: false
      });
    }
    const index = fields.findIndex((m) => m.id === ids[0]);
    update(index, {
      ...fields[index],
      isThumbnail: true
    });
    setSelection({});
  };
  const selectionCount = Object.keys(selection).length;
  return /* @__PURE__ */ jsx(RouteFocusModal.Form, { blockSearchParams: true, form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex size-full flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsx(RouteFocusModal.Header, { children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end gap-x-2", children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", asChild: true, children: /* @__PURE__ */ jsx(Link, { to: { pathname: ".", search: void 0 }, children: t("products.media.galleryLabel") }) }) }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Body, { className: "flex flex-col overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex size-full flex-col-reverse lg:grid lg:grid-cols-[1fr_560px]", children: [
          /* @__PURE__ */ jsx(
            DndContext,
            {
              sensors,
              onDragEnd: handleDragEnd,
              onDragStart: handleDragStart,
              onDragCancel: handleDragCancel,
              children: /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-subtle size-full overflow-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid h-fit auto-rows-auto grid-cols-4 gap-6 p-6", children: [
                /* @__PURE__ */ jsx(
                  SortableContext,
                  {
                    items: fields.map((m) => m.field_id),
                    strategy: rectSortingStrategy,
                    children: fields.map((m) => {
                      return /* @__PURE__ */ jsx(
                        MediaGridItem,
                        {
                          onCheckedChange: handleCheckedChange(m.id),
                          checked: !!selection[m.id],
                          media: m
                        },
                        m.field_id
                      );
                    })
                  }
                ),
                /* @__PURE__ */ jsx(DragOverlay, { dropAnimation: dropAnimationConfig, children: activeId ? /* @__PURE__ */ jsx(
                  MediaGridItemOverlay,
                  {
                    media: fields.find((m) => m.field_id === activeId),
                    checked: !!selection[fields.find((m) => m.field_id === activeId).id]
                  }
                ) : null })
              ] }) })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base overflow-auto border-b px-6 py-4 lg:border-b-0 lg:border-l", children: /* @__PURE__ */ jsx(UploadMediaFormItem, { form, append }) })
        ] }) }),
        /* @__PURE__ */ jsx(CommandBar, { open: !!selectionCount, children: /* @__PURE__ */ jsxs(CommandBar.Bar, { children: [
          /* @__PURE__ */ jsx(CommandBar.Value, { children: t("general.countSelected", {
            count: selectionCount
          }) }),
          /* @__PURE__ */ jsx(CommandBar.Seperator, {}),
          selectionCount === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              CommandBar.Command,
              {
                action: handlePromoteToThumbnail,
                label: t("products.media.makeThumbnail"),
                shortcut: "t"
              }
            ),
            /* @__PURE__ */ jsx(CommandBar.Seperator, {})
          ] }),
          /* @__PURE__ */ jsx(
            CommandBar.Command,
            {
              action: handleDelete,
              label: t("actions.delete"),
              shortcut: "d"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};
var getDefaultValues = (images, thumbnail) => {
  const media = images?.map((image) => ({
    id: image.id,
    url: image.url,
    isThumbnail: image.url === thumbnail,
    file: null
  })) || [];
  if (thumbnail && !media.some((mediaItem) => mediaItem.url === thumbnail)) {
    const id = Math.random().toString(36).substring(7);
    media.unshift({
      id,
      url: thumbnail,
      isThumbnail: true,
      file: null
    });
  }
  return media;
};
var dropAnimationConfig = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4"
      }
    }
  })
};
var MediaGridItem = ({
  media,
  checked,
  onCheckedChange
}) => {
  const { t } = useTranslation();
  const handleToggle = useCallback(
    (value) => {
      onCheckedChange(value);
    },
    [onCheckedChange]
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: media.field_id });
  const style = {
    opacity: isDragging ? 0.4 : void 0,
    transform: CSS.Transform.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clx(
        "shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full overflow-hidden rounded-lg outline-none"
      ),
      style,
      ref: setNodeRef,
      children: [
        media.isThumbnail && /* @__PURE__ */ jsx("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsx(Tooltip, { content: t("products.media.thumbnailTooltip"), children: /* @__PURE__ */ jsx(ThumbnailBadge, {}) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clx("absolute inset-0 cursor-grab touch-none outline-none", {
              "cursor-grabbing": isDragging
            }),
            ref: setActivatorNodeRef,
            ...attributes,
            ...listeners
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: clx("transition-fg absolute right-2 top-2 opacity-0", {
              "group-focus-within:opacity-100 group-hover:opacity-100 group-focus:opacity-100": !isDragging && !checked,
              "opacity-100": checked
            }),
            children: /* @__PURE__ */ jsx(
              Checkbox,
              {
                onClick: (e) => {
                  e.stopPropagation();
                },
                checked,
                onCheckedChange: handleToggle
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "img",
          {
            src: media.url,
            alt: "",
            className: "size-full object-cover object-center"
          }
        )
      ]
    }
  );
};
var MediaGridItemOverlay = ({
  media,
  checked
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "shadow-elevation-card-rest hover:shadow-elevation-card-hover focus-visible:shadow-borders-focus bg-ui-bg-subtle-hover group relative aspect-square h-auto max-w-full cursor-grabbing overflow-hidden rounded-lg outline-none", children: [
    media.isThumbnail && /* @__PURE__ */ jsx("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsx(ThumbnailBadge, {}) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: clx("transition-fg absolute right-2 top-2 opacity-0", {
          "opacity-100": checked
        }),
        children: /* @__PURE__ */ jsx(Checkbox, { checked })
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: media.url,
        alt: "",
        className: "size-full object-cover object-center"
      }
    )
  ] });
};

// src/routes/products/product-media/components/product-media-gallery/product-media-gallery.tsx
import {
  ArrowDownTray,
  ThumbnailBadge as ThumbnailBadge2,
  Trash,
  TriangleLeftMini,
  TriangleRightMini
} from "@medusajs/icons";
import { Button as Button2, IconButton, Text, Tooltip as Tooltip2, clx as clx2, usePrompt } from "@medusajs/ui";
import { useCallback as useCallback2, useEffect, useState as useState2 } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { Link as Link2, useLocation } from "react-router-dom";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ProductMediaGallery = ({ product }) => {
  const { state } = useLocation();
  const [curr, setCurr] = useState2(state?.curr || 0);
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const { mutateAsync, isPending } = useUpdateProduct(product.id);
  const media = getMedia(product.images, product.thumbnail);
  const next = useCallback2(() => {
    if (isPending) {
      return;
    }
    setCurr((prev2) => (prev2 + 1) % media.length);
  }, [media, isPending]);
  const prev = useCallback2(() => {
    if (isPending) {
      return;
    }
    setCurr((prev2) => (prev2 - 1 + media.length) % media.length);
  }, [media, isPending]);
  const goTo = useCallback2(
    (index) => {
      if (isPending) {
        return;
      }
      setCurr(index);
    },
    [isPending]
  );
  const handleDownloadCurrent = () => {
    if (isPending) {
      return;
    }
    const a = document.createElement("a");
    a.href = media[curr].url;
    a.download = "image";
    a.target = "_blank";
    a.click();
  };
  const handleDeleteCurrent = async () => {
    const current = media[curr];
    const res = await prompt({
      title: t("general.areYouSure"),
      description: current.isThumbnail ? t("products.media.deleteWarningWithThumbnail", { count: 1 }) : t("products.media.deleteWarning", { count: 1 }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    const mediaToKeep = product.images?.filter((i) => i.id !== current.id).map((i) => ({ url: i.url })) || [];
    if (curr === media.length - 1) {
      setCurr((prev2) => prev2 - 1);
    }
    await mutateAsync({
      images: mediaToKeep,
      thumbnail: current.isThumbnail ? "" : void 0
    });
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, prev]);
  const noMedia = !media.length;
  return /* @__PURE__ */ jsxs2("div", { className: "flex size-full flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsx2(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-end gap-x-2", children: [
      /* @__PURE__ */ jsxs2(
        IconButton,
        {
          size: "small",
          type: "button",
          onClick: handleDeleteCurrent,
          disabled: noMedia,
          children: [
            /* @__PURE__ */ jsx2(Trash, {}),
            /* @__PURE__ */ jsx2("span", { className: "sr-only", children: t("products.media.deleteImageLabel") })
          ]
        }
      ),
      /* @__PURE__ */ jsxs2(
        IconButton,
        {
          size: "small",
          type: "button",
          onClick: handleDownloadCurrent,
          disabled: noMedia,
          children: [
            /* @__PURE__ */ jsx2(ArrowDownTray, {}),
            /* @__PURE__ */ jsx2("span", { className: "sr-only", children: t("products.media.downloadImageLabel") })
          ]
        }
      ),
      /* @__PURE__ */ jsx2(Button2, { variant: "secondary", size: "small", asChild: true, children: /* @__PURE__ */ jsx2(Link2, { to: { pathname: ".", search: "view=edit" }, children: t("actions.edit") }) })
    ] }) }),
    /* @__PURE__ */ jsxs2(RouteFocusModal.Body, { className: "flex flex-col overflow-hidden", children: [
      /* @__PURE__ */ jsx2(Canvas, { curr, media }),
      /* @__PURE__ */ jsx2(
        Preview,
        {
          curr,
          media,
          prev,
          next,
          goTo
        }
      )
    ] })
  ] });
};
var Canvas = ({ media, curr }) => {
  const { t } = useTranslation2();
  if (media.length === 0) {
    return /* @__PURE__ */ jsxs2("div", { className: "bg-ui-bg-subtle flex size-full flex-col items-center justify-center gap-y-4 pb-8 pt-6", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx2(
          Text,
          {
            size: "small",
            leading: "compact",
            weight: "plus",
            className: "text-ui-fg-subtle",
            children: t("products.media.emptyState.header")
          }
        ),
        /* @__PURE__ */ jsx2(Text, { size: "small", className: "text-ui-fg-muted", children: t("products.media.emptyState.description") })
      ] }),
      /* @__PURE__ */ jsx2(Button2, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx2(Link2, { to: "?view=edit", children: t("products.media.emptyState.action") }) })
    ] });
  }
  return /* @__PURE__ */ jsx2("div", { className: "bg-ui-bg-subtle relative size-full overflow-hidden", children: /* @__PURE__ */ jsx2("div", { className: "flex size-full items-center justify-center p-6", children: /* @__PURE__ */ jsxs2("div", { className: "relative inline-block max-h-full max-w-full", children: [
    media[curr].isThumbnail && /* @__PURE__ */ jsx2("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsx2(Tooltip2, { content: t("products.media.thumbnailTooltip"), children: /* @__PURE__ */ jsx2(ThumbnailBadge2, {}) }) }),
    /* @__PURE__ */ jsx2(
      "img",
      {
        src: media[curr].url,
        alt: "",
        className: "object-fit shadow-elevation-card-rest max-h-[calc(100vh-200px)] w-auto rounded-xl object-contain"
      }
    )
  ] }) }) });
};
var MAX_VISIBLE_ITEMS = 8;
var Preview = ({
  media,
  curr,
  prev,
  next,
  goTo
}) => {
  if (!media.length) {
    return null;
  }
  const getVisibleItems = (media2, index) => {
    if (media2.length <= MAX_VISIBLE_ITEMS) {
      return media2;
    }
    const half = Math.floor(MAX_VISIBLE_ITEMS / 2);
    const start = (index - half + media2.length) % media2.length;
    const end = (start + MAX_VISIBLE_ITEMS) % media2.length;
    if (end < start) {
      return [...media2.slice(start), ...media2.slice(0, end)];
    } else {
      return media2.slice(start, end);
    }
  };
  const visibleItems = getVisibleItems(media, curr);
  return /* @__PURE__ */ jsxs2("div", { className: "flex shrink-0 items-center justify-center gap-x-2 border-t p-3", children: [
    /* @__PURE__ */ jsx2(
      IconButton,
      {
        size: "small",
        variant: "transparent",
        className: "text-ui-fg-muted",
        type: "button",
        onClick: prev,
        children: /* @__PURE__ */ jsx2(TriangleLeftMini, {})
      }
    ),
    /* @__PURE__ */ jsx2("div", { className: "flex items-center gap-x-2", children: visibleItems.map((item) => {
      const isCurrentImage = item.id === media[curr].id;
      const originalIndex = media.findIndex((i) => i.id === item.id);
      return /* @__PURE__ */ jsx2(
        "button",
        {
          type: "button",
          onClick: () => goTo(originalIndex),
          className: clx2(
            "transition-fg size-7 overflow-hidden rounded-[4px] outline-none",
            {
              "shadow-borders-focus": isCurrentImage
            }
          ),
          children: /* @__PURE__ */ jsx2("img", { src: item.url, alt: "", className: "size-full object-cover" })
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ jsx2(
      IconButton,
      {
        size: "small",
        variant: "transparent",
        className: "text-ui-fg-muted",
        type: "button",
        onClick: next,
        children: /* @__PURE__ */ jsx2(TriangleRightMini, {})
      }
    )
  ] });
};
var getMedia = (images, thumbnail) => {
  const media = images?.map((image) => ({
    id: image.id,
    url: image.url,
    isThumbnail: image.url === thumbnail
  })) || [];
  if (thumbnail && !media.some((mediaItem) => mediaItem.isThumbnail)) {
    media.unshift({
      id: "thumbnail_only",
      url: thumbnail,
      isThumbnail: true
    });
  }
  return media;
};

// src/routes/products/product-media/components/product-media-view/product-media-view-context.tsx
import { createContext } from "react";
var ProductMediaViewContext = createContext(null);

// src/routes/products/product-media/components/product-media-view/product-media-view.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var getView = (searchParams) => {
  const view = searchParams.get("view");
  if (view === "edit" /* EDIT */) {
    return "edit" /* EDIT */;
  }
  return "gallery" /* GALLERY */;
};
var ProductMediaView = ({ product }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = getView(searchParams);
  const handleGoToView = (view2) => {
    return () => {
      setSearchParams({ view: view2 });
    };
  };
  return /* @__PURE__ */ jsx3(
    ProductMediaViewContext.Provider,
    {
      value: {
        goToGallery: handleGoToView("gallery" /* GALLERY */),
        goToEdit: handleGoToView("edit" /* EDIT */)
      },
      children: renderView(view, product)
    }
  );
};
var renderView = (view, product) => {
  switch (view) {
    case "gallery" /* GALLERY */:
      return /* @__PURE__ */ jsx3(ProductMediaGallery, { product });
    case "edit" /* EDIT */:
      return /* @__PURE__ */ jsx3(EditProductMediaForm, { product });
  }
};

// src/routes/products/product-media/product-media.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductMedia = () => {
  const { t } = useTranslation3();
  const { id } = useParams();
  const { product, isLoading, isError, error } = useProduct(id);
  const ready = !isLoading && product;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs3(RouteFocusModal, { children: [
    /* @__PURE__ */ jsx4(RouteFocusModal.Title, { asChild: true, children: /* @__PURE__ */ jsx4("span", { className: "sr-only", children: t("products.media.label") }) }),
    /* @__PURE__ */ jsx4(RouteFocusModal.Description, { asChild: true, children: /* @__PURE__ */ jsx4("span", { className: "sr-only", children: t("products.media.editHint") }) }),
    ready && /* @__PURE__ */ jsx4(ProductMediaView, { product })
  ] });
};
export {
  ProductMedia as Component
};
