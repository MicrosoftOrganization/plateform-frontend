'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import DepartmentCard from '@/mic-component/departmentCard/DepartmentCard'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import { ENDPOINTS } from '@/store/constants/api'
import axiosInstance from '@/axiosInstance*'
import {throttle} from '@/utils/throttle' // using to throttle the api calls and minimize the number of requests
import { useNavStore } from '@/store/MyStore/navstore'
interface Department {
  _id: string
  DepartmentName: string
  imgUrl: string
}

export default function Dashboard() {
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const departmentIds = useAuthStore(state => state.user?.DepartmentIds || [])

  let selectedDepartmentName :string =''


  const fetchDepartments = throttle(async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.GET_DEPARTMENTS_NAMES_IDS
      )
      setDepartments(response.data.departments)
    } catch (error) {
      console.error('Department fetching failed:', error)
    }
  }
  , 2000)
  useEffect(() => {
    fetchDepartments()
  }, [])
function handlenav (id_dep:string ){
  useNavStore.setState({departmentId  : id_dep})
}
  
  return (
    <div>
      <h1 className='mb-6 text-3xl text-slate-900'>Dashboard</h1>
      <div className='flex w-full flex-col gap-4 md:flex-row'>
        {departmentIds.length === 0 ? (
          <h2 className='text-xl text-slate-900'>No departments found</h2>
        ) : null}
        {departments
          .filter(department => departmentIds.includes(department._id))
          .map(department => {
            selectedDepartmentName = department.DepartmentName
            handlenav(department._id)
            const imageUrl = `/images/departments/${department.DepartmentName.toLowerCase()}.png`
            return (
              <button
                key={department._id}
                onClick={() =>
                  router.push(`/member/assignments?id_dep=${department._id}`)
                }
              >
                <DepartmentCard
                  key={department._id}
                  name={department.DepartmentName}
                  imageUrl={imageUrl}
                />
              </button>
            )
          })}
      </div>
    </div>
  )
}
