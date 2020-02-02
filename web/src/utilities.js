import ky from 'ky'

const prefixUrl = 'http://localhost:4701'

export const request = async (method = 'get', path = '', payload = {}, options = {}) => {
   options = {
      ...options,
      method,
      prefixUrl,
      json: payload
   }
   return ky(path, options).json()
}