import { isTSInterface } from './isTSInterface'
import { UserInterface } from './UserInterface'
import axios from 'axios'

export const authHeaderCheck = async () => {
  const headers = new Headers()
  const authHeader = headers.get('authorization')
  if (authHeader) {
    try {
      const responseObject = await axios
        .post('/decrypt', {
          authHeader
        })
        .then(res => res.data)

      if (
        responseObject !== null &&
        typeof responseObject === 'object' &&
        'authHeader' in responseObject &&
        typeof responseObject['authHeader'] === 'string'
      ) {
        const decryptedAuthHeader = responseObject['authHeader']

        const decryptedObject = JSON.parse(decryptedAuthHeader)
        const check = isTSInterface<UserInterface>(
          decryptedObject,
          ['loggedIn', 'email', 'role'],
          ['loggedIn', 'email', 'role']
        )

        return decryptedAuthHeader
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
