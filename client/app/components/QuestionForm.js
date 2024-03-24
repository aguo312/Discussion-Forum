const QuestionForm = (props) => {
  return (
    <>
      <form>
        <div>Question Title</div>Title should not have more than 50 characters.
        <br />
        <textarea></textarea>
        <br />
        <br />
        <div>Question Summary</div>Summary should not have more than 140
        characters.
        <br />
        <textarea></textarea>
        <br />
        <br />
        <div>Question Text</div>Add Details.
        <br />
        <textarea></textarea>
        <br />
        <br />
        <div>Tags</div>Add keywords separated by whitespace.
        <br />
        <textarea></textarea>
        <br />
        <br />
        <button>Post Question</button>
      </form>
    </>
  );
};

export default QuestionForm;
