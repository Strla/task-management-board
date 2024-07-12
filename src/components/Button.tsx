import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    ariaLabel?: string;
}

const Button = ({onClick, className, children, type = 'button', ariaLabel}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 rounded transition duration-200 ${className}`}
            type={type}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};

export default Button;
