import React, { useCallback, useEffect, useState } from 'react';
import { getMealsForResident } from '../../services/MealService';
import MealTable from './MealTable';

const MealPage = () => {
    const [meals, setMeals] = useState([]);

    // ✅ useCallback을 사용하여 fetchMeals를 외부에서도 호출 가능하게 변경
    const fetchMeals = useCallback(async () => {
        try {
            const data = await getMealsForResident(1); // 특정 환자의 ID
            setMeals(data || []);
        } catch (error) {
            console.error("❌ 식사 데이터를 불러오는 중 오류 발생:", error);
        }
    }, []);

    useEffect(() => {
        fetchMeals(); // ✅ 컴포넌트 마운트 시 초기 데이터 로드

        // ✅ "mealUpdated" 이벤트 리스너 추가
        const handleMealUpdate = () => {
            fetchMeals(); // ✅ 추가/수정/삭제 이벤트 발생 시 다시 로드
        };

        window.addEventListener("mealUpdated", handleMealUpdate);

        return () => {
            window.removeEventListener("mealUpdated", handleMealUpdate);
        };
    }, [fetchMeals]);

    // 오늘 날짜 가져오기
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
    
    // 지난 주 월요일과 일요일 구하기
    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - dayOfWeek - 6);
    
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - dayOfWeek);

    // 날짜를 "YYYY.MM.DD ~ YYYY.MM.DD" 형식으로 변환
    const formatWeekRange = (start, end) => {
        const format = (date) =>
            `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        return `${format(start)} ~ ${format(end)}`;
    };

    // 지난 일주일간 식사 데이터 필터링
    const lastWeekMeals = meals.filter(meal => {
        const mealDate = new Date(meal.meaDt);
        return mealDate >= lastMonday && mealDate <= lastSunday;
    });

    // 날짜를 "M/DD(요일)" 형식으로 변환
    const formatDateWithDay = (dateString) => {
        const date = new Date(dateString);
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        return `${date.getMonth() + 1}/${date.getDate()}(${dayNames[date.getDay()]})`;
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">식사</h1>

            {/* 오늘 식사 현황 */}
            {meals.length > 0 && (
                <div className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center mb-6">
                    <h2 className="text-lg font-semibold">{meals[meals.length-1].meaDt}</h2>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <span>🍽 아침: {meals[meals.length-1].breQty}</span>
                        <span>🍱 점심: {meals[meals.length-1].lunQty}</span>
                        <span>🍛 저녁: {meals[meals.length-1].dinQty}</span>
                        <span>☕ 오전 간식: {meals[meals.length-1].morSnackQty}</span>
                        <span>🍪 오후 간식: {meals[meals.length-1].aftSnackQty}</span>
                    </div>
                </div>
            )}

            {/* 지난 주간 식사 정보 */}
            <h2 className="text-xl font-semibold text-green-600 text-center mb-3">지난 주간 식사정보</h2>

            {/* 지난 주간 날짜 범위 표시 */}
            <div className="bg-green-200 text-green-800 p-3 rounded-lg text-center mb-3">
                {formatWeekRange(lastMonday, lastSunday)}
            </div>

            <MealTable meals= {meals} />
        </div>
    );
};

export default MealPage;