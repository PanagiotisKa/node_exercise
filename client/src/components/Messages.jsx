import {Box, Typography }from '@mui/material';
import { useSelector } from 'react-redux'
import MessageItem from './MessageItem';

function Messages() {

const messages = useSelector(state => state.messages.value)

  return (
    <Box>
      <Typography align='center' variant='h5'> Messages</Typography>
      {messages.length > 0 && messages.map( (message, index) => {
        return(
          <MessageItem key={index} message={message}/>
        )
      })}  
    </Box>
  )
}

export default Messages