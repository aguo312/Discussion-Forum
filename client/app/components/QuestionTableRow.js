import { useEffect, useState } from "react";
import CommentTable from "./CommentTable";
import api from "../api/api";

const QuestionTableRow = (props) => {
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    api.get("/answer/" + props.aid).then((res) => setAnswer(res.data));
  }, []);

  const handleEnterComment = () => {
    api.get("/answer/" + props.aid).then((res) => setAnswer(res.data));
  };

  const localDate = new Date(answer.ansDateTime).toString();
  const askedOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const askedAt = localDate.substring(16, 21);

  return (
    <>
      <tr key={answer.id}>
        <td>Votes</td>
        <td>{answer.text}</td>
        <td>
          Ans By {answer.ansBy}
          <br /> On {askedOn}
          <br /> At {askedAt}
          <br />
        </td>
      </tr>
      <CommentTable
        data={answer}
        dataType="answer"
        onCommentUpdate={handleEnterComment}
      ></CommentTable>
    </>
  );
};

export default QuestionTableRow;
