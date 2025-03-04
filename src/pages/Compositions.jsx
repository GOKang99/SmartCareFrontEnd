import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import CompositionList from "../components/composition/CompositionList";
import CompositionForm from "../components/composition/CompositionForm";
import CompositionListForGiver from "../components/composition/CompositionListForGiver";

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
          <Link to="/composition/admin">(요양사)환자별 체성분 분석 보기</Link> |
        </nav>
      </div>

      <Routes>
        <Route path="/my" element={<CompositionList />} />
        <Route path="/form" element={<CompositionForm />} />
        <Route path="/admin" element={<CompositionListForGiver />} />
      </Routes>
    </div>
  );
};

export default Compositions;
