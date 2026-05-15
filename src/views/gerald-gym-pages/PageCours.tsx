'use client'

import { useState, type ReactNode } from 'react'

import {
  Button,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@mui/material'

import type { ColumnDef } from '@tanstack/react-table'

import TableGeneric from '@/components/gerald-gym/TableGenerique'
import AbonnementTableFilters from './Abonnement/AbonnementTableFilters'

type cours = {
  titre: string
  case: ReactNode
  description: string
  mots: string
  categorie: string
 
}

const dataCours: cours[] = [
  {
    case: <i className='tabler-crop-1-1' />,
    titre: 'Nutrition Sportive : Guide Pratique',
    description: 'Cet Abonnement vous offre...',
    mots: 'nutrition, sport, guide',
    categorie: 'nutrition',
  },
  {
    case: <i className='tabler-crop-1-1' />,
    titre: 'Nutrition Sportive : Guide Pratique',
    description: "Cet Abonnement vous offre...",
    mots: 'nutrition, sport, guide',
    categorie: 'nutrition',
  },
  {
    case: <i className='tabler-crop-1-1' />,
    titre: 'Nutrition Sportive : Guide Pratique',
    description: 'Cet Abonnement vous offre...',
    mots: 'nutrition, sport, guide',
    categorie: 'nutrition',
  }
]

const ActionMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleOpen}>
        <i className='tabler-dots-vertical' />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <i className='tabler-eye mr-2' />
          Voir
        </MenuItem>
        
        <MenuItem onClick={handleClose}>
          <i className='tabler-arrow-bar-to-down mr-2' />
          Télécharger
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <i className='tabler-edit mr-2' />
          Modifier
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <i className='tabler-trash mr-2' />
          Supprimer
        </MenuItem>
      </Menu>
    </>
  )
}

const columns: ColumnDef<cours>[] = [
  {
    header: 'NOM ABONNEMENT',
    accessorKey: 'titre',
    cell: info => {
      const user = info.row.original

      return (
        <div className='flex items-center gap-4'>
          <span>{user.case}</span>

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
    cell: info => (
      <Typography variant='body2'>
        {info.getValue<string>()}
      </Typography>
    )
  },
  {
    header: 'MOTS CLÉS',
    accessorKey: 'mots',
    cell: info => (
      <Typography variant='body2'>
        {info.getValue<number>()}
      </Typography>
    )
  },
  {
    header: 'CATÉGORIE',
    accessorKey: 'categorie',
    cell: info => (
      <Typography variant='body2'>
        {info.getValue<string>()}
      </Typography>
    )
  },
  
  {
    header: 'Actions',
    id: 'actions',
    cell: () => <ActionMenu />
  }
]

const PageCours = () => {
  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <div className='mb-5 flex justify-end'>
          <Button
            variant='contained'
            startIcon={<i className='tabler-plus' />}
          >
            Ajouter un Cours
          </Button>
        </div>

        <TableGeneric
          columns={columns}
          data={dataCours}
          titleConfig={{
            title: ''
          }}
          filtersComponent={<AbonnementTableFilters />}
        />
      </Grid>
    </Grid>
  )
}

export default PageCours
