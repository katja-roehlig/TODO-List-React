import type { ReactNode } from "react";
import styles from "../styles/Button.module.css";

type ButtonProps = {
  handleClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  type?: "submit" | "button";
};

const Button = ({
  handleClick,
  children,
  variant = "primary",
  className,
  type = "submit",
}: ButtonProps) => {
  const variantClass = styles[variant];
  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${variantClass} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
