import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import NoVisitsMessage from "./NoVisitsMessage";

const VisitList = () => {
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");
  const [filterName, SetFilterName] = useState("");
  const [filterDate, SetFilterDate] = useState("");

  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await api.get("/visit/all");
        console.log(response);
        setVisits(response.data);
      } catch (error) {
        console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllVisits();
  }, []);

  //필터링 된 목록 반환하기
  const FilteredVisits = visits.filter((visit) => {
    //nameMatch= filterName과 완전히 일치하거나, 환자 이름이 포함되어 있을 때
    const nameMatch = filterName === "" || visit.resName?.includes(filterName);
    //완전히 일치하는 날짜만 가지고 온다.
    const dateMatch = filterDate === "" || visit.visDate === filterDate;

    return nameMatch && dateMatch;
  });

  const handleReset = () => {
    SetFilterDate("");
    SetFilterName("");
  };

  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {error && <ErrorMessage error={error} />}

      {/* 검색 필터 UI 영역 */}
      <div className="p-4 h-15 space-y-4 w-[800px] mx-auto ">
        {/*  */}
        {/* 이름 검색 필터  */}
        <div>
          <label className="mr-2">환자 이름 검색:</label>
          <input
            type="text"
            value={filterName}
            placeholder="예) 홍길동"
            onChange={(e) => SetFilterName(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />

          {/* 날짜 검색 필터 */}
          <label className="mr-2 p-4">날짜 검색:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => SetFilterDate(e.target.value)}
            className="p-1 border border-gray-300 rounded"
          />

          <button
            className="p-1 m-2 text-white border-r-2 bg-violet-500 hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 ..."
            onClick={handleReset}
          >
            필터 초기화
          </button>
        </div>
      </div>

      <div>
        {FilteredVisits.length > 0 ? (
          FilteredVisits.map((visit) => (
            <VisitItem key={visit.visId} visit={visit} />
          ))
        ) : (
          <NoVisitsMessage />
        )}
      </div>
    </div>
  );
};

export default VisitList;
