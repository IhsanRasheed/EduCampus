const initialState = {
  teacherData: {},
};

const teacherReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "storeTeacherData":
      return {
        ...prevState,
        teacherData: action.teacherData,
      };
    default:
      return initialState;
  }
};

export default teacherReducer;
