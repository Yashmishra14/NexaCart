import { createSlice } from '@reduxjs/toolkit'

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (err) {
    return null
  }
}

let decodedUser = null
const token = localStorage.getItem('user_token')

if (token) {
  try {
    const decoded = decodeToken(token)
    const nowTime = Math.floor(Date.now() / 1000)
    if (decoded && decoded.exp > nowTime) {
      decodedUser = decoded
    } else {
      localStorage.removeItem('user_token')
    }
  } catch (error) {
    localStorage.removeItem('user_token')
    console.error('Error decoding token:', error)
  }
};

const initialState = {
  token: token || null,
  user: decodedUser,
  isloggin: !!decodedUser
};

const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        const { token } = action.payload
        state.token = token
        localStorage.setItem('user_token', token)
        try {
          const decoded = decodeToken(token)
          state.user = decoded
          state.isloggin = !!decoded
        } catch (error) {
          console.log('Token Decode Error', error)
        }

    }
    ,
    logout: (state) => {
      state.token = null
      state.user = null
      state.isloggin = false
      try {
        localStorage.removeItem('user_token')
      } catch (e) {
        // ignore
      }
    }
  }
})

export const { setUser, logout } = userslice.actions
export default userslice.reducer