import { Navigate, Outlet } from 'react-router-dom';


export const PrivateRoute = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');


    return isLoggedIn ? <Outlet /> : <Navigate to="/signin" replace />;
};
