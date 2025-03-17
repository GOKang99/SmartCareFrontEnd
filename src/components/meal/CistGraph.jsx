import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const CistGraph = ({ data }) => {
    // 날짜 형식을 "월.일"로 변환하기
    const formatDate = (date) => {
        const dateObj = new Date(date);
        const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1)
        const day = String(dateObj.getDate()).padStart(2, "0"); // 일
        return `${month}.${day}`; //"월.일" 형식으로 변환
    };

    // 날짜 기준으로 오름차순
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 더 세련된 색상표 정의
    const colors = {
        totalScore: "#6366F1", // Indigo
        orientation: "#10B981", // Emerald
        attention: "#F97316", // Orange
        spatialTemporal: "#EF4444", // Red
        executiveFunction: "#06B6D4", // Cyan
        memory: "#F59E0B", // Amber
        language: "#3B82F6" // Blue
    };

    // 커스텀 툴팁 스타일
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
                    <p className="font-medium text-gray-900 mb-2">{new Date(label).toLocaleDateString()}</p>
                    {payload.map((entry, index) => (
                        <div key={`item-${index}`} className="flex items-center mb-1">
                            <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: entry.color }}
                            />
                            <p className="text-sm">
                                <span className="font-medium">{entry.name}: </span>
                                <span>{entry.value}</span>
                            </p>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">지난 1년간 검사 결과 추이</h2>
                <p className="text-sm text-gray-500 mt-1">
                    인지 기능 평가 항목별 점수 변화 그래프
                </p>
            </div>

            <div className="p-5">
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                            data={sortedData} 
                            margin={{ top: 10, right: 30, left: 5, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="date"
                                tickFormatter={formatDate}
                                stroke="#9CA3AF"
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis 
                                stroke="#9CA3AF" 
                                tick={{ fontSize: 12 }}
                                domain={[0, 'dataMax + 2']}
                            />
                            <Tooltip content={<CustomTooltip />} />
{/* 범례 제거 */}
                            <Line 
                                type="monotone" 
                                dataKey="totalScore" 
                                stroke={colors.totalScore} 
                                name="총점" 
                                strokeWidth={2.5}
                                dot={{ stroke: colors.totalScore, strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="orientation" 
                                stroke={colors.orientation} 
                                name="지남력" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.orientation, strokeWidth: 2, r: 3 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="attention" 
                                stroke={colors.attention} 
                                name="주의력" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.attention, strokeWidth: 2, r: 3 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="spatialTemporal" 
                                stroke={colors.spatialTemporal} 
                                name="시공간능력" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.spatialTemporal, strokeWidth: 2, r: 3 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="executiveFunction" 
                                stroke={colors.executiveFunction} 
                                name="집행기능" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.executiveFunction, strokeWidth: 2, r: 3 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="memory" 
                                stroke={colors.memory} 
                                name="기억력" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.memory, strokeWidth: 2, r: 3 }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="language" 
                                stroke={colors.language} 
                                name="언어기능" 
                                strokeWidth={1.5}
                                dot={{ stroke: colors.language, strokeWidth: 2, r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {Object.entries({
                        "총점": colors.totalScore,
                        "지남력": colors.orientation,
                        "주의력": colors.attention,
                        "시공간능력": colors.spatialTemporal,
                        "집행기능": colors.executiveFunction,
                        "기억력": colors.memory,
                        "언어기능": colors.language,
                    }).map(([name, color]) => (
                        <div key={name} className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full">
                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }} />
                            <span className="text-xs font-medium text-gray-700">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CistGraph;