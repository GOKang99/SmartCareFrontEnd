import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ResidentItem = () => {
  const { id } = useParams();
  const [resident, setResident] = useState({
    resName: "",
  });

  useEffect(() => {
    loadResident();
  }, [id]);

  const loadResident = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/api/resident/${id}`
      );
      setResident(result.data);
    } catch (error) {
      console.log("정보를 가져오는 데 실패했습니다.", error);
    }
  };

  return (
    <div>
      <h2>{resident.resName}의 상세 정보</h2>
      {/* 추가적인 정보 표시 */}
    </div>
  );
};

export default ResidentItem;
