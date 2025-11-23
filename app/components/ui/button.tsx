import { ReactNode, ButtonHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "secondary" | "danger"; // add your variants

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: Size;
  variant?: Variant;
}

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-orange-500 text-white",
    secondary: "bg-gray-200 text-gray-800",
    danger: "bg-red-500 text-white",
  };

  return (
    <button
      {...props}
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded ${className}`}
    >
      {children}
    </button>
  );
};
