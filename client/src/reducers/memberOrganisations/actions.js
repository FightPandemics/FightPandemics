export const MEMBER_ORGS_ACTIONS = {
  FINISH_LOADING: "FINISH_LOADING",
  FETCH_MEMBER_ORGS_SUCCESS: "FETCH_MEMBER_ORGS_SUCCESS",
  FETCH_MEMBER_ORGS_BEGIN: "FETCH_MEMBER_ORGS_BEGIN",
  FETCH_MEMBER_ORGS_ERROR: "FETCH_MEMBER_ORGS_ERROR",
  FETCH_PROFILE_MEMBER_ORGS_SUCCESS: "FETCH_PROFILE_MEMBER_ORGS_SUCCESS",
  UPDATE_PROFILE_MEMBER_ORG_SUCCESS: "UPDATE_PROFILE_MEMBER_ORG_SUCCESS",
  NEXT_PAGE: "NEXT_PAGE",
  SET_PAGE: "SET_PAGE",
  RESET_PAGE: "RESET_PAGE",
  SET_LOADING: "SET_LOADING",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};
 
export const resetPageAction = ({ isLoading = false, loadMore = true }) => ({
  type: MEMBER_ORGS_ACTIONS.RESET_PAGE,
  payload: {
    isLoading,
    loadMore,
  },
});
 
export const fetchMemberOrgsBegin = () => ({
  type: MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_BEGIN,
});
 
export const fetchMemberOrgsSuccess = ({ memberOrgs }) => ({
  type: MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_SUCCESS,
  payload: memberOrgs,
});
 
export const fetchProfileMemberOrgSuccess = ({
  memberOrgs,
  userId,
  objective,
  mode,
}) => ({
  type: MEMBER_ORGS_ACTIONS.FETCH_PROFILE_MEMBER_ORGS_SUCCESS,
  payload: { memberOrgs, userId, objective, mode },
});
 
export const updateProfileMemberOrgSucess = ({ memberOrg, userId }) => ({
  type: MEMBER_ORGS_ACTIONS.UPDATE_PROFILE_MEMBER_ORG_SUCCESS,
  payload: { memberOrg, userId },
});
 
export const fetchMemberOrgsError = (error) => ({
  type: MEMBER_ORGS_ACTIONS.FETCH_MEMBER_ORGS_ERROR,
  payload: error,
});
 
export const finishLoadingAction = () => ({
  type: MEMBER_ORGS_ACTIONS.FINISH_LOADING,
});
 
export const setNextPageAction = () => ({
  type: MEMBER_ORGS_ACTIONS.NEXT_PAGE,
});
 
export const setPageAction = (page) => ({
  type: MEMBER_ORGS_ACTIONS.SET_PAGE,
  payload: { page },
});
 
export const setLoadingAction = ({ isLoading, loadMore }) => ({
  type: MEMBER_ORGS_ACTIONS.SET_LOADING,
  payload: { isLoading, loadMore },
});
 
export const setReported = ({ memberOrgId }) => ({
  type: MEMBER_ORGS_ACTIONS.SET_REPORTED,
  payload: { memberOrgId },
});
 
export const showAnyway = ({ memberOrgId }) => ({
  type: MEMBER_ORGS_ACTIONS.SHOW_ANYWAY,
  payload: { memberOrgId },
});
 
export const memberOrgsActions = {
  resetPageAction,
  fetchMemberOrgsBegin,
  fetchMemberOrgsSuccess,
  fetchProfileMemberOrgSuccess,
  fetchMemberOrgsError,
  finishLoadingAction,
  setLoadingAction,
  setNextPageAction,
  setPageAction,
  setReported,
  showAnyway,
  updateProfileMemberOrgSucess,
};
 
 

