import { useContext } from "react";
import { GlobalContext } from "../page";

const Welcome = () => {
  const { setWelcome, setLogin, setRegister, setBanner, setDataTable } =
    useContext(GlobalContext);
  const handleClickLogin = () => {
    setLogin(true);
    setWelcome(false);
  };
  const handleClickRegister = () => {
    setRegister(true);
    setWelcome(false);
  };
  const handleClickGuest = () => {
    setWelcome(false);
    setBanner(true);
    setDataTable(true);
  };

  return (
    <>
      <h1>Welcome to Discussion Forum.</h1>
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickRegister}>Register</button>
      <br />
      <button onClick={handleClickGuest}>Continue As Guest</button>
    </>
  );
};

export default Welcome;
