import axios from "axios";
import { useEffect, useState } from "react";

const RegisterForm = (props) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");

  const [emptyUser, setEmptyUser] = useState(true);
  const [emptyEmail, setEmptyEmail] = useState(true);
  const [emptyPassword, setEmptyPassword] = useState(true);
  const [emptyVerify, setEmptyVerify] = useState(true);
  const [emailName, setEmailName] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => setEmptyUser(user.length < 1), [user]);
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
        password.includes(user) || password.includes(emailName)
      ),
    [user, emailName, password]
  );
  useEffect(() => setPasswordMismatch(password !== verify), [password, verify]);
  useEffect(
    () =>
      setErrorDetected(
        emptyUser ||
          emptyEmail ||
          emptyPassword ||
          emptyVerify ||
          invalidEmail ||
          invalidPassword ||
          passwordMismatch
      ),
    [
      emptyUser,
      emptyEmail,
      emptyPassword,
      emptyVerify,
      invalidEmail,
      invalidPassword,
      passwordMismatch,
    ]
  );

  const handleUserChange = (e) => setUser(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleVerifyChange = (e) => setVerify(e.target.value);

  const handleClickRegister = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (errorDetected) {
      if (emptyUser) {
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
      axios.get("http://localhost:8080/user/" + email).then((res) => {
        if (res.data) {
          error += "Email is already used by another user.\n";
          alert(error);
        } else {
          axios
            .post("http://localhost:8080/register", [user, email, password])
            .then((res) => {
              handleClickBack(); // temporary
            });
        }
      });
    }
  };

  const handleClickBack = () => props.showRegister(false);

  return (
    <>
      <form>
        <label>
          Username: <br />
          <input onChange={handleUserChange}></input>
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
