"use client";

import clsx from "clsx";
import { useState, forwardRef, ChangeEventHandler, FocusEventHandler, KeyboardEventHandler } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  onChange?: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      value,
      placeholder,
      errors,
      type = "text",
      className,
      autoComplete,
      onChange,
      onBlur,
      onKeyDown,
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const [password, setPassword] = useState(false);

    const handleIconClick = () => {
      setInputType(password ? "password" : "text");
      setPassword((prev) => !prev);
    };

    const defaultAutoComplete =
      autoComplete ??
      (type === "email" ? "email" : type === "password" ? "new-password" : type === "name" ? "name" : "off");

    return (
      <div className={(clsx("relative grid gap-2"), className)}>
        {label && (
          <label htmlFor={id} className="text-white text-sm md:text-base">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            className={clsx(
              "w-full p-4 text-sm md:text-base text-gray06 placeholder-gray04 rounded-xl outline-none ring-inset ring-2 transition-all duration-300 focus:outline-none",
              errors ? "ring-red01" : "ring-gray03 focus:ring-purple01",
            )}
            id={id}
            name={name}
            value={value}
            type={inputType}
            autoComplete={defaultAutoComplete}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
          />
          {type === "password" && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={handleIconClick}>
              {password ? (
                <IoEyeOutline className="text-xl text-gray04" />
              ) : (
                <IoEyeOffOutline className="text-xl text-gray04" />
              )}
            </span>
          )}
        </div>

        {errors && <span className="pl-1 text-sm font-normal text-red01">{errors}</span>}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
