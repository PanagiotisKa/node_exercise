import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      value: { firstName: "test"}
    },
    reducers: {
      setUser: (state, action) => {

        // get response from server: Get User Endpoint with parameter id = action.payload
        // ..... and then: 

        const response = {id: 99, firstName: 'Takis', lastName: 'Smith', gender: 'Male'}
        
        state.value = response
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setUser } = userSlice.actions
  
  export default userSlice.reducer