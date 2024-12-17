import { useEffect, useState } from 'react'
import axios from 'axios'
import { Controller } from 'react-hook-form'
import {
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Typography
} from '@mui/material'
import { ENDPOINTS } from '@/store/constants/api'
import { useAuthStore } from '@/store/MyStore/AuthStore'

const MemberSelect = ({ form }) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useAuthStore(state => state.user)

  // Function to fetch members from the server
  const fetchMembers = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_MEMBERS_NAMES)
      // console.log('response.data:', response.data)
      setMembers(response.data)
      // console.log('members:', members)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching Members:', error)
      setError('Error fetching Members')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <Controller
      name='Member'
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth variant='outlined' margin='normal'>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color='error'>{error}</Typography>
          ) : (
            <Select
              {...field}
              onChange={e => field.onChange(e.target.value)}
              value={field.value || ''}
              displayEmpty
            >
              <MenuItem value='' disabled>
                Select a member
              </MenuItem>
              {/* Map through Members and display each as a MenuItem */}
              {members.map(member => (
                <MenuItem key={member._id} value={member._id}>
                  {member.NomPrenom}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      )}
    />
  )
}

export default MemberSelect
