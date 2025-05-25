// src/components/FormInput.jsx
import React from 'react';

const FormInput = ({ id, label, type = 'text', value, onChange, placeholder, error, required = false }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-1 block w-full px-4 py-3 border border-[var(--border-color)] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-start)] focus:border-[var(--primary-start)] sm:text-sm transition-shadow duration-[var(--transition-speed)] ${error ? 'border-red-500 ring-red-500' : ''}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;