
import React from 'react';
import { motion } from 'framer-motion';

const GlowButton = ({ children, variant = 'primary', className = '', onClick, href, type = 'button', disabled = false, target, rel }) => {
  const baseClasses = 'relative px-8 py-3 rounded-xl font-semibold smooth-transition overflow-hidden group flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] hover:scale-105 active:scale-[0.98]',
    secondary: 'glass-button text-foreground hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-[0.98]',
  };

  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${baseClasses} ${variantClasses[variant]} ${className} inline-block ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
    >
      {buttonContent}
    </button>
  );
};

export default GlowButton;
