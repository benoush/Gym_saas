import PagePaiement from "@/views/gerald-gym-pages/PagePaiement"
import { Grid } from "@mui/material"

const TableauDeBord
 = () => {
  return (
    <Grid container spacing={6}>

      <Grid size={{ xs: 12 }}>
        <PagePaiement />
      </Grid>

    </Grid>
  )
}

export default TableauDeBord

