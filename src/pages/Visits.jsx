import React from "react";

import { Link, Outlet } from "react-router-dom";

const Visits = () => {
  return (
    <div>
      <h2>방문 예약 페이지</h2>
      <nav>
        <Link to="form">방문 예약하기</Link> |
        <Link to="item">예약 내역 보기</Link> |
        <Link to="list">모든 예약 보기</Link>
      </nav>

      {/* 하위 라우트가 렌더링되는 부분 */}
      <Outlet />
    </div>
  );
};

export default Visits;
