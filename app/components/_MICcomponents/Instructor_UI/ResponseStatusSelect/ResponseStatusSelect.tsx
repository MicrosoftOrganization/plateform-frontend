'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Typography,
  Box
} from '@mui/material'
import axiosInstance from '@/axiosInstance*'
import { toast } from 'react-hot-toast'

export default function ResponseStatusSelect({ idResponse }) {
  const [loading, setLoading] = useState(false)

  const formSchema = z.object({
    responseStatus: z.string().nonempty({ message: 'You must select a status' })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responseStatus: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const response = await axiosInstance.put(
        `response/update/updateStatus/${idResponse}`,
        {
          status: data.responseStatus
        }
      )
      if (response.status === 200) {
        toast.success('Response updated successfully')
      }
    } catch (error) {
      console.error('Error Failed to update:', error)
      toast.error('Failed to update response')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 0
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Response Status Field */}
        <Controller
          name='responseStatus'
          control={form.control}
          render={({ field, fieldState }) => (
            <FormControl fullWidth margin='normal' error={!!fieldState.error}>
              <InputLabel id='response-status-label'>
                Response Status
              </InputLabel>
              <Select
                {...field}
                labelId='response-status-label'
                id='response-status'
                value={field.value || ''}
                onChange={field.onChange}
              >
                <MenuItem value='' disabled>
                  Select a status
                </MenuItem>
                <MenuItem value='AWAITING FOR REVIEW'>
                  AWAITING FOR REVIEW
                </MenuItem>
                <MenuItem value='REVIEWED'>REVIEWED</MenuItem>
                <MenuItem value='APPROVED'>APPROVED</MenuItem>
                <MenuItem value='EDITED'>EDITED</MenuItem>
              </Select>
              <Typography variant='caption' color='error'>
                {fieldState.error?.message}
              </Typography>
            </FormControl>
          )}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
          fullWidth
          variant='contained'
          color='primary'
          sx={{ marginTop: 1 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </Box>
  )
}
