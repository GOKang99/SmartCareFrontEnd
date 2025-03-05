import React from "react";
import CompositionGraph from "./CompositionGraph";

const CompositionGraphs = ({ compositions }) => {
  // 그래프용 데이터 변환 함수
  const transformData = (key) =>
    compositions.map((item) => ({ date: item.comDate, value: item[key] }));

  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      <CompositionGraph
        data={transformData("comHeight")}
        title="신장 (cm)"
        color="#8884d8"
      />
      <CompositionGraph
        data={transformData("comWeight")}
        title="체중 (kg)"
        color="#82ca9d"
      />
      <CompositionGraph
        data={transformData("comSmm")}
        title="골격근량 (kg)"
        color="#ff7300"
      />
      <CompositionGraph
        data={transformData("comBfm")}
        title="체지방량 (kg)"
        color="#ff0000"
      />
      <CompositionGraph
        data={transformData("comPbf")}
        title="체지방률 (%)"
        color="#00C49F"
      />
      <CompositionGraph
        data={transformData("comBmi")}
        title="BMI"
        color="#FFBB28"
      />
      <CompositionGraph
        data={transformData("comFatLvl")}
        title="내장지방레벨"
        color="#0088FE"
      />
    </div>
  );
};

export default CompositionGraphs;
