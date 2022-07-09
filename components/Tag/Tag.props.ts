import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ParagraphProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: "s" | "m";
  children: ReactNode;
  color?: "ghost" | "red" | "gray" | "green" | "primary";
  href?: string;
}
