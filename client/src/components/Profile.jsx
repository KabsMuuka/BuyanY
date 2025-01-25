import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { profile } from "../../redux/action/actionCreators";

const userProfile = () => {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //websocket connection

  return (
    <>
      {isAuthenticated ? (
        <div>
          <Link className="flex" to={"/"}>
            <img className="w-4" src="/back.png" alt="back button" />
          </Link>

          <p className="text-center"> User profile </p>

          <div className="flex flex-col items-center shadow-md">
            <p className="font-bold">
              <label> Role </label>
              {currentUser.userRole}{" "}
            </p>

            <p className="">
              <label> Phone number </label> {currentUser.phoneNumber}{" "}
            </p>
          </div>
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
