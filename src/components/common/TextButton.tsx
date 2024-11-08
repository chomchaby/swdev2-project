import React, { forwardRef } from "react";
import classNames from "classnames";

interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md"; // Size variants
}

const baseClasses = "text-neutral-700 px-[0.5rem] bg-tranparent";

const sizeClasses = {
  sm: "body2-medium",
  md: "body1-semibold",
};

const activeClasses = {
  sm: "hover:text-primary-500 hover:underline hover:underline-offset-2",
  md: "hover:text-primary-500 hover:underline hover:underline-offset-4 hover:decoration-2",
};

const CustomTextButton = forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ size = "sm", children, className, ...props }, ref) => {
    const activeClass = !props.disabled
      ? activeClasses[size]
      : "disabled:opacity-40";

    const buttonClass = classNames(
      baseClasses,
      sizeClasses[size],
      activeClass,
      className
    );

    return (
      <button ref={ref} className={buttonClass} {...props}>
        {children}
      </button>
    );
  }
);

export default CustomTextButton;
