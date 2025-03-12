import React from "react";

import { Swiper, SwiperSlide } from "swiper/react"; // Swiper와 SwiperSlide 가져오기
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import "./Home.css";
import { Autoplay, Navigation} from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";

const Home = () => {
  
    const images = [
        "https://cdn.pixabay.com/photo/2017/08/18/12/23/building-2654823_1280.jpg",
        "https://cdn.pixabay.com/photo/2024/03/22/13/15/holding-hands-8649669_960_720.jpg",
        "https://cdn.pixabay.com/photo/2024/12/17/10/20/wheelchair-9272785_1280.jpg",
        "https://cdn.pixabay.com/photo/2024/10/17/07/46/ai-generated-9126706_1280.jpg",
    ];
    const titles = [
        {
            t1 : "스마트 케어 요양병원 오신 것을 환영합니다",
            t2 : "환자분들의 건강과 행복을",
            t3 : "최우선으로 생각하는 병원입니다."
        }, {
            t1 : "전문 의료진과 함께 환자 맞춤형 치료로, 신뢰와 편안함을 드립니다.",
            t2 : "환자 한 분을 소중히 여기며",
            t3 : "믿을 수 있는 돌봄을 제공합니다."
        }, {
            t1 : "환자 한 분 한 분의 건강과 행복을 최우선으로 생각하며, 맞춤형 치료로 돌봅니다.",
            t2 : "따뜻한 환경에서",
            t3 : "항상 편안한 쉼터가 되어드립니다."
        }, {
            t1 : "사랑, 친절, 봉사정신으로 내 부모를 모시듯 모시겠습니다",
            t2 : "내 집 같은 병원,",
            t3 : "환자를 가족처럼 섬기는 병원"
        }
        
    ]
    return (
        <>
            {/* 슬라이드 */}
            <div className="w-full h-[850px] overflow-hidden relative">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={50}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    navigation={{ nextEl: ".swiper_next", prevEl: ".swiper_prev" }}
                    loop={true}
                    speed={1000}
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="relative h-[850px]">
                            <img
                                src={img}
                                alt={`slide-${index}`}
                                className="sliderimg w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 flex flex-col items-start justify-center pl-50 bg-black/40">
                                <p className="text-white text-center slider-title">
                                    {titles[index].t1}
                                </p>
                                <div className="h-7">
                                    <h2 className="text-white text-4xl md:text-6xl font-bold leading-[1.3] slider-txt">
                                        {titles[index].t2}
                                    </h2>
                                    <h2 className="text-white text-4xl md:text-6xl font-bold leading-[1.3] slider-txt">
                                        {titles[index].t3}
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                        </Swiper>
                {/* 방향표 */}
                <div className="swiper-navigation absolute top-1/2 ">
                    {/* 이전 버튼 */}
                    <button className="swiper_prev">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    {/* 다음 버튼 */}
                    <button className="swiper_next">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
            {/* 슬라이드 끝 */}
            {/* 네브바(메뉴) */}
            <div className="main-content py-20">
                {/* 두번째 div */}
                <div className="container mx-auto flex justify-center">
                    <div className="wrap flex flex-row justify-between w-full max-w-[1200px]">
                        {/* 상담 및 예약 문의 (왼쪽 정렬) */}
                        <div className="text-left">
                            <h3 className="content-title text-lg text-gray-700">
                                상담 및 예약문의
                            </h3>
                            <p className="text-5xl font-bold text-indigo-800 mt-2">
                                051.123.4567
                            </p>
                        </div>

                        {/* 진료시간 안내 (중앙 정렬) */}
                        <div className="center-box flex-grow text-left w-full max-w-[300px] whitespace-nowrap pl-20s">
                            <p className="info-txt text-gray-700 relative">
                                <strong>평 &nbsp;&nbsp;일</strong>  <span className="text-gray-500 info-num">09:00 ~ 18:00</span>
                            </p>
                            <p className="info-txt text-gray-700 ">
                                <strong>토요일</strong>  <span className="text-gray-500 info-num">09:00 ~ 13:00</span>
                            </p>
                            <p className="info-txt text-gray-700 ">
                                <strong>점 &nbsp;&nbsp;심</strong>  <span className="text-gray-500 info-num">12:30 ~ 13:30</span>
                            </p>
                            <p className="text-gray-700 info-txt font-bold">일요일은 <span className="text-indigo-700 span-info">휴진</span>입니다.</p>
                        </div>
                        {/* 아이콘 자리 */}
                        <div className="right-box flex justify-center items-center space-x-8 text-center w-full max-w-[700px]">
                            <Link
                                to="/notice"
                                className="text-gray-600 flex flex-col items-center "
                            >
                                <img
                                src="/noticeicon.png"
                                alt="notice"
                                className="w-10 h-10 mb-1"
                                />
                                <span>공지사항</span>
                            </Link>
                            <Link 
                                to="#" 
                                className="text-gray-600 flex flex-col items-center"
                            >
                                <img
                                src="/currenticon.png"
                                alt="current"
                                className="w-14 h-10 mb-1"
                                />
                                <span>생활현황</span>
                            </Link>
                            <Link
                                to="/visits"
                                className="text-gray-600 flex flex-col items-center"
                            >
                                <img
                                src="/reservationicon.png"
                                alt="reservation"
                                className="w-10 h-10 mb-1"
                                />
                                <span>예약하기</span>
                            </Link>
                            <Link
                                to={`/mypage`}
                                className="text-gray-600 flex flex-col items-center"
                            >
                                <img
                                src="/mypageicon.png"
                                alt="mypage"
                                className="w-10 h-10 mb-1"
                                />
                               <span>마이페이지</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* 네브바(메뉴) 끝 */}
            {/* 병원정보 */}
            <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-6 p-8">
                <div className="clinic-title col-span-3 text-center text-gray-700">
                    <h2>스마트요양케어 <span>스마트 클리닉</span></h2>
                    <p className="text-gray-600">최선의 치료와 마음으로 따뜻한 성심껏 환자분들의 모시겠습니다.</p>
                </div>
                {/* 재활치료센터 */}
                <div className="relative bg-gray-200 flex items-end text-white col-span-2 h-110 cursor-pointer info-box-wrapper">
                    <div
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a3.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold ">재활치료센터</h3>
                        <p className="text-lg">중추신경계발달치료, 작업치료, 통증치료</p>
                    </div>
                </div>
                {/* 혈액투석 */}
                <div className="relative bg-gray-200 flex items-end text-white col-span-1 h-110 w-95 cursor-pointer info-box-wrapper">
                    <div 
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a6.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}    
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">혈액투석</h3>
                        <p className="text-lg">투석 전문의와 간호사의 관리</p>
                    </div>
                </div>
                {/* 산소치료 */}
                <div className="relative bg-gray-200 flex items-end text-white col-span-1 h-110 w-95 cursor-pointer info-box-wrapper">
                    <div
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a4.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">고압산소치료센터</h3>
                        <p className="text-lg">산소 부족으로 손상된 장기 회복</p>
                    </div>
                </div>
                {/* 감염병동 */}
                <div
                className="relative bg-gray-200 flex items-end text-white col-span-1 h-110 w-95 cursor-pointer info-box-wrapper">
                    <div 
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a7.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>    
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">감염병동</h3>
                        <p className="text-lg">철저한 소독관리</p>
                    </div>
                </div>
                {/* 건강검진 */}
                <div
                className="relative bg-gray-200 flex items-end text-white col-span-1 h-110 w-95 cursor-pointer info-box-wrapper">
                    <div
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a1.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                        }}
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">건강검진</h3>
                        <p className="text-lg">정확한 조기검진</p>
                    </div>
                </div>
                {/* 한방치료 */}
                <div
                className="relative bg-gray-200 flex items-end text-white col-span-1 h-110 w-95 cursor-pointer info-box-wrapper">
                    <div
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a8.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center top",
                        }}
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">양 한방 협진체제</h3>
                        <p className="text-lg">양한방협진</p>
                    </div>
                </div>
                {/* 암재활 */}
                <div className="relative bg-gray-200 flex items-end text-white col-span-2 h-110 cursor-pointer info-box-wrapper">
                    <div
                        className="info-box"
                        style={{
                            backgroundImage: "url('/a9.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                    <div className="p-4 info-box-txt">
                        <h3 className="text-2xl font-bold">고주파 온열 암치료</h3>
                        <p className="text-lg">암재활 치료</p>
                    </div>
                </div>
            </div>
            {/* 병원정보 끝 */}    
            {/* 영상 바분 */}
            <div className="video-container w-full p-0 rounded-xl shadow-lg flex flex-col items-center justify-center">
                <h2 className="text-center">환자분들과 함께하는 <span>믿음의 동반자</span></h2>
                <p className="text-gray-600">신뢰와 전문성으로 환자분들과 함께 하겠습니다.</p>
                <div className="relative w-[100%] p-0 mb-15 max-w-5xl h-[600px] bg-black rounded-lg overflow-hidden">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full border-none"
                        src="../../public/a10.mp4"
                        title="YouTube video player"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            {/* 영상 부분 끝 */}
        </>
    );
};

export default Home;
