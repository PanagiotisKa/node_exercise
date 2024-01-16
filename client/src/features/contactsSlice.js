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
            }).addCase()
        }
    }
)

export const getUsersContacts = createAsyncThunk(
    'contacts/getUsersContacts',
    async (userId) => {
        try {
            const userInfo = await axios.get( `${process.env.REACT_APP_API}/user/contacts/:id`)
            return userInfo.data
            
        } catch (error) {
            console.log(error)
            return {error}
        }
    }
)

  // Action creators are generated for each case reducer function
  export const { } = contactsSlice.actions
  
  export default contactsSlice.reducer