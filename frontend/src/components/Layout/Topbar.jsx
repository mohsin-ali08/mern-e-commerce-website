import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Topbar() {
  return (
    <div className="bg-yellow-500 text-white py-2 px-4 hidden lg:block">
      <div className="flex items-center justify-around max-w-7xl mx-auto">
        
        {/* Left - Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-200">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaXTwitter />
          </a>
        </div>

        {/* Center - Website Name */}
        <div className="text-xs flex-1 text-center">
         We ship Worldwide - Fast and reliable shipping!
        </div>

        {/* Right - Mobile Number */}
        <div className="text-sm">
          📞 +92 300 1234567
        </div>
      </div>
    </div>
  );
}
