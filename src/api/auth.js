import axios from 'axios'

const API_URL = 'http://66.42.54.254:5000/api/user'
const SIGNIN_URL = API_URL + '/signIn'
const SIGNUP_URL = API_URL + '/signUp'
const VERIFY_URL = API_URL + '/verifyToken'

export function signIn (userPayload) {
  return axios.post(SIGNIN_URL, userPayload)
}

export function signUp (userPayload) {
  return axios.post(SIGNUP_URL, userPayload)
}

export function verifyToken (userToken) {
  return axios.post(VERIFY_URL, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    }
  })
}
