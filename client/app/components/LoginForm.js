import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";

const LoginForm = () => {
  const { setUser, setWelcome, setLogin, setBanner, setDataTable } =
    useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);
  const [errorDetected, setErrorDetected] = useState(true);

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
      // axios.get("http://localhost:8080/user/" + email).then((res) => {
      //   if (!res.data) {
      //     error += "Unregistered Email.\n";
      //   } else {
      //     axios
      //       .post("http://localhost:8080/login", [email, password])
      //       .then((res) => {
      //         const token = res.data.token;
      //         handleLogin(res.data);
      //       });
      //   }
      // });
      axios
        .post("http://localhost:8080/login", [email, password])
        .then((res) => {
          const token = res.data.token;
          handleLogin(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status == 401) {
            error += err.response.data;
          } else {
            error += "Login Failed. Please try again.\n";
          }
          alert(error);
        });
    }
  };

  const handleClickBack = () => {
    setLogin(false);
    setWelcome(true);
  };
  const handleLogin = (user) => {
    setLogin(false);
    setBanner(true);
    setDataTable(true);
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

// // axios request to a protected endpoint (e.g., /api/profile)
// axios.get("http://localhost:8080/api/profile", {
//   withCredentials: true // 🚨 Required to send HttpOnly cookies
// })
// .then((res) => {
//   const user = res.data;
//   setUser(user); // or update global state/context
// })
// .catch((err) => {
//   if (err.response?.status === 401) {
//     alert("Session expired or unauthorized");
//     // redirect to login, clear state, etc.
//   }
// });
