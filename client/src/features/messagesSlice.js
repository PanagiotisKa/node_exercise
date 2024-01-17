import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const messages = createSlice({
  name: 'messages',
  initialState: {
    value: []
  },
  reducers: {
    resetMessages: (state)=> {
      state.value = []
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.value = { loading: true}
    }).addCase(getMessages.rejected, (state) => {
      state.value = { loading: false}
    }).addCase(getMessages.fulfilled, (state, action) => {
      state.value = action.payload
    })
  } 
})

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (usersIds) => {
    try {
      const messages = await axios.get( `${process.env.REACT_APP_API}/users/messages/${usersIds[0]}/${usersIds[1]}`, { params: {} })
      return messages.data
      
    } catch (error) {
        console.log(error)
        return {error}
    }
  }
)
  
export const { resetMessages } = messages.actions
export default messages.reducer