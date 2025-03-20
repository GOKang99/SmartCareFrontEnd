import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import imageApi from "../../services/imageApi";
import { useMyContext } from "../../ContextApi";

const ResidentItem = () => {
  const { id } = useParams(); // URL에서 입소자 ID를 가져옵니다
  const [activeTab, setActiveTab] = useState("personal"); // 탭 상태 추가
  const [guardData, setGuardData] = useState({
    realname: "", // 보호자 성명
    ssn: "", // 주민번호
    relation: "", // 관계
    phone: "", // 전화번호
    resId: id, // 입소자 ID
  });
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼의 가시성 관리
  const [guardInfo, setGuardInfo] = useState(null); // 저장된 보호자 정보 상태
  const { isAdmin } = useMyContext();

  // 컴포넌트가 처음 렌더링될 때, id가 변경될 때마다 백엔드에서 보호자 정보 불러오기
  useEffect(() => {
    const fetchGuardInfo = async () => {
      try {
        const response = await imageApi.get(
          `http://localhost:8080/api/resident/${id}/guard`
        );
        setGuardInfo(response.data); // 응답 데이터를 상태로 업데이트
      } catch (error) {
        console.error("보호자 정보 조회 오류:", error);
      }
    };

    fetchGuardInfo();
  }, [id]); // id가 변경될 때마다 실행

  // 입력 값이 변경될 때마다 guardData 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuardData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  // 폼 제출 시 데이터 확인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // guardData 객체를 그대로 전송
      const response = await imageApi.put(`/resident/guard`, guardData);
      setGuardInfo(response.data); // 응답 데이터 화면에 출력
      setIsFormVisible(false); // 폼 숨기기
      alert("보호자 등록 성공!");
    } catch (error) {
      console.error("서버 오류:", error);
      if (error.response && error.response.status === 401) {
        alert("등록 실패");
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
    resAdmissionYn: "",
    koreanReadableYn: "",
    religion: "",
    maritalStatus: "",
    resBirth: "",
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
    <div className="bg-white border border-gray-500 w-10/16 mx-auto">
      <div>
        {/* 상단 헤더 부분 */}
        <div className="border-b border-gray-500 bg-gray-500 px-4 py-2 flex justify-between items-center">
          <h2 className="font-semibold text-white text-lg">입소자 상세정보</h2>
        </div>

        <div className="p-4">
          {/* 입소자 기본 정보 테이블 */}
          <div className="flex flex-col md:flex-row mb-4">
            {/* 기본 정보 테이블 */}
            <div className="md:w-3/4">
              <div className="border border-gray-300 bg-gray-200 px-3 py-1 font-medium text-gray-700">
                <strong>기본정보</strong>
              </div>
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                      성명
                    </td>
                    <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                      {resident.resName}
                    </td>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                      생년월일
                    </td>
                    <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                      {resident.resBirth}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                      성별
                    </td>
                    <td className="border border-gray-300 px-3 py-1 text-gray-600">
                      {resident.resGender}
                    </td>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                      전화번호
                    </td>
                    <td className="border border-gray-300 px-3 py-1 text-gray-600">
                      {resident.resPhone}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                      장기요양인증번호
                    </td>
                    <td className="border border-gray-300 px-3 py-1 text-gray-600">
                      {resident.resLongTermCareNo}
                    </td>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                      등록번호
                    </td>
                    <td className="border border-gray-300 px-3 py-1 text-gray-600">
                      {resident.systemResCode}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                      주소
                    </td>
                    <td
                      className="border border-gray-300 px-3 py-1 text-gray-600"
                      colSpan="3"
                    >
                      {resident.resAddress}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 이미지 영역 - 위치 유지 */}
            <div className="md:w-1/5 flex justify-center md:justify-end mb-4 md:mb-0 md:pl-3 mt-3 md:mt-3">
              <img
                src={`http://localhost:8080/images/${resident.resImageAddress}`}
                alt={`${resident.resName}의 사진`}
                className="w-36 h-36 object-cover border border-gray-300"
              />
            </div>
          </div>

          {/* 입소정보 */}
          <div className="mt-4">
            <div className="border border-gray-300 bg-gray-200 px-3 py-1 font-medium text-gray-700">
              <strong>입소정보</strong>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                    등급
                  </td>
                  <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                    {resident.resGrade}
                  </td>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                    케어그룹
                  </td>
                  <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                    {resident.resCareGroup}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    생활실
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.resLocation}
                  </td>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    재입소 여부
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.resAdmissionYn}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    입소일
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.resEnterDate}
                  </td>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    퇴소일
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.resExitDate || "미정"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 개인정보 */}
          <div className="mt-4">
            <div className="border border-gray-300 bg-gray-200 px-3 py-1 font-medium text-gray-700">
              <strong>개인정보</strong>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                    최종학력
                  </td>
                  <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                    {resident.resSchoolGrade}
                  </td>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                    한글해독 가능
                  </td>
                  <td className="border border-gray-300 px-3 py-1 w-1/3 text-gray-600">
                    {resident.koreanReadableYn}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    종교
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.religion}
                  </td>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    배우자 여부
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-gray-600">
                    {resident.maritalStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 건강상태 */}
          <div className="mt-3">
            <div className="border border-gray-300 bg-gray-200 px-3 py-1 font-medium text-gray-700">
              <strong>건강상태</strong>
            </div>
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 w-1/6 font-medium text-black">
                    건강체크
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-1 text-gray-600"
                    colSpan="3"
                  >
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-1 ${
                            resident.dementiaYn ? "bg-red-500" : "bg-green-500"
                          }`}
                        ></div>
                        <span className="mr-1 font-medium">치매유무:</span>
                        <span>{resident.dementiaYn ? "있음" : "없음"}</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${
                            resident.fallYn ? "bg-red-500" : "bg-green-500"
                          }`}
                        ></div>
                        <span className="mr-1 font-medium">낙상위험:</span>
                        <span>{resident.fallYn ? "있음" : "없음"}</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${
                            resident.bedsoreYn ? "bg-red-500" : "bg-green-500"
                          }`}
                        ></div>
                        <span className="mr-1 font-medium">욕창위험:</span>
                        <span>{resident.bedsoreYn ? "있음" : "없음"}</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-1 ${
                            resident.postureYn
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <span className="mr-1 font-medium">자세변경:</span>
                        <span>{resident.postureYn ? "필요" : "필요없음"}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    주요질환
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-1 text-gray-600"
                    colSpan="3"
                  >
                    <p>{resident.resDisease}</p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    기능장애
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-1 text-gray-600"
                    colSpan="3"
                  >
                    <p>{resident.resFunctionDis}</p>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 bg-gray-100 px-3 py-1 font-medium text-black">
                    식사종류
                  </td>
                  <td
                    className="border border-gray-300 px-3 py-1 text-gray-600"
                    colSpan="3"
                  >
                    <p>{resident.resFoodType}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 보호자 정보 */}
          <div className="mt-4">
            <div className="border border-gray-300 bg-gray-200 px-3 py-1 font-medium flex justify-between items-center">
              <span className="text-gray-700">
                <strong>보호자 정보</strong>
              </span>
              {isAdmin && (
                <button
                  onClick={() => setIsFormVisible(!isFormVisible)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-all duration-200 flex items-center shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {isFormVisible ? "취소" : "보호자 등록"}
                </button>
              )}
            </div>

            {/* 보호자 테이블 */}
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 bg-gray-100 px-2 py-1 text-left font-medium w-8 text-black">
                    #
                  </th>
                  <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-medium text-black">
                    성명
                  </th>
                  <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-medium text-black">
                    관계
                  </th>
                  <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-medium text-black">
                    주민번호
                  </th>
                  <th className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-medium text-black">
                    전화번호
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(guardInfo) && guardInfo.length > 0 ? (
                  guardInfo.map((guardItem, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-1 text-center text-black">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-black">
                        {guardItem.realname}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-black">
                        {guardItem.relation}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-black">
                        {guardItem.ssn}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-black">
                        {guardItem.phone}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="border border-gray-300 px-2 py-3 text-center text-gray-600"
                    >
                      등록된 보호자 정보가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 보호자 등록 폼 */}
            {isFormVisible && (
              <div className="p-3 border border-gray-300 border-t-0 bg-gray-50">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        보호자 성명
                      </label>
                      <input
                        type="text"
                        id="realname"
                        name="realname"
                        value={guardData.realname}
                        onChange={handleInputChange}
                        placeholder="이름"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        관계
                      </label>
                      <input
                        type="text"
                        id="relation"
                        name="relation"
                        value={guardData.relation}
                        onChange={handleInputChange}
                        placeholder="관계 입력"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        주민번호
                      </label>
                      <input
                        type="text"
                        id="ssn"
                        name="ssn"
                        value={guardData.ssn}
                        onChange={handleInputChange}
                        placeholder="주민번호 입력"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1">
                        전화번호
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={guardData.phone}
                        onChange={handleInputChange}
                        placeholder="전화번호 입력"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mt-3">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm font-medium text-sm"
                    >
                      등록
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentItem;
