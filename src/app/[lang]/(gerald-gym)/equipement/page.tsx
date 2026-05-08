import PageEquipement from "@/views/gerald-gym-pages/PageEquipement"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>

      <Grid size={{ xs: 12 }}>
        <PageEquipement />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord

