import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import api from "../../services/api";
import NoVisitsMessage from "./NoVisitsMessage";
// 데이터를 받아오는 컴포넌트
const VisitItemContainer = () => {
  const [visitData, setVisitData] = useState(null);
  const [error, setError] = useState("");

  //VisId하드코딩
  const visId = 2;
  const guardId = 1;

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const response = await api.get(`/visit/${visId}/guard/${guardId}`);
        setVisitData(response.data);
      } catch (err) {
        console.error(err);
        setError("데이터 불러오기 중 오류 발생");
      }
    };
    fetchVisit();
  }, []);

  // 업데이트 성공 시 호출되는 콜백 함수
  const handleUpdateSuccess = (updatedVisit) => {
    console.log("업데이트 성공:", updatedVisit);
    // 필요에 따라 상태를 업데이트할 수 있습니다.
    setVisitData(updatedVisit);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {visitData ? (
        <VisitItem visit={visitData} onUpdateSuccess={handleUpdateSuccess} />
      ) : (
        <NoVisitsMessage />
      )}
    </div>
  );
};

export default VisitItemContainer;
