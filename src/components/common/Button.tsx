import React, { forwardRef } from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary"; // Color variants
  size?: "sm" | "md" | "lg"; // Size variants
  className?: string; // Allow additional custom class names
}

const baseClasses =
  "body2-medium min-w-[80px] text-center rounded-full shadow-md transition duration-400 ease-in-out";
const sizeClasses = {
  sm: "px-[12px] py-[6px]",
  md: "px-[20px] py-[8px]",
  lg: "px-[24px] py-[12px]",
};

const colorClasses = {
  primary: "text-neutral-white bg-primary-500 ",
  secondary: {
    sm: "text-neutral-700 bg-neutral-white border-[1px] border-neutral-400",
    md: "text-neutral-700 bg-neutral-200",
    lg: "text-neutral-700 bg-neutral-200",
  },
};

const activeClasses = {
  primary: "hover:bg-primary-700 active:bg-primary-800",
  secondary: {
    sm: "hover:bg-neutral-100 active:bg-neutral-300",
    md: "hover:bg-neutral-300 active:bg-neutral-400",
    lg: "hover:bg-neutral-300 active:bg-neutral-400",
  },
};

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ color = "primary", size = "sm", children, className, ...props }, ref) => {
    // Choose the correct color class based on the color prop
    const colorClass =
      color === "secondary"
        ? colorClasses.secondary[size]
        : colorClasses[color];
    const activeClass = !props.disabled
      ? color === "secondary"
        ? activeClasses.secondary[size]
        : activeClasses[color]
      : "disabled:opacity-40";

    // Combine base classes, size classes, color classes, active state, and any additional class names
    const buttonClass = classNames(
      baseClasses,
      sizeClasses[size],
      colorClass,
      activeClass,
      className // Allow additional class names from outside
    );

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

export default CustomButton;
