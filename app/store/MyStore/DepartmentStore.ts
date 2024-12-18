import { create } from 'zustand'
import { Department } from '@/store/Models/Department'
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '@/store/Controller/DepartmentController'

export type DepartmentState = {
  departments: Department[]
}

export type DepartmentActions = {
  fetchDepartments: () => Promise<void>
  addDepartment: (department: any) => Promise<void>
  updateDepartment: (
    DepartmentId: string,
    department: Partial<Department>
  ) => Promise<void>
  removeDepartment: (DepartmentId: string) => Promise<void>
}

// Zustand Store for Departments
export const useDepartmentStore = create<DepartmentState & DepartmentActions>()(
  set => ({
    departments: [],

    fetchDepartments: async () => {
      try {
        const data = await fetchDepartments()
        console.log(data)
        set({ departments: data })
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    },

    addDepartment: async department => {
      try {
        const newDepartment = await createDepartment(department)

        if (!newDepartment || !newDepartment._id) {
          throw new Error('Invalid department data returned from API')
        }

        set(state => ({
          departments: [...state.departments, newDepartment]
        }))
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            'Failed to add department. Please try again.'
        )
      }
    },

    updateDepartment: async (DepartmentId, department) => {
      try {
        // Call the API to update the department
        const updatedDepartment = await updateDepartment(
          DepartmentId,
          department
        ) // Ensure this is your API function

        // Update the state in the store
        set(state => ({
          departments: state.departments.map(dept =>
            dept._id === DepartmentId ? updatedDepartment : dept
          )
        }))
      } catch (error) {
        console.error('Error updating department:', error)
      }
    },

    removeDepartment: async DepartmentId => {
      try {
        await deleteDepartment(DepartmentId)
        set(state => ({
          departments: state.departments.filter(
            dept => dept._id !== DepartmentId
          )
        }))
      } catch (error) {
        console.error('Error deleting department:', error)
      }
    }
  })
)
