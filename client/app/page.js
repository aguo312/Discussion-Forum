"use client";
import { createContext, useEffect, useState } from "react";
import Banner from "./components/Banner";
import Welcome from "./components/Welcome";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import QuestionForm from "./components/QuestionForm";

export const UserContext = createContext();

export default function Home() {
  const [user, setUser] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [banner, setBanner] = useState(false);
  const [dataTable, setDataTable] = useState(false);
  const [askQuestion, setAskQuestion] = useState(false);

  useEffect(() => {
    if (login || register || banner) setWelcome(false);
    else setWelcome(true);
  }, [login, register, banner]);

  useEffect(() => {
    if (banner) {
      setWelcome(false);
      setLogin(false);
      setRegister(false);
    }
  }, [banner]);

  useEffect(() => {
    if (welcome) {
      setLogin(false);
      setRegister(false);
      setBanner(false);
    }
  }, [welcome]);

  useEffect(() => {
    setDataTable(false);
  }, [askQuestion]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {welcome && (
        <Welcome
          showLogin={setLogin}
          showRegister={setRegister}
          showBanner={setBanner}
        ></Welcome>
      )}
      {login && (
        <LoginForm
          showLogin={setLogin}
          showBanner={setBanner}
          showDataTable={setDataTable}
        ></LoginForm>
      )}
      {register && (
        <RegisterForm
          showRegister={setRegister}
          showBanner={setBanner}
          showDataTable={setDataTable}
        ></RegisterForm>
      )}
      {banner && <Banner showWelcome={setWelcome}></Banner>}
      {dataTable && <DataTable showAskQuestion={setAskQuestion}></DataTable>}
      {askQuestion && <QuestionForm></QuestionForm>}
    </UserContext.Provider>
  );
}
