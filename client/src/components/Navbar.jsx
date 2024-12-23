import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../action/actionCreators";
import { persistor } from "../store/store.js";

const navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    console.log("User logged out, persisted data cleared.");
    navigate("/");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/dashboard"} className="btn btn-ghost text-xl">
            Buy anY
          </Link>

          <div className="flex-1">
            <Link to={"/sell"} className="btn btn-ghost text-xl">
              Sell product
            </Link>
          </div>
        </div>

        <div className="flex-none">
          <div className=" mr-14">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <span className="badge badge-sm indicator-item">8</span>
              </div>
              <Link to={"/listofconversation"}>MessageBox</Link>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"}> profile </Link>
              </li>

              <li>
                <button onClick={handleLogout}>logout</button>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default navbar;
