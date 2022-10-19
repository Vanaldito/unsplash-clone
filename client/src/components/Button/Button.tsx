import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "secondary";
}

export default function Button({
  color,
  className,
  children,
  ...buttonAttributes
}: ButtonProps) {
  className = className
    ? `${className} button--color-${color}`
    : `button--color-${color}`;

  return (
    <button className={className} {...buttonAttributes}>
      {children}
    </button>
  );
}
