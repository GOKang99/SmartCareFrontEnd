import React, { useEffect, useState, useCallback } from "react";
import { getAllMealsForAdmin, addMeal, updateMeal, deleteMeal } from "../../services/MealService";
import MealTable from "./MealTable";
import MealForm from "./MealForm";
import MealEditModal from "./MealEditModal";  // 모달 컴포넌트 임포트

const MealAdminPage = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [latestDate, setLatestDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);  // 모달 열기 상태
    const [mealToEdit, setMealToEdit] = useState(null);  // 수정할 식사 데이터

    // ✅ 데이터 불러오기
    const fetchMeals = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllMealsForAdmin();
            const sortedMeals = (data || []).sort((a, b) => new Date(b.meaDt) - new Date(a.meaDt));
            setMeals(sortedMeals);
            if (sortedMeals.length > 0) {
                setLatestDate(sortedMeals[0].meaDt); // 최신 날짜 반영
            }
        } catch (error) {
            console.error("❌ 식사 일지를 불러오는 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMeals();
    }, [fetchMeals]);

    // 식사 추가
    const handleAddMeal = async (newMeal) => {
        try {
            // 동일한 날짜의 식사가 있는지 확인
            const isDuplicate = meals.some(meal => meal.meaDt === newMeal.meaDt);
            if (isDuplicate) {
                alert("이 날짜의 식사는 이미 추가되어 있습니다.");
                return;
            }
    
            // 중복이 없으면 식사 추가
            await addMeal(newMeal);
            await fetchMeals();  // 데이터 새로고침
        } catch (error) {
            console.error("❌ 식사 추가 오류:", error);
        }
    };

    // 식사 수정
    const handleUpdateMeal = async (mealId) => {
        const meal = meals.find((m) => m.medId === mealId);
        if (!meal) return;  // 방어 코드 추가
    
        // 깊은 복사하여 원본 데이터 보호
        const copiedMeal = JSON.parse(JSON.stringify(meal));
    
        setMealToEdit(copiedMeal);
        setIsModalOpen(true);
    };

    // 수정된 식사 저장
    const handleSaveMeal = async (updatedMeal) => {
        try {
            await updateMeal(updatedMeal.medId, updatedMeal);
            await fetchMeals();  // 데이터 새로고침
            setIsModalOpen(false);  // 모달 닫기
        } catch (error) {
            console.error("❌ 식사 수정 오류:", error);
        }
    };

    // 식사 삭제
    const handleDeleteMeal = async (mealId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteMeal(mealId);
            await fetchMeals();
        } catch (error) {
            console.error("❌ 식사 삭제 오류:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">관리자 식사 일지</h1>
            {isLoading ? (
                <p className="text-center">⏳ 데이터를 불러오는 중...</p>
            ) : (
                <>
                    <MealForm onAddMeal={handleAddMeal} meals={meals} latestDate={latestDate} />
                    <MealTable meals={meals} isAdmin={true} onUpdate={handleUpdateMeal} onDelete={handleDeleteMeal} />
                </>
            )}
            
            {isModalOpen && mealToEdit && (
                <MealEditModal 
                    meal={mealToEdit} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSaveMeal} 
                />
            )}
        </div>
    );
};

export default MealAdminPage;