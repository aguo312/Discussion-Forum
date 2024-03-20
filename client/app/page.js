"use client";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Welcome from "./components/Welcome";
import RegisterForm from "./components/RegisterForm";

export default function Home() {
  const [welcome, setWelcome] = useState(true);
  const [register, setRegister] = useState(false);
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    setWelcome(!register);
  }, [register]);

  return (
    <>
      {welcome && <Welcome showRegister={setRegister}></Welcome>}
      {register && <RegisterForm showRegister={setRegister}></RegisterForm>}
    </>
  );
}
