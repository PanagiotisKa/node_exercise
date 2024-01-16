import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const messages = createSlice({
    name: 'messages',
    initialState: {
      value: []
    },
    reducers: {},

    extraReducers: (builder) => {
      builder.addCase(getMessages.pending, (state) => {
        state.value = { loading: true}
      }).addCase(getMessages.fulfilled, (state, action) => {
        state.value = action.payload
    })
    }, 
  })

  export const getMessages = createAsyncThunk(
    'messages/getMessages',
    async (usersIds) => {

      try {
        const userInfo = await axios.get( `${process.env.REACT_APP_API}/user/exchange/${usersIds[0]}/${usersIds[1]}`, { params: {} })
        return userInfo.data
        
      } catch (error) {
          console.log(error)
          return {error}
      }
    }
  )

  
  // Action creators are generated for each case reducer function
  export const { setUser } = messages.actions
  
  export default messages.reducer