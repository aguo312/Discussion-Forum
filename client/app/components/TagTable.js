import { useEffect, useState } from "react";
import TagTableRow from "./TagTableRow";
import axios from "axios";

const TagTable = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/tags").then((res) => setTags(res.data));
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{tags.length} Tags</th>
            <th>All Tags</th>
            <th>
              <button>Ask A Question</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TagTableRow tags={tags}></TagTableRow>
        </tbody>
      </table>
    </>
  );
};

export default TagTable;
