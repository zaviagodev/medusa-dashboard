import {
  SidebarLink
} from "./chunk-LBIOZZPA.mjs";
import "./chunk-EQTBJSBZ.mjs";
import {
  getFormattedCountry
} from "./chunk-B6ZOPCPA.mjs";
import {
  PRODUCT_VARIANT_IDS_KEY
} from "./chunk-AM2BU2RH.mjs";
import "./chunk-YOYOJU5D.mjs";
import {
  SectionRow
} from "./chunk-LFLGEXIG.mjs";
import {
  TwoColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useDataTableDateColumns
} from "./chunk-4BTG27L5.mjs";
import {
  DataTable,
  useDataTableDateFilters
} from "./chunk-3IIOXMXN.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  PRODUCT_DETAIL_FIELDS
} from "./chunk-WPHS3KQF.mjs";
import "./chunk-6JUSGEYM.mjs";
import "./chunk-NQIC7ZFS.mjs";
import "./chunk-ONB3JEHR.mjs";
import "./chunk-4GQOUCX6.mjs";
import "./chunk-2VTICXJR.mjs";
import "./chunk-D3YQN7HV.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-WNBMJMFU.mjs";
import "./chunk-MNXC6Q4F.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  TwoColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import "./chunk-XKXNQ2KV.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-R2NIHOCX.mjs";
import "./chunk-OBQI23QM.mjs";
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
  useSalesChannels
} from "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  productsQueryKeys,
  useDeleteProduct,
  useDeleteProductOption,
  useDeleteVariantLazy,
  useProduct,
  useProductVariants,
  useUpdateProduct
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var ProductDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { product } = useProduct(
    id,
    {
      fields: PRODUCT_DETAIL_FIELDS
    },
    {
      initialData: props.data,
      enabled: Boolean(id)
    }
  );
  if (!product) {
    return null;
  }
  return /* @__PURE__ */ jsx("span", { children: product.title });
};

// src/routes/products/product-detail/loader.ts
var productDetailQuery = (id) => ({
  queryKey: productsQueryKeys.detail(id, { fields: PRODUCT_DETAIL_FIELDS }),
  queryFn: async () => sdk.admin.product.retrieve(id, { fields: PRODUCT_DETAIL_FIELDS })
});
var productLoader = async ({ params }) => {
  const id = params.id;
  const query = productDetailQuery(id);
  const response = await queryClient.ensureQueryData({
    ...query,
    staleTime: 9e4
  });
  return response;
};

// src/routes/products/product-detail/product-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/products/product-detail/components/product-attribute-section/product-attribute-section.tsx
import { PencilSquare } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ProductAttributeSection = ({
  product
}) => {
  const { t } = useTranslation();
  const { getDisplays } = useExtension();
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("products.attributes") }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "attributes",
                  icon: /* @__PURE__ */ jsx2(PencilSquare, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.height"), value: product.height }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.width"), value: product.width }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.length"), value: product.length }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.weight"), value: product.weight }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.midCode"), value: product.mid_code }),
    /* @__PURE__ */ jsx2(SectionRow, { title: t("fields.hsCode"), value: product.hs_code }),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("fields.countryOfOrigin"),
        value: getFormattedCountry(product.origin_country)
      }
    ),
    getDisplays("product", "attributes").map((Component2, i) => {
      return /* @__PURE__ */ jsx2(Component2, { data: product }, i);
    })
  ] });
};

// src/routes/products/product-detail/components/product-general-section/product-general-section.tsx
import { PencilSquare as PencilSquare2, Trash } from "@medusajs/icons";
import { Container as Container2, Heading as Heading2, StatusBadge, usePrompt } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var productStatusColor = (status) => {
  switch (status) {
    case "draft":
      return "grey";
    case "proposed":
      return "orange";
    case "published":
      return "green";
    case "rejected":
      return "red";
    default:
      return "grey";
  }
};
var ProductGeneralSection = ({
  product
}) => {
  const { t } = useTranslation2();
  const prompt = usePrompt();
  const navigate = useNavigate();
  const { getDisplays } = useExtension();
  const displays = getDisplays("product", "general");
  const { mutateAsync } = useDeleteProduct(product.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("products.deleteWarning", {
        title: product.title
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        navigate("..");
      }
    });
  };
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx3(Heading2, { children: product.title }),
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-4", children: [
        /* @__PURE__ */ jsx3(StatusBadge, { color: productStatusColor(product.status), children: t(`products.productStatus.${product.status}`) }),
        /* @__PURE__ */ jsx3(
          ActionMenu,
          {
            groups: [
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    to: "edit",
                    icon: /* @__PURE__ */ jsx3(PencilSquare2, {})
                  }
                ]
              },
              {
                actions: [
                  {
                    label: t("actions.delete"),
                    onClick: handleDelete,
                    icon: /* @__PURE__ */ jsx3(Trash, {})
                  }
                ]
              }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx3(SectionRow, { title: t("fields.description"), value: product.description }),
    /* @__PURE__ */ jsx3(SectionRow, { title: t("fields.subtitle"), value: product.subtitle }),
    /* @__PURE__ */ jsx3(SectionRow, { title: t("fields.handle"), value: `/${product.handle}` }),
    /* @__PURE__ */ jsx3(
      SectionRow,
      {
        title: t("fields.discountable"),
        value: product.discountable ? t("fields.true") : t("fields.false")
      }
    ),
    displays.map((Component2, index) => {
      return /* @__PURE__ */ jsx3(Component2, { data: product }, index);
    })
  ] });
};

// src/routes/products/product-detail/components/product-media-section/product-media-section.tsx
import { PencilSquare as PencilSquare3, ThumbnailBadge } from "@medusajs/icons";
import {
  Button,
  Checkbox,
  CommandBar,
  Container as Container3,
  Heading as Heading3,
  Text,
  Tooltip,
  clx,
  usePrompt as usePrompt2
} from "@medusajs/ui";
import { useState } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductMediaSection = ({ product }) => {
  const { t } = useTranslation3();
  const prompt = usePrompt2();
  const [selection, setSelection] = useState({});
  const media = getMedia(product);
  const handleCheckedChange = (id) => {
    setSelection((prev) => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [id]: true };
      }
    });
  };
  const { mutateAsync } = useUpdateProduct(product.id);
  const handleDelete = async () => {
    const ids = Object.keys(selection);
    const includingThumbnail = ids.some(
      (id) => media.find((m) => m.id === id)?.isThumbnail
    );
    const res = await prompt({
      title: t("general.areYouSure"),
      description: includingThumbnail ? t("products.media.deleteWarningWithThumbnail", {
        count: ids.length
      }) : t("products.media.deleteWarning", {
        count: ids.length
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    const mediaToKeep = product.images.filter((i) => !ids.includes(i.id)).map((i) => ({ url: i.url }));
    await mutateAsync(
      {
        images: mediaToKeep,
        thumbnail: includingThumbnail ? "" : void 0
      },
      {
        onSuccess: () => {
          setSelection({});
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs3(Container3, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx4(Heading3, { level: "h2", children: t("products.media.label") }),
      /* @__PURE__ */ jsx4(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "media?view=edit",
                  icon: /* @__PURE__ */ jsx4(PencilSquare3, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    media.length > 0 ? /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4 px-6 py-4", children: media.map((i, index) => {
      const isSelected = selection[i.id];
      return /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "shadow-elevation-card-rest hover:shadow-elevation-card-hover transition-fg group relative aspect-square size-full cursor-pointer overflow-hidden rounded-[8px]",
          children: [
            /* @__PURE__ */ jsx4(
              "div",
              {
                className: clx(
                  "transition-fg invisible absolute right-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100",
                  {
                    "visible opacity-100": isSelected
                  }
                ),
                children: /* @__PURE__ */ jsx4(
                  Checkbox,
                  {
                    checked: selection[i.id] || false,
                    onCheckedChange: () => handleCheckedChange(i.id)
                  }
                )
              }
            ),
            i.isThumbnail && /* @__PURE__ */ jsx4("div", { className: "absolute left-2 top-2", children: /* @__PURE__ */ jsx4(Tooltip, { content: t("fields.thumbnail"), children: /* @__PURE__ */ jsx4(ThumbnailBadge, {}) }) }),
            /* @__PURE__ */ jsx4(Link, { to: `media`, state: { curr: index }, children: /* @__PURE__ */ jsx4(
              "img",
              {
                src: i.url,
                alt: `${product.title} image`,
                className: "size-full object-cover"
              }
            ) })
          ]
        },
        i.id
      );
    }) }) : /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-y-4 pb-8 pt-6", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx4(
          Text,
          {
            size: "small",
            leading: "compact",
            weight: "plus",
            className: "text-ui-fg-subtle",
            children: t("products.media.emptyState.header")
          }
        ),
        /* @__PURE__ */ jsx4(Text, { size: "small", className: "text-ui-fg-muted", children: t("products.media.emptyState.description") })
      ] }),
      /* @__PURE__ */ jsx4(Button, { size: "small", variant: "secondary", asChild: true, children: /* @__PURE__ */ jsx4(Link, { to: "media?view=edit", children: t("products.media.emptyState.action") }) })
    ] }),
    /* @__PURE__ */ jsx4(CommandBar, { open: !!Object.keys(selection).length, children: /* @__PURE__ */ jsxs3(CommandBar.Bar, { children: [
      /* @__PURE__ */ jsx4(CommandBar.Value, { children: t("general.countSelected", {
        count: Object.keys(selection).length
      }) }),
      /* @__PURE__ */ jsx4(CommandBar.Seperator, {}),
      /* @__PURE__ */ jsx4(
        CommandBar.Command,
        {
          action: handleDelete,
          label: t("actions.delete"),
          shortcut: "d"
        }
      )
    ] }) })
  ] });
};
var getMedia = (product) => {
  const { images = [], thumbnail } = product;
  const media = images.map((image) => ({
    id: image.id,
    url: image.url,
    isThumbnail: image.url === thumbnail
  }));
  if (thumbnail && !media.some((mediaItem) => mediaItem.url === thumbnail)) {
    media.unshift({
      id: "img_thumbnail",
      url: thumbnail,
      isThumbnail: true
    });
  }
  return media;
};

// src/routes/products/product-detail/components/product-option-section/product-option-section.tsx
import { PencilSquare as PencilSquare4, Plus, Trash as Trash2 } from "@medusajs/icons";
import { Badge, Container as Container4, Heading as Heading4, usePrompt as usePrompt3 } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var OptionActions = ({
  product,
  option
}) => {
  const { t } = useTranslation4();
  const { mutateAsync } = useDeleteProductOption(product.id, option.id);
  const prompt = usePrompt3();
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("products.options.deleteWarning", {
        title: option.title
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync();
  };
  return /* @__PURE__ */ jsx5(
    ActionMenu,
    {
      groups: [
        {
          actions: [
            {
              label: t("actions.edit"),
              to: `options/${option.id}/edit`,
              icon: /* @__PURE__ */ jsx5(PencilSquare4, {})
            }
          ]
        },
        {
          actions: [
            {
              label: t("actions.delete"),
              onClick: handleDelete,
              icon: /* @__PURE__ */ jsx5(Trash2, {})
            }
          ]
        }
      ]
    }
  );
};
var ProductOptionSection = ({
  product
}) => {
  const { t } = useTranslation4();
  return /* @__PURE__ */ jsxs4(Container4, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx5(Heading4, { level: "h2", children: t("products.options.header") }),
      /* @__PURE__ */ jsx5(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.create"),
                  to: "options/create",
                  icon: /* @__PURE__ */ jsx5(Plus, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    product.options?.map((option) => {
      return /* @__PURE__ */ jsx5(
        SectionRow,
        {
          title: option.title,
          value: option.values?.map((val) => {
            return /* @__PURE__ */ jsx5(
              Badge,
              {
                size: "2xsmall",
                className: "flex min-w-[20px] items-center justify-center",
                children: val.value
              },
              val.value
            );
          }),
          actions: /* @__PURE__ */ jsx5(OptionActions, { product, option })
        },
        option.id
      );
    })
  ] });
};

// src/routes/products/product-detail/components/product-organization-section/product-organization-section.tsx
import { PencilSquare as PencilSquare5 } from "@medusajs/icons";
import { Badge as Badge2, Container as Container5, Heading as Heading5, Tooltip as Tooltip2 } from "@medusajs/ui";
import { useTranslation as useTranslation5 } from "react-i18next";
import { Link as Link2 } from "react-router-dom";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var ProductOrganizationSection = ({
  product
}) => {
  const { t } = useTranslation5();
  const { getDisplays } = useExtension();
  return /* @__PURE__ */ jsxs5(Container5, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx6(Heading5, { level: "h2", children: t("products.organization.header") }),
      /* @__PURE__ */ jsx6(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "organization",
                  icon: /* @__PURE__ */ jsx6(PencilSquare5, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx6(
      SectionRow,
      {
        title: t("fields.tags"),
        value: product.tags?.length ? product.tags.map((tag) => /* @__PURE__ */ jsx6(
          OrganizationTag,
          {
            label: tag.value,
            to: `/settings/product-tags/${tag.id}`
          },
          tag.id
        )) : void 0
      }
    ),
    /* @__PURE__ */ jsx6(
      SectionRow,
      {
        title: t("fields.type"),
        value: product.type ? /* @__PURE__ */ jsx6(
          OrganizationTag,
          {
            label: product.type.value,
            to: `/settings/product-types/${product.type_id}`
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsx6(
      SectionRow,
      {
        title: t("fields.collection"),
        value: product.collection ? /* @__PURE__ */ jsx6(
          OrganizationTag,
          {
            label: product.collection.title,
            to: `/collections/${product.collection.id}`
          }
        ) : void 0
      }
    ),
    /* @__PURE__ */ jsx6(
      SectionRow,
      {
        title: t("fields.categories"),
        value: product.categories?.length ? product.categories.map((pcat) => /* @__PURE__ */ jsx6(
          OrganizationTag,
          {
            label: pcat.name,
            to: `/categories/${pcat.id}`
          },
          pcat.id
        )) : void 0
      }
    ),
    getDisplays("product", "organize").map((Component2, i) => {
      return /* @__PURE__ */ jsx6(Component2, { data: product }, i);
    })
  ] });
};
var OrganizationTag = ({ label, to }) => {
  return /* @__PURE__ */ jsx6(Tooltip2, { content: label, children: /* @__PURE__ */ jsx6(Badge2, { size: "2xsmall", className: "block w-fit truncate", asChild: true, children: /* @__PURE__ */ jsx6(Link2, { to, children: label }) }) });
};

// src/routes/products/product-detail/components/product-sales-channel-section/product-sales-channel-section.tsx
import { Channels, PencilSquare as PencilSquare6 } from "@medusajs/icons";
import { Container as Container6, Heading as Heading6, Text as Text2, Tooltip as Tooltip3 } from "@medusajs/ui";
import { Trans, useTranslation as useTranslation6 } from "react-i18next";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var ProductSalesChannelSection = ({
  product
}) => {
  const { count } = useSalesChannels();
  const { t } = useTranslation6();
  const availableInSalesChannels = product.sales_channels?.map((sc) => ({
    id: sc.id,
    name: sc.name
  })) ?? [];
  const firstChannels = availableInSalesChannels.slice(0, 3);
  const restChannels = availableInSalesChannels.slice(3);
  return /* @__PURE__ */ jsxs6(Container6, { className: "flex flex-col gap-y-4 px-6 py-4", children: [
    /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx7(Heading6, { level: "h2", children: t("fields.sales_channels") }),
      /* @__PURE__ */ jsx7(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "sales-channels",
                  icon: /* @__PURE__ */ jsx7(PencilSquare6, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "grid grid-cols-[28px_1fr] items-center gap-x-3", children: [
      /* @__PURE__ */ jsx7("div", { className: "bg-ui-bg-base shadow-borders-base flex size-7 items-center justify-center rounded-md", children: /* @__PURE__ */ jsx7("div", { className: "bg-ui-bg-component flex size-6 items-center justify-center rounded-[4px]", children: /* @__PURE__ */ jsx7(Channels, { className: "text-ui-fg-subtle" }) }) }),
      availableInSalesChannels.length > 0 ? /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-x-1", children: [
        /* @__PURE__ */ jsx7(Text2, { size: "small", leading: "compact", children: firstChannels.map((sc) => sc.name).join(", ") }),
        restChannels.length > 0 && /* @__PURE__ */ jsx7(
          Tooltip3,
          {
            content: /* @__PURE__ */ jsx7("ul", { children: restChannels.map((sc) => /* @__PURE__ */ jsx7("li", { children: sc.name }, sc.id)) }),
            children: /* @__PURE__ */ jsx7(
              Text2,
              {
                size: "small",
                leading: "compact",
                className: "text-ui-fg-subtle",
                children: `+${restChannels.length}`
              }
            )
          }
        )
      ] }) : /* @__PURE__ */ jsx7(Text2, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: t("products.noSalesChannels") })
    ] }),
    /* @__PURE__ */ jsx7("div", { children: /* @__PURE__ */ jsx7(Text2, { className: "text-ui-fg-subtle", size: "small", leading: "compact", children: /* @__PURE__ */ jsx7(
      Trans,
      {
        i18nKey: "sales_channels.availableIn",
        values: {
          x: availableInSalesChannels.length,
          y: count ?? 0
        },
        components: [
          /* @__PURE__ */ jsx7(
            "span",
            {
              className: "text-ui-fg-base txt-compact-medium-plus"
            },
            "x"
          ),
          /* @__PURE__ */ jsx7(
            "span",
            {
              className: "text-ui-fg-base txt-compact-medium-plus"
            },
            "y"
          )
        ]
      }
    ) }) })
  ] });
};

// src/routes/products/product-detail/components/product-variant-section/product-variant-section.tsx
import { Buildings, Component, PencilSquare as PencilSquare7, Trash as Trash3 } from "@medusajs/icons";
import {
  Badge as Badge3,
  clx as clx2,
  Container as Container7,
  createDataTableColumnHelper,
  createDataTableCommandHelper,
  createDataTableFilterHelper,
  Tooltip as Tooltip4,
  usePrompt as usePrompt4
} from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useTranslation as useTranslation7 } from "react-i18next";
import { useNavigate as useNavigate2, useSearchParams } from "react-router-dom";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var PAGE_SIZE = 10;
var PREFIX = "pv";
var ProductVariantSection = ({
  product
}) => {
  const { t } = useTranslation7();
  const {
    q,
    order,
    offset,
    allow_backorder,
    manage_inventory,
    created_at,
    updated_at
  } = useQueryParams(
    [
      "q",
      "order",
      "offset",
      "manage_inventory",
      "allow_backorder",
      "created_at",
      "updated_at"
    ],
    PREFIX
  );
  const columns = useColumns(product);
  const filters = useFilters();
  const commands = useCommands();
  const { variants, count, isPending, isError, error } = useProductVariants(
    product.id,
    {
      q,
      order: order ? order : "variant_rank",
      offset: offset ? parseInt(offset) : void 0,
      limit: PAGE_SIZE,
      allow_backorder: allow_backorder ? JSON.parse(allow_backorder) : void 0,
      manage_inventory: manage_inventory ? JSON.parse(manage_inventory) : void 0,
      created_at: created_at ? JSON.parse(created_at) : void 0,
      updated_at: updated_at ? JSON.parse(updated_at) : void 0,
      fields: "title,sku,*options,created_at,updated_at,*inventory_items.inventory.location_levels,inventory_quantity,manage_inventory"
    },
    {
      placeholderData: keepPreviousData
    }
  );
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx8(Container7, { className: "divide-y p-0", children: /* @__PURE__ */ jsx8(
    DataTable,
    {
      data: variants,
      columns,
      filters,
      rowCount: count,
      getRowId: (row) => row.id,
      rowHref: (row) => `/products/${product.id}/variants/${row.id}`,
      pageSize: PAGE_SIZE,
      isLoading: isPending,
      heading: t("products.variants.header"),
      emptyState: {
        empty: {
          heading: t("products.variants.empty.heading"),
          description: t("products.variants.empty.description")
        },
        filtered: {
          heading: t("products.variants.filtered.heading"),
          description: t("products.variants.filtered.description")
        }
      },
      action: {
        label: t("actions.create"),
        to: `variants/create`
      },
      actionMenu: {
        groups: [
          {
            actions: [
              {
                label: t("products.editPrices"),
                to: `prices`,
                icon: /* @__PURE__ */ jsx8(PencilSquare7, {})
              },
              {
                label: t("inventory.stock.action"),
                to: `stock`,
                icon: /* @__PURE__ */ jsx8(Buildings, {})
              }
            ]
          }
        ]
      },
      commands,
      prefix: PREFIX
    }
  ) });
};
var columnHelper = createDataTableColumnHelper();
var useColumns = (product) => {
  const { t } = useTranslation7();
  const navigate = useNavigate2();
  const { mutateAsync } = useDeleteVariantLazy(product.id);
  const prompt = usePrompt4();
  const [searchParams] = useSearchParams();
  const tableSearchParams = useMemo(() => {
    const filtered = new URLSearchParams();
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith(`${PREFIX}_`)) {
        filtered.append(key, value);
      }
    }
    return filtered;
  }, [searchParams]);
  const dateColumns = useDataTableDateColumns();
  const handleDelete = useCallback(
    async (id, title) => {
      const res = await prompt({
        title: t("general.areYouSure"),
        description: t("products.deleteVariantWarning", {
          title
        }),
        confirmText: t("actions.delete"),
        cancelText: t("actions.cancel")
      });
      if (!res) {
        return;
      }
      await mutateAsync({ variantId: id });
    },
    [mutateAsync, prompt, t]
  );
  const optionColumns = useMemo(() => {
    if (!product?.options) {
      return [];
    }
    return product.options.map((option) => {
      return columnHelper.display({
        id: option.id,
        header: option.title,
        cell: ({ row }) => {
          const variantOpt = row.original.options?.find(
            (opt) => opt.option_id === option.id
          );
          if (!variantOpt) {
            return /* @__PURE__ */ jsx8("span", { className: "text-ui-fg-muted", children: "-" });
          }
          return /* @__PURE__ */ jsx8("div", { className: "flex items-center", children: /* @__PURE__ */ jsx8(Tooltip4, { content: variantOpt.value, children: /* @__PURE__ */ jsx8(
            Badge3,
            {
              size: "2xsmall",
              title: variantOpt.value,
              className: "inline-flex min-w-[20px] max-w-[140px] items-center justify-center overflow-hidden truncate",
              children: variantOpt.value
            }
          ) }) });
        }
      });
    });
  }, [product]);
  const getActions = useCallback(
    (ctx) => {
      const variant = ctx.row.original;
      const mainActions = [
        {
          icon: /* @__PURE__ */ jsx8(PencilSquare7, {}),
          label: t("actions.edit"),
          onClick: (row) => {
            navigate(
              `edit-variant?variant_id=${row.row.original.id}&${tableSearchParams.toString()}`,
              {
                state: {
                  restore_params: tableSearchParams.toString()
                }
              }
            );
          }
        }
      ];
      const secondaryActions = [
        {
          icon: /* @__PURE__ */ jsx8(Trash3, {}),
          label: t("actions.delete"),
          onClick: () => handleDelete(variant.id, variant.title)
        }
      ];
      const inventoryItemsCount = variant.inventory_items?.length || 0;
      switch (inventoryItemsCount) {
        case 0:
          break;
        case 1: {
          const inventoryItemLink = `/inventory/${variant.inventory_items[0].inventory.id}`;
          mainActions.push({
            label: t("products.variant.inventory.actions.inventoryItems"),
            onClick: () => {
              navigate(inventoryItemLink);
            },
            icon: /* @__PURE__ */ jsx8(Buildings, {})
          });
          break;
        }
        default: {
          const ids = variant.inventory_items?.map((i) => i.inventory?.id);
          if (!ids || ids.length === 0) {
            break;
          }
          const inventoryKitLink = `/inventory?${new URLSearchParams({
            id: ids.join(",")
          }).toString()}`;
          mainActions.push({
            label: t("products.variant.inventory.actions.inventoryKit"),
            onClick: () => {
              navigate(inventoryKitLink);
            },
            icon: /* @__PURE__ */ jsx8(Component, {})
          });
        }
      }
      return [mainActions, secondaryActions];
    },
    [handleDelete, navigate, t, tableSearchParams]
  );
  const getInventory = useCallback(
    (variant) => {
      const castVariant = variant;
      if (!variant.manage_inventory) {
        return {
          text: t("products.variant.inventory.notManaged"),
          hasInventoryKit: false,
          notManaged: true
        };
      }
      const quantity = variant.inventory_quantity;
      const inventoryItems = castVariant.inventory_items?.map((i) => i.inventory).filter(Boolean);
      const hasInventoryKit = inventoryItems.length > 1;
      const locations = {};
      inventoryItems.forEach((i) => {
        i.location_levels?.forEach((l) => {
          locations[l.id] = true;
        });
      });
      const locationCount = Object.keys(locations).length;
      const text = hasInventoryKit ? t("products.variant.tableItemAvailable", {
        availableCount: quantity
      }) : t("products.variant.tableItem", {
        availableCount: quantity,
        locationCount,
        count: locationCount
      });
      return { text, hasInventoryKit, quantity, notManaged: false };
    },
    [t]
  );
  return useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: t("fields.title"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      columnHelper.accessor("sku", {
        header: t("fields.sku"),
        enableSorting: true,
        sortAscLabel: t("filters.sorting.alphabeticallyAsc"),
        sortDescLabel: t("filters.sorting.alphabeticallyDesc")
      }),
      ...optionColumns,
      columnHelper.display({
        id: "inventory",
        header: t("fields.inventory"),
        cell: ({ row }) => {
          const { text, hasInventoryKit, quantity, notManaged } = getInventory(
            row.original
          );
          return /* @__PURE__ */ jsx8(Tooltip4, { content: text, children: /* @__PURE__ */ jsxs7("div", { className: "flex h-full w-full items-center gap-2 overflow-hidden", children: [
            hasInventoryKit && /* @__PURE__ */ jsx8(Component, {}),
            /* @__PURE__ */ jsx8(
              "span",
              {
                className: clx2("truncate", {
                  "text-ui-fg-error": !quantity && !notManaged
                }),
                children: text
              }
            )
          ] }) });
        },
        maxSize: 250
      }),
      ...dateColumns,
      columnHelper.action({
        actions: getActions
      })
    ];
  }, [t, optionColumns, dateColumns, getActions, getInventory]);
};
var filterHelper = createDataTableFilterHelper();
var useFilters = () => {
  const { t } = useTranslation7();
  const dateFilters = useDataTableDateFilters();
  return useMemo(() => {
    return [
      filterHelper.accessor("allow_backorder", {
        type: "radio",
        label: t("fields.allowBackorder"),
        options: [
          { label: t("filters.radio.yes"), value: "true" },
          { label: t("filters.radio.no"), value: "false" }
        ]
      }),
      filterHelper.accessor("manage_inventory", {
        type: "radio",
        label: t("fields.manageInventory"),
        options: [
          { label: t("filters.radio.yes"), value: "true" },
          { label: t("filters.radio.no"), value: "false" }
        ]
      }),
      ...dateFilters
    ];
  }, [t, dateFilters]);
};
var commandHelper = createDataTableCommandHelper();
var useCommands = () => {
  const { t } = useTranslation7();
  const navigate = useNavigate2();
  return [
    commandHelper.command({
      label: t("inventory.stock.action"),
      shortcut: "i",
      action: async (selection) => {
        navigate(
          `stock?${PRODUCT_VARIANT_IDS_KEY}=${Object.keys(selection).join(",")}`
        );
      }
    })
  ];
};

// src/routes/products/product-detail/components/product-shipping-profile-section/product-shipping-profile-section.tsx
import { PencilSquare as PencilSquare8, ShoppingBag } from "@medusajs/icons";
import { Container as Container8, Heading as Heading7 } from "@medusajs/ui";
import { useTranslation as useTranslation8 } from "react-i18next";
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var ProductShippingProfileSection = ({
  product
}) => {
  const { t } = useTranslation8();
  const shippingProfile = product.shipping_profile;
  return /* @__PURE__ */ jsxs8(Container8, { className: "p-0", children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx9(Heading7, { level: "h2", children: t("products.shippingProfile.header") }),
      /* @__PURE__ */ jsx9(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "shipping-profile",
                  icon: /* @__PURE__ */ jsx9(PencilSquare8, {})
                }
              ]
            }
          ]
        }
      )
    ] }),
    shippingProfile && /* @__PURE__ */ jsx9(
      SidebarLink,
      {
        to: `/settings/locations/shipping-profiles/${shippingProfile.id}`,
        labelKey: shippingProfile.name,
        descriptionKey: shippingProfile.type,
        icon: /* @__PURE__ */ jsx9(ShoppingBag, {})
      }
    )
  ] });
};

// src/routes/products/product-detail/product-detail.tsx
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var ProductDetail = () => {
  const initialData = useLoaderData();
  const { id } = useParams();
  const { product, isLoading, isError, error } = useProduct(
    id,
    { fields: PRODUCT_DETAIL_FIELDS },
    {
      initialData
    }
  );
  const { getWidgets } = useExtension();
  const after = getWidgets("product.details.after");
  const before = getWidgets("product.details.before");
  const sideAfter = getWidgets("product.details.side.after");
  const sideBefore = getWidgets("product.details.side.before");
  if (isLoading || !product) {
    return /* @__PURE__ */ jsx10(
      TwoColumnPageSkeleton,
      {
        mainSections: 4,
        sidebarSections: 3,
        showJSON: true,
        showMetadata: true
      }
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs9(
    TwoColumnPage,
    {
      widgets: {
        after,
        before,
        sideAfter,
        sideBefore
      },
      showJSON: true,
      showMetadata: true,
      data: product,
      children: [
        /* @__PURE__ */ jsxs9(TwoColumnPage.Main, { children: [
          /* @__PURE__ */ jsx10(ProductGeneralSection, { product }),
          /* @__PURE__ */ jsx10(ProductMediaSection, { product }),
          /* @__PURE__ */ jsx10(ProductOptionSection, { product }),
          /* @__PURE__ */ jsx10(ProductVariantSection, { product })
        ] }),
        /* @__PURE__ */ jsxs9(TwoColumnPage.Sidebar, { children: [
          /* @__PURE__ */ jsx10(ProductSalesChannelSection, { product }),
          /* @__PURE__ */ jsx10(ProductShippingProfileSection, { product }),
          /* @__PURE__ */ jsx10(ProductOrganizationSection, { product }),
          /* @__PURE__ */ jsx10(ProductAttributeSection, { product })
        ] })
      ]
    }
  );
};
export {
  ProductDetailBreadcrumb as Breadcrumb,
  ProductDetail as Component,
  productLoader as loader
};
