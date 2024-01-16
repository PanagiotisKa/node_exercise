import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import allUsersReducer from './features/allUsersSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer
  }
})