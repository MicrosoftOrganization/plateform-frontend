import * as React from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { Box, Grid } from '@mui/material'
import ChatList from '@/mic-component/Chat_UI/ChatList'
import CreateConversationForm from '@/mic-component/Chat_UI/ChatForm/ChatForm'

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '90%', mx: 'auto', mt: 10, mb: 10, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Section ChatList */}
        <Grid xs={12} md={3}>
          <ChatList />
        </Grid>

        {/* Section Formulaire */}
        <Grid xs={12} md={9}>
          <h1>Formulaire de création dune conversation</h1>
          <CreateConversationForm />
        </Grid>
      </Grid>
    </Box>
  )
}
