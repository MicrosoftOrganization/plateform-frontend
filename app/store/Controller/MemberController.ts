import axiosInstance from '@/axiosInstance*'
import { ENDPOINTS } from '@/store/constants/api'
import { Member, MemberForAdmin } from '@/store/Models/Member'

export const fetchMembers = async (departmentId): Promise<Member[]> => {
  try {
    const response = await axiosInstance.get<Member[]>(
      ENDPOINTS.FETCH_MEMBERS(departmentId)
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error)
  }
}
export const fetchMembersForAdmin = async (): Promise<MemberForAdmin[]> => {
  try {
    const response = await axiosInstance.get<MemberForAdmin[]>(
      ENDPOINTS.FETCH_MEMBERS_FOR_ADMIN
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des membres:', error)
  }
}
export const updateMembersForAdmin = async (
  id: string,
  dataUser: MemberForAdmin
): Promise<string> => {
  try {
    // Effectuer la requête POST pour mettre à jour le membre
    const response = await axiosInstance.put<MemberForAdmin>(
      ENDPOINTS.UPDATE_MEMBER_FOR_ADMIN(id), // Assurez-vous que cette fonction génère l'URL correcte
      dataUser
    )
    console.log(response.data)
    // Vérifiez la réponse et retournez un message ou une valeur pertinente
    return 'bonjour'
  } catch (error) {
    console.error('Erreur lors de la mise à jour du membre:', error)
    return 'Erreur lors de la mise à jour du membre'
  }
}
export const deleteMembersForAdmin = async (
  id: string | number
): Promise<string> => {
  try {
    // Effectuer la requête POST pour mettre à jour le membre
    const response = await axiosInstance.delete(
      ENDPOINTS.DELETE_MEMBER_FOR_ADMIN(id)
    )
    console.log(response.data)
    // Vérifiez la réponse et retournez un message ou une valeur pertinente
    return 'bonjour'
  } catch (error) {
    console.error('Erreur lors de la mise à jour du membre:', error)
    return 'Erreur lors de la mise à jour du membre'
  }
}
export const addMembersForAdmin = async (data: any): Promise<string> => {
  try {
    // Effectuer la requête POST pour mettre à jour le membre
    const response = await axiosInstance.post(
      ENDPOINTS.ADD_MEMBER_FOR_ADMIN,
      data
    )
    console.log(response.data)
    // Vérifiez la réponse et retournez un message ou une valeur pertinente
    return 'bonjour'
  } catch (error) {
    console.error('Erreur lors de la mise à jour du membre:', error)
    return 'Erreur lors de la mise à jour du membre'
  }
}
