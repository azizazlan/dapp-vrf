import {
  FETCH_VRF_FAILURE,
  FETCH_VRF_REQUEST,
  FETCH_VRF_SUCCESS,
} from './actionTypes';
import { VrfActions, VrfState } from './types';

const initialState: VrfState = {
  pending: false,
  randomNumbers: [],
  error: null,
};

export default (state = initialState, action: VrfActions) => {
  let updatedList = [...state.randomNumbers];
  switch (action.type) {
    case FETCH_VRF_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_VRF_SUCCESS:
      updatedList = [...state.randomNumbers, action.payload.payload];
      return {
        ...state,
        pending: false,
        randomNumbers: updatedList,
        error: null,
      };
    case FETCH_VRF_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        randomNumbers: [],
      };
    default:
      return {
        ...state,
      };
  }
};
