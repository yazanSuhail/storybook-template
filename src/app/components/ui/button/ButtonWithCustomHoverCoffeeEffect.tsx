import React, { useState } from 'react';
import { ButtonProps } from './types';
import { twMerge } from 'tailwind-merge';

/** Primary UI component for user interaction */
export const ButtonWithCustomHoverCoffeeEffect = ({
  primary = false,
  size = 'medium',
  wide = 'medium',
  backgroundColor = '#A020F0',
  label,
  hoverColor = '#FF4500',
  animationDuration = '1.5',
  borderTopLeftRadius = 0,
  borderTopRightRadius = 0,
  borderBottomLeftRadius = 0,
  borderBottomRightRadius = 0,
  TailWindCssClasses = '',
  labelColor = '#000',
  hoverLabelColor = '#fff',
  hoverBorder = false,
  hoverBorderColor = '#000',
  hoverBorderWidth = 1,
  fontWeight = 'bold',
  coffeeEffect = true,
  type = 'button',
  ...props
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-5 text-base',
    large: 'py-4 px-6 text-lg',
  };

  const wideClasses = {
    small: 'w-24',
    medium: 'w-36',
    large: 'w-48',
  };

  const baseClasses =
    'inline-block cursor-pointer focus:outline-none relative overflow-hidden';

  const fontWeightClass = fontWeight === 'bold' ? 'font-bold' : 'font-normal';

  const modeClasses = primary
    ? 'text-white'
    : 'text-gray-800 border border-gray-300 shadow-inner';

  const buttonClasses = twMerge(
    baseClasses,
    fontWeightClass,
    TailWindCssClasses,
    sizeClasses[size],
    wideClasses[wide],
    modeClasses,
    'bg-[var(--background-color)]',
    'flex items-center justify-center',
    !coffeeEffect && 'transition-all duration-[var(--animation-duration)] ease-in-out'
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const cssVariables = {
    '--background-color': backgroundColor,
    '--hover-color': hoverColor,
    '--label-color': labelColor,
    '--hover-label-color': hoverLabelColor,
    '--hover-border-color': hoverBorderColor,
    '--hover-border-width': `${hoverBorderWidth}px`,
    '--animation-duration': `${animationDuration}s`,
    '--border-top-left-radius': `${borderTopLeftRadius}px`,
    '--border-top-right-radius': `${borderTopRightRadius}px`,
    '--border-bottom-left-radius': `${borderBottomLeftRadius}px`,
    '--border-bottom-right-radius': `${borderBottomRightRadius}px`,
  } as React.CSSProperties;

  const buttonStyle: React.CSSProperties = {
    ...cssVariables,
    borderTopLeftRadius: 'var(--border-top-left-radius)',
    borderTopRightRadius: 'var(--border-top-right-radius)',
    borderBottomLeftRadius: 'var(--border-bottom-left-radius)',
    borderBottomRightRadius: 'var(--border-bottom-right-radius)',
  };

  if (!coffeeEffect) {
    buttonStyle.backgroundColor = isHovered ? hoverColor : backgroundColor;
    buttonStyle.color = isHovered ? hoverLabelColor : labelColor;
    buttonStyle.transition = `all ${animationDuration}s ease-in-out`;

    if (hoverBorder) {
      buttonStyle.borderColor = hoverBorderColor;
      buttonStyle.borderWidth = `${hoverBorderWidth}px`;
      buttonStyle.borderStyle = 'solid';
    }
  }

  const labelStyle: React.CSSProperties = {
    color: coffeeEffect
      ? isHovered
        ? 'var(--hover-label-color)'
        : 'var(--label-color)'
      : isHovered
      ? hoverLabelColor
      : labelColor,
  };

  const fillingEffectClasses = [
    'absolute top-0 left-0 w-full h-full',
    'transition-transform duration-[var(--animation-duration)] ease-in-out',
    'bg-[var(--hover-color)]',
    hoverBorder ? 'border-solid' : '',
    'z-0',
  ].join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      style={buttonStyle}
    >
      {coffeeEffect && (
        <div
          className={fillingEffectClasses}
          style={{
            transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
            borderColor: hoverBorder ? 'var(--hover-border-color)' : 'transparent',
            borderWidth: hoverBorder ? 'var(--hover-border-width)' : '0',
            borderStyle: hoverBorder ? 'solid' : 'none',
            borderTopLeftRadius: 'var(--border-top-left-radius)',
            borderTopRightRadius: 'var(--border-top-right-radius)',
            borderBottomLeftRadius: 'var(--border-bottom-left-radius)',
            borderBottomRightRadius: 'var(--border-bottom-right-radius)',
          }}
        />
      )}
      {/* Label */}
      <span
        className="relative z-10 transition-colors duration-[var(--animation-duration)] ease-in-out"
        style={labelStyle}
      >
        {label}
      </span>
    </button>
  );
};