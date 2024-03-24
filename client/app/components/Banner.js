import { useContext } from "react";
import { GlobalContext } from "../page";

const Banner = () => {
  const { setWelcome, setBanner, setDataTable, setAskQuestion } =
    useContext(GlobalContext);

  const handleClickQuestions = () => {
    setDataTable(true);
    setAskQuestion(false);
  };
  const handleClickTags = () => {
    setDataTable(false);
    setAskQuestion(false);
  };
  const handleClickProfile = () => {
    setDataTable(false);
    setAskQuestion(false);
  };
  const handleClickLogout = () => {
    setBanner(false);
    setDataTable(false);
    setWelcome(true);
  };

  return (
    <>
      <button onClick={handleClickQuestions}>Questions</button>
      <button onClick={handleClickTags}>Tags</button>
      <button onClick={handleClickProfile}>Username</button>
      <b>Discussion Forum</b>
      <input type="text"></input>
      <button onClick={handleClickLogout}>Logout</button>
    </>
  );
};

export default Banner;
