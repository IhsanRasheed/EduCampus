const initialState = {
    studentData: {}
}

const studentReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case "storeStudentData":
            return {
                ...prevState,
                studentData: action.studentData
            }
            default:
                return initialState
    }
}

export default studentReducer