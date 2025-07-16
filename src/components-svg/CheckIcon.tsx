const CheckIcon = ({
  size = 24,
  color = "currentColor",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 1.5 21 21"
    width={size}
    height={size}
    fill={color}
  >
    <path d="M11,16.4l-4.7-4.7l1.4-1.4l3.3,3.3l8.4-8.4C17.5,3.3,14.9,2,12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10 c0-1.9-0.5-3.6-1.4-5.1L11,16.4z" />
  </svg>
);
export default CheckIcon;
