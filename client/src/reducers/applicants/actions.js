export const APPLICANTS_ACTIONS = {
  FINISH_LOADING_APPLICANTS: "FINISH_LOADING_APPLICANTS",
  FETCH_APPLICANTS_SUCCESS: "FETCH_APPLICANTS_SUCCESS",
  FETCH_APPLICANTS_BEGIN: "FETCH_APPLICANTS_BEGIN",
  FETCH_APPLICANTS_ERROR: "FETCH_APPLICANTS_ERROR",
  FETCH_PROFILE_APPLICANTS_SUCCESS: "FETCH_PROFILE_APPLICANTS_SUCCESS",
  UPDATE_PROFILE_APPLICANT_SUCCESS: "UPDATE_PROFILE_APPLICANT_SUCCESS",
  NEXT_PAGE_APPLICANTS: "NEXT_PAGE_APPLICANTS",
  SET_PAGE: "SET_PAGE",
  RESET_PAGE_APPLICANTS: "RESET_PAGE_APPLICANTS",
  RESET_APPLICANTS: "RESET_APPLICANTS",
  SET_LOADING_APPLICANTS: "SET_LOADING_APPLICANTS",
  SET_REPORTED: "SET_REPORTED",
  SHOW_ANYWAY: "SHOW_ANYWAY",
};

export const resetPageAction = ({ isLoadingApplicants = false, loadMoreApplicants = true }) => ({
  type: APPLICANTS_ACTIONS.RESET_PAGE_APPLICANTS,
  payload: {
    isLoadingApplicants,
    loadMoreApplicants,
  },
});

export const resetApplicants = () => ({
  type: APPLICANTS_ACTIONS.RESET_APPLICANTS,
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
  type: APPLICANTS_ACTIONS.FINISH_LOADING_APPLICANTS,
});

export const setNextPageAction = () => ({
  type: APPLICANTS_ACTIONS.NEXT_PAGE_APPLICANTS,
});

export const setPageAction = (page) => ({
  type: APPLICANTS_ACTIONS.SET_PAGE,
  payload: { page },
});

export const setLoadingAction = ({ isLoadingApplicants, loadMoreApplicants }) => ({
  type: APPLICANTS_ACTIONS.SET_LOADING_APPLICANTS,
  payload: { isLoadingApplicants, loadMoreApplicants },
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
  resetApplicants,
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
