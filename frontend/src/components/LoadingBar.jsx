import React from "react";
import { motion } from "framer-motion";

function Loader() {
  return (
    <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center">
      <div className="w-48 h-[3px] bg-gray-200 relative overflow-hidden">
        <motion.div
          className="absolute top-0 h-full bg-black"
          style={{ width: "20%" }}
          initial={{ left: "-20%" }}
          animate={{ left: "120%" }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}

export default Loader;