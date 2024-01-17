import {Box, Typography, List}from '@mui/material'
import ContactItem from './ContactItem'
import { useSelector, useDispatch } from 'react-redux'
import { getUsersContacts } from '../features/contactsSlice'
import { useEffect } from 'react';

function Contacts() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const contacts = useSelector(state=> state.contacts.value)

  useEffect( () => { 
    if(user.id !== undefined) {
      dispatch(getUsersContacts(user.id))
    }
  }, [user])

  return (
    <Box>
      <Typography align='center' variant='h5'>Contacts</Typography>

      { contacts.length > 0 &&
      <List sx={{ width: '100%',  bgcolor: 'background.paper',  }}>
          {contacts.map( (contact, index) => {
          return (
            <ContactItem key={index} contact={contact}/>
            )
          })}
      </List>
        }
    </Box>
  )
}

export default Contacts