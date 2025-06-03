import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import api from "../api/api";

const RegisterForm = () => {
  const { setUser, setWelcome, setRegister, setBanner, setDataTable } =
    useContext(GlobalContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");

  const [emptyUsername, setEmptyUsername] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);
  const [emptyVerify, setEmptyVerify] = useState(true);
  const [emailName, setEmailName] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => setEmptyUsername(username.length < 1), [username]);
  useEffect(() => setEmptyEmail(email.length < 1), [email]);
  useEffect(() => setEmptyPassword(password.length < 1), [password]);
  useEffect(() => setEmptyVerify(verify.length < 1), [verify]);
  useEffect(() => {
    const emailSplit = email.split("@");
    if (emailSplit.length === 2) {
      setEmailName(emailSplit[0]);
      setEmailDomain(emailSplit[1]);
    } else {
      setEmailName("");
      setEmailDomain("");
    }
  }, [email]);
  useEffect(() => {
    const emailDomainSplit = emailDomain.split(".");
    const validPartitionLength = emailDomainSplit.every((s) => s.length > 0);
    const validEndLength =
      emailDomainSplit.length >= 2 &&
      emailDomainSplit[emailDomainSplit.length - 1].length >= 2
        ? true
        : false;
    setInvalidEmail(!(validPartitionLength && validEndLength));
  }, [emailDomain]);
  useEffect(
    () =>
      setInvalidPassword(
        password.includes(username) || password.includes(emailName)
      ),
    [username, emailName, password]
  );
  useEffect(() => setPasswordMismatch(password !== verify), [password, verify]);
  useEffect(
    () =>
      setErrorDetected(
        emptyUsername ||
          emptyEmail ||
          emptyPassword ||
          emptyVerify ||
          invalidEmail ||
          invalidPassword ||
          passwordMismatch
      ),
    [
      emptyUsername,
      emptyEmail,
      emptyPassword,
      emptyVerify,
      invalidEmail,
      invalidPassword,
      passwordMismatch,
    ]
  );

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleVerifyChange = (e) => setVerify(e.target.value);

  const handleClickRegister = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (errorDetected) {
      if (emptyUsername) {
        error += "Username field is empty.\n";
      }
      if (emptyEmail) {
        error += "Email field is empty.\n";
      } else if (invalidEmail) {
        error += "Email is invalid.\n";
      }
      if (emptyPassword) {
        error += "Password field is empty.\n";
      } else if (invalidPassword) {
        error += "Password contains username or email id.\n";
      }
      if (emptyVerify) {
        error += "Verify Password field is empty.\n";
      } else if (passwordMismatch) {
        error += "Passwords do not match.\n";
      }
      alert(error);
    } else {
      // axios.get("http://localhost:8080/user/" + email).then((res) => {
      //   if (res.data) {
      //     error += "Email is already used by another user.\n";
      //     alert(error);
      //   } else {
      //     axios
      //       .post("http://localhost:8080/register", [username, email, password])
      //       .then((res) => {
      //         handleRegister(res.data);
      //       });
      //   }
      // });
      api
        .post("/register", [username, email, password])
        .then((res) => {
          handleRegister(res.data);
        })
        .catch((err) => {
          if (err.response && err.response.status == 409) {
            error += err.response.data;
          } else {
            error += "Registration Failed. Please try again.\n";
          }
          alert(error);
        });
    }
  };

  const handleClickBack = () => {
    setRegister(false);
    setWelcome(true);
  };
  const handleRegister = (user) => {
    setRegister(false);
    setBanner(true);
    setDataTable(true);
    setUser(user);
  };

  return (
    <>
      <form>
        <label>
          Username: <br />
          <input onChange={handleUsernameChange}></input>
        </label>
        <br />
        <br />
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
        <label>
          Verify Password: <br />
          <input type="password" onChange={handleVerifyChange}></input>
        </label>
        <br />
        <br />
        <button onClick={handleClickRegister}>Register</button>
        <button onClick={handleClickBack}>Back</button>
      </form>
    </>
  );
};

export default RegisterForm;
