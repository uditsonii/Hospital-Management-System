// src/components/Card.jsx
import React from 'react';

const Card = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-[var(--card-bg)] p-6 rounded-xl shadow-lg card-hover ${className}`}>
      {icon && <div className="text-5xl text-[var(--primary-start)] mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

export default Card;