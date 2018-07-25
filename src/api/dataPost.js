import axios from 'axios'

const POST_DATA_URL = 'http://66.42.54.254:5000/api/csvdata'

export function postData (data, userToken) {
  return axios.post(POST_DATA_URL, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    }
  })
}
