import {Box, Typography, FormControl, Select,  MenuItem, Grid }from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { getUserInfo } from '../features/userSlice'
import { getAllUsers } from '../features/allUsersSlice'
import { resetSelectedContact } from '../features/selectedContactSlice';
import {resetMessages } from '../features/messagesSlice'
import { useEffect } from 'react';

function UserSelector() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const allUers = useSelector(state => state.allUsers.value)

  useEffect( () => {
    dispatch(getAllUsers())
  }, [])

  function getData(e) {
    dispatch(resetMessages())
    dispatch(resetSelectedContact())
     dispatch(getUserInfo (e.target.value))
  }

  return (
    <Box sx={{p:2}}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Typography variant='h5'color={'white'}></Typography>
        </Grid>
        <Grid xs={4}>
          <Typography variant='h6'color={'white'}> Who you are?  Select User:</Typography>
          <FormControl sx={{width: '100%', p:1 }}>
            <Select sx={{ background: 'white'}} value={''} onChange={(e) => getData(e)}>
              {allUers.length > 0 && allUers.map( item => {
                return(
                  <MenuItem key={item.id} value={item.id}>
                    {item. firstName} {' '} {item.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <Typography variant='h6'color={'white'} paddingLeft={5}>
            {user.firstName && 'welcome'}
          </Typography>
          <Typography variant='h3'color={'white'} paddingLeft={5}>
            {user.loading && "Loading..."}
            {user.firstName && user.firstName}
            {' '}
            {user.lastName && user.lastName}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserSelector