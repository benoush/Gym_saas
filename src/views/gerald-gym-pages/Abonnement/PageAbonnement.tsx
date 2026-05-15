'use client'

import { useState, type ReactNode } from 'react'

import { Button, Grid, IconButton, Dialog, DialogContent, Typography, Box, TextField } from '@mui/material'

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

const PageAbonnement = () => {

const [openDelete, setOpenDelete] = useState(false)
const [openEdit, setOpenEdit] = useState(false)

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
        <IconButton size='small' aria-label='edit' onClick={() => setOpenDelete(true)}>
          <i className='tabler-trash' />
        </IconButton>
        <IconButton size='small' aria-label='edit' onClick={() => setOpenEdit(true)}>
          <i className='tabler-edit text-textSecondary' />
        </IconButton>
         <IconButton size='small' aria-label='view'>
          <i className='tabler-eye text-textSecondary' />
        </IconButton>
      </div>
    )
  }
]

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <div className='mb-5 flex justify-end'>
        <Button
  variant='contained'
  startIcon={<i className='tabler-plus' />}
>
  Ajouter un Abonnement
</Button>
        </div>
        <TableGeneric
          columns={columns}
          data={dataAbonnement}
          titleConfig={{
            title: '',
          }}
          filtersComponent={<AbonnementTableFilters />}
        />
        <Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          maxWidth='sm'
          fullWidth
        >
          <DialogContent sx={{ p: 8 }}>
            <Box textAlign='center'>
              <i
                className='tabler-trash'
                style={{
                  fontSize: 55,
                  color: '#ff5722',
                  marginBottom: 20
                }}
              />

              <Typography variant='h4' mb={2}>
                Supprimer un abonnement
              </Typography>

              <Typography color='text.secondary' mb={5}>
                Cette action est irréversible. Voulez-vous continuer ?
              </Typography>

              <Box display='flex' justifyContent='center' gap={3}>
                <Button
                  variant='outlined'
                  color='inherit'
                  onClick={() => setOpenDelete(false)}
                >
                  Annuler
                </Button>

                <Button variant='contained' color='warning'>
                  Continuer
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog
  open={openEdit}
  onClose={() => setOpenEdit(false)}
  maxWidth='md'
  fullWidth
>
  <DialogContent sx={{ p: 6 }}>
    <Typography variant='h4' mb={2}>
      Modifier un abonnement
    </Typography>

    <Typography color='text.secondary' mb={4}>
      Modifiez les informations de cet abonnement
    </Typography>

    <Box display='flex' flexDirection='column' gap={3}>
      <TextField
        fullWidth
        label="Nom de l'abonnement"
        defaultValue='Mensuel'
      />

      <TextField
        fullWidth
        label='Prix de souscription'
        defaultValue={6000}
      />

      <TextField
        fullWidth
        label='Nombre de séance'
        defaultValue={10}
      />

      <Box display='flex' justifyContent='flex-end' gap={2}>
        <Button
          variant='outlined'
          onClick={() => setOpenEdit(false)}
        >
          Annuler
        </Button>

        <Button variant='contained'>
          Mettre à jour
        </Button>
      </Box>
    </Box>
  </DialogContent>
</Dialog>
      </Grid>
    </Grid >
  )
}

export default PageAbonnement
