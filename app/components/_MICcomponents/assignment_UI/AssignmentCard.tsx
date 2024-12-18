'use client'
import '@/app/global.css'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDisclosure, Button } from '@nextui-org/react'
import AssignmentModal from '@/mic-component/assignment_UI/AssignmentModal'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'
// Component: AssignmentCardForMember
interface AssignmentCardProps {
  assignment: {
    _id: string
    Title: string
    DueDate: string
    description: string
    Attachments: string[]
  }
}

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const HandleNavigate = (id: string, event: React.MouseEvent) => {
    event.preventDefault() // Empêche la navigation par défaut

    localStorage.setItem('selectedAssignmentId', id)
    window.location.href = '/instructor/responses'
  }
  useEffect(() => {
    // Récupère l'ID de l'assignement du localStorage dans la page de destination
    const selectedId = localStorage.getItem('selectedAssignmentId')
    console.log('Updated selectedAssignmentId:', selectedId)
  }, [])

  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-11/12 flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center leading-loose'>
        <div>
          <h5 className='font-extrabold text-2xl text-slate-700'>{assignment.Title}</h5>
          <h6 className='text-sm text-gray-500'>{assignment.DueDate}</h6>
      <div className='richtext-container p-4' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(assignment.description) }} />
      
        </div>
      </div>
      <div className='flex items-end justify-end mt-4'>
        <div className=''>
          <Button
            onPress={onOpen}
            className='h-full w-32 text-basis p-3 cursor-pointer rounded-full bg-MIC text-white'
          >
            See More
          </Button>
        </div>
      </div>

      <AssignmentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        instructor={assignment.Title}
        assignmentId={assignment._id}
        date={assignment.DueDate}
        content={assignment.description}
        resources={assignment.Attachments}
        imageUrl='/images/Member/JohnDoe.png'
        placeholder='Submit your github repo link here'
      />
    </div>
  )
}
