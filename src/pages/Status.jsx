import React, { useEffect, useState } from "react";
import api from "../services/api";
import Spinner from "../utils/Spinner";
import { useMyContext } from "../ContextApi";
import { Link } from "react-router-dom";

const Status = () => {
  const [residentData, setResidentData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [cistData, setCistData] = useState(null);
  const [compositionData, setCompositionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { guardId, giverId, userData } = useMyContext();

  useEffect(() => {
    setIsLoading(true);
    if (guardId && userData) {
      Promise.all([
        api.get(`/resident/status/${guardId}`), // 환자 정보
        api.get(`/meals/status/${guardId}`), // 식사 정보
        api.get(`/cist/status/${guardId}`), // cist 검사 정보
        api.get(`/composition/status/${guardId}`), // 체성분 정보
      ])
        .then(([residentRes, mealRes, cistRes, CompRes]) => {
          setResidentData(residentRes.data);
          setMealData(mealRes.data[0]);
          setCistData(cistRes.data[0]);
          setCompositionData(CompRes.data[0]);
          // setIsLoading(false);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
          setIsLoading(false);
        });
    }
    console.log("가드아디", guardId);
    console.log("기버아디", giverId);
    console.log("유데", userData);
  }, [guardId, userData]);

  useEffect(() => {
    // if(!isLoading)
    if (residentData && mealData && cistData && compositionData) {
      setIsLoading(false);
      console.log("시데", cistData);
      console.log("레데", residentData);
      console.log("밀데", mealData);
      console.log("체데", compositionData);
    }
  }, [cistData, residentData, mealData, compositionData]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="status_section w-[60%] bg-white mx-auto mt-10 rounded-3xl p-6 mb-10">
      <h2 className="text-center font-bold text-xl">생활현황</h2>
      <div className="status_content mt-6">
        {/* 입소자 정보 */}
        <Link to={`/resident/list/${userData.residentId}`}>
          <div className="resident_wrap w-[100%] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg justify-center">
              <img
                src={
                  residentData.resImageAddress
                    ? `http://localhost:8080/images/${residentData.resImageAddress}`
                    : "http://localhost:8080/userimage/anyuser.png"
                }
                alt="환자 사진"
                className="w-24 h-24 m-auto rounded-full shadow-lg"
              />
            </div>
            <div className="resinfo_wrap flex flex-col justify-between p-4 leading-normal">
              <div>
                <strong>이름:</strong> {residentData.resName}
              </div>
              <div>
                <strong>성별:</strong> {residentData.resGender}
              </div>
              <div>
                <strong>병동호실:</strong> {residentData.resLocation}
              </div>
            </div>
          </div>
        </Link>

        {/* 상세내역 안내 주석 */}
        <div className="text-sm text-gray-600 mb-4">
          각 항목 클릭 시 상세내역을 보실 수 있습니다.
        </div>

        <Link to={`/meal`}>
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
                  <td className="border px-2 py-1">{mealData.breQty}</td>
                  <td className="border px-2 py-1">{mealData.lunQty}</td>
                  <td className="border px-2 py-1">{mealData.dinQty}</td>
                  <td className="border px-2 py-1">1/{mealData.morSnackQty}</td>
                  <td className="border px-2 py-1">{mealData.aftSnackQty}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
        <Link to={`/cist/${userData.residentId}`}>
          {/* 인지훈련 검사 결과 */}
          <div className="cist_wrap bg-purple-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold">인지훈련 검사 결과</h3>
            <div className="text-sm text-gray-600 mt-2">
              최근 측정일: {cistData.cisDt.split(" ")[0]}
            </div>
            <table className="min-w-full mt-2">
              <thead>
                <tr>
                  <th className="border px-2 py-1">총점</th>
                  <th className="border px-2 py-1">판정</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">
                    {cistData.totalScore}/30점
                  </td>
                  <td className="border px-2 py-1">{cistData.cisGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
        <Link to={`/composition/my`}>
          {/* 체성분 (카드 형태로 4개씩 나열) */}
          <div className="composition_wrap bg-yellow-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">체성분</h3>
            <div className="composition_title text-sm mb-4 text-gray-600 mt-2">
              <div>최근 측정일: {compositionData.comDate}</div>
            </div>

            {/* 카드 형태로 4개씩 나열 */}
            <div className="flex flex-wrap gap-6">
              {/* 골격근량 카드 */}
              <div className="smm_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">골격근량</div>
                <div className="text-center">{compositionData.comSmm}</div>
                <div className="text-center">kg</div>
              </div>
              {/* 체중 카드 */}
              <div className="weight_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">체중</div>
                <div className="text-center">{compositionData.comWeight}</div>
                <div className="text-center">kg</div>
              </div>
              {/* 신장 카드 */}
              <div className="height_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">신장</div>
                <div className="text-center">{compositionData.comHeight}</div>
                <div className="text-center">cm</div>
              </div>
              {/* 체지방량 카드 */}
              <div className="bfm_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">체지방량</div>
                <div className="text-center">{compositionData.comBfm}</div>
                <div className="text-center">kg</div>
              </div>

              {/* 체지방률 카드 */}
              <div className="pbf_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">체지방률</div>
                <div className="text-center">{compositionData.comPbf}</div>
                <div className="text-center">%</div>
              </div>
              {/* 내장지방레벨 카드 */}
              <div className="fatlvl_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">내장지방레벨</div>
                <div className="text-center">{compositionData.comFatLvl}</div>
                <div className="text-center">Lv</div>
              </div>
              {/* BMI지수 카드 */}
              <div className="bmi_wrap bg-white p-4 rounded-lg w-[calc(25%-1.5rem)]">
                <div className="text-center font-bold">BMI지수</div>
                <div className="text-center">{compositionData.comBmi}</div>
                <div className="text-center">
                  {compositionData.comBmi < 18.5 && "(저체중)"}
                  {compositionData.comBmi >= 18.5 &&
                    compositionData.comBmi < 24.9 &&
                    "(정상 체중)"}
                  {compositionData.comBmi >= 25 &&
                    compositionData.comBmi < 29.9 &&
                    "(과체중)"}
                  {compositionData.comBmi >= 30 &&
                    compositionData.comBmi < 34.9 &&
                    "(비만 1도)"}
                  {compositionData.comBmi >= 35 &&
                    compositionData.comBmi < 39.9 &&
                    "(비만 2도)"}
                  {compositionData.comBmi >= 40 && "(비만 3도, 초고도 비만)"}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Status;
