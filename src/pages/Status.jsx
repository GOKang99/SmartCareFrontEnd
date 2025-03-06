import React, { useEffect, useState } from "react";

const Status = () => {
  const [patientData, setPatientData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [cistData, setCistData] = useState(null);
  const [bodyCompositionData, setBodyCompositionData] = useState(null);

  // useEffect(() => {
  //   // 병렬 요청
  //   Promise.all([
  //     axios.get("/api/patient"), // 환자 정보
  //     axios.get("/api/meal"), // 식사 정보
  //     axios.get("/api/cist"), // cist 검사 정보
  //     axios.get("/api/body-composition"), // 체성분 정보
  //   ])
  //     .then(([patientRes, mealRes, cistRes, bodyCompRes]) => {
  //       setPatientData(patientRes.data);
  //       setMealData(mealRes.data);
  //       setCistData(cistRes.data);
  //       setBodyCompositionData(bodyCompRes.data);
  //     })
  //     .catch((error) => {
  //       console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
  //     });
  // }, []);

  return (
    <div className="status_section w-[60%] bg-red-100 mx-auto mt-10 rounded-3xl p-6 mb-10">
      <h2 className="text-center font-bold text-xl">생활현황</h2>
      <div className="status_content mt-6">
        {/* 주민 정보 */}
        <div className="resident_wrap bg-blue-100 p-4 rounded-lg mb-4 flex items-center">
          <div className="bg-white resimage_wrap rounded-full w-20 h-20 flex items-center justify-center mr-4">
            <span className="text-gray-500">사진</span>
          </div>
          <div className="resinfo_wrap">
            <div>
              <strong>이름:</strong> 홍길동
            </div>
            <div>
              <strong>성별:</strong> 남성
            </div>
            <div>
              <strong>병동호실:</strong> 301호
            </div>
          </div>
        </div>

        {/* 상세내역 안내 */}
        <div className="text-sm text-gray-600 mb-4">
          각 항목 클릭 시 상세내역을 보실 수 있습니다.
        </div>

        {/* 식사 현황 */}
        <div className="meal_wrap bg-green-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold">오늘 식사 현황</h3>
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="border px-2 py-1">아침식사</th>
                <th className="border px-2 py-1">점심식사</th>
                <th className="border px-2 py-1">저녁식사</th>
                <th className="border px-2 py-1">오전간식</th>
                <th className="border px-2 py-1">오후간식</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">1/2미만</td>
                <td className="border px-2 py-1">X</td>
                <td className="border px-2 py-1">공백</td>
                <td className="border px-2 py-1">1/2이상</td>
                <td className="border px-2 py-1">공백</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 인지훈련 검사 결과 */}
        <div className="cist_wrap bg-purple-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold">인지훈련 검사 결과</h3>
          <table className="min-w-full mt-2">
            <thead>
              <tr>
                <th className="border px-2 py-1">총점</th>
                <th className="border px-2 py-1">판정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">25/30점</td>
                <td className="border px-2 py-1">정상</td>
              </tr>
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2">(2025.03.05)</div>
        </div>

        {/* 체성분 (카드 형태로 4개씩 나열) */}
        <div className="composition_wrap bg-yellow-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">체성분</h3>
          <div className="composition_title text-sm mb-4">
            <div>최근 측정일: 2025.03.05(목)</div>
          </div>

          {/* 카드 형태로 4개씩 나열 */}
          <div className="flex flex-wrap gap-6">
            {/* 골격근량 카드 */}
            <div className="smm_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">골격근량</div>
              <div className="text-center">28</div>
              <div className="text-center">kg</div>
            </div>
            {/* 체중 카드 */}
            <div className="weight_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">체중</div>
              <div className="text-center">70</div>
              <div className="text-center">kg</div>
            </div>
            {/* 신장 카드 */}
            <div className="height_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">신장</div>
              <div className="text-center">175</div>
              <div className="text-center">cm</div>
            </div>
            {/* 체지방량 카드 */}
            <div className="bfm_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">체지방량</div>
              <div className="text-center">30</div>
              <div className="text-center">kg</div>
            </div>

            {/* 체지방률 카드 */}
            <div className="pbf_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">체지방률</div>
              <div className="text-center">28%</div>
              <div className="text-center">%</div>
            </div>
            {/* 내장지방레벨 카드 */}
            <div className="fatlvl_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">내장지방레벨</div>
              <div className="text-center">2</div>
              <div className="text-center">Lv</div>
            </div>
            {/* BMI지수 카드 */}
            <div className="bmi_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
              <div className="text-center font-bold">BMI지수</div>
              <div className="text-center">19.2</div>
              <div className="text-center">(정상)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
