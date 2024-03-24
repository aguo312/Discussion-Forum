import { useContext } from "react";
import { GlobalContext } from "../page";

const DataTable = () => {
  const { setDataTable, setAskQuestion } = useContext(GlobalContext);
  const handleAskQuestionClick = () => {
    setDataTable(false);
    setAskQuestion(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th># Questions</th>
            <th>Title</th>
            <th>
              <button onClick={handleAskQuestionClick}>Ask A Question</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
