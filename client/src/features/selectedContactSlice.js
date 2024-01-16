import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const selectedContact = createSlice({
    name: 'selectedContact',
    initialState: {
      value: {}
    },
    reducers: {
        getSelectedContact: (state, action) => {
            state.value = action.payload
          },

        resetSelectedContact: (state)=> {
          state.value = {}
        }
    },

  
  })


  // Action creators are generated for each case reducer function
  export const { getSelectedContact, resetSelectedContact } = selectedContact.actions
  
  export default selectedContact.reducer