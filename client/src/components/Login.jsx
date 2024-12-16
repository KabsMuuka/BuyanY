import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../action/actionCreators";

const signIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useSelector((state) => state.auth);

  const handUserCredentials = (e) => {
    e.preventDefault();

    const userCredentials = {
      phoneNumber,
      password,
    };
    dispatch(login(userCredentials));

    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center"> Login</h1>
        <form className="flex items-center flex-col p-5">
          <input
            type="text"
            placeholder="phoneNumber"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-yellow-200 mb-3"
          />

          <input
            type="text"
            placeholder="password"
            value={password}
            required
            className="border border-yellow-200"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-blue-400 w-20 p-1 rounded-md mt-3"
            onClick={handUserCredentials}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default signIn;
