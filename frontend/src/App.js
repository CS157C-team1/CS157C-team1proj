import GoogleLoginComponent from "./components/GoogleLoginComponent";
import axios from 'axios';

function App() {
  
  const testClick = async (response) => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_BACKEND}/api/user/allUsers`, 
        { token: response.tokenId},
        { withCredentials: true })
      } catch (e) {
        console.log(e)
      }
  }

  return (
    <div>
      <h1>Basic HomePage</h1>
      {/* <h2>Base Backend: {process.env.REACT_APP_BASE_BACKEND}</h2> */}
      <GoogleLoginComponent />
    <button onClick={ testClick }>CLICK ON ME</button>
    </div>
  );
}

export default App;
