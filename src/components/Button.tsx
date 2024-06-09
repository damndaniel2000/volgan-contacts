import React, { ButtonHTMLAttributes } from "react";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color: "blue" | "green" | "red" | "gray";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  text,
  disabled = false,
  color,
  ...rest
}) => {
  const baseClasses = `px-4 py-2 rounded transition duration-200`;
  const colorClasses = disabled
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : color === "blue"
    ? "bg-blue-500 text-white hover:bg-blue-600"
    : color === "green"
    ? "bg-green-500 text-white hover:bg-green-600"
    : color === "red"
    ? "bg-red-500 text-white hover:bg-red-600"
    : "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default ActionButton;
