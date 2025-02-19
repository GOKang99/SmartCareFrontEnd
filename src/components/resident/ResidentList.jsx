import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ResidentList = () => {
  const [residents, SetResidents] = useState([]);

  const loadResident = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/resident");
      SetResidents(result.data);
    } catch (error) {
      console.log("에러발생", error);
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
                  <button>수정</button>
                  <button>삭제</button>
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
