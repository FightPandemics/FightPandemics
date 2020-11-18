export const selectOrganisationId = (state) => state.session.organisationId;

export const selectUser = (state) => state.session.user;

export const selectActorId = (state) => {
  const organisationId = selectOrganisationId(state);
  const user = selectUser(state);
  return organisationId || user?.id || user?._id;
};
