const subjectValidate = (values) => {
    
    const subErrors = {}
     
    if (values.subject === "") {
        subErrors.message = "Subject is required"
    } else if (!isNaN(values.subject)) {
        subErrors.message = "Invalid subject entry"
    }

    if (values.teacher === "") {
        subErrors.message = "Teacher is required"
    } else if (!isNaN(values.teacher)) {
        subErrors.message = "Invalid teacher entry"
    }

    return subErrors
}

export default subjectValidate