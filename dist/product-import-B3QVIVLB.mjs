import {
  FileUpload
} from "./chunk-TYTNUPXB.mjs";
import {
  RouteDrawer,
  useRouteModal
} from "./chunk-4TC5YS65.mjs";
import {
  FilePreview
} from "./chunk-XKXNQ2KV.mjs";
import "./chunk-3NJTXRIY.mjs";
import "./chunk-OC7BQLYI.mjs";
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
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useConfirmImportProducts,
  useImportProducts
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/products/product-import/product-import.tsx
import { Button, Heading, Text as Text2, toast } from "@medusajs/ui";
import { useTranslation as useTranslation3 } from "react-i18next";
import { useMemo, useState as useState2 } from "react";

// src/routes/products/product-import/components/upload-import.tsx
import { useState } from "react";
import { Hint } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx, jsxs } from "react/jsx-runtime";
var SUPPORTED_FORMATS = ["text/csv"];
var SUPPORTED_FORMATS_FILE_EXTENSIONS = [".csv"];
var UploadImport = ({
  onUploaded
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState();
  const hasInvalidFiles = (fileList) => {
    const invalidFile = fileList.find(
      (f) => !SUPPORTED_FORMATS.includes(f.file.type)
    );
    if (invalidFile) {
      setError(
        t("products.media.invalidFileType", {
          name: invalidFile.file.name,
          types: SUPPORTED_FORMATS_FILE_EXTENSIONS.join(", ")
        })
      );
      return true;
    }
    return false;
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
    /* @__PURE__ */ jsx(
      FileUpload,
      {
        label: t("products.import.uploadLabel"),
        hint: t("products.import.uploadHint"),
        multiple: false,
        hasError: !!error,
        formats: SUPPORTED_FORMATS,
        onUploaded: (files) => {
          setError(void 0);
          if (hasInvalidFiles(files)) {
            return;
          }
          onUploaded(files[0].file);
        }
      }
    ),
    error && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Hint, { variant: "error", children: error }) })
  ] });
};

// src/routes/products/product-import/components/import-summary.tsx
import { Divider, Text } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ImportSummary = ({
  summary
}) => {
  const { t } = useTranslation2();
  return /* @__PURE__ */ jsxs2("div", { className: "shadow-elevation-card-rest bg-ui-bg-component transition-fg flex flex-row rounded-md px-3 py-2", children: [
    /* @__PURE__ */ jsx2(
      Stat,
      {
        title: summary.toCreate.toLocaleString(),
        description: t("products.import.upload.productsToCreate")
      }
    ),
    /* @__PURE__ */ jsx2(Divider, { orientation: "vertical", className: "h-10 px-3" }),
    /* @__PURE__ */ jsx2(
      Stat,
      {
        title: summary.toUpdate.toLocaleString(),
        description: t("products.import.upload.productsToUpdate")
      }
    )
  ] });
};
var Stat = ({
  title,
  description
}) => {
  return /* @__PURE__ */ jsxs2("div", { className: "flex flex-1 flex-col justify-center", children: [
    /* @__PURE__ */ jsx2(Text, { size: "xlarge", className: "font-sans font-medium", children: title }),
    /* @__PURE__ */ jsx2(
      Text,
      {
        leading: "compact",
        size: "xsmall",
        weight: "plus",
        className: "text-ui-fg-subtle",
        children: description
      }
    )
  ] });
};

// src/routes/products/product-import/product-import.tsx
import { Trash } from "@medusajs/icons";

// src/routes/products/product-import/helpers/import-template.ts
var ProductImportCSV = `data:text/csv;charset=utf-8,Product Id;Product Handle;Product Title;Product Subtitle;Product Description;Product Status;Product Thumbnail;Product Weight;Product Length;Product Width;Product Height;Product HS Code;Product Origin Country;Product MID Code;Product Material;Product Collection Title;Product Collection Handle;Product Type;Product Tags;Product Discountable;Product External Id;Product Profile Name;Product Profile Type;Variant Id;Variant Title;Variant SKU;Variant Barcode;Variant Inventory Quantity;Variant Allow Backorder;Variant Manage Inventory;Variant Weight;Variant Length;Variant Width;Variant Height;Variant HS Code;Variant Origin Country;Variant MID Code;Variant Material;Price EUR;Price USD;Option 1 Name;Option 1 Value;Image 1 Url;Image 2 Url
;coffee-mug-v2;Zaviago Coffee Mug;;Every programmer's best friend.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png;400;;;;;;;;;;;;true;;;;;One Size;;;100;false;true;;;;;;;;;1000;1200;Size;One Size;https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png;
;sweatpants-v2;Zaviago Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;S;;;100;false;true;;;;;;;;;2950;3350;Size;S;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Zaviago Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;M;;;100;false;true;;;;;;;;;2950;3350;Size;M;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Zaviago Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;L;;;100;false;true;;;;;;;;;2950;3350;Size;L;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
;sweatpants-v2;Zaviago Sweatpants;;Reimagine the feeling of classic sweatpants. With our cotton sweatpants, everyday essentials no longer have to be ordinary.;published;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;400;;;;;;;;;;;;true;;;;;XL;;;100;false;true;;;;;;;;;2950;3350;Size;XL;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png;https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png
`;
var getProductImportCsvTemplate = () => {
  return encodeURI(ProductImportCSV);
};

// src/routes/products/product-import/product-import.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductImport = () => {
  const { t } = useTranslation3();
  return /* @__PURE__ */ jsxs3(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs3(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx3(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx3(Heading, { children: t("products.import.header") }) }),
      /* @__PURE__ */ jsx3(RouteDrawer.Description, { className: "sr-only", children: t("products.import.description") })
    ] }),
    /* @__PURE__ */ jsx3(ProductImportContent, {})
  ] });
};
var ProductImportContent = () => {
  const { t } = useTranslation3();
  const [filename, setFilename] = useState2();
  const { mutateAsync: importProducts, isPending, data } = useImportProducts();
  const { mutateAsync: confirm } = useConfirmImportProducts();
  const { handleSuccess } = useRouteModal();
  const productImportTemplateContent = useMemo(() => {
    return getProductImportCsvTemplate();
  }, []);
  const handleUploaded = async (file) => {
    setFilename(file.name);
    await importProducts(
      { file },
      {
        onError: (err) => {
          toast.error(err.message);
          setFilename(void 0);
        }
      }
    );
  };
  const handleConfirm = async () => {
    if (!data?.transaction_id) {
      return;
    }
    await confirm(data.transaction_id, {
      onSuccess: () => {
        toast.info(t("products.import.success.title"), {
          description: t("products.import.success.description")
        });
        handleSuccess();
      },
      onError: (err) => {
        toast.error(err.message);
      }
    });
  };
  const uploadedFileActions = [
    {
      actions: [
        {
          label: t("actions.delete"),
          icon: /* @__PURE__ */ jsx3(Trash, {}),
          onClick: () => setFilename(void 0)
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsxs3(Fragment, { children: [
    /* @__PURE__ */ jsxs3(RouteDrawer.Body, { children: [
      /* @__PURE__ */ jsx3(Heading, { level: "h2", children: t("products.import.upload.title") }),
      /* @__PURE__ */ jsx3(Text2, { size: "small", className: "text-ui-fg-subtle", children: t("products.import.upload.description") }),
      /* @__PURE__ */ jsx3("div", { className: "mt-4", children: filename ? /* @__PURE__ */ jsx3(
        FilePreview,
        {
          filename,
          loading: isPending,
          activity: t("products.import.upload.preprocessing"),
          actions: uploadedFileActions
        }
      ) : /* @__PURE__ */ jsx3(UploadImport, { onUploaded: handleUploaded }) }),
      data?.summary && !!filename && /* @__PURE__ */ jsx3("div", { className: "mt-4", children: /* @__PURE__ */ jsx3(ImportSummary, { summary: data?.summary }) }),
      /* @__PURE__ */ jsx3(Heading, { className: "mt-6", level: "h2", children: t("products.import.template.title") }),
      /* @__PURE__ */ jsx3(Text2, { size: "small", className: "text-ui-fg-subtle", children: t("products.import.template.description") }),
      /* @__PURE__ */ jsx3("div", { className: "mt-4", children: /* @__PURE__ */ jsx3(
        FilePreview,
        {
          filename: "product-import-template.csv",
          url: productImportTemplateContent
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx3(RouteDrawer.Footer, { children: /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsx3(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx3(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
      /* @__PURE__ */ jsx3(
        Button,
        {
          onClick: handleConfirm,
          size: "small",
          disabled: !data?.transaction_id || !filename,
          children: t("actions.import")
        }
      )
    ] }) })
  ] });
};
export {
  ProductImport as Component
};
