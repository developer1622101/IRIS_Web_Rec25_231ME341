import { Role } from '@prisma/client'

export interface UserInterface {
  loggedIn: boolean
  email?: string
  role?: Role
}
