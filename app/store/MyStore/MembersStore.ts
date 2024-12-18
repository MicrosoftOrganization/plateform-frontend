import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MemberForAdmin, State } from '@/store/Models/Member'
import {
  addMembersForAdmin,
  deleteMembersForAdmin,
  fetchMembers,
  fetchMembersForAdmin,
  updateMembersForAdmin
} from '@/store/Controller/MemberController'

export type Actions = {
  fetchMembers: (departmentId: string) => Promise<void> // Fonction asynchrone pour récupérer les membres
  fetchMembersForAdmin: () => Promise<void> // Fonction asynchrone pour récupérer les membres
  updateMembersForAdmin: (id: string, data: MemberForAdmin) => Promise<void> // Fonction asynchrone pour récupérer les membres
  deleteMembersForAdmin: (id: string | number) => Promise<void> // Fonction asynchrone pour récupérer les membres
  addMembersForAdmin: (memberData: any) => Promise<void> // Fonction asynchrone pour récupérer les membres
}

// Zustand Store
export const useMemberStore = create<State & Actions>()(
  persist(
    set => ({
      members: [],
      membersForAdmin: [],
      fetchMembers: async departmentId => {
        try {
          const data = await fetchMembers(departmentId)
          set({ members: data })
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      },
      fetchMembersForAdmin: async () => {
        try {
          const data = await fetchMembersForAdmin()
          set({ membersForAdmin: data })
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      },
      updateMembersForAdmin: async (id: string, dataUser: MemberForAdmin) => {
        try {
          const data = await updateMembersForAdmin(id, dataUser)
          set(state => ({
            membersForAdmin: state.membersForAdmin.map(member =>
              member._id === id ? { ...member, data } : member
            )
          }))
        } catch (error) {
          console.error('Error fetching sessions:', error)
        }
      },
      deleteMembersForAdmin: async (id: string) => {
        try {
          // Appel à l'API pour supprimer le membre
          await deleteMembersForAdmin(id)

          set(state => ({
            membersForAdmin: state.membersForAdmin.filter(
              member => member._id !== id
            )
          }))

          console.log(`Member with id ${id} deleted successfully`)
        } catch (error) {
          console.error('Error deleting member:', error)
        }
      },
      addMembersForAdmin: async (memberData: any) => {
        try {
          await addMembersForAdmin(memberData)
          set(state => ({
            membersForAdmin: [...state.membersForAdmin, memberData]
          }))

          console.log(`Member added successfully 2 bd`)
        } catch (error) {
          console.error('Error deleting member:', error)
        }
      }
    }),
    { name: 'member-store', skipHydration: true } // Middleware de persistance
  )
)
