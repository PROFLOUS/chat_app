import {
  SET_SHOWDIALOG,
  SET_USER,
  SET_ISSIGNEDIN,
  SET_SHOWUPDATEFORM,
  SET_SHOWALERT,
  SET_SHOWTABHISTORYSEARH,
  SET_USERSEARCHED,
  SET_LOADINGSEARCHFUNC,
  SET_SEARCHINGSTATUS,
} from "./Actions";

//innite state
const initState = {
  user: null,
  isSignedIn: false,
  showDialog: false,
  showUpdateForm: false,
  showAlert: false,
  showTabHistorySearch: false,

  //user is searching
  userSearched: null,
  loadingSearchFunc: true,

  // state searching currently
  searchingStatus: false,
};

//depatch
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_ISSIGNEDIN:
      return {
        ...state,
        isSignedIn: action.payload,
      };
    case SET_SHOWDIALOG:
      return {
        ...state,
        showDialog: action.payload,
      };
    case SET_SHOWUPDATEFORM:
      return {
        ...state,
        showUpdateForm: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_SHOWALERT:
      return {
        ...state,
        showAlert: action.payload,
      };
    case SET_SHOWTABHISTORYSEARH:
      return {
        ...state,
        showTabHistorySearch: action.payload,
      };
    case SET_USERSEARCHED:
      return {
        ...state,
        userSearched: action.payload,
      };
    case SET_LOADINGSEARCHFUNC:
      return {
        ...state,
        loadingSearchFunc: action.payload,
      };
    case SET_SEARCHINGSTATUS:
      return {
        ...state,
        searchingStatus: action.payload,
      };
  }
};

export { initState };
export default Reducer;
