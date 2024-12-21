import React from 'react'
import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'

interface DepartmentCardProps {
  name: string
  imageUrl: string
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, imageUrl }) => {
  return (
    <Card className='py-4'>
      <CardHeader className='flex-col items-start px-4 pb-0 pt-2'>
        <h4 className='text-large font-bold'>{name}</h4>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <Image
          alt={`${name} department`}
          className='rounded-xl object-contain'
          src={imageUrl}
          width={300}
          height={190}
        />
      </CardBody>
    </Card>
  )
}
export default DepartmentCard