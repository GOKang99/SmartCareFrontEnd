import React from "react";

const GiverCard = ({ userImage, name, email, phone }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-center">
        <img src={userImage} alt="User" className=" mb-3  shadow-lg" />
      </div>
      <div className="p-4 bg-white text-center">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">{phone}</p>
        <div className="flex justify-center space-x-4 my-2">
          <i className="fa fa-facebook text-blue-500"></i>
          <i className="fa fa-twitter text-blue-400"></i>
          <i className="fa fa-linkedin text-blue-700"></i>
        </div>
      </div>
    </div>
  );
};

export default GiverCard;
