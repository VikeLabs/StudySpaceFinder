import { COLORS } from "consts";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ClipLoader } from "react-spinners";
import s from "./LoadingModal.module.css";

interface LoadingModalProps {
  loading: boolean;
}

export function LoadingModal({ loading }: LoadingModalProps) {
  const vars: Variants = {
    hidden: { opacity: 0, scale: 1.1, backgroundColor: "rgba(0,0,0,0)" },
    show: { opacity: 1, scale: 1, backgroundColor: "rgba(0,0,0,0.1)" },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          variants={vars}
          key="loader"
          initial="hidden"
          animate="show"
          exit="hidden"
          className={s.loaderContainer}
        >
          <div className={s.loader}>
            <ClipLoader color={COLORS.accentMain} />
            <div className={s.loaderText}>
              <p>Getting data...</p>
              <p>Sometimes it takes a second :)</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
