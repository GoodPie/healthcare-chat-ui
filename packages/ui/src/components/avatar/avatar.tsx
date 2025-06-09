import React from 'react';
import { cn } from '@sglara/cn';
import { AvatarProps } from './types';
import './avatar.css';

export const Avatar: React.FC<AvatarProps> = ({ 
  children, 
  className,
  ...props
}) => {
  return (
    <div 
      className={cn('avatar', className)}
      {...props}
    >
      {children}
    </div>
  );
};
