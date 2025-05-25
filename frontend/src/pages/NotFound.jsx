// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <PageContainer>
      <div className="text-center py-20">
        <FaExclamationTriangle className="text-8xl text-yellow-400 mx-auto mb-8 animate-pulse" />
        <h1 className="text-6xl font-bold text-[var(--text-dark)] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-slate-700 mb-6">Page Not Found</h2>
        <p className="text-lg text-slate-600 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-[var(--text-light)] bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] hover:opacity-90 shadow-lg transform transition-all duration-[var(--transition-speed)] hover:scale-105"
        >
          Go Back to Home
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFound;