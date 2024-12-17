'use client'

import { useEffect, useState, useRef } from 'react'
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useInstructorStore } from '@/app/store/MyStore/InstructorStore'
import { useDepartmentStore } from '@/store/MyStore/DepartmentStore' 

type UpdateInstructorProps = {
  isOpen: boolean
  onRequestClose: () => void
  id: string
}

const UpdateInstructorModal: React.FC<UpdateInstructorProps> = ({
  isOpen,
  onRequestClose,
  id
}) => {
  const [instructorName, setInstructorName] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [email, setEmail] = useState('') // State for email
  const [password, setPassword] = useState('') // State for password
  const [imageLink, setImageLink] = useState<File | null>(null) // State for image file
  const [imagePreview, setImagePreview] = useState<string | null>(null) // Preview URL for image
  const inputRef = useRef<HTMLInputElement>(null) // Input reference for focus control

  // Zustand actions to update instructor and get departments
  const updateInstructor = useInstructorStore(state => state.updateInstructor)
  const departments = useDepartmentStore(state => state.departments)
  const instructors = useInstructorStore(state => state.instructors)

  // Fetch the instructor details from Zustand store when the modal is opened
  useEffect(() => {
    if (isOpen) {
      console.log('instructor selected for update')
      console.log(id)
      const instructor = instructors.find(inst => inst._id === id)
      if (instructor) {
        setInstructorName(instructor.NomPrenom)
        setDepartmentId(instructor.DepartmentId)
        setEmail(instructor.Email || '')
        setPassword('')
        setImagePreview(instructor.ImageLink || '')
      }

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [id, isOpen, instructors])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageLink(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string) // Set image preview
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null) // Reset preview if no file is selected
    }
  }

  // Handle form submission to update the instructor
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const updatedInstructor = {
      NomPrenom: instructorName,
      DepartmentId: departmentId,
      Email: email,
      Password: password,
      ImageLink: imageLink ? URL.createObjectURL(imageLink) : null
    }

    try {
      await updateInstructor(id, updatedInstructor)
      alert('Instructor updated successfully!')
      onRequestClose()
    } catch (error) {
      console.error('Error updating the instructor:', error)
      alert('Failed to update the instructor. Please try again.')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      className='flex h-full w-full items-center justify-center'
    >
      <main className='relative mt-14 flex h-[600px] w-[400px] flex-col items-center justify-evenly bg-white'>
        <FontAwesomeIcon
          icon={faTimes}
          className='absolute right-2 top-3 h-4 w-4 cursor-pointer font-bold text-black'
          onClick={onRequestClose}
        />
        <h1 className='text-xl font-bold text-blue-400'>Update Instructor</h1>

        <form
          onSubmit={handleSubmit}
          className='flex w-full flex-col items-center'
        >
          {/* Input field for Instructor Name */}
          <div className='mb-2 w-5/6'>
            <label htmlFor='instructor-name' className='mb-1 block'>
              Instructor Name:
            </label>
            <input
              ref={inputRef} // Input reference for focus
              type='text'
              id='instructor-name'
              value={instructorName}
              onChange={e => setInstructorName(e.target.value)}
              className='w-full border border-gray-300 p-2'
              required
            />
          </div>

          {/* Input field for Email */}
          <div className='mb-2 w-5/6'>
            <label htmlFor='email' className='mb-1 block'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full border border-gray-300 p-2'
              required
            />
          </div>

          {/* Input field for Password */}
          <div className='mb-2 w-5/6'>
            <label htmlFor='password' className='mb-1 block'>
              Password:
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full border border-gray-300 p-2'
            />
          </div>

          {/* Select for Department */}
          <div className='mb-2 w-5/6'>
            <label htmlFor='department' className='mb-1 block'>
              Department:
            </label>
            <select
              id='department'
              value={departmentId}
              onChange={e => setDepartmentId(e.target.value)}
              className='w-full border border-gray-300 p-2'
              required
            >
              <option value=''>Select Department</option>
              {departments.map(department => (
                <option key={department._id} value={department._id}>
                  {department.DepartmentName}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className='mb-2 w-5/6'>
            <label htmlFor='image-upload' className='mb-1 block'>
              Upload Image:
            </label>
            <input
              type='file'
              id='image-upload'
              accept='image/*'
              onChange={handleFileChange}
              className='w-full border border-gray-300 p-2'
            />
            {imagePreview && (
              <div className='mt-2'>
                <img
                  src={imagePreview}
                  alt='Selected'
                  className='h-20 w-20 rounded-full object-cover'
                  width={80}
                  height={80}
                />
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            className='mt-4 w-5/6 rounded-md border-none bg-blue-500 px-4 py-2 text-xl text-white'
            type='submit'
          >
            Update
          </button>
        </form>
      </main>
    </Modal>
  )
}

export default UpdateInstructorModal
