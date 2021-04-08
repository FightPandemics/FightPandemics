export const formToApplicationMappings = (formData) => ({
    organizationId: formData.organisationId,
    postApplied: "Volunteer",
    answers: {
        q1: formData.question1,
        q2: formData.question2,
        q3: formData.question3
    },
    status: formData.status,
    

})

export const formToApplicationMappingsPatch = (formData) => ({
    // organizationId: ,
    // applicant: ,
    // status:,
})