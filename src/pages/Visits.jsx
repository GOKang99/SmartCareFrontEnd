import React, { useEffect, useState } from "react";

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
  const [guardId, setGuardId] = useState(null);
  const [giverId, setGiverId] = useState(null);

  //토큰 해독하기
  const detoken = jwtDecode(token);
  console.log(detoken);

  //어드민 = giver 유저 = guard
  //set실행시 컴포넌트 리 랜더링
  useEffect(() => {
    if (isAdmin) {
      console.log("요양보호사 입니다." + isAdmin);
      setGiverId(detoken.partId);
    } else {
      console.log("어드민이 아닙니다." + isAdmin);
      setGuardId(detoken.partId);
    }
  }, [isAdmin, detoken.partId]);

  return (
    <div>
      <div className="text-center">
        <h2>방문 예약 페이지</h2>
        <nav>
          <Link to="/visits/form">방문 예약하기</Link> |
          <Link to="/visits/my">보호자 예약 내역 보기</Link> |
          {isAdmin && <Link to="/visits/list">모든 예약 보기 |</Link>}
          {/* <Link to="/visits/container">한 예약 보기</Link> */}
        </nav>
      </div>
      {/* 하위 라우트가 렌더링되는 부분 */}
      <Routes>
        {/* 사용 안함 <Route path="container" element={<VisitItemContainer />} /> */}
        <Route path="list" element={<VisitList />} />
        {/* GuardId 넘겨주어야만 볼수있음. */}
        <Route path="my" element={<VisitLisitForGuard guardId={guardId} />} />
        {/* GuardId 있어야지만 예약 생성 가능 */}
        <Route path="form" element={<VisitForm guardId={guardId} />} />
      </Routes>
    </div>
  );
};

export default Visits;
