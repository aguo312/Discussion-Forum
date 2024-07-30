import axios from "axios";
import { useEffect, useState } from "react";

const TagTableRow = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/tags").then((res) => setTags(res.data));
  }, []);

  const tagTable = [];
  for (let i = 0; i < tags.length; i += 3) {
    tagTable.push(
      <tr key={i}>
        {tags.slice(i, i + 3).map((tagObj) => {
          return <td key={tagObj.id}>{tagObj.name}</td>;
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
