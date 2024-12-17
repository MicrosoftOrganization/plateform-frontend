import { create } from 'zustand'
import { fetchChats } from './../Controller/ChatController'
import { State } from '../Models/Chat'

// à supprimer apres 
export type Actions = {
  fetchChats: (instructorId: string) => Promise<void>

 
}

export const useChatStore = create<State & Actions>(set => ({
  chats: [],
  fetchChats: async (instructorId: string) => {
    try {
      const responsesData = await fetchChats(instructorId)
      console.log(responsesData)
      set({ chats: responsesData })
    } catch (error) {
      console.error('Erreur lors de la récupération des réponses', error)
    }
  }
}))
