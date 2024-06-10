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
    {
      "!bg-gray-300 !text-gray-500": disabled,
      "cursor-pointer hover:bg-gray-500 hover:text-white":
        color === "gray" && !disabled,
      "bg-blue-500 text-white hover:bg-blue-600": color === "blue",
      "bg-green-500 text-white hover:bg-green-600": color === "green",
      "bg-red-500 text-white hover:bg-red-600": color === "red",
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
