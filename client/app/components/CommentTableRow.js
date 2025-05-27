import axios from "axios";
import { useEffect, useState } from "react";

const CommentTableRow = (props) => {
  const [comment, setComment] = useState({
    text: "",
    commentBy: "",
    commentDateTime: "",
    owner: { username: "" },
  });

  useEffect(() => {
    axios.get("http://localhost:8080/comment/" + props.cid).then((res) => {
      setComment(res.data);
    });
  }, []);

  const localDate = new Date(comment.commentDateTime).toString();
  const commentOn =
    localDate.substring(4, 10) + ", " + localDate.substring(11, 15);
  const commentAt = localDate.substring(16, 21);

  return (
    <>
      <tr>
        <td colSpan={2}>
          <i>{comment.text}</i>
        </td>
        <td>
          Commented By {comment.commentBy}
          <br />
          On {commentOn}
          <br />
          At {commentAt}
          <br />
        </td>
      </tr>
    </>
  );
};

export default CommentTableRow;
