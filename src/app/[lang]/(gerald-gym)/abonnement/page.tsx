
"use client"
import { useState } from "react"
import { Grid, Tabs, Tab, Box } from "@mui/material"
import PageAbonnement from "@/views/gerald-gym-pages/Abonnement/PageAbonnement"
import FormsAbonnement from "@/views/gerald-gym-pages/Abonnement/FormsAbonnement"
import ModificationAbonnement from "@/views/gerald-gym-pages/Abonnement/ModificationAbonnement"

// Exemple autres pages
const PageClients = () => <div>Clients</div>
const PageStatistiques = () => <div>Statistiques</div>

const TableauDeBord = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid container spacing={6}>
      
      <Grid size={{ xs: 12 }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Abonnements" />
            <Tab label="Creer un abonnement" />
            <Tab label="Modifier un abonnement" />
          </Tabs>
        </Box>

        {/* Contenu des tabs */}
        <Box sx={{ mt: 3 }}>
          {value === 0 && <PageAbonnement />}
          {value === 1 && <FormsAbonnement />}
          {value === 2 && <ModificationAbonnement />}
        </Box>

      </Grid>

    </Grid>
  )
}

export default TableauDeBord
