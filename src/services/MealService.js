import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:8080/api/meals"; // 백엔드 URL 확인


// ✅ 환자 식사 일지 조회
export const getMealsForResident = async (resId) => {
    const response = await api.get(`/meals/resident/${resId}`);
    return response.data || [];
};

// ✅ 관리자용 전체 식사 데이터 조회
export const getAllMealsForAdmin = async () => {
    const response = await api.get(`/meals/admin`);
    return response.data || [];
};

// ✅ 식사 추가 (관리자만 가능)
export const addMeal = async (mealData) => {
    try {
        const response = await api.post("/meals/admin", mealData);
        return response.data;
    } catch (error) {
        console.error("❌ 식사 추가 오류:", error);
        throw error;
    }
};

// 환자 검색
// export const getPatientsByName = async (name) => {
//     try {
//         const response = await fetch(`/api/patients/search?name=${name}`);
//         return await response.json();
//     } catch (error) {
//         console.error("❌ 환자 검색 API 오류:", error);
//         throw error;
//     }
// }

// ✅ 식사 수정 (관리자만 가능)
export const updateMeal = async (medId, mealData) => {
    const response = await api.put(`/meals/admin/${medId}`, mealData);
    return response.data;
};

// ✅ 식사 삭제 (관리자만 가능)
export const deleteMeal = async (medId) => {
    console.log("삭제할 아이디: "+medId)
    await api.delete(`/meals/admin/${medId}`);
};

