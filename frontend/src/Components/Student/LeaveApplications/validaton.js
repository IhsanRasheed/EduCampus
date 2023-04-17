const validate = (values) => {


    const errors = {};
    if (values.from === "") {
        errors.message = "From Field is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.from)) {
        errors.message = "Invalid entry"
    }

    if (values.to === "") {
        errors.message = "Field is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.to)) {
        errors.message = "Invalid entry"
    }

    if (values.leaveLetter === "") {
        errors.message = "Field is required"
    } else if (values.leaveLetter.length <= 30) {
        errors.message = "Letter should contains atlest 30 charecters"
    }

    const fromDate = new Date(values.from);
    const toDate = new Date(values.to);
    if (fromDate.getTime() > toDate.getTime()) {
        errors.message = "Start date should be less than end date";
    }



    return errors;
};

export default validate;