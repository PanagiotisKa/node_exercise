import {Box, Typography, FormControl, InputLabel, Select,  MenuItem }from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '../features/userSlice'
import { getAllUsers } from '../features/allUsersSlice'
import { useEffect } from 'react';
function UserSelector() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const allUers = useSelector(state => state.allUsers.value)


  useEffect( () => { 
    dispatch(getAllUsers())
  }, [])

  return (
    <>
    <Box sx={{p:2}}>
      <Typography variant='h5'color={'white'}>
          Who you are? Select User: 
      </Typography>
      <FormControl sx={{width: '30%', p:1}}>
        <Select
          value={''}
          onChange={(e) => dispatch(getUserInfo (e.target.value))}
        >
          {allUers.length > 0 && allUers.map( item => {
            return(

              <MenuItem value={item.id}>{item. firstName} {' '} {item.lastName}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Typography variant='h4'color={'white'}>
        {user.loading && "Loading..."}
        {user.firstName? user.firstName : "default user"}
          {' '}
        {user.lastName? user.lastName : "default user"}
      </Typography>

    </Box>
    </>
  )
}

export default UserSelector