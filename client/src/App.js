import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Messages from './components/Messages';
import Contacts from './components/Contacts';
import UserSelector from './components/UserSelector';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Card sx={{m:2, mb:0, p:1, background: '#6f7d8f' }}>
            <UserSelector/>
          </Card>
        </Grid>
        <Grid xs={9}>
          <Card sx={{m:2, mr:0, mt:0, p:1, background: '#cad5e3'}}>
            <Messages/>
          </Card>
        </Grid>
        <Grid alignItems="center" xs={3}>
          <Card sx={{m:2, ml:0, mt:0, p:1, background: '#cad5e3'}}>
            <Contacts/>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
