import CommentTableRow from "./CommentTableRow";
import { GlobalContext } from "../page";
import api from "../api/api";

const { useState, useEffect, useContext } = require("react");

const CommentTable = (props) => {
  const { user } = useContext(GlobalContext);
  const [comment, setComment] = useState("");

  const [emptyComment, setEmptyComment] = useState(true);
  const [invalidComment, setInvalidComment] = useState(false);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => setEmptyComment(comment.length < 1), [comment]);
  useEffect(() => setInvalidComment(comment.length > 140), [comment]);
  useEffect(() => setErrorDetected(emptyComment || invalidComment));

  const handleCommentChange = (e) => setComment(e.target.value);
  const handleCommentEnter = (e) => {
    if (e.keyCode === 13) {
      let error = "Problems detected!\n";
      if (errorDetected) {
        if (emptyComment) error += "Comment cannot be empty.\n";
        if (invalidComment)
          error += "Comment cannot be more than 140 characters.\n";
        alert(error);
      } else {
        api
          .post("/comment", [comment, user.id, props.dataType, props.data.id])
          .then((res) => {
            setComment("");
            props.onCommentUpdate();
          });
      }
    }
  };

  const rows = [];
  if (props.data.comments) {
    Array.from(props.data.comments).forEach((cid) => {
      rows.unshift(<CommentTableRow key={cid} cid={cid}></CommentTableRow>);
    });
  }

  const commentBoxActive = () => {
    return (
      <>
        {"Add comment: "}
        <input
          placeholder="Press enter to add a new comment..."
          size={30}
          value={comment}
          onChange={handleCommentChange}
          onKeyUp={handleCommentEnter}
        ></input>
      </>
    );
  };
  return (
    <>
      {rows}
      <tr>
        <td colSpan={3}>{commentBoxActive()}</td>
      </tr>
    </>
  );
};

export default CommentTable;
