import type * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action. outline: secondary actions. ghost: low-emphasis actions. Default "primary". */
  variant?: "primary" | "outline" | "ghost";
  /** The label. Verb first, sentence case. */
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): React.ReactElement;

export interface HeadingsProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 1: page-heading (one per screen). 2: subheading-1. Default 1. */
  level?: 1 | 2;
  children?: React.ReactNode;
}

export declare function Headings(props: HeadingsProps): React.ReactElement;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "default": white with an outline. "mid": grey-200, no outline. Default "default". */
  surface?: "default" | "mid";
  /** The title, shown in subheading-1. */
  title?: React.ReactNode;
  /** Body text, in text-secondary. */
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): React.ReactElement;
