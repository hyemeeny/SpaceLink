"use client";

import clsx from "clsx";
import Image from "next/image";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useState,
} from "react";

interface InputProps {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: string;
  type?: string;
  onChange: ChangeEventHandler;
  onKeyDown?: KeyboardEventHandler;
  onBlur?: FocusEventHandler;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      value,
      placeholder,
      errors,
      type = "text",
      onChange,
      onBlur,
      onKeyDown,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);
    const [password, setPassword] = useState(false);

    const handleIconClick = () => {
      setInputType(password ? "password" : "text");
      setPassword((prev) => !prev);
    };

    return (
      <div className="relative grid gap-3">
        {label && (
          <label htmlFor={id} className="text-black text-sm">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            className={clsx(
              "w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2",
              errors
                ? "ring-red01 focus-within:ring-red01"
                : "focus-within:ring-purple01"
            )}
            id={id}
            name={name}
            value={value}
            type={inputType}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
          />
          {type === "password" && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleIconClick}
            >
              {password ? (
                <Image
                  src="/icons/eye-on.svg"
                  width={16}
                  height={16}
                  alt="OpenEyes"
                />
              ) : (
                <Image
                  src="/icons/eye-off.svg"
                  width={16}
                  height={16}
                  alt="OpenEyes"
                />
              )}
            </span>
          )}
        </div>

        {errors && (
          <span className="pl-1 text-sm font-normal text-red01 md:text-base">
            {errors}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
