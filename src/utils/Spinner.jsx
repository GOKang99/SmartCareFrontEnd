import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center m-auto">
      <div className="spinner-border animate-spin inline-block w-15 h-15 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
};

export default Spinner;
