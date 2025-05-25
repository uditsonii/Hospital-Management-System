// src/components/PageContainer.jsx
import React from 'react';

const PageContainer = ({ children, title, subtitle }) => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto fade-in">
      {title && (
        <h1 className="text-4xl font-bold mb-2 text-center">
          <span className="text-gradient-primary">{title}</span>
        </h1>
      )}
      {subtitle && (
         <p className="text-lg text-slate-600 mb-10 text-center">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export default PageContainer;