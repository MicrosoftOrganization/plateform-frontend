'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import DepartmentCard from '@/mic-component/departmentCard/DepartmentCard'
import { useAuthStore } from '@/store/MyStore/AuthStore'
import { ENDPOINTS } from '@/store/constants/api'
import axiosInstance from '@/axiosInstance*'
import { Button } from '@mui/material'

interface Department {
  _id: string
  DepartmentName: string
  imgUrl: string
}
const departmentImages = {
  'Basic Web': '@public/images/departments/basic-web.png',
  'Advanced Web': '@public/images/departments/advanced-web.png',
  'Intermediate Web': '@public/images/departments/intermediate-web.png',
  'AI': '@public/images/departments/ai.png',
}

export default function Dashboard() {
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const departmentIds = useAuthStore(state => state.user?.DepartmentIds || [])

  const fetchDepartments = async () => {
    try {
      const response = await axiosInstance.get(
        ENDPOINTS.GET_DEPARTMENTS_NAMES_IDS
      )
      setDepartments(response.data.departments)
    } catch (error) {
      console.error('Department fetching failed:', error)
    }
  }
  useEffect(() => {
    fetchDepartments()
  }, [departments])

  return (
    <div>
      <h1 className='mb-6 text-3xl text-slate-900'>Dashboard</h1>
      <div className='flex w-full flex-col gap-4 md:flex-row'>
        {departmentIds.length === 0 ? (
          <h2 className='text-xl text-slate-900'>No departments found</h2>
        ) : null}
        {departments
          .filter(department => departmentIds.includes(department._id))
          .map(department => (
            <button
              key={department._id}
              onClick={() =>
                router.push(`/member/assignments?id_dep=${department._id}`)
              }
            >
              <DepartmentCard
                key={department._id}
                name={department.DepartmentName}
                imageUrl={departmentImages[department.DepartmentName]}
              />
              <Button
                onClick={() => router.push(`/member/sessions?id_dep=${department._id}`)}
              className='m-3 rounded-md bg-gradient-to-r from-secondary to-primary text-white'
            >
            GO TO SESSIONS
          </Button>
            </button>
          ))}
      </div>
    </div>
  )
}