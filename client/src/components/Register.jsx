import axios from "axios";
import { useState } from "react";

const register = () => {
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const payload = {
    phoneNumber,
    password,
  };
  const handUserCredentials = async () => {
    await axios
      .post("http://localhost:4000/register", { payload })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("failed to register", err);
      });
  };

  return (
    <>
      <div>
        <h1> Register</h1>
        <form>
          <input
            type="text"
            placeholder="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <br />
          <input
            type="text"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button onClick={handUserCredentials}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default register;
