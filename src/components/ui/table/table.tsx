/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines */
import { useEffect, useMemo, useState } from 'react'

import Arrow from '@/assets/icons/arrow'
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
import Pagination from './pagination/pagination'
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

export type dataType = {
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
        cell: (info: { getValue: () => any }) => (
          <div style={{ alignItems: 'center', display: 'flex', gap: '20px' }}>
            <img
              height={30}
              src={
                'data:image/jpeg;base64,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'
              }
            />
            <span>{info.getValue()}</span>
          </div>
        ),
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
  }, [table])

  const classNames = {
    headerCell: s.headerCell,
    tableBody: s.tableBody,
    tableCell: s.tableCell,
    tableRow: s.tableRow,
  }

  const cardsRow = table.getColumn('cardsCount')
  const namesRow = table.getColumn('createdBy')

  return (
    <>
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
      <Pagination table={table} />
    </>
  )
}
