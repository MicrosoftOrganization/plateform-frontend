import { Accordion, AccordionItem } from '@nextui-org/react'
import instructorData from './instructorData.json'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function App() {
  const searchParams = useSearchParams()
  const query = { id_dep: searchParams.get('id_dep') }
  const [filteredInstructors, setFilteredInstructors] = useState([])
  useEffect(() => {
    if (query.id_dep) {
      const filtered = instructorData.filter(
        instructor => instructor.DepartmentId === query.id_dep
      )
      setFilteredInstructors(filtered)
    }
  }, [query.id_dep])

  return (
    <Accordion defaultExpandedKeys={['2']}>
      {filteredInstructors.map(instructor => (
        <AccordionItem
          key={instructor.id}
          aria-label={instructor.name}
          subtitle={<span className='text-gray-300'>{instructor.email}</span>}
          title={<span className='text-gray-300'>{instructor.name}</span>}
        >
          <span className='text-gray-300'>{instructor.position}</span>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
