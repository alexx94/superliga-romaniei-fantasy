import React from 'react';

const InputField = ({ label, type, value, onChange, name, placeholder, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className={`w-full px-4 py-2 rounded bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 ${
            error ? 'border-2 border-red-500 focus:ring-red-500' : 'focus:ring-accent-color'
        }`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-400 text-sm mt-1">
        {typeof error === 'string' ? error : <>{error}</>}
        </p>
      )}
    </div>
  );
};

export default InputField;
