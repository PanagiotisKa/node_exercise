import {List, ListItem, ListItemText, Avatar, Divider, Button}from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import { useSelector, useDispatch } from 'react-redux'
import { getMessages } from '../features/messagesSlice'
import { getSelectedContact } from '../features/selectedContactSlice'


function ContactItem({contact}) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const selectedContact = useSelector(state => state.selectedContact.value)

  let backColor 
  
  async  function viewMessages(){
    await dispatch(getSelectedContact (contact))
    await dispatch(getMessages([user.id, contact.contact]))
  }
  
  if(contact.contact === selectedContact.contact) backColor = '#91afe6'

  return (
    <>
      <Button>
        <ListItem key={contact.contact} sx={{m:1, p:1, background: backColor}} onClick={() => viewMessages()}>
          <Avatar> 
            <PersonIcon />
          </Avatar>
          <ListItemText sx={{m:1, pl:1}} 
          primary={contact.firstName + ' ' + contact.lastName} 
          secondary={new Date(contact.maxTimestamp)
            .toLocaleString( 'en-GB' , {  weekday: "long", year: "numeric", month: "long",  day: "numeric", hour: '2-digit', minute:'2-digit', second:'2-digit'})} />
        </ListItem>
      </Button>
    <Divider variant="middle"/>
    </>
  )
}

export default ContactItem