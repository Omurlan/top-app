import React from "react";
import cn from "classnames";
import { format } from "date-fns";
import { FooterProps } from "./Footer.props";
import styles from "./Footer.module.css";

export function Footer({ className, ...props }: FooterProps): JSX.Element {
  return (
    <footer {...props} className={cn(className, styles.footer)}>
      <div>OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены</div>
      <a href="sfdsf" target="_blank">
        Пользовательское соглашение
      </a>
      <a href="sfdsf" target="_blank">
        Политика конфиденциальности
      </a>
    </footer>
  );
}
