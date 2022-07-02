import React from 'react';

import { AvatarImage, AvatarWithLetters, Letters } from './styles';

interface Avatar {
  uri?: string;
  size: number;
  name: string;
  invertColor?: boolean;
}

export function Avatar({ uri, size, name, invertColor = false }: Avatar) {
  if (uri) {
    return <AvatarImage size={size} source={{ uri }} />;
  }

  return (
    <AvatarWithLetters size={size} invertColor={invertColor}>
      <Letters size={size} invertColor={invertColor}>
        {name[0] + name[1]}
      </Letters>
    </AvatarWithLetters>
  );
}
