import React from 'react'
import { Controller } from 'react-hook-form'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/fr'
import dayjs from 'dayjs'

dayjs.locale('fr')

function DatePickerFormField({ form }) {
  return (
    <Controller
      name='DueDate' // Assure-toi que le nom correspond au schéma Zod et au formulaire
      control={form.control}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fr'>
          <DateTimePicker
            label="Date d'échéance"
            value={field.value ? dayjs(field.value) : null} // Convertir la valeur en dayjs si elle existe
            onChange={newValue => {
              if (newValue) {
                // Formatter la date au format "DD/MM/YYYY HH:mm"
                const formattedDate = dayjs(newValue).format('DD/MM/YYYY HH:mm')
                console.log('Date sélectionnée formatée :', formattedDate)
                field.onChange(formattedDate) // Envoyer la date formatée au formulaire
              } else {
                field.onChange(null)
              }
            }}
            ampm={false} // Désactiver le format AM/PM pour utiliser 24h
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!fieldState.error,
                helperText: fieldState.error?.message // Affiche le message d'erreur
              }
            }}
          />
        </LocalizationProvider>
      )}
    />
  )
}

export default DatePickerFormField
