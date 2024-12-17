'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDepartmentStore } from '@/store/MyStore/DepartmentStore'
import AddDepartmentModal from '@/mic-component/CRUDDepartment/AjoutModal'
import UpdateDepartmentModal from '@/mic-component/CRUDDepartment/updateModal'
import DeleteDepartmentModal from '@/mic-component/CRUDDepartment/DeleteModal'
import Layout from '@/mic-component/Admin_UI/Layout/Layout'

const DepartmentTable: React.FC = () => {
  const {
    departments,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    removeDepartment
  } = useDepartmentStore()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('')
  const [filteredDepartments, setFilteredDepartments] = useState(departments)

  // Fetch departments from the store on component mount
  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  // Sync filtered departments with the store's departments
  useEffect(() => {
    setFilteredDepartments(departments)
    console.log('depa=', departments)
  }, [departments])

  // Handle search filter logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setFilteredDepartments(departments)
    } else {
      const filtered = departments.filter(element =>
        element.DepartmentName.toLowerCase().startsWith(value.toLowerCase())
      )
      setFilteredDepartments(filtered)
    }
  }
  // Add Department Modal Handlers
  const openAddModal = () => setIsAddModalOpen(true)
  const closeAddModal = () => setIsAddModalOpen(false)

  // Update Department Modal Handlers
  const openUpdateModal = (id: string, departmentName: string) => {
    setSelectedId(id)
    setSelectedDepartmentName(departmentName)
    setIsUpdateModalOpen(true)
  }
  const closeUpdateModal = () => setIsUpdateModalOpen(false)

  // Delete Department Modal Handlers
  const openDeleteModal = (id: string) => {
    setSelectedId(id)
    setIsDeleteModalOpen(true)
  }
  const closeDeleteModal = () => setIsDeleteModalOpen(false)

  const handleAdd = async (newDepartment: { DepartmentName: string }) => {
    try {
      await addDepartment(newDepartment)
      closeAddModal()
    } catch (error) {
      console.error('Failed to add department:', error)
      alert('Failed to add department. Please try again.')
    }
  }

  // Handle updating an existing department and update state immediately
  const handleUpdate = async (updatedDepartment: {
    DepartmentName: string
  }) => {
    try {
      await updateDepartment(selectedId, updatedDepartment)

      setFilteredDepartments(prev =>
        prev.map(dept =>
          dept._id === selectedId
            ? { ...dept, DepartmentName: updatedDepartment.DepartmentName }
            : dept
        )
      )

      closeUpdateModal()
    } catch (error) {
      console.error('Failed to update department:', error)
      alert('Failed to update department. Please try again.')
    }
  }

  // Handle deleting a department and update state immediately
  const handleConfirmDelete = async () => {
    try {
      await removeDepartment(selectedId)

      // Remove the department from local state
      setFilteredDepartments(prev =>
        prev.filter(department => department._id !== selectedId)
      )

      closeDeleteModal()
    } catch (error) {
      console.error('Failed to delete department:', error)
      alert('Failed to delete department. Please try again.')
    }
  }

  return (
    <Layout>
      <div className='p-10'>
        <div className='flex h-fit w-full flex-col items-center justify-center border-2 border-solid border-gray-400 bg-white'>
          <div className='flex h-20 w-full items-center justify-between bg-blue-500 px-5'>
            <h1 className='my-auto w-1/2 text-2xl text-white'>
              Manage Departments
            </h1>
            <div className='flex w-1/2 items-center justify-end'>
              <input
                type='text'
                className='mr-5 h-10 w-64 rounded-sm p-2'
                placeholder='Search Department'
                onChange={handleSearch}
              />
              <div
                className='flex h-12 w-48 cursor-pointer items-center justify-evenly rounded-sm border-none bg-green-400 text-white'
                onClick={openAddModal}
              >
                <FontAwesomeIcon
                  className='h-5 w-5 rounded-xl bg-white text-green-400'
                  icon={faPlus}
                />
                Add New Department
              </div>
            </div>
          </div>
          <div className='flex w-full flex-col'>
            <table className='w-full overflow-x-visible'>
              <thead className='flex h-14 w-full items-center justify-center bg-gray-100'>
                <tr className='flex w-full items-center justify-between'>
                  <th className='w-3/12 text-center text-lg text-black'>
                    Department ID
                  </th>
                  <th className='w-6/12 text-center text-lg text-black'>
                    Department Name
                  </th>
                  <th className='w-3/12 text-center text-lg text-black'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='w-full border-x-2'>
                {filteredDepartments.map(department => (
                  <tr
                    key={department._id}
                    className='flex h-14 w-full items-center justify-between border-t-2 border-gray-300'
                  >
                    <td className='w-3/12 text-center text-lg text-black'>
                      {department._id}
                    </td>
                    <td className='w-6/12 text-center text-lg text-black'>
                      {department.DepartmentName}
                    </td>
                    <td className='flex w-3/12 items-center justify-center'>
                      <FontAwesomeIcon
                        icon={faPen}
                        className='mr-8 h-6 w-7 cursor-pointer text-yellow-300'
                        onClick={() =>
                          openUpdateModal(
                            department._id,
                            department.DepartmentName
                          )
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className='h-6 w-7 cursor-pointer text-red-600'
                        onClick={() => openDeleteModal(department._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modals for Adding, Updating, and Deleting */}
        <AddDepartmentModal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
        />
        <UpdateDepartmentModal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          id={selectedId}
        />
        <DeleteDepartmentModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </Layout>
  )
}

export default DepartmentTable
