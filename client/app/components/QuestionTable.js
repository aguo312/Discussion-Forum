import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import DataTableRowTags from "./DataTableRowTags";

const QuestionTable = () => {
  const { questionTable } = useContext(GlobalContext);
  const [question, setQuestion] = useState({
    answers: [],
    owner: { username: "" },
    tags: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/question/" + questionTable.qid)
      .then((res) => setQuestion(res.data));
  }, []);

  const localDate = new Date(question.askDateTime).toString();
  const askedOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const askedAt = localDate.substring(16, 21);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Vote Buttons</th>
            <th>{question.title}</th>
            <th>
              {question.answers.length} Answers
              <br />
              {question.views} Views
              <br />
              temp Votes
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div>
                <DataTableRowTags tags={question.tags}></DataTableRowTags>
              </div>
            </td>
            <td>{question.text}</td>
            <td>
              Asked By {question.owner.username}
              <br />
              On {askedOn}
              <br />
              At {askedAt}
            </td>
          </tr>
          {/* <div>Comments</div>
          {"Answers"} */}
        </tbody>
      </table>
      <button>Answer Question Button Toggle</button>
    </>
  );
};

export default QuestionTable;
