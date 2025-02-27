import React, { useCallback, useEffect, useState } from 'react';
import { getMealsForResident } from '../../services/MealService';
import MealTable from './MealTable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";  // 날짜 선택 UI 스타일
import { jwtDecode } from 'jwt-decode';
import { useMyContext } from '../../ContextApi';

const MealPage = () => {
    const [meals, setMeals] = useState([]);
    const [todayMeals, setTodayMeals] = useState(null);  // 초기값을 null로 설정
    const [selectedWeek, setSelectedWeek] = useState({ start: null, end: null });
    const [filteredMeals, setFilteredMeals] = useState([]);  // 필터링된 식사 데이터
    
    //유저당 아이디를 가져오기  
    const{token}=useMyContext();
    const dToken=jwtDecode(token);
    //console.log(dToken.partId);
    const part=dToken.partId; //가드아이디

    // 오늘 날짜를 "YYYY-MM-DD" 형식으로 반환하는 함수
    const todayString = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + (date.getDate())).slice(-2);
        const today = `${year}-${month}-${day}`;
        return today;
    }

    // ✅ useCallback을 사용하여 fetchMeals를 외부에서도 호출 가능하게 변경
    const fetchMeals = useCallback(async () => {
        try {
            const data = await getMealsForResident(part); // 로그인한 유저의 ID
            setMeals(data || []);
            
            // 오늘 날짜를 가져오기
            const today = todayString();
            
            // meals에서 오늘 날짜의 식사를 찾아서 todayMeals에 설정
            const todayMeal = data.find(meal => meal.meaDt === today);
            setTodayMeals(todayMeal || null);  // 오늘 날짜의 식사가 없으면 null 설정
            
        } catch (error) {
            console.error("❌ 식사 데이터를 불러오는 중 오류 발생:", error);
        }
    }, []);

    useEffect(() => {
        fetchMeals(); // 컴포넌트 마운트 시 초기 데이터 로드

        // "mealUpdated" 이벤트 리스너 추가
        const handleMealUpdate = () => {
            fetchMeals(); // 추가/수정/삭제 이벤트 발생 시 다시 로드
        };

        window.addEventListener("mealUpdated", handleMealUpdate);

        return () => {
            window.removeEventListener("mealUpdated", handleMealUpdate);
        };
    }, [fetchMeals]);

    // 날짜를 "YYYY.MM.DD ~ YYYY.MM.DD" 형식으로 변환
    const formatWeekRange = (start, end) => {
        const format = (date) =>
            `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        return `${format(start)} ~ ${format(end)}`;
    };

    // 날짜 범위 선택 시 일주일 간의 데이터를 필터링
    const handleDateChange = (date) => {
        // 시작 날짜 설정: 선택한 날짜의 일요일로 설정
        const startOfWeek = new Date(date);
        const dday = new Date(date);
        const dayOfWeek = startOfWeek.getDay();  // 일요일부터 0~6까지 (일:0, 월:1, ..., 토:6)
        dday.setDate(dday.getDate());
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);  // 선택한 날짜 기준으로 일요일로 설정
        startOfWeek.setHours(0, 0, 0, 0);  // 시간은 00:00:00으로 설정
    
        // 종료 날짜 설정: 선택한 날짜 기준으로 정확히 6일 뒤로 토요일을 설정
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);  // 정확히 일주일을 계산하여 토요일까지 포함되도록 설정
        endOfWeek.setHours(23, 59, 59, 999);  // 시간은 23:59:59로 설정하여 토요일 끝까지 포함되게 함
    
        setSelectedWeek({ start: startOfWeek, end: endOfWeek ,today:dday});
    
        // 선택한 날짜 범위에 맞는 식사 데이터 필터링
        const filtered = meals.filter(meal => {
            const mealDate = new Date(meal.meaDt);
            mealDate.setHours(0, 0, 0, 0);  // meal.meaDt도 시간 00:00:00으로 설정
            return mealDate >= startOfWeek && mealDate <= endOfWeek;
        });
    
        setFilteredMeals(filtered);
    };

    // 오늘 날짜를 기본값으로 설정
    const today = todayString();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">식사</h1>

            {/* 오늘 식사 현황 */}
            {todayMeals && (
                <div className="bg-green-500 text-white p-4 rounded-lg shadow-md text-center mb-6">
                    <h2 className="">오늘 식사현황</h2>
                    <p className="text-lg font-semibold">{todayMeals.meaDt}</p>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <span>🍽 아침: {todayMeals.breQty}</span>
                        <span>🍱 점심: {todayMeals.lunQty}</span>
                        <span>🍛 저녁: {todayMeals.dinQty}</span>
                        <span>☕ 오전 간식: {todayMeals.morSnackQty}</span>
                        <span>🍪 오후 간식: {todayMeals.aftSnackQty}</span>
                    </div>
                </div>
            )}

            {/* 날짜 선택 UI */}
            <h2 className="text-xl font-semibold text-green-600 text-center mb-3">날짜 선택</h2>
            <div className="text-center mb-6">
                <DatePicker
                    selected={selectedWeek.today || new Date(today)}  // selected 값 설정 (오늘 날짜가 기본값)
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="시작 날짜를 선택하세요"
                />
            </div>

            {/* 선택된 주간 식사 정보 */}
            {selectedWeek.start && selectedWeek.end && (
                <div className="bg-green-200 text-green-800 p-3 rounded-lg text-center mb-3">
                    {formatWeekRange(selectedWeek.start, selectedWeek.end)}
                </div>
            )}

            {/* 선택된 날짜에 맞는 일주일간 식사 테이블 */}
            <MealTable meals={filteredMeals} />
        </div>
    );
};

export default MealPage;