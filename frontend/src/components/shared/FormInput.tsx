import React from 'react';
import { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  error?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = 'text',
  register,
  rules,
  error,
  placeholder,
  required = false,
  onChange,
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-cyan-400 mb-1 cyber-glitch-text"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          {...register(id, { ...rules, onChange })}
          placeholder={placeholder}
          className={`input-field bg-gray-900 border-2 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-cyan-800 focus:border-cyan-500 focus:ring-cyan-500'
          } text-white placeholder-gray-400 rounded-md w-full px-4 py-2 transition-all duration-200`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none rounded-md" />
      </div>
      {error && (
        <div className="mt-1 flex items-center text-sm text-red-400">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput; 