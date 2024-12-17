export type Response = {
  _id: string
  Content: string
  User_id: string
  Assignment_id: string
  createdAt: string
  status: string
}
export type ResponseForInstructor = {
  _id: string
  Content: string
  Member: {
    _id: string
    NomPrenom: string
    Email: string
  }
  Assignment_id: string
  createdAt: string
  status: string
}

export type State = {
  responses: ResponseForInstructor[]
  fetchedResponse: Response | null
}
