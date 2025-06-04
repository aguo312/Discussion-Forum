import { useContext } from "react";
import { GlobalContext } from "../page";
import api from "../api/api";

const Banner = () => {
  const {
    setIsLoggedIn,
    setUser,
    setWelcome,
    setBanner,
    setDataTable,
    setTagTable,
    setProfile,
    setAskQuestion,
    search,
    setSearch,
    setQuestionTable,
    setAnswerQuestion,
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
    setAnswerQuestion({
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
    setAnswerQuestion({
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
    setAnswerQuestion({
      value: false,
      qid: "",
    });
  };
  const handleClickLogout = () => {
    api.post("/logout").then((res) => {
      setIsLoggedIn(false);
      setUser(null);
      setBanner(false);
      setDataTable(false);
      setTagTable(false);
      setProfile(false);
      setWelcome(true);
      setQuestionTable({
        value: false,
        qid: "",
      });
      setAnswerQuestion({
        value: false,
        qid: "",
      });
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
      setQuestionTable(false);
      setAnswerQuestion({
        value: false,
        qid: "",
      });
    }
  };

  return (
    <>
      <header className="banner">
        <div className="bannerLeft">
          <button onClick={handleClickQuestions}>Questions</button>
          <button onClick={handleClickTags}>Tags</button>
          <button onClick={handleClickProfile}>Profile</button>
        </div>
        <h1 className="bannerTitle">Discussion Forum</h1>
        <div className="bannerRight">
          <input
            id="search"
            type="text"
            placeholder="Type then press enter"
            onChange={handleSearchTextChange}
            onKeyUp={handleSearchTextEnter}
          ></input>
          <button onClick={handleClickLogout}>Logout</button>
        </div>
      </header>
    </>
  );
};

export default Banner;
