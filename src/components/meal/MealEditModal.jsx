import React, { useState, useEffect } from 'react';
import "./MealEditModal.css";

const MealEditModal = ({ meal, onClose, onSave }) => {
    const [editedMeal, setEditedMeal] = useState({ ...meal });

    useEffect(() => {
        setEditedMeal({ ...meal }); // 모달이 열리면 식사 데이터를 설정
    }, [meal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedMeal((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedMeal); // 수정된 데이터를 부모 컴포넌트로 전달
    };

    return (
        <div className="meal-modal fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-center">식사 수정</h2>
                <form onSubmit={handleSubmit}>
                    {/* 날짜 */}
                    <input 
                        type="date" 
                        name="meaDt" 
                        value={editedMeal.meaDt} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border rounded mb-2"
                    />
                    {/* 아침, 점심, 저녁, 간식 등 select input들 */}
                    {['breQty', 'lunQty', 'dinQty', 'morSnackQty', 'aftSnackQty'].map((mealType) => (
                        <div key={mealType} className="mb-4">
                            <label htmlFor={mealType} className="block mb-1">
                                {mealType === 'breQty' ? '아침' : mealType === 'lunQty' ? '점심' : mealType === 'dinQty' ? '저녁' : mealType === 'morSnackQty' ? '오전 간식' : '오후 간식'}
                            </label>
                            <select
                                id={mealType}
                                name={mealType}
                                value={editedMeal[mealType]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="선택하세요">선택하세요</option>
                                <option value="X">X</option>
                                <option value="전량">전량</option>
                                <option value="1/2이상">1/2이상</option>
                                <option value="1/2미만">1/2미만</option>
                            </select>
                        </div>
                    ))}
                    <div className="modal-btn flex">
                        <button type="button" onClick={onClose} className="btn-off w-1/3  cursor-pointer text-white p-2 rounded mt-4 ">
                            취소
                        </button>
                        <button type="submit" className="btn-on w-1/3 text-white cursor-pointer p-2 rounded mt-4 ">
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MealEditModal;
