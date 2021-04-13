export const APPLICANTS_ACTIONS = {
  FINISH_LOADING: "FINISH_LOADING",
  FETCH_APPLICANTS_SUCCESS: "FETCH_APPLICANTS_SUCCESS",
  FETCH_APPLICANTS_BEGIN: "FETCH_APPLICANTS_BEGIN",
  FETCH_APPLICANTS_ERROR: "FETCH_APPLICANTS_ERROR",
  FETCH_PROFILE_APPLICANTS_SUCCESS: "FETCH_PROFILE_APPLICANTS_SUCCESS",
  UPDATE_PROFILE_APPLICANT_SUCCESS: "UPDATE_PROFILE_APPLICANT_SUCCESS",
  NEXT_PAGE: "NEXT_PAGE",
  SET_PAGE: "SET_PAGE",
  RESET_PAGE: "RESET_PAGE",
  SET_LOADING: "SET_LOADING",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};

export const resetPageAction = ({ isLoading = false, loadMore = true }) => ({
  type: APPLICANTS_ACTIONS.RESET_PAGE,
  payload: {
    isLoading,
    loadMore,
  },
});

export const fetchApplicantsBegin = () => ({
  type: APPLICANTS_ACTIONS.FETCH_APPLICANTS_BEGIN,
});

export const fetchApplicantsSuccess = ({ applicants }) => ({
  type: APPLICANTS_ACTIONS.FETCH_APPLICANTS_SUCCESS,
  payload: applicants,
});

export const fetchProfileApplicantSuccess = ({
  applicants,
  userId,
  objective,
  mode,
}) => ({
  type: APPLICANTS_ACTIONS.FETCH_PROFILE_APPLICANTS_SUCCESS,
  payload: { applicants, userId, objective, mode },
});

export const updateProfileApplicantSucess = ({ applicant, userId }) => ({
  type: APPLICANTS_ACTIONS.UPDATE_PROFILE_APPLICANT_SUCCESS,
  payload: { applicant, userId },
});

export const fetchApplicantsError = (error) => ({
  type: APPLICANTS_ACTIONS.FETCH_APPLICANTS_ERROR,
  payload: error,
});

export const finishLoadingAction = () => ({
  type: APPLICANTS_ACTIONS.FINISH_LOADING,
});

export const setNextPageAction = () => ({
  type: APPLICANTS_ACTIONS.NEXT_PAGE,
});

export const setPageAction = (page) => ({
  type: APPLICANTS_ACTIONS.SET_PAGE,
  payload: { page },
});

export const setLoadingAction = ({ isLoading, loadMore }) => ({
  type: APPLICANTS_ACTIONS.SET_LOADING,
  payload: { isLoading, loadMore },
});

export const setReported = ({ applicantId }) => ({
  type: APPLICANTS_ACTIONS.SET_REPORTED,
  payload: { applicantId },
});

export const showAnyway = ({ applicantId }) => ({
  type: APPLICANTS_ACTIONS.SHOW_ANYWAY,
  payload: { applicantId },
});

export const applicantsActions = {
  resetPageAction,
  fetchApplicantsBegin,
  fetchApplicantsSuccess,
  fetchProfileApplicantSuccess,
  fetchApplicantsError,
  finishLoadingAction,
  setLoadingAction,
  setNextPageAction,
  setPageAction,
  setReported,
  showAnyway,
  updateProfileApplicantSucess,
};
