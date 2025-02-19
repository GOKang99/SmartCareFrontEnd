import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ResidentForm = () => {
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
    systemcode: "",
    longtermNo: "",
    caregroup: "",
    foodtype: "",
    functiondis: "",
    dementiaYn: false,
    fallYn: false,
    bedsoreYn: false,
    postureYn: false,
  });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (
      selectedFile &&
      (selectedFile.type === "image/png" || selectedFile.type === "image/jpg")
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("giverId", "1");
    data.append("resName", formData.name);
    data.append("resGender", formData.gender);
    data.append("resBirth", formData.birth);
    data.append("resPhone", formData.phone); // 수정된 부분
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
    data.append("fallYn", formData.fallYn);
    data.append("bedsoreYn", formData.bedsoreYn);
    data.append("postureYn", formData.postureYn);

    if (image) {
      data.append("resImages", file); // 파일 객체를 바로 추가
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/resident/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* 이미지 업로드 섹션 */}
        <div>
          <label htmlFor="image-upload">이미지 업로드</label>
          <input
            id="image-upload"
            type="file"
            accept=".jpg, .png"
            onChange={handleImageChange}
          />
          {image && (
            <div>
              <img src={image} alt="preview" width="100" />
            </div>
          )}
        </div>

        {/* 폼 항목들을 3개씩 나열하는 부분 */}

        <div>
          <label>입소자 성명</label>
          <input
            required
            placeholder="이름"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>

        <div>
          <label>성별</label>
          <input
            required
            placeholder="성별"
            type="text"
            name="gender"
            onChange={handleInputChange}
            value={formData.gender}
          />
        </div>

        <div>
          <label>생년월일</label>
          <input
            required
            placeholder="생년월일"
            type="date"
            name="birth"
            onChange={handleInputChange}
            value={formData.birth}
          />
        </div>

        <div>
          <label>전화번호</label>
          <input
            required
            placeholder="전화번호"
            type="text"
            name="phone"
            onChange={handleInputChange}
            value={formData.phone}
          />
        </div>

        <div>
          <label>등급</label>
          <input
            required
            placeholder="등급"
            type="text"
            name="grade"
            onChange={handleInputChange}
            value={formData.grade}
          />
        </div>

        <div>
          <label>주요질환</label>
          <input
            required
            placeholder="주요질환"
            type="text"
            name="disease"
            onChange={handleInputChange}
            value={formData.disease}
          />
        </div>

        <div>
          <label>생활실</label>
          <input
            required
            placeholder="생활실"
            type="text"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
        </div>

        <div>
          <label>입소일</label>
          <input
            required
            type="date"
            name="enterdate"
            onChange={handleInputChange}
            value={formData.enterdate}
          />
        </div>

        <div>
          <label>퇴소일</label>
          <input
            type="date"
            name="exitdate"
            onChange={handleInputChange}
            value={formData.exitdate}
          />
        </div>

        <div>
          <div>
            <label>치매유무</label>
            <input
              type="checkbox"
              name="dementiaYn"
              checked={formData.dementiaYn}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>낙상위험</label>
            <input
              type="checkbox"
              name="fallYn"
              checked={formData.fallYn}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>욕창위험</label>
            <input
              type="checkbox"
              name="bedsoreYn"
              checked={formData.bedsoreYn}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>자세변경</label>
            <input
              type="checkbox"
              name="postureYn"
              checked={formData.postureYn}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label>주소</label>
          <input
            required
            placeholder="주소"
            type="text"
            name="address"
            onChange={handleInputChange}
            value={formData.address}
          />
        </div>

        <div>
          <label>최종학력</label>
          <input
            required
            placeholder="최종학력"
            type="text"
            name="schoolgrade"
            onChange={handleInputChange}
            value={formData.schoolgrade}
          />
        </div>

        <div>
          <label>요양시스템 입소자 코드</label>
          <input
            required
            placeholder="입소자 코드"
            type="text"
            name="systemcode"
            onChange={handleInputChange}
            value={formData.systemcode}
          />
        </div>

        <div>
          <label>장기요양인정번호</label>
          <input
            required
            placeholder="장기요양인정번호"
            type="text"
            name="longtermNo"
            onChange={handleInputChange}
            value={formData.longtermNo}
          />
        </div>

        <div>
          <label>케어그룹</label>
          <input
            required
            placeholder="케어그룹"
            type="text"
            name="caregroup"
            onChange={handleInputChange}
            value={formData.caregroup}
          />
        </div>

        <div>
          <label>식사종류</label>
          <input
            required
            placeholder="식사종류"
            type="text"
            name="foodtype"
            onChange={handleInputChange}
            value={formData.foodtype}
          />
        </div>

        <div>
          <label>기능장애</label>
          <input
            required
            placeholder="기능장애"
            type="text"
            name="functiondis"
            onChange={handleInputChange}
            value={formData.functiondis}
          />
        </div>

        {/* 제출 버튼과 취소 버튼을 양옆으로 배치하면서 가운데 정렬 */}
        <div>
          <button type="submit">제출</button>
          <Link to="/resident">
            <button type="button">취소</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ResidentForm;
