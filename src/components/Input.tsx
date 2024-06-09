import React, { InputHTMLAttributes } from "react";

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
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(false);
    onBlur && onBlur(event);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`border ${props.className ? props.className : ""} ${
            isFocused
              ? "border-blue-500"
              : isValid
              ? "border-gray-300"
              : "border-red-500"
          } rounded px-${icon ? "10" : "4"} py-2 w-full focus:outline-none`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {!isValid && (
        <p className="text-red-500 text-xs mt-1">{validationMessage}</p>
      )}
    </div>
  );
};

export default ContactInput;
