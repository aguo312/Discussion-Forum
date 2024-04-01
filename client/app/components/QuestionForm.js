import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../page";

const QuestionForm = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [formatTags, setFormatTags] = useState([]);
  const [existingTags, setExistingTags] = useState([]);
  const [newTags, setNewTags] = useState([]);

  const [emptyTitle, setEmptyTitle] = useState(true);
  const [emptySummary, setEmptySummary] = useState(true);
  const [emptyText, setEmptyText] = useState(true);
  const [emptyTags, setEmptyTags] = useState(true);
  const [invalidTitle, setInvalidTitle] = useState(true);
  const [invalidSummary, setInvalidSummary] = useState(true);
  const [invalidReputation, setInvalidReputation] = useState(false);
  const [errorDetected, setErrorDetected] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/tags")
      .then((res) => setExistingTags(res.data));
  }, []);
  useEffect(() => setEmptyTitle(title.length < 1), [title]);
  useEffect(() => setEmptySummary(summary.length < 1), [summary]);
  useEffect(() => setEmptyText(text.length < 1), [text]);
  useEffect(() => setEmptyTags(tags.length < 1), [tags]);
  useEffect(() => setInvalidTitle(title.length > 50), [title]);
  useEffect(() => setInvalidSummary(summary.length > 140), [summary]);
  // useEffect(() => setInvalidReputation()) // update with user's reputation later
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
  useEffect(() => {
    setFormatTags(
      Array.from(
        new Set(
          tags
            .toLowerCase()
            .split(" ")
            .filter((s) => s !== "")
        )
      )
    );
  }, [tags]);
  useEffect(() => {
    setNewTags(formatTags.filter((s) => !existingTags.includes(s)));
  }, [formatTags]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);
  const handleTextChange = (e) => setText(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);

  const handleClickPost = (e) => {
    e.preventDefault();
    let error = "Problems detected!\n";
    if (errorDetected) {
      if (emptyTitle) error += "Title field is empty.\n";
      if (invalidTitle)
        error += "Title field cannot be more than 50 characters.\n";
      if (emptySummary) error += "Summary field is empty.\n";
      if (invalidSummary)
        error += "Sumamry field cannot be more than 140 characters.\n";
      if (emptyText) error += "Text field is empty.\n";
      if (emptyTags) error += "Tags field is empty.\n";
      if (invalidReputation && formatTags.length > 0)
        error += "100 reputation required to create new tags.\n";
      alert(error);
    } else {
      axios
        .post("http://localhost:8080/tags", [user.id].concat(newTags))
        .then((res) => {
          axios.get("http://localhost:8080/tags").then((res1) => {
            // console.log(res1.data);
            // console.log(formatTags);
            const tagIds = formatTags.map((tagName) => {
              return res1.data.find((tagObject) => {
                return tagObject.name == tagName;
              }).id;
            });
            console.log([title, summary, text, user.id].concat(tagIds));
            axios
              .post(
                "http://localhost:8080/question",
                [title, summary, text, user.id].concat(tagIds)
              )
              .then((res2) => {
                console.log(res2.data);
              });
          });
        });
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
        <button onClick={handleClickPost}>Post Question</button>
      </form>
    </>
  );
};

export default QuestionForm;
