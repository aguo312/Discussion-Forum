import { useState } from "react";

const Welcome = (props) => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const handleClickLogin = () => props.showLogin(true);
  const handleClickRegister = () => props.showRegister(true);
  const handleClickGuest = () => console.log("Guest");

  return (
    <>
      <h1>Welcome to Discussion Forum.</h1>
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickRegister}>Register</button>
      <br />
      <button onClick={handleClickGuest}>Continue As Guest</button>
      {register}
    </>
  );
};

export default Welcome;
