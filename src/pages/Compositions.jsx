import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CompositionList from "../components/composition/CompositionList";
import CompositionForm from "../components/composition/CompositionForm";

const Compositions = () => {
  return (
    <div>
      <div className="text-center">
        <h2>체성분 분석 페이지</h2>
        <nav>
          {/* 요양보호사 전용*/}
          <Link to="/composition/form">환자별 체성분 분석 등록하기</Link> |
          {/* 보호자,요양보호사 */}
          <Link to="/composition/my">환자별 체성분 분석 보기</Link> |
          <Link to="/composition/my">환자별 체성분 분석 보기</Link> |
        </nav>
      </div>

      <div>
        <Routes>
          <Route path="/composition/my" element={<CompositionList />} />
          <Route path="/composition/form" element={<CompositionForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Compositions;
