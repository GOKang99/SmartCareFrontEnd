import React, { useState } from "react";
import ResidentForm from "../components/resident/ResidentForm";

const Residents = () => {
  const [showForm, setShowForm] = useState(false);

  const createResidents = () => {
    setShowForm(true);
  };

  return (
    <div>
      {!showForm ? (
        <div>
          <button onClick={createResidents}>입소자 생성</button>
        </div>
      ) : (
        <ResidentForm />
      )}
    </div>
  );
};

export default Residents;
