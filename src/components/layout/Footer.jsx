import "./Footer.css";
const Footer = () => {
  return (
    // <footer classNameNameName="w-full bg-gray-800 text-white text-center py-3 mt-auto">
    //   © 2025 SmartCare. All Rights Reserved.
    // </footer>

    <footer className="w-full  bg-gray-800 text-gray-300 text-center py-1 mt-auto">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-1">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-items-start">
            {/* <img src="/icon.png" className="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap ml-3 ">
              SmartCare
            </span>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-300 sm:mb-0 ">
            <li>
              <a href="/" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/agree" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/notice" className="hover:underline me-4 md:me-6">
                FAQ
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center ">
          © 2025{" "}
          <a href="#" className="hover:underline">
            SmartCare
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
