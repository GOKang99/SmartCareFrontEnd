import React, { useEffect, useState, useCallback } from "react";
import { getAllMealsForAdmin, addMeal, updateMeal, deleteMeal } from "../../services/MealService";
import MealTable from "./MealTable";
import MealForm from "./MealForm";

const MealAdminPage = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [latestDate, setLatestDate] = useState("");

    // ✅ 데이터 불러오기 (최신 날짜 설정 포함)
    const fetchMeals = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getAllMealsForAdmin();
            const sortedMeals = (data || []).sort((a, b) => new Date(b.meaDt) - new Date(a.meaDt));
            setMeals(sortedMeals);

            if (sortedMeals.length > 0) {
                setLatestDate(sortedMeals[0].meaDt); // ✅ 최신 날짜 반영
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

    // ✅ 식사 추가
    const handleAddMeal = async (newMeal) => {
        try {
            console.log("📢 추가 요청 데이터:", newMeal);
            await addMeal(newMeal);
            await fetchMeals(); // ✅ 추가 후 최신 데이터 반영
        } catch (error) {
            console.error("❌ 식사 추가 오류:", error);
            alert("식사 추가 중 오류가 발생했습니다.");
        }
    };

    // ✅ 식사 수정
    const handleUpdateMeal = async (mealId, updatedMeal) => {
        if (!mealId) {
            console.error("❌ mealId가 유효하지 않습니다.");
            return;
        }
        try {
            await updateMeal(mealId, updatedMeal);
            await fetchMeals(); // ✅ 수정 후 데이터 새로고침
        } catch (error) {
            console.error("❌ 식사 수정 오류:", error);
        }
    };

    // ✅ 식사 삭제
    const handleDeleteMeal = async (mealId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteMeal(mealId);
            await fetchMeals(); // ✅ 삭제 후 데이터 새로고침
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
                    <MealForm onAddMeal={handleAddMeal} meals={meals} latestDate={latestDate}/>
                    <MealTable meals={meals} isAdmin={true} onUpdate={handleUpdateMeal} onDelete={handleDeleteMeal} />
                </>
            )}
        </div>
    );
};

export default MealAdminPage;