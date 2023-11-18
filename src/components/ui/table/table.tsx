/* eslint-disable import/no-unresolved */
/* eslint-disable max-lines */
import { InputHTMLAttributes, useEffect, useMemo, useState } from 'react'

import { ChevronUp } from '@/assets/icons'
import * as Slider from '@radix-ui/react-slider'
/* eslint-disable react/jsx-no-comment-textnodes */
import { RankingInfo, compareItems, rankItem } from '@tanstack/match-sorter-utils'
import {
  CellContext,
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  Table,
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
    title: ' a Project A',
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
    createdBy: 'AAlice Johnson',
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
    title: 'Project D',
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
    title: 'Project E',
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
  //   const [data, setData] = useState(dataFrom)
  // const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const memColumns = useMemo<ColumnDef<dataType>[]>(
    () => [
      {
        // accessorFn: prop => <span>{prop.title.}</span>,
        accessorKey: 'title',
        cell: (info: { getValue: () => any }) => info.getValue(),
        // cel: (props: { getValue: () => string }) => props.getValue().slice(0, 4),
        header: 'Name',
        size: 350,
      },
      {
        accessorKey: 'cardsCount',
        cell: (info: { getValue: () => any }) => info.getValue(),

        // cell: props => props.getValue(),
        // footer: props => props.header.id,
        header: 'Cards',
        size: 130,
      },
      {
        accessorKey: 'updated',
        cell: (info: { getValue: () => any }) => info.getValue(),

        // cel: (props: { getValue: () => string }) => props.getValue().replace('-', '.'),
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

  const maxNum = table.getColumn('cardsCount')?.getFacetedMinMaxValues()?.[1] ?? 100
  const minNum = table.getColumn('cardsCount')?.getFacetedMinMaxValues()?.[0] ?? 0
  const [range, setRange] = useState([minNum, maxNum])
  // const { getPageCount, previousPage } = table

  // console.log('🚀 ~ file: table.tsx:262 ~ TableCards ~ previousPage:', previousPage)

  // console.log('🚀 ~ file: table.tsx:262 ~ TableCards ~ getPageCount:', getPageCount())

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

  console.log('🚀 ~ file: table.tsx:331 ~ TableCards ~ maxNum:', maxNum)

  return (
    <div>
      <h1>Table</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
        <DebouncedInput
          onChange={value => setGlobalFilter(String(value))}
          placeholder={'Search all columns...'}
          style={{ background: 'inherit' }}
          value={globalFilter ?? ''}
        />
        <span>{range[0]}</span>
        <Slider.Root
          className={s.SliderRoot}
          max={maxNum}
          min={minNum}
          minStepsBetweenThumbs={1}
          onValueChange={e => {
            setRange(e)
          }}
          onValueCommit={() => {
            //also can make server request
            table.getColumn('cardsCount')?.setFilterValue(range)
          }}
          value={range}
        >
          <Slider.Track className={s.SliderTrack}>
            <Slider.Range className={s.SliderRange} />
          </Slider.Track>
          <Slider.Thumb className={s.SliderThumb} />
          <Slider.Thumb className={s.SliderThumb} />
        </Slider.Root>
        <span>{range[1]}</span>
      </div>
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

      {/* <table className={classNames.tableBody}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  className={classNames.headerCell}
                  key={header.id}
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUp />,
                        desc: <ChevronUp style={{ transform: 'rotate(180deg)' }} />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr className={classNames.tableRow} key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td className={classNames.tableCell} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table> */}
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
            // className={'border p-1 rounded w-16'}
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

function DebouncedInput({
  debounce = 500,
  onChange,
  value: initialValue,
  ...props
}: {
  debounce?: number
  onChange: (value: number | string) => void
  value: number | string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <input {...props} onChange={e => setValue(e.target.value)} value={value} />
}

function Filter({ column, table }: { column: Column<dataType, unknown>; table: Table<dataType> }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === 'number' ? (
    <div>
      <div className={'flex space-x-2'}>
        {/* <DebouncedInput
          className={'w-24 border shadow rounded'}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          onChange={value => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''
          }`}
          type={'number'}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
        /> */}
        {/* <DebouncedInput
          className={'w-24 border shadow rounded'}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          onChange={value => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''
          }`}
          type={'number'}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
        /> */}
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
