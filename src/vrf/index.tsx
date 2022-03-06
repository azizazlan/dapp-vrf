import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  getErrorSelector,
  getPendingSelector,
  getVrfsSelector,
} from './selectors';
import { fetchVrfRequest } from './actions';
import BasicAlert from '../alert';

const Vrf = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);
  const randomNumbers = useSelector(getVrfsSelector);

  const handleFetchVrf = () => {
    dispatch(fetchVrfRequest());
  };

  if (!randomNumbers || randomNumbers.length === 0) {
    return (
      <div>
        <div style={{ minHeight: '20px' }}>
          {error ? <BasicAlert severity="error" message={error} /> : null}
          {pending ? <LinearProgress /> : null}
        </div>
        <div style={{ minHeight: '100px' }}>
          <Paper
            style={{ padding: '7px', maxWidth: '100px', textAlign: 'center' }}
            elevation={3}
          >
            <Typography variant="h2">?</Typography>
          </Paper>
        </div>
        <Button onClick={handleFetchVrf} variant="contained">
          go flooky
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ minHeight: '20px' }}>
        {error ? <BasicAlert severity="error" message={error} /> : null}
        {pending ? <LinearProgress /> : null}
      </div>
      <div style={{ minHeight: '100px' }}>
        <Paper
          style={{ padding: '7px', maxWidth: '100px', textAlign: 'center' }}
          elevation={3}
        >
          <Typography variant="h2" color="secondary">
            {randomNumbers[randomNumbers.length - 1].n}
          </Typography>
        </Paper>
      </div>
      <Button onClick={handleFetchVrf} variant="contained">
        go flooky
      </Button>
    </div>
  );
};

export default Vrf;
