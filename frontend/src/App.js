import GoogleLoginComponent from "./components/GoogleLoginComponent";

function App() {
  
  const testClick = () => {
    console.log(`BACKEND: ${process.env.REACT_APP_BASE_BACKEND}`)
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
