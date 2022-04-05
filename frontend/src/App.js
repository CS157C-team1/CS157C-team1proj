import GoogleLoginComponent from "./components/GoogleLoginComponent";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const testClick = async (response) => {
    try {
      await axios.get(
        `${process.env.REACT_APP_BASE_BACKEND}/api/user/allUsers`,
        { token: response.tokenId },
        { withCredentials: true }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // style={{backgroundImage:`url(${homePageImage})`}}
    <div>
      <Header />
      <div className="home-layout">
        {/* <h2>Base Backend: {process.env.REACT_APP_BASE_BACKEND}</h2> */}
        <GoogleLoginComponent />
        <button onClick={testClick}>CLICK ON ME</button>
        {/* <img src={homePageImage} alt='University Students'/> */}
      </div>
    </div>
  );
}

export default App;
