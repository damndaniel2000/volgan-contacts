import React, { InputHTMLAttributes, useState } from "react";
import classNames from "classnames";

interface ContactInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  validationMessage?: string;
  icon?: React.ReactNode; // Accepts any React node, including SVG
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const ContactInput: React.FC<ContactInputProps> = ({
  isValid = true,
  validationMessage = "",
  icon,
  onFocus,
  onBlur,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(false);
    setTouched(true);
    onBlur && onBlur(event);
  };

  const inputClasses = classNames(
    "border rounded w-full focus:outline-none",
    {
      "border-blue-500": isFocused,
      "border-gray-300": !isFocused && isValid,
      "border-red-500": !isFocused && !isValid,
    },
    className
  );

  const iconPaddingClass = icon ? "pl-9" : "pl-4";

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`${inputClasses} ${iconPaddingClass} py-2`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div
        className="mt-1 ml-1 h-4 transition-opacity duration-300"
        style={{ opacity: !isValid && touched ? 1 : 0 }}
      >
        <p className="text-red-500 text-[10px]">{validationMessage}</p>
      </div>
    </div>
  );
};

export default ContactInput;
