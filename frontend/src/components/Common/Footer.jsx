import { FaFacebookF, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="border-t bg-gray-50 pt-10 mt-10 px-4 md:px-5 lg:px-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-2">
            Be the first to hear about new projects, exclusive events, and online offers.
          </p>
          <p className="text-sm font-semibold mb-4">
            Sign up and get 10% off your first order
          </p>
          <div className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full px-4 py-2 border rounded-t-lg sm:rounded-l-lg sm:rounded-t-none focus:outline-none"
            />
            <button className="bg-black hover:bg-gray-800 text-white md:px-2 py-2 rounded-b-lg sm:rounded-r-lg sm:rounded-b-none mt-2 sm:mt-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Shop Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-black">Men</a></li>
            <li><a href="#" className="hover:text-black">Women</a></li>
            <li><a href="#" className="hover:text-black">Accessories</a></li>
            <li><a href="#" className="hover:text-black">New Arrivals</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-black">Contact Us</a></li>
            <li><a href="#" className="hover:text-black">FAQs</a></li>
            <li><a href="#" className="hover:text-black">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-pink-600">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaXTwitter size={18} />
            </a>
          </div>
          <p className="text-sm font-medium flex items-center text-gray-700">
            <FaPhoneAlt className="mr-2 hover:text-yellow-400 cursor-pointer" /> +92 300 1234567
          </p>
        </div>
      </div>
      

      {/* Bottom Copy Section */}
      <div className="text-center py-5 text-xs text-gray-500 mt-10 border-t">
        © {new Date().getFullYear()} Rabbit/ All rights reserved. <a href="https://www.linkedin.com/in/mohsin-ali08/" className="font-semibold hover:text-blue-600 hover:underline cursor-pointer">MOHSIN_ALI</a>
      </div>
    </footer>
  );
};

export default Footer;
