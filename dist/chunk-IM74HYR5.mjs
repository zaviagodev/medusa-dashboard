import {
  DataGridCellContainer,
  useCombinedRefs,
  useDataGridCell,
  useDataGridCellError
} from "./chunk-53RYGJCD.mjs";
import {
  ConditionalTooltip
} from "./chunk-OC7BQLYI.mjs";

// src/components/data-grid/components/data-grid-toggleable-number-cell.tsx
import { Switch } from "@medusajs/ui";
import { useEffect, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller } from "react-hook-form";
import { jsx } from "react/jsx-runtime";
var DataGridTogglableNumberCell = ({
  context,
  disabledToggleTooltip,
  ...rest
}) => {
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  return /* @__PURE__ */ jsx(
    Controller,
    {
      control,
      name: field,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsx(
          DataGridCellContainer,
          {
            ...container,
            ...errorProps,
            outerComponent: /* @__PURE__ */ jsx(
              OuterComponent,
              {
                field: field2,
                inputProps: input,
                isAnchor: container.isAnchor,
                tooltip: disabledToggleTooltip
              }
            ),
            children: /* @__PURE__ */ jsx(Inner, { field: field2, inputProps: input, ...rest })
          }
        );
      }
    }
  );
};
var OuterComponent = ({
  field,
  inputProps,
  isAnchor,
  tooltip
}) => {
  const buttonRef = useRef(null);
  const { value } = field;
  const { onChange } = inputProps;
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const handleCheckedChange = (update) => {
    const newValue = { ...localValue, checked: update };
    if (!update && !newValue.disabledToggle) {
      newValue.quantity = "";
    }
    if (update && newValue.quantity === "") {
      newValue.quantity = 0;
    }
    setLocalValue(newValue);
    onChange(newValue, value);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isAnchor && e.key.toLowerCase() === "x") {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isAnchor]);
  return /* @__PURE__ */ jsx(
    ConditionalTooltip,
    {
      showTooltip: localValue.disabledToggle && tooltip,
      content: tooltip,
      children: /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-4 z-[3] flex w-fit items-center justify-center", children: /* @__PURE__ */ jsx(
        Switch,
        {
          ref: buttonRef,
          size: "small",
          className: "shrink-0",
          checked: localValue.checked,
          disabled: localValue.disabledToggle,
          onCheckedChange: handleCheckedChange
        }
      ) })
    }
  );
};
var Inner = ({
  field,
  inputProps,
  placeholder,
  ...props
}) => {
  const { ref, value, onChange: _, onBlur, ...fieldProps } = field;
  const {
    ref: inputRef,
    onChange,
    onBlur: onInputBlur,
    onFocus,
    ...attributes
  } = inputProps;
  const [localValue, setLocalValue] = useState(value);
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  const combinedRefs = useCombinedRefs(inputRef, ref);
  const handleInputChange = (updatedValue, _name, _values) => {
    const ensuredValue = updatedValue !== void 0 ? updatedValue : "";
    const newValue = { ...localValue, quantity: ensuredValue };
    if (ensuredValue !== "") {
      newValue.checked = true;
    } else if (newValue.checked && newValue.disabledToggle === false) {
      newValue.checked = false;
    }
    setLocalValue(newValue);
  };
  const handleOnChange = () => {
    if (localValue.disabledToggle && localValue.quantity === "") {
      localValue.quantity = 0;
    }
    onChange(localValue, value);
  };
  return /* @__PURE__ */ jsx("div", { className: "flex size-full items-center gap-x-2", children: /* @__PURE__ */ jsx(
    CurrencyInput,
    {
      ...fieldProps,
      ...attributes,
      ...props,
      ref: combinedRefs,
      className: "txt-compact-small w-full flex-1 cursor-default appearance-none bg-transparent pl-8 text-right outline-none",
      value: localValue?.quantity,
      onValueChange: handleInputChange,
      formatValueOnBlur: true,
      onBlur: () => {
        onBlur();
        onInputBlur();
        handleOnChange();
      },
      onFocus,
      decimalsLimit: 0,
      autoComplete: "off",
      tabIndex: -1,
      placeholder: !localValue.checked ? placeholder : void 0
    }
  ) });
};

export {
  DataGridTogglableNumberCell
};
