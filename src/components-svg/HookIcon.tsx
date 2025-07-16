const HookIcon = ({
  size = 24,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    viewBox="0 0 23 18"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.0206 0.87868C18.1922 -0.292893 20.0922 -0.292893 21.2638 0.87868C22.4352 2.05026 22.4353 3.95031 21.2638 5.12184L9.24228 17.1424L8.16903 16.0691L0.954191 9.34059C-0.25754 8.21064 -0.324172 6.31211 0.805753 5.10036C1.93572 3.88861 3.83424 3.82293 5.04599 4.9529L9.13388 8.76442L17.0206 0.87868Z" />
  </svg>
);
export default HookIcon;
