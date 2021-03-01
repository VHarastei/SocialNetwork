import { APIResponseType, ResultCodesEnum } from './../api/api';
import { usersAPI } from './../api/usersAPI';
import usersReducer, { actions, InitialStateType, toggleFollow } from './usersReducer';

jest.mock('./../api/usersAPI');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Succes,
  messages: [],
  data: {},
};

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'user0',
        followed: false,
        photos: {
          small: '00',
          large: '00',
        },
        status: 'status0',
      },
      {
        id: 1,
        name: 'user1',
        followed: false,
        photos: {
          small: '01',
          large: '01',
        },
        status: 'status1',
      },
      {
        id: 2,
        name: 'user2',
        followed: true,
        photos: {
          small: '02',
          large: '02',
        },
        status: 'status2',
      },
      {
        id: 3,
        name: 'user3',
        followed: true,
        photos: {
          small: '03',
          large: '03',
        },
        status: 'status3',
      },
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
      term: '',
      friend: null,
    }
  };
});

test('ToggleFollow', () => {
  const newState = usersReducer(state, actions.toggleFollowSucceded(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('ToggleUnfollow', () => {
  const newState = usersReducer(state, actions.toggleFollowSucceded(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});

test('ToggleFollow thunk should be follow', async () => {
  usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

  const thunk = toggleFollow(2, false);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowSucceded(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});

test('ToggleFollow thunk should be unfollow', async () => {
  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

  const thunk = toggleFollow(2, true);
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 2));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowSucceded(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 2));
});