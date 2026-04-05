import React from "react";

interface CatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function CatButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CatButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cat-yellow disabled:opacity-50 cursor-pointer";

  const variants = {
    primary: "bg-cat-yellow text-cat-black hover:bg-yellow-400",
    secondary:
      "bg-transparent border-2 border-cat-yellow text-cat-yellow hover:bg-cat-yellow hover:text-cat-black",
    ghost: "bg-transparent text-cat-yellow hover:bg-white/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
