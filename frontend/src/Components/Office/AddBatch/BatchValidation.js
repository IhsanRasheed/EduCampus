const validate = (values) => {

    const errors = {}

   

    if (values.duration === "") {
        errors.message = "Duration is required"
    } else if (isNaN(values.duration)) {
        errors.message = "Invalid entry"
    }

    if (values.fee === "") {
        errors.fee = "course fee is required"
    } else if (isNaN(values.fee)) {
        errors.message = "Invalid course fee entry"
    }

    if (values.numberOfSeat === "") {
        errors.message = "Number of seat is required"
    } else if (isNaN(values.numberOfSeat)) {
        errors.message = "Invalid entry No. of seat entry"
    }

    if (values.headOfTheBatch === "") {
        errors.message = "Head of the batch is required"
    } else if (!isNaN(values.headOfTheBatch)) {
        errors.message = "Invalid entry head of the batch entry"
    }

    return errors;

}

export default validate