import {
  getLinkedFields
} from "./chunk-BQXL5Z53.mjs";

// src/routes/products/product-detail/constants.ts
var PRODUCT_DETAIL_FIELDS = getLinkedFields(
  "product",
  "*categories,*shipping_profile,-variants"
);

export {
  PRODUCT_DETAIL_FIELDS
};
