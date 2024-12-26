import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from '@nextui-org/react'
import Image from 'next/image'
import { Input } from '@nextui-org/react'
import { Send } from 'lucide-react'
import { toast } from 'react-hot-toast'
import ResponseSearch from '@/mic-component/assignment_UI/ResponseSearch'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import { useResponseStore } from '@/store/MyStore/ResponseStore'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'

export default function AssignmentModal({
  isOpen,
  onOpenChange,
  instructor,
  date,
  content,
  resources,
  imageUrl,
  assignmentId,
  placeholder
}) {
  const { responses, fetchResponses, addResponse } = useResponseStore()
  const [responseContent, setResponseContent] = useState('')
  const user = useAuthStore(state => state.user)
  const [User_Id] = useState(user?.id)
  const [Assignment_Id] = useState(assignmentId)

  const responseSchema = z.object({
    responseContent: z
      .string()
      .url('Response content must be a valid URL')
      .nonempty('Response content cannot be empty')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(responseSchema)
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchResponses(User_Id)
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error)
      }
    }
    fetchData()
  }, [User_Id])

  const onSubmit = async data => {
    if (data.responseContent) {
      try {
        await addResponse(data.responseContent, User_Id, Assignment_Id)
        toast.success('Response added successfully')
        setResponseContent('')
      } catch (error) {
        toast.error('Failed to add response')
        console.error("Erreur lors de l'ajout de la réponse", error)
      }
    }
  }
  return (
    <Modal size={'3xl'} isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col'>
              Assignment Details
            </ModalHeader>
            <ModalBody
              style={{
                maxHeight: '450px', // Limite la hauteur
                overflowY: 'auto' // Active le défilement vertical
              }}
              className='flex w-full flex-col p-4'
            >
              <div className='flex w-full flex-col items-start justify-start space-y-4 md:space-x-4 md:space-y-0'>
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

                <div className='w-full p-2 pr-10'>
                  <ResponseSearch
                    Assignment_Id={Assignment_Id}
                    placeholder={placeholder}
                  />
                </div>

                {/* 
               <div className='flex w-full items-center gap-3 px-3'>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex w-full items-center gap-3'
                  >
                    <Input
                      onChange={e => setResponseContent(e.target.value)}
                      placeholder={placeholder}
                      className='mt-2 w-full rounded-lg border border-solid border-gray-400 md:w-full'
                      fullWidth
                      {...register('responseContent')}
                    />
                    <Button
                      color='primary'
                      variant='light'
                      className='mt-2 px-4 py-2 md:w-auto'
                      type='submit'
                    >
                      <Send size={24} />
                    </Button>
                  </form>
                </div>
                */}
              </div>
            </ModalBody>
            <ModalFooter className='flex flex-col items-start'>
              {errors.responseContent && (
                <p className='pl-5 text-sm text-red-700'>
                  {String(errors.responseContent.message)}
                </p>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
