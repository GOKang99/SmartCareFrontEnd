import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import Agree from "./pages/Agree";
import Footer from "./components/layout/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Visits from "./pages/Visits";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notice" element={<Notices />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/agree" element={<Agree />} />
          <Route path="/visits/*" element={<Visits />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
