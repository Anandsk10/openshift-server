import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth";

const  ProtectedAdminRoute = () => {
const user = useAuth();

    const [admin, setAdmin] = useState(user.Role==="admin" ?true:null);

    // return admin ? <Outlet /> : <Navigate to="/servers" />;
    if(admin){
        return <Outlet />
    }
}

export default ProtectedAdminRoute;