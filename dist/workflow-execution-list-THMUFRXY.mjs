import {
  getTransactionState,
  getTransactionStateColor
} from "./chunk-RPAL6FHW.mjs";
import {
  StatusCell
} from "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import {
  _DataTable,
  useDataTable
} from "./chunk-CQXEEXNP.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-B646R3EG.mjs";
import "./chunk-M3VFKDXJ.mjs";
import {
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useQueryParams
} from "./chunk-C76H5USB.mjs";
import "./chunk-Q5PHSNDY.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-R2NIHOCX.mjs";
import {
  useWorkflowExecutions
} from "./chunk-QTCZFYFH.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/workflow-executions/workflow-execution-list/components/workflow-execution-list-table/workflow-execution-list-table.tsx
import { Container, Heading, Text } from "@medusajs/ui";
import { keepPreviousData } from "@tanstack/react-query";
import { useTranslation as useTranslation2 } from "react-i18next";

// src/routes/workflow-executions/workflow-execution-list/components/workflow-execution-list-table/use-workflow-execution-table-columns.tsx
import { Badge } from "@medusajs/ui";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { jsx } from "react/jsx-runtime";
var columnHelper = createColumnHelper();
var useWorkflowExecutionTableColumns = () => {
  const { t } = useTranslation();
  return useMemo(
    () => [
      columnHelper.accessor("transaction_id", {
        header: t("workflowExecutions.transactionIdLabel"),
        cell: ({ getValue }) => /* @__PURE__ */ jsx(Badge, { size: "2xsmall", children: getValue() })
      }),
      columnHelper.accessor("state", {
        header: t("fields.state"),
        cell: ({ getValue }) => {
          const state = getValue();
          const color = getTransactionStateColor(state);
          const translatedState = getTransactionState(t, state);
          return /* @__PURE__ */ jsx(StatusCell, { color, children: /* @__PURE__ */ jsx("span", { className: "capitalize", children: translatedState }) });
        }
      }),
      columnHelper.accessor("execution", {
        header: t("workflowExecutions.progressLabel"),
        cell: ({ getValue }) => {
          const steps = getValue()?.steps;
          if (!steps) {
            return "0 of 0 steps";
          }
          const actionableSteps = Object.values(steps).filter(
            (step) => step.id !== ROOT_PREFIX
          );
          const completedSteps = actionableSteps.filter(
            (step) => step.invoke.state === "done" /* DONE */
          );
          return t("workflowExecutions.stepsCompletedLabel", {
            completed: completedSteps.length,
            count: actionableSteps.length
          });
        }
      })
    ],
    [t]
  );
};
var ROOT_PREFIX = "_root";

// src/routes/workflow-executions/workflow-execution-list/components/workflow-execution-list-table/use-workflow-execution-table-query.tsx
var useWorkflowExecutionTableQuery = ({
  pageSize = 20,
  prefix
}) => {
  const raw = useQueryParams(["q", "offset"], prefix);
  const { offset, ...rest } = raw;
  const searchParams = {
    limit: pageSize,
    offset: offset ? parseInt(offset) : 0,
    ...rest
  };
  return {
    searchParams,
    raw
  };
};

// src/routes/workflow-executions/workflow-execution-list/components/workflow-execution-list-table/workflow-execution-list-table.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var PAGE_SIZE = 20;
var WorkflowExecutionListTable = () => {
  const { t } = useTranslation2();
  const { searchParams, raw } = useWorkflowExecutionTableQuery({
    pageSize: PAGE_SIZE
  });
  const { workflow_executions, count, isLoading, isError, error } = useWorkflowExecutions(
    {
      ...searchParams
    },
    {
      placeholderData: keepPreviousData
    }
  );
  const columns = useWorkflowExecutionTableColumns();
  const { table } = useDataTable({
    data: workflow_executions || [],
    columns,
    count,
    pageSize: PAGE_SIZE,
    enablePagination: true,
    getRowId: (row) => row.id
  });
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx2(Heading, { children: t("workflowExecutions.domain") }),
      /* @__PURE__ */ jsx2(Text, { className: "text-ui-fg-subtle", size: "small", children: t(`workflowExecutions.subtitle`) })
    ] }) }),
    /* @__PURE__ */ jsx2(
      _DataTable,
      {
        table,
        columns,
        count,
        isLoading,
        pageSize: PAGE_SIZE,
        navigateTo: (row) => `${row.id}`,
        search: true,
        pagination: true,
        queryObject: raw,
        noRecords: {
          message: t("workflowExecutions.list.noRecordsMessage")
        }
      }
    )
  ] });
};

// src/routes/workflow-executions/workflow-execution-list/workflow-execution-list.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var WorkflowExcecutionList = () => {
  const { getWidgets } = useExtension();
  return /* @__PURE__ */ jsx3(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("workflow.list.after"),
        before: getWidgets("workflow.list.before")
      },
      hasOutlet: false,
      children: /* @__PURE__ */ jsx3(WorkflowExecutionListTable, {})
    }
  );
};
export {
  WorkflowExcecutionList as Component
};
