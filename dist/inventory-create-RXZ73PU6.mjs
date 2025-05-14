import {
  CountrySelect
} from "./chunk-SCBXRJPV.mjs";
import {
  optionalInt
} from "./chunk-ZQRKUG6J.mjs";
import {
  DataGrid,
  createDataGridHelper
} from "./chunk-53RYGJCD.mjs";
import "./chunk-MWVM4TYO.mjs";
import {
  transformNullableFormData,
  transformNullableFormNumber,
  transformNullableFormNumbers
} from "./chunk-3ISBJK7K.mjs";
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
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
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
import {
  useStockLocations
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  inventoryItemsQueryKeys,
  useCreateInventoryItem
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/inventory/inventory-create/components/inventory-create-form/inventory-create-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  clx,
  Divider,
  Heading,
  Input,
  ProgressTabs,
  Textarea,
  toast
} from "@medusajs/ui";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/inventory/inventory-create/components/inventory-create-form/inventory-availability-form.tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var InventoryAvailabilityForm = ({
  form,
  locations
}) => {
  const { setCloseOnEscape } = useRouteModal();
  const columns = useColumns();
  return /* @__PURE__ */ jsx("div", { className: "size-full", children: /* @__PURE__ */ jsx(
    DataGrid,
    {
      columns,
      data: locations,
      state: form,
      onEditingChange: (editing) => setCloseOnEscape(!editing)
    }
  ) });
};
var columnHelper = createDataGridHelper();
var useColumns = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.column({
        id: "location",
        header: () => /* @__PURE__ */ jsx("div", { className: "flex size-full items-center overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "truncate", children: t("locations.domain") }) }),
        cell: (context) => {
          return /* @__PURE__ */ jsx(DataGrid.ReadonlyCell, { context, children: context.row.original.name });
        },
        disableHiding: true
      }),
      columnHelper.column({
        id: "in-stock",
        name: t("fields.inStock"),
        header: t("fields.inStock"),
        field: (context) => `locations.${context.row.original.id}`,
        type: "number",
        cell: (context) => {
          return /* @__PURE__ */ jsx(DataGrid.NumberCell, { placeholder: "0", context });
        },
        disableHiding: true
      })
    ],
    [t]
  );
};

// src/routes/inventory/inventory-create/components/inventory-create-form/schema.ts
import { z } from "zod";
var CreateInventoryItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  sku: z.string().optional(),
  hs_code: z.string().optional(),
  weight: optionalInt,
  length: optionalInt,
  height: optionalInt,
  width: optionalInt,
  origin_country: z.string().optional(),
  mid_code: z.string().optional(),
  material: z.string().optional(),
  requires_shipping: z.boolean().optional(),
  thumbnail: z.string().optional(),
  locations: z.record(z.string(), optionalInt).optional()
});

// src/routes/inventory/inventory-create/components/inventory-create-form/inventory-create-form.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function InventoryCreateForm({ locations }) {
  const { t } = useTranslation2();
  const { handleSuccess } = useRouteModal();
  const [tab, setTab] = useState("details" /* DETAILS */);
  const form = useForm({
    defaultValues: {
      title: "",
      sku: "",
      hs_code: "",
      weight: "",
      length: "",
      height: "",
      width: "",
      origin_country: "",
      mid_code: "",
      material: "",
      description: "",
      requires_shipping: true,
      thumbnail: "",
      locations: Object.fromEntries(
        locations.map((location) => [location.id, ""])
      )
    },
    resolver: zodResolver(CreateInventoryItemSchema)
  });
  const {
    trigger,
    formState: { isDirty }
  } = form;
  const { mutateAsync: createInventoryItem, isPending: isLoading } = useCreateInventoryItem();
  const handleSubmit = form.handleSubmit(async (data) => {
    const { locations: locations2, weight, length, height, width, ...payload } = data;
    const cleanData = transformNullableFormData(payload, false);
    const cleanNumbers = transformNullableFormNumbers(
      {
        weight,
        length,
        height,
        width
      },
      false
    );
    const { inventory_item } = await createInventoryItem(
      {
        ...cleanData,
        ...cleanNumbers
      },
      {
        onError: (e) => {
          toast.error(e.message);
          return;
        }
      }
    );
    await sdk.admin.inventoryItem.batchUpdateLevels(inventory_item.id, {
      create: Object.entries(locations2 ?? {}).filter(([_, quantiy]) => !!quantiy).map(([location_id, stocked_quantity]) => ({
        location_id,
        stocked_quantity: transformNullableFormNumber(
          stocked_quantity,
          false
        )
      }))
    }).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: inventoryItemsQueryKeys.lists()
      });
    }).catch((e) => {
      toast.error(e.message);
    }).finally(() => {
      handleSuccess();
      toast.success(t("inventory.create.successToast"));
    });
  });
  const [status, setStatus] = useState({
    ["availability" /* AVAILABILITY */]: "not-started",
    ["details" /* DETAILS */]: "not-started"
  });
  const onTabChange = useCallback(
    async (value) => {
      const result = await trigger();
      if (!result) {
        return;
      }
      setTab(value);
    },
    [trigger]
  );
  const onNext = useCallback(async () => {
    const result = await trigger();
    if (!result) {
      return;
    }
    switch (tab) {
      case "details" /* DETAILS */: {
        setTab("availability" /* AVAILABILITY */);
        break;
      }
      case "availability" /* AVAILABILITY */:
        break;
    }
  }, [tab, trigger]);
  useEffect(() => {
    if (isDirty) {
      setStatus((prev) => ({ ...prev, ["details" /* DETAILS */]: "in-progress" }));
    } else {
      setStatus((prev) => ({ ...prev, ["details" /* DETAILS */]: "not-started" }));
    }
  }, [isDirty]);
  useEffect(() => {
    if (tab === "details" /* DETAILS */ && isDirty) {
      setStatus((prev) => ({ ...prev, ["details" /* DETAILS */]: "in-progress" }));
    }
    if (tab === "availability" /* AVAILABILITY */) {
      setStatus((prev) => ({
        ...prev,
        ["details" /* DETAILS */]: "completed",
        ["availability" /* AVAILABILITY */]: "in-progress"
      }));
    }
  }, [tab, isDirty]);
  return /* @__PURE__ */ jsx2(RouteFocusModal.Form, { form, children: /* @__PURE__ */ jsx2(
    ProgressTabs,
    {
      value: tab,
      className: "h-full",
      onValueChange: (tab2) => onTabChange(tab2),
      children: /* @__PURE__ */ jsxs(
        KeyboundForm,
        {
          className: "flex h-full flex-col overflow-hidden",
          onSubmit: handleSubmit,
          children: [
            /* @__PURE__ */ jsx2(RouteFocusModal.Header, { children: /* @__PURE__ */ jsxs(ProgressTabs.List, { className: "border-ui-border-base -my-2 ml-2 min-w-0 flex-1 border-l", children: [
              /* @__PURE__ */ jsx2(
                ProgressTabs.Trigger,
                {
                  value: "details" /* DETAILS */,
                  status: status["details" /* DETAILS */],
                  className: "w-full max-w-[200px]",
                  children: /* @__PURE__ */ jsx2("span", { className: "w-full cursor-auto overflow-hidden text-ellipsis whitespace-nowrap", children: t("inventory.create.details") })
                }
              ),
              /* @__PURE__ */ jsx2(
                ProgressTabs.Trigger,
                {
                  value: "availability" /* AVAILABILITY */,
                  className: "w-full max-w-[200px]",
                  status: status["availability" /* AVAILABILITY */],
                  children: /* @__PURE__ */ jsx2("span", { className: "w-full overflow-hidden text-ellipsis whitespace-nowrap", children: t("inventory.create.availability") })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs(
              RouteFocusModal.Body,
              {
                className: clx(
                  "flex h-full w-full flex-col items-center divide-y overflow-hidden",
                  { "mx-auto": tab === "details" /* DETAILS */ }
                ),
                children: [
                  /* @__PURE__ */ jsx2(
                    ProgressTabs.Content,
                    {
                      value: "details" /* DETAILS */,
                      className: "h-full w-full overflow-auto px-3",
                      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex w-full max-w-[720px] flex-col gap-y-8 px-px py-16", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-8", children: [
                          /* @__PURE__ */ jsx2(Heading, { children: t("inventory.create.title") }),
                          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-6", children: [
                            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
                              /* @__PURE__ */ jsx2(
                                Form.Field,
                                {
                                  control: form.control,
                                  name: "title",
                                  render: ({ field }) => {
                                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                      /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.title") }),
                                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                        Input,
                                        {
                                          ...field,
                                          placeholder: t("fields.title")
                                        }
                                      ) }),
                                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                                    ] });
                                  }
                                }
                              ),
                              /* @__PURE__ */ jsx2(
                                Form.Field,
                                {
                                  control: form.control,
                                  name: "sku",
                                  render: ({ field }) => {
                                    return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                      /* @__PURE__ */ jsx2(Form.Label, { children: t("fields.sku") }),
                                      /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field, placeholder: "sku-123" }) }),
                                      /* @__PURE__ */ jsx2(Form.ErrorMessage, {})
                                    ] });
                                  }
                                }
                              )
                            ] }),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "description",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.description.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                      Textarea,
                                      {
                                        ...field,
                                        placeholder: "The item description"
                                      }
                                    ) })
                                  ] });
                                }
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsx2(
                            SwitchBox,
                            {
                              control: form.control,
                              name: "requires_shipping",
                              label: t("inventory.create.requiresShipping"),
                              description: t("inventory.create.requiresShippingHint")
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx2(Divider, {}),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-6", children: [
                          /* @__PURE__ */ jsx2(Heading, { level: "h2", children: t("inventory.create.attributes") }),
                          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2 lg:gap-y-8", children: [
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "width",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.width.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                      Input,
                                      {
                                        ...field,
                                        type: "number",
                                        min: 0,
                                        placeholder: "100"
                                      }
                                    ) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "length",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.length.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                      Input,
                                      {
                                        ...field,
                                        type: "number",
                                        min: 0,
                                        placeholder: "100"
                                      }
                                    ) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "height",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.height.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                      Input,
                                      {
                                        ...field,
                                        type: "number",
                                        min: 0,
                                        placeholder: "100"
                                      }
                                    ) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "weight",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.weight.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(
                                      Input,
                                      {
                                        ...field,
                                        type: "number",
                                        min: 0,
                                        placeholder: "100"
                                      }
                                    ) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "mid_code",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.mid_code.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field }) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "hs_code",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.hs_code.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field }) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "origin_country",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.countryOrigin.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(CountrySelect, { ...field }) })
                                  ] });
                                }
                              }
                            ),
                            /* @__PURE__ */ jsx2(
                              Form.Field,
                              {
                                control: form.control,
                                name: "material",
                                render: ({ field }) => {
                                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                                    /* @__PURE__ */ jsx2(Form.Label, { optional: true, children: t("products.fields.material.label") }),
                                    /* @__PURE__ */ jsx2(Form.Control, { children: /* @__PURE__ */ jsx2(Input, { ...field }) })
                                  ] });
                                }
                              }
                            )
                          ] })
                        ] })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx2(
                    ProgressTabs.Content,
                    {
                      value: "availability" /* AVAILABILITY */,
                      className: "size-full",
                      children: /* @__PURE__ */ jsx2(InventoryAvailabilityForm, { form, locations })
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx2(RouteFocusModal.Footer, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
              /* @__PURE__ */ jsx2(RouteFocusModal.Close, { asChild: true, children: /* @__PURE__ */ jsx2(Button, { variant: "secondary", size: "small", children: t("actions.cancel") }) }),
              /* @__PURE__ */ jsx2(
                Button,
                {
                  size: "small",
                  className: "whitespace-nowrap",
                  isLoading,
                  onClick: tab !== "availability" /* AVAILABILITY */ ? onNext : void 0,
                  type: tab === "availability" /* AVAILABILITY */ ? "submit" : "button",
                  children: tab === "availability" /* AVAILABILITY */ ? t("actions.save") : t("general.next")
                },
                tab === "availability" /* AVAILABILITY */ ? "details" : "pricing"
              )
            ] }) })
          ]
        }
      )
    }
  ) });
}

// src/routes/inventory/inventory-create/inventory-create.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function InventoryCreate() {
  const { isPending, stock_locations, isError, error } = useStockLocations({
    limit: 9999,
    fields: "id,name"
  });
  const ready = !isPending && !!stock_locations;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsx3(RouteFocusModal, { children: ready && /* @__PURE__ */ jsx3(InventoryCreateForm, { locations: stock_locations }) });
}
export {
  InventoryCreate as Component
};
