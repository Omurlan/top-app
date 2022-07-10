import React, { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import styles from "./Up.module.css";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

export function Up(): JSX.Element {
  const controls = useAnimation();

  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [controls, y]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        aria-label="Наверх"
        appearance="primary"
        icon="up"
        onClick={scrollToTop}
      />
    </motion.div>
  );
}
