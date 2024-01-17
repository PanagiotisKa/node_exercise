import {Box, Typography, Card }from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

function MessageItem({message}) {
 
  const user = useSelector(state => state.user.value)
  const selectedContact = useSelector(state => state.selectedContact.value)

  let backColor, align

  if(message.sender === user.id) {
    backColor = '#91afe6'
    align = 'right'
  } else { 
    backColor = '#d5deed'
    align = 'left'
  }

  return (
    <Card sx={{ p:2, m:1, background: backColor }}>
      <Typography variant="h6" align={align}>
        {message.sender === user.id? "You: " : selectedContact.firstName + ' ' + selectedContact.lastName + ": "}
      </Typography>
      <Typography variant="h5" align={align}>
        {message.content}
      </Typography>
      <Typography variant="subtitle2" align={align} color={'#7f8287'}>
        {new Date(message.timestampSent)
          .toLocaleString( 'en-GB' , {  weekday: "long", year: "numeric", month: "long",  day: "numeric", hour: '2-digit', minute:'2-digit', second:'2-digit'})}
      </Typography>
    </Card>
  )
}

export default MessageItem