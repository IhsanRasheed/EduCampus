const validate = (values) => {
  const errors = {};

  if (values.name === "") {
    errors.message = "Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
    errors.message = "only alphabets are allowed";
  }

  if (values.phone === "") {
    errors.message = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.message = "Invalid phone number";
  }

  if (values.email === "") {
    errors.message = "Email is required"
} else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.message = "Invalid email"
}

if (values.parentName === "") {
  errors.message = "Parent name is required"
} else if (!isNaN(values.parentName)) {
  errors.message = "Invalid Parent Name"
}

if (values.parentPhone === "") {
  errors.message = "Parent phone is required"
} else if (!/^\d{10}$/.test(values.parentPhone)) {
  errors.message = "Invalid Parent Phone No."
}

if (values.education === "") {
  errors.message = "Education is required"
} else if (!isNaN(values.education)) {
  errors.message = "Invalid Education entry"
}

if (values.institute === "") {
  errors.message = "Last sutdied institue is required"
} else if (!isNaN(values.institute)) {
  errors.message = "Invalid Institute entry"
}

if (values.university === "") {
  errors.message = "University is required"
} else if (!isNaN(values.institute)) {
  errors.message = "Invalid University entry"
}

if (values.housenName === "") {
  errors.message = "House name is required"
} else if (!isNaN(values.houseName)) {
  errors.message = "Invalid House name"
}

if (values.place === "") {
  errors.message = "Place is required"
} else if (!isNaN(values.place)) {
  errors.message = "Invalid Place"
}

if (values.post === "") {
  errors.message = "Post is required"
} else if (!isNaN(values.post)) {
  errors.message = "Invalid Post"
}

if (values.pin === "") {
  errors.message = "Pin is required"
} else if (isNaN(values.pin)) {
  errors.message = "Invalid entry in "
} else if (!/^\d{6}$/.test(values.pin)) {
  errors.message = "Pin should be exactly 6 digit"
}

if (values.district === "") {
  errors.message = "District is required"
} else if (!isNaN(values.district)) {
  errors.message = "Invalid District"
}

if (values.state === "") {
  errors.message = "State is required"
} else if (!isNaN(values.state)) {
  errors.message = "Invalid state"
}

if (values.file === null) {
  errors.message = "Image is required"
}




  return errors;
};

export default validate;
