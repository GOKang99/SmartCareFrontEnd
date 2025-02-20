import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import Reservations from "./pages/Reservations";
import MealPage from "./components/meal/MealPage";
import MealAdminPage from "./components/meal/MealAdminPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<Notices />} />
          <Route path="/meal" element={<MealPage />} />
          <Route path="/admin/meal" element={<MealAdminPage />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/reservation" element={<Reservations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
