import { ethers } from 'ethers';
import { all, put, takeLatest } from 'redux-saga/effects';
import { FETCH_VRF_REQUEST } from './actionTypes';
import { fetchVrfSuccess, fetchVrfFailure } from './actions';
import RangeVRFv2Consumer from '../artifacts/contracts/RangeVRFv2Consumer.sol/RangeVRFv2Consumer.json';

function* fetchVrfSaga(): any {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const accounts = yield provider.send('eth_requestAccounts', []);

  if (accounts.length === 0) {
    console.log('no account!');
    return;
  }

  const network = yield provider.getNetwork();
  if (network.chainId !== 4) {
    yield put(
      fetchVrfFailure({
        error: 'VRF test only available on the Rinkeby Test Network',
      }),
    );
    return;
  }

  const signer = provider.getSigner();
  const contractAddress = `${import.meta.env.VITE_RANGEVRFV2CONSUMER}`;
  const contract = new ethers.Contract(
    contractAddress,
    RangeVRFv2Consumer.abi,
    provider,
  );
  yield contract.connect(signer).requestRandomWords();
  const response = yield contract.s_randomWord();
  const result = ethers.BigNumber.from(response).toNumber();
  let vrf = { n: result };

  yield put(fetchVrfSuccess({ payload: vrf }));
}

function* vrfSagas() {
  yield all([takeLatest(FETCH_VRF_REQUEST, fetchVrfSaga)]);
}

export default vrfSagas;
