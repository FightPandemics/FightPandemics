export const formToApplicationMappings = (formData) => ({
    organization: {
        id: formData.organisationId
    },
    applicantApplied: "Volunteer",
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