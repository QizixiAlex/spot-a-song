const initialState = {
  userId: null,
  userName: null,
  songList: [],
  playListId: null,
  playlists: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "USER_LOGIN":
      return {
          ...state,
          userId: action.userId,
          userName: action.userName
      };
    case "SET_SONGLIST":
      return {
        ...state,
        songList: action.songList
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists
      };
    default:
      return state;
  }
};

export default reducer;
