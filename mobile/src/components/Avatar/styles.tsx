import styled from 'styled-components/native';

interface AvatarImage {
  size: number;
}

export const AvatarImage = styled.Image<AvatarImage>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size / 2}px`};
`;

interface AvatarWithLetters {
  size: number;
  invertColor: boolean;
}

export const AvatarWithLetters = styled.View<AvatarWithLetters>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: ${({ invertColor }) =>
    !invertColor ? '#FAFAFA' : '#0072bb'};

  border-radius: ${({ size }) => `${size / 2}px`};
  border-color: ${({ invertColor }) => (!invertColor ? '#0072bb' : '#FAFAFA')};
  border-width: 2px;
`;

interface Letters {
  size: number;
  invertColor: boolean;
}

export const Letters = styled.Text<Letters>`
  font-size: ${({ size }) => `${size / 3}px`};
  font-weight: 500;
  color: ${({ invertColor }) => (!invertColor ? '#0072bb' : '#FAFAFA')};
  text-transform: uppercase;
`;
