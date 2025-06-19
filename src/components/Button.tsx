import type { ReactNode } from "react";

type ButtonProps = {
  handleClick: () => void;
  children: ReactNode;
};

const Button = ({ handleClick, children }: ButtonProps) => {
  return <button onClick={handleClick}>{children}</button>;
};

export default Button;
