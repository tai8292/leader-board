import {LeaderBoard} from '../../base/types/leader-board';
import {
  DataActionTypes,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_ERROR,
} from '../actions/dataActions';

interface DataState {
  loading: boolean;
  data: LeaderBoard[];
  error: string | null;
}

const initialState: DataState = {
  loading: false,
  data: [],
  error: null,
};

const dataReducer = (
  state = initialState,
  action: DataActionTypes,
): DataState => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {...state, loading: true};
    case GET_DATA_SUCCESS:
      return {...state, loading: false, data: action.payload};
    case GET_DATA_ERROR:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default dataReducer;
