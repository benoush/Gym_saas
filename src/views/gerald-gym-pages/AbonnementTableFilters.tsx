// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material'
import { FormControl, InputAdornment, InputLabel, Select, Typography } from '@mui/material'

import DebouncedInput from '@/components/gerald-gym/DebounceInput'

// Component Imports

const AbonnementTableFilters = () => {
  const [globalFilter, setGlobalFilter] = useState('')
  const [type, setType] = useState('')

  return (
    <CardContent>
       <Grid container alignItems="center">

  <Grid sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Typography sx={{ fontWeight: 600 }}>
    Afficher
  </Typography>
    <FormControl size='small' sx={{ minWidth: 70 }}>
      <InputLabel>10</InputLabel>
      <Select
        value={type}
        label='Type'
        onChange={(e: SelectChangeEvent) => setType(e.target.value)}
      >
        <MenuItem value=''>Tout</MenuItem>
        <MenuItem value='1'>1</MenuItem>
        <MenuItem value='2'>2</MenuItem>
      </Select>
    </FormControl>
    
  </Grid>

  <Grid sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>

    <DebouncedInput
      value={globalFilter}
      onChange={value => setGlobalFilter(String(value))}
      placeholder='Rechercher...'
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <i className='tabler-search' />
            </InputAdornment>
          )
        }
      }}
    />
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default AbonnementTableFilters



