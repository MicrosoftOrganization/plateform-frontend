import React from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import Image from 'next/image'
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
      <CardBody className='maw-h-[170px] max-w-[250px] overflow-visible py-2'>
        {/* <img
          alt={`${name} department`}
          className='rounded-xl object-contain'
          src={imageUrl}
         
        /> */}
        <div className='flex h-[190px] w-[250px] justify-center overflow-hidden rounded-xl'>
          <Image
            src={imageUrl}
            alt={`${name} department`}
            className='h-full w-2/3 object-contain'
            layout='fill'
            objectFit='contain'
          />
        </div>
      </CardBody>
    </Card>
  )
}
export default DepartmentCard
