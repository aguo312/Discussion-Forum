"use client";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Welcome from "./components/Welcome";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const [welcome, setWelcome] = useState(true);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    setWelcome(!login);
  }, [login]);

  useEffect(() => {
    setWelcome(!register);
  }, [register]);

  return (
    <>
      {welcome && (
        <Welcome showLogin={setLogin} showRegister={setRegister}></Welcome>
      )}
      {login && <LoginForm showLogin={setLogin}></LoginForm>}
      {register && <RegisterForm showRegister={setRegister}></RegisterForm>}
    </>
  );
}
