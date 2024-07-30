import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";
import axios from "axios";
import DataTableRow from "./DataTableRow";

const DataTable = () => {
  const { setDataTable, setAskQuestion } = useContext(GlobalContext);
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
  questions.forEach((questionObj) => {
    rows.unshift(
      <DataTableRow key={questionObj.id} question={questionObj}></DataTableRow>
    );
  });
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
