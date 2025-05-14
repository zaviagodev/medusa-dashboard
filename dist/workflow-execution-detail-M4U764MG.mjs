import {
  STEP_ERROR_STATES,
  STEP_INACTIVE_STATES,
  STEP_IN_PROGRESS_STATES,
  STEP_OK_STATES,
  STEP_SKIPPED_STATES,
  getTransactionState,
  getTransactionStateColor
} from "./chunk-RPAL6FHW.mjs";
import {
  JsonViewSection,
  SingleColumnPage
} from "./chunk-2RQLKDBF.mjs";
import {
  useExtension
} from "./chunk-C5P5PL3E.mjs";
import {
  SingleColumnPageSkeleton
} from "./chunk-LPEUYMRK.mjs";
import "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import {
  useWorkflowExecution,
  workflowExecutionsQueryKeys
} from "./chunk-QTCZFYFH.mjs";
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
import "./chunk-6I62UDJA.mjs";
import {
  queryClient
} from "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import {
  sdk
} from "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/workflow-executions/workflow-execution-detail/breadcrumb.tsx
import { jsx } from "react/jsx-runtime";
var WorkflowExecutionDetailBreadcrumb = (props) => {
  const { id } = props.params || {};
  const { workflow_execution } = useWorkflowExecution(id, {
    initialData: props.data,
    enabled: Boolean(id)
  });
  if (!workflow_execution) {
    return null;
  }
  const cleanId = workflow_execution.id.replace("wf_exec_", "");
  return /* @__PURE__ */ jsx("span", { children: cleanId });
};

// src/routes/workflow-executions/workflow-execution-detail/loader.ts
var executionDetailQuery = (id) => ({
  queryKey: workflowExecutionsQueryKeys.detail(id),
  queryFn: async () => sdk.admin.workflowExecution.retrieve(id)
});
var workflowExecutionLoader = async ({
  params
}) => {
  const id = params.id;
  const query = executionDetailQuery(id);
  return queryClient.ensureQueryData(query);
};

// src/routes/workflow-executions/workflow-execution-detail/workflow-detail.tsx
import { useParams } from "react-router-dom";

// src/routes/workflow-executions/workflow-execution-detail/components/workflow-execution-general-section/workflow-execution-general-section.tsx
import {
  Badge,
  Container,
  Copy,
  Heading,
  StatusBadge,
  Text,
  clx
} from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var WorkflowExecutionGeneralSection = ({
  execution
}) => {
  const { t } = useTranslation();
  const cleanId = execution.id.replace("wf_exec_", "");
  const translatedState = getTransactionState(
    t,
    execution.state
  );
  const stateColor = getTransactionStateColor(
    execution.state
  );
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-0.5", children: [
        /* @__PURE__ */ jsx2(Heading, { children: cleanId }),
        /* @__PURE__ */ jsx2(Copy, { content: cleanId, className: "text-ui-fg-muted" })
      ] }),
      /* @__PURE__ */ jsx2(StatusBadge, { color: stateColor, children: translatedState })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t("workflowExecutions.workflowIdLabel") }),
      /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", className: "w-fit", children: execution.workflow_id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t("workflowExecutions.transactionIdLabel") }),
      /* @__PURE__ */ jsx2(Badge, { size: "2xsmall", className: "w-fit", children: execution.transaction_id })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid grid-cols-2 px-6 py-4", children: [
      /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", weight: "plus", children: t("workflowExecutions.progressLabel") }),
      /* @__PURE__ */ jsx2(Progress, { steps: execution.execution?.steps })
    ] })
  ] });
};
var ROOT_PREFIX = "_root";
var Progress = ({
  steps
}) => {
  const { t } = useTranslation();
  if (!steps) {
    return /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: t("workflowExecutions.stepsCompletedLabel", {
      completed: 0,
      total: 0
    }) });
  }
  const actionableSteps = Object.values(steps).filter(
    (step) => step.id !== ROOT_PREFIX
  );
  const completedSteps = actionableSteps.filter(
    (step) => step.invoke.state === "done" /* DONE */
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex w-fit items-center gap-x-2", children: [
    /* @__PURE__ */ jsx2("div", { className: "flex items-center gap-x-[3px]", children: actionableSteps.map((step) => /* @__PURE__ */ jsx2(
      "div",
      {
        className: clx(
          "bg-ui-bg-switch-off shadow-details-switch-background h-3 w-1.5 rounded-full",
          {
            "bg-ui-fg-muted": step.invoke.state === "done" /* DONE */
          }
        )
      },
      step.id
    )) }),
    /* @__PURE__ */ jsx2(Text, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: t("workflowExecutions.stepsCompletedLabel", {
      completed: completedSteps.length,
      count: actionableSteps.length
    }) })
  ] });
};

// src/routes/workflow-executions/workflow-execution-detail/components/workflow-execution-history-section/workflow-execution-history-section.tsx
import { Spinner, TriangleDownMini } from "@medusajs/icons";
import {
  clx as clx2,
  CodeBlock,
  Container as Container2,
  Heading as Heading2,
  IconButton,
  Text as Text2
} from "@medusajs/ui";
import { format } from "date-fns";
import { Collapsible as RadixCollapsible } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useLocation } from "react-router-dom";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var WorkflowExecutionHistorySection = ({
  execution
}) => {
  const { t } = useTranslation2();
  const map = Object.values(execution.execution?.steps || {});
  const steps = map.filter((step) => step.id !== "_root");
  const unreachableStepId = steps.find(
    (step) => step.invoke.status === "permanent_failure" /* PERMANENT_FAILURE */
  )?.id;
  const unreachableSteps = unreachableStepId ? steps.filter(
    (step) => step.id !== unreachableStepId && step.id.includes(unreachableStepId)
  ).map((step) => step.id) : [];
  return /* @__PURE__ */ jsxs2(Container2, { className: "divide-y p-0", children: [
    /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsx3(Heading2, { level: "h2", children: t("workflowExecutions.history.sectionTitle") }) }),
    /* @__PURE__ */ jsx3("div", { className: "flex flex-col gap-y-0.5 px-6 py-4", children: steps.map((step, index) => {
      const stepId = step.id.split(".").pop();
      if (!stepId) {
        return null;
      }
      const context = execution.context?.data.invoke[stepId];
      const error = execution.context?.errors.find(
        (e) => e.action === stepId
      );
      return /* @__PURE__ */ jsx3(
        Event,
        {
          step,
          stepInvokeContext: context,
          stepError: error,
          isLast: index === steps.length - 1,
          isUnreachable: unreachableSteps.includes(step.id)
        },
        step.id
      );
    }) })
  ] });
};
var Event = ({
  step,
  stepInvokeContext,
  stepError,
  isLast,
  isUnreachable
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { hash } = useLocation();
  const { t } = useTranslation2();
  const stepId = step.id.split(".").pop();
  useEffect(() => {
    if (hash === `#${stepId}`) {
      setOpen(true);
    }
  }, [hash, stepId]);
  const identifier = step.id.split(".").pop();
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "grid grid-cols-[20px_1fr] items-start gap-x-2 px-2",
      id: stepId,
      children: [
        /* @__PURE__ */ jsxs2("div", { className: "grid h-full grid-rows-[20px_1fr] items-center justify-center gap-y-0.5", children: [
          /* @__PURE__ */ jsx3("div", { className: "flex size-5 items-center justify-center", children: /* @__PURE__ */ jsx3("div", { className: "bg-ui-bg-base shadow-borders-base flex size-2.5 items-center justify-center rounded-full", children: /* @__PURE__ */ jsx3(
            "div",
            {
              className: clx2("size-1.5 rounded-full", {
                "bg-ui-tag-neutral-bg": STEP_SKIPPED_STATES.includes(
                  step.invoke.state
                ),
                "bg-ui-tag-green-icon": STEP_OK_STATES.includes(
                  step.invoke.state
                ),
                "bg-ui-tag-orange-icon": STEP_IN_PROGRESS_STATES.includes(
                  step.invoke.state
                ),
                "bg-ui-tag-red-icon": STEP_ERROR_STATES.includes(
                  step.invoke.state
                ),
                "bg-ui-tag-neutral-icon": STEP_INACTIVE_STATES.includes(
                  step.invoke.state
                )
              })
            }
          ) }) }),
          /* @__PURE__ */ jsx3("div", { className: "flex h-full flex-col items-center", children: /* @__PURE__ */ jsx3(
            "div",
            {
              "aria-hidden": true,
              role: "presentation",
              className: clx2({
                "bg-ui-border-base h-full min-h-[14px] w-px": !isLast
              })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs2(RadixCollapsible.Root, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsx3(RadixCollapsible.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs2("div", { className: "group flex cursor-pointer items-start justify-between outline-none", children: [
            /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", weight: "plus", children: identifier }),
            /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-2", children: [
              /* @__PURE__ */ jsx3(
                StepState,
                {
                  state: step.invoke.state,
                  startedAt: step.startedAt,
                  isUnreachable
                }
              ),
              /* @__PURE__ */ jsx3(IconButton, { size: "2xsmall", variant: "transparent", children: /* @__PURE__ */ jsx3(TriangleDownMini, { className: "text-ui-fg-muted transition-transform group-data-[state=open]:rotate-180" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsx3(RadixCollapsible.Content, { ref, children: /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-y-2 pb-4 pt-2", children: [
            /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex flex-col gap-y-2", children: [
              /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", children: t("workflowExecutions.history.definitionLabel") }),
              /* @__PURE__ */ jsx3(
                CodeBlock,
                {
                  snippets: [
                    {
                      code: JSON.stringify(step.definition, null, 2),
                      label: t("workflowExecutions.history.definitionLabel"),
                      language: "json",
                      hideLineNumbers: true
                    }
                  ],
                  children: /* @__PURE__ */ jsx3(CodeBlock.Body, {})
                }
              )
            ] }),
            stepInvokeContext && /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex flex-col gap-y-2", children: [
              /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", children: t("workflowExecutions.history.outputLabel") }),
              /* @__PURE__ */ jsx3(
                CodeBlock,
                {
                  snippets: [
                    {
                      code: JSON.stringify(
                        // TODO: Apply resolve value: packages/core/workflows-sdk/src/utils/composer/helpers/resolve-value.ts
                        stepInvokeContext?.output?.output ?? {},
                        null,
                        2
                      ),
                      label: t("workflowExecutions.history.outputLabel"),
                      language: "json",
                      hideLineNumbers: true
                    }
                  ],
                  children: /* @__PURE__ */ jsx3(CodeBlock.Body, {})
                }
              )
            ] }),
            !!stepInvokeContext?.output?.compensateInput && step.compensate.state === "reverted" /* REVERTED */ && /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex flex-col gap-y-2", children: [
              /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", children: t("workflowExecutions.history.compensateInputLabel") }),
              /* @__PURE__ */ jsx3(
                CodeBlock,
                {
                  snippets: [
                    {
                      // TODO: Apply resolve value: packages/core/workflows-sdk/src/utils/composer/helpers/resolve-value.ts
                      code: JSON.stringify(
                        stepInvokeContext?.output?.compensateInput ?? {},
                        null,
                        2
                      ),
                      label: t(
                        "workflowExecutions.history.compensateInputLabel"
                      ),
                      language: "json",
                      hideLineNumbers: true
                    }
                  ],
                  children: /* @__PURE__ */ jsx3(CodeBlock.Body, {})
                }
              )
            ] }),
            stepError && /* @__PURE__ */ jsxs2("div", { className: "text-ui-fg-subtle flex flex-col gap-y-2", children: [
              /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", children: t("workflowExecutions.history.errorLabel") }),
              /* @__PURE__ */ jsx3(
                CodeBlock,
                {
                  snippets: [
                    {
                      code: JSON.stringify(
                        {
                          error: stepError.error,
                          handlerType: stepError.handlerType
                        },
                        null,
                        2
                      ),
                      label: t("workflowExecutions.history.errorLabel"),
                      language: "json",
                      hideLineNumbers: true
                    }
                  ],
                  children: /* @__PURE__ */ jsx3(CodeBlock.Body, {})
                }
              )
            ] })
          ] }) })
        ] })
      ]
    }
  );
};
var StepState = ({
  state,
  startedAt,
  isUnreachable
}) => {
  const { t } = useTranslation2();
  const isFailed = state === "failed" /* FAILED */;
  const isRunning = state === "invoking" /* INVOKING */;
  const isSkipped = state === "skipped" /* SKIPPED */;
  const isSkippedFailure = state === "skipped_failure" /* SKIPPED_FAILURE */;
  if (isUnreachable) {
    return null;
  }
  if (isRunning) {
    return /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-x-1", children: [
      /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: t("workflowExecutions.history.runningState") }),
      /* @__PURE__ */ jsx3(Spinner, { className: "text-ui-fg-interactive animate-spin" })
    ] });
  }
  let stateText;
  if (isSkipped) {
    stateText = t("workflowExecutions.history.skippedState");
  } else if (isSkippedFailure) {
    stateText = t("workflowExecutions.history.skippedFailureState");
  } else if (isFailed) {
    stateText = t("workflowExecutions.history.failedState");
  }
  if (stateText !== null) {
    return /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", className: "text-ui-fg-subtle", children: stateText });
  }
  if (startedAt) {
    return /* @__PURE__ */ jsx3(Text2, { size: "small", leading: "compact", className: "text-ui-fg-muted", children: format(startedAt, "dd MMM yyyy HH:mm:ss") });
  }
};

// src/routes/workflow-executions/workflow-execution-detail/components/workflow-execution-payload-section/workflow-execution-payload-section.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var WorkflowExecutionPayloadSection = ({
  execution
}) => {
  let payload = execution.context?.data?.payload;
  if (!payload) {
    return null;
  }
  if (typeof payload !== "object") {
    payload = { input: payload };
  }
  return /* @__PURE__ */ jsx4(JsonViewSection, { data: payload });
};

// src/routes/workflow-executions/workflow-execution-detail/components/workflow-execution-timeline-section/workflow-execution-timeline-section.tsx
import { ArrowPathMini, MinusMini, PlusMini } from "@medusajs/icons";
import { Container as Container3, DropdownMenu, Heading as Heading3, Text as Text3, clx as clx3 } from "@medusajs/ui";
import {
  motion,
  useAnimationControls,
  useDragControls,
  useMotionValue
} from "motion/react";
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { useTranslation as useTranslation3 } from "react-i18next";
import { Link } from "react-router-dom";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var WorkflowExecutionTimelineSection = ({
  execution
}) => {
  const { t } = useTranslation3();
  return /* @__PURE__ */ jsxs3(Container3, { className: "overflow-hidden px-0 pb-8 pt-0", children: [
    /* @__PURE__ */ jsx5("div", { className: "flex items-center justify-between px-6 py-4", children: /* @__PURE__ */ jsx5(Heading3, { level: "h2", children: t("general.timeline") }) }),
    /* @__PURE__ */ jsx5("div", { className: "w-full overflow-hidden border-y", children: /* @__PURE__ */ jsx5(Canvas, { execution }) })
  ] });
};
var createNodeClusters = (steps) => {
  const actionableSteps = Object.values(steps).filter(
    (step) => step.id !== "_root"
  );
  const clusters = {};
  actionableSteps.forEach((step) => {
    if (!clusters[step.depth]) {
      clusters[step.depth] = [];
    }
    clusters[step.depth].push(step);
  });
  return clusters;
};
var getNextCluster = (clusters, depth) => {
  const nextDepth = depth + 1;
  return clusters[nextDepth];
};
var defaultState = {
  x: -860,
  y: -1020,
  scale: 1
};
var MAX_ZOOM = 1.5;
var MIN_ZOOM = 0.5;
var ZOOM_STEP = 0.25;
var Canvas = ({
  execution
}) => {
  const [zoom, setZoom] = useState2(1);
  const [isDragging, setIsDragging] = useState2(false);
  const scale = useMotionValue(defaultState.scale);
  const x = useMotionValue(defaultState.x);
  const y = useMotionValue(defaultState.y);
  const controls = useAnimationControls();
  const dragControls = useDragControls();
  const dragConstraints = useRef2(null);
  const canZoomIn = zoom < MAX_ZOOM;
  const canZoomOut = zoom > MIN_ZOOM;
  useEffect2(() => {
    const unsubscribe = scale.on("change", (latest) => {
      setZoom(latest);
    });
    return () => {
      unsubscribe();
    };
  }, [scale]);
  const clusters = createNodeClusters(execution.execution?.steps || {});
  function scaleXandY(prevScale, newScale, x2, y2) {
    const scaleRatio = newScale / prevScale;
    return {
      x: x2 * scaleRatio,
      y: y2 * scaleRatio
    };
  }
  const changeZoom = (newScale) => {
    const { x: newX, y: newY } = scaleXandY(zoom, newScale, x.get(), y.get());
    setZoom(newScale);
    controls.set({ scale: newScale, x: newX, y: newY });
  };
  const zoomIn = () => {
    const curr = scale.get();
    if (curr < 1.5) {
      const newScale = curr + ZOOM_STEP;
      changeZoom(newScale);
    }
  };
  const zoomOut = () => {
    const curr = scale.get();
    if (curr > 0.5) {
      const newScale = curr - ZOOM_STEP;
      changeZoom(newScale);
    }
  };
  const resetCanvas = () => {
    controls.start(defaultState);
  };
  return /* @__PURE__ */ jsx5("div", { className: "h-[400px] w-full", children: /* @__PURE__ */ jsxs3("div", { ref: dragConstraints, className: "relative size-full", children: [
    /* @__PURE__ */ jsx5("div", { className: "relative size-full overflow-hidden object-contain", children: /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(
      motion.div,
      {
        onMouseDown: () => setIsDragging(true),
        onMouseUp: () => setIsDragging(false),
        drag: true,
        dragConstraints,
        dragElastic: 0,
        dragMomentum: false,
        dragControls,
        initial: false,
        animate: controls,
        transition: { duration: 0.25 },
        style: {
          x,
          y,
          scale
        },
        className: clx3(
          "bg-ui-bg-subtle relative size-[500rem] origin-top-left items-start justify-start overflow-hidden",
          "bg-[radial-gradient(var(--border-base)_1.5px,transparent_0)] bg-[length:20px_20px] bg-repeat",
          {
            "cursor-grab": !isDragging,
            "cursor-grabbing": isDragging
          }
        ),
        children: /* @__PURE__ */ jsx5("main", { className: "size-full", children: /* @__PURE__ */ jsx5("div", { className: "absolute left-[1100px] top-[1100px] flex select-none items-start", children: Object.entries(clusters).map(([depth, cluster]) => {
          const next = getNextCluster(clusters, Number(depth));
          return /* @__PURE__ */ jsxs3("div", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx5("div", { className: "flex flex-col justify-center gap-y-2", children: cluster.map((step) => /* @__PURE__ */ jsx5(Node, { step }, step.id)) }),
            /* @__PURE__ */ jsx5(Line, { next })
          ] }, depth);
        }) }) })
      }
    ) }) }),
    /* @__PURE__ */ jsxs3("div", { className: "bg-ui-bg-base shadow-borders-base text-ui-fg-subtle absolute bottom-4 left-6 flex h-7 items-center overflow-hidden rounded-md", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx5(
          "button",
          {
            onClick: zoomIn,
            type: "button",
            disabled: !canZoomIn,
            "aria-label": "Zoom in",
            className: "disabled:text-ui-fg-disabled transition-fg hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed focus-visible:bg-ui-bg-base-pressed border-r p-1 outline-none",
            children: /* @__PURE__ */ jsx5(PlusMini, {})
          }
        ),
        /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsxs3(DropdownMenu, { children: [
          /* @__PURE__ */ jsx5(DropdownMenu.Trigger, { className: "disabled:text-ui-fg-disabled transition-fg hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed focus-visible:bg-ui-bg-base-pressed flex w-[50px] items-center justify-center border-r p-1 outline-none", children: /* @__PURE__ */ jsxs3(
            Text3,
            {
              as: "span",
              size: "xsmall",
              leading: "compact",
              className: "select-none tabular-nums",
              children: [
                Math.round(zoom * 100),
                "%"
              ]
            }
          ) }),
          /* @__PURE__ */ jsx5(DropdownMenu.Content, { children: [50, 75, 100, 125, 150].map((value) => /* @__PURE__ */ jsxs3(
            DropdownMenu.Item,
            {
              onClick: () => changeZoom(value / 100),
              children: [
                value,
                "%"
              ]
            },
            value
          )) })
        ] }) }),
        /* @__PURE__ */ jsx5(
          "button",
          {
            onClick: zoomOut,
            type: "button",
            disabled: !canZoomOut,
            "aria-label": "Zoom out",
            className: "disabled:text-ui-fg-disabled transition-fg hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed focus-visible:bg-ui-bg-base-pressed border-r p-1 outline-none",
            children: /* @__PURE__ */ jsx5(MinusMini, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx5(
        "button",
        {
          onClick: resetCanvas,
          type: "button",
          "aria-label": "Reset canvas",
          className: "disabled:text-ui-fg-disabled transition-fg hover:bg-ui-bg-base-hover active:bg-ui-bg-base-pressed focus-visible:bg-ui-bg-base-pressed p-1 outline-none",
          children: /* @__PURE__ */ jsx5(ArrowPathMini, {})
        }
      )
    ] })
  ] }) });
};
var HorizontalArrow = () => {
  return /* @__PURE__ */ jsx5(
    "svg",
    {
      width: "42",
      height: "12",
      viewBox: "0 0 42 12",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx5(
        "path",
        {
          d: "M41.5303 6.53033C41.8232 6.23744 41.8232 5.76256 41.5303 5.46967L36.7574 0.696699C36.4645 0.403806 35.9896 0.403806 35.6967 0.696699C35.4038 0.989593 35.4038 1.46447 35.6967 1.75736L39.9393 6L35.6967 10.2426C35.4038 10.5355 35.4038 11.0104 35.6967 11.3033C35.9896 11.5962 36.4645 11.5962 36.7574 11.3033L41.5303 6.53033ZM0.999996 5.25C0.585785 5.25 0.249996 5.58579 0.249996 6C0.249996 6.41421 0.585785 6.75 0.999996 6.75V5.25ZM41 5.25L0.999996 5.25V6.75L41 6.75V5.25Z",
          fill: "var(--border-strong)"
        }
      )
    }
  );
};
var MiddleArrow = () => {
  return /* @__PURE__ */ jsx5(
    "svg",
    {
      width: "22",
      height: "38",
      viewBox: "0 0 22 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "-mt-[6px]",
      children: /* @__PURE__ */ jsx5(
        "path",
        {
          d: "M0.999878 32H0.249878V32.75H0.999878V32ZM21.5284 32.5303C21.8213 32.2374 21.8213 31.7626 21.5284 31.4697L16.7554 26.6967C16.4625 26.4038 15.9876 26.4038 15.6947 26.6967C15.4019 26.9896 15.4019 27.4645 15.6947 27.7574L19.9374 32L15.6947 36.2426C15.4019 36.5355 15.4019 37.0104 15.6947 37.3033C15.9876 37.5962 16.4625 37.5962 16.7554 37.3033L21.5284 32.5303ZM0.249878 0L0.249878 32H1.74988L1.74988 0H0.249878ZM0.999878 32.75L20.998 32.75V31.25L0.999878 31.25V32.75Z",
          fill: "var(--border-strong)"
        }
      )
    }
  );
};
var EndArrow = () => {
  return /* @__PURE__ */ jsx5(
    "svg",
    {
      width: "22",
      height: "38",
      viewBox: "0 0 22 38",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "-mt-[6px]",
      children: /* @__PURE__ */ jsx5(
        "path",
        {
          d: "M21.5284 32.5303C21.8213 32.2374 21.8213 31.7626 21.5284 31.4697L16.7554 26.6967C16.4625 26.4038 15.9876 26.4038 15.6947 26.6967C15.4019 26.9896 15.4019 27.4645 15.6947 27.7574L19.9374 32L15.6947 36.2426C15.4019 36.5355 15.4019 37.0104 15.6947 37.3033C15.9876 37.5962 16.4625 37.5962 16.7554 37.3033L21.5284 32.5303ZM0.249878 0L0.249878 28H1.74988L1.74988 0H0.249878ZM4.99988 32.75L20.998 32.75V31.25L4.99988 31.25V32.75ZM0.249878 28C0.249878 30.6234 2.37653 32.75 4.99988 32.75V31.25C3.20495 31.25 1.74988 29.7949 1.74988 28H0.249878Z",
          fill: "var(--border-strong)"
        }
      )
    }
  );
};
var Arrow = ({ depth }) => {
  if (depth === 1) {
    return /* @__PURE__ */ jsx5(HorizontalArrow, {});
  }
  if (depth === 2) {
    return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-end", children: [
      /* @__PURE__ */ jsx5(HorizontalArrow, {}),
      /* @__PURE__ */ jsx5(EndArrow, {})
    ] });
  }
  const inbetween = Array.from({ length: depth - 2 }).map((_, index) => /* @__PURE__ */ jsx5(MiddleArrow, {}, index));
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-end", children: [
    /* @__PURE__ */ jsx5(HorizontalArrow, {}),
    inbetween,
    /* @__PURE__ */ jsx5(EndArrow, {})
  ] });
};
var Line = ({ next }) => {
  if (!next) {
    return null;
  }
  return /* @__PURE__ */ jsx5("div", { className: "-ml-[5px] -mr-[7px] w-[60px] pr-[7px]", children: /* @__PURE__ */ jsxs3("div", { className: "flex min-h-[24px] w-full items-start", children: [
    /* @__PURE__ */ jsx5("div", { className: "flex h-6 w-2.5 items-center justify-center", children: /* @__PURE__ */ jsx5("div", { className: "bg-ui-button-neutral shadow-borders-base size-2.5 shrink-0 rounded-full" }) }),
    /* @__PURE__ */ jsx5("div", { className: "pt-1.5", children: /* @__PURE__ */ jsx5(Arrow, { depth: next.length }) })
  ] }) });
};
var Node = ({ step }) => {
  if (step.id === "_root") {
    return null;
  }
  const stepId = step.id.split(".").pop();
  const handleScrollTo = () => {
    if (!stepId) {
      return;
    }
    const historyItem = document.getElementById(stepId);
    if (!historyItem) {
      return;
    }
    setTimeout(() => {
      historyItem.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }, 100);
  };
  return /* @__PURE__ */ jsx5(
    Link,
    {
      to: `#${stepId}`,
      onClick: handleScrollTo,
      className: "focus-visible:shadow-borders-focus transition-fg rounded-md outline-none",
      children: /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "bg-ui-bg-base shadow-borders-base flex min-w-[120px] items-center gap-x-0.5 rounded-md p-0.5",
          "data-step-id": step.id,
          children: [
            /* @__PURE__ */ jsx5("div", { className: "flex size-5 items-center justify-center", children: /* @__PURE__ */ jsx5(
              "div",
              {
                className: clx3(
                  "size-2 rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]",
                  {
                    "bg-ui-tag-neutral-bg": STEP_SKIPPED_STATES.includes(
                      step.invoke.state
                    ),
                    "bg-ui-tag-green-icon": STEP_OK_STATES.includes(
                      step.invoke.state
                    ),
                    "bg-ui-tag-orange-icon": STEP_IN_PROGRESS_STATES.includes(
                      step.invoke.state
                    ),
                    "bg-ui-tag-red-icon": STEP_ERROR_STATES.includes(
                      step.invoke.state
                    ),
                    "bg-ui-tag-neutral-icon": STEP_INACTIVE_STATES.includes(
                      step.invoke.state
                    )
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx5(
              Text3,
              {
                size: "xsmall",
                leading: "compact",
                weight: "plus",
                className: "select-none",
                children: stepId
              }
            )
          ]
        }
      )
    }
  );
};

// src/routes/workflow-executions/workflow-execution-detail/workflow-detail.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var ExecutionDetail = () => {
  const { id } = useParams();
  const { workflow_execution, isLoading, isError, error } = useWorkflowExecution(id);
  const { getWidgets } = useExtension();
  if (isLoading || !workflow_execution) {
    return /* @__PURE__ */ jsx6(SingleColumnPageSkeleton, { sections: 4, showJSON: true });
  }
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs4(
    SingleColumnPage,
    {
      widgets: {
        after: getWidgets("workflow.details.after"),
        before: getWidgets("workflow.details.before")
      },
      data: workflow_execution,
      showJSON: true,
      children: [
        /* @__PURE__ */ jsx6(WorkflowExecutionGeneralSection, { execution: workflow_execution }),
        /* @__PURE__ */ jsx6(WorkflowExecutionTimelineSection, { execution: workflow_execution }),
        /* @__PURE__ */ jsx6(WorkflowExecutionPayloadSection, { execution: workflow_execution }),
        /* @__PURE__ */ jsx6(WorkflowExecutionHistorySection, { execution: workflow_execution })
      ]
    }
  );
};
export {
  WorkflowExecutionDetailBreadcrumb as Breadcrumb,
  ExecutionDetail as Component,
  workflowExecutionLoader as loader
};
