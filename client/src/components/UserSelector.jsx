import {Box, Typography }from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../features/userSlice'

function UserSelector() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)

  return (
    <>
    <Box>
      <Typography variant='h5'color={'white'}>
          Who you are? Select User: {user.firstName? user.firstName : "default user"}
      </Typography>
      <Typography variant='h4'color={'white'}>
          {user.firstName? user.firstName : "default user"}
           {' '}
          {user.lastName? user.lastName : "default user"}
      </Typography>

    </Box>
            <button   onClick={() => dispatch(setUser())} />
    </>
  )
}

export default UserSelector