import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      value: { firstName: "test"}
    },
    reducers: {
      setUser: (state, action) => {
        const response = {id: 99, firstName: 'Takis', lastName: 'Smith', gender: 'Male'}
        state.value = response
      }
    },

    extraReducers: (builder) => {
      builder.addCase(getUserInfo.pending, (state) => {
        state.value = { loading: true}
      }).addCase(getUserInfo.fulfilled, (state, action) => {
        state.value = action.payload
    })
    },

    

    
  })

  export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (userId) => {

      try {
        const userInfo = await axios.get( `${process.env.REACT_APP_API}/users`, { params: { id: userId } })
        return userInfo.data[0]
        
      } catch (error) {
        console.log(error)
        return {error}
      }
    }
  )

  export const geAllUsers = createAsyncThunk(
    'user/getUserInfo',
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
  
  // Action creators are generated for each case reducer function
  export const { setUser } = userSlice.actions
  
  export default userSlice.reducer