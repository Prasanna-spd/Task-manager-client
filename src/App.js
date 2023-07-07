import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AddProject from "./screens/Project";
import Home from "./screens/home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { AuthoriseProvider } from "./components/contextReducer";
import Myprofile from "./screens/Myprofile";

function App() {
  return (
    <AuthoriseProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/project" element={<AddProject />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/myprofile" element={<Myprofile />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthoriseProvider>
  );
}

export default App;
