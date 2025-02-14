import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppID from "ibmcloud-appid-js";

function App() {
  const appID = React.useMemo(() => {
    return new AppID();
  }, []);

  const [errorState, setErrorState] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  (async () => {
    try {
      await appID.init({
        clientId: "e7814457-bc3f-49c2-93ac-9eeabcaf640a",
        discoveryEndpoint:
          "https://us-south.appid.cloud.ibm.com/oauth/v4/b113391e-d6bb-49b6-a3ae-ca3204b51841/.well-known/openid-configuration",
      });
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  })();

  const [welcomeDisplayState, setWelcomeDisplayState] = React.useState(false);
  const [loginButtonDisplayState, setLoginButtonDisplayState] =
    React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [token, setToken] = React.useState("");
  console.log(token);

  const loginAction = async () => {
    try {
      const tokens = await appID.signin();
      setErrorState(false);
      setLoginButtonDisplayState(false);
      setWelcomeDisplayState(true);
      setUserName(tokens.idTokenPayload.name);
      setToken(tokens);
    } catch (e) {
      setErrorState(true);
      setErrorMessage(e.message);
    }
  };

  return (
    <>
      <h1>Web app to control and config the hardware of hydroponic system.</h1>
      <h2 className="text-gray-600">
        Initial React configuration with Tailwind
      </h2>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {welcomeDisplayState && (
            <div> Welcome {userName}! You are now authenticated.</div>
          )}
          {loginButtonDisplayState && (
            <button
              style={{
                fontSize: "24px",
                backgroundColor: "skyblue",
                border: "none",
                cursor: "pointer",
              }}
              id="login"
              onClick={loginAction}
            >
              Login
            </button>
          )}
          {errorState && <div style={{ color: "red" }}>{errorMessage}</div>}
        </header>
      </div>
    </>
  );
}

export default App;
