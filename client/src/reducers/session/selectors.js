export const selectOrganisationId = (state) => {
  const { user, organisationIndex } = state.session;
  if (!user || isNaN(organisationIndex)) {
    return null;
  }
  return user?.organisations[organisationIndex]?._id;
};

export const selectUser = (state) => state.session.user;

export const selectActorId = (state) => {
  const organisationId = selectOrganisationId(state);
  const user = selectUser(state);
  return organisationId || user?.id || user?._id;
};
