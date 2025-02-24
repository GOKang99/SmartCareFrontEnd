import React, { useState, useEffect } from "react";

const MealForm = ({ onAddMeal, latestDate }) => {
    const [meal, setMeal] = useState({
        meaDt: latestDate || "",
        breQty: "",
        lunQty: "",
        dinQty: "",
        morSnackQty: "",
        aftSnackQty: "",
    });

    // 오늘 날짜 구하기
    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        if (latestDate) {
            setMeal((prevMeal) => ({
                ...prevMeal,
                meaDt: latestDate, // 최신 날짜 반영
            }));
        }
    }, [latestDate]);

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
        await onAddMeal(meal);
        setMeal({
            meaDt: latestDate || "",
            breQty: "",
            lunQty: "",
            dinQty: "",
            morSnackQty: "",
            aftSnackQty: "",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 text-center">🍽 식사 추가</h2>

            <input 
                type="date" 
                name="meaDt" 
                value={meal.meaDt} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded mb-2"
                min={today}
            />

            <div className="grid grid-cols-2 gap-2">
                {[
                    { id: "breQty", label: "아침 식사" },
                    { id: "lunQty", label: "점심 식사" },
                    { id: "dinQty", label: "저녁 식사" },
                    { id: "morSnackQty", label: "오전 간식" },
                    { id: "aftSnackQty", label: "오후 간식" },
                ].map(({ id, label }) => (
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

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 cursor-pointer">
                추가
            </button>
        </form>
    );
};

export default MealForm;