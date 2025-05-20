import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";

const AnswerForm = () => {
  const { user, answerQuestion } = useContext(GlobalContext);
  const [question, setQuestion] = useState({
    answers: [],
    owner: { username: "" },
    tags: [],
  });
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/question/" + answerQuestion.qid)
      .then((res) => setQuestion(res.data));
  }, []);

  const handleTextChange = (e) => setText(e.target.value);

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
        <button>Post Answer (currently not working)</button>
      </form>
    </>
  );
};

export default AnswerForm;
