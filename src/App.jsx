import { Route, Routes } from "react-router-dom";
import Supervisor from "./pages/Supervisor";
import Operator from "./pages/Operator";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="operator" element={<Operator />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
