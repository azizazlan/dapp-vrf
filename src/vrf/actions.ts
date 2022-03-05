import {
  FETCH_VRF_FAILURE,
  FETCH_VRF_REQUEST,
  FETCH_VRF_SUCCESS,
} from './actionTypes';
import {
  FetchVrfFailure,
  FetchVrfRequest,
  FetchVrfSuccess,
  FetchVrfSuccessPayload,
  FetchVrfFailurePayload,
} from './types';

export const fetchVrfRequest = (): FetchVrfRequest => ({
  type: FETCH_VRF_REQUEST,
});

export const fetchVrfSuccess = (
  payload: FetchVrfSuccessPayload,
): FetchVrfSuccess => ({
  type: FETCH_VRF_SUCCESS,
  payload,
});

export const fetchVrfFailure = (
  payload: FetchVrfFailurePayload,
): FetchVrfFailure => ({
  type: FETCH_VRF_FAILURE,
  payload,
});
