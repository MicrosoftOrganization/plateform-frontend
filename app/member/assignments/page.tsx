'use client'
import React, { useEffect, useState } from 'react'

import { Button, Grid, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import AssignmentCard from '@/mic-component/assignment_UI/AssignmentCard'
import Empty from '@/mic-component/lottie_animation/Empty'
import PaginationComponent from '@/mic-component/PaginationComponent/PaginationComponent'
import Accordion from '@/mic-component/InstructorAccordion/Accordion'

const Page = () => {
  const assignments = useAssignmentStore(state => state.assignments)
  const fetchAssignments = useAssignmentStore(state => state.fetchAssignments)
  const searchParams = useSearchParams()
  const id_dep = searchParams.get('id_dep') // Récupérer id_dep depuis les query params

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Nombre d'éléments par page

  useEffect(() => {
    const loadAssignments = async () => {
      await fetchAssignments(id_dep) // ID de département
    }

    loadAssignments()
  }, [fetchAssignments])

  // Calculer les assignments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAssignments = assignments
    ? assignments.slice(indexOfFirstItem, indexOfLastItem)
    : []

  const handlePageChange = newPage => {
    setCurrentPage(newPage)
  }
  const router = useRouter()

  return (
    <div className='container mx-auto mt-32'>
      <div className='grid grid-cols-4 gap-4 px-10'>
        <div className='col-span-3'>
          <div>
            <Typography variant='h5' className='mb-4 text-center font-mono'>
              Assignments
            </Typography>
          </div>

          {currentAssignments.length > 0 ? (
            currentAssignments.map(assignment => (
              <Grid item xs={12} key={assignment._id}>
                <AssignmentCard
                  assignment={{
                    _id: assignment._id,
                    Title: assignment.Title,
                    DueDate: assignment.DueDate,
                    description: assignment.Description,
                    Attachments: assignment.Attachments
                  }}
                />
                {/* Pagination */}
              </Grid>
            ))
          ) : (
            <div className='flex h-full flex-col items-center justify-center'>
              <Empty />
              <h3 className='mb-4 mt-4 font-mono text-xl'>
                No Assignments Found
              </h3>
            </div>
          )}
        </div>
        <div className='col-span-1'>
          <Button
            onClick={() => router.push(`/Member/sessions?id_dep=${id_dep}`)}
            className='m-3 rounded-md bg-gradient-to-r from-secondary to-primary text-white'
          >
            GO TO SESSIONS
          </Button>
          <Accordion />
          <PaginationComponent
            currentPage={currentPage}
            totalItems={assignments ? assignments.length : 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
