'use client'
import { useState } from 'react'
import Modal from 'react-modal'
import { useDepartmentStore } from '@/store/MyStore/DepartmentStore' 

type AjoutDepartementProps = {
  isOpen: boolean
  onRequestClose: () => void
}

const AjoutDepartement: React.FC<AjoutDepartementProps> = ({
  isOpen,
  onRequestClose
}) => {
  const [DepartementName, setDepartementName] = useState('')
  const allowedDepartments = [
    'Basic Web',
    'Intermediate Web',
    'Advanced Web',
    'AI',
    'Mariem Department Attention!!!!!'
  ]

  // Get the addDepartment action from the Zustand store
  const addDepartment = useDepartmentStore(state => state.addDepartment)

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!allowedDepartments.includes(DepartementName)) {
      alert(
        `Nom du département invalide. Veuillez sélectionner un nom parmi : ${allowedDepartments.join(', ')}`
      )
      return
    }
    // Define the new department details
    const newDepartement = {
      DepartmentName: DepartementName
    }

    try {
      let response = await addDepartment(newDepartement)

      console.log('Department added:', response)
      onRequestClose()
      alert('Department added successfully!')
      setDepartementName('')
    } catch (error: any) {
      const errorMessage =
        error.message || 'An unexpected error occurred. Please try again.'

      alert(errorMessage)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75'
    >
      <div className='w-96 rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-4 text-xl font-bold'>Add new department</h2>
        <form onSubmit={handleSubmit}>
          {/* Input field for Department Name */}
          <div className='mb-4'>
            <label
              htmlFor='departement-name'
              className='mb-1 block text-sm font-medium text-gray-700'
            >
              Nom du Département:
            </label>
            <input
              type='text'
              id='departement-name'
              className='w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none'
              value={DepartementName}
              onChange={e => setDepartementName(e.target.value)}
              required
            />
          </div>
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

export default AjoutDepartement
