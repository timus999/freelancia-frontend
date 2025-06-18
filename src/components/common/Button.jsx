
export function Button({ variant = "primary", children, ...rest}) {
    return (
        <button
        className={`w-full px-4 py-2 rounded-md font-medium ${
          variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-70"
            : "bg-gray-200 text-black hover:bg-gray-300"
        } ${rest.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        {...rest}
      >
        {children}
      </button>
    )
}