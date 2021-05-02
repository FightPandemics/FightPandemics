export const MEMBERS_ACTIONS = {
  FINISH_LOADING: "FINISH_LOADING",
  FETCH_MEMBERS_SUCCESS: "FETCH_MEMBERS_SUCCESS",
  FETCH_MEMBERS_BEGIN: "FETCH_MEMBERS_BEGIN",
  FETCH_MEMBERS_ERROR: "FETCH_MEMBERS_ERROR",
  FETCH_PROFILE_MEMBERS_SUCCESS: "FETCH_PROFILE_MEMBERS_SUCCESS",
  UPDATE_PROFILE_MEMBER_SUCCESS: "UPDATE_PROFILE_MEMBER_SUCCESS",
  NEXT_PAGE: "NEXT_PAGE",
  SET_PAGE: "SET_PAGE",
  RESET_PAGE: "RESET_PAGE",
  SET_LOADING: "SET_LOADING",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};

export const resetPageAction = ({ isLoading = false, loadMore = true }) => ({
  type: MEMBERS_ACTIONS.RESET_PAGE,
  payload: {
    isLoading,
    loadMore,
  },
});

export const fetchMembersBegin = () => ({
  type: MEMBERS_ACTIONS.FETCH_MEMBERS_BEGIN,
});

export const fetchMembersSuccess = ({ members }) => ({
  type: MEMBERS_ACTIONS.FETCH_MEMBERS_SUCCESS,
  payload: members,
});

export const fetchProfileMemberSuccess = ({
  members,
  userId,
  objective,
  mode,
}) => ({
  type: MEMBERS_ACTIONS.FETCH_PROFILE_MEMBERS_SUCCESS,
  payload: { members, userId, objective, mode },
});

export const updateProfileMemberSucess = ({ member, userId }) => ({
  type: MEMBERS_ACTIONS.UPDATE_PROFILE_MEMBER_SUCCESS,
  payload: { member, userId },
});

export const fetchMembersError = (error) => ({
  type: MEMBERS_ACTIONS.FETCH_MEMBERS_ERROR,
  payload: error,
});

export const finishLoadingAction = () => ({
  type: MEMBERS_ACTIONS.FINISH_LOADING,
});

export const setNextPageAction = () => ({
  type: MEMBERS_ACTIONS.NEXT_PAGE,
});

export const setPageAction = (page) => ({
  type: MEMBERS_ACTIONS.SET_PAGE,
  payload: { page },
});

export const setLoadingAction = ({ isLoading, loadMore }) => ({
  type: MEMBERS_ACTIONS.SET_LOADING,
  payload: { isLoading, loadMore },
});

export const setReported = ({ memberId }) => ({
  type: MEMBERS_ACTIONS.SET_REPORTED,
  payload: { memberId },
});

export const showAnyway = ({ memberId }) => ({
  type: MEMBERS_ACTIONS.SHOW_ANYWAY,
  payload: { memberId },
});

export const membersActions = {
  resetPageAction,
  fetchMembersBegin,
  fetchMembersSuccess,
  fetchProfileMemberSuccess,
  fetchMembersError,
  finishLoadingAction,
  setLoadingAction,
  setNextPageAction,
  setPageAction,
  setReported,
  showAnyway,
  updateProfileMemberSucess,
};
