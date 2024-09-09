"use client";
import { createContext, useEffect, useState } from "react";
import Banner from "./components/Banner";
import Welcome from "./components/Welcome";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import DataTable from "./components/DataTable";
import QuestionForm from "./components/QuestionForm";
import TagTable from "./components/TagTable";
import Profile from "./components/Profile";

export const GlobalContext = createContext();

export default function Home() {
  const [user, setUser] = useState(null);
  const [welcome, setWelcome] = useState(true);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [banner, setBanner] = useState(false);
  const [dataTable, setDataTable] = useState(false);
  const [tagTable, setTagTable] = useState(false);
  const [profile, setProfile] = useState(false);
  const [askQuestion, setAskQuestion] = useState(false);
  const [search, setSearch] = useState({
    value: false,
    tagSearch: false,
    target: "",
  });

  // useEffect(() => {
  //   if (login || register || banner) setWelcome(false);
  //   else setWelcome(true);
  // }, [login, register, banner]);

  // useEffect(() => {
  //   if (banner) {
  //     setWelcome(false);
  //     setLogin(false);
  //     setRegister(false);
  //   }
  // }, [banner]);

  // useEffect(() => {
  //   if (welcome) {
  //     setLogin(false);
  //     setRegister(false);
  //     setBanner(false);
  //   }
  // }, [welcome]);

  // useEffect(() => {
  //   setDataTable(false);
  // }, [askQuestion]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        setWelcome,
        setLogin,
        setRegister,
        setBanner,
        setDataTable,
        setTagTable,
        setProfile,
        setAskQuestion,
        search,
        setSearch,
      }}
    >
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
      {tagTable && <TagTable></TagTable>}
      {profile && <Profile></Profile>}
      {askQuestion && <QuestionForm></QuestionForm>}
    </GlobalContext.Provider>
  );
}
