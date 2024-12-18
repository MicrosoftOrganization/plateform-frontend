import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import RoomIcon from '@mui/icons-material/Room'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

interface SessionCardProps {
  session: {
    _id: string
    Title: string
    Description: string
    Instructor: string
    Date: string
    createdAt: string
    Room?: string
  }
  onDelete: (id: string) => void
  onEdit: (id: string) => void
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onDelete,
  onEdit
}) => {
  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
      <CardContent>
        {/* Title */}
        <Typography variant='h5' component='div' gutterBottom>
          {session.Title}
        </Typography>

        {/* Description */}
        <Typography variant='body1' color='text.secondary' gutterBottom>
          {session.Description}
        </Typography>

        {/* Instructor */}
        <Typography variant='body2' color='text.secondary'>
          <strong>Instructor : </strong> {session.Instructor}
        </Typography>

        {/* Session Date */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <EventIcon sx={{ mr: 1 }} />
          <Typography variant='body2' color='text.secondary'>
            <strong>Date: </strong> {session.Date}
          </Typography>
        </Box>

        {/* Room */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <RoomIcon sx={{ mr: 1 }} />
          <Typography variant='body2' color='text.secondary'>
            <strong>Room: </strong> {session.Room}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant='contained' color='primary'>
            Participer
          </Button>
          <Box>
            {/* Edit Button */}
            <IconButton color='primary' onClick={() => onEdit(session._id)}>
              <EditIcon />
            </IconButton>

            {/* Delete Button */}
            <IconButton color='error' onClick={() => onDelete(session._id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SessionCard
