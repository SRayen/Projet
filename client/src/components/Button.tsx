/** @format */
"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	small,
	icon: Icon,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
			class-button
      ${outline ? "background-white" : "background-green"}
      ${outline ? "border-black" : "background-green"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "text-small" : "text-med"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}>
			{label} {Icon && <Icon size={24} className='absolute left-4 top-3' />}
		</button>
	);
};

export default Button;
