import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import imageApi from "../../services/imageApi";

const ResidentList = () => {
  const [residents, setResidents] = useState([]);

  const loadResident = async () => {
    try {
      const result = await imageApi.get("http://localhost:8080/api/resident");
      setResidents(result.data);
    } catch (error) {
      console.log("에러발생", error);
    }
  };

  const deleteResident = async (resId) => {
    // 삭제 확인 팝업
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");

    if (isConfirmed) {
      try {
        // 삭제 API 호출
        await imageApi.delete(`http://localhost:8080/api/resident/${resId}`);

        // 삭제 후, 상태에서 해당 입소자 제거
        setResidents(residents.filter((resident) => resident.resId !== resId));

        alert("입소자가 삭제되었습니다.");
      } catch (error) {
        console.log("삭제 오류:", error);
        alert("삭제에 실패했습니다.");
      }
    } else {
      alert("삭제가 취소되었습니다.");
    }
  };

  useEffect(() => {
    loadResident();
  }, []);

  return (
    <div>
      {residents.length === 0 ? (
        <p>입소자 목록이 없습니다.</p>
      ) : (
        <table className="border-collapse border border-amber-600">
          <thead>
            <tr>
              <th className="border border-amber-600">이름</th>
              <th className="border border-amber-600">성별</th>
              <th className="border border-amber-600">생년월일</th>
              <th className="border border-amber-600">상세보기</th>
            </tr>
          </thead>
          <tbody>
            {residents.map((resident) => (
              <tr key={resident.resId}>
                <td className="border border-amber-600">{resident.resName}</td>
                <td className="border border-amber-600">
                  {resident.resGender}
                </td>
                <td className="border border-amber-600">{resident.resBirth}</td>
                <td className="border border-amber-600">
                  <Link to={`/resident/list/${resident.resId}`}>
                    <button>보기</button>
                  </Link>
                  <Link to={`/resident/edit/${resident.resId}`}>
                    <button>수정</button>
                  </Link>
                  <button onClick={() => deleteResident(resident.resId)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResidentList;
