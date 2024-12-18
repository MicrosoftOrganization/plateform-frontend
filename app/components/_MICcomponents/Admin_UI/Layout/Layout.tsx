'use client'
import React, { useState, ReactNode } from 'react'
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '@/mic-component/Admin_UI/SideBar/SideBar'
import { navigationLinks } from '@/mic-component/Admin_UI/SideBar/Links'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar links={navigationLinks} />
      <Box component='main' sx={{ flexGrow: 1, margin: 0, padding: 0 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Layout
