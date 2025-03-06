import api from "./api";

// CIST 목록 조회
export const getAllCistsForAdmin = async () => {
    const response = await api.get("/cist/admin");
    return response.data;
};

// CIST 추가
export const addCist = async (newCist) => {
    const response = await api.post("/cist/admin", newCist);
    return response.data;
};

// CIST 수정
export const updateCist = async (cistId, updatedCist) => {
    const response = await api.put(`/cist/admin/${cistId}`, updatedCist);
    return response.data;
};

// CIST 삭제
export const deleteCist = async (cistId) => {
    await api.delete(`/cist/admin/${cistId}`);
};

// 레지던트 목록 조회
export const getResidents = async () => {
    const response = await api.get("/cist/admin/residents");
    return response.data;
};