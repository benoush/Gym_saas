import PageAbonnement from "@/views/gerald-gym-pages/PageAbonnement"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>

      <Grid size={{ xs: 12 }}>
        <PageAbonnement />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord



