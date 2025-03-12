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

  // 페이징 관련 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await api.get("/visit/all");
        // console.log(response);
        setVisits(response.data);
      } catch (error) {
        // console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllVisits();
  }, []);

  //필터링 된 목록 반환하기
  const filteredVisits = visits.filter((visit) => {
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

  // 페이징 처리된 데이터
  const totalPage = Math.ceil(filteredVisits.length / itemsPerPage);
  const paginatedVisits = filteredVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
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
        {paginatedVisits.length > 0 ? (
          <VisitItem visit={paginatedVisits} />
        ) : (
          <NoVisitsMessage />
        )}
      </div>
      {/* 페이징 버튼 */}
      <nav className="flex justify-center mt-6 mb-6">
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 h-10 bg-white border rounded-s-lg hover:bg-gray-100"
            >
              처음
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 h-10 bg-white border hover:bg-gray-100"
            >
              이전
            </button>
          </li>
          {Array.from({ length: totalPage }, (_, i) => (
            <li key={i + 1}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 h-10 border ${
                  currentPage === i + 1
                    ? "bg-blue-50 text-blue-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPage}
              className="px-4 h-10 bg-white border hover:bg-gray-100"
            >
              다음
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageChange(totalPage)}
              className="px-4 h-10 bg-white border rounded-e-lg hover:bg-gray-100"
            >
              끝으로
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default VisitList;
