import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../../ContextApi";
import { toast } from "react-toastify";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // 현재 URL 가져오기
  const navigate = useNavigate(); //이동객체
  // const { handleLogout, navigate } = useMyContext();

  //컨텍스트에서 유저 관련 변수 가져오기
  const { token, setToken, setCurrentUser, isAdmin, setIsAdmin, setDeToken } =
    useMyContext();

  const handleLogout = () => {
    //로그아웃시 로컬스토리지와 유저 관련 변수 초기화, 메인화면으로 이동
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(null);
    setDeToken(null);
    navigate("/login");
    toast.error("로그아웃 되었습니다");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/icon.png" className="h-8" alt="SmartCare Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SmartCare
            </span>
          </Link>

          {/* 햄버거 버튼 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* 네비게이션 메뉴 */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/notice"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/notice"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  to="/resident"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/resident"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  입소자 정보
                </Link>
              </li>
              <li>
                <Link
                  to="/composition"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/compositions"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  체성분 분석
                </Link>
              </li>
              <li>
                <Link
                  to="/visits"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/visits"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  방문예약
                </Link>
              </li>
              <li>
                <Link
                  to="/meal"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/meal"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  생활현황
                </Link>
              </li>
              <li>
                <Link
                  to={`/mypage`}
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    location.pathname === "/mypage"
                      ? "text-blue-700"
                      : "text-gray-900 hover:text-blue-700"
                  }`}
                >
                  마이페이지
                </Link>
              </li>
              {!token && (
                <li>
                  <Link
                    to={"/signup"}
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      location.pathname === "/signup"
                        ? "text-blue-700"
                        : "text-gray-900 hover:text-blue-700"
                    }`}
                  >
                    회원가입
                  </Link>
                </li>
              )}
              {token ? (
                <li onClick={handleLogout} className="cursor-pointer">
                  로그아웃
                </li>
              ) : (
                <li>
                  <Link
                    to={"/login"}
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      location.pathname === "/login"
                        ? "text-blue-700"
                        : "text-gray-900 hover:text-blue-700"
                    }`}
                  >
                    로그인
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
