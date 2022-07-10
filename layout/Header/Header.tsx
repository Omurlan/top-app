import React, { useEffect, useState } from "react";
import cn from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";
import { HeaderProps } from "./Header.props";
import Logo from "../logo.svg";
import styles from "./Header.module.css";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { Sidebar } from "../Sidebar/Sidebar";

export function Header({ className, ...props }: HeaderProps): JSX.Element {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        variants={variants}
        initial="closed"
        animate={isOpened ? "opened" : "closed"}
        className={styles.mobileMenu}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
}
