const QuestionTableRow = (props) => {
  const localDate = new Date(props.answer.ansDateTime).toString();
  const askedOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const askedAt = localDate.substring(16, 21);

  return (
    <>
      <tr key={props.answer.id}>
        <td>Votes</td>
        <td>{props.answer.text}</td>
        <td>
          Ans By {props.answer.ansBy}
          <br /> On {askedOn}
          <br /> At {askedAt}
          <br />
        </td>
      </tr>
    </>
  );
};

export default QuestionTableRow;
