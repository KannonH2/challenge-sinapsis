/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/*eslint-enable*/
import Home from "./components/home/home";
import Prev from "./components/preview/preview";
import Editor from "./components/editor/editor";
import Landing from "./components/landing/landing";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/preview" element={<Prev />} />
        <Route path="/edit" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
