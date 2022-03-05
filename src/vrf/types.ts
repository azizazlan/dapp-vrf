import {
  FETCH_VRF_REQUEST,
  FETCH_VRF_SUCCESS,
  FETCH_VRF_FAILURE,
} from './actionTypes';

export interface Vrf {
  n: number;
}

export interface VrfState {
  randomNumbers: Vrf[];
  error: string | null;
  pending: boolean;
}

export interface FetchVrfRequest {
  type: typeof FETCH_VRF_REQUEST;
}

export interface FetchVrfSuccess {
  type: typeof FETCH_VRF_SUCCESS;
  payload: FetchVrfSuccessPayload;
}

export interface FetchVrfSuccessPayload {
  payload: Vrf;
}

export interface FetchVrfFailure {
  type: typeof FETCH_VRF_FAILURE;
  payload: FetchVrfFailurePayload;
}

export interface FetchVrfFailurePayload {
  error: string;
}

export type VrfActions = FetchVrfRequest | FetchVrfFailure | FetchVrfSuccess;
