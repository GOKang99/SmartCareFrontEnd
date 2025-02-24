import React from "react";

import { Link, Route, Routes } from "react-router-dom";
import VisitItemContainer from "../components/visit/VisitItemContainer";
import VisitList from "../components/visit/VisitList";
import VisitLisitForGuard from "../components/visit/VisitLisitForGuard";
import VisitForm from "../components/visit/VisitForm";
import { useMyContext } from "../ContextApi";
import { jwtDecode } from "jwt-decode";

const Visits = () => {
  //컨텍스트 패스에서 토큰, 어드민인지 불러오기
  const { token, isAdmin } = useMyContext();

  //토큰 해독하기
  const detoken = jwtDecode(token);
  console.log(detoken);

  //If문 바깥에서 사용하기 위해 먼저 선언
  let giverId = null;
  let guardId = null;

  //어드민 = giver 유저 = guard
  if (isAdmin) {
    console.log("요양보호사 입니다." + isAdmin);
    const giverId = detoken.partId;
    console.log("요양보호사 아이디는 " + giverId);
  } else {
    console.log("어드민이 아닙니다." + isAdmin);
    const guardId = detoken.partId;
    console.log("보호자 아이디는" + guardId);
  }

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
        <Route
          path="container"
          element={<VisitItemContainer guardId={guardId} />}
        />
        <Route path="list" element={<VisitList />} />
        <Route path="my" element={<VisitLisitForGuard guardId={guardId} />} />
        <Route path="form" element={<VisitForm guardId={guardId} />} />
      </Routes>
    </div>
  );
};

export default Visits;
