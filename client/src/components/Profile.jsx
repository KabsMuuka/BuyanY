import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../action/actionCreators";

const userProfile = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.profile);

  console.log(currentUser);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Link to={"/dashboard"}> back </Link>
          <p> User profile </p>

          <p> {currentUser.phoneNumber} </p>
        </div>
      ) : (
        <div>
          <p>Please login</p>
        </div>
      )}
    </>
  );
};

export default userProfile;
