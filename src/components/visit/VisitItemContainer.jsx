import React, { useEffect, useState } from "react";
import VisitItem from "./VisitItem";
import axios from "axios";
import api from "../../services/api";
// 데이터를 받아오는 컴포넌트
const VisitItemContainer = () => {
  const [visitData, setVisitData] = useState(null);
  const [error, setError] = useState("");
  const [visId, setVisId] = useState(2);
  const [guardId, setGuardId] = useState(1);

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 space-y-4 w-[1000px] mx-auto ">
      {visitData ? <VisitItem visit={visitData} /> : <p> 데이터 없음</p>}
    </div>
  );
};

export default VisitItemContainer;
