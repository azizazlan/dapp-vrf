import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import {
  getErrorSelector,
  getPendingSelector,
  getVrfsSelector,
} from './selectors';
import { fetchVrfRequest } from './actions';
import Table from './Table';
import { Divider } from '@mui/material';

const Vrf = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);
  const randomNumbers = useSelector(getVrfsSelector);

  // React.useEffect(() => {
  //   dispatch(fetchVrfRequest());
  // }, []);

  const handleFetchVrf = () => {
    dispatch(fetchVrfRequest());
  };

  if (!randomNumbers || randomNumbers.length === 0) {
    return (
      <div>
        {pending ? <LinearProgress /> : null}
        <Divider
          orientation="vertical"
          flexItem
          style={{ minHeight: '15px' }}
        />
        <Button onClick={handleFetchVrf} variant="contained">
          random
        </Button>
      </div>
    );
  }

  return (
    <div>
      {pending ? <LinearProgress /> : null}
      <Divider orientation="vertical" flexItem style={{ minHeight: '15px' }} />
      <Typography variant="h3">
        {randomNumbers[randomNumbers.length - 1].n}
      </Typography>
      <Button onClick={handleFetchVrf} variant="contained">
        get flooky number now!
      </Button>
    </div>
  );
};

export default Vrf;
