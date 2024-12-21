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
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import RichTextEditor from '@/mic-component/RichTextEditor/RichTextEditor'
import { Button } from '@/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/ui/calendar'
import { TimePicker } from '@/ui/time-picker/time-picker'
import { Assignment } from '@/store/Models/Assignment'

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
DueDate: z.date()
})

export default function Create() {
const router = useRouter()
const { createAssignment } = useAssignmentStore()
type FormSchemaType = z.infer<typeof formSchema>

const form = useForm<FormSchemaType>({
resolver: zodResolver(formSchema)
})

const searchParams = useSearchParams()
const departmentId = searchParams.get('departmentId') // Récupère l'ID du département

async function onSubmit(values: FormSchemaType) {
const formattedDate = format(values.DueDate, 'dd/MM/yyyy HH:mm:ss')
console.log('Formatted Date:', formattedDate)
console.log(values)

    
   
    const newAssignment : Assignment = {
      _id:'',
      Title: values.title,
      Description: values.description,
      DueDate: formattedDate,
      Attachments: []
    }
    console.log('newAssignment:', newAssignment)
     try {
      await createAssignment(newAssignment, departmentId) 
      toast.success('Assignment created successfully.')
      form.reset() 
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
            name='DueDate'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel>dueDate</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto bg-gray-100 p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date < new Date()}
                      initialFocus
                    />
                    <div className='border-border border-t p-3'>
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
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
