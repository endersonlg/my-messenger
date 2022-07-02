import React from 'react';

import { ButtonTouchable, TextButton } from './styles';

interface Button {
  onPress: () => void;
  text: string;
}

export function Button({ text, ...rest }: Button) {
  return (
    <ButtonTouchable {...rest}>
      <TextButton>{text}</TextButton>
    </ButtonTouchable>
  );
}
