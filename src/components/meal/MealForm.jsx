import React, { useState, useEffect } from "react";
import { useMyContext } from "../../ContextApi";
import { jwtDecode } from "jwt-decode";
import "./MealForm.css";

const MealForm = ({ handleAddMeal, latestDate, residents, handleSelectResident, residentId }) => {
    const {token}=useMyContext();
    const [meal, setMeal] = useState({
        meaDt: latestDate || "",
        breQty: "",
        lunQty: "",
        dinQty: "",
        morSnackQty: "",
        aftSnackQty: "",
        resMealId: residentId,  // 레지던트 ID
        giver:jwtDecode(token).partId,
    });


    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (latestDate) {
            setMeal((prevMeal) => ({
                ...prevMeal,
                meaDt: latestDate, // 최신 날짜 반영
            }));
        }
    }, [latestDate]);
    
    useEffect(() => {
        handleSelectResident({resMealId : meal.resMealId});
        console.log("폼데이터: ",meal);
    }, [meal.resMealId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeal((prevMeal) => ({
            ...prevMeal,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 빈 값이 있는지 확인
        for (const key in meal) {
            if (!meal[key]) {
                alert("모든 항목을 선택해주세요!");
                return;
            }
        }

        console.log("📢 추가되는 데이터:", meal);
        await handleAddMeal(meal); // 레지던트 ID 포함된 데이터 전송
        setMeal((prev)=>({
            ...prev,
            meaDt: latestDate || "",
            breQty: "",
            lunQty: "",
            dinQty: "",
            morSnackQty: "",
            aftSnackQty: "",
            giver:jwtDecode(token).partId,
        }));
        handleSelectResident({resMealId : meal.resMealId});
        console.log("출력",meal.resMealId)
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 text-center">식사 추가</h2>

            {/* 날짜 선택 */}
            <input 
                type="date" 
                name="meaDt" 
                value={meal.meaDt} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded mb-2"
                min={today}
            />

            {/* 레지던트 선택 */}
            <div className="mb-4">
                <label htmlFor="resMealId" className="block mb-1">레지던트 선택</label>
                <select
                    id="resMealId"
                    name="resMealId"
                    value={meal.resMealId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                >
                    <option value="">레지던트를 선택하세요</option>
                    {residents.map((resident) => (
                        <option key={resident.resId} value={resident.resId}>
                            {resident.resName}
                        </option>
                    ))}
                </select>
            </div>

            {/* 식사 종류 선택 */}
            <div className="grid grid-cols-2 gap-2">
                {[{ id: "breQty", label: "아침 식사" }, { id: "lunQty", label: "점심 식사" }, { id: "dinQty", label: "저녁 식사" }, { id: "morSnackQty", label: "오전 간식" }, { id: "aftSnackQty", label: "오후 간식" }]
                    .map(({ id, label }) => (
                    <div key={id}>
                        <label htmlFor={id} className="block mb-1">{label}</label>
                        <select
                            id={id}
                            name={id}
                            value={meal[id]}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">선택하세요</option>
                            <option value="전량">전량</option>
                            <option value="1/2이상">1/2이상</option>
                            <option value="1/2미만">1/2미만</option>
                            <option value="X">X</option>
                        </select>
                    </div>
                ))}
            </div>

            <button type="submit" className="meal-add w-full text-white p-2 rounded mt-4 cursor-pointer">
                추가
            </button>
        </form>
    );
};

export default MealForm;
