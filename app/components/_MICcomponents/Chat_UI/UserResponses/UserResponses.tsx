import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const UserResponses = () => {
  // Données statiques
  const userId = '6716f0b8441f6a944c5886e9'
  const responses = [
    {
      _id: '1',
      content: 'Voici ma réponse attention à ne pas supprimer 1.',
      user_id: '6716f0b8441f6a944c5886e9',
      assignment_id: '6718fb52cb7f4be7e1e77151',
      status: 'SUBMITTED'
    },
    {
      _id: '2',
      content: 'Voici ma réponse attention à ne pas supprimer 2.',
      user_id: '6716f0b8441f6a944c5886e9',
      assignment_id: '6718fb52cb7f4be7e1e77152',
      status: 'EDITED'
    },
    {
      _id: '3',
      content: "Ceci est une réponse d'un autre utilisateur.",
      user_id: '6719042ecb7f4be7e1e77158',
      assignment_id: '6718fb52cb7f4be7e1e77153',
      status: 'SUBMITTED'
    }
  ]

  // Filtrer les réponses pour l'utilisateur spécifique
  const userResponses = responses.filter(
    response => response.user_id === userId
  )

  return (
    <Box sx={{ width: '80%', margin: '0 auto', padding: 2 }}>
      <Typography variant='h5' gutterBottom>
        Réponses de lutilisateur
      </Typography>
      <List
        sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 1 }}
      >
        {userResponses.map((response, index) => (
          <React.Fragment key={response._id}>
            <ListItem>
              <ListItemText
                primary={`Réponse ${index + 1}`}
                secondary={
                  <>
                    <Typography variant='body1'>{response.content}</Typography>
                    <Typography
                      variant='caption'
                      sx={{
                        color: response.status === 'EDITED' ? 'orange' : 'green'
                      }}
                    >
                      Statut : {response.status}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < userResponses.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default UserResponses
