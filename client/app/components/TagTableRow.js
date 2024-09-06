import axios from "axios";
import { useEffect, useState } from "react";

const TagTableRow = (props) => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/question")
      .then((res) => setQuestions(res.data));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/tags").then((res) => setTags(res.data));
  }, []);

  const handleSetTagName = (e) => {
    setTagName("[" + e.currentTarget.id + "]");
  };
  const handleClickSearchByTag = () => {
    props.onSearchByTagClick(tagName);
  };

  const tagTable = [];
  for (let i = 0; i < tags.length; i += 3) {
    tagTable.push(
      <tr key={i}>
        {tags.slice(i, i + 3).map((tagObj) => {
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
