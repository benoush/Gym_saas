import PageParametre from "@/views/gerald-gym-pages/PageParametre"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>
 
      <Grid size={{ xs: 12 }}>
        <PageParametre />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord

