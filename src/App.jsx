import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Notices from "./pages/Notices";
import Mypage from "./pages/Mypage";
import Visits from "./pages/Visits";
import VisitList from "./components/visit/VisitList";
import VisitItem from "./components/visit/VisitItem";
import VisitForm from "./components/visit/VisitForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<Notices />} />
          <Route path="/mypage/:id" element={<Mypage />} />

          {/* 서브 라우팅 설정 */}
          <Route path="/visits" element={<Visits />}>
            <Route path="form" element={<VisitForm />} />
            <Route path="item" element={<VisitItem />} />
            <Route path="list" element={<VisitList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
