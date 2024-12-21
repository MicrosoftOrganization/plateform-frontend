import React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import dayjs from 'dayjs'

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start rounded-md border border-gray-300 bg-white text-left font-normal shadow-sm',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? dayjs(date).format('DD MMM YYYY') : 'Select a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='right'
        align='center'
        className='w-auto rounded-md border border-gray-300 bg-gray-100 p-0 shadow-lg'
      >
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          className='bg-gray-100'
        />
      </PopoverContent>
    </Popover>
  )
}
