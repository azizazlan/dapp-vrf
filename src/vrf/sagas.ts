import { ethers } from 'ethers';
import { all, put, takeLatest } from 'redux-saga/effects';
import { FETCH_VRF_REQUEST } from './actionTypes';
import { Vrf } from './types';
import { fetchVrfSuccess } from './actions';
import RangeVRFv2Consumer from '../artifacts/contracts/RangeVRFv2Consumer.sol/RangeVRFv2Consumer.json';

function* fetchVrfSaga(): any {
  const { ethereum } = window;
  window.ethereum.enable();
  if (!ethereum) {
    alert('Please install MetaMask!');
    return;
  }
  const provider = new ethers.providers.Web3Provider(ethereum);

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
