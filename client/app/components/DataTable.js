import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import axios from "axios";
import DataTableRow from "./DataTableRow";

const DataTable = () => {
  const { setDataTable, setAskQuestion, search } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/question")
      .then((res) => setQuestions(res.data));
  }, []);

  const handleAskQuestionClick = () => {
    setDataTable(false);
    setAskQuestion(true);
  };

  const rows = [];
  if (search.value) {
    const searchedQuestions = [];
    const searchTargets = search.target.toLowerCase().split(" ");
    questions.forEach((questionObj) => {
      const qTitle = questionObj.title.toLowerCase().split(" ");
      const qSummary = questionObj.summary.toLowerCase().split(" ");
      const qText = questionObj.text.toLowerCase().split(" ");
      const qTags = questionObj.tags.map((tagObj) => {
        return "[" + tagObj.name + "]";
      });
      const qAll = qTitle.concat(qSummary).concat(qText).concat(qTags);
      if (
        searchTargets.filter((target) => {
          return qAll.includes(target);
        }).length > 0
      ) {
        searchedQuestions.push(questionObj);
      }
    });
    searchedQuestions.forEach((questionObj) => {
      rows.unshift(
        <DataTableRow
          key={questionObj.id}
          question={questionObj}
        ></DataTableRow>
      );
    });
  } else {
    questions.forEach((questionObj) => {
      rows.unshift(
        <DataTableRow
          key={questionObj.id}
          question={questionObj}
        ></DataTableRow>
      );
    });
  }
  if (rows.length == 0) {
    rows.push(
      <tr key="none">
        <td>No Questions Found</td>
      </tr>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{questions.length} Questions</th>
            <th>All Questions</th>
            <th>
              <button onClick={handleAskQuestionClick}>Ask A Question</button>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};

export default DataTable;
