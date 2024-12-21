'use client'

import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui/form'
import { Input } from '@/ui/input'
import { useAssignmentStore } from '@/app/store/MyStore/AssignmentsStore'
import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import RichTextEditor from '@/mic-component/RichTextEditor/RichTextEditor'
import { Button } from '@/ui/button'
import DatePickerFormField from './DatePickerFormField'

function extractTextFromHTML(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.body.textContent?.trim() || ''
}

const formSchema = z.object({
  title: z.string().nonempty('Title is required.'),
  description: z
    .string()
    .refine(value => extractTextFromHTML(value).trim().length >= 5, {
      message: 'The description must be at least 5 characters long.'
    }),
  DueDate: z.string({
    required_error: 'Due date is required.'
  })
})

export default function Create() {
  const router = useRouter()
  const { createAssignment } = useAssignmentStore()

  // Configuration de useForm avec validation Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      DueDate: undefined
    }
  })

  const searchParams = useSearchParams()
  const departmentId = searchParams.get('departmentId') // Récupère l'ID du département

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Form Data:', data)

    const newAssignment = {
      Title: data.title,
      Description: data.description,
      DueDate: data.DueDate,
      Attachments: []
    }
    console.log('newAssignment:', newAssignment)

    try {
      await createAssignment(newAssignment, departmentId) // Créer une tâche via le store Zustand
      toast.success('Assignment created successfully.')
      form.reset() // Réinitialiser le formulaire après soumission
      router.push('/instructor/assignments')
    } catch (error) {
      toast.error('Failed to create assignment.')
      console.error('Assignment creation error:', error)
    }
  }

  return (
    <div className='mx-auto w-11/12 max-w-3xl pt-36 text-slate-700'>
      <h1 className='mb-7 text-start text-4xl'>Create a new assignment</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Champ Title */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Enter title' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ DueDate */}
          <FormField
            control={form.control}
            name='dueDate'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <DatePickerFormField form={form} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Champ Description avec RichTextEditor */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value || ''}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bouton Soumettre */}
          <Button className='mt-4' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
