import React, { useState } from "react";
import Select from "react-select";

const timeOptions = Array.from({ length: 11 }, (_, i) => {
  const hours = String(Math.floor(i / 2) + 9).padStart(2, "0"); // 9시부터 시작
  const minutes = i % 2 === 0 ? "00" : "30";
  return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
});

const TimePicker = ({ selectedTime, setSelectedTime }) => {
  return (
    <div>
      <Select
        options={timeOptions}
        onChange={setSelectedTime}
        value={selectedTime}
        placeholder="시간 선택"
        required
      />
    </div>
  );
};

export default TimePicker;
