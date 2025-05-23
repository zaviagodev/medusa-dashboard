import {
  useDeleteProductCategory
} from "./chunk-ZJ3OFMHB.mjs";

// src/routes/categories/common/hooks/use-delete-product-category-action.tsx
import { toast, usePrompt } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
var useDeleteProductCategoryAction = (category) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteProductCategory(category.id);
  const handleDelete = async () => {
    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("categories.delete.confirmation", {
        name: category.name
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel")
    });
    if (!res) {
      return;
    }
    await mutateAsync(void 0, {
      onSuccess: () => {
        toast.success(
          t("categories.delete.successToast", {
            name: category.name
          })
        );
        navigate("/categories", {
          replace: true
        });
      },
      onError: (e) => {
        toast.error(e.message);
      }
    });
  };
  return handleDelete;
};

export {
  useDeleteProductCategoryAction
};
