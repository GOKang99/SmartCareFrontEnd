import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import imageApi from "../../services/imageApi";

const ResidentEdit = ({ giverId }) => {
  const { id } = useParams();
  const [image, setImage] = useState(null); // 이미지 URL 상태
  const [file, setFile] = useState(null); // 실제 파일 객체 상태
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth: "",
    phone: "",
    grade: "",
    disease: "",
    location: "",
    enterdate: "",
    exitdate: "",
    address: "",
    schoolgrade: "",
    longtermNo: "",
    caregroup: "",
    foodtype: "",
    functiondis: "",
    dementiaYn: false,
    fallYn: false,
    bedsoreYn: false,
    postureYn: false,
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      (selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/jpg")
    ) {
      // 미리보기용 URL 설정
      setImage(URL.createObjectURL(selectedFile));
      // 실제 파일을 상태에 저장
      setFile(selectedFile);
    } else {
      alert("jpg 또는 png 파일만 업로드 가능합니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 체크박스인 경우 checked 값을 사용하고, 그렇지 않으면 value를 사용
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const checkPhoneNo = (phone) => {
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  const loadResident = async () => {
    try {
      const response = await imageApi.get(
        `http://localhost:8080/api/resident/${id}`
      );
      const resident = response.data;
      setFormData({
        name: resident.resName,
        gender: resident.resGender,
        birth: resident.resBirth,
        phone: resident.resPhone,
        grade: resident.resGrade,
        disease: resident.resDisease,
        location: resident.resLocation,
        enterdate: resident.resEnterDate,
        exitdate: resident.resExitDate,
        address: resident.resAddress,
        schoolgrade: resident.resSchoolGrade,
        longtermNo: resident.resLongTermCareNo,
        caregroup: resident.resCareGroup,
        foodtype: resident.resFoodType,
        functiondis: resident.resFunctionDis,
        dementiaYn: resident.dementiaYn,
        fallYn: resident.fallYn,
        bedsoreYn: resident.bedsoreYn,
        postureYn: resident.postureYn,
      });
      setImage(`http://localhost:8080/images/${resident.resImageAddress}`); // 이미지 경로 설정
    } catch (error) {
      console.error("Error fetching resident data:", error);
    }
  };

  useEffect(() => {
    loadResident();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // 일반적인 데이터 추가
    data.append("giverId", giverId);
    data.append("resName", formData.name);
    data.append("resGender", formData.gender);
    data.append("resBirth", formData.birth);
    data.append("resPhone", formData.phone);
    data.append("resGrade", formData.grade);
    data.append("resDisease", formData.disease);
    data.append("resLocation", formData.location);
    data.append("resEnterDate", formData.enterdate);

    if (formData.exitdate) {
      data.append("resExitDate", formData.exitdate);
    }

    data.append("resAddress", formData.address);
    data.append("resSchoolGrade", formData.schoolgrade);
    data.append("systemResCode", formData.systemcode);
    data.append("resLongTermCareNo", formData.longtermNo);
    data.append("resCareGroup", formData.caregroup);
    data.append("resFoodType", formData.foodtype);
    data.append("resFunctionDis", formData.functiondis);

    // boolean 값 처리: 서버에서 true/false를 string으로 처리한다고 가정
    data.append("dementiaYn", formData.dementiaYn ? "true" : "false");
    data.append("fallYn", formData.fallYn ? "true" : "false");
    data.append("bedsoreYn", formData.bedsoreYn ? "true" : "false");
    data.append("postureYn", formData.postureYn ? "true" : "false");

    // 이미지 파일이 있을 경우, 파일 객체 추가
    if (file) {
      data.append("resImages", file);
    }

    // 전화번호 형식 확인
    if (!checkPhoneNo(formData.phone)) {
      alert("전화번호 형식이 올바르지 않습니다. (예:010-1234-5678)");
      return;
    }

    try {
      // PUT 요청으로 데이터 전송
      const response = await imageApi.put(
        `http://localhost:8080/api/resident/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 서버 응답 확인
      console.log("Response:", response.data);
      alert("수정이 완료되었습니다.");
      navigate("/resident/list");
    } catch (error) {
      console.error("Error:", error);
      alert("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* 이미지 업로드 섹션 */}
        <div className="space-y-2">
          <label htmlFor="image-upload" className="font-semibold">
            이미지 업로드
          </label>
          {/* file input 요소는 화면에 표시되지 않게 */}
          <input
            id="image-upload"
            type="file"
            accept=".jpg, .png"
            onChange={handleImageChange}
            className="hidden" // 기본 텍스트 숨기기
          />
          {/* custom 버튼 또는 스타일링 */}
          <button
            type="button"
            className="border border-gray-300 rounded p-2 cursor-pointer" // cursor-pointer 추가
            onClick={() => document.getElementById("image-upload").click()}
          >
            파일 선택
          </button>

          {/* 이미지 미리보기 */}
          {image && (
            <div className="mt-2 w-45 h-45 overflow-hidden">
              <img
                src={image}
                alt="preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* 폼 항목들 3개씩 나열 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 첫 번째 열 */}
          <div>
            <label className="font-semibold">입소자 성명</label>
            <input
              required
              placeholder="이름"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">성별</label>
            <select
              required
              name="gender"
              onChange={handleInputChange}
              value={formData.gender}
              className="w-full p-2 border rounded-md mt-2"
            >
              <option value="">선택하세요</option>
              <option value="남자">남자</option>
              <option value="여자">여자</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">생년월일</label>
            <input
              required
              placeholder="생년월일"
              type="date"
              name="birth"
              onChange={handleInputChange}
              value={formData.birth}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          {/* 두 번째 열 */}
          <div>
            <label className="font-semibold">전화번호</label>
            <input
              required
              placeholder="전화번호"
              type="text"
              name="phone"
              onChange={handleInputChange}
              value={formData.phone}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">등급</label>
            <input
              required
              placeholder="등급"
              type="text"
              name="grade"
              onChange={handleInputChange}
              value={formData.grade}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">주요질환</label>
            <input
              required
              placeholder="주요질환"
              type="text"
              name="disease"
              onChange={handleInputChange}
              value={formData.disease}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          {/* 세 번째 열 */}
          <div>
            <label className="font-semibold">생활실</label>
            <input
              required
              placeholder="생활실"
              type="text"
              name="location"
              onChange={handleInputChange}
              value={formData.location}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">입소일</label>
            <input
              required
              type="date"
              name="enterdate"
              onChange={handleInputChange}
              value={formData.enterdate}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">퇴소일</label>
            <input
              type="date"
              name="exitdate"
              onChange={handleInputChange}
              value={formData.exitdate || ""}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>
        </div>

        {/* 체크박스 그룹 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="font-semibold">치매유무</label>
            <input
              type="checkbox"
              name="dementiaYn"
              checked={formData.dementiaYn}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">낙상위험</label>
            <input
              type="checkbox"
              name="fallYn"
              checked={formData.fallYn}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">욕창위험</label>
            <input
              type="checkbox"
              name="bedsoreYn"
              checked={formData.bedsoreYn}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">자세변경</label>
            <input
              type="checkbox"
              name="postureYn"
              checked={formData.postureYn}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">주소</label>
            <input
              required
              placeholder="주소"
              type="text"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">최종학력</label>
            <select
              required
              name="schoolgrade"
              onChange={handleInputChange}
              value={formData.schoolgrade}
              className="w-full p-2 border rounded-md mt-2"
            >
              <option value="">선택하세요</option>
              <option value="초졸">초졸</option>
              <option value="중졸">중졸</option>
              <option value="고졸">고졸</option>
              <option value="대졸">대졸</option>
              <option value="미상">미상</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">장기요양인정번호</label>
            <input
              required
              placeholder="장기요양인정번호"
              type="text"
              name="longtermNo"
              onChange={handleInputChange}
              value={formData.longtermNo}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">케어그룹</label>
            <input
              required
              placeholder="케어그룹"
              type="text"
              name="caregroup"
              onChange={handleInputChange}
              value={formData.caregroup}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">식사종류</label>
            <select
              required
              name="foodtype"
              onChange={handleInputChange}
              value={formData.foodtype}
              className="w-full p-2 border rounded-md mt-2"
            >
              <option value="">선택하세요</option>
              <option value="일반식">일반식</option>
              <option value="연식">연식</option>
              <option value="죽식">죽식</option>
              <option value="특수식">특수식</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">기능장애</label>
            <input
              required
              placeholder="기능장애"
              type="text"
              name="functiondis"
              onChange={handleInputChange}
              value={formData.functiondis}
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>
        </div>

        {/* 제출 및 취소 버튼 */}
        <div className="flex justify-end items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            제출
          </button>
          <Link to="/resident">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              취소
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResidentEdit;
