import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/Action/index";
import { getHomeAPI } from "../Services/StudentService";
import Cookies from "js-cookie";

export default function StudentVerification({ children }) {
  const dispatch = useDispatch();
  const { storeStudentData } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("studentToken")) {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("studentToken")) {
      const headers = {
        headers: {
          Authorization: Cookies.get("studentToken")
        },
      };
      getHomeAPI(headers).then((response) => {
        storeStudentData(response.data.studentData);
      });
    }
  }, []);

  return children;
}
