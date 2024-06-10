import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: "blue" | "green" | "red" | "gray";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
  disabled = false,
  color,
  className,
  ...rest
}) => {
  const buttonClasses = classNames(
    "px-4 py-2 rounded transition duration-200",
    "sm:px-4 sm:py-2 sm:text-base", // Default size
    "px-2 py-1 text-[10px]", // Smaller size for screens < sm
    {
      "!bg-gray-300 !text-gray-500": disabled,
      "cursor-pointer hover:bg-gray-500 hover:text-white":
        color === "gray" && !disabled,
      "bg-blue-500 text-white hover:bg-blue-600": color === "blue" && !disabled,
      "bg-green-500 text-white hover:bg-green-600":
        color === "green" && !disabled,
      "bg-red-500 text-white hover:bg-red-600": color === "red" && !disabled,
    },
    className
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...rest}
    >
      {text}
    </button>
  );
};

export default ActionButton;
