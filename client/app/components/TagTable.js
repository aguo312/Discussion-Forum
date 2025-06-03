import { useEffect, useState } from "react";
import TagTableRow from "./TagTableRow";
import api from "../api/api";

const TagTable = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    api.get("/tags").then((res) => setTags(res.data));
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
