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
        }).addCase(getUsersContacts.rejected, (state) => {
            state.value = [{ loading: false}]
          }).addCase(getUsersContacts.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})

export const getUsersContacts = createAsyncThunk(
    'contacts/getUsersContacts',
    async (userId) => {
        try {
            const userContacts = await axios.get( `${process.env.REACT_APP_API}/users/contacts/${userId}`)
            return userContacts.data
            
        } catch (error) {
            console.log(error)
            return {error}
        }
    }
)

export default contactsSlice.reducer