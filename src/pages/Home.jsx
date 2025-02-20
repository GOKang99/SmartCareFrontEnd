import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  const user = { id: 1 };

  const images = [
    "https://placehold.co/1600x900",
    "https://loremflickr.com/1600/900",
    "https://picsum.photos/1600/900",
  ];
  return (
    <>
      {/* 캐러셀 첫번째 */}
      <div className="w-full h-[800px] overflow-hidden">
        <Slider {...settings} className="flex">
          {images.map((img, index) => (
            <div key={index} className="relative h-[800px]">
              <img
                src={img}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-center pl-50 bg-black/40">
                <p className="text-white text-lg text-center">
                  사랑, 친절, 봉사정신으로 내 부모를 모시듯 모시겠습니다.
                </p>
                <div className="h-7"></div>
                <h2 className="text-white text-4xl md:text-6xl font-bold leading-[1.3]">
                  내 집 같은 병원, <br />
                  환자를 가족처럼 섬기는 병원
                </h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="bg-gray-100 py-20">
        {/* 두번째 div */}
        <div className="container mx-auto px-10 flex justify-center">
          <div className="wrap flex flex-row justify-between w-full max-w-[1000px]">
            {/* 상담 및 예약 문의 (왼쪽 정렬) */}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-700">
                상담 및 예약문의
              </h3>
              <p className="text-4xl font-bold text-indigo-800 mt-2">
                051.753.5600
              </p>
            </div>

            {/* 진료시간 안내 (중앙 정렬) */}
            <div className="center-box flex-grow text-left px-6 w-full max-w-[300px] whitespace-nowrap pl-20s ml-10">
              <p className="text-gray-700 text-sm">
                <strong>평 &nbsp;&nbsp;일</strong> : 09:00 ~ 18:00
              </p>
              <p className="text-gray-700 text-sm">
                <strong>토요일</strong> : 09:00 ~ 13:00
              </p>
              <p className="text-gray-700 text-sm">
                <strong>점심시간</strong> : 12:30 ~ 13:30
              </p>
              <p className="text-red-500 text-sm mt-1">일요일은 휴진입니다.</p>
            </div>
            {/* 아이콘 자리 */}
            <div className="right-box flex justify-center space-x-8 text-center w-full max-w-[700px]">
              <Link
                to="/notice"
                className="text-gray-700 flex flex-col items-center"
              >
                <img
                  src="/noticeicon.png"
                  alt="notice"
                  className="w-10 h-10 mb-1"
                />
                공지사항
              </Link>
              <a href="#" className="text-gray-700 flex flex-col items-center">
                <img
                  src="/currenticon.png"
                  alt="current"
                  className="w-10 h-10 mb-1"
                />
                생활현황
              </a>
              <Link
                to="/reservation"
                className="text-gray-700 flex flex-col items-center"
              >
                <img
                  src="/reservationicon.png"
                  alt="reservation"
                  className="w-10 h-10 mb-1"
                />
                예약하기
              </Link>
              <Link
                to={`/mypage/${user.id}`}
                className="text-gray-700 flex flex-col items-center"
              >
                <img
                  src="/mypageicon.png"
                  alt="mypage"
                  className="w-10 h-10 mb-1"
                />
                마이페이지
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* 3번째 div */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-6 p-8">
        {/* 각 항목 */}
        <div
          className="relative bg-gray-200 p-6 flex items-end text-white col-span-2 h-80"
          style={{
            backgroundImage: "url('/a3.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-4">
            <h2 className="text-lg font-bold">재활치료센터</h2>
            <p className="text-sm">중추신경계발달치료, 작업치료, 통증치료</p>
          </div>
        </div>

        <div
          className="relative bg-gray-200 p-6 flex items-end text-white h-80"
          style={{
            backgroundImage: "url('/a6.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-4">
            <h2 className="text-lg font-bold">혈액투석</h2>
            <p className="text-sm">투석 전문의와 간호사의 관리</p>
          </div>
        </div>

        <div
          className="relative bg-gray-200 p-6 flex items-end text-white h-80"
          style={{
            backgroundImage: "url('/a4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-4">
            <h2 className="text-lg font-bold">고압산소치료센터</h2>
            <p className="text-sm">산소 부족으로 손상된 장기 회복</p>
          </div>
        </div>

        <div
          className="relative bg-gray-200 p-6 flex items-end text-white h-80"
          style={{
            backgroundImage: "url('/a7.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-4">
            <h2 className="text-lg font-bold">감염병동</h2>
            <p className="text-sm">철저한 소독관리</p>
          </div>
        </div>

        <div
          className="relative bg-gray-200 p-6 flex items-end text-white h-80"
          style={{
            backgroundImage: "url('/a1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 p-4">
            <h2 className="text-lg font-bold">건강검진</h2>
            <p className="text-sm">정확한 조기검진</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
