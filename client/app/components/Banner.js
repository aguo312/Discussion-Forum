const Banner = (props) => {
  const handleClickLogout = () => props.showWelcome(true);

  return (
    <>
      <button>Question</button>
      <button>Tags</button>
      <button>Username</button>
      <b>Discussion Forum</b>
      <input type="text"></input>
      <button onClick={handleClickLogout}>Logout</button>
    </>
  );
};

export default Banner;
