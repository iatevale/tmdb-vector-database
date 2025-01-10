import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
      className="w-10 h-10 border-4 border-t-blue-500 rounded-full"
    />
  );
};

export default Spinner;
