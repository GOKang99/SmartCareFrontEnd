import React, { useState, useEffect } from "react";

const MealForm = ({ onAddMeal, latestDate }) => {
    const [meal, setMeal] = useState({
        meaDt: latestDate || "",
        breQty: "선택하세요",
        lunQty: "선택하세요",
        dinQty: "선택하세요",
        morSnackQty: "선택하세요",
        aftSnackQty: "선택하세요",
    });

    //오늘 날짜 구하기
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
        console.log("📢 추가되는 데이터:", meal);
        await onAddMeal(meal);
        setMeal({
            meaDt: latestDate || "",
            breQty: "선택하세요",
            lunQty: "선택하세요",
            dinQty: "선택하세요",
            morSnackQty: "선택하세요",
            aftSnackQty: "선택하세요",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto mb-10">
            <h2 className="text-lg font-semibold mb-4 text-center">🍽 식사 추가</h2>
            {/* 식사추가 입력공간 */}
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
                <div>
                    <label htmlFor="breQty" className="block mb-1">아침 식사</label>
                    <select
                        id="breQty"
                        name="breQty"
                        value={meal.breQty}
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
                <div>
                    <label htmlFor="lunQty" className="block mb-1">점심 식사</label>
                    <select
                        id="lunQty"
                        name="lunQty"
                        value={meal.lunQty}
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
                <div>
                    <label htmlFor="dinQty" className="block mb-1">저녁 식사</label>
                    <select
                        id="dinQty"
                        name="dinQty"
                        value={meal.dinQty}
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
                <div>
                    <label htmlFor="morSnackQty" className="block mb-1">오전 간식</label>
                    <select
                        id="morSnackQty"
                        name="morSnackQty"
                        value={meal.morSnackQty}
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
                <div>
                    <label htmlFor="aftSnackQty" className="block mb-1">오후 간식</label>
                    <select
                        id="aftSnackQty"
                        name="aftSnackQty"
                        value={meal.aftSnackQty}
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
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600 cursor-pointer">추가</button>
        </form>
    );
};

export default MealForm;