import TagTableRow from "./TagTableRow";

const TagTable = () => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th># Tags</th>
            <th>All Tags</th>
            <th>
              <button>Ask A Question</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <TagTableRow></TagTableRow>
        </tbody>
      </table>
    </>
  );
};

export default TagTable;
