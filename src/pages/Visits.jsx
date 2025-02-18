import React from "react";

import { Link, Route, Routes } from "react-router-dom";
import VisitItemContainer from "../components/visit/VisitItemContainer";
import VisitList from "../components/visit/VisitList";
import VisitLisitForGuard from "../components/visit/VisitLisitForGuard";

const Visits = () => {
  return (
    <div>
      <div className="text-center">
        <h2>방문 예약 페이지</h2>
        <nav>
          <Link to="/visits/form">방문 예약하기</Link> |
          <Link to="/visits/my">보호자 예약 내역 보기</Link> |
          <Link to="/visits/list">모든 예약 보기</Link> |
          <Link to="/visits/container">한 예약 보기</Link>
        </nav>
      </div>
      {/* 하위 라우트가 렌더링되는 부분 */}
      <Routes>
        <Route path="container" element={<VisitItemContainer />} />
        <Route path="list" element={<VisitList />} />
        <Route path="my" element={<VisitLisitForGuard />} />
      </Routes>
    </div>
  );
};

export default Visits;
