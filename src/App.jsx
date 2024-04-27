import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/ui/Header/Header";
import Footer from "./components/ui/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
