
import { Link } from "react-router-dom";
import { Heart, Globe, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-eco-green-50 border-t border-eco-green-100">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-eco-green-600" />
              <span className="text-xl font-bold text-eco-green-800">ZeroWaste</span>
            </Link>
            <p className="text-sm text-gray-600">
              Connecting food donors with those in need to reduce waste and help communities.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <Heart className="h-4 w-4 mr-1 text-eco-green-500" />
              <span>Made with love for our planet</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/map" className="text-gray-600 hover:text-eco-green-600">
                  Find Food
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-600 hover:text-eco-green-600">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-eco-green-600">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-eco-green-600">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-eco-green-600">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-eco-green-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-eco-green-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-eco-green-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-eco-green-500" />
                <span>hello@zerowaste.org</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-eco-green-500" />
                <span>+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-eco-green-100">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ZeroWaste. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
