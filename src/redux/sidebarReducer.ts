type FriendsType = {
  id: number;
  name: string;
};

let initialState = {
  friends: [
    { id: 1, name: 'Rosdick' },
    { id: 2, name: 'Kerets' },
    { id: 3, name: 'booba' },
  ] as Array<FriendsType>
};

let sidebarReducer = (state = initialState, action: any) => {
  return state;
};

export default sidebarReducer;
