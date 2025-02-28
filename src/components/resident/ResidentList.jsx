import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResidentList = ({ residents, deleteResident }) => {
  const [searchResidents, setSearchResidents] = useState("");

  // 검색된 입소자 목록 필터링
  const filteredResidents = residents.filter(
    (resident) =>
      resident.resName.toLowerCase().includes(searchResidents.toLowerCase()) // 이름으로 검색
  );

  return (
    <div className="min-h-screen bg-white text-blue-900 p-6">
      {/* 검색 input */}
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="입소자 검색"
          value={searchResidents}
          onChange={(e) => setSearchResidents(e.target.value)} // 검색어 상태 변경
          className="border border-blue-300 px-4 py-2 rounded-md"
        />
      </div>

      {/* 검색된 결과가 없을 때 메시지 */}
      {filteredResidents.length === 0 ? (
        <p className="text-center text-xl font-semibold">입소자가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 필터링된 입소자 목록을 카드 형식으로 출력 */}
          {filteredResidents.map((resident) => (
            <div
              key={resident.resId}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
            >
              {/* 사진 */}
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:8080/images/${resident.resImageAddress}`}
                  alt={resident.resName}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>

              {/* 이름 */}
              <h3 className="text-lg font-semibold text-center">
                {resident.resName}
              </h3>

              {/* 생년월일 */}
              <p className="text-center text-gray-600">{resident.resBirth}</p>

              {/* 버튼 영역 */}
              <div className="flex justify-between mt-4">
                {/* 상세보기 버튼 */}
                <Link to={`/resident/list/${resident.resId}`}>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded-md shadow-md transition duration-300">
                    보기
                  </button>
                </Link>
                {/* 수정 버튼 */}
                <Link to={`/resident/edit/${resident.resId}`}>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded-md shadow-md transition duration-300">
                    수정
                  </button>
                </Link>
                {/* 삭제 버튼 */}
                <button
                  onClick={() => deleteResident(resident.resId)} // confirm은 deleteResident에서 처리
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-md shadow-md transition duration-300"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResidentList;
