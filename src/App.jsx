import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import Reservations from "./pages/Reservations";
import Agree from "./pages/Agree";
import Footer from "./components/layout/Footer";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notices />} />
            <Route path="/mypage/:id" element={<Mypage />} />
            <Route path="/reservation" element={<Reservations />} />
            <Route path="/agree" element={<Agree />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
