// src/components/common/sortable-tree/sortable-tree.tsx
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  defaultDropAnimation,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove as arrayMove2,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS as CSS2 } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// src/components/common/sortable-tree/keyboard-coordinates.ts
import {
  KeyboardCode,
  closestCorners,
  getFirstCollision
} from "@dnd-kit/core";

// src/components/common/sortable-tree/utils.ts
import { arrayMove } from "@dnd-kit/sortable";
var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
function getDragDepth(offset, indentationWidth) {
  return Math.round(offset / indentationWidth);
}
function getProjection(items, activeId, overId, dragOffset, indentationWidth) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;
  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }
  return { depth, maxDepth, minDepth, parentId: getParentId() };
  function getParentId() {
    if (depth === 0 || !previousItem) {
      return null;
    }
    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }
    if (depth > previousItem.depth) {
      return previousItem.id;
    }
    const newParent = newItems.slice(0, overItemIndex).reverse().find((item) => item.depth === depth)?.parentId;
    return newParent ?? null;
  }
}
function getMaxDepth({ previousItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }
  return 0;
}
function getMinDepth({ nextItem }) {
  if (nextItem) {
    return nextItem.depth;
  }
  return 0;
}
function flatten(items, parentId = null, depth = 0, childrenProp) {
  return items.reduce((acc, item, index) => {
    const children = item[childrenProp] || [];
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(children, item.id, depth + 1, childrenProp)
    ];
  }, []);
}
function flattenTree(items, childrenProp) {
  return flatten(items, void 0, void 0, childrenProp);
}
function buildTree(flattenedItems, newIndex, childrenProp) {
  const root = { id: "root", [childrenProp]: [] };
  const nodes = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, [childrenProp]: [] }));
  let update = {
    id: null,
    parentId: null,
    index: 0
  };
  items.forEach((item, index) => {
    const {
      id,
      index: _index,
      depth: _depth,
      parentId: _parentId,
      ...rest
    } = item;
    const children = item[childrenProp] || [];
    const parentId = _parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);
    nodes[id] = { id, [childrenProp]: children };
    parent[childrenProp].push({
      id,
      ...rest,
      [childrenProp]: children
    });
    if (index === newIndex) {
      const parentChildren = parent[childrenProp];
      update = {
        id: item.id,
        parentId: parent.id === "root" ? null : parent.id,
        index: parentChildren.length - 1
      };
    }
  });
  if (!update.id) {
    throw new Error("Could not find item");
  }
  return {
    items: root[childrenProp],
    update
  };
}
function findItem(items, itemId) {
  return items.find(({ id }) => id === itemId);
}
function findItemDeep(items, itemId, childrenProp) {
  for (const item of items) {
    const { id } = item;
    const children = item[childrenProp] || [];
    if (id === itemId) {
      return item;
    }
    if (children.length) {
      const child = findItemDeep(children, itemId, childrenProp);
      if (child) {
        return child;
      }
    }
  }
  return void 0;
}
function countChildren(items, count = 0, childrenProp) {
  return items.reduce((acc, item) => {
    const children = item[childrenProp] || [];
    if (children.length) {
      return countChildren(children, acc + 1, childrenProp);
    }
    return acc + 1;
  }, count);
}
function getChildCount(items, id, childrenProp) {
  const item = findItemDeep(items, id, childrenProp);
  const children = item?.[childrenProp] || [];
  return item ? countChildren(children, 0, childrenProp) : 0;
}
function removeChildrenOf(items, ids, childrenProp) {
  const excludeParentIds = [...ids];
  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      const children = item[childrenProp] || [];
      if (children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }
    return true;
  });
}

// src/components/common/sortable-tree/keyboard-coordinates.ts
var directions = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left
];
var horizontal = [KeyboardCode.Left, KeyboardCode.Right];
var sortableTreeKeyboardCoordinates = (context, indentationWidth) => (event, {
  currentCoordinates,
  context: {
    active,
    over,
    collisionRect,
    droppableRects,
    droppableContainers
  }
}) => {
  if (directions.includes(event.code)) {
    if (!active || !collisionRect) {
      return;
    }
    event.preventDefault();
    const {
      current: { items, offset }
    } = context;
    if (horizontal.includes(event.code) && over?.id) {
      const { depth, maxDepth, minDepth } = getProjection(
        items,
        active.id,
        over.id,
        offset,
        indentationWidth
      );
      switch (event.code) {
        case KeyboardCode.Left:
          if (depth > minDepth) {
            return {
              ...currentCoordinates,
              x: currentCoordinates.x - indentationWidth
            };
          }
          break;
        case KeyboardCode.Right:
          if (depth < maxDepth) {
            return {
              ...currentCoordinates,
              x: currentCoordinates.x + indentationWidth
            };
          }
          break;
      }
      return void 0;
    }
    const containers = [];
    droppableContainers.forEach((container) => {
      if (container?.disabled || container.id === over?.id) {
        return;
      }
      const rect = droppableRects.get(container.id);
      if (!rect) {
        return;
      }
      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            containers.push(container);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            containers.push(container);
          }
          break;
      }
    });
    const collisions = closestCorners({
      active,
      collisionRect,
      pointerCoordinates: null,
      droppableRects,
      droppableContainers: containers
    });
    let closestId = getFirstCollision(collisions, "id");
    if (closestId === over?.id && collisions.length > 1) {
      closestId = collisions[1].id;
    }
    if (closestId && over?.id) {
      const activeRect = droppableRects.get(active.id);
      const newRect = droppableRects.get(closestId);
      const newDroppable = droppableContainers.get(closestId);
      if (activeRect && newRect && newDroppable) {
        const newIndex = items.findIndex(({ id }) => id === closestId);
        const newItem = items[newIndex];
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const activeItem = items[activeIndex];
        if (newItem && activeItem) {
          const { depth } = getProjection(
            items,
            active.id,
            closestId,
            (newItem.depth - activeItem.depth) * indentationWidth,
            indentationWidth
          );
          const isBelow = newIndex > activeIndex;
          const modifier = isBelow ? 1 : -1;
          const offset2 = 0;
          const newCoordinates = {
            x: newRect.left + depth * indentationWidth,
            y: newRect.top + modifier * offset2
          };
          return newCoordinates;
        }
      }
    }
  }
  return void 0;
};

// src/components/common/sortable-tree/sortable-tree-item.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// src/components/common/sortable-tree/tree-item.tsx
import { forwardRef } from "react";
import {
  DotsSix,
  FolderIllustration,
  FolderOpenIllustration,
  TagIllustration,
  TriangleRightMini
} from "@medusajs/icons";
import { Badge, clx, IconButton } from "@medusajs/ui";
import { jsx, jsxs } from "react/jsx-runtime";
var TreeItem = forwardRef(
  ({
    childCount,
    clone,
    depth,
    disableSelection,
    disableInteraction,
    ghost,
    handleProps,
    indentationWidth,
    collapsed,
    onCollapse,
    style,
    value,
    disabled,
    wrapperRef,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "li",
      {
        ref: wrapperRef,
        style: {
          paddingLeft: `${indentationWidth * depth}px`
        },
        className: clx("-mb-px list-none", {
          "pointer-events-none": disableInteraction,
          "select-none": disableSelection,
          "[&:first-of-type>div]:border-t-0": !clone
        }),
        ...props,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref,
            style,
            className: clx(
              "bg-ui-bg-base transition-fg relative flex items-center gap-x-3 border-y px-6 py-2.5",
              {
                "border-l": depth > 0,
                "shadow-elevation-flyout bg-ui-bg-base w-fit rounded-lg border-none pr-6 opacity-80": clone,
                "bg-ui-bg-base-hover z-[1] opacity-50": ghost,
                "bg-ui-bg-disabled": disabled
              }
            ),
            children: [
              /* @__PURE__ */ jsx(Handle, { ...handleProps, disabled }),
              /* @__PURE__ */ jsx(
                Collapse,
                {
                  collapsed,
                  onCollapse,
                  clone
                }
              ),
              /* @__PURE__ */ jsx(
                Icon,
                {
                  childrenCount: childCount,
                  collapsed,
                  clone
                }
              ),
              /* @__PURE__ */ jsx(Value, { value }),
              /* @__PURE__ */ jsx(ChildrenCount, { clone, childrenCount: childCount })
            ]
          }
        )
      }
    );
  }
);
TreeItem.displayName = "TreeItem";
var Handle = ({
  listeners,
  attributes,
  disabled
}) => {
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "small",
      variant: "transparent",
      type: "button",
      className: clx("cursor-grab", { "cursor-not-allowed": disabled }),
      disabled,
      ...attributes,
      ...listeners,
      children: /* @__PURE__ */ jsx(DotsSix, {})
    }
  );
};
var Icon = ({ childrenCount, collapsed, clone }) => {
  const isBranch = clone ? childrenCount && childrenCount > 1 : childrenCount;
  const isOpen = clone ? false : !collapsed;
  return /* @__PURE__ */ jsx("div", { className: "flex size-7 items-center justify-center", children: isBranch ? isOpen ? /* @__PURE__ */ jsx(FolderOpenIllustration, {}) : /* @__PURE__ */ jsx(FolderIllustration, {}) : /* @__PURE__ */ jsx(TagIllustration, {}) });
};
var Collapse = ({ collapsed, onCollapse, clone }) => {
  if (clone) {
    return null;
  }
  if (!onCollapse) {
    return /* @__PURE__ */ jsx("div", { className: "size-7", role: "presentation" });
  }
  return /* @__PURE__ */ jsx(
    IconButton,
    {
      size: "small",
      variant: "transparent",
      onClick: onCollapse,
      type: "button",
      children: /* @__PURE__ */ jsx(
        TriangleRightMini,
        {
          className: clx("text-ui-fg-subtle transition-transform", {
            "rotate-90": !collapsed
          })
        }
      )
    }
  );
};
var Value = ({ value }) => {
  return /* @__PURE__ */ jsx("div", { className: "txt-compact-small text-ui-fg-subtle flex-grow truncate", children: value });
};
var ChildrenCount = ({ clone, childrenCount }) => {
  if (!clone || !childrenCount) {
    return null;
  }
  if (clone && childrenCount <= 1) {
    return null;
  }
  return /* @__PURE__ */ jsx(Badge, { size: "2xsmall", color: "blue", className: "absolute -right-2 -top-2", children: childrenCount });
};

// src/components/common/sortable-tree/sortable-tree-item.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var animateLayoutChanges = ({
  isSorting,
  wasDragging
}) => {
  return isSorting || wasDragging ? false : true;
};
function SortableTreeItem({
  id,
  depth,
  disabled,
  ...props
}) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };
  return /* @__PURE__ */ jsx2(
    TreeItem,
    {
      ref: setDraggableNodeRef,
      wrapperRef: setDroppableNodeRef,
      style,
      depth,
      ghost: isDragging,
      disableSelection: iOS,
      disableInteraction: isSorting,
      disabled,
      handleProps: {
        listeners,
        attributes
      },
      ...props
    }
  );
}

// src/components/common/sortable-tree/sortable-tree.tsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
};
var dropAnimationConfig = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS2.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS2.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ];
  },
  easing: "ease-out",
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    });
  }
};
function SortableTree({
  collapsible = true,
  childrenProp = "children",
  // "children" is the default children prop name
  enableDrag = true,
  items = [],
  indentationWidth = 40,
  onChange,
  renderValue
}) {
  const [collapsedState, setCollapsedState] = useState({});
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(null);
  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items, childrenProp);
    const collapsedItems = flattenedTree.reduce(
      (acc, item) => {
        const { id } = item;
        const children = item[childrenProp] || [];
        const collapsed = collapsedState[id];
        return collapsed && children.length ? [...acc, id] : acc;
      },
      []
    );
    return removeChildrenOf(
      flattenedTree,
      activeId ? [activeId, ...collapsedItems] : collapsedItems,
      childrenProp
    );
  }, [activeId, items, childrenProp, collapsedState]);
  const projected = activeId && overId ? getProjection(
    flattenedItems,
    activeId,
    overId,
    offsetLeft,
    indentationWidth
  ) : null;
  const sensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft
  });
  const [coordinateGetter] = useState(
    () => sortableTreeKeyboardCoordinates(sensorContext, indentationWidth)
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter
    })
  );
  const sortedIds = useMemo(
    () => flattenedItems.map(({ id }) => id),
    [flattenedItems]
  );
  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null;
  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft
    };
  }, [flattenedItems, offsetLeft]);
  function handleDragStart({ active: { id: activeId2 } }) {
    setActiveId(activeId2);
    setOverId(activeId2);
    const activeItem2 = flattenedItems.find(({ id }) => id === activeId2);
    if (activeItem2) {
      setCurrentPosition({
        parentId: activeItem2.parentId,
        overId: activeId2
      });
    }
    document.body.style.setProperty("cursor", "grabbing");
  }
  function handleDragMove({ delta }) {
    setOffsetLeft(delta.x);
  }
  function handleDragOver({ over }) {
    setOverId(over?.id ?? null);
  }
  function handleDragEnd({ active, over }) {
    resetState();
    if (projected && over) {
      const { depth, parentId } = projected;
      const clonedItems = JSON.parse(
        JSON.stringify(flattenTree(items, childrenProp))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id);
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id);
      const activeTreeItem = clonedItems[activeIndex];
      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId };
      const sortedItems = arrayMove2(clonedItems, activeIndex, overIndex);
      const { items: newItems, update } = buildTree(
        sortedItems,
        overIndex,
        childrenProp
      );
      onChange(update, newItems);
    }
  }
  function handleDragCancel() {
    resetState();
  }
  function resetState() {
    setOverId(null);
    setActiveId(null);
    setOffsetLeft(0);
    setCurrentPosition(null);
    document.body.style.setProperty("cursor", "");
  }
  function handleCollapse(id) {
    setCollapsedState((state) => ({
      ...state,
      [id]: state[id] ? false : true
    }));
  }
  function getMovementAnnouncement(eventName, activeId2, overId2) {
    if (overId2 && projected) {
      if (eventName !== "onDragEnd") {
        if (currentPosition && projected.parentId === currentPosition.parentId && overId2 === currentPosition.overId) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId: overId2
          });
        }
      }
      const clonedItems = JSON.parse(
        JSON.stringify(flattenTree(items, childrenProp))
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === overId2);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId2);
      const sortedItems = arrayMove2(clonedItems, activeIndex, overIndex);
      const previousItem = sortedItems[overIndex - 1];
      let announcement;
      const movedVerb = eventName === "onDragEnd" ? "dropped" : "moved";
      const nestedVerb = eventName === "onDragEnd" ? "dropped" : "nested";
      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId2} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId2} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }
          if (previousSibling) {
            announcement = `${activeId2} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }
      return announcement;
    }
    return;
  }
  const announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement("onDragMove", active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement("onDragOver", active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement("onDragEnd", active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    }
  };
  return /* @__PURE__ */ jsx3(
    DndContext,
    {
      accessibility: { announcements },
      sensors,
      collisionDetection: closestCenter,
      measuring,
      onDragStart: handleDragStart,
      onDragMove: handleDragMove,
      onDragOver: handleDragOver,
      onDragEnd: handleDragEnd,
      onDragCancel: handleDragCancel,
      children: /* @__PURE__ */ jsxs2(SortableContext, { items: sortedIds, strategy: verticalListSortingStrategy, children: [
        flattenedItems.map((item) => {
          const { id, depth } = item;
          const children = item[childrenProp] || [];
          const disabled = typeof enableDrag === "function" ? !enableDrag(item) : !enableDrag;
          return /* @__PURE__ */ jsx3(
            SortableTreeItem,
            {
              id,
              value: renderValue(item),
              disabled,
              depth: id === activeId && projected ? projected.depth : depth,
              indentationWidth,
              collapsed: Boolean(collapsedState[id] && children.length),
              childCount: children.length,
              onCollapse: collapsible && children.length ? () => handleCollapse(id) : void 0
            },
            id
          );
        }),
        createPortal(
          /* @__PURE__ */ jsx3(DragOverlay, { dropAnimation: dropAnimationConfig, children: activeId && activeItem ? /* @__PURE__ */ jsx3(
            SortableTreeItem,
            {
              id: activeId,
              depth: activeItem.depth,
              clone: true,
              childCount: getChildCount(items, activeId, childrenProp) + 1,
              value: renderValue(activeItem),
              indentationWidth: 0
            }
          ) : null }),
          document.body
        )
      ] })
    }
  );
}

// src/routes/categories/common/components/category-tree/category-tree.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var CategoryTree = ({
  value,
  onChange,
  renderValue,
  enableDrag = true,
  isLoading = false
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsx4("div", { className: "txt-compact-small relative flex-1 overflow-y-auto", children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsx4(CategoryLeafPlaceholder, {}, i)) });
  }
  return /* @__PURE__ */ jsx4(
    SortableTree,
    {
      items: value,
      childrenProp: "category_children",
      collapsible: true,
      enableDrag,
      onChange,
      renderValue
    }
  );
};
var CategoryLeafPlaceholder = () => {
  return /* @__PURE__ */ jsx4("div", { className: "bg-ui-bg-base -mb-px flex h-12 animate-pulse items-center border-y px-6 py-2.5" });
};

export {
  CategoryTree
};
