import React, { useEffect, useState, useCallback } from "react";
import CistTable from "./CistTable";
import CistGraph from "./CistGraph";
import api from "../../services/api";
import { jwtDecode } from 'jwt-decode';
import { useMyContext } from '../../ContextApi';


const CistPage = () => {
    const [cistData, setCistData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    
    const { token } = useMyContext(); // 유저의 token을 context에서 가져오기
    const dToken = jwtDecode(token); // token을 디코드하여 유저 정보 추출
    const partId = dToken.partId; // 로그인한 유저의 ID (partId)

    // Cist 데이터 불러오기 (partId를 사용)
    const fetchCistData = useCallback(async () => {
        try {
            const response = await api.get(`/cist/list/${partId}`); // partId로 데이터 요청
            setCistData(response.data); // 데이터 저장
        } catch (error) {
            console.error("Cist 리스트 불러오기 실패:", error); // 오류 처리
        }
    }, [partId]);

    // Graph 데이터 불러오기 (partId를 사용)
    const fetchGraphData = useCallback(async () => {
        try {
            const response = await api.get(`/cist/graph/${partId}`); // partId로 데이터 요청
            setGraphData(response.data); // 데이터 저장
        } catch (error) {
            console.error("Cist 그래프 데이터 불러오기 실패:", error); // 오류 처리
        }
    }, [partId]);

    // partId가 변경될 때마다 Cist 데이터를 새로 불러오기
    useEffect(() => {
        if (partId) {
            fetchCistData(); // Cist 데이터 가져오기
            fetchGraphData(); // 그래프 데이터 가져오기
        }
    }, [partId, fetchCistData, fetchGraphData]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">검사 기록</h1>
            <CistGraph data={graphData} /> {/* 그래프 컴포넌트 */}
            <CistTable data={cistData} /> {/* 테이블 컴포넌트 */}
        </div>
    );
};

export default CistPage;