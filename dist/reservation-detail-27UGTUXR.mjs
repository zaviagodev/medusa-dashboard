import {
  InventoryItemGeneralSection
} from "./chunk-Q5DI5VYN.mjs";
import "./chunk-YOYOJU5D.mjs";
import {
  SectionRow
} from "./chunk-LFLGEXIG.mjs";
import {
  TwoColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  TwoColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ActionMenu
} from "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
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
  useStockLocation
} from "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import {
  reservationItemsQueryKeys,
  useReservationItem
} from "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useInventoryItem
} from "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/reservations/reservation-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var ReservationDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { reservation } = useReservationItem(id, void 0, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!reservation) {
    return null;
  }
  const display = reservation?.inventory_item?.title ?? reservation?.inventory_item?.sku ?? reservation.id;
  return /* @__PURE__ */ jsx("span", { children: display });
};

// src/routes/reservations/reservation-detail/loader.ts
var reservationDetailQuery = (id) => ({
  queryKey: reservationItemsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.reservation.retrieve(id)
});
var reservationItemLoader = async ({ params }) => {
  const id = params.id;
  const query = reservationDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/reservations/reservation-detail/reservation-detail.tsx
import { useLoaderData, useParams } from "react-router-dom";

// src/routes/reservations/reservation-detail/components/reservation-general-section/reservation-general-section.tsx
import { Container, Heading } from "@medusajs/ui";
import { PencilSquare } from "@medusajs/icons";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var ReservationGeneralSection = ({
  reservation
}) => {
  const { t } = useTranslation();
  const { inventory_item: inventoryItem, isPending: isLoadingInventoryItem } = useInventoryItem(reservation.inventory_item_id);
  const { stock_location: location, isPending: isLoadingLocation } = useStockLocation(reservation.location_id);
  if (isLoadingInventoryItem || !inventoryItem || isLoadingLocation || !location) {
    return /* @__PURE__ */ jsx2("div", { children: "Loading..." });
  }
  const locationLevel = inventoryItem.location_levels.find(
    (l) => l.location_id === reservation.location_id
  );
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Heading, { children: t("inventory.reservation.header", {
        itemName: inventoryItem.title ?? inventoryItem.sku
      }) }),
      /* @__PURE__ */ jsx2(
        ActionMenu,
        {
          groups: [
            {
              actions: [
                {
                  icon: /* @__PURE__ */ jsx2(PencilSquare, {}),
                  label: t("actions.edit"),
                  to: `edit`
                }
              ]
            }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.lineItemId"),
        value: reservation.line_item_id
      }
    ),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.description"),
        value: reservation.description
      }
    ),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.location"),
        value: location?.name
      }
    ),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.inStockAtLocation"),
        value: locationLevel?.stocked_quantity
      }
    ),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.availableAtLocation"),
        value: locationLevel?.available_quantity
      }
    ),
    /* @__PURE__ */ jsx2(
      SectionRow,
      {
        title: t("inventory.reservation.reservedAtLocation"),
        value: locationLevel?.reserved_quantity
      }
    )
  ] });
};

// src/routes/reservations/reservation-detail/reservation-detail.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ReservationDetail = () => {
  const { id } = useParams();
  const initialData = useLoaderData();
  const { reservation, isLoading, isError, error } = useReservationItem(
    id,
    void 0,
    {
      initialData
    }
  );
  const { inventory_item } = useInventoryItem(
    reservation?.inventory_item?.id,
    void 0,
    { enabled: !!reservation?.inventory_item?.id }
  );
  const { getWidgets } = useExtension();
  if (isLoading || !reservation) {
    return /* @__PURE__ */ jsx3(
      TwoColumnPageSkeleton,
      {
        mainSections: 1,
        sidebarSections: 1,
        showJSON: true,
        showMetadata: true
      }
    );
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(
    TwoColumnPage,
    {
      widgets: {
        before: getWidgets("reservation.details.before"),
        after: getWidgets("reservation.details.after"),
        sideBefore: getWidgets("reservation.details.side.before"),
        sideAfter: getWidgets("reservation.details.side.after")
      },
      data: reservation,
      showJSON: true,
      showMetadata: true,
      children: [
        /* @__PURE__ */ jsx3(TwoColumnPage.Main, { children: /* @__PURE__ */ jsx3(ReservationGeneralSection, { reservation }) }),
        /* @__PURE__ */ jsx3(TwoColumnPage.Sidebar, { children: inventory_item && /* @__PURE__ */ jsx3(InventoryItemGeneralSection, { inventoryItem: inventory_item }) })
      ]
    }
  );
};
export {
  ReservationDetailBreadcrumb as Breadcrumb,
  ReservationDetail as Component,
  reservationItemLoader as loader
};
