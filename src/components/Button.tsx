import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({onClick, className, children, type = 'button'}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 rounded transition duration-200 ${className}`}
            type={type}
        >
            {children}
        </button>
    );
};

export default Button;
