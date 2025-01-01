export type Member = {
  NomPrenom: string
  className: string
  ImageLink: string
}
export type MemberForAdmin = {
  _id: string
  NomPrenom: string
  Email: string
  Password: string
  Role: string
  Adresse: string
  ImageLink: string
  DepartmentIds: string[]
  FormattedDepartmentsIds: string
}
export type State = {
  members: Member[]
  membersForAdmin: MemberForAdmin[]
}
