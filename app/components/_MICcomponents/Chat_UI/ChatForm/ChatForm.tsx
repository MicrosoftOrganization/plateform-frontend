'use client'
import axios from 'axios'
import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import MemberSelect from '@/mic-component/Chat_UI/ChatForm/MemberSelect'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui/form'
import { Button } from '@/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Typography } from '@mui/material'
import { useAuthStore } from '@/store/MyStore/AuthStore'

const CreateConversationForm = () => {
  const user = useAuthStore(state => state.user)
  const [instructorId, setInstructorId] = useState('')
  const [memberId, setMemberId] = useState('')
  const [departmentId, setDepartmentId] = useState('')

  const chatSchema = z.object({
    Instructor: z.string().nonempty('Instructor is required.'),
    Member: z.string().nonempty('Member is required.'),
    DepartmentId: z.string().nonempty('DepartmentId is required.')
  })
  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(chatSchema),
    defaultValues: {}
  })

  const handleSubmit = async e => {
    e.preventDefault()
    // Vérifier que les champs nécessaires ne sont pas vides
    if (!instructorId || !memberId || !departmentId) {
      alert('Veuillez remplir tous les champs.')
      return
    }

    try {
      // Envoi de la requête POST au serveur avec axios
      const response = await axios.post('http://localhost:4000/api/chats/', {
        Instructor: instructorId,
        Member: memberId,
        DepartmentId: departmentId
      })

      // Traitement de la réponse
      const data = response.data

      // Vérification du statut de la réponse
      if (response.status === 200) {
        alert(data.message || 'Conversation créée avec succès !')
      } else {
        console.error(data.message || 'Erreur serveur')
        alert(data.message || 'Erreur serveur')
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error)
      alert('Erreur serveur, veuillez réessayer plus tard.')
    }

    // Réinitialiser le formulaire après la requête
    setInstructorId('')
    setMemberId('')

    setDepartmentId('')
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond blanc transparent
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre pour donner de la profondeur
        borderRadius: '8px' // Coins arrondis
      }}
    >
      <Typography
        className='rounded-md bg-gradient-to-r from-secondary to-primary text-white'
        variant='h6'
      >
        <h2>Créer une nouvelle conversation</h2>
      </Typography>

      <Form {...form}>
        <form
          style={{
            padding: '18px'
          }}
          onSubmit={handleSubmit}
        >
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='instructorId'>Instructor ID :</label>
            <input
              id='instructorId'
              type='text'
              value={user?.id}
              onChange={e => setInstructorId(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          {/* <div style={{ marginBottom: '10px' }}>
            <FormField
              control={form.control}
              name='Instructor'
              render={({ field }) => (
                <FormItem className='col-span-2'>
                  <FormLabel>ID du membre :</FormLabel>
                  <FormControl>
                    <MemberSelect form={{ form }} />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div> */}

          <div style={{ marginBottom: '10px' }}>
            <label htmlFor='departmentId'>ID du département :</label>
            <input
              id='departmentId'
              type='text'
              value={departmentId}
              onChange={e => setDepartmentId(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <Button
            type='submit'
            className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
          >
            Créer la conversation
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateConversationForm
