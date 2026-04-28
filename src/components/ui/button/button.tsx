"use client";

import type { ButtonHTMLAttributes, MouseEvent } from "react";
import { cn } from "@/libs/utils";
import type { ReactNode } from "react";

export type ButtonVariant = "default" | "press" | "variant4" | "variant3";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  text: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  variant: ButtonVariant;
  width?: string;
  leftIcon?: ReactNode;
}

const variantClassMap: Record<ButtonVariant, string> = {
  default:
    "border-transparent bg-[#657c3d] text-[#f8f4ed] hover:bg-[#89a35c] hover:shadow-sm",
  press:
    "border-transparent bg-[#89a35c] text-[#f8f4ed] hover:bg-[#9bb078] hover:shadow-sm",
  variant4:
    "border-[#2a1f13] bg-[#eddcba] text-[#2a1f13] hover:bg-[#f2ead9] hover:shadow-sm",
  variant3:
    "border-[#2a1f13] bg-[#f2ead9] text-[#2a1f13] hover:bg-[#f6f0e5] hover:shadow-sm",
};

export default function Button({
  text,
  onClick,
  variant,
  width,
  leftIcon,
  disabled,
  className,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "inline-flex h-[48px] items-center justify-center whitespace-nowrap rounded-[12px] border px-4 text-[20px] font-medium leading-[30px] transition-all duration-200 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none",
        variantClassMap[variant],
        className,
      )}
      style={{
        ...(width ? { width } : {}),
        cursor: isDisabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...props}
    >
      {leftIcon ? <span className="mr-2 inline-flex items-center">{leftIcon}</span> : null}
      <span>{text}</span>
    </button>
  );
}
