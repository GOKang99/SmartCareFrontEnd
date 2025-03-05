import React from "react";

const GiverCard = ({ userImage, name, email, phone }) => {
  return (
    <div className="w-55 h-75 p-6 border rounded-lg shadow-lg flex flex-col items-center m-auto bg-white">
      <div className="content_wrap mt-4 mb-6 flex flex-col items-center">
        <img
          src={userImage}
          alt="User"
          className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-300"
        />
        <div className="text-center font-semibold text-xl text-gray-800 tracking-[0.5em]">
          {name}
        </div>
        <div className="mt-5">
          <div className="text-center text-sm text-gray-600 mb-1 leading-7">
            {email}
          </div>
          <div className="text-center text-sm text-gray-600 leading-7">
            {phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiverCard;
