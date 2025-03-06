import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Visits from "./pages/Visits";
import ProtectedRoute from "./components/ProtectedRoute";
import Residents from "./pages/Residents";
import { ToastContainer } from "react-toastify";
import NoticeList from "./components/notice/NoticeList";
import NoticeCreateForm from "./components/notice/NoticeCreateForm";
import NoticeDetail from "./components/notice/NoticeDetail";
import Popup from "./pages/Popup";
import Signup from "./auth/Signup";
import Givers from "./pages/Givers";
import NoticeEdit from "./components/notice/NoticeEdit";
import Status from "./pages/Status";

function Layout() {
  const location = useLocation(); // 현재 URL 가져오기

  // ✅ 팝업 페이지(`/popup/terms`)에서는 Header & Footer 숨기기
  const isPopup = location.pathname.startsWith("/popup");

  return (
    <div className="flex flex-col min-h-screen">
      {!isPopup && <Header />} {/* 팝업이 아닐 때만 Header 보이기 */}
      <ToastContainer position="bottom-right" reverseOrder={false} />
      <Routes>
        {/* 메인 페이지들 */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="givers" element={<Givers />} />
        <Route
          path="/notice/create"
          element={
            <ProtectedRoute adminPage={true}>
              <NoticeCreateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notice/edit/:noticeId"
          element={
            <ProtectedRoute adminPage={true}>
              <NoticeEdit />
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
        <Route
          path="/agree"
          element={
            <ProtectedRoute>
              <Agree />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        {/* ✅ 팝업 전용 라우트 (Header & Footer 없이 렌더링) */}
        <Route path="/popup/terms" element={<Popup />} />
      </Routes>
      {!isPopup && <Footer />} {/* 팝업이 아닐 때만 Footer 보이기 */}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
