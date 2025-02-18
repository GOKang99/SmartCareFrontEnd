import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResidentForm = () => {
  const [image, setImage] = useState(null);

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
    systemcode: "",
    longtermNo: "",
    caregroup: "",
    foodtype: "",
    functiondis: "",
    dementiaYn: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpg")) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("jpg 또는 png 파일만 업로드 가능합니다.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("resName", formData.name);
    data.append("resGender", formData.gender);
    data.append("resBirth", formData.birth);
    data.append("resPhone=", formData.phone);
    data.append("resGrade", formData.grade);
    data.append("resDisease", formData.disease);
    data.append("resLocation", formData.location);
    data.append("resEnterDate", formData.enterdate);
    data.append("resExitDate", formData.exitdate);
    data.append("resAddress", formData.address);
    data.append("resSchoolGrade", formData.schoolgrade);
    data.append("systemResCode", formData.systemcode);
    data.append("resLongTermCareNo", formData.longtermNo);
    data.append("resCareGroup", formData.caregroup);
    data.append("resFoodType", formData.foodtype);
    data.append("resFunctionDis", formData.functiondis);
    data.append("dementiaYn", formData.dementiaYn);
    data.append("resImages", image);

    const response = await axios.post(
      "http://localhost:8080/api/resident/create",
      data,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      }
    );
    console.log(response);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl">
      <form onSubmit={onSubmit}>
        {/* 이미지 업로드 섹션 */}
        <div className="mb-6">
          <label
            htmlFor="image-upload"
            className="block text-xl font-semibold text-gray-700 mb-2"
          >
            이미지 업로드
          </label>
          <input
            id="image-upload"
            type="file"
            accept=".jpg, .png"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 hover:file:bg-gray-100"
          />
          {image && (
            <img
              src={image}
              alt="preview"
              className="mt-4 rounded-md shadow-lg max-w-xs mx-auto"
            />
          )}
        </div>

        {/* 폼 항목들을 3개씩 나열하는 부분 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 입소자 성명 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              입소자 성명
            </label>
            <input
              required
              placeholder="이름"
              type="text"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 성별 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              성별
            </label>
            <input
              required
              placeholder="성별"
              type="text"
              name="gender"
              onChange={handleInputChange}
              value={formData.gender}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 생년월일 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              생년월일
            </label>
            <input
              required
              placeholder="생년월일"
              type="date"
              name="birth"
              onChange={handleInputChange}
              value={formData.birth}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 전화번호 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              전화번호
            </label>
            <input
              required
              placeholder="전화번호"
              type="tel"
              name="phone"
              onChange={handleInputChange}
              value={formData.phone}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 등급 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              등급
            </label>
            <input
              required
              placeholder="등급"
              type="text"
              name="grade"
              onChange={handleInputChange}
              value={formData.grade}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 주요질환 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              주요질환
            </label>
            <input
              required
              placeholder="주요질환"
              type="text"
              name="disease"
              onChange={handleInputChange}
              value={formData.disease}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 생활실 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              생활실
            </label>
            <input
              required
              placeholder="생활실"
              type="text"
              name="location"
              onChange={handleInputChange}
              value={formData.location}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 입소일 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              입소일
            </label>
            <input
              required
              type="date"
              name="enterdate"
              onChange={handleInputChange}
              value={formData.enterdate}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 퇴소일 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              퇴소일
            </label>
            <input
              type="date"
              name="exitdate"
              onChange={handleInputChange}
              value={formData.exitdate}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            치매 유무
          </label>
          <input
            type="checkbox"
            name="dementiaYn"
            className="border border-gray-300 p-3 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 주소 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              주소
            </label>
            <input
              required
              placeholder="주소"
              type="text"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 최종학력 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              최종학력
            </label>
            <input
              required
              placeholder="최종학력"
              type="text"
              name="schoolgrade"
              onChange={handleInputChange}
              value={formData.schoolgrade}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 입소자 코드 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              요양시스템 입소자 코드
            </label>
            <input
              required
              placeholder="입소자 코드"
              type="text"
              name="systemcode"
              onChange={handleInputChange}
              value={formData.systemcode}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 장기요양인정번호 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              장기요양인정번호
            </label>
            <input
              required
              placeholder="장기요양인정번호"
              type="text"
              name="longtermNo"
              onChange={handleInputChange}
              value={formData.longtermNo}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 케어그룹 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              케어그룹
            </label>
            <input
              required
              placeholder="케어그룹"
              type="text"
              name="caregroup"
              onChange={handleInputChange}
              value={formData.caregroup}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 식사종류 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              식사종류
            </label>
            <input
              required
              placeholder="식사종류"
              type="text"
              name="foodtype"
              onChange={handleInputChange}
              value={formData.foodtype}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* 기능장애 */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              기능장애
            </label>
            <input
              required
              placeholder="기능장애"
              type="text"
              name="functiondis"
              onChange={handleInputChange}
              value={formData.functiondis}
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 제출 버튼과 취소 버튼을 양옆으로 배치하면서 가운데 정렬 */}
        <div className="mb-6 flex justify-center space-x-4">
          {" "}
          {/* flex로 가운데 정렬하고, 버튼 사이에 여백을 추가 */}
          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full sm:w-48 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
          >
            제출
          </button>
          {/* 취소 버튼을 Link로 변경 */}
          <Link to="/resident">
            <button
              type="button"
              className="w-full sm:w-48 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300 text-lg font-semibold"
            >
              취소
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResidentForm;
