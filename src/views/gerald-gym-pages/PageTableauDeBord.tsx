import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Box,
  Typography,
  Button
} from "@mui/material"

const PageTableauDeBord = () => {
  return (
      
      <Box p={6} maxWidth='900px' mx='auto'>
      <Box textAlign="center" mb={6}>
          <Typography variant='h3' align='center' fontWeight={800}>
            Bienvenue Gerald Gym !
          </Typography>
        
          <Typography align='center' color='text.secondary'className="mt-3">
            Gérer sereinement votre salle de sport
          </Typography>
        </Box>
        <Grid container spacing={4}>

          <Grid size={{xs:12, md:6}} >
            <Card variant='outlined' sx={{ borderRadius: 1, p: 5,  }}>
              <Box mb={3}>
                <Box mb={2}>
                <i className='tabler-gift' style={{ fontSize: 22 }} />

                </Box>
                  <Typography fontWeight={800}>
                    Créer un nouveau forfait
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Définissez des offres adaptées à vos clients.
                  </Typography>
                
              </Box>

              <Button
                variant='contained'
                size='small'
                
                endIcon={<i className="tabler-chevron-right" />}
              >
                Créer un forfait
              </Button>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Card variant='outlined' sx={{ borderRadius: 1, p: 5, }}>
              <Box mb={3}>
                <Box mb={2}>
                <i className='tabler-user-plus' style={{ fontSize: 22 }} />

                </Box>
                  <Typography fontWeight={800}>
                    Ajouter un membre
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Invitez un nouveau membre à rejoindre votre salle.
                  </Typography>
              </Box>

              <Button
                variant='contained'
                size='small'
                
                endIcon={<i className="tabler-chevron-right" />}
              >
                Ajouter un membre
              </Button>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Card variant='outlined' sx={{ borderRadius: 1, p: 5, }}>
              <Box mb={3}>
                <Box mb={2}>
                <i className='tabler-barbell' style={{ fontSize: 22 }} />

                </Box>
                  <Typography fontWeight={800}>
                    Ajouter un équipement
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Gérez les équipements disponibles dans votre espace.
                  </Typography>
                
              </Box>

              <Button
                variant='contained'
                size='small'
                
                endIcon={<i className="tabler-chevron-right" />}
              >
                Ajouter un équipement
              </Button>
            </Card>
          </Grid>

          <Grid size={{xs:12, md:6}}>
            <Card variant='outlined' sx={{ borderRadius: 1, p: 5,}}>
              <Box mb={3}>
                <Box mb={2}>
                <i className='tabler-school' style={{ fontSize: 22 }} />
              </Box>
                  <Typography fontWeight={800} mb={1}>
                    Créer un nouveau cours
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Ajoutez un cours et commencez à former vos utilisateurs.
                  </Typography>          
              </Box>

              <Button
                variant='contained'
                size='small'
                
                endIcon={<i className="tabler-chevron-right" />}
              >
                Créer un cours
              </Button>
            </Card>
          </Grid>

        </Grid>
      </Box>
  )
}

export default PageTableauDeBord
