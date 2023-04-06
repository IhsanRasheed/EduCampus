import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/Action/index";
import { getHomeAPI } from "../Services/TeacherService";
import Cookies from "js-cookie";

export default function TeacherVerification({ children }) {
  const dispatch = useDispatch();
  const { storeTeacherData } = bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("teacherToken")) {
      navigate("/login", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("teacherToken")) {
      const headers = {
        headers: {
          Authorization: Cookies.get("teacherToken")
        },
      };
      getHomeAPI(headers).then((response) => {
        storeTeacherData(response.data.teacherData);
      });
    }
  }, []);

  return children;
}
