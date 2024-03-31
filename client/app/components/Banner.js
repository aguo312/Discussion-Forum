import { useContext } from "react";
import { GlobalContext } from "../page";

const Banner = () => {
  const {
    setWelcome,
    setBanner,
    setDataTable,
    setTagTable,
    setProfile,
    setAskQuestion,
  } = useContext(GlobalContext);

  const handleClickQuestions = () => {
    setDataTable(true);
    setTagTable(false);
    setProfile(false);
    setAskQuestion(false);
  };
  const handleClickTags = () => {
    setDataTable(false);
    setTagTable(true);
    setProfile(false);
    setAskQuestion(false);
  };
  const handleClickProfile = () => {
    setDataTable(false);
    setTagTable(false);
    setProfile(true);
    setAskQuestion(false);
  };
  const handleClickLogout = () => {
    setBanner(false);
    setDataTable(false);
    setTagTable(false);
    setProfile(false);
    setWelcome(true);
  };

  return (
    <>
      <button onClick={handleClickQuestions}>Questions</button>
      <button onClick={handleClickTags}>Tags</button>
      <button onClick={handleClickProfile}>Profile</button>
      <b>Discussion Forum</b>
      <input type="text"></input>
      <button onClick={handleClickLogout}>Logout</button>
    </>
  );
};

export default Banner;
