import clsx from "clsx";
import {
  useState,
  useEffect,
  forwardRef,
  ReactNode,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
} from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  label?: string;
  id?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  errors?: string;
  successMessage?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  bordered?: boolean;
  autoComplete?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  ariaLabel?: string;
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
      successMessage,
      type = "text",
      className,
      inputClassName,
      bordered = true,
      autoComplete,
      leftElement,
      rightElement,
      ariaLabel,
      onChange,
      onBlur,
      onKeyDown,
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
      setInputType(type);
    }, [type]);

    const handleTogglePassword = () => {
      setIsPasswordVisible((prev) => {
        setInputType(prev ? "password" : "text");
        return !prev;
      });
    };

    const defaultAutoComplete =
      autoComplete ??
      (type === "email" ? "email" : type === "password" ? "new-password" : type === "name" ? "name" : "off");

    const resolvedRightElement =
      rightElement ??
      (type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {isPasswordVisible ? (
            <IoEyeOutline className="text-xl text-gray04" />
          ) : (
            <IoEyeOffOutline className="text-xl text-gray04" />
          )}
        </button>
      ));

    return (
      <div className={clsx("relative grid gap-2", className)}>
        {label && (
          <label htmlFor={id} className="text-white text-sm md:text-base">
            {label}
          </label>
        )}

        <div className="relative">
          {leftElement}
          <input
            className={clsx(
              "w-full p-4 text-sm md:text-base text-gray06 placeholder-gray04 rounded-lg md:rounded-xl outline-none transition-all duration-300 focus:outline-none",
              bordered &&
                (errors ? "ring-inset ring-[1px] ring-red01" : "ring-inset ring-[1px] ring-gray03 focus:ring-purple01"),
              inputClassName,
            )}
            id={id}
            name={name}
            value={value}
            type={inputType}
            autoComplete={defaultAutoComplete}
            aria-label={ariaLabel}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            ref={ref}
          />
          {resolvedRightElement}
        </div>

        {errors && <span className="pl-1 text-sm font-normal text-red01">{errors}</span>}
        {!errors && successMessage && <span className="pl-1 text-sm font-normal text-sky01">{successMessage}</span>}
      </div>
    );
  },
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
