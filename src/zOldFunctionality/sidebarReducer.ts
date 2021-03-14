import { FriendsType } from '../types/types';

let initialState = {
  friends: [
    { id: 1, name: 'Rosdick' },
    { id: 2, name: 'Kerets' },
  ] as Array<FriendsType>,
};

let sidebarReducer = (state = initialState, action: any) => {
  return state;
};

export default sidebarReducer;
