const DataTableRowTags = (props) => {
  const rows = [];
  for (let i = 0; i < props.tags.length; i += 4) {
    rows.push(
      <div key={i}>
        {props.tags.slice(i, i + 4).map((tagObj) => {
          return tagObj.name + " ";
        })}
      </div>
    );
  }
  return (
    <>
      {"Tags: "}
      {rows}
    </>
  );
};

export default DataTableRowTags;
