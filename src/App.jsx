import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import MealPage from "./components/meal/MealPage";
import MealAdminPage from "./components/meal/MealAdminPage";
import Agree from "./pages/Agree";
import Footer from "./components/layout/Footer";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Visits from "./pages/Visits";
import ProtectedRoute from "./components/ProtectedRoute";
import Residents from "./pages/Residents";
import NoticeList from "./components/notice/NoticeList";
import NoticeCreateForm from "./components/notice/NoticeCreateForm";
import NoticeDetail from "./components/notice/NoticeDetail";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notice" element={<NoticeList />} />
          <Route
            path="/notice/create"
            element={
              <ProtectedRoute>
                <NoticeCreateForm />
              </ProtectedRoute>
            }
          />
          <Route path="/notice/:noticeId" element={<NoticeDetail />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <Mypage />
              </ProtectedRoute>
            }
          />
          <Route path="/agree" element={<Agree />} />
          <Route
            path="/visits/*"
            element={
              <ProtectedRoute>
                <Visits />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal"
            element={
              <ProtectedRoute>
                <MealPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/meal"
            element={
              <ProtectedRoute>
                <MealAdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resident/*"
            element={
              <ProtectedRoute>
                <Residents />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
