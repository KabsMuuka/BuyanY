import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../action/actionCreators";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  console.log("isAuthenticated", isAuthenticated);
  console.log("accesToken", accessToken);

  const handleLogout = () => {
    dispatch(logout()); // Trigger the logout action
    navigate("/");
  };

  return (
    <>
      <h1 className="text-center text-2xl">Dashboard</h1>
      {isAuthenticated ? (
        <div>
          <button
            className="bg-red-400 w-20 p-1 rounded-md mt-3"
            onClick={handleLogout}
          >
            logout
          </button>

          <Link to={"/profile"}> profile</Link>
          <p className="text-center"> keep user logged in </p>
        </div>
      ) : (
        <div>
          <p className="text-center">Please login </p>

          <Link to={"/"} className="bg-red-400 w-20 p-1 rounded-md mt-3">
            back
          </Link>
        </div>
      )}
    </>
  );
};

export default Dashboard;
