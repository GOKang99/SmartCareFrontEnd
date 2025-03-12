import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import api from "../../services/api";
import ErrorMessage from "../form/ErrorMessage";
import NoVisitsMessage from "./NoVisitsMessage";
import turnback from "/return.png";

const VisitList = () => {
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState("");
  const [filterName, SetFilterName] = useState(""); //환자 이름으로 필터
  const [filterDate, SetFilterDate] = useState(""); //날짜로 필터
  const [filterStatus, SetFilterStatus] = useState(""); //예약 상태로 필터

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

    const statusMatch = filterStatus === "" || visit.visApply === filterStatus;
    return nameMatch && dateMatch && statusMatch;
  });

  const handleReset = () => {
    SetFilterDate("");
    SetFilterName("");
    SetFilterStatus("");
  };

  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {error && <ErrorMessage error={error} />}

      {/* 검색 필터 UI 영역 */}
      <div className="p-4 h-15 space-y-4 w-[900px] mx-auto ">
        {/*  */}
        {/* 이름 검색 필터  */}
        <div>
          <label className="mr-1">환자 이름 검색:</label>
          <input
            type="text"
            value={filterName}
            placeholder="예) 홍길동"
            onChange={(e) => SetFilterName(e.target.value)}
            className="p-1 border border-gray-300 rounded h-7"
          />

          {/* 날짜 검색 필터 */}
          <label className="mr-1 p-1">날짜 검색:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => SetFilterDate(e.target.value)}
            className="p-0.5 border border-gray-300 rounded h-7"
          />

          {/* 예약 상태별 보기 */}
          <label className="mr-1 p-0.5">승인 상태:</label>
          <select
            value={filterStatus}
            onChange={(e) => SetFilterStatus(e.target.value)}
            className=" py-1 border m-1 border-gray-300 rounded-md h-8"
          >
            <option value="">승인 상태</option>
            <option value="pending">대기</option>
            <option value="rejected">거절</option>
            <option value="permited">허가</option>
          </select>

          <button onClick={handleReset}>
            <img
              src={turnback}
              alt="초기화 하기"
              className="mx-2 w-[20px] h-auto transition-transform duration-300 hover:scale-120"
            ></img>
          </button>
        </div>
      </div>

      <div>
        {FilteredVisits.length > 0 ? (
          <VisitItem visit={visits} />
        ) : (
          <NoVisitsMessage />
        )}
      </div>
    </div>
  );
};

export default VisitList;
