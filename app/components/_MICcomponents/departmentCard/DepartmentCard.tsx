
import React from 'react'
import { Card, CardHeader, CardBody } from "@nextui-org/react"
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
    <CardBody className='overflow-visible py-2'>
      <div className='flex w-[250px] h-[190px] rounded-xl justify-center overflow-hidden'>
      <Image src={imageUrl} alt={`${name} department`} className='w-2/3 h-full object-contain' layout='fill' objectFit='contain' />
      </div>
    </CardBody>
  </Card>
  )
}
export default DepartmentCard

