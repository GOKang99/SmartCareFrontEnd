import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import imageApi from "../../services/imageApi";

const ResidentItem = () => {
  const { id } = useParams();
  console.log("아이디는", id);
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 보이기/숨기기
  const [guardData, setGuardData] = useState({
    ssn: "", // 주민번호
    relation: "", // 관계
    phone: "", // 전화번호
    resId: id,
  });
  const [submittedGuardData, setSubmittedGuardData] = useState(null);

  // 입력 값이 변경될 때마다 guardData 업데이트 및 콘솔 출력
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuardData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      return updatedData;
    });
  };

  // 폼 제출 시 데이터 확인
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // guardData 객체를 그대로 전송
      const response = await imageApi.put("/resident/guard", guardData);
      console.log("응답:", response.data);
      // 폼 제출 후 guardData 초기화
      setGuardData({
        ssn: "",
        relation: "",
        phone: "",
      });
      setSubmittedGuardData(response.data); // 응답 데이터 화면에 출력
      setIsFormVisible(false); // 폼 숨기기
    } catch (error) {
      console.error("서버 오류:", error);
      if (error.response && error.response.status === 401) {
        alert("등록실패");
      }
    }
  };

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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">입소자 정보</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 입소자 이미지 */}
          <div className="flex flex-col items-center justify-center p-7">
            <img
              src={`http://localhost:8080/images/${resident.resImageAddress}`}
              alt={`${resident.resName}의 사진`}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <p className="text-lg font-medium text-gray-800">
              {resident.resName}
            </p>
          </div>

          {/* 입소자 정보 */}
          <div className="col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
                <strong>욕창위험:</strong>{" "}
                {resident.bedsoreYn ? "있음" : "없음"}
              </div>
              <div>
                <strong>낙상위험:</strong> {resident.fallYn ? "있음" : "없음"}
              </div>
              <div>
                <strong>치매유무:</strong>{" "}
                {resident.dementiaYn ? "있음" : "없음"}
              </div>
              <div>
                <strong>자세변경:</strong>{" "}
                {resident.postureYn ? "있음" : "없음"}
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
          </div>
        </div>

        {submittedGuardData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">보호자 정보</h3>
            <ul>
              <li>
                <strong>주민번호:</strong> {submittedGuardData.ssn}
              </li>
              <li>
                <strong>관계:</strong> {submittedGuardData.relation}
              </li>
              <li>
                <strong>전화번호:</strong> {submittedGuardData.phone}
              </li>
            </ul>
          </div>
        )}

        {/* 추가 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          >
            {isFormVisible ? "취소" : "보호자 등록"}
          </button>
        </div>

        {/* 폼 영역 */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="ssn"
                className="block text-sm font-medium text-gray-800"
              >
                주민번호:
              </label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={guardData.ssn}
                onChange={handleInputChange}
                placeholder="주민번호 입력"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="relation"
                className="block text-sm font-medium text-gray-800"
              >
                관계:
              </label>
              <input
                type="text"
                id="relation"
                name="relation"
                value={guardData.relation}
                onChange={handleInputChange}
                placeholder="관계 입력"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-800"
              >
                전화번호:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={guardData.phone}
                onChange={handleInputChange}
                placeholder="전화번호 입력"
                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
              >
                등록
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResidentItem;
