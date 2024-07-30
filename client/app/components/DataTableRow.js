const DataTableRow = (props) => {
  const localDate = new Date(props.question.askDateTime).toString();
  const askedOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const askedAt = localDate.substring(16, 21);

  return (
    <>
      <tr key={props.question.id}>
        <td>
          {props.question.views} Views <br />
          {props.question.answers.length} Answers <br />
        </td>
        <td>
          {props.question.title}
          <div>{props.question.summary}</div>
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
