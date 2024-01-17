import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import allUsersReducer from './features/allUsersSlice'
import contactsReducers from './features/contactsSlice'
import messagesReducers from './features/messagesSlice'
import selectedContactReducers from './features/selectedContactSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    allUsers: allUsersReducer,
    contacts: contactsReducers,
    messages: messagesReducers,
    selectedContact: selectedContactReducers
  }
})