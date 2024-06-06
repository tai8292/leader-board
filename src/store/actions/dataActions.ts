import {Dispatch} from 'redux';
import leaderboard from '../../resources/assets/leaderboard.json';
import {LeaderBoard} from '../../base/types/leader-board';
import {Alert} from 'react-native';

export const GET_DATA_REQUEST = 'GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_ERROR = 'GET_DATA_ERROR';

interface GetDataRequestAction {
  type: typeof GET_DATA_REQUEST;
}

interface GetDataSuccessAction {
  type: typeof GET_DATA_SUCCESS;
  payload: any[];
}

interface GetDataFailureAction {
  type: typeof GET_DATA_ERROR;
  payload: string;
}

export type DataActionTypes =
  | GetDataRequestAction
  | GetDataSuccessAction
  | GetDataFailureAction;

export const fetchDataRequest = (): GetDataRequestAction => ({
  type: GET_DATA_REQUEST,
});

export const fetchDataSuccess = (
  data: LeaderBoard[],
): GetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: string): GetDataFailureAction => ({
  type: GET_DATA_ERROR,
  payload: error,
});

export const getDataFromJson = (username?: string) => {
  return async (dispatch: Dispatch<DataActionTypes>) => {
    try {
      dispatch(fetchDataFailure(''));
      dispatch(fetchDataRequest());
      const data: LeaderBoard[] = [];
      Object.keys(leaderboard).forEach(key => {
        data.push(leaderboard[key as keyof typeof leaderboard] as any);
      });
      data.sort((a, b) => (b?.bananas || 0) - (a?.bananas || 0));
      const indexUser = data.findIndex(item => item?.name === username);
      if (indexUser < 0) {
        dispatch(fetchDataFailure('Not Found'));
        Alert.alert(
          'Not Found',
          'This user name does not exist! Please specify an existing user name!',
        );
        return;
      }
      if (indexUser < 10) {
        dispatch(
          fetchDataSuccess(
            data
              .slice(0, 10)
              .map((item, index) => ({...item, rank: index + 1})),
          ),
        );
        return;
      }
      dispatch(
        fetchDataSuccess(
          [...data.slice(0, 9), data[indexUser]].map((item, index) =>
            index < 10
              ? {...item, rank: index + 1}
              : {...item, rank: indexUser + 1},
          ),
        ),
      );
      return;
    } catch (error: any) {
      dispatch(fetchDataFailure(error?.message));
    }
  };
};
