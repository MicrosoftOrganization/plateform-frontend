// components/ContentComponent.tsx
import React, { ReactNode } from 'react'
import { Typography, Box } from '@mui/material'

interface ContentComponentProps {
  title: string
  children: ReactNode
}

const ContentComponent: React.FC<ContentComponentProps> = ({
  title,
  children
}) => {
  return (
    <Box component='main' sx={{ flexGrow: 1, padding: 0 }}>
      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export default ContentComponent
