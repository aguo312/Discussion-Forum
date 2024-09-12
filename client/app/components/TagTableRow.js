import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";

const TagTableRow = (props) => {
  const [questions, setQuestions] = useState([]);
  const [tagName, setTagName] = useState("");
  const { setDataTable, setTagTable, setSearch } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/question")
      .then((res) => setQuestions(res.data));
  }, []);

  const handleSetTagName = (e) => {
    setTagName("[" + e.currentTarget.id + "]");
  };
  const handleClickSearchByTag = () => {
    setDataTable(true);
    setTagTable(false);
    setSearch({
      value: true,
      tagSearch: true,
      target: tagName,
    });
  };

  const tagTable = [];
  for (let i = 0; i < props.tags.length; i += 3) {
    tagTable.push(
      <tr key={i}>
        {props.tags.slice(i, i + 3).map((tagObj) => {
          const numQuestions = questions.filter((questionObj) => {
            return questionObj.tags.some((questionObjTag) => {
              return questionObjTag.id == tagObj.id;
            });
          }).length;
          return (
            <td key={tagObj.id}>
              <button
                id={tagObj.name}
                onMouseDown={handleSetTagName}
                onClick={handleClickSearchByTag}
              >
                {tagObj.name}
              </button>
              <div>{numQuestions} Questions</div>
            </td>
          );
        })}
      </tr>
    );
  }
  if (tagTable.length == 0) {
    tagTable.push(
      <tr key="none">
        <td>No Tags Found</td>
      </tr>
    );
  }

  return <>{tagTable}</>;
};

export default TagTableRow;
