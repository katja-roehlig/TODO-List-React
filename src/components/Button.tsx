import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  handleClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
};

const Button = ({
  handleClick,
  children,
  variant = "primary",
  className,
}: ButtonProps) => {
  const variantClass = styles[variant];
  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
