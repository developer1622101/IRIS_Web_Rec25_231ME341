import { isTSInterface } from './isTSInterface'

export interface ParsedUserCookieInterface {
  id: number
  email: string
}

export function ValidateParsedUserCookieInterface (obj: object) {
  return isTSInterface<ParsedUserCookieInterface>(
    obj,
    ['email', 'id'],
    ['email', 'id']
  )
}
