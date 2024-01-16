import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const contactsSlice = createSlice({
        name: 'contacts',
        initialState: {
            value: []
        },
        reducers: {},

        extraReducers: (builder) => {
            builder.addCase(getUsersContacts.pending, (state)=> {
                state.value = [{loading: true}]
            }).addCase(getUsersContacts.fulfilled, (state, action) => {
                state.value = action.payload
            })
        }
    }
)

export const getUsersContacts = createAsyncThunk(
    'contacts/getUsersContacts',
    async (userId) => {
        try {
            const userContacts = await axios.get( `${process.env.REACT_APP_API}/user/contacts/${userId}`)
            return userContacts.data
            
        } catch (error) {
            console.log(error)
            return {error}
        }
    }
)

  // Action creators are generated for each case reducer function
  export const { } = contactsSlice.actions
  
  export default contactsSlice.reducer