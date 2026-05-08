// components/DataTable.tsx
'use client'

import { Card, CardHeader, Button } from '@mui/material'
import { ColumnDef, useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, flexRender, FilterFn } from '@tanstack/react-table'
import Link from 'next/link'
import { useState } from 'react'
import classnames from 'classnames'
import tableStyles from '@core/styles/table.module.css'


import TablePaginationComponent from '../TablePaginationComponent'
import { rankItem } from '@tanstack/match-sorter-utils'

interface DataTableProps<T> {
  data: T[]
  titleConfig: {
    title: string
    subheader?: string
  }
  columns: ColumnDef<T>[]
  addButtonConfig?: {
    label: string
    href: string
    startIcon: string
  }
  filtersComponent?: React.ReactNode
  emptyMessage?: string
  defaultPageSize?: number
}


const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DataTable = <T,>({
  data,
  titleConfig,
  columns,
  addButtonConfig,
  filtersComponent,
  emptyMessage = 'Aucune donnée disponible',
  defaultPageSize = 10
}: DataTableProps<T>) => {
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: data as any[],
    columns: columns as any,
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: defaultPageSize } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter
    }
  })

  return (
    <Card>
      <div className='flex flex-wrap justify-between gap-4 pr-6'>
        <CardHeader
          title={titleConfig.title}
          subheader={titleConfig.subheader}
        />
        <div className='flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>

          {addButtonConfig && (
            <Button
              variant='contained'
              component={Link}
              href={addButtonConfig.href}
              startIcon={<i className={addButtonConfig.startIcon} />}
            >
              {addButtonConfig.label}
            </Button>
          )}
        </div>

      </div>

      {filtersComponent}

      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center py-12'>
                  {emptyMessage}
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.slice(0, table.getState().pagination.pageSize).map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <TablePaginationComponent table={table} />
    </Card>
  )
}

export default DataTable
