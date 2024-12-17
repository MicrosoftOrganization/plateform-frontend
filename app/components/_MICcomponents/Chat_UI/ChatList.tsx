'use client'
import React, { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import { fetchChats } from '@/store/Controller/ChatController'
import { Typography } from '@mui/material'

const ChatList = () => {
  const [instructorChats, setInstructorChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = useAuthStore(state => state.user)
  // const [User_Id] = useState(user.id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorChats = await fetchChats(user.id)
        setInstructorChats(instructorChats || [])
      } catch (error) {
        setError('Erreur lors de la récupération des chats')
        console.error(error)
      } finally {
        setLoading(false) // Terminer le chargement
      }
    }
    fetchData()
  }, [fetchChats])

  if (loading) {
    return <div>Chargement des conversations...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div
      className='rounded-lg'
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond blanc transparent
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre pour donner de la profondeur
        borderRadius: '8px' // Coins arrondis
      }}
    >
      <Typography
        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
        variant='h6'
        sx={{
          padding: '5px'
        }}
      >
        <h1>Conversations de instructeur</h1>
      </Typography>

      {instructorChats?.length == 0 || instructorChats == undefined ? (
        <Typography>Aucune conversation trouvée.</Typography>
      ) : (
        <ul>
          {instructorChats.map(chat => (
            <li key={chat._id} style={{ marginBottom: '20px' }}>
              <h3>Chat avec Membre : {chat.Member.NomPrenom}</h3>
              <p>
                Date de création : {new Date(chat.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ChatList
