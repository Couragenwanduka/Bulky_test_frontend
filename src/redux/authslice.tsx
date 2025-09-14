import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
  updatedAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
}

interface LoginPayload {
  user: User
  token: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user 
      state.token = action.payload.token
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
    },
     updateUserData: (state, action: PayloadAction<User>) => {
        state.user = { ...state.user, ...action.payload }
    },
  },
})

export const { loginSuccess, logout, updateUserData } = authSlice.actions
export default authSlice.reducer
