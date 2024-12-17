import axiosInstance from '@/axiosInstance*'
import { ENDPOINTS } from '@/store/constants/api'
import { Chat } from '@/store/Models/Chat'

export const fetchChats = async (instructorId: string): Promise<Chat[]> => {
  try {
    const response = await axiosInstance.get<Chat[]>(
      ENDPOINTS.FETCH_CHATS_FOR_INSTRUCTOR(instructorId)
    )
    console.log('fetchChats')
    console.log(response.data.chats)
    return response.data.chats
  } catch (error) {
    console.error('Erreur lors de la récupération des Chats:', error)
  }
}
export const fetchMessages = async (Chat_Id: string): Promise<Message[]> => {
  try {
    const response = await axiosInstance.get<Message[]>(
      ENDPOINTS.FETCH_MESSAGES_FOR_CHAT(Chat_Id)
    )
    console.log('fetchMessage')
    console.log(response.data)
    return response.data.messages
  } catch (error) {
    console.error('Erreur lors de la récupération des Chats:', error)
  }
}
export const sendMessage = async (messageData: any): Promise<void> => {
  try {
    console.log('chatController')
    console.log(messageData)
    const response = await axiosInstance.post(
      ENDPOINTS.CREATE_MESSAGES_IN_CHAT(),
      messageData
    )
    console.log('messageData')
    console.log(response.data.savedMessage)
    return response.data.savedMessage
  } catch (error) {
    console.error('Erreur lors de la récupération des Chats:', error)
  }
}
