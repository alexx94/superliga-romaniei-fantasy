import React from "react";

// TODO The buton isnt styled as i wanted it to be, I need to check why later

export const CustomButton = ({ text, onClick, className, type = "button"}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 ${className}`}
        >
            {text}
        </button>
    )
};