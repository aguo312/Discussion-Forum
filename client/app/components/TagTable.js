import TagTableRow from "./TagTableRow";

const TagTable = () => {
  const handleClickSearchByTag = (e) => {};

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
          <TagTableRow
            onSearchByTagClick={handleClickSearchByTag}
          ></TagTableRow>
        </tbody>
      </table>
    </>
  );
};

export default TagTable;
