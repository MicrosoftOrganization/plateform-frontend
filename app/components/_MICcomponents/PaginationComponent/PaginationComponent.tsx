import React from 'react'
import { Button, Pagination, Box } from '@mui/material'

const PaginationComponent = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      mt={4}
      mb={0}
    >
      <Button
        variant='contained'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          marginRight: 2,
          backgroundColor: '#0B6363',
          '&:hover': {
            backgroundColor: '#094d4d'
          }
        }}
      >
        Previous
      </Button>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        sx={{
          '& .MuiPaginationItem-root': {
            color: '#0B6363'
          },
          '& .Mui-selected': {
            backgroundColor: '#0B6363',
            color: 'white'
          }
        }}
      />

      <Button
        variant='contained'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          marginLeft: 2,
          backgroundColor: '#0B6363',
          '&:hover': {
            backgroundColor: '#094d4d'
          }
        }}
      >
        Next
      </Button>
    </Box>
  )
}

export default PaginationComponent
