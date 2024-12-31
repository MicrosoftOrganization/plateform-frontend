'use client'
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useInstructorStore } from '@/store/MyStore/InstructorStore' 
import { useDepartmentStore } from '@/store/MyStore/DepartmentStore' 
import { Instructor } from '@/app/store/Models/Instructor' 

type AjoutInstructorProps = {
  isOpen: boolean
  onRequestClose: () => void
}

const AjoutInstructor: React.FC<AjoutInstructorProps> = ({
  isOpen,
  onRequestClose
}) => {
  // Initialize the state for a new instructor (Remove _id)
  const [instructor, setInstructor] = useState<Omit<Instructor, '_id'>>({
    NomPrenom: '',
    Email: '',
    Password: '',
    Role: 'instructor', // Default role
    Adresse: '',
    ImageLink: '',
    DepartmentId: '' // For the selected department
  })
  const { fetchInstructors } = useInstructorStore()

  // Fetch departments from Zustand
  const { departments, fetchDepartments } = useDepartmentStore(state => ({
    departments: state.departments,
    fetchDepartments: state.fetchDepartments
  }))

  // Fetch instructor actions from Zustand
  const addInstructor = useInstructorStore(state => state.addInstructor)

  // Fetch departments once when the modal loads
  useEffect(() => {
    const loadDepartments = async () => {
      await fetchDepartments()
    }
    loadDepartments()
  }, [fetchDepartments])

  // Handle input changes for instructor fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setInstructor({ ...instructor, [name]: value })
  }

  // Handle image input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInstructor(prev => ({ ...prev, ImageLink: reader.result as string }))
      }
      reader.readAsDataURL(file) // Convert file to base64 string
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addInstructor(instructor)

      alert('Instructor added successfully!')

      onRequestClose()
      setInstructor({
        NomPrenom: '',
        Email: '',
        Password: '',
        Role: 'instructor',
        Adresse: '',
        ImageLink: '',
        DepartmentId: ''
      }) // Reset form
    } catch (error) {
      console.error('Failed to add instructor:', error)
      alert('Failed to add instructor. Please try again.')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75'
    >
      <div className='w-96 rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>
          Ajout dun nouvel instructeur
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Instructor Name Input */}
          <div className='mb-4'>
            <label
              htmlFor='nom-prenom'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Nom et Prénom:
            </label>
            <input
              type='text'
              id='nom-prenom'
              name='NomPrenom'
              value={instructor.NomPrenom}
              onChange={handleChange}
              required
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          {/* Instructor Email Input */}
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='Email'
              value={instructor.Email}
              onChange={handleChange}
              required
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          {/* Instructor Password Input */}
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Mot de passe:
            </label>
            <input
              type='password'
              id='password'
              name='Password'
              value={instructor.Password}
              onChange={handleChange}
              required
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          {/* Instructor Address Input */}
          <div className='mb-4'>
            <label
              htmlFor='adresse'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Adresse:
            </label>
            <input
              type='text'
              id='adresse'
              name='Adresse'
              value={instructor.Adresse}
              onChange={handleChange}
              required
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          {/* Instructor Image Upload */}
          <div className='mb-4'>
            <label
              htmlFor='image-link'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Image:
            </label>
            <input
              type='file'
              id='image-link'
              accept='image/*'
              onChange={handleFileChange}
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          {/* Department Selection */}
          <div className='mb-4'>
            <label
              htmlFor='departement'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Département:
            </label>
            <select
              id='departement'
              name='DepartmentId'
              value={instructor.DepartmentId}
              onChange={handleChange}
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
              required
            >
              <option value='' disabled>
                Sélectionnez le département
              </option>
              {departments.map(department => (
                <option key={department._id} value={department._id}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3'>
            <button
              type='button'
              className='rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              onClick={onRequestClose}
            >
              Annuler
            </button>
            <button
              type='submit'
              className='rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AjoutInstructor
