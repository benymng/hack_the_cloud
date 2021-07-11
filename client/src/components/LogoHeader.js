import logo from "../logo.svg";

const LogoHeader = () => {
  return (
    <img
      src={logo}
      alt="logo"
      style={{
        height: "5em",
        pointerEvents: "none",
        marginTop: "3em",
        marginBottom: "1em",
      }}
    />
  );
};

export default LogoHeader;
