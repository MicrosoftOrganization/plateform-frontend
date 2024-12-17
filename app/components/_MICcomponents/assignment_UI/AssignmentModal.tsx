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
import { z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

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
  const [User_Id] = useState(user.id)
  const [Assignment_Id] = useState(assignmentId)
  

  const responseSchema = z.object({
    responseContent: z.string().url('Response content must be a valid URL').nonempty('Response content cannot be empty')
  })
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(responseSchema)
  });

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

  const onSubmit = async () => {
    if (responseContent) {
      try {
        await addResponse(responseContent, User_Id, Assignment_Id)
        toast.success('Response added successfully')
        setResponseContent('')
      } catch (error) {
        toast.error('Failed to add response')
        console.error("Erreur lors de l'ajout de la réponse", error)
      }
    }
  }

  // Function to break content into lines
  const breakText = (text, maxLength = 80) => {
    const regex = new RegExp(`.{1,${maxLength}}`, 'g')
    return text.match(regex)
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
                  <h6 className='text-sm text-gray-500'>{dayjs(date).format("DD/MM/YYYY HH:mm")}</h6>
                  <p className='ms-8 mt-2 w-full text-sm text-gray-700 md:text-base'>
                    {breakText(content).map((line, idx) => (
                      <span key={idx}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>

                <div className='w-full p-2 pr-10'>
                  <ResponseSearch Assignment_Id={Assignment_Id} />
                </div>

                <div className='flex w-full items-center gap-3 px-3'>
            
                 <form onSubmit={handleSubmit(onSubmit)} className='flex w-full items-center gap-3'>
                    <Input
                      value={responseContent}
                      onChange={e => setResponseContent(e.target.value)}
                      placeholder={placeholder}
                      className='w-full mt-2 rounded-lg border border-solid border-gray-400 md:w-full'
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
              </div>
            </ModalBody>
            <ModalFooter className='flex flex-col items-start'>
              {errors.responseContent && (
                <p className='text-sm text-red-700 pl-5'>{String(errors.responseContent.message)}</p>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
