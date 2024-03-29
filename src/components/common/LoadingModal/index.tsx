import { COLORS } from "consts";
import { Variants, motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import s from "./LoadingModal.module.css";

interface LoadingModalProps {
  children: ReactNode;
  loading: boolean;
}

export function LoadingModal({ children, loading }: LoadingModalProps) {
  const vars: Variants = {
    hidden: { opacity: 0, y: 40, transition: { type: "just" } },
    show: { opacity: 1, y: 0, transition: { type: "just" } },
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          className={s.loader}
          variants={vars}
          key="loader"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <ClipLoader color={COLORS.accentMain} />
          <div className={s.loaderText}>
            <p>Getting data...</p>
            <p>Sometimes it takes a second</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={vars}
          key="content"
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
