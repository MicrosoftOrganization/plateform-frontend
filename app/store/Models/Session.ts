export type Session = {
  _id: string
  Title: string
  Description: string
  Instructor: string
  InstructorId: string
  Date: string
  createdAt: string
  Room: string
}

export type State = {
  sessions: Session[]
}
