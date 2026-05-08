'use client'

import type { ReactNode } from 'react'

import { Button, Grid, IconButton, LinearProgress, Typography } from '@mui/material'

import type { ColumnDef } from '@tanstack/react-table'

import TableGeneric from '@/components/gerald-gym/TableGenerique'
import AbonnementTableFilters from './AbonnementTableFilters'


type abonemment = {
  
  monabonnement: string
  case: ReactNode
  description: string
  nombredeseance: number
  delai: string
  prix: number
}

const formatCFA = (montant: string | number) => {
  const num = typeof montant === 'string' ? Number(montant) : montant

  return new Intl.NumberFormat('fr-FR').format(Number(num)) + ' F CFA'
}
const dataAbonnement: abonemment[] = [
  
  {
  case: <i className='tabler-crop-1-1' />,
  monabonnement: 'Mensuel',
  description:'Cet Abonnement vous offre...',
  nombredeseance: 10,
  delai: '31 jours',
  prix: 6000,
  },
    {
  case: <i className='tabler-crop-1-1' />,
  monabonnement: 'Hebdomadaire',
  description:"Profitez d'un acces complete...",
  nombredeseance: 3,
  delai: '07 jours',
  prix: 2000,
  },
   {
  case: <i className='tabler-crop-1-1' />,
  monabonnement: 'Journalier',
  description:'Cet Abonnement vous offre...',
  nombredeseance: 1,
  delai: '1 jours',
  prix: 700,
  },
   
]

const columns: ColumnDef<abonemment>[] = [
  {
    header: 'NOM ABONNEMENT',
    accessorKey: 'monabonnement',
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
    header: 'DESCRIPTION',
    accessorKey: 'description',
    cell: info => <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
  },
  {
    header: 'NOMBRE DE SÉANCE INCLUT	',
    accessorKey: 'nombredeseance',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },
  {
    header: 'DÉLAI DE VALIDITÉ',
    accessorKey: 'delai',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },
  {
    header: 'PRIX DE SOUSCRIPTION',
    accessorKey: 'prix',
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
    header: 'Actions',
    id: 'actions',
    cell: () => (
      <div className='flex items-center gap-2'> 
        <IconButton size='small' aria-label='edit'>
          <i className='tabler-trash' />
        </IconButton>
        <IconButton size='small' aria-label='edit'>
          <i className='tabler-edit text-textSecondary' />
        </IconButton>
         <IconButton size='small' aria-label='view'>
          <i className='tabler-eye text-textSecondary' />
        </IconButton>
      </div>
    )
  }
]

const PageAbonnement = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <div className='mb-5 flex justify-end'>
        <Button variant='contained' startIcon={<i className='tabler-users' />}>Ajouter un Abonnement</Button>
        </div>
        <TableGeneric
          columns={columns}
          data={dataAbonnement}
          titleConfig={{
            title: '',
          }}
          
         
          filtersComponent={<AbonnementTableFilters />}
        />
      </Grid>
    </Grid >
  )
}

export default PageAbonnement
