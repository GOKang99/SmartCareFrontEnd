import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import imageApi from "../../services/imageApi";

const ResidentEdit = ({ giverId, handleEditResident }) => {
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
    resAdmissionYn: "",
    koreanReadableYn: "",
    religion: "",
    maritalStatus: "",
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
        resAdmissionYn: resident.resAdmissionYn,
        koreanReadableYn: resident.koreanReadableYn,
        religion: resident.religion,
        maritalStatus: resident.maritalStatus,
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
    data.append("resAdmissionYn", formData.resAdmissionYn);
    data.append("koreanReadableYn", formData.koreanReadableYn);
    data.append("religion", formData.religion);
    data.append("maritalStatus", formData.maritalStatus);

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
      handleEditResident(response.data);
      alert("수정이 완료되었습니다.");
      navigate("/resident/list");
    } catch (error) {
      console.error("Error:", error);
      alert("서버와의 연결에 실패했습니다.");
    }
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="space-y-4 bg-white p-5 rounded-lg shadow-md border border-gray-600 w-full max-w-7xl my-4"
      >
        <h1 className="text-2xl font-bold text-black mb-4 flex items-center">
          <span className="bg-gray-600 w-2 h-8 rounded mr-3"></span>
          입소자 정보 등록
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* 왼쪽 열: 이미지 업로드 - 더 큰 사진 크기 */}
          <div className="bg-white p-4 rounded-lg border border-gray-600 shadow-sm">
            <label
              htmlFor="image-upload"
              className="font-semibold text-lg text-black block mb-3"
            >
              입소자 사진
            </label>

            <div className="flex flex-col items-center">
              {/* 이미지 미리보기 - 더 큰 크기로 변경 */}
              {image ? (
                <div className="w-48 h-48 rounded-lg shadow-sm overflow-hidden border-2 border-white mb-4">
                  <img
                    src={image}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-white rounded-lg border-2 border-dashed border-gray-600 mb-4">
                  <span className="text-black flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 w-14 mb-2 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    사진 없음
                  </span>
                </div>
              )}

              <div className="flex flex-col w-full mt-2">
                <input
                  id="image-upload"
                  type="file"
                  accept=".jpg, .png"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  type="button"
                  className="bg-white text-gray-600 border-2 border-gray-600 rounded-lg py-2.5 px-3 hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-all flex items-center justify-center w-full shadow-sm font-medium"
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                    />
                  </svg>
                  사진 선택
                </button>
                <p className="text-xs text-gray-600 mt-1.5 text-center">
                  JPG 또는 PNG (최대 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* 중앙+오른쪽 열: 탭 기반 정보 입력 */}
          <div className="lg:col-span-3 space-y-4">
            {/* 기본 정보 섹션 - red-600 테마 */}
            <div className="bg-white rounded-lg border border-red-600 overflow-hidden shadow-sm">
              <div className="text-black px-4 py-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-lg font-semibold">기본 정보</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-black block text-sm">
                      입소자 성명
                    </label>
                    <input
                      required
                      placeholder="이름을 입력하세요"
                      type="text"
                      name="name"
                      onChange={handleInputChange}
                      value={formData.name}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm text-black placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-black block text-sm">
                      생년월일
                    </label>
                    <input
                      required
                      type="date"
                      name="birth"
                      onChange={handleInputChange}
                      value={formData.birth}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm text-black"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="font-medium text-black block text-sm">
                      성별
                    </label>
                    <div className="flex space-x-8">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="남자"
                          onChange={handleInputChange}
                          checked={formData.gender === "남자"}
                          className="h-4 w-4 text-red-600 focus:ring-2 focus:ring-red-600"
                        />
                        <label
                          htmlFor="male"
                          className="ml-1 text-sm text-black font-medium"
                        >
                          남자
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="여자"
                          onChange={handleInputChange}
                          checked={formData.gender === "여자"}
                          className="h-4 w-4 text-red-600 focus:ring-2 focus:ring-red-600"
                        />
                        <label
                          htmlFor="female"
                          className="ml-1 text-sm text-black font-medium"
                        >
                          여자
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-black block text-sm">
                      전화번호
                    </label>
                    <input
                      required
                      placeholder="010-0000-0000"
                      type="text"
                      name="phone"
                      onChange={handleInputChange}
                      value={formData.phone}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm text-black placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="font-medium text-black block text-sm">
                      주소
                    </label>
                    <input
                      required
                      placeholder="주소를 입력하세요"
                      type="text"
                      name="address"
                      onChange={handleInputChange}
                      value={formData.address}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm text-black placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="font-medium text-black block text-sm">
                      장기요양인정번호
                    </label>
                    <input
                      required
                      placeholder="인정번호를 입력하세요"
                      type="text"
                      name="longtermNo"
                      onChange={handleInputChange}
                      value={formData.longtermNo}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent shadow-sm text-black placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 건강 상태 & 입소 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* 입소 정보 */}
                <div className="bg-white rounded-lg border border-green-600 overflow-hidden shadow-sm">
                  <div className="text-black px-3 py-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <h2 className="text-base font-semibold">입소 정보</h2>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          등급
                        </label>
                        <input
                          required
                          placeholder="등급"
                          type="text"
                          name="grade"
                          onChange={handleInputChange}
                          value={formData.grade}
                          className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm text-sm text-black placeholder:text-gray-300 selection:bg-green-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          케어그룹
                        </label>
                        <input
                          required
                          placeholder="케어그룹"
                          type="text"
                          name="caregroup"
                          onChange={handleInputChange}
                          value={formData.caregroup}
                          className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm text-sm text-black placeholder:text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          생활실
                        </label>
                        <input
                          required
                          placeholder="생활실"
                          type="text"
                          name="location"
                          onChange={handleInputChange}
                          value={formData.location}
                          className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm text-sm text-black placeholder:text-gray-300"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          재입소 여부
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="yes"
                              name="resAdmissionYn"
                              value="예"
                              onChange={handleInputChange}
                              checked={formData.resAdmissionYn === "예"}
                              className="w-3 h-3 text-black"
                            />
                            <label
                              htmlFor="yes"
                              className="ml-1 text-xs text-black font-medium"
                            >
                              예
                            </label>
                          </div>

                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="no"
                              name="resAdmissionYn"
                              value="아니요"
                              onChange={handleInputChange}
                              checked={formData.resAdmissionYn === "아니요"}
                              className="w-3 h-3 text-green-600"
                            />
                            <label
                              htmlFor="no"
                              className="ml-1 text-xs text-black font-medium"
                            >
                              아니요
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          입소일
                        </label>
                        <input
                          required
                          type="date"
                          name="enterdate"
                          onChange={handleInputChange}
                          value={formData.enterdate}
                          className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm text-sm text-black selection:bg-green-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          퇴소일
                        </label>
                        <input
                          type="date"
                          name="exitdate"
                          onChange={handleInputChange}
                          value={formData.exitdate}
                          className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent shadow-sm text-sm text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 개인 정보 섹션 */}
                <div className="bg-white rounded-lg border border-green-600 overflow-hidden shadow-sm">
                  <div className="text-black px-3 py-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="text-base font-semibold">개인 정보</h2>
                  </div>
                  <div className="p-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* 최종학력 */}
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          최종학력
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: "elementary", value: "초졸" },
                            { id: "middle", value: "중졸" },
                            { id: "high", value: "고졸" },
                            { id: "university", value: "대졸" },
                            { id: "unknown", value: "미상" },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center bg-gray-100 p-1 rounded-md border border-gray-100 transition-all hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                id={item.id}
                                name="schoolgrade"
                                value={item.value}
                                onChange={handleInputChange}
                                checked={formData.schoolgrade === item.value}
                                className="w-3 h-3 text-green-600"
                              />
                              <label
                                htmlFor={item.id}
                                className="ml-1 text-xs text-black font-medium"
                              >
                                {item.value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 한글해독 가능 */}
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          한글해독 가능
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {[
                            { id: "illiterate", value: "문맹" },
                            { id: "numbersOnly", value: "숫자만" },
                            { id: "readable", value: "해독가능" },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center bg-gray-100 p-1 rounded-md border border-gray-100 transition-all hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                id={item.id}
                                name="koreanReadableYn"
                                value={item.value}
                                onChange={handleInputChange}
                                checked={
                                  formData.koreanReadableYn === item.value
                                }
                                className="w-3 h-3"
                              />
                              <label
                                htmlFor={item.id}
                                className="ml-1 text-xs text-black font-medium whitespace-nowrap"
                              >
                                {item.value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 종교 */}
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          종교
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: "buddhism", value: "불교" },
                            { id: "christianity", value: "기독교" },
                            { id: "catholic", value: "가톨릭" },
                            { id: "other", value: "기타" },
                            { id: "none", value: "무교" },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center bg-gray-100 p-1 rounded-md border border-gray-100 transition-all hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                id={item.id}
                                name="religion"
                                value={item.value}
                                onChange={handleInputChange}
                                checked={formData.religion === item.value}
                                className="w-3 h-3"
                              />
                              <label
                                htmlFor={item.id}
                                className="ml-1 text-xs text-black font-medium"
                              >
                                {item.value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 배우자 여부 */}
                      <div className="space-y-1">
                        <label className="font-medium text-black block text-xs">
                          배우자 여부
                        </label>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: "married", value: "기혼" },
                            { id: "single", value: "미혼" },
                            { id: "widowed", value: "사망" },
                          ].map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center bg-gray-100 p-1 rounded-md border border-gray-100 transition-all hover:bg-gray-100"
                            >
                              <input
                                type="radio"
                                id={item.id}
                                name="maritalStatus"
                                value={item.value}
                                onChange={handleInputChange}
                                checked={formData.maritalStatus === item.value}
                                className="w-3 h-3 text-green-600"
                              />
                              <label
                                htmlFor={item.id}
                                className="ml-1 text-xs text-black font-medium"
                              >
                                {item.value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 건강 상태 섹션 */}
              <div className="bg-white rounded-lg border border-blue-800 overflow-hidden shadow-sm">
                <div className="text-black px-3 py-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2 className="text-base font-semibold">건강 상태</h2>
                </div>
                <div className="p-3 space-y-3">
                  {/* 건강 체크 항목 */}
                  <div className="space-y-1">
                    <label className="font-medium text-black block text-xs">
                      건강 체크
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center bg-gray-100 p-1.5 rounded-md border border-gray-100 transition-all hover:bg-gray-100">
                        <input
                          type="checkbox"
                          name="dementiaYn"
                          checked={formData.dementiaYn}
                          onChange={handleInputChange}
                          className="h-3 w-3 text-blue-700 rounded"
                        />
                        <label className="ml-1 text-xs text-black font-medium">
                          치매유무
                        </label>
                      </div>

                      <div className="flex items-center bg-gray-100 p-1.5 rounded-md border border-gray-100 transition-all hover:bg-gray-100">
                        <input
                          type="checkbox"
                          name="fallYn"
                          checked={formData.fallYn}
                          onChange={handleInputChange}
                          className="h-3 w-3 text-blue-800 rounded"
                        />
                        <label className="ml-1 text-xs text-black font-medium">
                          낙상위험
                        </label>
                      </div>

                      <div className="flex items-center bg-gray-100 p-1.5 rounded-md border border-gray-100 transition-all hover:bg-gray-100">
                        <input
                          type="checkbox"
                          name="bedsoreYn"
                          checked={formData.bedsoreYn}
                          onChange={handleInputChange}
                          className="h-3 w-3 text-blue-800 rounded"
                        />
                        <label className="ml-1 text-xs text-black font-medium">
                          욕창위험
                        </label>
                      </div>

                      <div className="flex items-center bg-gray-100 p-1.5 rounded-md border border-gray-100 transition-all hover:bg-gray-100">
                        <input
                          type="checkbox"
                          name="postureYn"
                          checked={formData.postureYn}
                          onChange={handleInputChange}
                          className="h-3 w-3 text-blue-800 rounded"
                        />
                        <label className="ml-1 text-xs text-black font-medium">
                          자세변경
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* 주요질환 & 기능장애 */}
                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-1">
                      <label className="font-medium text-black block text-xs">
                        주요질환
                      </label>
                      <input
                        required
                        placeholder="주요질환을 입력하세요"
                        type="text"
                        name="disease"
                        onChange={handleInputChange}
                        value={formData.disease}
                        className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent shadow-sm text-sm text-black placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-medium text-black block text-xs">
                        기능장애
                      </label>
                      <input
                        required
                        placeholder="기능장애를 입력하세요"
                        type="text"
                        name="functiondis"
                        onChange={handleInputChange}
                        value={formData.functiondis}
                        className="w-full border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent shadow-sm text-sm text-black placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* 식사종류 */}
                  <div className="space-y-1">
                    <label className="font-medium text-black block text-xs">
                      식사종류
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {["일반식", "연식", "죽식", "특수식"].map((type) => (
                        <div
                          key={type}
                          className="flex items-center bg-gray-100 p-1.5 rounded-md border border-gray-100 transition-all"
                        >
                          <input
                            type="radio"
                            id={type}
                            name="foodtype"
                            value={type}
                            onChange={handleInputChange}
                            checked={formData.foodtype === type}
                            className="w-3 h-3 text-blue-700"
                          />
                          <label
                            htmlFor={type}
                            className="ml-1 text-xs text-black font-medium"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex justify-end items-center space-x-4 pt-4 border-t border-gray-200 mt-4">
          <Link to="/resident">
            <button
              type="button"
              className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              취소
            </button>
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResidentEdit;
