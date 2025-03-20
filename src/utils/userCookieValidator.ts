// decrypt the cookie , JSON parse the decrypted stuff , then  check if matches the userCookie Interface.
// this function either return false or   valid object.

import { decrypt } from './encrypt'
import { ValidateParsedUserCookieInterface } from './ParsedUserCookieInterface'

export const userCookieValidator = (cookie: string) => {
  try {
    const decrypted = JSON.parse(decrypt(cookie))
    const result = ValidateParsedUserCookieInterface(decrypted)
      ? decrypted
      : false
    return result
  } catch (e) {
    return false
  }
}
