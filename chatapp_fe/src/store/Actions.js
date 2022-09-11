//actions

export const SET_ISSIGNEDIN = "set_isSignedIn";
export const SET_USER = "set_User";
export const SET_USERSEARCHED = "set_UserSearch";
export const SET_SHOWDIALOG = "set_Dialog";
export const SET_SHOWUPDATEFORM = "set_ShowUpdateForm";
export const SET_SHOWALERT = "set_ShowAlert";
export const SET_SHOWTABHISTORYSEARH = "set_ShowTabHistorySearch";
export const SET_LOADINGSEARCHFUNC = "set_LoadingSearchFunc";
export const SET_SEARCHINGSTATUS = "set_SearchStatus";

export const SetIsSignedIn = (payload) => {
  return {
    type: SET_ISSIGNEDIN,
    payload,
  };
};

export const SetUser = (payload) => {
  return {
    type: SET_USER,
    payload,
  };
};
export const SetUserSearched = (payload) => {
  return {
    type: SET_USERSEARCHED,
    payload,
  };
};
export const SetDialogShow = (payload) => {
  return {
    type: SET_SHOWDIALOG,
    payload,
  };
};
export const SetShowUpdateForm = (payload) => {
  return {
    type: SET_SHOWUPDATEFORM,
    payload,
  };
};

export const SetShowALert = (payload) => {
  return {
    type: SET_SHOWALERT,
    payload,
  };
};

export const SetShowTabHistorySearch = (payload) => {
  return {
    type: SET_SHOWTABHISTORYSEARH,
    payload,
  };
};

export const SetLoadingSearchFunc = (payload) => {
  return {
    type: SET_LOADINGSEARCHFUNC,
    payload,
  };
};

export const SetSearchingStatus = (payload) => {
  return {
    type: SET_SEARCHINGSTATUS,
    payload,
  };
};
