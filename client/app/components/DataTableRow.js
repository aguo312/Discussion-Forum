import { useContext } from "react";
import DataTableRowTags from "./DataTableRowTags";
import { GlobalContext } from "../page";

const DataTableRow = (props) => {
  const { setDataTable, setQuestionTable } = useContext(GlobalContext);
  const localDate = new Date(props.question.askDateTime).toString();
  const askedOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const askedAt = localDate.substring(16, 21);

  const handleClickQuestionTable = () => {
    setDataTable(false);
    setQuestionTable({ value: true, qid: props.question.id });
  };

  return (
    <>
      <tr key={props.question.id}>
        <td>
          {props.question.views} Views <br />
          {props.question.answers.length} Answers <br />
          {props.question.votes} Votes <br />
        </td>
        <td>
          <button onClick={handleClickQuestionTable}>
            {props.question.title}
          </button>
          <div>{props.question.summary}</div>
          <DataTableRowTags
            key={props.question.tags.length}
            tags={props.question.tags}
          ></DataTableRowTags>
        </td>
        <td>
          Asked By {props.question.owner.username}
          <br /> On {askedOn}
          <br /> At {askedAt}
          <br />
        </td>
      </tr>
    </>
  );
};

export default DataTableRow;
