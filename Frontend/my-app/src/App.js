import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Header/Navbar";
import Pages from "./Pages";

function App() {
  return (
    <>
      <Header />
      <Navbar/>
      <Pages />
    </>
  );
}

export default App;
