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
    search,
    setSearch,
    setQuestionTable,
  } = useContext(GlobalContext);

  const handleClickQuestions = () => {
    setDataTable(true);
    setTagTable(false);
    setProfile(false);
    setAskQuestion(false);
    setSearch({
      value: false,
      tagSearch: false,
      target: search.target,
    });
    setQuestionTable({
      value: false,
      qid: "",
    });
  };
  const handleClickTags = () => {
    setDataTable(false);
    setTagTable(true);
    setProfile(false);
    setAskQuestion(false);
    setQuestionTable({
      value: false,
      qid: "",
    });
  };
  const handleClickProfile = () => {
    setDataTable(false);
    setTagTable(false);
    setProfile(true);
    setAskQuestion(false);
    setQuestionTable({
      value: false,
      qid: "",
    });
  };
  const handleClickLogout = () => {
    setBanner(false);
    setDataTable(false);
    setTagTable(false);
    setProfile(false);
    setWelcome(true);
    setQuestionTable({
      value: false,
      qid: "",
    });
  };
  const handleSearchTextChange = (e) => {
    setSearch({
      value: false,
      tagSearch: search.tagSearch,
      target: e.target.value,
    });
  };
  const handleSearchTextEnter = (e) => {
    if (e.keyCode === 13) {
      setDataTable(true);
      setTagTable(false);
      setProfile(false);
      setAskQuestion(false);
      setSearch({
        value: true,
        tagSearch: false,
        target: search.target,
      });
    }
  };

  return (
    <>
      <button onClick={handleClickQuestions}>Questions</button>
      <button onClick={handleClickTags}>Tags</button>
      <button onClick={handleClickProfile}>Profile</button>
      <b>Discussion Forum</b>
      <input
        id="search"
        type="text"
        placeholder="Type then press enter"
        onChange={handleSearchTextChange}
        onKeyUp={handleSearchTextEnter}
      ></input>
      <button onClick={handleClickLogout}>Logout</button>
    </>
  );
};

export default Banner;
