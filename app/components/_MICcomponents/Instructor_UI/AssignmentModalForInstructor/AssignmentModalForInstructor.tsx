import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@nextui-org/react'
import Image from 'next/image'
import { useResponseStore } from '@/app/store/MyStore/ResponseStore'
import { useAuthStore } from '@/app/store/MyStore/AuthStore'
import DOMPurify from 'dompurify'
export default function AssignmentModal({
  isOpen,
  onOpenChange,
  instructor,
  date,
  content,
  resources,
  imageUrl,
  assignmentId
}) {
  const { fetchResponses } = useResponseStore()
  const user = useAuthStore(state => state.user)
  const [User_Id] = useState(user.id)
  const [Assignment_Id] = useState(assignmentId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchResponses(User_Id)
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [fetchResponses, User_Id])

  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col bg-gradient-to-r from-secondary to-primary text-white'>
              Assignment Details
            </ModalHeader>
            <ModalBody className='flex w-full flex-col p-4 text-slate-500'>
              <div className='flex w-full flex-col items-start justify-start space-y-4 md:space-x-4 md:space-y-0'>
                <div className='mb-4 flex w-full items-start justify-start gap-4 md:mb-0'>
                  <div className='mb-2 flex-1 text-start'>
                    <h5 className='text-start text-lg font-extrabold'>
                      {instructor}
                    </h5>
                    <h6 className='text-sm text-gray-500'>{date}</h6>
                    <div
                      className='richtext-container p-4'
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(content)
                      }}  
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className='flex justify-start'></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
