import React, { useEffect, useState } from "react";
import { useMyContext } from "../../ContextApi";
import api from "../../services/api";
import CompositionTable from "./CompositionTable";

const CompositionList = () => {
  //compositions 가져오기
  const [compositions, setCompositions] = useState([]);
  //환자 아이디 저장하기
  const [resId, setResId] = useState(null);
  //에러
  const [error, setError] = useState("");

  //환자 아이디 가져오는 contextPath
  const { userData } = useMyContext();

  //resId 세팅
  useEffect(() => {
    if (userData && userData.residentId) {
      console.log("컴포지션에서의 환자 아이디 ", userData.residentId);
      if (resId !== userData.residentId) {
        setResId(userData.residentId);
      }
    } else {
      console.log("환자 Id출력 안됨");
    }
  }, [userData]);

  useEffect(() => {
    const fetchAllCompositions = async () => {
      if (!resId) return;

      try {
        const response = await api.get(`/composition/all/${resId}`);
        console.log(response);
        setCompositions(response.data);
      } catch (error) {
        console.error(error);
        setError("모든 데이터 불러오기 중 오류 발생");
      }
    };
    fetchAllCompositions();
  }, [resId]);

  return (
    <>
      <h1 className="text-6xl flex justify-center items-center">
        보호자 페이지
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <CompositionTable compositions={compositions} />
    </>
  );
};

export default CompositionList;
