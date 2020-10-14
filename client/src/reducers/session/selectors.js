export const selectOrganisationId = (state) => {
  const { user, organisationIndex } = state.session;
  if (!user || isNaN(organisationIndex)) {
    return null;
  }
  return user?.organisations[organisationIndex]?._id;
};
