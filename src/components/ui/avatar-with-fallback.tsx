import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPhotoPath } from '@/data/pupilsData';

interface AvatarWithFallbackProps {
  studentName: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-3xl'
};

export const AvatarWithFallback: React.FC<AvatarWithFallbackProps> = ({
  studentName,
  className = '',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);
  const DEFAULT_AVATAR_URL = '/lovable-uploads/16d4752b-1ad1-4a7e-be66-fff2acbea276.png';
  
  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError ? DEFAULT_AVATAR_URL : getPhotoPath(studentName);

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage 
        src={imageUrl} 
        alt={`${studentName} profile`}
        onError={handleImageError}
      />
      <AvatarFallback>
        {getInitials(studentName)}
      </AvatarFallback>
    </Avatar>
  );
};