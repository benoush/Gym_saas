'use client'

import { Card, CardHeader, Typography } from '@mui/material'

import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

import tableStyles from '@core/styles/table.module.css'

type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  titleConfig: {
    title: string
    subheader?: string
  }
  titleAction?: React.ReactNode
  buttonConfig?: React.ReactNode
  filtersComponent?: React.ReactNode
}

const TableGeneric = <T extends object>({
  columns,
  data,
  titleConfig,
  titleAction,
  buttonConfig,
  filtersComponent,
  
}: DataTableProps<T>) => {

  const fuzzyFilter: FilterFn<T> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)

    addMeta({ itemRank })

    return itemRank.passed
  }

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter
    }
  })

  return (
    <Card>

      <CardHeader
        title={titleConfig.title}
        subheader={titleConfig.subheader}
        action={<div className='flex items-center gap-3'>
      {titleAction}
      {buttonConfig}
    </div>}
      />
      {filtersComponent}

      <div className='overflow-x-auto'>

        <table className={tableStyles.table}>

          <thead className='uppercase'>
  {table.getHeaderGroups().map(headerGroup => (
    <tr key={headerGroup.id} className='border-be bg-black text-white'>
      {headerGroup.headers.map(header => (
        <th
          key={header.id}
          className='leading-6 plb-4 pli-2 pl-6 text-white font-semibold !bg-black'
        >
          {flexRender(
            header.column.columnDef.header,
            header.getContext()
          )}
        </th>
      ))}
    </tr>
  ))}
</thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='pli-2 plb-3 pie-6 pl-6'>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
        <Typography
  variant='body2'
  color='text.secondary'
  sx={{ p: 4, textAlign: '' }}
>
  Affichage de {data.length} entrées
</Typography>
      </div>
    </Card>
  )
}

export default TableGeneric
