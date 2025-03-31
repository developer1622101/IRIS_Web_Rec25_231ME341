import { Role } from '@prisma/client'

interface Profile {
  name: string
  yearOfGraduation: string
  branch: string
  rollNo: string
}

export interface UserInterface {
  loggedIn: boolean
  email?: string
  role?: Role
  profile?: Profile
  id?: string
  banned?: boolean
}
