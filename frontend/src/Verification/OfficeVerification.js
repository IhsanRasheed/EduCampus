import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OfficeVerification ({ children }) {

    const navigate = useNavigate()
    useEffect(() => {
        if(!localStorage.getItem('officeToken')) {
            navigate('/office/login', {replace: true})
        }
    },[])
    return children
}   