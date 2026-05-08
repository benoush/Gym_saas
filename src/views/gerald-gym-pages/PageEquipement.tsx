import {
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

const equipements = [
  { id: 1, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 2, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 3, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 4, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 5, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 6, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 7, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' },
  { id: 8, image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438' }
]

const bloc1 = equipements.slice(0, 4)
const bloc2 = equipements.slice(4, 8)

const PageEquipement = () => {
  return (
    <Card sx={{ borderRadius: 1 }}>

      <div className='flex items-center justify-between px-6 pt-6'>
        <div>
          <Typography variant='h5' fontWeight='bold'>
            Equipements
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            15 équipement enregistrés au total
          </Typography>
        </div>

        <FormControl size='small' sx={{ minWidth: 250 }}>
          <InputLabel >Toutes les catégories</InputLabel>
          <Select value='' label='Statut' defaultValue=''>
          </Select>
        </FormControl>
      </div>

      <CardContent sx={{ p: 6 }}>

        <Grid container spacing={4} sx={{ mb: 4 }}>
          {bloc1.map(item => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card variant='outlined' sx={{ width: '100%', p: 3 }}>

                <Box
                  component='img'
                  src={item.image}
                  sx={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />

                <CardContent sx={{ px: 0, pb: 0 }}>
                  <Chip label='Musculation' color='success' variant='tonal' />

                  <Typography variant='h5' fontWeight='bold' mb={1}>
                    Haltère de 5 kg
                  </Typography>

                  <Typography variant='body2'>
                    Introductory course for Angular and framework basics
                  </Typography>

                  <Stack direction='row' spacing={1} alignItems='center' mt={2} mb={3}>
                    <i className='tabler-package text-[20px]' />
                    <Typography>10 en stocks</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Button variant='tonal' fullWidth startIcon={<i className='tabler-trash' />}>
                      Supprimer
                    </Button>

                    <Button fullWidth variant='contained' startIcon={<i className='tabler-edit' />}>
                      Modifier
                    </Button>
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          {bloc2.map(item => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card variant='outlined' sx={{ width: '100%', p: 3 }}>

                <Box
                  component='img'
                  src={item.image}
                  sx={{
                    width: '100%',
                    height: 220,
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />

                <CardContent sx={{ px: 0, pb: 0 }}>
                  <Chip label='Musculation' color='success' variant='tonal' />

                  <Typography variant='h5' fontWeight='bold' mb={1}>
                    Haltère de 5 kg
                  </Typography>

                  <Typography variant='body2'>
                    Introductory course for Angular and framework basics
                  </Typography>

                  <Stack direction='row' spacing={1} alignItems='center' mt={2} mb={3}>
                    <i className='tabler-package text-[20px]' />
                    <Typography>10 en stocks</Typography>
                  </Stack>

                  <Stack direction='row' spacing={2}>
                    <Button variant='tonal' fullWidth startIcon={<i className='tabler-trash' />}>
                      Supprimer
                    </Button>

                    <Button fullWidth variant='contained' startIcon={<i className='tabler-edit' />}>
                      Modifier
                    </Button>
                  </Stack>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

      </CardContent>
    </Card>
  )
}

export default PageEquipement
