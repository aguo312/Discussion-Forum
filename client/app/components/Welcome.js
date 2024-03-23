const Welcome = (props) => {
  const handleClickLogin = () => props.showLogin(true);
  const handleClickRegister = () => props.showRegister(true);
  const handleClickGuest = () => {
    props.showBanner(true);
  };

  return (
    <>
      <h1>Welcome to Discussion Forum.</h1>
      <button onClick={handleClickLogin}>Login</button>
      <br />
      <button onClick={handleClickRegister}>Register</button>
      <br />
      <button onClick={handleClickGuest}>Continue As Guest</button>
    </>
  );
};

export default Welcome;
