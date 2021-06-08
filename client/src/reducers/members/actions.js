export const MEMBERS_ACTIONS = {
  FINISH_LOADING_MEMBERS: "FINISH_LOADING_MEMBERS",
  FETCH_MEMBERS_SUCCESS: "FETCH_MEMBERS_SUCCESS",
  FETCH_MEMBERS_BEGIN: "FETCH_MEMBERS_BEGIN",
  FETCH_MEMBERS_ERROR: "FETCH_MEMBERS_ERROR",
  FETCH_PROFILE_MEMBERS_SUCCESS: "FETCH_PROFILE_MEMBERS_SUCCESS",
  UPDATE_PROFILE_MEMBER_SUCCESS: "UPDATE_PROFILE_MEMBER_SUCCESS",
  NEXT_PAGE_MEMBERS: "NEXT_PAGE_MEMBERS",
  SET_PAGE_MEMBERS: "SET_PAGE_MEMBERS",
  RESET_PAGE_MEMBERS: "RESET_PAGE_MEMBERS",
  SET_LOADING_MEMBERS: "SET_LOADING_MEMBERS",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};

export const resetPageAction = ({ isLoadingMembers = false, loadMoreMembers = true }) => ({
  type: MEMBERS_ACTIONS.RESET_PAGE_MEMBERS,
  payload: {
    isLoadingMembers,
    loadMoreMembers,
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
  type: MEMBERS_ACTIONS.FINISH_LOADING_MEMBERS,
});

export const setNextPageAction = () => ({
  type: MEMBERS_ACTIONS.NEXT_PAGE_MEMBERS,
});

export const setPageAction = (pageMembers) => ({
  type: MEMBERS_ACTIONS.SET_PAGE_MEMBERS,
  payload: { pageMembers },
});

export const setLoadingAction = ({ isLoadingMembers, loadMoreMembers }) => ({
  type: MEMBERS_ACTIONS.SET_LOADING_MEMBERS,
  payload: { isLoadingMembers, loadMoreMembers },
});

export const setReported = ({ applicantId }) => ({
  type: MEMBERS_ACTIONS.SET_REPORTED,
  payload: { applicantId },
});

export const showAnyway = ({ applicantId }) => ({
  type: MEMBERS_ACTIONS.SHOW_ANYWAY,
  payload: { applicantId },
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
