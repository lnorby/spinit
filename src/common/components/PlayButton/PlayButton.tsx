import styled from 'styled-components';
import { MdPlayArrow } from 'react-icons/md';

type PlayButtonProps = {
   size: 'small' | 'big';
   onClick: (event: MouseEvent) => void;
};

const sizeInPx = {
   small: 48,
   big: 56,
};

// TODO: onClick
const PlayButton = ({ size, onClick }: PlayButtonProps) => {
   return (
      <StyledPlayButton size={size}>
         <MdPlayArrow size={size === 'big' ? 36 : 32} />
      </StyledPlayButton>
   );
};

const StyledPlayButton = styled.button<{ size: 'small' | 'big' }>`
   display: flex;
   align-items: center;
   justify-content: center;
   width: ${(p) => sizeInPx[p.size]}px;
   height: ${(p) => sizeInPx[p.size]}px;
   border-radius: 50%;
   background: ${(p) => p.theme.colors.accent.secondary};
   color: ${(p) => p.theme.colors.text.inverse};

   &:hover {
      transform: scale(1.05);
   }
`;

export default PlayButton;
