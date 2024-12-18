import SimpleChat from '@/mic-component/Chat_UI/ChatConversation/SimpleChat'
import UserResponses from '@/mic-component/Chat_UI/UserResponses/UserResponses'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

export default function ChatPage({ params }) {
  const { chatId } = params // Extraire l'ID dynamique depuis l'URL

  return (
    <div>
      <Box sx={{ width: '100%', padding: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={3}>
            <h1>Responses du member x </h1>
            <p>
              get les reponses par id member (user_id attribut dans la response)
            </p>
            <UserResponses></UserResponses>
          </Grid>

          {/* Section Formulaire */}
          <Grid xs={12} md={9}>
            <h1>La conversation : </h1>
            <h1>Chat Room: {chatId}</h1>
            <p>
              get les messages par id_member & id_instructor à partir de la
              collection des Chat
            </p>
            <SimpleChat Chat_Id={chatId}></SimpleChat>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
