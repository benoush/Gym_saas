import PageTableauDeBord from "@/views/gerald-gym-pages/PageTableauDeBord"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>

      <Grid size={{ xs: 12 }}>
        <PageTableauDeBord />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord

