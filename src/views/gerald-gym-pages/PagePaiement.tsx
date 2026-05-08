'use client'

import type { ReactNode } from 'react'

import { Button, FormControl, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, Typography } from '@mui/material'

import type { ColumnDef } from '@tanstack/react-table'
import TableGeneric from '@/components/gerald-gym/TableGenerique'



type paiement = {
  
  membre: string
  case: ReactNode
  date: string
  montant: number
  moyendepaiement: string
  numero: string
}

const formatCFA = (montant: string | number) => {
  const num = typeof montant === 'string' ? Number(montant) : montant

  return new Intl.NumberFormat('fr-FR').format(Number(num)) + ' F CFA'
}
const dataPaiement: paiement[] = [
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Joshua Mohamed',
  date:'24 avr 2026',
  montant: 700,
  moyendepaiement: 'cash',
  numero: '-',
  },
    {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Joshua Mohamed',
  date:'24 avr 2026',
  montant: 700,
  moyendepaiement: 'cash',
  numero: '-',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Damien Liliard',
  date:'24 avr 2026',
  montant: 2000,
  moyendepaiement: 'Mixx By Yas',
  numero: '+228 98658932',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Carlos Amegran',
  date:'24 avr 2026',
  montant: 15000,
  moyendepaiement: 'cash',
  numero: '-',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Joshua Mohamed',
  date:'24 avr 2026',
  montant: 5000,
  moyendepaiement: 'Flooz',
  numero: '+228 98658932',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Dos Santos',
  date:'24 avr 2026',
  montant: 5000,
  moyendepaiement: 'Mixx By Yas',
  numero: '+228 98658932',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Peter Maga',
  date:'24 avr 2026',
  montant: 5000,
  moyendepaiement: 'Cash',
  numero: '-',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Kodjo Midoua',
  date:'24 avr 2026',
  montant: 6000,
  moyendepaiement: 'Mixx By Yas',
  numero: '+228 98658932',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Peter Maga',
  date:'24 avr 2026',
  montant: 5000,
  moyendepaiement: 'Cash',
  numero: '-',
  },
  {
  case: <i className='tabler-crop-1-1' />,
  membre: 'Kodjo Midoua',
  date:'24 avr 2026',
  montant: 6000,
  moyendepaiement: 'Mixx By Yas',
  numero: '+228 98658932',
  },

]

const columns: ColumnDef<paiement>[] = [
  {
    header: 'MEMBRE CONCERNÉ',
    accessorKey: 'membre',
    cell: info => {
      const user = info.row.original

      return (
        <div className='flex items-center gap-4'>
          <span>
        {user.case}
        </span>

          <div className='flex flex-col'>
            <Typography color='textSecondary' className='font-medium'>
              {info.getValue<string>()}
            </Typography>
          </div>
        </div>
      )
    }
  },
  {
    header: 'DATE DE PAIEMENT',
    accessorKey: 'date',
    cell: info => <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
  },
  {
    header: 'MONTANT',
    accessorKey: 'montant',
    cell: info => {
      const val = info.getValue<number>()

      return (
        <Typography variant='body2' color={val !== 0 ? 'success' : 'textSecondary'}>
          {val !== 0 ? formatCFA(info.getValue<number>()) : '—'}{' '}
        </Typography>
      )
    }
  },
  {
    header: 'MOYEN DE PAIEMENT',
    accessorKey: 'moyendepaiement',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },
  {
    header: 'NUMÉRO DE TRANSACTION',
    accessorKey: 'numero',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },

]

const PagePaiement = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <TableGeneric
          columns={columns}
          data={dataPaiement}
          titleConfig={{
            title: 'Historique des paiements',
            subheader:'',
          }}
          titleAction={
  <FormControl size='small' sx={{ minWidth: 250 }}>
    <InputLabel>Moyen de paiements</InputLabel>
    <Select
      value=''
      label="Moyen de paiements"
    >
    </Select>
  </FormControl>
          }
        />
      </Grid>
    </Grid >
  )
}

export default PagePaiement
