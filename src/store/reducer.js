const initialState = {
  userId: null,
  userName: null,
  songList: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "USER_LOGIN":
      return {
          ...state,
          userId: action.userId,
          userName: action.userName
      };
    default:
      return state;
  }
};

export default reducer;
