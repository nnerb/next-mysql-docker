import clsx from "clsx";
import React, { ReactNode } from "react";

interface ButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  children: ReactNode;
  color: string;
  type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> =({
  isLoading,
  onClick,
  children,
  color,
  type
}) => {
  return ( 
    <button 
      className={clsx(
        `ml-auto py-1 px-3 ring-1 ring-white rounded-md duration-300`,
        isLoading 
        ? `bg-${color}-400 cursor-not-allowed hover:bg-${color}-400`
        : `hover:bg-${color}-800`
      )}
      disabled={isLoading} 
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
   );
}
 
export default Button;