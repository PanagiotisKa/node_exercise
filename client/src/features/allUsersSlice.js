import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const allUserSlice = createSlice({
    name: 'allUser',
    initialState: {
      value: []
    },
    reducers: { },

    extraReducers: (builder) => {
      builder.addCase(getAllUsers.pending, (state) => {
        state.value = { loading: true}
      }).addCase(getAllUsers.rejected, (state) => {
        state.value = { loading: false}
      }).addCase(getAllUsers.fulfilled, (state, action) => {
        state.value = action.payload
    })
    }
    
  })

export const getAllUsers = createAsyncThunk(
  'allUser/getAllUsers',
  async (userId) => {

    try {
      const userInfo = await axios.get( `${process.env.REACT_APP_API}/users`, { params: {} })
      return userInfo.data
      
    } catch (error) {
      console.log(error)
      return {error}
    }
  }
)

export default allUserSlice.reducer