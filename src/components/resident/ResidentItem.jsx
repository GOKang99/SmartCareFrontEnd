import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import imageApi from "../../services/imageApi";

const ResidentItem = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // 폼 보이기/숨기기
  const [guardData, setGuardData] = useState({
    ssn: "", // 주민번호
    relation: "", // 관계
    phone: "", // 전화번호
  });

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
      setIsFormVisible(false); // 폼 숨기기
    } catch (error) {
      console.error("서버 오류:", error);
      if (error.response && error.response.status === 401) {
        alert("등록실패");
      }
    }
  };

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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 첫 번째 열 */}
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
        </div>

        {/* 두 번째 열 */}
        <div>
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
        </div>

        {/* 세 번째 열 */}
        <div>
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
        </div>

        {/* 추가 열 */}
        <div>
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
      </div>

      <br />

      <div>
        <button onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "취소" : "추가"}
        </button>

        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="ssn">주민번호:</label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={guardData.ssn}
                onChange={handleInputChange}
                placeholder="주민번호 입력"
              />
            </div>

            <div>
              <label htmlFor="relation">관계:</label>
              <input
                type="text"
                id="relation"
                name="relation"
                value={guardData.relation}
                onChange={handleInputChange}
                placeholder="관계 입력"
              />
            </div>

            <div>
              <label htmlFor="phone">전화번호:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={guardData.phone}
                onChange={handleInputChange}
                placeholder="전화번호 입력"
              />
            </div>

            <button type="submit">등록</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResidentItem;
