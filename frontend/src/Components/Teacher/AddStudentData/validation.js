export const validate = (month, formNoOfDays) => {


    const errors = {};
    if (month.month === "" || month.month === "Select a month") {
        errors.month = "Month is required"
    }

    if (formNoOfDays.noOfDaysPresent === "") {
        errors.message = "Working days is required"
    } else if (isNaN(formNoOfDays.noOfDaysPresent)) {
        errors.message = "Invalid entry no of days present"
    } else if (formNoOfDays.noOfDaysPresent < 0) {
        errors.message = "Invalid Invalid entry no of days present"
    } else if (formNoOfDays.noOfDaysPresent > month.workingDays) {
        errors.message = "Present days should be less than working days"
    }


    return errors;
};





export const validateMarks = (month, marks) => {
    const errors = {};
    if (month.month === undefined || month.month=== "" ) {
        errors.message = "Month is required"
    }
    for (let i = 0; i < marks.length; i++) {
        if (marks[i].mark === undefined || marks[i].mark === "" ) {
            errors.message = "Mark is required"
            break;
        } else if (isNaN(marks[i].mark)) {
            errors.message = "Invalid entry"
            break;
        } else if (marks[i].mark < 0 || marks[i].mark > 100) {
            errors.message = "Marks should be in between 0 & 100"
            break;
        }
    }

    return errors;
};