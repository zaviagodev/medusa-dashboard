import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";

// src/hooks/table/query/use-product-table-query.tsx
var DEFAULT_FIELDS = "id,title,handle,status,*collection,*sales_channels,variants.id,thumbnail";
var useProductTableQuery = ({
  prefix,
  pageSize = 20
}) => {
  const queryObject = useQueryParams(
    [
      "offset",
      "order",
      "q",
      "created_at",
      "updated_at",
      "sales_channel_id",
      "category_id",
      "collection_id",
      "is_giftcard",
      "tag_id",
      "type_id",
      "status",
      "id"
    ],
    prefix
  );
  const {
    offset,
    sales_channel_id,
    created_at,
    updated_at,
    category_id,
    collection_id,
    tag_id,
    type_id,
    is_giftcard,
    status,
    order,
    q
  } = queryObject;
  const searchParams = {
    limit: pageSize,
    offset: offset ? Number(offset) : 0,
    sales_channel_id: sales_channel_id?.split(","),
    created_at: created_at ? JSON.parse(created_at) : void 0,
    updated_at: updated_at ? JSON.parse(updated_at) : void 0,
    category_id: category_id?.split(","),
    collection_id: collection_id?.split(","),
    is_giftcard: is_giftcard ? is_giftcard === "true" : void 0,
    order,
    tag_id: tag_id ? tag_id.split(",") : void 0,
    type_id: type_id?.split(","),
    status: status?.split(","),
    q,
    fields: DEFAULT_FIELDS
  };
  return {
    searchParams,
    raw: queryObject
  };
};

export {
  useProductTableQuery
};
