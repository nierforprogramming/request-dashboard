import { Route, Routes } from "react-router-dom";
import Supervisor from "./pages/Supervisor";
import Operator from "./pages/Operator";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="m-4">
        <Routes>
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="operator" element={<Operator />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
