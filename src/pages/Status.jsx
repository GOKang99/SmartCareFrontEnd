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
    <div className="status_section w-[60%] bg-white mx-auto mt-1 rounded-3xl p-6 mb-10">
      <h2 className="text-center font-bold text-3xl">생활현황</h2>
      <div className="status_content mt-6">
        {/* 입소자 정보 */}
        <Link to={`/resident/list/${userData.residentId}`}>
          <div className="resident_wrap grid grid-cols-5 gap-4 w-[100%] flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="col-span-1 flex w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg justify-center">
              <img
                src={
                  residentData.resImageAddress
                    ? `http://localhost:8080/images/${residentData.resImageAddress}`
                    : "http://localhost:8080/images/anyuser.png"
                }
                alt="환자 사진"
                className="w-29 h-29 m-auto rounded-full shadow-lg"
              />
            </div>
            <div className="resinfo_wrap col-span-4 flex flex-col justify-between p-4 leading-normal">
              <h5 class="ml-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                환자정보
              </h5>
              {/* 테이블 시작 */}
              <div class="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        성함
                      </th>
                      <th scope="col" className="px-6 py-3">
                        성별
                      </th>
                      <th scope="col" className="px-6 py-3">
                        병동호실
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td
                        scope="row"
                        className="px-6 py-4 whitespace-nowrap dark:text-white"
                      >
                        {residentData.resName}
                      </td>
                      <td className="px-6 py-4">{residentData.resGender}</td>
                      <td className="px-6 py-4">{cistData.cisGrade}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Link>

        {/* 상세내역 안내 주석 */}
        <div className="text-sm text-gray-600 mb-4 mt-4">
          각 항목 클릭 시 상세내역을 보실 수 있습니다.
        </div>

        <Link to={`/meal`}>
          {/* 오늘의 식사 현황 */}
          <div className="meal_wrap p-7 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h3 className="ml-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              오늘 식사 현황
            </h3>
            <div class="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      아침식사
                    </th>
                    <th scope="col" className="px-6 py-3">
                      점심식사
                    </th>
                    <th scope="col" className="px-6 py-3">
                      저녁식사
                    </th>
                    <th scope="col" className="px-6 py-3">
                      오전간식
                    </th>
                    <th scope="col" className="px-6 py-3">
                      오후간식
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap dark:text-white"
                    >
                      {mealData.breQty}
                    </td>
                    <td className="px-6 py-4">{mealData.lunQty}</td>
                    <td className="px-6 py-4">{mealData.dinQty}</td>
                    <td className="px-6 py-4">{mealData.morSnackQty}</td>
                    <td className="px-6 py-4">{mealData.aftSnackQty}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Link>
        <Link to={`/cist/${userData.residentId}`}>
          {/* 인지훈련 검사 결과 */}
          <div className="cist_wrap p-7 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h3 className="ml-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              인지훈련 검사 결과
            </h3>
            <div className="ml-2 text-xs text-gray-600 mt-2 mb-2">
              최근 측정일: {cistData.cisDt.split(" ")[0]}
            </div>
            <div class="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      총점
                    </th>
                    <th scope="col" className="px-6 py-3">
                      판정
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap dark:text-white"
                    >
                      {cistData.totalScore}/30점
                    </td>
                    <td className="px-6 py-4">{cistData.cisGrade}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Link>
        <Link to={`/composition/my`}>
          {/* 체성분 (카드 형태로 4개씩 나열) */}
          <div className="composition_wrap p-7 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h3 className="ml-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              체성분
            </h3>
            <div className="composition_title ml-2 text-xs mb-4 text-gray-600 mt-2 mb-2">
              <div>최근 측정일: {compositionData.comDate}</div>
            </div>

            {/* 카드 형태로 4개씩 나열 */}
            <div className="flex flex-wrap gap-6 justify-center">
              {/* 골격근량 카드 */}
              <div className="smm_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#F5B9D1]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  골격근량
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-3 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_muscle.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center font-bold">
                    {compositionData.comSmm}
                  </div>
                  <div className="text-center text-sm">kg</div>
                </div>
              </div>
              {/* 체중 카드 */}
              <div className="weight_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#FFAE93]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  체중
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-3 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_weight.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center font-bold">
                    {compositionData.comWeight}
                  </div>
                  <div className="text-center text-sm">kg</div>
                </div>
              </div>
              {/* 신장 카드 */}
              <div className="height_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#FFD254]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  신장
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-3 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_height.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center  font-bold">
                    {compositionData.comHeight}
                  </div>
                  <div className="text-center text-sm">cm</div>
                </div>
              </div>
              {/* 체지방량 카드 */}
              <div className="bfm_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#86D1DE]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  체지방량
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-3 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_fat.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center  font-bold">
                    {compositionData.comBfm}
                  </div>
                  <div className="text-center text-sm">kg</div>
                </div>
              </div>

              {/* 체지방률 카드 */}
              <div className="pbf_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#A88EFF]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  체지방률
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-2 text-gray-700"
                  style={{
                    backgroundImage: 'url("/icon_fatpercent.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center  font-bold">
                    {compositionData.comPbf}
                  </div>
                  <div className="text-center text-sm">%</div>
                </div>
              </div>
              {/* 내장지방레벨 카드 */}
              <div className="fatlvl_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#8BC34A]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  내장지방레벨
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-5.5 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_fatlevel.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center  font-bold">
                    {compositionData.comFatLvl}
                  </div>
                  <div className="text-center text-sm">Lv</div>
                </div>
              </div>
              {/* BMI지수 카드 */}
              <div className="bmi_wrap rounded-lg w-[6vw] h-[16vh] border border-gray-200 shadow-sm grid grid-rows-3 bg-[#FF7043]">
                <div className="text-center font-bold row-span-1 flex m-auto text-white">
                  BMI지수
                </div>
                <div
                  // row-span-2 flex flex-col justify-center
                  className="row-span-2 flex flex-col justify-center m-2 text-gray-700 bold"
                  style={{
                    backgroundImage: 'url("/icon_bmi.png")',
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="text-center  font-bold">
                    {compositionData.comBmi}
                  </div>
                  <div className="text-center text-sm ">
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
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Status;
