import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import DataTableRow from "./DataTableRow";
import api from "../api/api";

const DataTable = () => {
  const { setDataTable, setAskQuestion, search } = useContext(GlobalContext);
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    console.log("Mounted");

    api.get("/question").then((res) => setQuestions(res.data));
  }, []);

  const handleAskQuestionClick = () => {
    setDataTable(false);
    setAskQuestion(true);
  };

  const rows = [];
  const searchedQuestions = [];
  if (search.value) {
    console.log(search);

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
            <th>
              {search.value ? searchedQuestions.length : questions.length}{" "}
              Questions
            </th>
            <th>
              {search.value
                ? search.tagSearch
                  ? "Questions tagged " + search.target
                  : "Search Results"
                : "All Questions"}
            </th>
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
