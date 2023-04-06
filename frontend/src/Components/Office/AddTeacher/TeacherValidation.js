const validate = (values) => {


    const errors = {};

    if (values.name === "") {
        errors.message = "Name is required";
    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
        errors.name = "Only alphabets are allowed in names";
    }

    if (values.phone === "") {
        errors.message = "Phone number is required"
    } else if (!/^\d{10}$/.test(values.phone)) {
        errors.message = "Invalid phone number"
    }

    if (values.email === "") {
        errors.message = "Email is required"
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
        errors.message = "Invalid email"
    }

    if (values.date_of_birth === "") {
        errors.message = "Date of birth is required"
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date_of_birth)) {
        errors.message = "Invalid date of birt"
    }

    if (values.gender === "") {
        errors.message = "Gender is required"
    } else if (!isNaN(values.gender)) {
        errors.message = "Invalid gender entry"
    }

    if (values.salary === "") {
        errors.message = "Salary is required"
    } else if (isNaN(values.salary)) {
        errors.message = "Invalid Salary entry"
    }

    if (values.qualification === "") {
        errors.qualification = "Qualification is required"
    } else if (!isNaN(values.qualification)) {
        errors.qualification = "Invalid entry"
    }

    if (values.experience === "") {
        errors.message = "Experience is required"
    } else if (isNaN(values.experience)) {
        errors.message = "Invalid experience entry"
    }

    if (values.house_name === "") {
        errors.message = "House name is required"
    } else if (!isNaN(values.house_name)) {
        errors.message = "Invalid House name entry"
    }

    if (values.place === "") {
        errors.message = "Place is required"
    } else if (!isNaN(values.place)) {
        errors.message = "Invalid place entry"
    }

    if (values.post === "") {
        errors.message = "Post is required"
    } else if (!isNaN(values.post)) {
        errors.message = "Invalid post entry"
    }

    if (values.pin === "") {
        errors.message = "Pin is required"
    } else if (isNaN(values.pin)) {
        errors.message = "Invalid pin entry"
    }

    if (values.district === "") {
        errors.message = "District is required"
    } else if (!isNaN(values.district)) {
        errors.message = "Invalid district entry"
    }

    if (values.state === "") {
        errors.message = "State is required"
    } else if (!isNaN(values.state)) {
        errors.message = "Invalid state entry"
    }

    if (values.file === null) {
        errors.message = "Image is required"
    }


    return errors;
};

export default validate;