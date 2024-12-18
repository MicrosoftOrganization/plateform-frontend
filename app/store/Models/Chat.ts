export type User = {
  _id: string
  NomPrenom: string
  Email: string
}

export type Chat = {
  _id: string
  Content: string
  Instructor: User
  Member: User
  Assignment_id: string
  createdAt: string
  status: string
}
export type Message = {
  _id: string
  chat: string
  sender: string
  text: string
  createdAt: string
}

export type State = {
  chats: Chat[]
  fetchedResponse: Response | null
}
