import styled from 'styled-components';
import Image, { ImageProps } from 'next/image';

type EquilateralImageProps = ImageProps;

const EquilateralImage = (props: EquilateralImageProps) => {
   return (
      <ImageContainer>
         <StyledImage {...props} />
      </ImageContainer>
   );
};

const ImageContainer = styled.div`
   position: relative;

   &::after {
      content: '';
      display: block;
      padding-top: 100%;
   }
`;

const StyledImage = styled(Image)`
   position: absolute;
   width: 100%;
   height: 100%;
   object-fit: cover;
`;

export default EquilateralImage;
