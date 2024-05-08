import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 lg:px-32 px-4">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">SkillSprint</h2>
            <p className="text-sm">
              A platform to enhance your skills and knowledge.
            </p>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link to="#" className="hover:text-white">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-white">
                <FaLinkedin />
              </Link>
            </li>
          </ul>
        </div>
        <hr className="border-gray-700 my-4" />
        <p className="text-sm text-center">
          © {new Date().getFullYear()} SkillSprint. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
