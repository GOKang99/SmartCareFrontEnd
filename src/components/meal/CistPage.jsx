import React, { useEffect, useState } from "react";

import CistTable from "./CistTable";
import CistGraph from "./CistGraph";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const CistPage = ({  }) => {
    const [cistData, setCistData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const {residentId} = useParams();
    console.log("레지던트아이디: ", residentId)

    useEffect(() => {
        fetchCistData();
        fetchGraphData();
    }, [residentId]);

    const fetchCistData = async () => {
        try {
        const response = await api.get(`/cist/list/${residentId}`);
        setCistData(response.data);
        } catch (error) {
        console.error("Cist 리스트 불러오기 실패:", error);
        }
    };

    const fetchGraphData = async () => {
        try {
        const response = await api.get(`/cist/graph/${residentId}`);
        setGraphData(response.data);
        } catch (error) {
        console.error("Cist 그래프 데이터 불러오기 실패:", error);
        }
    };

    
    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">검사 기록</h1>
        <CistGraph data={graphData} />
        <CistTable data={cistData} />
        </div>
    );
};

export default CistPage;
