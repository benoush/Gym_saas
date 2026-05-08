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
      
      <Box p={6}>
      <Box textAlign="center" mb={6}>
          <Typography variant='h4' align='center' fontWeight={700}>
            Bienvenue Gerald Gym !
          </Typography>
        
          <Typography align='center' color='text.secondary'>
            Gérer sereinement votre salle de sport
          </Typography>
        </Box>
        <Grid container spacing={4}>

          <Grid size={{xs:12, md:6}} >
            <Card variant='outlined' sx={{ borderRadius: 2, p: 3 }}>
              <Box display='flex' alignItems='center' gap={2} mb={3}>
                <i className='tabler-gift' style={{ fontSize: 22 }} />

                <Box>
                  <Typography fontWeight={600}>
                    Créer un nouveau forfait
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Définissez des offres adaptées à vos clients.
                  </Typography>
                </Box>
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
            <Card variant='outlined' sx={{ borderRadius: 2, p: 3 }}>
              <Box display='flex' alignItems='center' gap={2} mb={3}>
                <i className='tabler-user-plus' style={{ fontSize: 22 }} />

                <Box>
                  <Typography fontWeight={600}>
                    Ajouter un membre
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Invitez un nouveau membre à rejoindre votre salle.
                  </Typography>
                </Box>
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
            <Card variant='outlined' sx={{ borderRadius: 2, p: 3 }}>
              <Box display='flex' alignItems='center' gap={2} mb={3}>
                <i className='tabler-barbell' style={{ fontSize: 22 }} />

                <Box>
                  <Typography fontWeight={600}>
                    Ajouter un équipement
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Gérez les équipements disponibles dans votre espace.
                  </Typography>
                </Box>
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
            <Card variant='outlined' sx={{ borderRadius: 2, p: 3 }}>
              <Box display='flex' alignItems='center' gap={2} mb={3}>
                <i className='tabler-school' style={{ fontSize: 22 }} />

                <Box>
                  <Typography fontWeight={600}>
                    Créer un nouveau cours
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Ajoutez un cours et commencez à former vos utilisateurs.
                  </Typography>
                </Box>
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
