'use client'

import type { ReactNode } from 'react'

import { Button, Grid, IconButton, Typography } from '@mui/material'

import type { ColumnDef } from '@tanstack/react-table'

import Chip from '@/@core/components/mui/Chip'
import MembresTableFilters from './MembresTableFilters'
import TableGeneric from '@/components/gerald-gym/TableGenerique'
import CustomAvatar from '@/@core/components/mui/Avatar'

export enum signalement {
  ACTIF = 'Actif',
  Inactif='Inactif'
}
type propriete = {
  
  infos: string
  case: ReactNode
  telephone: string
  sexe: string
  statutabonnement: signalement
  date: string
  email: string
}



const dataPropriete: propriete[] = [
  
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'F',
  statutabonnement: signalement.Inactif,
  date: '-',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'F',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'F',
  statutabonnement: signalement.Inactif,
  date: '-',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.Inactif,
  date: '-',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'M',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  {
  case: (
    <CustomAvatar
      src='/images/avatars/1.png'
      size={38}
    />
  ),
  infos: 'Jordan Stevenson',
  telephone:'+228 95 25 63 54',
  sexe: 'F',
  statutabonnement: signalement.ACTIF,
  date: '14 Apr 2021,8:43',
  email: 'jordan@gmail.com',
  },
  
  
  
]

const columns: ColumnDef<propriete>[] = [
  {
    header: 'INFOS',
    accessorKey: 'infos',
    cell: info => {
      const user = info.row.original

      return (
        <div className='flex items-center gap-4'>
  <i className='tabler-square' style={{ fontSize: 20 }} />

  {user.case}

  <div className='flex flex-col'>
    <Typography color='textSecondary' className='font-medium'>
      {info.getValue<string>()}
    </Typography>
    <Typography variant='body2'>{user.email}</Typography>
  </div>
</div>
      )
    }
  },
  {
    header: 'TELEPHONE',
    accessorKey: 'telephone',
    cell: info => <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
  },
  {
    header: 'SEXE	',
    accessorKey: 'sexe',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },
  {
    header: 'statutabonnement',
    accessorKey: 'statutabonnement',
    cell: info => (
      <Chip
        size='small'
        variant='tonal'
        label={info.getValue<string>() === signalement.ACTIF ? 'Actif' : 'Inactif' }
        color={info.getValue<string>() === signalement.ACTIF ? 'success' : 'error'}
      />
    )
  },
  
  {
    header: 'DATE EXPIRATION',
    accessorKey: 'date',
    cell: info => (
      <Typography variant='body2' className=''>
        {info.getValue<string>()}
      </Typography>
    )
  },
  
  {
    header: 'Actions',
    id: 'actions',
    cell: () => (
      <div className='flex items-center gap-2'> 
        <IconButton size='small' aria-label='edit'>
          <i className='tabler-trash' />
        </IconButton>
         <IconButton size='small' aria-label='view'>
          <i className='tabler-eye text-textSecondary' />
        </IconButton>
      </div>
    )
  }
]

const PageMembres = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <div className='mb-5 flex justify-end'>
        <Button variant='contained' startIcon={<i className='tabler-plus' />}>Ajouter un Membre</Button>
        </div>
        <TableGeneric
          columns={columns}
          data={dataPropriete}
          titleConfig={{
            title: '',
          }}
          
         
          filtersComponent={<MembresTableFilters />}
        />
        
      </Grid>
    </Grid >
  )
}

export default PageMembres
