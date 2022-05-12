/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*eslint-enable*/
import Home from "./components/home/home";
import Prev from "./components/preview/preview";
import Edit from "./components/edit/edit";
import Landing from "./components/landing/landing";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/preview" element={<Prev />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
