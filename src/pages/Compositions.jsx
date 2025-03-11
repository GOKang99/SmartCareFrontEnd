import React from "react";
import { Route, Routes } from "react-router-dom";
import CompositionList from "../components/composition/CompositionList";
import CompositionListForGiver from "../components/composition/CompositionListForGiver";

const Compositions = () => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl">환자별 체성분 분석</h2>
      </div>

      <Routes>
        <Route path="/my" element={<CompositionList />} />
        <Route path="/admin" element={<CompositionListForGiver />} />
      </Routes>
    </div>
  );
};

export default Compositions;
