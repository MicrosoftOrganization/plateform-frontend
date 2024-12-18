import React, { useState, useEffect } from 'react'
import { Response } from './../../../store/Models/Response'

import {
  Button,
  Typography,
  Grid,
  CardContent,
  Card,
  TextField,
  IconButton,
  Stack
} from '@mui/material'
import { useResponseStore } from '@/store/MyStore/ResponseStore'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import BorderColorIcon from '@mui/icons-material/BorderColor'

const ResponseSearch = ({ Assignment_Id }) => {
  const {
    fetchResponseByAssignmentAndUser,
    updateResponseByMember,
    fetchedResponse
  } = useResponseStore()
  const user = useAuthStore(state => state.user)
  const [userId, setUserId] = useState(user.id)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await fetchResponseByAssignmentAndUser(Assignment_Id, userId)
    }

    fetchData()
  }, [Assignment_Id, userId, fetchResponseByAssignmentAndUser])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(fetchedResponse.Content)
  }

  const handleSave = async () => {
    await updateResponseByMember({
      ...fetchedResponse,
      Content: editedContent,
      status: 'EDITED'
    })
    setIsEditing(false)
  }

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      {fetchedResponse && (
        <Card
          className='w-full rounded-md bg-gray-100'
          elevation={0}
          style={{ width: '100%' }}
        >
          {/*  bg-gray-100 a mettre ou à supprimer */}
          <CardContent>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item xs={8}>
                <div className='flex-1 text-start' style={{ width: '100%' }}>
                  {!isEditing ? (
                    <>
                      <Typography
                        variant='h5'
                        className='text-start text-lg font-extrabold'
                      >
                        {fetchedResponse.Content}
                      </Typography>
                      <Typography
                        variant='subtitle2'
                        className='text-sm text-gray-500'
                      >
                        {new Date(fetchedResponse.createdAt).toLocaleString()}
                      </Typography>
                    </>
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                    />
                  )}
                </div>
              </Grid>

              <Grid item xs={4}>
                <Grid
                  container
                  direction='column'
                  spacing={1}
                  alignItems='flex-end'
                >
                  {/* Statut */}
                  <Grid item>
                    <Button
                      variant='outlined'
                      color={
                        fetchedResponse.status === 'APPROVED'
                          ? 'success'
                          : fetchedResponse.status === 'AWAITING FOR REVIEW'
                            ? 'error'
                            : 'warning'
                      }
                      style={{ minWidth: '150px' }}
                    >
                      {fetchedResponse.status}
                    </Button>
                  </Grid>

                  <Grid item>
                    <Stack direction='row' spacing={1}>
                      <IconButton onClick={handleEdit} aria-label='edit'>
                        <BorderColorIcon />
                      </IconButton>
                      {isEditing && (
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {!fetchedResponse && (
        <Typography className='text-red-600'>
          No response found for the given Assignment.
        </Typography>
      )}
    </div>
  )
}

export default ResponseSearch
