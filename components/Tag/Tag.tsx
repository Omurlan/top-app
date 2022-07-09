import React from "react";
import cn from "classnames";
import { ParagraphProps } from "./Tag.props";
import styles from "./Tag.module.css";

export function Tag({
  size = "s",
  color = "ghost",
  children,
  href,
  className,
  ...props
}: ParagraphProps): JSX.Element {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.m]: size === "m",
        [styles.s]: size === "s",
        [styles.ghost]: color === "ghost",
        [styles.green]: color === "green",
        [styles.red]: color === "red",
        [styles.gray]: color === "gray",
        [styles.primary]: color === "primary",
      })}
      {...props}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
}
