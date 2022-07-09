import React from "react";
import cn from "classnames";
import { ButtonIconProps, icons } from "./ButtonIcon.props";
import styles from "./ButtonIcon.module.css";

export function ButtonIcon({
  appearance,
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element {
  const IconComp = icons[icon];

  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.primary]: appearance === "primary",
        [styles.white]: appearance === "white",
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
}
