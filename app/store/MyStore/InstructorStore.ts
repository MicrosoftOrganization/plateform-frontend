import { create } from 'zustand'
import { Instructor } from '@/store/Models/Instructor'
import {
  fetchInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor
} from '@/store/Controller/InstructorController'

export type InstructorState = {
  instructors: Instructor[]
}

export type InstructorActions = {
  fetchInstructors: () => Promise<void>
  addInstructor: (instructor: Instructor) => Promise<void>
  updateInstructor: (
    InstructorId: string,
    instructor: Partial<Instructor>
  ) => Promise<void>
  removeInstructor: (InstructorId: string) => Promise<void>
}

// Zustand Store for Instructors
export const useInstructorStore = create<InstructorState & InstructorActions>()(
  set => ({
    instructors: [],

    fetchInstructors: async () => {
      try {
        const data = await fetchInstructors()
        set({ instructors: data })
      } catch (error) {
        console.error('Error fetching instructors:', error)
      }
    },

    addInstructor: async instructor => {
      try {
        const newInstructor = await createInstructor(instructor)
        set(state => ({ instructors: [...state.instructors, instructor] }))
      } catch (error) {
        console.error('Error adding instructor:', error)
      }
    },

    updateInstructor: async (InstructorId, instructor) => {
      try {
        const updatedInstructor = await updateInstructor(
          InstructorId,
          instructor
        )
        set(state => ({
          instructors: state.instructors.map(inst =>
            inst._id === InstructorId ? updatedInstructor : inst
          )
        }))
      } catch (error) {
        console.error('Error updating instructor:', error)
      }
    },

    removeInstructor: async InstructorId => {
      try {
        await deleteInstructor(InstructorId)
        set(state => ({
          instructors: state.instructors.filter(
            inst => inst._id !== InstructorId
          )
        }))
      } catch (error) {
        console.error('Error deleting instructor:', error)
      }
    }
  })
)
