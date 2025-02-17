import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import Reservations from "./pages/Reservations";
import Residents from "./pages/Residents";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<Notices />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/reservation" element={<Reservations />} />
          <Route path="/resident/*" element={<Residents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
