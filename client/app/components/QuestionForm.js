import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../page";

const QuestionForm = (props) => {
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  const [emptyTitle, setEmptyTitle] = useState(true);
  const [emptySummary, setEmptySummary] = useState(true);
  const [emptyText, setEmptyText] = useState(true);
  const [emptyTags, setEmptyTags] = useState(true);
  const [invalidTitle, setInvalidTitle] = useState(true);
  const [invalidSummary, setInvalidSummary] = useState(true);
  const [invalidReputation, setInvalidReputation] = useState(false);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => console.log(user), []);
  useEffect(() => setEmptyTitle(title.length < 1), [title]);
  useEffect(() => setEmptySummary(summary.length < 1), [summary]);
  useEffect(() => setEmptyText(text.length < 1), [text]);
  useEffect(() => setEmptyTags(tags.length < 1), [tags]);
  useEffect(() => setInvalidTitle(title.length > 50), [title]);
  useEffect(() => setInvalidSummary(summary.length > 140), [summary]);
  //   useEffect(() => setInvalidReputation())
  useEffect(
    () =>
      setErrorDetected(
        emptyTitle ||
          emptySummary ||
          emptyText ||
          emptyTags ||
          invalidTitle ||
          invalidSummary ||
          invalidReputation
      ),
    [
      emptyTitle,
      emptySummary,
      emptyText,
      emptyTags,
      invalidTitle,
      invalidSummary,
      invalidReputation,
    ]
  );

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  const handleClickPost = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (errorDetected) {
      if (emptyTitle) error += "Title field is empty.\n";
      if (emptySummary) error += "Summary field is empty.\n";
      if (emptyText) error += "Text field is empty.\n";
      if (emptyTags) error += "Tags field is empty.\n";
      alert(error);
    } else {
      // axios.
    }
  };

  return (
    <>
      <form>
        <div>Question Title</div>Title should not have more than 50 characters.
        <br />
        <textarea onChange={handleTitleChange}></textarea>
        <br />
        <br />
        <div>Question Summary</div>Summary should not have more than 140
        characters.
        <br />
        <textarea onChange={handleSummaryChange}></textarea>
        <br />
        <br />
        <div>Question Text</div>Add Details.
        <br />
        <textarea onChange={handleTextChange}></textarea>
        <br />
        <br />
        <div>Tags</div>Add keywords separated by whitespace.
        <br />
        <textarea onChange={handleTagsChange}></textarea>
        <br />
        <br />
        <button onChange={handleClickPost}>Post Question</button>
      </form>
    </>
  );
};

export default QuestionForm;
