import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../ContextApi";
import ResidentManagementModal from "./ResidentMangeModal";

const ResidentList = ({ residents, deleteResident }) => {
  const [searchResidents, setSearchResidents] = useState("");
  const { selectedResident, setSelectedResident } = useMyContext();
  const [selectedResidentData, setSelectedResidentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 검색된 입소자 목록 필터링
  const filteredResidents = residents.filter(
    (resident) =>
      resident.resName.toLowerCase().includes(searchResidents.toLowerCase()) // 이름으로 검색
  );

  const handleClickManage = (resident) => {
    setSelectedResident(resident.resId);
    setSelectedResidentData(resident);
    setIsModalOpen(true);
    console.log(selectedResident);
  };

  useEffect(() => {
    console.log("셀레", selectedResident);
  }, [selectedResident]);
  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* 검색 input */}
      <div className="mb-6 flex items-center justify-center">
        <input
          type="text"
          placeholder="입소자 검색"
          value={searchResidents}
          onChange={(e) => setSearchResidents(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm text-black placeholder:text-gray-400"
        />
      </div>

      {/* 검색된 결과가 없을 때 메시지 */}
      {filteredResidents.length === 0 ? (
        <p className="text-center text-xl font-semibold text-black">
          입소자가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {/* 필터링된 입소자 목록을 카드 형식으로 출력 */}
          {filteredResidents.map((resident) => (
            <div
              key={resident.resId}
              className="bg-white border border-gray-400 shadow-md aspect-square flex flex-col hover:shadow-lg transition duration-300"
            >
              {/* 사진 - 상단 영역 */}
              <div className="flex justify-center items-center pt-6 pb-3 flex-grow">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={`http://localhost:8080/images/${resident.resImageAddress}`}
                    alt={resident.resName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 정보 섹션 */}
              <div className="text-center px-4 pb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {resident.resName}
                </h3>
              </div>

              {/* 버튼 영역 - 하단 고정 */}
              <div className="px-4 pb-4 mt-auto">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* 상세보기 버튼 */}
                  <Link
                    to={`/resident/list/${resident.resId}`}
                    className="block"
                  >
                    <button className="bg-white hover:bg-white text-black border border-blue-700 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm">
                      보기
                    </button>
                  </Link>
                  {/* 수정 버튼 */}
                  <Link
                    to={`/resident/edit/${resident.resId}`}
                    className="block"
                  >
                    <button className="bg-white hover:bg-white text-black border border-yellow-400 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm">
                      수정
                    </button>
                  </Link>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => deleteResident(resident.resId)}
                    className="bg-white hover:bg-white text-black border border-red-500 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm"
                  >
                    삭제
                  </button>
                </div>
                {/* 입소자 관리 버튼 */}
                <button
                  onClick={() => handleClickManage(resident)}
                  className="bg-white hover:bg-white text-black border border-green-700 font-medium py-1 px-1 rounded-md shadow-sm transition duration-300 w-full text-sm"
                >
                  입소자 관리
                </button>

                {isModalOpen && (
                  <ResidentManagementModal
                    onClose={() => setIsModalOpen(false)}
                    resident={selectedResidentData}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResidentList;
