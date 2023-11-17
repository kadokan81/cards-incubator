import React from 'react'

import { RankingInfo, compareItems, rankItem } from '@tanstack/match-sorter-utils'
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  FilterFns,
  SortingFn,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table'
import ReactDOM from 'react-dom/client'

// eslint-disable-next-line import/no-unresolved
import { Person, makeData } from './makeData'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

function App() {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        columns: [
          {
            accessorKey: 'firstName',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            cell: info => info.getValue(),
            footer: props => props.column.id,
            header: () => <span>Last Name</span>,
            id: 'lastName',
          },
          {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            cell: info => info.getValue(),
            filterFn: 'fuzzy',
            footer: props => props.column.id,
            header: 'Full Name',
            id: 'fullName',
            sortingFn: fuzzySort,
          },
        ],
        footer: props => props.column.id,
        header: 'Name',
      },
      {
        columns: [
          {
            accessorKey: 'age',
            footer: props => props.column.id,
            header: () => 'Age',
          },
          {
            columns: [
              {
                accessorKey: 'visits',
                footer: props => props.column.id,
                header: () => <span>Visits</span>,
              },
              {
                accessorKey: 'status',
                footer: props => props.column.id,
                header: 'Status',
              },
              {
                accessorKey: 'progress',
                footer: props => props.column.id,
                header: 'Profile Progress',
              },
            ],
            header: 'More Info',
          },
        ],
        footer: props => props.column.id,
        header: 'Info',
      },
    ],
    []
  )

  const [data, setData] = React.useState<Person[]>(() => makeData(50000))
  const refreshData = () => setData(old => makeData(50000))

  const table = useReactTable({
    columns,
    data,
    debugColumns: false,
    debugHeaders: true,
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      columnFilters,
      globalFilter,
    },
  })

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ desc: false, id: 'fullName' }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  return (
    <div className={'p-2'}>
      <div>
        <DebouncedInput
          className={'p-2 font-lg shadow border border-block'}
          onChange={value => setGlobalFilter(String(value))}
          placeholder={'Search all columns...'}
          value={globalFilter ?? ''}
        />
      </div>
      <div className={'h-2'} />
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th colSpan={header.colSpan} key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={'h-2'} />
      <div className={'flex items-center gap-2'}>
        <button
          className={'border rounded p-1'}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          {'<<'}
        </button>
        <button
          className={'border rounded p-1'}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          {'<'}
        </button>
        <button
          className={'border rounded p-1'}
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          {'>'}
        </button>
        <button
          className={'border rounded p-1'}
          disabled={!table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          {'>>'}
        </button>
        <span className={'flex items-center gap-1'}>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <span className={'flex items-center gap-1'}>
          | Go to page:
          <input
            className={'border p-1 rounded w-16'}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0

              table.setPageIndex(page)
            }}
            type={'number'}
          />
        </span>
        <select
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          value={table.getState().pagination.pageSize}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getPrePaginationRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
      <div>
        <button onClick={() => refreshData()}>Refresh Data</button>
      </div>
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
    </div>
  )
}

function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className={'flex space-x-2'}>
        <DebouncedInput
          className={'w-24 border shadow rounded'}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          type={'number'}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
        />
        <DebouncedInput
          className={'w-24 border shadow rounded'}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
          type={'number'}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
        />
      </div>
      <div className={'h-1'} />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option key={value} value={value} />
        ))}
      </datalist>
      <DebouncedInput
        className={'w-36 border shadow rounded'}
        list={column.id + 'list'}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        type={'text'}
        value={(columnFilterValue ?? '') as string}
      />
      <div className={'h-1'} />
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  debounce = 500,
  onChange,
  value: initialValue,
  ...props
}: {
  debounce?: number
  onChange: (value: number | string) => void
  value: number | string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <input {...props} onChange={e => setValue(e.target.value)} value={value} />
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find the root element')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
