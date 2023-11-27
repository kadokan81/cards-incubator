/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines */
import { useEffect, useMemo, useState } from 'react'

/* eslint-disable react/jsx-no-comment-textnodes */
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import s from './table.module.scss'

import Button from '../button/button'
import { TableHeader } from './tableHeader'

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

type dataType = {
  cardsCount: number
  createdBy: string
  title: string
  updated: string
}

const data: dataType[] = [
  {
    cardsCount: 99,
    createdBy: 'John Doe',
    title: 'new',
    updated: '2023-07-07',
  },
  {
    cardsCount: 5,
    createdBy: 'Jane Smith',
    title: 'Project B',
    updated: '2023-07-06',
  },
  {
    cardsCount: 88,
    createdBy: 'Alex',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 32,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'judo',
    updated: '2023-07-07',
  },
  {
    cardsCount: 42,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'music',
    updated: '2023-07-04',
  },
  {
    cardsCount: 38,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
  {
    cardsCount: 8,
    createdBy: 'Alice Johnson',
    title: 'Project C',
    updated: '2023-07-05',
  },
  {
    cardsCount: 3,
    createdBy: 'Bob Anderson',
    title: 'Project D',
    updated: '2023-07-07',
  },
  {
    cardsCount: 12,
    createdBy: 'Emma Davis',
    title: 'Project E',
    updated: '2023-07-04',
  },
]

// const columns: ColumnDef<dataType>[] = [
//   {
//     accessorKey: 'title',
//     header: 'Name',
//     size: 350,
//   },
//   {
//     accessorKey: 'cardsCount',
//     // cell: props => props.getValue(),
//     // footer: props => props.header.id,
//     header: 'Cards',
//     size: 80,
//   },
//   {
//     accessorKey: 'updated',
//     header: 'Last Updated',
//     size: 200,
//   },
//   {
//     accessorKey: 'createdBy',
//     header: 'Created by',
//     maxSize: 250,
//     size: 250,
//   },
//   {
//     accessorKey: 'icons',
//     cell: props => {
//       console.log(props)

//       return (
//         <div style={{ textAlign: 'right' }}>
//           <span>📒 📕 📘 {}</span>
//         </div>
//       )
//     },
//     header: '',
//     size: 200,
//   },
// ]

export const TableCards = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const memColumns = useMemo<ColumnDef<dataType>[]>(
    () => [
      {
        accessorKey: 'title',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Name',
        size: 350,
      },
      {
        accessorKey: 'cardsCount',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Cards',
        size: 130,
      },
      {
        accessorKey: 'updated',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Last Updated',
        size: 200,
      },
      {
        accessorKey: 'createdBy',
        cell: (info: { getValue: () => any }) => info.getValue(),
        header: 'Created by',
        maxSize: 250,
        size: 250,
      },
      {
        accessorKey: 'icons',
        cell: () => (
          <div style={{ textAlign: 'right' }}>
            <span>📒 📕 📘 {}</span>
          </div>
        ),
        header: '',
        size: 200,
      },
    ],
    []
  )
  const table = useReactTable({
    columns: memColumns,
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
    state: { columnFilters, globalFilter },
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ desc: false, id: 'fullName' }])
      }
    }
  }, [table.getState().columnFilters[0]?.id])

  const classNames = {
    headerCell: s.headerCell,
    tableBody: s.tableBody,
    tableCell: s.tableCell,
    tableRow: s.tableRow,
  }

  const cardsRow = table.getColumn('cardsCount')
  const namesRow = table.getColumn('createdBy')

  return (
    <div>
      <div className={s.tablePage_title}>
        <h1>Packs list</h1>
        <Button>Add New Pack</Button>
      </div>
      <TableHeader
        cardsRow={cardsRow}
        globalFilter={globalFilter}
        namesRow={namesRow}
        setGlobalFilter={setGlobalFilter}
      />

      <table className={classNames.tableBody}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr className={classNames.headerCell} key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th className={classNames.tableCell} colSpan={header.colSpan} key={header.id}>
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
              <tr className={classNames.tableRow} key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td className={classNames.tableCell} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button
          className={''}
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          {'<<'}
        </button>
        <button
          className={''}
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
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0

              table.setPageIndex(page)
            }}
            style={{ background: 'black' }}
            type={'number'}
          />
        </span>
        <select
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
          style={{ background: 'black' }}
          value={table.getState().pagination.pageSize}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
