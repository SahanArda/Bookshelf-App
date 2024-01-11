import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
// import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
