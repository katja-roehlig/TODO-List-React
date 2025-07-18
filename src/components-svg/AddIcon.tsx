const AddIcon = ({
  size = 24,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 0C16.6569 0 18 1.34315 18 3V12H27C28.6569 12 30 13.3431 30 15C30 16.6569 28.6569 18 27 18H18V27C18 28.6569 16.6569 30 15 30C13.3431 30 12 28.6569 12 27V18H3C1.34315 18 0 16.6569 0 15C0 13.3431 1.34315 12 3 12H12V3C12 1.34315 13.3431 0 15 0Z" />
  </svg>
);
export default AddIcon;
