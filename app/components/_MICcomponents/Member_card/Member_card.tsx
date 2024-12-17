import React from 'react'

import { Card, CardContent, Avatar, Typography, Box } from '@mui/material'

const Member_card = ({ member }) => {
  return (
    <Card
      sx={{
        maxWidth: 200,
        margin: '20px auto',
        boxShadow: 3,
        borderRadius: '20px',
        padding: '5px 5px'
      }}
    >
      {/* Partie supérieure : Image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2px'
        }}
      >
        <Avatar
          alt={`${member.NomPrenom} ${member.ImageLink}`}
          src={member.ImageLink}
          sx={{ width: 120, height: 120, border: '6px solid #3f51b5' }}
        />
      </Box>
      {/* Partie inférieure : Infos */}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography gutterBottom variant='h6' component='div'>
          {member.NomPrenom}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Classe: {member.className}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Member_card
