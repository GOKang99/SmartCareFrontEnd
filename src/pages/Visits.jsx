import { Link, Route, Routes } from "react-router-dom";
import VisitList from "../components/visit/VisitList";
import VisitLisitForGuard from "../components/visit/VisitLisitForGuard";
import VisitForm from "../components/visit/VisitForm";
import { useMyContext } from "../ContextApi";

const Visits = () => {
  //컨텍스트 패스에서 토큰, 어드민인지 불러오기
  const { isAdmin } = useMyContext();

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
        <Route path="my" element={<VisitLisitForGuard />} />
        {/* GuardId 있어야지만 예약 생성 가능 */}
        <Route path="form" element={<VisitForm />} />
      </Routes>
    </div>
  );
};

export default Visits;
