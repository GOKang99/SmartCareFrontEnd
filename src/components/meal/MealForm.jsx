import React, { useState, useEffect } from "react";

const MealForm = ({ onAddMeal, latestDate }) => {
    const [meal, setMeal] = useState({
        meaDt: latestDate || "",
        breQty: 0,
        lunQty: 0,
        dinQty: 0,
        morSnackQty: 0,
        aftSnackQty: 0,
    });

    // ✅ 최신 날짜(`latestDate`)가 바뀌면 자동 업데이트
    useEffect(() => {
        if (latestDate) {
            setMeal((prevMeal) => ({
                ...prevMeal,
                meaDt: latestDate, // 최신 날짜 반영
            }));
        }
    }, [latestDate]); // latestDate 변경 시 업데이트

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setMeal((prevMeal) => ({
            ...prevMeal,
            [name]: type === "number" ? parseInt(value, 10) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📢 추가되는 데이터:", meal);
        await onAddMeal(meal);
        setMeal({
            meaDt: latestDate || "",
            breQty: 0,
            lunQty: 0,
            dinQty: 0,
            morSnackQty: 0,
            aftSnackQty: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-4 text-center">🍽 식사 추가</h2>

            <input 
                type="date" 
                name="meaDt" 
                value={meal.meaDt} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded mb-2"
            />

            <div className="grid grid-cols-2 gap-2">
                <input type="number" name="breQty" value={meal.breQty} onChange={handleChange} placeholder="아침 식사" className="w-full p-2 border rounded"/>
                <input type="number" name="lunQty" value={meal.lunQty} onChange={handleChange} placeholder="점심 식사" className="w-full p-2 border rounded"/>
                <input type="number" name="dinQty" value={meal.dinQty} onChange={handleChange} placeholder="저녁 식사" className="w-full p-2 border rounded"/>
                <input type="number" name="morSnackQty" value={meal.morSnackQty} onChange={handleChange} placeholder="오전 간식" className="w-full p-2 border rounded"/>
                <input type="number" name="aftSnackQty" value={meal.aftSnackQty} onChange={handleChange} placeholder="오후 간식" className="w-full p-2 border rounded"/>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mt-4 hover:bg-green-600">추가</button>
        </form>
    );
};

export default MealForm;