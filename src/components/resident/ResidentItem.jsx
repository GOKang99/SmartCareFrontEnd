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
    <div className="bg-white p-6 rounded-lg shadow-md border border-black max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {resident.resName} 님 상세정보
        </h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* 입소자 이미지 - 고정 크기 */}
          <div className="md:w-1/4 flex justify-center md:justify-start">
            <div className="w-40 h-40 overflow-hidden rounded-lg shadow-md border border-black">
              <img
                src={`http://localhost:8080/images/${resident.resImageAddress}`}
                alt={`${resident.resName}의 사진`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 기본 정보 - 고정 높이의 그리드 */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* 각 정보 칸의 높이를 고정 */}
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">성별</span>
                <p className="font-medium text-black">{resident.resGender}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">생년월일</span>
                <p className="font-medium text-black">{resident.resBirth}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">등급</span>
                <p className="font-medium text-black">{resident.resGrade}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">생활실</span>
                <p className="font-medium text-black">{resident.resLocation}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">케어그룹</span>
                <p className="font-medium text-black">
                  {resident.resCareGroup}
                </p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg h-20 flex flex-col justify-between border border-gray-300">
                <span className="text-sm text-black font-medium">입소일</span>
                <p className="font-medium text-black">
                  {resident.resEnterDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="mb-4 border-b border-black">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("personal")}
                className={`inline-block py-2 px-4 ${
                  activeTab === "personal"
                    ? "border-b-2 border-black text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                개인정보
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("health")}
                className={`inline-block py-2 px-4 ${
                  activeTab === "health"
                    ? "border-b-2 border-black text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                건강정보
              </button>
            </li>
            <li className="mr-2">
              <button
                onClick={() => setActiveTab("guardian")}
                className={`inline-block py-2 px-4 ${
                  activeTab === "guardian"
                    ? "border-b-2 border-black text-black font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                보호자정보
              </button>
            </li>
          </ul>
        </div>

        {/* 탭 컨텐츠 - 고정 높이 */}
        <div className="py-4">
          {/* 고정 높이 컨테이너, 필요시 내부 스크롤 */}
          <div className="min-h-[400px] max-h-[400px] overflow-y-auto p-2">
            {/* 개인정보 탭 */}
            {activeTab === "personal" && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* 각 정보 카드의 크기 고정 */}
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">전화번호</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resPhone}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">주소</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resAddress}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">최종학력</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resSchoolGrade}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">배우자 여부</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.maritalStatus}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">종교</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.religion}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">
                    한글해독 가능
                  </p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.koreanReadableYn}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">입소자 코드</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.systemResCode}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">
                    장기요양인정번호
                  </p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resLongTermCareNo}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">재입소 여부</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resAdmissionYn}
                  </p>
                </div>
                <div className="p-3 border border-black rounded-lg h-24 flex flex-col justify-between shadow-sm">
                  <p className="text-sm text-black font-medium">퇴소일</p>
                  <p className="overflow-hidden text-ellipsis text-black">
                    {resident.resExitDate ? resident.resExitDate : "미정"}
                  </p>
                </div>
              </div>
            )}

            {/* 건강정보 탭 */}
            {activeTab === "health" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* 건강 체크 항목들 - 고정 높이 카드 */}
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        resident.bedsoreYn ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <p className="font-medium text-black">욕창위험</p>
                  </div>
                  <p className="text-sm text-black mt-1">
                    {resident.bedsoreYn ? "있음" : "없음"}
                  </p>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        resident.fallYn ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <p className="font-medium text-black">낙상위험</p>
                  </div>
                  <p className="text-sm text-black mt-1">
                    {resident.fallYn ? "있음" : "없음"}
                  </p>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        resident.dementiaYn ? "bg-red-500" : "bg-green-500"
                      }`}
                    ></div>
                    <p className="font-medium text-black">치매유무</p>
                  </div>
                  <p className="text-sm text-black mt-1">
                    {resident.dementiaYn ? "있음" : "없음"}
                  </p>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm">
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        resident.postureYn ? "bg-yellow-500" : "bg-green-500"
                      }`}
                    ></div>
                    <p className="font-medium text-black">자세변경</p>
                  </div>
                  <p className="text-sm text-black mt-1">
                    {resident.postureYn ? "필요" : "필요없음"}
                  </p>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm md:col-span-3">
                  <p className="font-medium text-black">주요질환</p>
                  <div className="h-16 overflow-y-auto">
                    <p className="text-sm text-black mt-1">
                      {resident.resDisease}
                    </p>
                  </div>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm md:col-span-2">
                  <p className="font-medium text-black">기능장애</p>
                  <div className="h-16 overflow-y-auto">
                    <p className="text-sm text-black mt-1">
                      {resident.resFunctionDis}
                    </p>
                  </div>
                </div>
                <div className="p-4 border border-black rounded-lg h-32 flex flex-col justify-between shadow-sm">
                  <p className="font-medium text-black">식사종류</p>
                  <p className="text-sm text-black mt-1">
                    {resident.resFoodType}
                  </p>
                </div>
              </div>
            )}

            {/* 보호자정보 탭 */}
            {activeTab === "guardian" && (
              <div>
                {Array.isArray(guardInfo) && guardInfo.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guardInfo.map((guardItem, i) => (
                      <div
                        className="p-4 border border-black rounded-lg shadow-sm"
                        key={i}
                      >
                        <h4 className="font-medium mb-3 text-black border-b pb-2 border-gray-300">
                          보호자 {i + 1}
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-sm text-black font-medium">
                              이름
                            </p>
                            <p className="text-black">{guardItem.realname}</p>
                          </div>
                          <div className="p-2 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-sm text-black font-medium">
                              관계
                            </p>
                            <p className="text-black">{guardItem.relation}</p>
                          </div>
                          <div className="p-2 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-sm text-black font-medium">
                              주민번호
                            </p>
                            <p className="text-black">{guardItem.ssn}</p>
                          </div>
                          <div className="p-2 bg-gray-100 rounded-lg border border-gray-300">
                            <p className="text-sm text-black font-medium">
                              전화번호
                            </p>
                            <p className="text-black">{guardItem.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-black bg-gray-100 rounded-lg border border-black">
                    등록된 보호자 정보가 없습니다.
                  </div>
                )}

                {/* 보호자 등록 버튼 */}
                <div className="flex justify-end mt-5">
                  <button
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 flex items-center shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
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
                </div>

                {/* 폼 영역 - 고정 높이 내에서 표시되도록 */}
                {isFormVisible && (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 p-4 border border-black rounded-lg shadow-sm bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder:text-gray-400"
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
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder:text-gray-400"
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
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder:text-gray-400"
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
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-black placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 shadow-sm font-medium"
                      >
                        등록
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentItem;
