'use client'

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  TextField
} from '@mui/material'

const salles = [
 { name: 'Salle 1' },
  { name: 'Salle 2' },
  { name: 'Salle 3' },
  { name: 'Salle 4' }
]

const ModificationAbonnement = () => {
  return (
    <Card sx={{ borderRadius: 1 }}>
      <CardHeader
        title='Modifier un abonnement'
        subheader="Customisez une nouvelle formule d'abonnement"
      />

      <CardContent sx={{ p: 6 }}>
        <Box component='form' sx={{ '& .MuiTextField-root': { m: 2 } }}>
          <TextField
            fullWidth
            label="Nom de l'abonnement"
            defaultValue='Mensuel'
            required
          />

          <TextField
            fullWidth
            multiline
            rows={5}
            label='Description'
            defaultValue="Décrivez ce qu'il y a à savoir à propos de cet abonnement"
            required
          />

          <TextField
            fullWidth
            label='Nombre de séance inclut'
            type='number'
            defaultValue={10}
            required
          />

          <TextField
            fullWidth
            label='Délai de validité (jours)'
            type='number'
            defaultValue={30}
            required
          />

          <TextField
            fullWidth
            label='Prix de souscription (FCFA)'
            type='number'
            defaultValue={15000}
            required
          />

          <TextField
            fullWidth
            label='Message par rapport au prix (optionnel)'
            defaultValue='Le plan standard pour ceux qui veulent économiser'
          />

          <TextField
            fullWidth
            select
            label="Salle autorisé d'accès (optionnel)"
            defaultValue='Salle 1'
          >
            {salles.map(option => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <Box m={4} display='flex' justifyContent='flex-end'>
            <div className='flex gap-3'>
              <Button variant='outlined' color='inherit'>
                Annuler
              </Button>

              <Button
                variant='contained'
                >
                Enregistrer
              </Button>
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ModificationAbonnement
