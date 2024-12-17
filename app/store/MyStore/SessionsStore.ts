import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Session } from '@/store/Models/Session'
import {
  fetchSessions,
  deleteSession,
  addSession,
  updateSession
} from '@/store/Controller/SessionController'

export type State = {
  sessions: Session[]
}

export type Actions = {
  fetchSessions: (DepartmentId: string) => Promise<void> 
  deleteSession: (id: string | number) => Promise<void> 
  addSession: (sessionData: Session, DepartmentId: string) => Promise<void> 
  updateSession: (id: string | number, sessionData: Session) => Promise<void>
}

// Zustand Store pour les sessions
export const useSessionsStore = create<State & Actions>()(
  persist(
    set => ({
      sessions: [],

      fetchSessions: async (DepartmentId: string) => {
        try {
          const data = await fetchSessions(DepartmentId)
          set({ sessions: data })
          console.log('Sessions fetched successfully')
        } catch (error) {
          console.error('Erreur lors de la récupération des sessions:', error)
        }
      },

      deleteSession: async (id: string | number) => {
        try {
          await deleteSession(id)
          set(state => ({
            sessions: state.sessions.filter(session => session._id !== id)
          }))
          console.log(`Session with id ${id} deleted successfully`)
        } catch (error) {
          console.error('Erreur lors de la suppression de la session:', error)
        }
      },

      addSession: async (sessionData: Session, DepartmentId: string) => {
        try {
          console.log(sessionData)
          console.log('test data')
          console.log(DepartmentId)
          const addedSession = await addSession(sessionData, DepartmentId) 

          set(state => ({
            sessions: [...state.sessions, addedSession] 
          }))
          console.log('Session ajoutée avec succès')
        } catch (error) {
          console.error("Erreur lors de l'ajout de la session:", error)
        }
      },


      updateSession: async (id: string | number, sessionData: Session) => {
        try {
          console.log("sessionData : ")
          console.log(sessionData)
          const updatedSession = await updateSession(id, sessionData)
          set(state => ({
            sessions: state.sessions.map(session =>
              session._id === id ? updatedSession : session
            )
          }))
          console.log('Session mise à jour avec succès')
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la session:', error)
        }
      }
    }),
    { name: 'session-store', skipHydration: true }
  )
)
