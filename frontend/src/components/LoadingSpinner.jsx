import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
    white: 'border-white'
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full animate-spin ${colorClasses[color]}`}></div>
      {text && (
        <p className="mt-3 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Page loading component
export const PageLoader = ({ text = 'Loading page...' }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <LoadingSpinner size="xl" text={text} />
  </div>
);

// Button loading component
export const ButtonLoader = ({ size = 'sm', color = 'white' }) => (
  <LoadingSpinner size={size} color={color} text="" />
);

// Inline loading component
export const InlineLoader = ({ text = 'Loading...' }) => (
  <LoadingSpinner size="sm" text={text} />
);

export default LoadingSpinner;

