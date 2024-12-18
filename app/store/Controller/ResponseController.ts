import axiosInstance from '@/axiosInstance*'
import { ENDPOINTS } from '@/store/constants/api'
import { Response, ResponseForInstructor } from '@/store/Models/Response'

export const fetchResponses = async (
  id: string
): Promise<ResponseForInstructor[]> => {
  try {
    const response = await axiosInstance.get<ResponseForInstructor[]>(
      ENDPOINTS.FETCH_RESPONSES_FOR_INSTRUCTOR(id)
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des responses:', error)
  }
}

export const addResponse = async (
  Content: string,
  User_Id: string,
  Assignment_Id: string
): Promise<string> => {
  try {
    const response = await axiosInstance.post(
      ENDPOINTS.ADD_RESPONSE_FOR_MEMBER,
      {
        userId: User_Id,
        assignmentId: Assignment_Id,
        content: Content
      }
    )
    console.log(response.data)
    return 'Response added successfully'
  } catch (error) {
    console.error('Error while adding the response:', error)
    return 'Error while adding the response'
  }
}
export const fetchResponseByAssignmentAndUser = async (
  assignmentId: string,
  userId: string
): Promise<Response> => {
  try {
    const response = await axiosInstance.get(
      ENDPOINTS.FETCH_RESPONSE_BY_ASSIGNMENT_AND_USER,
      {
        params: { assignmentId, userId }
      }
    )

    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error while adding the response:', error)
    return null
  }
}
export const update_Response_By_Member = async (
  dataResponse: Response
): Promise<Response> => {
  try {
    const response = await axiosInstance.put<Response>(
      ENDPOINTS.UPDATE_RESPONSE_BY_MEMBER(dataResponse._id),
      dataResponse
    )

    console.log('response.data')
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error while adding the response:', error)
    return null
  }
}
