'use client'
import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSearchParams } from 'next/navigation'
import Empty from '@/mic-component/lottie_animation/Empty'
import { useSessionsStore } from '@/store/MyStore/SessionsStore'

type Session = {
  _id: string
  Title: string
  Date: string
  Instructor: string
  Room: string
  Description: string
}

const Page = () => {
  const sessions = useSessionsStore(state => state.sessions)
  const fetchSessions = useSessionsStore(state => state.fetchSessions)

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage] = useState(5) // Nombre d'éléments par page
  const searchParams = useSearchParams()
  const departmentId = searchParams.get('id_dep') // Récupère l'ID du département

  useEffect(() => {
    const loadSessions = async (departmentId: string) => {
      await fetchSessions(departmentId)
    }
    if (departmentId) {
      loadSessions(departmentId)
    }
  }, [departmentId, fetchSessions])

  // Calculer les éléments pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSessions = sessions
    ? sessions.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Paper
      sx={{
        height: '50%',
        margin: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond blanc avec opacité
        padding: 3, // Padding
        borderRadius: 2, // Coins arrondis
        width: '80%' // Largeur 100% pour qu'il prenne toute la largeur disponible
      }}
      className='mt-[120px]'
    >
      {currentSessions && currentSessions.length > 0 ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={true}
          events={currentSessions.map(session => ({
            title: session.Title || 'Untitled Session',
            start: new Date(session.Date).toISOString(),
            extendedProps: {
              id: session._id,
              instructor: session.Instructor || 'Unknown Instructor',
              room: session.Room || 'No Room Assigned',
              description: session.Description || 'No description available'
            }
          }))}
          eventContent={renderEventContent}
        />
      ) : (
        <div>
          <Empty />
          <Typography variant='h5' className='text-center'>
            No sessions available
          </Typography>
        </div>
      )}
    </Paper>
  )
}

function renderEventContent(eventInfo: any) {
  const { event } = eventInfo
  const { title, start } = event
  const { instructor, room, description } = event.extendedProps
  return (
    <Box
      sx={{
        width: '96%',

        overflow: 'auto',

        justifyContent: 'center',

        padding: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography variant='body2' fontWeight='bold' color='primary'>
        {title}
      </Typography>
      <Typography variant='body2'>
        <strong>Start:</strong> {new Date(start).toLocaleString()}
      </Typography>
      <Typography variant='body2'>
        <strong>Room:</strong> {room}
      </Typography>
      <Typography variant='body2'>
        <strong>Instructor:</strong> {instructor}
      </Typography>
    </Box>
  )
}

export default Page
