import React from "react";
import FacebookIcon from "../assets/facebook.svg";
import InstagramIcon from "../assets/instagram.svg";
import TwitterIcon from "../assets/twitter.svg";
import LinkedInIcon from "../assets/linkedin.svg";
import YoutubeIcon from "../assets/youtube.svg";

const socialIcons = {
  Facebook: <img src={FacebookIcon} alt="Facebook" className="w-5 h-5 filter invert" />, 
  Instagram: <img src={InstagramIcon} alt="Instagram" className="w-5 h-5 filter invert" />, 
  Twitter: <img src={TwitterIcon} alt="Twitter" className="w-5 h-5 filter invert" />, 
  LinkedIn: <img src={LinkedInIcon} alt="LinkedIn" className="w-5 h-5 filter invert" />, 
  Youtube: <img src={YoutubeIcon} alt="Youtube" className="w-5 h-5 filter invert" /> 
};

const Footer = () => {
  return (
    <footer className="bg-black text-white p-6 md:p-12 bottom-0 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start text-center">
        <div className="text-left md:col-span-1 md:self-start">
          <div className="text-2xl font-bold italic">Aniki</div>
        </div>
        
        <div className="md:col-span-1 flex flex-col items-center">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-2">
            {["Home Page", "About Us", "Contact Us", "Link Four", "Link Five"].map((link) => (
              <li key={link} className="mt-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-1 flex flex-col items-center">
          <h3 className="font-semibold text-white">Follow Us</h3>
          <ul className="mt-2 space-y-2">
            {Object.keys(socialIcons).map((social) => (
              <li key={social} className="flex items-center gap-3">
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-3">
                  {socialIcons[social]} <span className="inline-block">{social}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
        
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p className="text-left text-gray-300 md:self-start">© 2025 Aniki. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2 md:mt-0 text-gray-200">
          {["Privacy Policy", "Terms of Service", "Cookies Settings"].map((item) => (
            <a key={item} href="#" className="hover:text-white transition-colors underline font-bold">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
