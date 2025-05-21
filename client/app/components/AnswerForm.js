import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";

const AnswerForm = () => {
  const { user, setQuestionTable, answerQuestion, setAnswerQuestion } =
    useContext(GlobalContext);

  const [question, setQuestion] = useState({
    title: "",
    text: "",
    tags: [],
  });
  const [text, setText] = useState("");
  const [emptyText, setEmptyText] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/question/" + answerQuestion.qid)
      .then((res) => setQuestion(res.data));
  }, []);
  useEffect(() => setEmptyText(text.length < 1), [text]);

  const handleTextChange = (e) => setText(e.target.value);
  const handlePostAnswerClick = () => {
    setAnswerQuestion(false);
    setQuestionTable({ value: true, qid: answerQuestion.qid });
  };

  const handleClickPost = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (emptyText) {
      error += "Answer Text field is empty.\n";
      alert(error);
    } else {
      axios
        .post("http://localhost:8080/answer", [
          text,
          user.id,
          answerQuestion.qid,
        ])
        .then((res) => {
          handlePostAnswerClick();
        });
    }
  };

  return (
    <>
      <form>
        <div>Question Title</div>
        {question.title}
        <br />
        <br />
        <div>Question Summary</div>
        {question.summary}
        <br />
        <br />
        <div>Question Text</div>
        {question.text}
        <br />
        <br />
        <div>Tags</div>
        {"tags need formatting"}
        <br />
        <br />
        <div>Answer Text</div>
        <br />
        <textarea onChange={handleTextChange}></textarea>
        <br />
        <br />
        <button onClick={handleClickPost}>Post Answer</button>
      </form>
    </>
  );
};

export default AnswerForm;
