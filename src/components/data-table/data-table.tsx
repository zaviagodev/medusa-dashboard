import {
  Button,
  clx,
  DataTableColumnDef,
  DataTableCommand,
  DataTableEmptyStateProps,
  DataTableFilter,
  DataTableFilteringState,
  DataTablePaginationState,
  DataTableRow,
  DataTableRowSelectionState,
  DataTableSortingState,
  Heading,
  DataTable as Primitive,
  Text,
  useDataTable,
} from "@medusajs/ui"
import React, { ReactNode, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { useQueryParams } from "../../hooks/use-query-params"
import { ActionMenu } from "../common/action-menu"

type DataTableActionProps = {
  label: string
  disabled?: boolean
} & (
  | {
      to: string
    }
  | {
      onClick: () => void
    }
)

type DataTableActionMenuActionProps = {
  label: string
  icon: ReactNode
  disabled?: boolean
} & (
  | {
      to: string
    }
  | {
      onClick: () => void
    }
)

type DataTableActionMenuGroupProps = {
  actions: DataTableActionMenuActionProps[]
}

type DataTableActionMenuProps = {
  groups: DataTableActionMenuGroupProps[]
}

interface DataTableProps<TData> {
  data?: TData[]
  columns: DataTableColumnDef<TData, any>[]
  filters?: DataTableFilter[]
  commands?: DataTableCommand[]
  action?: DataTableActionProps
  actionMenu?: DataTableActionMenuProps
  rowCount?: number
  getRowId: (row: TData) => string
  enablePagination?: boolean
  enableSearch?: boolean
  autoFocusSearch?: boolean
  rowHref?: (row: TData) => string
  emptyState?: DataTableEmptyStateProps
  heading?: string
  subHeading?: string
  prefix?: string
  pageSize?: number
  isLoading?: boolean
  rowSelection?: {
    state: DataTableRowSelectionState
    onRowSelectionChange: (value: DataTableRowSelectionState) => void
    enableRowSelection?: boolean | ((row: DataTableRow<TData>) => boolean)
  }
  layout?: "fill" | "auto"
}

export const DataTable = <TData,>({
  data = [],
  columns,
  filters,
  commands,
  action,
  actionMenu,
  getRowId,
  rowCount = 0,
  enablePagination = true,
  enableSearch = true,
  autoFocusSearch = false,
  rowHref,
  heading,
  subHeading,
  prefix,
  pageSize = 10,
  emptyState,
  rowSelection,
  isLoading = false,
  layout = "auto",
}: DataTableProps<TData>) => {
  const { t } = useTranslation()

  const enableFiltering = filters && filters.length > 0
  const enableCommands = commands && commands.length > 0
  const enableSorting = columns.some((column) => column.enableSorting)

  const filterIds = useMemo(() => filters?.map((f) => f.id) ?? [], [filters])
  const prefixedFilterIds = filterIds.map((id) => getQueryParamKey(id, prefix))

  const { offset, order, q, ...filterParams } = useQueryParams(
    [
      ...filterIds,
      ...(enableSorting ? ["order"] : []),
      ...(enableSearch ? ["q"] : []),
      ...(enablePagination ? ["offset"] : []),
    ],
    prefix
  )
  const [_, setSearchParams] = useSearchParams()

  const search = useMemo(() => {
    return q ?? ""
  }, [q])

  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      if (value) {
        prev.set(getQueryParamKey("q", prefix), value)
      } else {
        prev.delete(getQueryParamKey("q", prefix))
      }

      return prev
    })
  }

  const pagination: DataTablePaginationState = useMemo(() => {
    return offset
      ? parsePaginationState(offset, pageSize)
      : { pageIndex: 0, pageSize }
  }, [offset, pageSize])

  const handlePaginationChange = (value: DataTablePaginationState) => {
    setSearchParams((prev) => {
      if (value.pageIndex === 0) {
        prev.delete(getQueryParamKey("offset", prefix))
      } else {
        prev.set(
          getQueryParamKey("offset", prefix),
          transformPaginationState(value).toString()
        )
      }
      return prev
    })
  }

  const filtering: DataTableFilteringState = useMemo(
    () => parseFilterState(filterIds, filterParams),
    [filterIds, filterParams]
  )

  const handleFilteringChange = (value: DataTableFilteringState) => {
    setSearchParams((prev) => {
      Array.from(prev.keys()).forEach((key) => {
        if (prefixedFilterIds.includes(key) && !(key in value)) {
          prev.delete(key)
        }
      })

      Object.entries(value).forEach(([key, filter]) => {
        if (
          prefixedFilterIds.includes(getQueryParamKey(key, prefix)) &&
          filter
        ) {
          prev.set(getQueryParamKey(key, prefix), JSON.stringify(filter))
        }
      })

      return prev
    })
  }

  const sorting: DataTableSortingState | null = useMemo(() => {
    return order ? parseSortingState(order) : null
  }, [order])

  const handleSortingChange = (value: DataTableSortingState) => {
    setSearchParams((prev) => {
      if (value) {
        const valueToStore = transformSortingState(value)

        prev.set(getQueryParamKey("order", prefix), valueToStore)
      } else {
        prev.delete(getQueryParamKey("order", prefix))
      }

      return prev
    })
  }

  const { pagination: paginationTranslations, toolbar: toolbarTranslations } =
    useDataTableTranslations()

  const navigate = useNavigate()

  const onRowClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: TData) => {
      if (!rowHref) {
        return
      }

      const href = rowHref(row)

      if (event.metaKey || event.ctrlKey || event.button === 1) {
        window.open(href, "_blank", "noreferrer")
        return
      }

      if (event.shiftKey) {
        window.open(href, undefined, "noreferrer")
        return
      }

      navigate(href)
    },
    [navigate, rowHref]
  )

  const instance = useDataTable({
    data,
    columns,
    filters,
    commands,
    rowCount,
    getRowId,
    onRowClick: rowHref ? onRowClick : undefined,
    pagination: enablePagination
      ? {
          state: pagination,
          onPaginationChange: handlePaginationChange,
        }
      : undefined,
    filtering: enableFiltering
      ? {
          state: filtering,
          onFilteringChange: handleFilteringChange,
        }
      : undefined,
    sorting: enableSorting
      ? {
          state: sorting,
          onSortingChange: handleSortingChange,
        }
      : undefined,
    search: enableSearch
      ? {
          state: search,
          onSearchChange: handleSearchChange,
        }
      : undefined,
    rowSelection,
    isLoading,
  })

  const shouldRenderHeading = heading || subHeading

  return (
    <Primitive
      instance={instance}
      className={clx({
        "h-full [&_tr]:last-of-type:!border-b": layout === "fill",
      })}
    >
      <Primitive.Toolbar
        className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center"
        translations={toolbarTranslations}
      >
        <div className="flex w-full items-center justify-between gap-2">
          {shouldRenderHeading && (
            <div>
              {heading && <Heading>{heading}</Heading>}
              {subHeading && (
                <Text size="small" className="text-ui-fg-subtle">
                  {subHeading}
                </Text>
              )}
            </div>
          )}
          <div className="flex items-center justify-end gap-x-2 md:hidden">
            {enableFiltering && (
              <Primitive.FilterMenu tooltip={t("filters.filterLabel")} />
            )}
            <Primitive.SortingMenu tooltip={t("filters.sortLabel")} />
            {actionMenu && <ActionMenu variant="primary" {...actionMenu} />}
            {action && <DataTableAction {...action} />}
          </div>
        </div>
        <div className="flex w-full items-center gap-2 md:justify-end">
          {enableSearch && (
            <div className="w-full md:w-auto">
              <Primitive.Search
                placeholder={t("filters.searchLabel")}
                autoFocus={autoFocusSearch}
              />
            </div>
          )}
          <div className="hidden items-center gap-x-2 md:flex">
            {enableFiltering && (
              <Primitive.FilterMenu tooltip={t("filters.filterLabel")} />
            )}
            <Primitive.SortingMenu tooltip={t("filters.sortLabel")} />
            {actionMenu && <ActionMenu variant="primary" {...actionMenu} />}
            {action && <DataTableAction {...action} />}
          </div>
        </div>
      </Primitive.Toolbar>
      <Primitive.Table emptyState={emptyState} />
      {enablePagination && (
        <Primitive.Pagination translations={paginationTranslations} />
      )}
      {enableCommands && (
        <Primitive.CommandBar selectedLabel={(count) => `${count} selected`} />
      )}
    </Primitive>
  )
}

function transformSortingState(value: DataTableSortingState) {
  return value.desc ? `-${value.id}` : value.id
}

function parseSortingState(value: string) {
  return value.startsWith("-")
    ? { id: value.slice(1), desc: true }
    : { id: value, desc: false }
}

function transformPaginationState(value: DataTablePaginationState) {
  return value.pageIndex * value.pageSize
}

function parsePaginationState(value: string, pageSize: number) {
  const offset = parseInt(value)

  return {
    pageIndex: Math.floor(offset / pageSize),
    pageSize,
  }
}

function parseFilterState(
  filterIds: string[],
  value: Record<string, string | undefined>
) {
  if (!value) {
    return {}
  }

  const filters: DataTableFilteringState = {}

  for (const id of filterIds) {
    const filterValue = value[id]

    if (filterValue) {
      filters[id] = JSON.parse(filterValue)
    }
  }

  return filters
}

function getQueryParamKey(key: string, prefix?: string) {
  return prefix ? `${prefix}_${key}` : key
}

const useDataTableTranslations = () => {
  const { t } = useTranslation()

  const paginationTranslations = {
    of: t("general.of"),
    results: t("general.results"),
    pages: t("general.pages"),
    prev: t("general.prev"),
    next: t("general.next"),
  }

  const toolbarTranslations = {
    clearAll: t("actions.clearAll"),
  }

  return {
    pagination: paginationTranslations,
    toolbar: toolbarTranslations,
  }
}

const DataTableAction = ({
  label,
  disabled,
  ...props
}: DataTableActionProps) => {
  const buttonProps = {
    size: "small" as const,
    disabled: disabled ?? false,
    type: "button" as const,
    variant: "secondary" as const,
  }

  if ("to" in props) {
    return (
      <Button {...buttonProps} asChild>
        <Link to={props.to}>{label}</Link>
      </Button>
    )
  }

  return (
    <Button {...buttonProps} onClick={props.onClick}>
      {label}
    </Button>
  )
}
