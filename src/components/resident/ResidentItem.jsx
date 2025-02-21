import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import imageApi from "../../services/imageApi";

const ResidentItem = () => {
  const { id } = useParams();
  const [resident, setResident] = useState({
    resName: "",
    resGender: "",
    resImages: "",
    resImageAddress: "",
    resPhone: "",
    resGrade: "",
    resDisease: "",
    resLocation: "",
    resEnterDate: "",
    resExitDate: "",
    resAddress: "",
    systemResCode: "",
    resSchoolGrade: "",
    resLongTermCareNo: "",
    resCareGroup: "",
    resFoodType: "",
    resFunctionDis: "",
    dementiaYn: "",
    fallYn: "",
    bedsoreYn: "",
    postureYn: "",
  });

  useEffect(() => {
    loadResident();
  }, [id]);

  const loadResident = async () => {
    try {
      const result = await imageApi.get(
        `http://localhost:8080/api/resident/${id}`
      );
      setResident(result.data);
    } catch (error) {
      console.log("정보를 가져오는 데 실패했습니다.", error);
    }
  };

  return (
    <div>
      <div>
        <strong>이름:</strong> {resident.resName}
      </div>

      <div>
        <strong>사진:</strong>
        <img
          src={`http://localhost:8080/images/${resident.resImageAddress}`}
          alt={`${resident.resName}의 사진`}
          style={{ maxWidth: "300px", maxHeight: "300px" }}
        />
      </div>

      <div>
        <strong>성별:</strong> {resident.resGender}
      </div>

      <div>
        <strong>생년월일:</strong> {resident.resBirth}
      </div>

      <div>
        <strong>전화번호:</strong> {resident.resPhone}
      </div>

      <div>
        <strong>주소:</strong> {resident.resAddress}
      </div>

      <div>
        <strong>등급:</strong> {resident.resGrade}
      </div>

      <div>
        <strong>생활실:</strong> {resident.resLocation}
      </div>

      <div>
        <strong>케어그룹:</strong> {resident.resCareGroup}
      </div>

      <div>
        <strong>최종학력:</strong> {resident.resSchoolGrade}
      </div>

      <div>
        <strong>식사종류:</strong> {resident.resFoodType}
      </div>

      <div>
        <strong>주요질환:</strong> {resident.resDisease}
      </div>

      <div>
        <strong>기능장애:</strong> {resident.resFunctionDis}
      </div>

      <div>
        <strong>욕창위험:</strong> {resident.bedsoreYn ? "있음" : "없음"}
      </div>

      <div>
        <strong>낙상위험:</strong> {resident.fallYn ? "있음" : "없음"}
      </div>

      <div>
        <strong>치매유무:</strong> {resident.dementiaYn ? "있음" : "없음"}
      </div>

      <div>
        <strong>자세변경:</strong> {resident.postureYn ? "있음" : "없음"}
      </div>

      <div>
        <strong>입소자 코드:</strong> {resident.systemResCode}
      </div>

      <div>
        <strong>장기요양인정번호:</strong> {resident.resLongTermCareNo}
      </div>

      <div>
        <strong>입소일:</strong> {resident.resEnterDate}
      </div>

      <div>
        <strong>퇴소일:</strong>{" "}
        {resident.resExitDate ? resident.resExitDate : "미정"}
      </div>
    </div>
  );
};

export default ResidentItem;
