import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", password, onClick, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {label && (
          <label className="mb-1 pl-1 text-black" htmlFor={id}>
            {label}
          </label>
        )}
        {password && (
          <span className="mb-1 pr-1 text-black cursor-pointer" htmlFor={id} onClick={onClick}>
            {password}
          </span>
        )}
      </div>
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-[#fafafa] text-black outline-none focus:bg-gray-50 duration-200 border border-gray-300 w-full ${className} shadow-sm`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
