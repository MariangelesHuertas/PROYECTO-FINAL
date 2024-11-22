// IconButton.tsx
import React from "react";

interface IconButtonProps {
  icon: string;
  selected?: boolean;
  onClick?: () => void;
  altText: string;
  className?: string; // Nueva prop para la clase condicional
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  selected,
  onClick,
  altText,
  className = ""
}) => (
  <button
    onClick={onClick}
    className={`p-2 focus:outline-none ${selected ? "border-2 border-blue3 rounded-[4px]" : ""} ${className}`}
  >
    <img src={icon} alt={altText} />
  </button>
);

export default IconButton;
