const validate = (values) => {


    const errors = {};
    if (values.month === "") {
        errors.month  = "Month is required"
    } 

    if (values.numberOfWorkingDays === "") {
        errors.message = "Working days is required"
    } else if (isNaN(values.numberOfWorkingDays)) {
        errors.numberOfWorkingDays = "Invalid entry of workDays"
    } else if(values.numberOfWorkingDays < 0){
        errors.message = "Invalid entry of workDays"
    }else if(values.numberOfWorkingDays>31){
        errors.message = "enter valid number of days"
    }


    return errors;
};

export default validate;