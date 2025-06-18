import type { FC } from "react";

type InputProps = {
  handleClick: () => void;
  buttonText: string;
};

const Input: FC<InputProps> = ({ handleClick, buttonText }) => {
  return <button onClick={handleClick}>{buttonText}</button>;
};

export default Input;
