import PageMembres from "@/views/gerald-gym-pages/PageMembres"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>

      <Grid size={{ xs: 12 }}>
        <PageMembres />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord

