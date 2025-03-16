import React from "react";
import { motion } from "framer-motion";
import promoImage from "../assets/promo-art.png";
import customIcon from "../assets/box.svg"; 

const PromotionSection = () => {
  return (
    <section className="bg-[#f8fae5] min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-6 md:flex md:items-center md:justify-between">
        
        {/* Left Content with Fade-in */}
        <motion.div 
          className="md:w-1/2 text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Unlock Your Potential with Tailored IT Learning Roadmaps and Resources
          </h1>
          <ul className="text-gray-700 space-y-2">
            <motion.li 
              className="flex items-start space-x-2"
              whileHover={{ scale: 1.1 }}
            >
              <img src={customIcon} alt="Custom Icon" className="w-6 h-6" />  
              <p>Guiding beginners to expertise: Structured path for learning key concepts, technologies, and skills.</p>
            </motion.li>
            <motion.li 
              className="flex items-start space-x-2"
              whileHover={{ scale: 1.1 }}
            >
              <img src={customIcon} alt="Custom Icon" className="w-6 h-6" />  
              <p>Access to curated resources and expert insights.</p>
            </motion.li>
          </ul>
        </motion.div>

        {/* Right Image with Slide-in Animation */}
        <motion.div 
          className="md:w-1/2 flex justify-center mt-6 md:mt-0 md:pl-18"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src={promoImage} alt="Promotion" className="w-full max-w-lg h-auto rounded-xl object-cover" />
        </motion.div>

      </div>
    </section>
  );
};

export default PromotionSection;