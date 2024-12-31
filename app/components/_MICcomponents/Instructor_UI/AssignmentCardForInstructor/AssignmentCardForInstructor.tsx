'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDisclosure, Button } from '@nextui-org/react'
import { FiEdit, FiTrash } from 'react-icons/fi'
import { useAssignmentStore } from '@/store/MyStore/AssignmentsStore'
import DeleteAssignmentModal from '@/mic-component/Instructor_UI/AssignmentDeleteModalForInstructor/AssignmentDeleteModalForInstructor'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface AssignmentCardProps {
  assignment: {
    _id: string
    Title: string
    DueDate: string
    Description: string
    Attachments: string[]
  }
}

export default function AssignmentCardForInstructor({
  assignment
}: AssignmentCardProps) {
  const { updateAssignment, deleteAssignment } = useAssignmentStore()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange
  } = useDisclosure()
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange
  } = useDisclosure()

  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const maxChars = 100

  const router = useRouter()

  const truncatedDescription =
    assignment.Description.length > maxChars
      ? `${assignment.Description.slice(0, maxChars)}...`
      : assignment.Description

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='mx-auto mb-4 mt-4 flex h-fit w-11/12 flex-col flex-wrap rounded-lg bg-white p-5'>
      <div className='flex items-center justify-between'>
        {/* Left Section: Assignment Details */}
        <div className='flex items-center'>
          <div>
            <h5 className='font-extrabold'>{assignment.Title}</h5>
            <h6 className='text-sm text-gray-500'>{assignment.DueDate}</h6>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className='flex space-x-4'>
          <FiEdit
            className='cursor-pointer text-gray-500 hover:text-blue-500'
            onClick={onEditOpen}
            size={20}
          />
          <FiTrash
            className='cursor-pointer text-gray-500 hover:text-red-500'
            onClick={onDeleteOpen}
            size={20}
          />
        </div>
      </div>

      {/* <p className='mt-2 text-justify font-extrabold'>
        {isExpanded ? assignment.Description : truncatedDescription}
      </p> */}

      {/* View More / See Less Button */}
      {/* {assignment.Description.length > maxChars &&
       (
        <button
          onClick={handleToggleDescription}
          className='mt-2 block text-blue-500 underline'
        >
          {isExpanded ? 'See Less' : 'View More'}
        </button>
      )} */}

      <div className='mt-4 flex h-11 items-center justify-between'>
        <div className='flex h-full'>
          <Button
            onClick={() =>
              router.push(
                `/instructor/responses?assignmentId=${assignment._id}`
              )
            }
            className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
          >
            Responses
          </Button>
        </div>
      </div>

      {isEditOpen && (
        <div> update a verifier apres</div>
        // <UpdateAssignmentModal
        //   isOpen={isEditOpen}
        //   onClose={onEditOpenChange}
        //   assignmentId={assignment._id}
        //   initialTitle={assignment.Title}
        //   initialDescription={assignment.Description}
        //   initialDate={assignment.DueDate}
        //   onConfirm={async (updatedAssignmentData: any) => {
        //     try {
        //       await updateAssignment(assignment._id, updatedAssignmentData)
        //       toast.success('Assignment updated successfully')
        //     } catch (error) {
        //       toast.error('Failed to update assignment')
        //       console.error(error)
        //     }
        //   }}
        // />
      )}

      {isDeleteOpen && (
        <DeleteAssignmentModal
          isOpen={isDeleteOpen}
          onClose={onDeleteOpenChange}
          onConfirm={async () => {
            try {
              await deleteAssignment(assignment._id)
              toast.success('Assignment deleted successfully')
            } catch (error) {
              toast.error('Failed to delete assignment')
              console.error(error)
            }
          }}
        />
      )}
    </div>
  )
}
