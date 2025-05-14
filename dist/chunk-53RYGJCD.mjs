import {
  currencies
} from "./chunk-MWVM4TYO.mjs";
import {
  Skeleton
} from "./chunk-LPEUYMRK.mjs";
import {
  ConditionalTooltip
} from "./chunk-OC7BQLYI.mjs";
import {
  __publicField
} from "./chunk-RPUOO7AV.mjs";

// src/components/data-grid/components/data-grid-skeleton.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var DataGridSkeleton = ({
  columns,
  rows: rowCount = 10
}) => {
  const rows = Array.from({ length: rowCount }, (_, i) => i);
  const colCount = columns.length;
  return /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-subtle size-full", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-base border-b p-4", children: /* @__PURE__ */ jsx("div", { className: "bg-ui-button-neutral h-7 w-[116px] animate-pulse rounded-md" }) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-ui-bg-subtle size-full overflow-auto", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "grid",
          style: {
            gridTemplateColumns: `repeat(${colCount}, 1fr)`
          },
          children: columns.map((_col, i) => {
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-ui-bg-base flex h-10 w-[200px] items-center border-b border-r px-4 py-2.5 last:border-r-0",
                children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[14px] w-[164px]" })
              },
              i
            );
          })
        }
      ),
      /* @__PURE__ */ jsx("div", { children: rows.map((_, j) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "grid",
          style: { gridTemplateColumns: `repeat(${colCount}, 1fr)` },
          children: columns.map((_col, k) => {
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: "bg-ui-bg-base flex h-10 w-[200px] items-center border-b border-r px-4 py-2.5 last:border-r-0",
                children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[14px] w-[164px]" })
              },
              k
            );
          })
        },
        j
      )) })
    ] })
  ] });
};

// src/components/data-grid/components/data-grid-boolean-cell.tsx
import { Checkbox } from "@medusajs/ui";
import { Controller } from "react-hook-form";

// src/hooks/use-combined-refs.tsx
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && "current" in ref) {
    ;
    ref.current = value;
  }
}
var useCombinedRefs = (...refs) => {
  return (value) => {
    refs.forEach((ref) => setRef(ref, value));
  };
};

// src/components/data-grid/hooks/use-data-grid-cell.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// src/components/data-grid/context/data-grid-context.tsx
import { createContext } from "react";
var DataGridContext = createContext(
  null
);

// src/components/data-grid/context/use-data-grid-context.tsx
import { useContext } from "react";
var useDataGridContext = () => {
  const context = useContext(DataGridContext);
  if (!context) {
    throw new Error(
      "useDataGridContext must be used within a DataGridContextProvider"
    );
  }
  return context;
};

// src/components/data-grid/utils.ts
function generateCellId(coords) {
  return `${coords.row}:${coords.col}`;
}
function isCellMatch(cell, coords) {
  if (!coords) {
    return false;
  }
  return cell.row === coords.row && cell.col === coords.col;
}
var SPECIAL_FOCUS_KEYS = [".", ","];
function isSpecialFocusKey(event) {
  return SPECIAL_FOCUS_KEYS.includes(event.key) && event.ctrlKey && event.altKey;
}

// src/components/data-grid/hooks/use-data-grid-cell.tsx
var textCharacterRegex = /^.$/u;
var numberCharacterRegex = /^[0-9]$/u;
var useDataGridCell = ({
  context
}) => {
  const {
    register,
    control,
    anchor,
    setIsEditing,
    setSingleRange,
    setIsSelecting,
    setRangeEnd,
    getWrapperFocusHandler,
    getWrapperMouseOverHandler,
    getInputChangeHandler,
    getIsCellSelected,
    getIsCellDragSelected,
    getCellMetadata
  } = useDataGridContext();
  const { rowIndex, columnIndex } = context;
  const coords = useMemo(
    () => ({ row: rowIndex, col: columnIndex }),
    [rowIndex, columnIndex]
  );
  const { id, field, type, innerAttributes, inputAttributes } = useMemo(() => {
    return getCellMetadata(coords);
  }, [coords, getCellMetadata]);
  const [showOverlay, setShowOverlay] = useState(true);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const handleOverlayMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.detail === 2) {
        if (inputRef.current) {
          setShowOverlay(false);
          inputRef.current.focus();
          return;
        }
      }
      if (e.shiftKey) {
        if (coords.col === anchor?.col) {
          setRangeEnd(coords);
          return;
        }
      }
      if (containerRef.current) {
        setSingleRange(coords);
        setIsSelecting(true);
        containerRef.current.focus();
      }
    },
    [coords, anchor, setRangeEnd, setSingleRange, setIsSelecting]
  );
  const handleBooleanInnerMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.detail === 2) {
        inputRef.current?.focus();
        return;
      }
      if (e.shiftKey) {
        setRangeEnd(coords);
        return;
      }
      if (containerRef.current) {
        setSingleRange(coords);
        setIsSelecting(true);
        containerRef.current.focus();
      }
    },
    [setIsSelecting, setSingleRange, setRangeEnd, coords]
  );
  const handleInputBlur = useCallback(() => {
    setShowOverlay(true);
    setIsEditing(false);
  }, [setIsEditing]);
  const handleInputFocus = useCallback(() => {
    setShowOverlay(false);
    setIsEditing(true);
  }, [setIsEditing]);
  const validateKeyStroke = useCallback(
    (key) => {
      switch (type) {
        case "togglable-number":
        case "number":
          return numberCharacterRegex.test(key);
        case "text":
          return textCharacterRegex.test(key);
        default:
          return false;
      }
    },
    [type]
  );
  const handleContainerKeyDown = useCallback(
    (e) => {
      if (!inputRef.current || !validateKeyStroke(e.key) || !showOverlay) {
        return;
      }
      if (e.key.toLowerCase() === "z" && (e.ctrlKey || e.metaKey)) {
        return;
      }
      if (e.key.toLowerCase() === "c" && (e.ctrlKey || e.metaKey)) {
        return;
      }
      if (e.key.toLowerCase() === "v" && (e.ctrlKey || e.metaKey)) {
        return;
      }
      if (e.key === "Enter") {
        return;
      }
      if (isSpecialFocusKey(e.nativeEvent)) {
        return;
      }
      inputRef.current.focus();
      setShowOverlay(false);
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.value = "";
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, e.key);
        const event = new Event("input", { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
      e.stopPropagation();
      e.preventDefault();
    },
    [showOverlay, validateKeyStroke]
  );
  const isAnchor = useMemo(() => {
    return anchor ? isCellMatch(coords, anchor) : false;
  }, [anchor, coords]);
  const fieldWithoutOverlay = useMemo(() => {
    return type === "boolean";
  }, [type]);
  useEffect(() => {
    if (isAnchor && !containerRef.current?.contains(document.activeElement)) {
      containerRef.current?.focus();
    }
  }, [isAnchor]);
  const renderProps = {
    container: {
      field,
      isAnchor,
      isSelected: getIsCellSelected(coords),
      isDragSelected: getIsCellDragSelected(coords),
      showOverlay: fieldWithoutOverlay ? false : showOverlay,
      innerProps: {
        ref: containerRef,
        onMouseOver: getWrapperMouseOverHandler(coords),
        onMouseDown: type === "boolean" ? handleBooleanInnerMouseDown : void 0,
        onKeyDown: handleContainerKeyDown,
        onFocus: getWrapperFocusHandler(coords),
        ...innerAttributes
      },
      overlayProps: {
        onMouseDown: handleOverlayMouseDown
      }
    },
    input: {
      ref: inputRef,
      onBlur: handleInputBlur,
      onFocus: handleInputFocus,
      onChange: getInputChangeHandler(field),
      ...inputAttributes
    }
  };
  return {
    id,
    field,
    register,
    control,
    renderProps
  };
};

// src/components/data-grid/hooks/use-data-grid-cell-error.tsx
import { useMemo as useMemo2 } from "react";
import { get } from "react-hook-form";
var useDataGridCellError = ({
  context
}) => {
  const { errors, getCellErrorMetadata, navigateToField } = useDataGridContext();
  const { rowIndex, columnIndex } = context;
  const { accessor, field } = useMemo2(() => {
    return getCellErrorMetadata({ row: rowIndex, col: columnIndex });
  }, [rowIndex, columnIndex, getCellErrorMetadata]);
  const rowErrorsObject = accessor && columnIndex === 0 ? get(errors, accessor) : void 0;
  const rowErrors = [];
  function collectErrors(errorObject, baseAccessor) {
    if (!errorObject) {
      return;
    }
    if (isFieldError(errorObject)) {
      const message = errorObject.message;
      const to = () => navigateToField(baseAccessor);
      if (message) {
        rowErrors.push({ message, to });
      }
    } else {
      Object.keys(errorObject).forEach((key) => {
        const nestedError = errorObject[key];
        const fieldAccessor = `${baseAccessor}.${key}`;
        if (nestedError && typeof nestedError === "object") {
          collectErrors(nestedError, fieldAccessor);
        }
      });
    }
  }
  if (rowErrorsObject && accessor) {
    collectErrors(rowErrorsObject, accessor);
  }
  const cellError = field ? get(errors, field) : void 0;
  return {
    errors,
    rowErrors,
    cellError
  };
};
function isFieldError(errors) {
  return typeof errors === "object" && "message" in errors && "type" in errors;
}

// src/components/data-grid/hooks/use-data-grid-cell-handlers.tsx
import { useCallback as useCallback2 } from "react";

// src/components/data-grid/models/data-grid-bulk-update-command.ts
var DataGridBulkUpdateCommand = class {
  constructor({ fields, prev, next, setter }) {
    __publicField(this, "_fields");
    __publicField(this, "_prev");
    __publicField(this, "_next");
    __publicField(this, "_setter");
    this._fields = fields;
    this._prev = prev;
    this._next = next;
    this._setter = setter;
  }
  execute(redo = false) {
    this._setter(this._fields, this._next, redo);
  }
  undo() {
    this._setter(this._fields, this._prev, true);
  }
  redo() {
    this.execute(true);
  }
};

// src/components/data-grid/models/data-grid-matrix.ts
var DataGridMatrix = class {
  constructor(data, columns, multiColumnSelection = false) {
    __publicField(this, "multiColumnSelection");
    __publicField(this, "cells");
    __publicField(this, "rowAccessors", []);
    __publicField(this, "columnAccessors", []);
    this.multiColumnSelection = multiColumnSelection;
    this.cells = this._populateCells(data, columns);
    this.rowAccessors = this._computeRowAccessors();
    this.columnAccessors = this._computeColumnAccessors();
  }
  _computeRowAccessors() {
    return this.cells.map((_, rowIndex) => this.getRowAccessor(rowIndex));
  }
  _computeColumnAccessors() {
    if (this.cells.length === 0) {
      return [];
    }
    return this.cells[0].map((_, colIndex) => this.getColumnAccessor(colIndex));
  }
  getFirstNavigableCell() {
    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[0].length; col++) {
        if (this.cells[row][col] !== null) {
          return { row, col };
        }
      }
    }
    return null;
  }
  getFieldsInRow(row) {
    const keys = [];
    if (row < 0 || row >= this.cells.length) {
      return keys;
    }
    this.cells[row].forEach((cell) => {
      if (cell !== null) {
        keys.push(cell.field);
      }
    });
    return keys;
  }
  getFieldsInSelection(start, end) {
    const keys = [];
    if (!start || !end) {
      return keys;
    }
    if (!this.multiColumnSelection && start.col !== end.col) {
      throw new Error(
        "Selection must be in the same column when multiColumnSelection is disabled"
      );
    }
    const startRow = Math.min(start.row, end.row);
    const endRow = Math.max(start.row, end.row);
    const startCol = this.multiColumnSelection ? Math.min(start.col, end.col) : start.col;
    const endCol = this.multiColumnSelection ? Math.max(start.col, end.col) : start.col;
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (this._isValidPosition(row, col) && this.cells[row][col] !== null) {
          keys.push(this.cells[row][col]?.field);
        }
      }
    }
    return keys;
  }
  getCellField(cell) {
    if (this._isValidPosition(cell.row, cell.col)) {
      return this.cells[cell.row][cell.col]?.field || null;
    }
    return null;
  }
  getCellType(cell) {
    if (this._isValidPosition(cell.row, cell.col)) {
      return this.cells[cell.row][cell.col]?.type || null;
    }
    return null;
  }
  getIsCellSelected(cell, start, end) {
    if (!cell || !start || !end) {
      return false;
    }
    if (!this.multiColumnSelection && start.col !== end.col) {
      throw new Error(
        "Selection must be in the same column when multiColumnSelection is disabled"
      );
    }
    const startRow = Math.min(start.row, end.row);
    const endRow = Math.max(start.row, end.row);
    const startCol = this.multiColumnSelection ? Math.min(start.col, end.col) : start.col;
    const endCol = this.multiColumnSelection ? Math.max(start.col, end.col) : start.col;
    return cell.row >= startRow && cell.row <= endRow && cell.col >= startCol && cell.col <= endCol;
  }
  toggleColumn(col, enabled) {
    if (col < 0 || col >= this.cells[0].length) {
      return;
    }
    this.cells.forEach((row, index) => {
      const cell = row[col];
      if (cell) {
        this.cells[index][col] = {
          ...cell,
          enabled
        };
      }
    });
  }
  toggleRow(row, enabled) {
    if (row < 0 || row >= this.cells.length) {
      return;
    }
    this.cells[row].forEach((cell, index) => {
      if (cell) {
        this.cells[row][index] = {
          ...cell,
          enabled
        };
      }
    });
  }
  getCoordinatesByField(field) {
    if (this.rowAccessors.length === 1) {
      const col = this.columnAccessors.indexOf(field);
      if (col === -1) {
        return null;
      }
      return { row: 0, col };
    }
    for (let row = 0; row < this.rowAccessors.length; row++) {
      const rowAccessor = this.rowAccessors[row];
      if (rowAccessor === null) {
        continue;
      }
      if (!field.startsWith(rowAccessor)) {
        continue;
      }
      for (let column = 0; column < this.columnAccessors.length; column++) {
        const columnAccessor = this.columnAccessors[column];
        if (columnAccessor === null) {
          continue;
        }
        const fullFieldPath = `${rowAccessor}.${columnAccessor}`;
        if (fullFieldPath === field) {
          return { row, col: column };
        }
      }
    }
    return null;
  }
  getRowAccessor(row) {
    if (row < 0 || row >= this.cells.length) {
      return null;
    }
    const cells = this.cells[row];
    const nonNullFields = cells.filter((cell) => cell !== null).map((cell) => cell.field.split("."));
    if (nonNullFields.length === 0) {
      return null;
    }
    let commonParts = nonNullFields[0];
    for (const segments of nonNullFields) {
      commonParts = commonParts.filter(
        (part, index) => segments[index] === part
      );
      if (commonParts.length === 0) {
        break;
      }
    }
    const accessor = commonParts.join(".");
    if (!accessor) {
      return null;
    }
    return accessor;
  }
  getColumnAccessor(column) {
    if (column < 0 || column >= this.cells[0].length) {
      return null;
    }
    const uniqueParts = this.cells.map((row, rowIndex) => {
      const cell = row[column];
      if (!cell) {
        return null;
      }
      const rowAccessor = this.getRowAccessor(rowIndex);
      if (rowAccessor && cell.field.startsWith(rowAccessor + ".")) {
        return cell.field.slice(rowAccessor.length + 1);
      }
      return null;
    }).filter((part) => part !== null);
    if (uniqueParts.length === 0) {
      return null;
    }
    const firstPart = uniqueParts[0];
    const isConsistent = uniqueParts.every((part) => part === firstPart);
    return isConsistent ? firstPart : null;
  }
  getValidMovement(row, col, direction, metaKey = false) {
    const [dRow, dCol] = this._getDirectionDeltas(direction);
    if (metaKey) {
      return this._getLastValidCellInDirection(row, col, dRow, dCol);
    } else {
      let newRow = row + dRow;
      let newCol = col + dCol;
      while (this._isValidPosition(newRow, newCol)) {
        if (this.cells[newRow][newCol] !== null && this.cells[newRow][newCol]?.enabled !== false) {
          return { row: newRow, col: newCol };
        }
        newRow += dRow;
        newCol += dCol;
      }
      return { row, col };
    }
  }
  _isValidPosition(row, col, cells) {
    if (!cells) {
      cells = this.cells;
    }
    return row >= 0 && row < cells.length && col >= 0 && col < cells[0].length;
  }
  _getDirectionDeltas(direction) {
    switch (direction) {
      case "ArrowUp":
        return [-1, 0];
      case "ArrowDown":
        return [1, 0];
      case "ArrowLeft":
        return [0, -1];
      case "ArrowRight":
        return [0, 1];
      default:
        return [0, 0];
    }
  }
  _getLastValidCellInDirection(row, col, dRow, dCol) {
    let newRow = row;
    let newCol = col;
    let lastValidRow = row;
    let lastValidCol = col;
    while (this._isValidPosition(newRow + dRow, newCol + dCol)) {
      newRow += dRow;
      newCol += dCol;
      if (this.cells[newRow][newCol] !== null) {
        lastValidRow = newRow;
        lastValidCol = newCol;
      }
    }
    return {
      row: lastValidRow,
      col: lastValidCol
    };
  }
  _populateCells(rows, columns) {
    const cells = Array.from(
      { length: rows.length },
      () => Array(columns.length).fill(null)
    );
    rows.forEach((row, rowIndex) => {
      columns.forEach((column, colIndex) => {
        if (!this._isValidPosition(rowIndex, colIndex, cells)) {
          return;
        }
        const {
          name: _,
          field,
          type,
          ...rest
        } = column.meta;
        const context = {
          row,
          column: {
            ...column,
            meta: rest
          }
        };
        const fieldValue = field ? field(context) : null;
        if (!fieldValue || !type) {
          return;
        }
        cells[rowIndex][colIndex] = {
          field: fieldValue,
          type,
          enabled: true
        };
      });
    });
    return cells;
  }
};

// src/components/data-grid/models/data-grid-query-tool.ts
var DataGridQueryTool = class {
  constructor(container) {
    __publicField(this, "container");
    this.container = container;
  }
  getInput(cell) {
    const id = this._getCellId(cell);
    const input = this.container?.querySelector(`[data-cell-id="${id}"]`);
    if (!input) {
      return null;
    }
    return input;
  }
  getInputByField(field) {
    const input = this.container?.querySelector(`[data-field="${field}"]`);
    if (!input) {
      return null;
    }
    return input;
  }
  getCoordinatesByField(field) {
    const cell = this.container?.querySelector(
      `[data-field="${field}"][data-cell-id]`
    );
    if (!cell) {
      return null;
    }
    const cellId = cell.getAttribute("data-cell-id");
    if (!cellId) {
      return null;
    }
    const [row, col] = cellId.split(":").map((n) => parseInt(n, 10));
    if (isNaN(row) || isNaN(col)) {
      return null;
    }
    return { row, col };
  }
  getContainer(cell) {
    const id = this._getCellId(cell);
    const container = this.container?.querySelector(
      `[data-container-id="${id}"]`
    );
    if (!container) {
      return null;
    }
    return container;
  }
  _getCellId(cell) {
    return generateCellId(cell);
  }
};

// src/components/data-grid/models/data-grid-update-command.ts
var DataGridUpdateCommand = class {
  constructor({ prev, next, setter }) {
    __publicField(this, "_prev");
    __publicField(this, "_next");
    __publicField(this, "_setter");
    this._prev = prev;
    this._next = next;
    this._setter = setter;
  }
  execute() {
    this._setter(this._next);
  }
  undo() {
    this._setter(this._prev);
  }
  redo() {
    this.execute();
  }
};

// src/components/data-grid/hooks/use-data-grid-cell-handlers.tsx
var useDataGridCellHandlers = ({
  matrix,
  anchor,
  rangeEnd,
  setRangeEnd,
  isDragging,
  setIsDragging,
  isSelecting,
  setIsSelecting,
  setSingleRange,
  dragEnd,
  setDragEnd,
  setValue: setValue2,
  execute,
  multiColumnSelection
}) => {
  const getWrapperFocusHandler = useCallback2(
    (coords) => {
      return (_e) => {
        setSingleRange(coords);
      };
    },
    [setSingleRange]
  );
  const getOverlayMouseDownHandler = useCallback2(
    (coords) => {
      return (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.shiftKey) {
          setRangeEnd(coords);
          return;
        }
        setIsSelecting(true);
        setSingleRange(coords);
      };
    },
    [setIsSelecting, setRangeEnd, setSingleRange]
  );
  const getWrapperMouseOverHandler = useCallback2(
    (coords) => {
      if (!isDragging && !isSelecting) {
        return;
      }
      return (_e) => {
        if (anchor?.col !== coords.col && !multiColumnSelection) {
          return;
        }
        if (isSelecting) {
          setRangeEnd(coords);
        } else {
          setDragEnd(coords);
        }
      };
    },
    [
      anchor?.col,
      isDragging,
      isSelecting,
      setDragEnd,
      setRangeEnd,
      multiColumnSelection
    ]
  );
  const getInputChangeHandler = useCallback2(
    // Using `any` here as the generic type of Path<TFieldValues> will
    // not be inferred correctly.
    (field) => {
      return (next, prev) => {
        const command = new DataGridUpdateCommand({
          next,
          prev,
          setter: (value) => {
            setValue2(field, value, {
              shouldDirty: true,
              shouldTouch: true
            });
          }
        });
        execute(command);
      };
    },
    [setValue2, execute]
  );
  const onDragToFillStart = useCallback2(
    (_e) => {
      setIsDragging(true);
    },
    [setIsDragging]
  );
  const getIsCellSelected = useCallback2(
    (cell) => {
      if (!cell || !anchor || !rangeEnd) {
        return false;
      }
      return matrix.getIsCellSelected(cell, anchor, rangeEnd);
    },
    [anchor, rangeEnd, matrix]
  );
  const getIsCellDragSelected = useCallback2(
    (cell) => {
      if (!cell || !anchor || !dragEnd) {
        return false;
      }
      return matrix.getIsCellSelected(cell, anchor, dragEnd);
    },
    [anchor, dragEnd, matrix]
  );
  return {
    getWrapperFocusHandler,
    getOverlayMouseDownHandler,
    getWrapperMouseOverHandler,
    getInputChangeHandler,
    getIsCellSelected,
    getIsCellDragSelected,
    onDragToFillStart
  };
};

// src/components/data-grid/hooks/use-data-grid-cell-metadata.tsx
import { useCallback as useCallback3 } from "react";
var useDataGridCellMetadata = ({
  matrix
}) => {
  const getCellMetadata = useCallback3(
    (coords) => {
      const { row, col } = coords;
      const id = generateCellId(coords);
      const field = matrix.getCellField(coords);
      const type = matrix.getCellType(coords);
      if (!field || !type) {
        throw new Error(`'field' or 'type' is null for cell ${id}`);
      }
      const inputAttributes = {
        "data-row": row,
        "data-col": col,
        "data-cell-id": id,
        "data-field": field
      };
      const innerAttributes = {
        "data-container-id": id
      };
      return {
        id,
        field,
        type,
        inputAttributes,
        innerAttributes
      };
    },
    [matrix]
  );
  const getCellErrorMetadata = useCallback3(
    (coords) => {
      const accessor = matrix.getRowAccessor(coords.row);
      const field = matrix.getCellField(coords);
      return {
        accessor,
        field
      };
    },
    [matrix]
  );
  return {
    getCellMetadata,
    getCellErrorMetadata
  };
};

// src/components/data-grid/hooks/use-data-grid-cell-snapshot.tsx
import { useCallback as useCallback4, useState as useState2 } from "react";
var useDataGridCellSnapshot = ({
  matrix,
  form
}) => {
  const [snapshot, setSnapshot] = useState2(null);
  const { getValues, setValue: setValue2 } = form;
  const createSnapshot = useCallback4(
    (cell) => {
      if (!cell) {
        return null;
      }
      const field = matrix.getCellField(cell);
      if (!field) {
        return null;
      }
      const value = getValues(field);
      setSnapshot((curr) => {
        if (curr?.field === field) {
          return curr;
        }
        return { field, value };
      });
    },
    [getValues, matrix]
  );
  const restoreSnapshot = useCallback4(() => {
    if (!snapshot) {
      return;
    }
    const { field, value } = snapshot;
    requestAnimationFrame(() => {
      setValue2(field, value);
    });
  }, [setValue2, snapshot]);
  return {
    createSnapshot,
    restoreSnapshot
  };
};

// src/components/data-grid/hooks/use-data-grid-clipboard-events.tsx
import { useCallback as useCallback5 } from "react";
var useDataGridClipboardEvents = ({
  matrix,
  anchor,
  rangeEnd,
  isEditing,
  getSelectionValues,
  setSelectionValues,
  execute
}) => {
  const handleCopyEvent = useCallback5(
    (e) => {
      if (isEditing || !anchor || !rangeEnd) {
        return;
      }
      e.preventDefault();
      const fields = matrix.getFieldsInSelection(anchor, rangeEnd);
      const values = getSelectionValues(fields);
      const text = values.map((value) => {
        if (typeof value === "object" && value !== null) {
          return JSON.stringify(value);
        }
        return `${value}` ?? "";
      }).join("	");
      e.clipboardData?.setData("text/plain", text);
    },
    [isEditing, anchor, rangeEnd, matrix, getSelectionValues]
  );
  const handlePasteEvent = useCallback5(
    (e) => {
      if (isEditing || !anchor || !rangeEnd) {
        return;
      }
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain");
      if (!text) {
        return;
      }
      const next = text.split("	");
      const fields = matrix.getFieldsInSelection(anchor, rangeEnd);
      const prev = getSelectionValues(fields);
      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues
      });
      execute(command);
    },
    [
      isEditing,
      anchor,
      rangeEnd,
      matrix,
      getSelectionValues,
      setSelectionValues,
      execute
    ]
  );
  return {
    handleCopyEvent,
    handlePasteEvent
  };
};

// src/components/data-grid/hooks/use-data-grid-column-visibility.tsx
import { useCallback as useCallback6 } from "react";
function useDataGridColumnVisibility(grid, matrix) {
  const columns = grid.getAllLeafColumns();
  const columnOptions = columns.map((column) => ({
    id: column.id,
    name: getColumnName(column),
    checked: column.getIsVisible(),
    disabled: !column.getCanHide()
  }));
  const handleToggleColumn = useCallback6(
    (index) => (value) => {
      const column = columns[index];
      if (!column.getCanHide()) {
        return;
      }
      matrix.toggleColumn(index, value);
      column.toggleVisibility(value);
    },
    [columns, matrix]
  );
  const handleResetColumns = useCallback6(() => {
    grid.setColumnVisibility({});
  }, [grid]);
  const optionCount = columnOptions.filter((c) => !c.disabled).length;
  const isDisabled = optionCount === 0;
  return {
    columnOptions,
    handleToggleColumn,
    handleResetColumns,
    isDisabled
  };
}
function getColumnName(column) {
  const id = column.columnDef.id;
  const enableHiding = column.columnDef.enableHiding;
  const meta = column?.columnDef.meta;
  if (!id) {
    throw new Error(
      "Column is missing an id, which is a required field. Please provide an id for the column."
    );
  }
  if (process.env.NODE_ENV === "development" && !meta?.name && enableHiding) {
    console.warn(
      `Column "${id}" does not have a name. You should add a name to the column definition. Falling back to the column id.`
    );
  }
  return meta?.name || id;
}

// src/components/data-grid/hooks/use-data-grid-duplicate-cell.tsx
import { useWatch } from "react-hook-form";
var useDataGridDuplicateCell = ({
  duplicateOf
}) => {
  const { control } = useDataGridContext();
  const watchedValue = useWatch({ control, name: duplicateOf });
  return {
    watchedValue
  };
};

// src/components/data-grid/hooks/use-data-grid-error-highlighting.tsx
import { useCallback as useCallback7, useMemo as useMemo3, useState as useState3 } from "react";
var useDataGridErrorHighlighting = (matrix, grid, errors) => {
  const [isHighlighted, setIsHighlighted] = useState3(false);
  const [visibilitySnapshot, setVisibilitySnapshot] = useState3(null);
  const { flatRows } = grid.getRowModel();
  const flatColumns = grid.getAllFlatColumns();
  const errorPaths = findErrorPaths(errors);
  const errorCount = errorPaths.length;
  const { rowsWithErrors, columnsWithErrors } = useMemo3(() => {
    const rowsWithErrors2 = /* @__PURE__ */ new Set();
    const columnsWithErrors2 = /* @__PURE__ */ new Set();
    errorPaths.forEach((errorPath) => {
      const rowIndex = matrix.rowAccessors.findIndex(
        (accessor) => accessor && (errorPath === accessor || errorPath.startsWith(`${accessor}.`))
      );
      if (rowIndex !== -1) {
        rowsWithErrors2.add(rowIndex);
      }
      const columnIndex = matrix.columnAccessors.findIndex(
        (accessor) => accessor && (errorPath === accessor || errorPath.endsWith(`.${accessor}`))
      );
      if (columnIndex !== -1) {
        columnsWithErrors2.add(columnIndex);
      }
    });
    return { rowsWithErrors: rowsWithErrors2, columnsWithErrors: columnsWithErrors2 };
  }, [errorPaths, matrix.rowAccessors, matrix.columnAccessors]);
  const toggleErrorHighlighting = useCallback7(
    (currentRowVisibility, currentColumnVisibility, setRowVisibility, setColumnVisibility) => {
      if (isHighlighted) {
        if (visibilitySnapshot) {
          setRowVisibility(visibilitySnapshot.rows);
          setColumnVisibility(visibilitySnapshot.columns);
        }
      } else {
        setVisibilitySnapshot({
          rows: { ...currentRowVisibility },
          columns: { ...currentColumnVisibility }
        });
        const rowsToHide = flatRows.map((_, index) => {
          return !rowsWithErrors.has(index) ? index : void 0;
        }).filter((index) => index !== void 0);
        const columnsToHide = flatColumns.map((column, index) => {
          return !columnsWithErrors.has(index) && index !== 0 ? column.id : void 0;
        }).filter((id) => id !== void 0);
        setRowVisibility(
          rowsToHide.reduce((acc, row) => ({ ...acc, [row]: false }), {})
        );
        setColumnVisibility(
          columnsToHide.reduce(
            (acc, column) => ({ ...acc, [column]: false }),
            {}
          )
        );
      }
      setIsHighlighted((prev) => !prev);
    },
    [
      isHighlighted,
      visibilitySnapshot,
      flatRows,
      flatColumns,
      rowsWithErrors,
      columnsWithErrors
    ]
  );
  return {
    errorCount,
    isHighlighted,
    toggleErrorHighlighting
  };
};
function findErrorPaths(obj, path = []) {
  if (typeof obj !== "object" || obj === null) {
    return [];
  }
  if ("message" in obj && "type" in obj) {
    return [path.join(".")];
  }
  return Object.entries(obj).flatMap(
    ([key, value]) => findErrorPaths(value, [...path, key])
  );
}

// src/components/data-grid/hooks/use-data-grid-form-handlers.tsx
import get2 from "lodash/get";
import set from "lodash/set";
import { useCallback as useCallback8 } from "react";
var useDataGridFormHandlers = ({
  matrix,
  form,
  anchor
}) => {
  const { getValues, reset } = form;
  const getSelectionValues = useCallback8(
    (fields) => {
      if (!fields.length) {
        return [];
      }
      const allValues = getValues();
      return fields.map((field) => {
        return field.split(".").reduce((obj, key) => obj?.[key], allValues);
      });
    },
    [getValues]
  );
  const setSelectionValues = useCallback8(
    async (fields, values, isHistory) => {
      if (!fields.length || !anchor) {
        return;
      }
      const type = matrix.getCellType(anchor);
      if (!type) {
        return;
      }
      const convertedValues = convertArrayToPrimitive(values, type);
      const currentValues = getValues();
      fields.forEach((field, index) => {
        if (!field) {
          return;
        }
        const valueIndex = index % values.length;
        const newValue = convertedValues[valueIndex];
        setValue(currentValues, field, newValue, type, isHistory);
      });
      reset(currentValues, {
        keepDirty: true,
        keepTouched: true,
        keepDefaultValues: true
      });
    },
    [matrix, anchor, getValues, reset]
  );
  return {
    getSelectionValues,
    setSelectionValues
  };
};
function convertToNumber(value) {
  if (typeof value === "number") {
    return value;
  }
  const converted = Number(value);
  if (isNaN(converted)) {
    throw new Error(`String "${value}" cannot be converted to number.`);
  }
  return converted;
}
function convertToBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "undefined" || value === null) {
    return false;
  }
  const lowerValue = value.toLowerCase();
  if (lowerValue === "true" || lowerValue === "false") {
    return lowerValue === "true";
  }
  throw new Error(`String "${value}" cannot be converted to boolean.`);
}
function covertToString(value) {
  if (typeof value === "undefined" || value === null) {
    return "";
  }
  return String(value);
}
function convertToggleableNumber(value) {
  let obj = value;
  if (typeof obj === "string") {
    try {
      obj = JSON.parse(obj);
    } catch (error) {
      throw new Error(`String "${value}" cannot be converted to object.`);
    }
  }
  return obj;
}
function setValue(currentValues, field, newValue, type, isHistory) {
  if (type !== "togglable-number") {
    set(currentValues, field, newValue);
    return;
  }
  setValueToggleableNumber(currentValues, field, newValue, isHistory);
}
function setValueToggleableNumber(currentValues, field, newValue, isHistory) {
  const currentValue = get2(currentValues, field);
  const { disabledToggle } = currentValue;
  const normalizeQuantity = (value) => {
    if (disabledToggle && value === "") {
      return 0;
    }
    return value;
  };
  const determineChecked = (quantity2) => {
    if (disabledToggle) {
      return true;
    }
    return quantity2 !== "" && quantity2 != null;
  };
  const quantity = normalizeQuantity(newValue.quantity);
  const checked = isHistory ? disabledToggle ? true : newValue.checked : determineChecked(quantity);
  set(currentValues, field, {
    ...currentValue,
    quantity,
    checked
  });
}
function convertArrayToPrimitive(values, type) {
  switch (type) {
    case "number":
      return values.map((v) => {
        if (v === "") {
          return v;
        }
        if (v == null) {
          return "";
        }
        return convertToNumber(v);
      });
    case "togglable-number":
      return values.map(convertToggleableNumber);
    case "boolean":
      return values.map(convertToBoolean);
    case "text":
      return values.map(covertToString);
    default:
      throw new Error(`Unsupported target type "${type}".`);
  }
}

// src/components/data-grid/hooks/use-data-grid-keydown-event.tsx
import { useCallback as useCallback9 } from "react";
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var VERTICAL_KEYS = ["ArrowUp", "ArrowDown"];
var useDataGridKeydownEvent = ({
  containerRef,
  matrix,
  anchor,
  rangeEnd,
  isEditing,
  setTrapActive,
  scrollToCoordinates,
  setSingleRange,
  setRangeEnd,
  onEditingChangeHandler,
  getValues,
  setValue: setValue2,
  execute,
  undo,
  redo,
  queryTool,
  getSelectionValues,
  setSelectionValues,
  restoreSnapshot,
  createSnapshot
}) => {
  const handleKeyboardNavigation = useCallback9(
    (e) => {
      if (!anchor) {
        return;
      }
      const type = matrix.getCellType(anchor);
      if (isEditing && type !== "boolean") {
        return;
      }
      const direction = VERTICAL_KEYS.includes(e.key) ? "vertical" : "horizontal";
      const basis = direction === "horizontal" ? anchor : e.shiftKey ? rangeEnd : anchor;
      const updater = direction === "horizontal" ? setSingleRange : e.shiftKey ? setRangeEnd : setSingleRange;
      if (!basis) {
        return;
      }
      const { row, col } = basis;
      const handleNavigation = (coords) => {
        e.preventDefault();
        e.stopPropagation();
        scrollToCoordinates(coords, direction);
        updater(coords);
      };
      const next = matrix.getValidMovement(
        row,
        col,
        e.key,
        e.metaKey || e.ctrlKey
      );
      handleNavigation(next);
    },
    [
      isEditing,
      anchor,
      rangeEnd,
      scrollToCoordinates,
      setSingleRange,
      setRangeEnd,
      matrix
    ]
  );
  const handleTabKey = useCallback9(
    (e) => {
      if (!anchor) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const { row, col } = anchor;
      const key = e.shiftKey ? "ArrowLeft" : "ArrowRight";
      const direction = "horizontal";
      const next = matrix.getValidMovement(
        row,
        col,
        key,
        e.metaKey || e.ctrlKey
      );
      scrollToCoordinates(next, direction);
      setSingleRange(next);
    },
    [anchor, scrollToCoordinates, setSingleRange, matrix]
  );
  const handleUndo = useCallback9(
    (e) => {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
        return;
      }
      undo();
    },
    [redo, undo]
  );
  const handleSpaceKeyBoolean = useCallback9(
    (anchor2) => {
      const end = rangeEnd ?? anchor2;
      const fields = matrix.getFieldsInSelection(anchor2, end);
      const prev = getSelectionValues(fields);
      const allChecked = prev.every((value) => value === true);
      const next = Array.from({ length: prev.length }, () => !allChecked);
      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues
      });
      execute(command);
    },
    [rangeEnd, matrix, getSelectionValues, setSelectionValues, execute]
  );
  const handleSpaceKeyTextOrNumber = useCallback9(
    (anchor2) => {
      const field = matrix.getCellField(anchor2);
      const input = queryTool?.getInput(anchor2);
      if (!field || !input) {
        return;
      }
      createSnapshot(anchor2);
      const current = getValues(field);
      const next = "";
      const command = new DataGridUpdateCommand({
        next,
        prev: current,
        setter: (value) => {
          setValue2(field, value, {
            shouldDirty: true,
            shouldTouch: true
          });
        }
      });
      execute(command);
      input.focus();
    },
    [matrix, queryTool, getValues, execute, setValue2, createSnapshot]
  );
  const handleSpaceKeyTogglableNumber = useCallback9(
    (anchor2) => {
      const field = matrix.getCellField(anchor2);
      const input = queryTool?.getInput(anchor2);
      if (!field || !input) {
        return;
      }
      createSnapshot(anchor2);
      const current = getValues(field);
      let checked = current.checked;
      if (!current.disabledToggle) {
        checked = false;
      }
      const next = { ...current, quantity: "", checked };
      const command = new DataGridUpdateCommand({
        next,
        prev: current,
        setter: (value) => {
          setValue2(field, value, {
            shouldDirty: true,
            shouldTouch: true
          });
        }
      });
      execute(command);
      input.focus();
    },
    [matrix, queryTool, getValues, execute, setValue2, createSnapshot]
  );
  const handleSpaceKey = useCallback9(
    (e) => {
      if (!anchor || isEditing) {
        return;
      }
      e.preventDefault();
      const type = matrix.getCellType(anchor);
      if (!type) {
        return;
      }
      switch (type) {
        case "boolean":
          handleSpaceKeyBoolean(anchor);
          break;
        case "togglable-number":
          handleSpaceKeyTogglableNumber(anchor);
          break;
        case "number":
        case "text":
          handleSpaceKeyTextOrNumber(anchor);
          break;
      }
    },
    [
      anchor,
      isEditing,
      matrix,
      handleSpaceKeyBoolean,
      handleSpaceKeyTextOrNumber,
      handleSpaceKeyTogglableNumber
    ]
  );
  const handleMoveOnEnter = useCallback9(
    (e, anchor2) => {
      const direction = e.shiftKey ? "ArrowUp" : "ArrowDown";
      const pos = matrix.getValidMovement(
        anchor2.row,
        anchor2.col,
        direction,
        false
      );
      if (anchor2.row !== pos.row || anchor2.col !== pos.col) {
        setSingleRange(pos);
        scrollToCoordinates(pos, "vertical");
      } else {
        const container = queryTool?.getContainer(anchor2);
        container?.focus();
      }
      onEditingChangeHandler(false);
    },
    [
      queryTool,
      matrix,
      scrollToCoordinates,
      setSingleRange,
      onEditingChangeHandler
    ]
  );
  const handleEditOnEnter = useCallback9(
    (anchor2) => {
      const input = queryTool?.getInput(anchor2);
      if (!input) {
        return;
      }
      input.focus();
      onEditingChangeHandler(true);
    },
    [queryTool, onEditingChangeHandler]
  );
  const handleEnterKeyTextOrNumber = useCallback9(
    (e, anchor2) => {
      if (isEditing) {
        handleMoveOnEnter(e, anchor2);
        return;
      }
      handleEditOnEnter(anchor2);
    },
    [handleMoveOnEnter, handleEditOnEnter, isEditing]
  );
  const handleEnterKeyBoolean = useCallback9(
    (e, anchor2) => {
      const field = matrix.getCellField(anchor2);
      if (!field) {
        return;
      }
      const current = getValues(field);
      let next;
      if (typeof current === "boolean") {
        next = !current;
      } else {
        next = true;
      }
      const command = new DataGridUpdateCommand({
        next,
        prev: current,
        setter: (value) => {
          setValue2(field, value, {
            shouldDirty: true,
            shouldTouch: true
          });
        }
      });
      execute(command);
      handleMoveOnEnter(e, anchor2);
    },
    [execute, getValues, handleMoveOnEnter, matrix, setValue2]
  );
  const handleEnterKey = useCallback9(
    (e) => {
      if (!anchor) {
        return;
      }
      e.preventDefault();
      const type = matrix.getCellType(anchor);
      switch (type) {
        case "togglable-number":
        case "text":
        case "number":
          handleEnterKeyTextOrNumber(e, anchor);
          break;
        case "boolean": {
          handleEnterKeyBoolean(e, anchor);
          break;
        }
      }
    },
    [anchor, matrix, handleEnterKeyTextOrNumber, handleEnterKeyBoolean]
  );
  const handleDeleteKeyTogglableNumber = useCallback9(
    (anchor2, rangeEnd2) => {
      const fields = matrix.getFieldsInSelection(anchor2, rangeEnd2);
      const prev = getSelectionValues(fields);
      const next = prev.map((value) => ({
        ...value,
        quantity: "",
        checked: value.disableToggle ? value.checked : false
      }));
      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues
      });
      execute(command);
    },
    [matrix, getSelectionValues, setSelectionValues, execute]
  );
  const handleDeleteKeyTextOrNumber = useCallback9(
    (anchor2, rangeEnd2) => {
      const fields = matrix.getFieldsInSelection(anchor2, rangeEnd2);
      const prev = getSelectionValues(fields);
      const next = Array.from({ length: prev.length }, () => "");
      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues
      });
      execute(command);
    },
    [matrix, getSelectionValues, setSelectionValues, execute]
  );
  const handleDeleteKeyBoolean = useCallback9(
    (anchor2, rangeEnd2) => {
      const fields = matrix.getFieldsInSelection(anchor2, rangeEnd2);
      const prev = getSelectionValues(fields);
      const next = Array.from({ length: prev.length }, () => false);
      const command = new DataGridBulkUpdateCommand({
        fields,
        next,
        prev,
        setter: setSelectionValues
      });
      execute(command);
    },
    [execute, getSelectionValues, matrix, setSelectionValues]
  );
  const handleDeleteKey = useCallback9(
    (e) => {
      if (!anchor || !rangeEnd || isEditing) {
        return;
      }
      e.preventDefault();
      const type = matrix.getCellType(anchor);
      if (!type) {
        return;
      }
      switch (type) {
        case "text":
        case "number":
          handleDeleteKeyTextOrNumber(anchor, rangeEnd);
          break;
        case "boolean":
          handleDeleteKeyBoolean(anchor, rangeEnd);
          break;
        case "togglable-number":
          handleDeleteKeyTogglableNumber(anchor, rangeEnd);
          break;
      }
    },
    [
      anchor,
      rangeEnd,
      isEditing,
      matrix,
      handleDeleteKeyTextOrNumber,
      handleDeleteKeyBoolean,
      handleDeleteKeyTogglableNumber
    ]
  );
  const handleEscapeKey = useCallback9(
    (e) => {
      if (!anchor || !isEditing) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      restoreSnapshot();
      const container = queryTool?.getContainer(anchor);
      container?.focus();
    },
    [queryTool, isEditing, anchor, restoreSnapshot]
  );
  const handleSpecialFocusKeys = useCallback9(
    (e) => {
      if (!containerRef || isEditing) {
        return;
      }
      const focusableElements = getFocusableElements(containerRef);
      const focusElement = (element) => {
        if (element) {
          setTrapActive(false);
          element.focus();
        }
      };
      switch (e.key) {
        case ".":
          focusElement(focusableElements.cancel);
          break;
        case ",":
          focusElement(focusableElements.shortcuts);
          break;
        default:
          break;
      }
    },
    [isEditing, setTrapActive, containerRef]
  );
  const handleKeyDownEvent = useCallback9(
    (e) => {
      if (ARROW_KEYS.includes(e.key)) {
        handleKeyboardNavigation(e);
        return;
      }
      if (e.key === "z" && (e.metaKey || e.ctrlKey)) {
        handleUndo(e);
        return;
      }
      if (e.key === " ") {
        handleSpaceKey(e);
        return;
      }
      if (e.key === "Delete" || e.key === "Backspace") {
        handleDeleteKey(e);
        return;
      }
      if (e.key === "Enter") {
        handleEnterKey(e);
        return;
      }
      if (e.key === "Escape") {
        handleEscapeKey(e);
        return;
      }
      if (e.key === "Tab") {
        handleTabKey(e);
        return;
      }
    },
    [
      handleEscapeKey,
      handleKeyboardNavigation,
      handleUndo,
      handleSpaceKey,
      handleEnterKey,
      handleDeleteKey,
      handleTabKey
    ]
  );
  return {
    handleKeyDownEvent,
    handleSpecialFocusKeys
  };
};
function getFocusableElements(ref) {
  const focusableElements = Array.from(
    document.querySelectorAll(
      "[tabindex], a, button, input, select, textarea"
    )
  );
  const currentElementIndex = focusableElements.indexOf(ref.current);
  const shortcuts = currentElementIndex > 0 ? focusableElements[currentElementIndex - 1] : null;
  let cancel = null;
  for (let i = currentElementIndex + 1; i < focusableElements.length; i++) {
    if (!ref.current.contains(focusableElements[i])) {
      cancel = focusableElements[i];
      break;
    }
  }
  return { shortcuts, cancel };
}

// src/components/data-grid/hooks/use-data-grid-mouse-up-event.tsx
import { useCallback as useCallback10 } from "react";
var useDataGridMouseUpEvent = ({
  matrix,
  anchor,
  dragEnd,
  setDragEnd,
  isDragging,
  setIsDragging,
  setRangeEnd,
  setIsSelecting,
  getSelectionValues,
  setSelectionValues,
  execute
}) => {
  const handleDragEnd = useCallback10(() => {
    if (!isDragging) {
      return;
    }
    if (!anchor || !dragEnd) {
      return;
    }
    const dragSelection = matrix.getFieldsInSelection(anchor, dragEnd);
    const anchorField = matrix.getCellField(anchor);
    if (!anchorField || !dragSelection.length) {
      return;
    }
    const anchorValue = getSelectionValues([anchorField]);
    const fields = dragSelection.filter((field) => field !== anchorField);
    const prev = getSelectionValues(fields);
    const next = Array.from({ length: prev.length }, () => anchorValue[0]);
    const command = new DataGridBulkUpdateCommand({
      fields,
      prev,
      next,
      setter: setSelectionValues
    });
    execute(command);
    setIsDragging(false);
    setDragEnd(null);
    setRangeEnd(dragEnd);
  }, [
    isDragging,
    anchor,
    dragEnd,
    matrix,
    getSelectionValues,
    setSelectionValues,
    execute,
    setIsDragging,
    setDragEnd,
    setRangeEnd
  ]);
  const handleMouseUpEvent = useCallback10(() => {
    handleDragEnd();
    setIsSelecting(false);
  }, [handleDragEnd, setIsSelecting]);
  return {
    handleMouseUpEvent
  };
};

// src/components/data-grid/hooks/use-data-grid-navigation.tsx
import { useCallback as useCallback11 } from "react";
var useDataGridNavigation = ({
  matrix,
  anchor,
  visibleColumns,
  visibleRows,
  columnVirtualizer,
  rowVirtualizer,
  setColumnVisibility,
  flatColumns,
  queryTool,
  setSingleRange
}) => {
  const scrollToCoordinates = useCallback11(
    (coords, direction) => {
      if (!anchor) {
        return;
      }
      const { row, col } = coords;
      const { row: anchorRow, col: anchorCol } = anchor;
      const rowDirection = row >= anchorRow ? "down" : "up";
      const colDirection = col >= anchorCol ? "right" : "left";
      let toRow = rowDirection === "down" ? row + 1 : row - 1;
      if (visibleRows[toRow] === void 0) {
        toRow = row;
      }
      let toCol = colDirection === "right" ? col + 1 : col - 1;
      if (visibleColumns[toCol] === void 0) {
        toCol = col;
      }
      const scrollOptions = { align: "auto", behavior: "auto" };
      if (direction === "horizontal" || direction === "both") {
        columnVirtualizer.scrollToIndex(toCol, scrollOptions);
      }
      if (direction === "vertical" || direction === "both") {
        rowVirtualizer.scrollToIndex(toRow, scrollOptions);
      }
    },
    [anchor, columnVirtualizer, visibleRows, rowVirtualizer, visibleColumns]
  );
  const navigateToField = useCallback11(
    (field) => {
      const coords = matrix.getCoordinatesByField(field);
      if (!coords) {
        return;
      }
      const column = flatColumns[coords.col];
      setColumnVisibility((prev) => {
        return {
          ...prev,
          [column.id]: true
        };
      });
      requestAnimationFrame(() => {
        scrollToCoordinates(coords, "both");
        setSingleRange(coords);
      });
      requestAnimationFrame(() => {
        const input = queryTool?.getInput(coords);
        if (input) {
          input.focus();
        }
      });
    },
    [
      matrix,
      flatColumns,
      setColumnVisibility,
      scrollToCoordinates,
      setSingleRange,
      queryTool
    ]
  );
  return {
    scrollToCoordinates,
    navigateToField
  };
};

// src/components/data-grid/hooks/use-data-grid-query-tool.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";
var useDataGridQueryTool = (containerRef) => {
  const queryToolRef = useRef2(null);
  useEffect2(() => {
    if (containerRef.current) {
      queryToolRef.current = new DataGridQueryTool(containerRef.current);
    }
  }, [containerRef]);
  return queryToolRef.current;
};

// src/components/data-grid/components/data-grid-cell-container.tsx
import { ErrorMessage } from "@hookform/error-message";
import { ExclamationCircle } from "@medusajs/icons";
import { Tooltip as Tooltip2, clx } from "@medusajs/ui";
import { get as get3 } from "react-hook-form";

// src/components/data-grid/components/data-grid-row-error-indicator.tsx
import { Badge, Tooltip } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DataGridRowErrorIndicator = ({
  rowErrors
}) => {
  const rowErrorCount = rowErrors ? rowErrors.length : 0;
  if (!rowErrors || rowErrorCount <= 0) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    Tooltip,
    {
      content: /* @__PURE__ */ jsx2("ul", { className: "flex flex-col gap-y-3", children: rowErrors.map((error, index) => /* @__PURE__ */ jsx2(DataGridRowErrorLine, { error }, index)) }),
      delayDuration: 0,
      children: /* @__PURE__ */ jsx2(Badge, { color: "red", size: "2xsmall", className: "cursor-default", children: rowErrorCount })
    }
  );
};
var DataGridRowErrorLine = ({
  error
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs2("li", { className: "txt-compact-small flex flex-col items-start", children: [
    error.message,
    /* @__PURE__ */ jsx2(
      "button",
      {
        type: "button",
        onClick: error.to,
        className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-fg",
        children: t("dataGrid.errors.fixError")
      }
    )
  ] });
};

// src/components/data-grid/components/data-grid-cell-container.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DataGridCellContainer = ({
  isAnchor,
  isSelected,
  isDragSelected,
  field,
  showOverlay,
  placeholder,
  innerProps,
  overlayProps,
  children,
  errors,
  rowErrors,
  outerComponent
}) => {
  const error = get3(errors, field);
  const hasError = !!error;
  return /* @__PURE__ */ jsxs3("div", { className: "group/container relative size-full", children: [
    /* @__PURE__ */ jsxs3(
      "div",
      {
        className: clx(
          "bg-ui-bg-base group/cell relative flex size-full items-center gap-x-2 px-4 py-2.5 outline-none",
          {
            "bg-ui-tag-red-bg text-ui-tag-red-text": hasError && !isAnchor && !isSelected && !isDragSelected,
            "ring-ui-bg-interactive ring-2 ring-inset": isAnchor,
            "bg-ui-bg-highlight [&:has([data-field]:focus)]:bg-ui-bg-base": isSelected || isAnchor,
            "bg-ui-bg-subtle": isDragSelected && !isAnchor
          }
        ),
        tabIndex: -1,
        ...innerProps,
        children: [
          /* @__PURE__ */ jsx3(
            ErrorMessage,
            {
              name: field,
              errors,
              render: ({ message }) => {
                return /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx3(Tooltip2, { content: message, delayDuration: 0, children: /* @__PURE__ */ jsx3(ExclamationCircle, { className: "text-ui-tag-red-icon z-[3]" }) }) });
              }
            }
          ),
          /* @__PURE__ */ jsx3("div", { className: "relative z-[1] flex size-full items-center justify-center", children: /* @__PURE__ */ jsx3(RenderChildren, { isAnchor, placeholder, children }) }),
          /* @__PURE__ */ jsx3(DataGridRowErrorIndicator, { rowErrors }),
          showOverlay && /* @__PURE__ */ jsx3(
            "div",
            {
              ...overlayProps,
              "data-cell-overlay": "true",
              className: "absolute inset-0 z-[2]"
            }
          )
        ]
      }
    ),
    outerComponent
  ] });
};
var RenderChildren = ({
  isAnchor,
  placeholder,
  children
}) => {
  if (!isAnchor && placeholder) {
    return placeholder;
  }
  return children;
};

// src/components/data-grid/components/data-grid-boolean-cell.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var DataGridBooleanCell = ({
  context,
  disabled
}) => {
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  return /* @__PURE__ */ jsx4(
    Controller,
    {
      control,
      name: field,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsx4(DataGridCellContainer, { ...container, ...errorProps, children: /* @__PURE__ */ jsx4(Inner, { field: field2, inputProps: input, disabled }) });
      }
    }
  );
};
var Inner = ({
  field,
  inputProps,
  disabled
}) => {
  const { ref, value, onBlur, name, disabled: fieldDisabled } = field;
  const {
    ref: inputRef,
    onBlur: onInputBlur,
    onChange,
    onFocus,
    ...attributes
  } = inputProps;
  const combinedRefs = useCombinedRefs(ref, inputRef);
  return /* @__PURE__ */ jsx4(
    Checkbox,
    {
      disabled: disabled || fieldDisabled,
      name,
      checked: value,
      onCheckedChange: (newValue) => onChange(newValue === true, value),
      onFocus,
      onBlur: () => {
        onBlur();
        onInputBlur();
      },
      ref: combinedRefs,
      tabIndex: -1,
      ...attributes
    }
  );
};

// src/components/data-grid/components/data-grid-currency-cell.tsx
import CurrencyInput, {
  formatValue
} from "react-currency-input-field";
import { Controller as Controller2 } from "react-hook-form";
import { useCallback as useCallback12, useEffect as useEffect3, useState as useState4 } from "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var DataGridCurrencyCell = ({
  context,
  code
}) => {
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  const currency = currencies[code.toUpperCase()];
  return /* @__PURE__ */ jsx5(
    Controller2,
    {
      control,
      name: field,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsx5(DataGridCellContainer, { ...container, ...errorProps, children: /* @__PURE__ */ jsx5(Inner2, { field: field2, inputProps: input, currencyInfo: currency }) });
      }
    }
  );
};
var Inner2 = ({
  field,
  inputProps,
  currencyInfo
}) => {
  const { value, onChange: _, onBlur, ref, ...rest } = field;
  const {
    ref: inputRef,
    onBlur: onInputBlur,
    onFocus,
    onChange,
    ...attributes
  } = inputProps;
  const formatter = useCallback12(
    (value2) => {
      const ensuredValue = typeof value2 === "number" ? value2.toString() : value2 || "";
      return formatValue({
        value: ensuredValue,
        decimalScale: currencyInfo.decimal_digits,
        disableGroupSeparators: true,
        decimalSeparator: "."
      });
    },
    [currencyInfo]
  );
  const [localValue, setLocalValue] = useState4(value || "");
  const handleValueChange = (value2, _name, _values) => {
    if (!value2) {
      setLocalValue("");
      return;
    }
    setLocalValue(value2);
  };
  useEffect3(() => {
    let update = value;
    if (!isNaN(Number(value))) {
      update = formatter(update);
    }
    setLocalValue(update);
  }, [value, formatter]);
  const combinedRed = useCombinedRefs(inputRef, ref);
  return /* @__PURE__ */ jsxs4("div", { className: "relative flex size-full items-center", children: [
    /* @__PURE__ */ jsx5(
      "span",
      {
        className: "txt-compact-small text-ui-fg-muted pointer-events-none absolute left-0 w-fit min-w-4",
        "aria-hidden": true,
        children: currencyInfo.symbol_native
      }
    ),
    /* @__PURE__ */ jsx5(
      CurrencyInput,
      {
        ...rest,
        ...attributes,
        ref: combinedRed,
        className: "txt-compact-small w-full flex-1 cursor-default appearance-none bg-transparent pl-8 text-right outline-none",
        value: localValue || void 0,
        onValueChange: handleValueChange,
        formatValueOnBlur: true,
        onBlur: () => {
          onBlur();
          onInputBlur();
          onChange(localValue, value);
        },
        onFocus,
        decimalScale: currencyInfo.decimal_digits,
        decimalsLimit: currencyInfo.decimal_digits,
        autoComplete: "off",
        tabIndex: -1
      }
    )
  ] });
};

// src/components/data-grid/components/data-grid-number-cell.tsx
import { clx as clx2 } from "@medusajs/ui";
import { useEffect as useEffect4, useState as useState5 } from "react";
import { Controller as Controller3 } from "react-hook-form";
import { jsx as jsx6 } from "react/jsx-runtime";
var DataGridNumberCell = ({
  context,
  ...rest
}) => {
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  return /* @__PURE__ */ jsx6(
    Controller3,
    {
      control,
      name: field,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsx6(DataGridCellContainer, { ...container, ...errorProps, children: /* @__PURE__ */ jsx6(Inner3, { field: field2, inputProps: input, ...rest }) });
      }
    }
  );
};
var Inner3 = ({
  field,
  inputProps,
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
  const [localValue, setLocalValue] = useState5(value);
  useEffect4(() => {
    setLocalValue(value);
  }, [value]);
  const combinedRefs = useCombinedRefs(inputRef, ref);
  return /* @__PURE__ */ jsx6("div", { className: "size-full", children: /* @__PURE__ */ jsx6(
    "input",
    {
      ref: combinedRefs,
      value: localValue,
      onChange: (e) => setLocalValue(e.target.value),
      onBlur: () => {
        onBlur();
        onInputBlur();
        onChange(localValue, value);
      },
      onFocus,
      type: "number",
      inputMode: "decimal",
      className: clx2(
        "txt-compact-small size-full bg-transparent outline-none",
        "placeholder:text-ui-fg-muted"
      ),
      tabIndex: -1,
      ...props,
      ...fieldProps,
      ...attributes
    }
  ) });
};

// src/components/data-grid/components/data-grid-readonly-cell.tsx
import { clx as clx3 } from "@medusajs/ui";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var DataGridReadonlyCell = ({
  context,
  color = "muted",
  children
}) => {
  const { rowErrors } = useDataGridCellError({ context });
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      className: clx3(
        "txt-compact-small text-ui-fg-subtle flex size-full cursor-not-allowed items-center justify-between overflow-hidden px-4 py-2.5 outline-none",
        color === "muted" && "bg-ui-bg-subtle",
        color === "normal" && "bg-ui-bg-base"
      ),
      children: [
        /* @__PURE__ */ jsx7("div", { className: "flex-1 truncate", children }),
        /* @__PURE__ */ jsx7(DataGridRowErrorIndicator, { rowErrors })
      ]
    }
  );
};

// src/components/data-grid/components/data-grid-root.tsx
import {
  Adjustments,
  AdjustmentsDone,
  ExclamationCircle as ExclamationCircle2
} from "@medusajs/icons";
import { Button as Button2, DropdownMenu, clx as clx5 } from "@medusajs/ui";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useCallback as useCallback14,
  useEffect as useEffect5,
  useMemo as useMemo5,
  useRef as useRef3,
  useState as useState8
} from "react";
import { useTranslation as useTranslation3 } from "react-i18next";

// src/hooks/use-command-history.tsx
import { useCallback as useCallback13, useState as useState6 } from "react";
var useCommandHistory = (maxHistory = 20) => {
  const [past, setPast] = useState6([]);
  const [future, setFuture] = useState6([]);
  const canUndo = past.length > 0;
  const canRedo = future.length > 0;
  const undo = useCallback13(() => {
    if (!canUndo) {
      return;
    }
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    previous.undo();
    setPast(newPast);
    setFuture([previous, ...future.slice(0, maxHistory - 1)]);
  }, [canUndo, future, past, maxHistory]);
  const redo = useCallback13(() => {
    if (!canRedo) {
      return;
    }
    const next = future[0];
    const newFuture = future.slice(1);
    next.redo();
    setPast([...past, next].slice(0, maxHistory - 1));
    setFuture(newFuture);
  }, [canRedo, future, past, maxHistory]);
  const execute = useCallback13(
    (command) => {
      command.execute();
      setPast((past2) => [...past2, command].slice(0, maxHistory - 1));
      setFuture([]);
    },
    [maxHistory]
  );
  return {
    undo,
    redo,
    execute,
    canUndo,
    canRedo
  };
};

// src/components/data-grid/components/data-grid-keyboard-shortcut-modal.tsx
import { XMark } from "@medusajs/icons";
import {
  Button,
  clx as clx4,
  Heading,
  IconButton,
  Input,
  Kbd,
  Text
} from "@medusajs/ui";
import { Dialog as RadixDialog } from "radix-ui";
import { useMemo as useMemo4, useState as useState7 } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var useDataGridShortcuts = () => {
  const { t } = useTranslation2();
  const shortcuts = useMemo4(
    () => [
      {
        label: t("dataGrid.shortcuts.commands.undo"),
        keys: {
          Mac: ["\u2318", "Z"],
          Windows: ["Ctrl", "Z"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.redo"),
        keys: {
          Mac: ["\u21E7", "\u2318", "Z"],
          Windows: ["Shift", "Ctrl", "Z"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.copy"),
        keys: {
          Mac: ["\u2318", "C"],
          Windows: ["Ctrl", "C"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.paste"),
        keys: {
          Mac: ["\u2318", "V"],
          Windows: ["Ctrl", "V"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.edit"),
        keys: {
          Mac: ["\u21B5"],
          Windows: ["Enter"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.delete"),
        keys: {
          Mac: ["\u232B"],
          Windows: ["Backspace"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.clear"),
        keys: {
          Mac: ["Space"],
          Windows: ["Space"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveUp"),
        keys: {
          Mac: ["\u2191"],
          Windows: ["\u2191"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveDown"),
        keys: {
          Mac: ["\u2193"],
          Windows: ["\u2193"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveLeft"),
        keys: {
          Mac: ["\u2190"],
          Windows: ["\u2190"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveRight"),
        keys: {
          Mac: ["\u2192"],
          Windows: ["\u2192"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveTop"),
        keys: {
          Mac: ["\u2318", "\u2191"],
          Windows: ["Ctrl", "\u2191"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.moveBottom"),
        keys: {
          Mac: ["\u2318", "\u2193"],
          Windows: ["Ctrl", "\u2193"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.selectDown"),
        keys: {
          Mac: ["\u21E7", "\u2193"],
          Windows: ["Shift", "\u2193"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.selectUp"),
        keys: {
          Mac: ["\u21E7", "\u2191"],
          Windows: ["Shift", "\u2191"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.selectColumnDown"),
        keys: {
          Mac: ["\u21E7", "\u2318", "\u2193"],
          Windows: ["Shift", "Ctrl", "\u2193"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.selectColumnUp"),
        keys: {
          Mac: ["\u21E7", "\u2318", "\u2191"],
          Windows: ["Shift", "Ctrl", "\u2191"]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.focusToolbar"),
        keys: {
          Mac: ["\u2303", "\u2325", ","],
          Windows: ["Ctrl", "Alt", ","]
        }
      },
      {
        label: t("dataGrid.shortcuts.commands.focusCancel"),
        keys: {
          Mac: ["\u2303", "\u2325", "."],
          Windows: ["Ctrl", "Alt", "."]
        }
      }
    ],
    [t]
  );
  return shortcuts;
};
var DataGridKeyboardShortcutModal = ({
  open,
  onOpenChange
}) => {
  const { t } = useTranslation2();
  const [searchValue, onSearchValueChange] = useState7("");
  const shortcuts = useDataGridShortcuts();
  const searchResults = useMemo4(() => {
    return shortcuts.filter(
      (shortcut) => shortcut.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, shortcuts]);
  return /* @__PURE__ */ jsxs6(RadixDialog.Root, { open, onOpenChange, children: [
    /* @__PURE__ */ jsx8(RadixDialog.Trigger, { asChild: true, children: /* @__PURE__ */ jsx8(Button, { size: "small", variant: "secondary", children: t("dataGrid.shortcuts.label") }) }),
    /* @__PURE__ */ jsxs6(RadixDialog.Portal, { children: [
      /* @__PURE__ */ jsx8(
        RadixDialog.Overlay,
        {
          className: clx4(
            "bg-ui-bg-overlay fixed inset-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )
        }
      ),
      /* @__PURE__ */ jsxs6(RadixDialog.Content, { className: "bg-ui-bg-subtle shadow-elevation-modal fixed left-[50%] top-[50%] flex h-full max-h-[612px] w-full max-w-[560px] translate-x-[-50%] translate-y-[-50%] flex-col divide-y overflow-hidden rounded-lg outline-none", children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-col gap-y-3 px-6 py-4", children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx8(RadixDialog.Title, { asChild: true, children: /* @__PURE__ */ jsx8(Heading, { children: t("app.menus.user.shortcuts") }) }),
              /* @__PURE__ */ jsx8(RadixDialog.Description, { className: "sr-only" })
            ] }),
            /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-x-2", children: [
              /* @__PURE__ */ jsx8(Kbd, { children: "esc" }),
              /* @__PURE__ */ jsx8(RadixDialog.Close, { asChild: true, children: /* @__PURE__ */ jsx8(IconButton, { variant: "transparent", size: "small", children: /* @__PURE__ */ jsx8(XMark, {}) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx8("div", { children: /* @__PURE__ */ jsx8(
            Input,
            {
              type: "search",
              value: searchValue,
              autoFocus: true,
              onChange: (e) => onSearchValueChange(e.target.value)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx8("div", { className: "flex flex-col divide-y overflow-y-auto", children: searchResults.map((shortcut, index) => {
          return /* @__PURE__ */ jsxs6(
            "div",
            {
              className: "text-ui-fg-subtle flex items-center justify-between px-6 py-3",
              children: [
                /* @__PURE__ */ jsx8(Text, { size: "small", children: shortcut.label }),
                /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-x-1", children: shortcut.keys.Mac?.map((key, index2) => {
                  return /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-x-1", children: /* @__PURE__ */ jsx8(Kbd, { children: key }) }, index2);
                }) })
              ]
            },
            index
          );
        }) })
      ] })
    ] })
  ] });
};

// src/components/data-grid/components/data-grid-root.tsx
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var ROW_HEIGHT = 40;
var getCommonPinningStyles = (column) => {
  const isPinned = column.getIsPinned();
  const isDarkMode = document.documentElement.classList.contains("dark");
  const BORDER_COLOR = isDarkMode ? "rgb(50,50,53)" : "rgb(228,228,231)";
  return {
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    borderBottom: isPinned ? `1px solid ${BORDER_COLOR}` : void 0,
    borderRight: isPinned ? `1px solid ${BORDER_COLOR}` : void 0,
    left: isPinned === "left" ? `${column.getStart("left")}px` : void 0,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : void 0
  };
};
var DataGridRoot = ({
  data = [],
  columns,
  state,
  getSubRows,
  onEditingChange,
  disableInteractions,
  multiColumnSelection = false
}) => {
  const containerRef = useRef3(null);
  const { redo, undo, execute } = useCommandHistory();
  const {
    register,
    control,
    getValues,
    setValue: setValue2,
    formState: { errors }
  } = state;
  const [internalTrapActive, setTrapActive] = useState8(true);
  const trapActive = !disableInteractions && internalTrapActive;
  const [anchor, setAnchor] = useState8(null);
  const [rangeEnd, setRangeEnd] = useState8(null);
  const [dragEnd, setDragEnd] = useState8(null);
  const [isSelecting, setIsSelecting] = useState8(false);
  const [isDragging, setIsDragging] = useState8(false);
  const [isEditing, setIsEditing] = useState8(false);
  const [columnVisibility, setColumnVisibility] = useState8({});
  const [rowVisibility, setRowVisibility] = useState8({});
  const grid = useReactTable({
    data,
    columns,
    initialState: {
      columnPinning: {
        left: [columns[0].id]
      }
    },
    state: {
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    getSubRows,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200,
      maxSize: 400
    }
  });
  const { flatRows } = grid.getRowModel();
  const flatColumns = grid.getAllFlatColumns();
  const visibleRows = useMemo5(
    () => flatRows.filter((_, index) => rowVisibility?.[index] !== false),
    [flatRows, rowVisibility]
  );
  const visibleColumns = grid.getVisibleLeafColumns();
  const rowVirtualizer = useVirtualizer({
    count: visibleRows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => containerRef.current,
    overscan: 5,
    rangeExtractor: (range) => {
      const toRender = new Set(
        Array.from(
          { length: range.endIndex - range.startIndex + 1 },
          (_, i) => range.startIndex + i
        )
      );
      if (anchor && visibleRows[anchor.row]) {
        toRender.add(anchor.row);
      }
      if (rangeEnd && visibleRows[rangeEnd.row]) {
        toRender.add(rangeEnd.row);
      }
      return Array.from(toRender).sort((a, b) => a - b);
    }
  });
  const virtualRows = rowVirtualizer.getVirtualItems();
  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => containerRef.current,
    horizontal: true,
    overscan: 3,
    rangeExtractor: (range) => {
      const startIndex = range.startIndex;
      const endIndex = range.endIndex;
      const toRender = new Set(
        Array.from(
          { length: endIndex - startIndex + 1 },
          (_, i) => startIndex + i
        )
      );
      if (anchor && visibleColumns[anchor.col]) {
        toRender.add(anchor.col);
      }
      if (rangeEnd && visibleColumns[rangeEnd.col]) {
        toRender.add(rangeEnd.col);
      }
      toRender.add(0);
      return Array.from(toRender).sort((a, b) => a - b);
    }
  });
  const virtualColumns = columnVirtualizer.getVirtualItems();
  let virtualPaddingLeft;
  let virtualPaddingRight;
  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0;
    virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }
  const matrix = useMemo5(
    () => new DataGridMatrix(
      flatRows,
      columns,
      multiColumnSelection
    ),
    [flatRows, columns, multiColumnSelection]
  );
  const queryTool = useDataGridQueryTool(containerRef);
  const setSingleRange = useCallback14(
    (coordinates) => {
      setAnchor(coordinates);
      setRangeEnd(coordinates);
    },
    []
  );
  const { errorCount, isHighlighted, toggleErrorHighlighting } = useDataGridErrorHighlighting(matrix, grid, errors);
  const handleToggleErrorHighlighting = useCallback14(() => {
    toggleErrorHighlighting(
      rowVisibility,
      columnVisibility,
      setRowVisibility,
      setColumnVisibility
    );
  }, [toggleErrorHighlighting, rowVisibility, columnVisibility]);
  const {
    columnOptions,
    handleToggleColumn,
    handleResetColumns,
    isDisabled: isColumsDisabled
  } = useDataGridColumnVisibility(grid, matrix);
  const handleToggleColumnVisibility = useCallback14(
    (index) => {
      return handleToggleColumn(index);
    },
    [handleToggleColumn]
  );
  const { navigateToField, scrollToCoordinates } = useDataGridNavigation({
    matrix,
    queryTool,
    anchor,
    columnVirtualizer,
    rowVirtualizer,
    flatColumns,
    setColumnVisibility,
    setSingleRange,
    visibleColumns,
    visibleRows
  });
  const { createSnapshot, restoreSnapshot } = useDataGridCellSnapshot({
    matrix,
    form: state
  });
  const onEditingChangeHandler = useCallback14(
    (value) => {
      if (onEditingChange) {
        onEditingChange(value);
      }
      if (value) {
        createSnapshot(anchor);
      }
      setIsEditing(value);
    },
    [anchor, createSnapshot, onEditingChange]
  );
  const { getSelectionValues, setSelectionValues } = useDataGridFormHandlers({
    matrix,
    form: state,
    anchor
  });
  const { handleKeyDownEvent, handleSpecialFocusKeys } = useDataGridKeydownEvent({
    containerRef,
    matrix,
    queryTool,
    anchor,
    rangeEnd,
    isEditing,
    setTrapActive,
    setRangeEnd,
    getSelectionValues,
    getValues,
    setSelectionValues,
    onEditingChangeHandler,
    restoreSnapshot,
    createSnapshot,
    setSingleRange,
    scrollToCoordinates,
    execute,
    undo,
    redo,
    setValue: setValue2
  });
  const { handleMouseUpEvent } = useDataGridMouseUpEvent({
    matrix,
    anchor,
    dragEnd,
    setDragEnd,
    isDragging,
    setIsDragging,
    setRangeEnd,
    setIsSelecting,
    getSelectionValues,
    setSelectionValues,
    execute
  });
  const { handleCopyEvent, handlePasteEvent } = useDataGridClipboardEvents({
    matrix,
    isEditing,
    anchor,
    rangeEnd,
    getSelectionValues,
    setSelectionValues,
    execute
  });
  const {
    getWrapperFocusHandler,
    getInputChangeHandler,
    getOverlayMouseDownHandler,
    getWrapperMouseOverHandler,
    getIsCellDragSelected,
    getIsCellSelected,
    onDragToFillStart
  } = useDataGridCellHandlers({
    matrix,
    anchor,
    rangeEnd,
    setRangeEnd,
    isDragging,
    setIsDragging,
    isSelecting,
    setIsSelecting,
    setSingleRange,
    dragEnd,
    setDragEnd,
    setValue: setValue2,
    execute,
    multiColumnSelection
  });
  const { getCellErrorMetadata, getCellMetadata } = useDataGridCellMetadata({
    matrix
  });
  useEffect5(() => {
    if (!trapActive) {
      return;
    }
    window.addEventListener("keydown", handleKeyDownEvent);
    window.addEventListener("mouseup", handleMouseUpEvent);
    window.addEventListener("copy", handleCopyEvent);
    window.addEventListener("paste", handlePasteEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
      window.removeEventListener("mouseup", handleMouseUpEvent);
      window.removeEventListener("copy", handleCopyEvent);
      window.removeEventListener("paste", handlePasteEvent);
    };
  }, [
    trapActive,
    handleKeyDownEvent,
    handleMouseUpEvent,
    handleCopyEvent,
    handlePasteEvent
  ]);
  useEffect5(() => {
    const specialFocusHandler = (e) => {
      if (isSpecialFocusKey(e)) {
        handleSpecialFocusKeys(e);
        return;
      }
    };
    window.addEventListener("keydown", specialFocusHandler);
    return () => {
      window.removeEventListener("keydown", specialFocusHandler);
    };
  }, [handleSpecialFocusKeys]);
  const handleHeaderInteractionChange = useCallback14((isActive) => {
    if (isActive) {
      setTrapActive(false);
    }
  }, []);
  useEffect5(() => {
    if (!anchor) {
      return;
    }
    if (rangeEnd) {
      return;
    }
    setRangeEnd(anchor);
  }, [anchor, rangeEnd]);
  useEffect5(() => {
    if (!anchor && matrix) {
      const coords = matrix.getFirstNavigableCell();
      if (coords) {
        setSingleRange(coords);
      }
    }
  }, [anchor, matrix, setSingleRange]);
  const values = useMemo5(
    () => ({
      anchor,
      control,
      trapActive,
      errors,
      setTrapActive,
      setIsSelecting,
      setIsEditing: onEditingChangeHandler,
      setSingleRange,
      setRangeEnd,
      getWrapperFocusHandler,
      getInputChangeHandler,
      getOverlayMouseDownHandler,
      getWrapperMouseOverHandler,
      register,
      getIsCellSelected,
      getIsCellDragSelected,
      getCellMetadata,
      getCellErrorMetadata,
      navigateToField
    }),
    [
      anchor,
      control,
      trapActive,
      errors,
      setTrapActive,
      setIsSelecting,
      onEditingChangeHandler,
      setSingleRange,
      setRangeEnd,
      getWrapperFocusHandler,
      getInputChangeHandler,
      getOverlayMouseDownHandler,
      getWrapperMouseOverHandler,
      register,
      getIsCellSelected,
      getIsCellDragSelected,
      getCellMetadata,
      getCellErrorMetadata,
      navigateToField
    ]
  );
  const handleRestoreGridFocus = useCallback14(() => {
    if (anchor && !trapActive) {
      setTrapActive(true);
      setSingleRange(anchor);
      scrollToCoordinates(anchor, "both");
      requestAnimationFrame(() => {
        queryTool?.getContainer(anchor)?.focus();
      });
    }
  }, [anchor, trapActive, setSingleRange, scrollToCoordinates, queryTool]);
  return /* @__PURE__ */ jsx9(DataGridContext.Provider, { value: values, children: /* @__PURE__ */ jsxs7("div", { className: "bg-ui-bg-subtle flex size-full flex-col", children: [
    /* @__PURE__ */ jsx9(
      DataGridHeader,
      {
        columnOptions,
        isDisabled: isColumsDisabled,
        onToggleColumn: handleToggleColumnVisibility,
        errorCount,
        onToggleErrorHighlighting: handleToggleErrorHighlighting,
        onResetColumns: handleResetColumns,
        isHighlighted,
        onHeaderInteractionChange: handleHeaderInteractionChange
      }
    ),
    /* @__PURE__ */ jsx9("div", { className: "size-full overflow-hidden", children: /* @__PURE__ */ jsx9(
      "div",
      {
        ref: containerRef,
        autoFocus: true,
        tabIndex: 0,
        className: "relative h-full select-none overflow-auto outline-none",
        onFocus: handleRestoreGridFocus,
        onClick: handleRestoreGridFocus,
        "data-container": true,
        role: "application",
        children: /* @__PURE__ */ jsxs7("div", { role: "grid", className: "text-ui-fg-subtle grid", children: [
          /* @__PURE__ */ jsx9(
            "div",
            {
              role: "rowgroup",
              className: "txt-compact-small-plus bg-ui-bg-subtle sticky top-0 z-[1] grid",
              children: grid.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxs7(
                "div",
                {
                  role: "row",
                  className: "flex h-10 w-full",
                  children: [
                    virtualPaddingLeft ? /* @__PURE__ */ jsx9(
                      "div",
                      {
                        role: "presentation",
                        style: { display: "flex", width: virtualPaddingLeft }
                      }
                    ) : null,
                    virtualColumns.reduce((acc, vc, index, array) => {
                      const header = headerGroup.headers[vc.index];
                      const previousVC = array[index - 1];
                      if (previousVC && vc.index !== previousVC.index + 1) {
                        acc.push(
                          /* @__PURE__ */ jsx9(
                            "div",
                            {
                              role: "presentation",
                              style: {
                                display: "flex",
                                width: `${vc.start - previousVC.end}px`
                              }
                            },
                            `padding-${previousVC.index}-${vc.index}`
                          )
                        );
                      }
                      acc.push(
                        /* @__PURE__ */ jsx9(
                          "div",
                          {
                            role: "columnheader",
                            "data-column-index": vc.index,
                            style: {
                              width: header.getSize(),
                              ...getCommonPinningStyles(header.column)
                            },
                            className: "bg-ui-bg-base txt-compact-small-plus flex items-center border-b border-r px-4 py-2.5",
                            children: header.isPlaceholder ? null : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          },
                          header.id
                        )
                      );
                      return acc;
                    }, []),
                    virtualPaddingRight ? /* @__PURE__ */ jsx9(
                      "div",
                      {
                        role: "presentation",
                        style: {
                          display: "flex",
                          width: virtualPaddingRight
                        }
                      }
                    ) : null
                  ]
                },
                headerGroup.id
              ))
            }
          ),
          /* @__PURE__ */ jsx9(
            "div",
            {
              role: "rowgroup",
              className: "relative grid",
              style: {
                height: `${rowVirtualizer.getTotalSize()}px`
              },
              children: virtualRows.map((virtualRow) => {
                const row = visibleRows[virtualRow.index];
                const rowIndex = flatRows.findIndex((r) => r.id === row.id);
                return /* @__PURE__ */ jsx9(
                  DataGridRow,
                  {
                    row,
                    rowIndex,
                    virtualRow,
                    flatColumns,
                    virtualColumns,
                    anchor,
                    virtualPaddingLeft,
                    virtualPaddingRight,
                    onDragToFillStart,
                    multiColumnSelection
                  },
                  row.id
                );
              })
            }
          )
        ] })
      }
    ) })
  ] }) });
};
var DataGridHeader = ({
  columnOptions,
  isDisabled,
  onToggleColumn,
  onResetColumns,
  isHighlighted,
  errorCount,
  onToggleErrorHighlighting,
  onHeaderInteractionChange
}) => {
  const [shortcutsOpen, setShortcutsOpen] = useState8(false);
  const [columnsOpen, setColumnsOpen] = useState8(false);
  const { t } = useTranslation3();
  const hasChanged = columnOptions.some((column) => !column.checked);
  const handleShortcutsOpenChange = (value) => {
    onHeaderInteractionChange(value);
    setShortcutsOpen(value);
  };
  const handleColumnsOpenChange = (value) => {
    onHeaderInteractionChange(value);
    setColumnsOpen(value);
  };
  return /* @__PURE__ */ jsxs7("div", { className: "bg-ui-bg-base flex items-center justify-between border-b p-4", children: [
    /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsxs7(DropdownMenu, { open: columnsOpen, onOpenChange: handleColumnsOpenChange, children: [
        /* @__PURE__ */ jsx9(
          ConditionalTooltip,
          {
            showTooltip: isDisabled,
            content: t("dataGrid.columns.disabled"),
            children: /* @__PURE__ */ jsx9(DropdownMenu.Trigger, { asChild: true, disabled: isDisabled, children: /* @__PURE__ */ jsxs7(Button2, { size: "small", variant: "secondary", children: [
              hasChanged ? /* @__PURE__ */ jsx9(AdjustmentsDone, {}) : /* @__PURE__ */ jsx9(Adjustments, {}),
              t("dataGrid.columns.view")
            ] }) })
          }
        ),
        /* @__PURE__ */ jsx9(DropdownMenu.Content, { children: columnOptions.map((column, index) => {
          const { checked, disabled, id, name } = column;
          if (disabled) {
            return null;
          }
          return /* @__PURE__ */ jsx9(
            DropdownMenu.CheckboxItem,
            {
              checked,
              onCheckedChange: onToggleColumn(index),
              onSelect: (e) => e.preventDefault(),
              children: name
            },
            id
          );
        }) })
      ] }),
      hasChanged && /* @__PURE__ */ jsx9(
        Button2,
        {
          size: "small",
          variant: "transparent",
          type: "button",
          onClick: onResetColumns,
          className: "text-ui-fg-muted hover:text-ui-fg-subtle",
          "data-id": "reset-columns",
          children: t("dataGrid.columns.resetToDefault")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-x-2", children: [
      errorCount > 0 && /* @__PURE__ */ jsxs7(
        Button2,
        {
          size: "small",
          variant: "secondary",
          type: "button",
          onClick: onToggleErrorHighlighting,
          className: clx5({
            "bg-ui-button-neutral-pressed": isHighlighted
          }),
          children: [
            /* @__PURE__ */ jsx9(ExclamationCircle2, { className: "text-ui-fg-subtle" }),
            /* @__PURE__ */ jsx9("span", { children: t("dataGrid.errors.count", {
              count: errorCount
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx9(
        DataGridKeyboardShortcutModal,
        {
          open: shortcutsOpen,
          onOpenChange: handleShortcutsOpenChange
        }
      )
    ] })
  ] });
};
var DataGridCell = ({
  cell,
  columnIndex,
  rowIndex,
  anchor,
  onDragToFillStart,
  multiColumnSelection
}) => {
  const coords = {
    row: rowIndex,
    col: columnIndex
  };
  const isAnchor = isCellMatch(coords, anchor);
  return /* @__PURE__ */ jsx9(
    "div",
    {
      role: "gridcell",
      "aria-rowindex": rowIndex,
      "aria-colindex": columnIndex,
      style: {
        width: cell.column.getSize(),
        ...getCommonPinningStyles(cell.column)
      },
      "data-row-index": rowIndex,
      "data-column-index": columnIndex,
      className: clx5(
        "relative flex items-center border-b border-r p-0 outline-none"
      ),
      tabIndex: -1,
      children: /* @__PURE__ */ jsxs7("div", { className: "relative h-full w-full", children: [
        flexRender(cell.column.columnDef.cell, {
          ...cell.getContext(),
          columnIndex,
          rowIndex
        }),
        isAnchor && /* @__PURE__ */ jsx9(
          "div",
          {
            onMouseDown: onDragToFillStart,
            className: clx5(
              "bg-ui-fg-interactive absolute bottom-0 right-0 z-[3] size-1.5 cursor-ns-resize",
              {
                "cursor-nwse-resize": multiColumnSelection
              }
            )
          }
        )
      ] })
    }
  );
};
var DataGridRow = ({
  row,
  rowIndex,
  virtualRow,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualColumns,
  flatColumns,
  anchor,
  onDragToFillStart,
  multiColumnSelection
}) => {
  const visibleCells = row.getVisibleCells();
  return /* @__PURE__ */ jsxs7(
    "div",
    {
      role: "row",
      "aria-rowindex": virtualRow.index,
      style: {
        transform: `translateY(${virtualRow.start}px)`
      },
      className: "bg-ui-bg-subtle txt-compact-small absolute flex h-10 w-full",
      children: [
        virtualPaddingLeft ? /* @__PURE__ */ jsx9(
          "div",
          {
            role: "presentation",
            style: { display: "flex", width: virtualPaddingLeft }
          }
        ) : null,
        virtualColumns.reduce((acc, vc, index, array) => {
          const cell = visibleCells[vc.index];
          const column = cell.column;
          const columnIndex = flatColumns.findIndex((c) => c.id === column.id);
          const previousVC = array[index - 1];
          if (previousVC && vc.index !== previousVC.index + 1) {
            acc.push(
              /* @__PURE__ */ jsx9(
                "div",
                {
                  role: "presentation",
                  style: {
                    display: "flex",
                    width: `${vc.start - previousVC.end}px`
                  }
                },
                `padding-${previousVC.index}-${vc.index}`
              )
            );
          }
          acc.push(
            /* @__PURE__ */ jsx9(
              DataGridCell,
              {
                cell,
                columnIndex,
                rowIndex,
                anchor,
                onDragToFillStart,
                multiColumnSelection
              },
              cell.id
            )
          );
          return acc;
        }, []),
        virtualPaddingRight ? /* @__PURE__ */ jsx9(
          "div",
          {
            role: "presentation",
            style: { display: "flex", width: virtualPaddingRight }
          }
        ) : null
      ]
    }
  );
};

// src/components/data-grid/components/data-grid-text-cell.tsx
import { clx as clx6 } from "@medusajs/ui";
import { useEffect as useEffect6, useState as useState9 } from "react";
import { Controller as Controller4 } from "react-hook-form";
import { jsx as jsx10 } from "react/jsx-runtime";
var DataGridTextCell = ({
  context
}) => {
  const { field, control, renderProps } = useDataGridCell({
    context
  });
  const errorProps = useDataGridCellError({ context });
  const { container, input } = renderProps;
  return /* @__PURE__ */ jsx10(
    Controller4,
    {
      control,
      name: field,
      render: ({ field: field2 }) => {
        return /* @__PURE__ */ jsx10(DataGridCellContainer, { ...container, ...errorProps, children: /* @__PURE__ */ jsx10(Inner4, { field: field2, inputProps: input }) });
      }
    }
  );
};
var Inner4 = ({
  field,
  inputProps
}) => {
  const { onChange: _, onBlur, ref, value, ...rest } = field;
  const { ref: inputRef, onBlur: onInputBlur, onChange, ...input } = inputProps;
  const [localValue, setLocalValue] = useState9(value);
  useEffect6(() => {
    setLocalValue(value);
  }, [value]);
  const combinedRefs = useCombinedRefs(inputRef, ref);
  return /* @__PURE__ */ jsx10(
    "input",
    {
      className: clx6(
        "txt-compact-small text-ui-fg-subtle flex size-full cursor-pointer items-center justify-center bg-transparent outline-none",
        "focus:cursor-text"
      ),
      autoComplete: "off",
      tabIndex: -1,
      value: localValue,
      onChange: (e) => setLocalValue(e.target.value),
      ref: combinedRefs,
      onBlur: () => {
        onBlur();
        onInputBlur();
        onChange(localValue, value);
      },
      ...input,
      ...rest
    }
  );
};

// src/components/data-grid/data-grid.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var _DataGrid = ({
  isLoading,
  ...props
}) => {
  return isLoading ? /* @__PURE__ */ jsx11(
    DataGridSkeleton,
    {
      columns: props.columns,
      rows: props.data?.length && props.data.length > 0 ? props.data.length : 10
    }
  ) : /* @__PURE__ */ jsx11(DataGridRoot, { ...props });
};
var DataGrid = Object.assign(_DataGrid, {
  BooleanCell: DataGridBooleanCell,
  TextCell: DataGridTextCell,
  NumberCell: DataGridNumberCell,
  CurrencyCell: DataGridCurrencyCell,
  ReadonlyCell: DataGridReadonlyCell
});

// src/components/data-grid/helpers/create-data-grid-column-helper.ts
import {
  createColumnHelper
} from "@tanstack/react-table";
function createDataGridHelper() {
  const columnHelper = createColumnHelper();
  return {
    column: ({
      id,
      name,
      header,
      cell,
      disableHiding = false,
      field,
      type
    }) => columnHelper.display({
      id,
      header,
      cell,
      enableHiding: !disableHiding,
      meta: {
        name,
        field,
        type
      }
    })
  };
}

// src/components/common/tax-badge/tax-badge.tsx
import { TaxExclusive, TaxInclusive } from "@medusajs/icons";
import { Tooltip as Tooltip3 } from "@medusajs/ui";
import { useTranslation as useTranslation4 } from "react-i18next";
import { jsx as jsx12 } from "react/jsx-runtime";
var IncludesTaxTooltip = ({
  includesTax
}) => {
  const { t } = useTranslation4();
  return /* @__PURE__ */ jsx12(
    Tooltip3,
    {
      maxWidth: 999,
      content: includesTax ? t("general.includesTaxTooltip") : t("general.excludesTaxTooltip"),
      children: includesTax ? /* @__PURE__ */ jsx12(TaxInclusive, { className: "text-ui-fg-muted shrink-0" }) : /* @__PURE__ */ jsx12(TaxExclusive, { className: "text-ui-fg-muted shrink-0" })
    }
  );
};

// src/components/data-grid/helpers/create-data-grid-price-columns.tsx
import { jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
var createDataGridPriceColumns = ({
  currencies: currencies2,
  regions,
  pricePreferences,
  isReadyOnly,
  getFieldName,
  t
}) => {
  const columnHelper = createDataGridHelper();
  return [
    ...currencies2?.map((currency) => {
      const preference = pricePreferences?.find(
        (p) => p.attribute === "currency_code" && p.value === currency
      );
      const translatedCurrencyName = t("fields.priceTemplate", {
        regionOrCurrency: currency.toUpperCase()
      });
      return columnHelper.column({
        id: `currency_prices.${currency}`,
        name: t("fields.priceTemplate", {
          regionOrCurrency: currency.toUpperCase()
        }),
        field: (context) => {
          const isReadyOnlyValue = isReadyOnly?.(context);
          if (isReadyOnlyValue) {
            return null;
          }
          return getFieldName(context, currency);
        },
        type: "number",
        header: () => /* @__PURE__ */ jsxs8("div", { className: "flex w-full items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx13("span", { className: "truncate", title: translatedCurrencyName, children: translatedCurrencyName }),
          /* @__PURE__ */ jsx13(IncludesTaxTooltip, { includesTax: preference?.is_tax_inclusive })
        ] }),
        cell: (context) => {
          if (isReadyOnly?.(context)) {
            return /* @__PURE__ */ jsx13(DataGridReadonlyCell, { context });
          }
          return /* @__PURE__ */ jsx13(DataGridCurrencyCell, { code: currency, context });
        }
      });
    }) ?? [],
    ...regions?.map((region) => {
      const preference = pricePreferences?.find(
        (p) => p.attribute === "region_id" && p.value === region.id
      );
      const translatedRegionName = t("fields.priceTemplate", {
        regionOrCurrency: region.name
      });
      return columnHelper.column({
        id: `region_prices.${region.id}`,
        name: t("fields.priceTemplate", {
          regionOrCurrency: region.name
        }),
        field: (context) => {
          const isReadyOnlyValue = isReadyOnly?.(context);
          if (isReadyOnlyValue) {
            return null;
          }
          return getFieldName(context, region.id);
        },
        type: "number",
        header: () => /* @__PURE__ */ jsxs8("div", { className: "flex w-full items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx13("span", { className: "truncate", title: translatedRegionName, children: translatedRegionName }),
          /* @__PURE__ */ jsx13(IncludesTaxTooltip, { includesTax: preference?.is_tax_inclusive })
        ] }),
        cell: (context) => {
          if (isReadyOnly?.(context)) {
            return /* @__PURE__ */ jsx13(DataGridReadonlyCell, { context });
          }
          const currency = currencies2?.find((c) => c === region.currency_code);
          if (!currency) {
            return null;
          }
          return /* @__PURE__ */ jsx13(
            DataGridCurrencyCell,
            {
              code: region.currency_code,
              context
            }
          );
        }
      });
    }) ?? []
  ];
};

export {
  useCombinedRefs,
  useDataGridCell,
  useDataGridCellError,
  useDataGridDuplicateCell,
  DataGridCellContainer,
  DataGridReadonlyCell,
  DataGridSkeleton,
  DataGrid,
  createDataGridHelper,
  IncludesTaxTooltip,
  createDataGridPriceColumns
};
