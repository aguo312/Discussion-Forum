import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../page";

const LoginForm = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => console.log(user), []);
  useEffect(() => setEmptyEmail(email.length < 1), [email]);
  useEffect(() => setEmptyPassword(password.length < 1), [password]);
  useEffect(
    () => setErrorDetected(emptyEmail || emptyPassword),
    [emptyEmail, emptyPassword]
  );

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClickLogin = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (errorDetected) {
      if (emptyEmail) {
        error += "Email field is empty.\n";
      }
      if (emptyPassword) {
        error += "Password field is empty.\n";
      }
    } else {
      axios.get("http://localhost:8080/user/" + email).then((res) => {
        if (!res.data) {
          error += "Unregistered Email.\n";
        } else {
          axios
            .post("http://localhost:8080/login", [email, password])
            .then((res) => {
              handleLogin(res.data);
              // show front page
            });
        }
      });
    }
  };

  const handleClickBack = () => props.showLogin(false);
  const handleLogin = (user) => {
    props.showBanner(true);
    props.showDataTable(true);
    setUser(user);
  };

  return (
    <>
      <form>
        <label>
          Email:
          <br />
          <input onChange={handleEmailChange}></input>
        </label>
        <br />
        <br />
        <label>
          Password: <br />
          <input type="password" onChange={handlePasswordChange}></input>
        </label>
        <br />
        <br />
        <button onClick={handleClickLogin}>Login</button>
        <button onClick={handleClickBack}>Back</button>
      </form>
    </>
  );
};

export default LoginForm;
