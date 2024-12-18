'use client'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {
  fetchMessages,
  sendMessage
} from '@/store/Controller/ChatController'
import { useAuthStore } from '@/store/MyStore/AuthStore'

const SimpleChat = ({ Chat_Id }) => {
  const [messages, setMessagesChat] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(true)
  const currentUser = useAuthStore(state => state.user)

  // Récupération des messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMessages(Chat_Id)
        setMessagesChat(data || [])
      } catch (error) {
        setNotification({
          type: 'error',
          message: 'Erreur lors de la récupération des messages'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [Chat_Id])

  // Envoi d'un message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return
    try {
      const messageData = {
        chatId: Chat_Id,
        senderId: currentUser.id,
        text: newMessage
      }
      console.log('messages avant ')
      console.log(messages)
      const sentMessage = await sendMessage(messageData)

      console.log('sentMessage')
      console.log(sentMessage)
      messages.push(sentMessage)

      console.log('messages apres')

      console.log(messages)
      setNewMessage('')
      setNotification({
        type: 'success',
        message: 'Message envoyé avec succès!'
      })
    } catch (error) {
      setNotification({
        type: 'error',
        message: "Erreur lors de l'envoi du message"
      })
    }
  }

  // Affichage des notifications
  const renderNotification = () => {
    if (!notification.message) return null
    const isError = notification.type === 'error'
    return (
      <Typography
        variant='body2'
        sx={{
          textAlign: 'center',
          backgroundColor: isError ? '#f8d7da' : '#d4edda',
          color: isError ? '#721c24' : '#155724',
          padding: '8px',
          marginBottom: '8px'
        }}
      >
        {notification.message}
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        width: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Notifications */}
      {renderNotification()}

      {/* Chargement */}
      {loading ? (
        <Box
          sx={{
            height: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Zone des messages */}
          <Box
            sx={{
              flexGrow: 1,
              padding: '16px',
              backgroundColor: '#f5f5f5',
              overflowY: 'auto',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {messages && messages.length > 0 ? (
              messages.map(message => {
                if (!message || !message._id) return null
                return (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf:
                        message.sender !== currentUser.id
                          ? 'flex-start'
                          : 'flex-end',
                      backgroundColor:
                        message.sender !== currentUser.id ? '#fff' : '#bbdefb',
                      padding: '8px',
                      borderRadius: '8px',
                      maxWidth: '70%',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <Typography variant='body1'>{message.text}</Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        marginTop: '4px'
                      }}
                    >
                      {message.createdAt}
                    </Typography>
                  </Box>
                )
              })
            ) : (
              <Typography
                variant='body2'
                sx={{ textAlign: 'center', color: '#888' }}
              >
                Aucune conversation trouvée.
              </Typography>
            )}
          </Box>

          {/* Zone d'envoi */}
          <Box
            sx={{
              display: 'flex',
              padding: '8px',
              borderTop: '1px solid #ddd',
              backgroundColor: '#fff'
            }}
          >
            <TextField
              variant='outlined'
              size='small'
              fullWidth
              placeholder='Tapez un message...'
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              sx={{ marginRight: '8px' }}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={handleSendMessage}
            >
              Envoyer
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SimpleChat
