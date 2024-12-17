'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui/form'
import { Input } from '@/ui/input'
import DatePicker from '@/ui/date-picker'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem
} from '@/ui/select'

const assignmentSchema = z.object({
  Title: z.string().nonempty({ message: 'Title is required' }),
  Description: z.string().nonempty({ message: 'Description is required' }),
  DueDate: z.date({ required_error: 'Due Date is required' }),
  Instructor: z.string().nonempty({ message: 'Instructor is required' })
})

export default function AssignmentForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      Title: '',
      Description: '',
      DueDate: new Date(),
      Instructor: ''
    }
  })

  const onSubmit = async data => {
    setLoading(true)
    try {
      console.log('Assignment Submitted', data)
      // Simulate an API call
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Submission failed:', error)
      setLoading(false)
    }
  }

  return (
    <div className='mt-16 flex h-full flex-col items-center justify-center rounded-xl border bg-slate-300 shadow-2xl md:mt-24'>
      <div className='w-full max-w-2xl rounded-lg bg-white p-8 shadow-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='grid grid-cols-1 gap-6 md:grid-cols-2'
          >
            <FormField
              control={form.control}
              name='Title'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Description'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='DueDate'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='Instructor'
              render={({ field }) => (
                <FormItem className='col-span-1'>
                  <FormLabel>Instructor</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger
                        className='rounded-md border border-gray-300 bg-white shadow-sm'
                        placeholder='Select instructor'
                      />
                      <SelectContent className='rounded-md border border-gray-300 bg-white shadow-lg'>
                        <SelectItem value='Instructor 1'>
                          Instructor 1
                        </SelectItem>
                        <SelectItem value='Instructor 2'>
                          Instructor 2
                        </SelectItem>
                        <SelectItem value='Instructor 3'>
                          Instructor 3
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className='text-red-800' />
                </FormItem>
              )}
            />
            <div className='col-span-1 md:col-span-2'>
              <Button
                type='submit'
                className='h-12 w-full rounded-md bg-gradient-to-r from-secondary to-primary text-white'
              >
                {loading ? 'Loading...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
