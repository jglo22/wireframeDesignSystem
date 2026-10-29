import type * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action. outline: secondary actions. ghost: low-emphasis actions. Default "primary". */
  variant?: "primary" | "outline" | "ghost";
  /** The label. Verb first, sentence case. */
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): React.ReactElement;

export interface HeadingsProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Heading level in the page outline. Only 1 is styled so far. Default 1. */
  level?: 1;
  children?: React.ReactNode;
}

export declare function Headings(props: HeadingsProps): React.ReactElement;
