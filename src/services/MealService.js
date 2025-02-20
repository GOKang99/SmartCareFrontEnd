import axios from "axios";

const API_URL = "http://localhost:8080/api/meals"; // 백엔드 URL 확인

// ✅ 환자 식사 일지 조회
export const getMealsForResident = async (resId) => {
    const response = await axios.get(`${API_URL}/resident/${resId}`);
    return response.data || [];
};

// ✅ 관리자용 전체 식사 데이터 조회
export const getAllMealsForAdmin = async () => {
    const response = await axios.get(`${API_URL}/admin`);
    return response.data || [];
};

// ✅ 식사 추가 (관리자만 가능)
export const addMeal = async (mealData) => {
    try {
        const response = await axios.post(`${API_URL}/admin`, mealData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("❌ 식사 추가 오류:", error);
        throw error;
    }
};

// ✅ 식사 수정 (관리자만 가능)
export const updateMeal = async (medId, mealData) => {
    const response = await axios.put(`${API_URL}/admin/${medId}`, mealData, {
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};

// ✅ 식사 삭제 (관리자만 가능)
export const deleteMeal = async (medId) => {
    console.log("삭제할 아이디: "+medId)
    await axios.delete(`${API_URL}/admin/${medId}`);
};