import { cx } from "class-variance-authority";
import { motion } from "framer-motion";

const Spinner = ({ size = "normal" }: { size?: string }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
      }}
      className={cx(
        size === "normal" && `w-10 h-10`,
        size === "big" && `w-24 h-24`,
        "border-4",
        "border-t-blue-500",
        "rounded-full"
      )}
    />
  );
};

export default Spinner;
